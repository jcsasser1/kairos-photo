import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { rateLimit } from '@/lib/rate-limit'
import { claimOnce } from '@/lib/dedup'
import { sendEmail } from '@/lib/email'
import { captureLead } from '@/lib/leads'
import { verifyTurnstile } from '@/lib/turnstile'
import {
  DEFAULT_LEAD_MAGNET_KEY,
  LEAD_MAGNETS,
  getLeadMagnet,
} from '@/lib/lead-magnets'
import {
  FIELD_LIMITS,
  findOversizedField,
  isHoneypotTripped,
  isValidEmail,
  HONEYPOT_FIELD,
} from '@/lib/form-validation'

export const runtime = 'nodejs' // needs fs for PDF read
export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// In-memory PDF cache (keyed by filename)
// ---------------------------------------------------------------------------

const pdfCache = new Map<string, Buffer>()

async function loadPdf(filename: string): Promise<Buffer> {
  const cached = pdfCache.get(filename)
  if (cached) return cached
  const filePath = path.join(process.cwd(), 'public', 'lead-magnets', filename)
  const buf = await readFile(filePath)
  pdfCache.set(filename, buf)
  return buf
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]!.trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  const ip = getClientIp(request)

  // 1. Rate limit — 3 requests per 10 minutes per IP
  const limit = await rateLimit(`lead-magnet:${ip}`, 3, 10 * 60 * 1000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      {
        status: 429,
        headers: limit.retryAfterSeconds
          ? { 'Retry-After': String(limit.retryAfterSeconds) }
          : undefined,
      }
    )
  }

  // 2. Parse JSON body
  let body: {
    email?: string
    source?: string
    magnetKey?: string
    turnstileToken?: string
    [key: string]: unknown
  }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // 3. Honeypot — if tripped, return 200 silently (don't hint at detection)
  if (isHoneypotTripped(body as Record<string, unknown>)) {
    console.log(`[lead-magnet] honeypot-tripped ip=${ip}`)
    return NextResponse.json({ ok: true })
  }

  // 4. Field length caps
  const oversize = findOversizedField(body as Record<string, unknown>, {
    email: FIELD_LIMITS.short,
    source: FIELD_LIMITS.short,
    magnetKey: FIELD_LIMITS.short,
    turnstileToken: FIELD_LIMITS.long,
  })
  if (oversize) {
    return NextResponse.json(
      { error: `Field "${oversize}" too long` },
      { status: 400 }
    )
  }

  // 5. Email validation
  const rawEmail = typeof body.email === 'string' ? body.email.trim() : ''
  if (!isValidEmail(rawEmail)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }
  const email = rawEmail.toLowerCase()

  // 6. Turnstile verification
  const turnstile = await verifyTurnstile(body.turnstileToken, ip)
  if (!turnstile.ok && turnstile.reason !== 'not-configured') {
    console.log(
      `[lead-magnet] turnstile-failed email=${email} reason=${turnstile.reason} codes=${turnstile.errorCodes?.join(',') ?? 'none'}`
    )
    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 400 }
    )
  }

  // 7. Resolve the magnet
  const magnetKey =
    typeof body.magnetKey === 'string' && LEAD_MAGNETS[body.magnetKey]
      ? body.magnetKey
      : DEFAULT_LEAD_MAGNET_KEY
  const magnet = getLeadMagnet(magnetKey)

  const source = typeof body.source === 'string' && body.source.length > 0
    ? body.source
    : 'lead-magnet'

  // 8. Capture the lead (fire-and-log — every submission gets recorded)
  await captureLead({ email, source, ip })

  // 9. Dedup scoped to (magnet, email) — 7 day TTL
  const firstTime = await claimOnce(
    `lead-magnet:dedup:${magnet.key}:${email}`,
    7 * 24 * 60 * 60
  )
  if (!firstTime) {
    console.log(
      `[lead-magnet] dedup-skip magnet=${magnet.key} email=${email} source=${source} ip=${ip}`
    )
    return NextResponse.json({ ok: true })
  }

  // 10. Send the PDF
  let pdf: Buffer
  try {
    pdf = await loadPdf(magnet.filename)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(
      `[lead-magnet] pdf-load-failed magnet=${magnet.key} filename=${magnet.filename}: ${msg}`
    )
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  const result = await sendEmail({
    to: email,
    subject: magnet.subject,
    text: magnet.body,
    replyTo: process.env.EMAIL_TO || 'jeremy@kairosphoto.co',
    bcc: process.env.EMAIL_TO || 'jeremy@kairosphoto.co',
    attachments: [{ filename: magnet.filename, content: pdf }],
  })

  if (!result.ok && result.reason !== 'not-configured') {
    console.error(
      `[lead-magnet] send-failed magnet=${magnet.key} email=${email} error=${result.error}`
    )
    return NextResponse.json(
      { error: 'Could not send email. Please try again.' },
      { status: 502 }
    )
  }

  console.log(
    `[lead-magnet] sent magnet=${magnet.key} email=${email} source=${source} ip=${ip} resend_id=${result.id ?? 'none'}`
  )

  return NextResponse.json({ ok: true })
}

import { Resend } from 'resend'

export interface EmailAttachment {
  filename: string
  content: Buffer
}

export interface SendEmailInput {
  to: string
  subject: string
  text: string
  replyTo?: string
  bcc?: string | string[]
  attachments?: EmailAttachment[]
}

export interface SendEmailResult {
  ok: boolean
  reason?: 'not-configured' | 'send-failed'
  id?: string
  error?: string
}

let resendClient: Resend | null = null

function getResend(): Resend | null {
  if (resendClient) return resendClient
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  resendClient = new Resend(key)
  return resendClient
}

/**
 * Send a transactional email via Resend with optional PDF attachment.
 * If RESEND_API_KEY is not configured (local dev), logs the payload
 * and returns `{ ok: false, reason: 'not-configured' }` — the caller
 * can treat that as "non-error" and still show success to the user.
 */
export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const client = getResend()
  if (!client) {
    console.log(
      `[email] not-configured (dev) — would send to=${input.to} subject="${input.subject}" attachments=${input.attachments?.length ?? 0}`
    )
    return { ok: false, reason: 'not-configured' }
  }

  const from = process.env.EMAIL_FROM
  if (!from) {
    console.error('[email] EMAIL_FROM is not set — cannot send')
    return { ok: false, reason: 'send-failed', error: 'EMAIL_FROM not set' }
  }

  try {
    const { data, error } = await client.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      replyTo: input.replyTo,
      bcc: input.bcc,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    })
    if (error) {
      console.error(
        `[email] send-failed to=${input.to} subject="${input.subject}": ${error.message ?? String(error)}`
      )
      return {
        ok: false,
        reason: 'send-failed',
        error: error.message ?? String(error),
      }
    }
    return { ok: true, id: data?.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(
      `[email] send-failed to=${input.to} subject="${input.subject}": ${msg}`
    )
    return { ok: false, reason: 'send-failed', error: msg }
  }
}

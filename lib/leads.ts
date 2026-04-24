import { db } from './db-client'
import { leads } from './schema'

export type LeadSource =
  | 'style-guide-inline'
  | 'exit-intent'
  | 'contact'
  | 'newsletter'
  | string

interface CaptureLeadInput {
  email: string
  source: LeadSource
  name?: string | null
  businessName?: string | null
  phone?: string | null
  message?: string | null
  ip?: string | null
}

function clean(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length === 0 ? null : trimmed
}

function generateId(): string {
  return `l_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Fire-and-log lead capture. Never throws — a DB blip must not fail
 * the user's form submission. Errors are logged to stderr with enough
 * context to grep in Vercel runtime logs.
 */
export async function captureLead(input: CaptureLeadInput): Promise<void> {
  try {
    await db.insert(leads).values({
      id: generateId(),
      email: input.email.trim().toLowerCase(),
      source: input.source,
      name: clean(input.name),
      businessName: clean(input.businessName),
      phone: clean(input.phone),
      message: clean(input.message),
      ip: clean(input.ip),
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(
      `[leads] capture-failed email=${input.email} source=${input.source}: ${msg}`
    )
  }
}

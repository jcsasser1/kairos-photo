/**
 * Shared form-hardening helpers used across API routes.
 */

// Honeypot: a hidden input named "website". Real users never fill it;
// most bots do. If it has any value, reject the submission silently.
export const HONEYPOT_FIELD = 'website' as const

// Length caps. Email and short strings stop at 200 chars. Free-text
// messages stop at 5000. Anything over the cap is a bot or abuse.
export const FIELD_LIMITS = {
  short: 200,
  long: 5000,
} as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed.length <= FIELD_LIMITS.short && EMAIL_REGEX.test(trimmed)
}

/**
 * Checks the honeypot field. Returns true if it was tripped (bot).
 */
export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD]
  if (typeof value !== 'string') return false
  return value.trim().length > 0
}

/**
 * Given a body and a spec of { fieldName: maxLength }, returns the name
 * of the first field over its limit, or null if everything's fine.
 */
export function findOversizedField(
  body: Record<string, unknown>,
  spec: Record<string, number>
): string | null {
  for (const [field, max] of Object.entries(spec)) {
    const value = body[field]
    if (typeof value === 'string' && value.length > max) return field
  }
  return null
}

export function isAllowedEnumValue<T extends string>(
  value: unknown,
  allowed: readonly T[]
): value is T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
}

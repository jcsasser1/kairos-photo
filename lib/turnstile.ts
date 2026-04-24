/**
 * Server-side Cloudflare Turnstile verification.
 * If TURNSTILE_SECRET_KEY is not set (dev), verification is skipped
 * with a prod warning.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

let warningLogged = false

export interface TurnstileVerifyResult {
  ok: boolean
  reason?: 'not-configured' | 'missing-token' | 'invalid' | 'network-error'
  errorCodes?: string[]
}

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    if (process.env.NODE_ENV === 'production' && !warningLogged) {
      console.warn(
        '[turnstile] TURNSTILE_SECRET_KEY not set — captcha verification disabled'
      )
      warningLogged = true
    }
    return { ok: true, reason: 'not-configured' }
  }

  if (!token || typeof token !== 'string' || token.length === 0) {
    return { ok: false, reason: 'missing-token' }
  }

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set('remoteip', ip)

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      // Short-circuit: if Cloudflare is down, don't block the user forever
      signal: AbortSignal.timeout(5000),
    })
    const data = (await res.json()) as {
      success?: boolean
      'error-codes'?: string[]
    }
    if (data.success === true) {
      return { ok: true }
    }
    return {
      ok: false,
      reason: 'invalid',
      errorCodes: data['error-codes'],
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[turnstile] network-error: ${msg}`)
    // Fail open so a Cloudflare hiccup doesn't block every user
    return { ok: true, reason: 'network-error' }
  }
}

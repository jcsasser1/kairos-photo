'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'
import { HONEYPOT_FIELD } from '@/lib/form-validation'

// ---------------------------------------------------------------------------
// Turnstile types (global injection)
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact' | 'flexible' | 'invisible'
          appearance?: 'always' | 'execute' | 'interaction-only'
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

// ---------------------------------------------------------------------------
// Hook: useTurnstile — renders the widget and resolves a token on demand
// ---------------------------------------------------------------------------

function useTurnstileToken(containerRef: React.RefObject<HTMLDivElement | null>) {
  const widgetIdRef = useRef<string | null>(null)
  const tokenRef = useRef<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      setReady(true)
      return
    }
    let cancelled = false
    const tryRender = () => {
      if (cancelled) return
      if (!window.turnstile || !containerRef.current) {
        setTimeout(tryRender, 150)
        return
      }
      if (widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        size: 'flexible',
        callback: (t) => {
          tokenRef.current = t
        },
        'expired-callback': () => {
          tokenRef.current = null
        },
        'error-callback': () => {
          tokenRef.current = null
        },
      })
      setReady(true)
    }
    tryRender()
    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* noop */
        }
        widgetIdRef.current = null
      }
    }
  }, [containerRef])

  const getToken = useCallback(() => tokenRef.current, [])
  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current)
      } catch {
        /* noop */
      }
    }
    tokenRef.current = null
  }, [])

  return { ready, getToken, reset }
}

// ---------------------------------------------------------------------------
// TurnstileScript — one-time loader (safe to mount multiple times)
// ---------------------------------------------------------------------------

function TurnstileScript() {
  if (!TURNSTILE_SITE_KEY) return null
  return (
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
      strategy="lazyOnload"
      async
      defer
    />
  )
}

// ---------------------------------------------------------------------------
// LeadCaptureInline — the email form embedded on the page
// ---------------------------------------------------------------------------

interface LeadCaptureInlineProps {
  headline?: string
  subtext?: string
  ctaLabel?: string
  magnetKey?: string
  source?: string
  successMessage?: string
  className?: string
  hideDisclaimer?: boolean
}

export function LeadCaptureInline({
  headline,
  subtext,
  ctaLabel = 'Send Me the Guide',
  magnetKey = 'style-guide',
  source = 'style-guide-inline',
  successMessage = "Check your inbox — your guide is on the way.",
  className = '',
  hideDisclaimer = false,
}: LeadCaptureInlineProps) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement | null>(null)
  const { getToken, reset: resetTurnstile } = useTurnstileToken(turnstileRef)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          magnetKey,
          turnstileToken: getToken(),
          [HONEYPOT_FIELD]: website,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setError(data.error || 'Something went wrong. Please try again.')
        resetTurnstile()
        setLoading(false)
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
      resetTurnstile()
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`rounded-lg border border-accent/30 bg-accent/5 p-6 ${className}`}>
        <p className="font-serif text-xl text-text-primary">Thank you.</p>
        <p className="mt-2 font-sans text-sm text-text-muted">{successMessage}</p>
      </div>
    )
  }

  return (
    <>
      <TurnstileScript />
      <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
        {headline && (
          <p className="font-serif text-xl text-text-primary">{headline}</p>
        )}
        {subtext && (
          <p className="font-sans text-sm text-text-muted">{subtext}</p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded border border-white/10 bg-secondary px-4 py-3 font-sans text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-accent px-6 py-3 font-sans text-sm font-medium uppercase tracking-label text-primary transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {loading ? 'Sending…' : ctaLabel}
          </button>
        </div>

        {/* Honeypot — hidden from real users, visible to bots */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label>
            Website (leave blank)
            <input
              type="text"
              name={HONEYPOT_FIELD}
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        {/* Turnstile widget */}
        <div ref={turnstileRef} className="min-h-[65px]" />

        {error && (
          <p className="font-sans text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {!hideDisclaimer && (
          <p className="font-sans text-xs text-text-muted/70">
            No spam. Unsubscribe anytime.
          </p>
        )}
      </form>
    </>
  )
}

// ---------------------------------------------------------------------------
// ExitIntentPopup — triggers on mouse leave (top) or 60% scroll
// Persists dismissal via localStorage.
// ---------------------------------------------------------------------------

const POPUP_DISMISSED_KEY = 'kairos_popup_dismissed'

interface ExitIntentPopupProps {
  magnetKey?: string
  source?: string
}

export function ExitIntentPopup({
  magnetKey = 'style-guide',
  source = 'exit-intent',
}: ExitIntentPopupProps) {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(true) // start true until we read localStorage

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(POPUP_DISMISSED_KEY)
      setDismissed(value === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  useEffect(() => {
    if (dismissed) return
    let triggered = false

    function trigger() {
      if (triggered) return
      triggered = true
      setOpen(true)
    }

    function onMouseLeave(e: MouseEvent) {
      // Only fire when leaving from the top
      if (e.clientY <= 0) trigger()
    }

    function onScroll() {
      const scrolled =
        (window.scrollY + window.innerHeight) /
        Math.max(document.documentElement.scrollHeight, 1)
      if (scrolled >= 0.6) trigger()
    }

    // Wait a few seconds before arming so we don't fire on first scroll
    const armTimer = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave)
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 5000)

    return () => {
      clearTimeout(armTimer)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [dismissed])

  function close() {
    setOpen(false)
    try {
      window.localStorage.setItem(POPUP_DISMISSED_KEY, '1')
    } catch {
      /* noop */
    }
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
        >
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-lg border border-white/10 bg-primary p-8 md:p-10"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-text-muted transition-colors hover:text-text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <p className="font-sans text-xs uppercase tracking-label text-accent">
              Before You Go
            </p>
            <h2
              id="exit-popup-title"
              className="mt-3 font-serif text-2xl font-bold text-text-primary md:text-3xl"
            >
              Grab the Portrait Style Guide
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
              Free guide with everything you need to know about what to wear for your portrait session. Colors, patterns, coordination tips, and a quick checklist. Delivered straight to your inbox.
            </p>

            <div className="mt-6">
              <LeadCaptureInline
                ctaLabel="Send Me the Guide"
                magnetKey={magnetKey}
                source={source}
                successMessage="Check your inbox — your guide is on the way."
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

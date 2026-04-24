import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export interface RateLimitResult {
  ok: boolean
  remaining: number
  retryAfterSeconds?: number
}

// ---------------------------------------------------------------------------
// Upstash-backed limiter (production)
// ---------------------------------------------------------------------------

let redisClient: Redis | null = null
let redisWarningLogged = false

function getRedis(): Redis | null {
  if (redisClient) return redisClient
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    if (process.env.NODE_ENV === 'production' && !redisWarningLogged) {
      console.warn(
        '[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set — falling back to in-memory rate-limit (NOT safe across serverless instances)'
      )
      redisWarningLogged = true
    }
    return null
  }
  redisClient = new Redis({ url, token })
  return redisClient
}

// Cache Ratelimit instances per (max, windowMs) so we don't rebuild them per request
const limiterCache = new Map<string, Ratelimit>()

function getUpstashLimiter(max: number, windowMs: number): Ratelimit | null {
  const redis = getRedis()
  if (!redis) return null
  const cacheKey = `${max}:${windowMs}`
  const existing = limiterCache.get(cacheKey)
  if (existing) return existing
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(max, `${windowMs} ms`),
    prefix: 'kairos:rl',
  })
  limiterCache.set(cacheKey, limiter)
  return limiter
}

// ---------------------------------------------------------------------------
// In-memory fallback (dev only — NOT safe across serverless instances)
// ---------------------------------------------------------------------------

interface Bucket {
  count: number
  resetAt: number
}

const memoryStore = new Map<string, Bucket>()

function inMemoryRateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const bucket = memoryStore.get(key)
  if (!bucket || bucket.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: max - 1 }
  }
  if (bucket.count >= max) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    }
  }
  bucket.count += 1
  return { ok: true, remaining: max - bucket.count }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function rateLimit(
  key: string,
  max: number,
  windowMs: number
): Promise<RateLimitResult> {
  const upstash = getUpstashLimiter(max, windowMs)
  if (upstash) {
    const res = await upstash.limit(key)
    const retryAfterSeconds = res.success
      ? undefined
      : Math.max(1, Math.ceil((res.reset - Date.now()) / 1000))
    return {
      ok: res.success,
      remaining: res.remaining,
      retryAfterSeconds,
    }
  }
  return inMemoryRateLimit(key, max, windowMs)
}

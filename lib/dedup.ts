import { Redis } from '@upstash/redis'

let redisClient: Redis | null = null
let redisWarningLogged = false

function getRedis(): Redis | null {
  if (redisClient) return redisClient
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    if (process.env.NODE_ENV === 'production' && !redisWarningLogged) {
      console.warn(
        '[dedup] UPSTASH_REDIS_REST_URL/TOKEN not set — dedup disabled, every request will proceed'
      )
      redisWarningLogged = true
    }
    return null
  }
  redisClient = new Redis({ url, token })
  return redisClient
}

/**
 * Atomically claim a key. Returns true if this caller was the first
 * (key did not exist) — meaning: proceed with the expensive work.
 * Returns false if someone already claimed it within TTL — meaning: skip.
 *
 * If Upstash is not configured (dev), returns true every time so the
 * developer always sees the full flow.
 */
export async function claimOnce(
  key: string,
  ttlSeconds: number
): Promise<boolean> {
  const client = getRedis()
  if (!client) return true
  try {
    const result = await client.set(key, 1, { ex: ttlSeconds, nx: true })
    return result === 'OK'
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[dedup] claim-failed key=${key}: ${msg}`)
    // On Redis error, fail open — proceed with the work rather than block
    return true
  }
}

import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

/**
 * Lazy Drizzle client backed by Neon HTTP driver.
 * We Proxy so that importing this module never throws — throws only fire
 * when someone actually tries to run a query without DATABASE_URL set.
 */
type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>

let cached: DrizzleClient | null = null

function getClient(): DrizzleClient {
  if (cached) return cached
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set — cannot perform database operations')
  }
  const sql = neon(url)
  cached = drizzle(sql, { schema })
  return cached
}

export const db: DrizzleClient = new Proxy({} as DrizzleClient, {
  get(_target, prop) {
    const client = getClient()
    const value = Reflect.get(client, prop)
    return typeof value === 'function' ? value.bind(client) : value
  },
})

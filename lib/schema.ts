import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * leads
 * One row per submission (not per unique email).
 * `source` identifies the form: "style-guide-inline", "exit-intent", "contact", etc.
 */
export const leads = pgTable('leads', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  source: text('source').notNull(),
  name: text('name'),
  businessName: text('business_name'),
  phone: text('phone'),
  message: text('message'),
  ip: text('ip'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert

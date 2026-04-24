export interface LeadMagnet {
  key: string
  name: string
  filename: string
  subject: string
  body: string
}

/**
 * Registry of all lead magnets. Single source of truth.
 * Adding a new magnet is one entry here + one PDF in public/lead-magnets/.
 * No other code changes needed.
 */
export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'style-guide': {
    key: 'style-guide',
    name: 'Portrait Style Guide',
    filename: 'Kairos_Portrait_Style_Guide.pdf',
    subject: 'Your Kairos Portrait Style Guide',
    body: `Hi,

Thanks for requesting the Portrait Style Guide. It's attached.

This is the exact guide I send every client before their session. It covers colors and patterns that photograph best, how to coordinate outfits without matching, layering tricks, and what to skip. Skim it, pull a few pieces from your closet, and you're set.

If you have questions before your shoot or want to book a session, just reply to this email.

— Jeremy Sasser / Kairos Photography Studio`,
  },
}

export const DEFAULT_LEAD_MAGNET_KEY = 'style-guide'

export type LeadMagnetKey = keyof typeof LEAD_MAGNETS

export function getLeadMagnet(key?: string): LeadMagnet {
  if (key && LEAD_MAGNETS[key]) return LEAD_MAGNETS[key]
  return LEAD_MAGNETS[DEFAULT_LEAD_MAGNET_KEY]
}

/**
 * Maps friendly focal point names to CSS object-position values.
 *
 * Supported values:
 *   center, top, bottom, left, right,
 *   top left, top right, bottom left, bottom right,
 *   middle top (25% from top), middle bottom (75% from top)
 *
 * Also passes through raw CSS values like "20% 30%".
 */
const focalPointMap: Record<string, string> = {
  'center': 'center',
  'top': 'center top',
  'bottom': 'center bottom',
  'left': 'left center',
  'right': 'right center',
  'top left': 'left top',
  'top right': 'right top',
  'bottom left': 'left bottom',
  'bottom right': 'right bottom',
  'middle top': 'center 25%',
  'middle bottom': 'center 75%',
}

export function resolveFocalPoint(value?: string | null): string {
  if (!value) return 'center'
  const normalized = value.trim().toLowerCase()
  return focalPointMap[normalized] ?? value
}

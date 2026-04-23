export interface GalleryConfig {
  slug: string
  title: string
  subtitle: string
  category: string
  cloudinaryFolder?: string
  cloudinaryPrefix?: string
  heroImage?: string
  description: string
}

/**
 * Registry of all client galleries.
 * Add new galleries here — they'll auto-generate pages.
 */
export const galleries: GalleryConfig[] = [
  {
    slug: 'maddie-graduation',
    title: 'Maddie Graduation',
    subtitle: 'Class of 2026',
    category: 'Graduates',
    cloudinaryFolder: 'Maddie Graduation',
    description:
      'Graduation portrait session celebrating Maddie\'s milestone. Shot on location in the beautiful mountains of Western North Carolina.',
  },
]

export function getGalleryBySlug(slug: string): GalleryConfig | undefined {
  return galleries.find((g) => g.slug === slug)
}

export function getAllGallerySlugs(): string[] {
  return galleries.map((g) => g.slug)
}

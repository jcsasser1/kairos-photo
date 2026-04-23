import { createClient } from 'contentful'

// =============================================================================
// Contentful Client
// =============================================================================

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// =============================================================================
// Types
// =============================================================================

// Content type "blogPost" fields to create in Contentful:
//   - title          (Short text)
//   - slug           (Short text, unique)
//   - date           (Date)
//   - category       (Short text)
//   - excerpt        (Long text)
//   - featuredImage   (Media — single image)
//   - body           (Rich Text)
//   - readTime       (Short text, e.g. "5 min read")
//   - galleryFolder  (Short text, optional — Cloudinary folder name for photo gallery)

export interface ContentfulBlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  readTime: string
  body: any
  galleryFolder: string | null
  focalPoint: string
}

// =============================================================================
// Helpers
// =============================================================================

function parseImageUrl(asset: any): string {
  if (!asset?.fields?.file) return ''
  const url = asset.fields.file.url as string
  return url.startsWith('//') ? `https:${url}` : url
}

function parseEntry(entry: any): ContentfulBlogPost {
  const fields = entry.fields
  return {
    slug: fields.slug,
    title: fields.title,
    date: fields.date,
    category: fields.category ?? 'General',
    excerpt: fields.excerpt ?? '',
    image: parseImageUrl(fields.featuredImage),
    readTime: fields.readTime ?? '5 min read',
    body: fields.body ?? null,
    galleryFolder: fields.galleryFolder ?? null,
    focalPoint: fields.focalPoint ?? 'center',
  }
}

// =============================================================================
// Fetch Functions
// =============================================================================

/**
 * Fetch all published blog posts, sorted by date descending.
 */
export async function getAllBlogPosts(): Promise<ContentfulBlogPost[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.date'],
    })
    return entries.items.map(parseEntry)
  } catch (error) {
    console.error('Contentful: Error fetching blog posts:', error)
    return []
  }
}

/**
 * Fetch a single blog post by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<ContentfulBlogPost | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    } as any)
    if (entries.items.length === 0) return null
    return parseEntry(entries.items[0])
  } catch (error) {
    console.error(`Contentful: Error fetching post "${slug}":`, error)
    return null
  }
}

/**
 * Get all slugs for static generation.
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      select: ['fields.slug'],
    } as any)
    return entries.items.map((e: any) => e.fields.slug)
  } catch (error) {
    console.error('Contentful: Error fetching slugs:', error)
    return []
  }
}

// =============================================================================
// Session Gallery Types & Functions
// =============================================================================

// Content type "sessionGallery" fields in Contentful:
//   - title          (Short text)
//   - slug           (Short text, unique)
//   - date           (Date)
//   - category       (Short text)
//   - featuredImage   (Media — single image)
//   - galleryFolder  (Short text — Cloudinary folder name)

export interface ContentfulSession {
  slug: string
  title: string
  date: string
  category: string
  image: string
  galleryFolder: string
  focalPoint: string
}

function parseSessionEntry(entry: any): ContentfulSession {
  const fields = entry.fields
  return {
    slug: fields.slug,
    title: fields.title,
    date: fields.date,
    category: fields.category ?? 'General',
    image: parseImageUrl(fields.featuredImage),
    galleryFolder: fields.galleryFolder ?? '',
    focalPoint: fields.focalPoint ?? 'center',
  }
}

/**
 * Fetch all published session galleries, sorted by date descending.
 */
export async function getAllSessions(): Promise<ContentfulSession[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'sessionGallery',
      order: ['-fields.date'],
    })
    return entries.items.map(parseSessionEntry)
  } catch (error) {
    console.error('Contentful: Error fetching sessions:', error)
    return []
  }
}

/**
 * Fetch a single session gallery by slug.
 */
export async function getSessionBySlug(slug: string): Promise<ContentfulSession | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'sessionGallery',
      'fields.slug': slug,
      limit: 1,
    } as any)
    if (entries.items.length === 0) return null
    return parseSessionEntry(entries.items[0])
  } catch (error) {
    console.error(`Contentful: Error fetching session "${slug}":`, error)
    return null
  }
}

/**
 * Get all session slugs for static generation.
 */
export async function getAllSessionSlugs(): Promise<string[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'sessionGallery',
      select: ['fields.slug'],
    } as any)
    return entries.items.map((e: any) => e.fields.slug)
  } catch (error) {
    console.error('Contentful: Error fetching session slugs:', error)
    return []
  }
}

/**
 * Get all unique session categories.
 */
export async function getSessionCategories(): Promise<string[]> {
  const sessions = await getAllSessions()
  const categories = Array.from(new Set(sessions.map((s) => s.category)))
  return categories.sort()
}

// =============================================================================
// Reviews
// =============================================================================

export interface ContentfulReview {
  clientName: string
  clientType: string
  reviewText: string
}

/**
 * Fetch all published reviews.
 */
export async function getAllReviews(): Promise<ContentfulReview[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'reviews',
    })
    return entries.items.map((entry: any) => {
      const fields = entry.fields
      // Extract plain text from Rich Text document
      let text = ''
      if (fields.reviewText?.content) {
        text = fields.reviewText.content
          .map((block: any) =>
            block.content
              ?.map((node: any) => node.value ?? '')
              .join('') ?? ''
          )
          .join('\n\n')
      }
      return {
        clientName: fields.clientName ?? '',
        clientType: fields.clientType ?? '',
        reviewText: text,
      }
    })
  } catch (error) {
    console.error('Contentful: Error fetching reviews:', error)
    return []
  }
}

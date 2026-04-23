import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmhifjh7n',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  created_at: string
}

export interface GalleryImage {
  src: string
  thumbnail: string
  alt: string
  width: number
  height: number
  publicId: string
}

/**
 * Build a Cloudinary URL with transformations
 */
export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | string
    format?: string
    crop?: string
  } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmhifjh7n'
  const transforms: string[] = []

  if (options.width) transforms.push(`w_${options.width}`)
  if (options.height) transforms.push(`h_${options.height}`)
  if (options.crop) transforms.push(`c_${options.crop}`)
  if (options.quality) transforms.push(`q_${options.quality}`)
  if (options.format) transforms.push(`f_${options.format}`)

  // Always add auto format and quality if not specified
  if (!options.format) transforms.push('f_auto')
  if (!options.quality) transforms.push('q_auto')

  const transformStr = transforms.length > 0 ? transforms.join(',') + '/' : ''
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}${publicId}`
}

/**
 * In-memory cache for Cloudinary folder fetches (keeps dev fast).
 * Keyed by folder path; expires after 60 seconds.
 */
const folderCache = new Map<string, { data: GalleryImage[]; expires: number }>()
const CACHE_TTL_MS = 60 * 1000

/**
 * Fetch all images from a Cloudinary folder (with in-memory cache).
 */
export async function fetchCloudinaryFolder(folderPath: string): Promise<GalleryImage[]> {
  // Check cache first
  const cached = folderCache.get(folderPath)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  try {
    const allImages: GalleryImage[] = []
    let nextCursor: string | undefined

    do {
      const search = cloudinary.search
        .expression(`folder:"${folderPath}"`)
        .sort_by('created_at', 'desc')
        .max_results(500)

      if (nextCursor) search.next_cursor(nextCursor)

      const result = await search.execute()

      const batch = result.resources.map((resource: CloudinaryImage) => ({
        src: cloudinaryUrl(resource.public_id, {
          width: 1920,
          quality: 80,
        }),
        thumbnail: cloudinaryUrl(resource.public_id, {
          width: 600,
          crop: 'fill',
          quality: 'auto',
        }),
        alt: resource.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || 'Gallery image',
        width: resource.width,
        height: resource.height,
        publicId: resource.public_id,
      }))

      allImages.push(...batch)
      nextCursor = result.next_cursor
    } while (nextCursor)

    // Store in cache
    folderCache.set(folderPath, {
      data: allImages,
      expires: Date.now() + CACHE_TTL_MS,
    })

    return allImages
  } catch (error) {
    console.error('Error fetching Cloudinary folder:', error)
    return []
  }
}

/**
 * Fetch all images from Cloudinary by prefix (for images in root folder)
 */
export async function fetchCloudinaryByPrefix(prefix: string): Promise<GalleryImage[]> {
  try {
    const allImages: GalleryImage[] = []
    let nextCursor: string | undefined

    do {
      const options: Record<string, unknown> = {
        max_results: 500,
        type: 'upload',
        resource_type: 'image',
        prefix,
      }
      if (nextCursor) options.next_cursor = nextCursor

      const result = await cloudinary.api.resources(options)

      const batch = result.resources.map((resource: CloudinaryImage) => ({
        src: cloudinaryUrl(resource.public_id, {
          width: 1920,
          quality: 80,
        }),
        thumbnail: cloudinaryUrl(resource.public_id, {
          width: 600,
          crop: 'fill',
          quality: 'auto',
        }),
        alt: resource.public_id.replace(/[-_]/g, ' '),
        width: resource.width,
        height: resource.height,
        publicId: resource.public_id,
      }))

      allImages.push(...batch)
      nextCursor = result.next_cursor
    } while (nextCursor)

    return allImages
  } catch (error) {
    console.error('Error fetching Cloudinary by prefix:', error)
    return []
  }
}

/**
 * Fetch all images tagged with a specific tag
 */
export async function fetchCloudinaryByTag(tag: string): Promise<GalleryImage[]> {
  try {
    const result = await cloudinary.search
      .expression(`tags:"${tag}"`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute()

    return result.resources.map((resource: CloudinaryImage) => ({
      src: cloudinaryUrl(resource.public_id, {
        width: 1920,
        quality: 80,
      }),
      thumbnail: cloudinaryUrl(resource.public_id, {
        width: 600,
        height: 600,
        crop: 'fill',
        quality: 'auto',
      }),
      alt: resource.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || 'Gallery image',
      width: resource.width,
      height: resource.height,
      publicId: resource.public_id,
    }))
  } catch (error) {
    console.error('Error fetching Cloudinary by tag:', error)
    return []
  }
}

export default cloudinary

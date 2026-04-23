import type { MetadataRoute } from 'next'
import { business } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${business.website}/sitemap.xml`,
    host: business.website,
  }
}

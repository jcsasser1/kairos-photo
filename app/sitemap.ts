import type { MetadataRoute } from 'next'
import { business } from '@/lib/data'
import { features } from '@/lib/features'
import { getAllBlogSlugs, getAllSessionSlugs } from '@/lib/contentful'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = business.website

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/weddings`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: features.weddings ? 0.9 : 0.1,
    },
    {
      url: `${siteUrl}/real-estate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: features.realEstate ? 0.9 : 0.1,
    },
    {
      url: `${siteUrl}/portraits`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: features.portraits ? 0.9 : 0.1,
    },
    {
      url: `${siteUrl}/sessions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic blog routes
  const blogSlugs = await getAllBlogSlugs()
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic session routes
  const sessionSlugs = await getAllSessionSlugs()
  const sessionRoutes: MetadataRoute.Sitemap = sessionSlugs.map((slug) => ({
    url: `${siteUrl}/sessions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes, ...sessionRoutes]
}

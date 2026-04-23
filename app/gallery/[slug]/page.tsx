import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { galleries, getGalleryBySlug, getAllGallerySlugs } from '@/lib/galleries'
import { fetchCloudinaryFolder, fetchCloudinaryByPrefix, type GalleryImage } from '@/lib/cloudinary'
import { generatePageMetadata } from '@/lib/metadata'
import GalleryLightbox from '@/components/sections/GalleryLightbox'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllGallerySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const gallery = getGalleryBySlug(params.slug)
  if (!gallery) return {}

  return generatePageMetadata({
    title: `${gallery.title} | ${gallery.category}`,
    description: gallery.description,
    path: `/gallery/${gallery.slug}`,
    keywords: [
      'graduation photography',
      'Western NC portrait photographer',
      'Sylva NC photographer',
      gallery.title,
    ],
  })
}

export default async function GalleryPage({ params }: PageProps) {
  const gallery = getGalleryBySlug(params.slug)
  if (!gallery) notFound()

  // Fetch images from Cloudinary at build time (SSG)
  let images: GalleryImage[] = []
  if (gallery.cloudinaryPrefix) {
    images = await fetchCloudinaryByPrefix(gallery.cloudinaryPrefix)
  } else if (gallery.cloudinaryFolder) {
    images = await fetchCloudinaryFolder(gallery.cloudinaryFolder)
  }

  return (
    <>
      {/* Header */}
      <section className="bg-primary pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/portraits" className="hover:text-accent transition-colors">
                Portraits
              </Link>
              <span>/</span>
              <span className="text-text-primary">{gallery.title}</span>
            </nav>

            {/* Title */}
            <div className="max-w-3xl">
              <p className="label-text text-accent mb-4">{gallery.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
                {gallery.title}
              </h1>
              {gallery.subtitle && (
                <p className="text-xl md:text-2xl text-text-muted font-light">
                  {gallery.subtitle}
                </p>
              )}
              <p className="text-text-muted mt-6 max-w-2xl leading-relaxed">
                {gallery.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <GalleryLightbox images={images} title={gallery.title} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="label-text text-accent mb-4">Love what you see?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
              Let&apos;s Create Your Own Gallery
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Whether it&apos;s graduation portraits, family sessions, or professional headshots —
              every session is tailored to celebrate your unique story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary font-medium rounded hover:bg-accent/90 transition-colors"
              >
                Book Your Session
              </Link>
              <Link
                href="/portraits"
                className="inline-flex items-center justify-center px-8 py-3 border border-accent/30 text-accent rounded hover:bg-accent/10 transition-colors"
              >
                View Portrait Info
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

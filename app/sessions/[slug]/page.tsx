import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllSessionSlugs, getSessionBySlug, getAllSessions } from '@/lib/contentful'
import { fetchCloudinaryFolder, type GalleryImage } from '@/lib/cloudinary'
import { generatePageMetadata } from '@/lib/metadata'
import GalleryLightbox from '@/components/sections/GalleryLightbox'
import SessionCard from '@/components/sections/SessionCard'
import AnimatedSection from '@/components/ui/AnimatedSection'

// ---------------------------------------------------------------------------
// ISR
// ---------------------------------------------------------------------------

export const revalidate = 60

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const slugs = await getAllSessionSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const session = await getSessionBySlug(slug)
  if (!session) return {}

  return generatePageMetadata({
    title: `${session.title} | ${session.category}`,
    description: `${session.title} — ${session.category} photography session by Kairos Photography Studio in Western North Carolina.`,
    path: `/sessions/${session.slug}`,
    image: session.image,
    keywords: [session.category, 'photography session', 'Western NC photographer', session.title],
  })
}

// ---------------------------------------------------------------------------
// Session Gallery Page
// ---------------------------------------------------------------------------

export default async function SessionGalleryPage({ params }: PageProps) {
  const { slug } = await params
  const session = await getSessionBySlug(slug)
  if (!session) notFound()

  // Fetch gallery images from Cloudinary
  let galleryImages: GalleryImage[] = []
  if (session.galleryFolder) {
    galleryImages = await fetchCloudinaryFolder(session.galleryFolder)
  }

  // Related sessions (same category, excluding current)
  const allSessions = await getAllSessions()
  const relatedSessions = allSessions
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Header */}
      <section className="bg-primary pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            {/* Breadcrumbs */}
            <nav
              className="flex items-center gap-2 text-sm text-text-muted mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/sessions" className="hover:text-accent transition-colors">
                Sessions
              </Link>
              <span>/</span>
              <span className="text-text-primary">{session.title}</span>
            </nav>

            {/* Title */}
            <div className="max-w-3xl">
              <p className="label-text text-accent mb-4">{session.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
                {session.title}
              </h1>
              <p className="text-text-muted font-sans">{formattedDate}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <GalleryLightbox images={galleryImages} title={session.title} />
        </div>
      </section>

      {/* Related Sessions */}
      {relatedSessions.length > 0 && (
        <section className="bg-primary py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
                More Sessions
              </p>
              <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
                Explore Other Galleries
              </h2>
            </AnimatedSection>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSessions.map((related) => (
                <SessionCard key={related.slug} session={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="label-text text-accent mb-4">Love what you see?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
              Let&apos;s Create Your Own Gallery
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Every session is tailored to celebrate your unique story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary font-medium rounded hover:bg-accent/90 transition-colors"
              >
                Book Your Session
              </Link>
              <Link
                href="/sessions"
                className="inline-flex items-center justify-center px-8 py-3 border border-accent/30 text-accent rounded hover:bg-accent/10 transition-colors"
              >
                Browse All Sessions
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

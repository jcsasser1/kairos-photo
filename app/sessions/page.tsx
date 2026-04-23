import { generatePageMetadata } from '@/lib/metadata'
import { getAllSessions, getSessionCategories } from '@/lib/contentful'
import SessionsContent from '@/components/sections/SessionsContent'
import AnimatedSection from '@/components/ui/AnimatedSection'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: 'Sessions',
  description:
    'Browse recent photography sessions from Kairos Photography Studio. Weddings, portraits, graduates, and more across Western North Carolina.',
  path: '/sessions',
  keywords: [
    'photography sessions WNC',
    'Western North Carolina photo gallery',
    'Sylva NC photographer portfolio',
    'wedding photography gallery',
    'portrait session gallery',
  ],
})

// ---------------------------------------------------------------------------
// ISR
// ---------------------------------------------------------------------------

export const revalidate = 60

// ---------------------------------------------------------------------------
// Sessions Page
// ---------------------------------------------------------------------------

export default async function SessionsPage() {
  const sessions = await getAllSessions()
  const categories = await getSessionCategories()

  return (
    <>
      {/* Hero */}
      <section className="bg-primary pb-10 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Client Galleries
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
                Sessions
              </h1>
              <p className="mt-6 font-sans text-lg text-text-muted">
                A look into recent sessions across Western North Carolina.
                Every shoot tells a story.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Sessions Grid with Filters */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SessionsContent sessions={sessions} categories={categories} />
        </div>
      </section>
    </>
  )
}

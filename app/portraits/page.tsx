import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { images, business, faq } from "@/lib/data";
import { fetchCloudinaryFolder } from "@/lib/cloudinary";
import HeroSection from "@/components/sections/HeroSection";
import MasonryGallery from "@/components/sections/MasonryGallery";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { LeadCaptureInline } from "@/components/sections/LeadCapture";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Portrait Photography | Western NC Portrait Photographer",
  description:
    "Natural, relaxed portrait photography in Western North Carolina for graduates, families, professionals, and seniors. Sessions in Sylva, Asheville, and across the Blue Ridge mountains.",
  path: "/portraits",
  image: images.portraits.hero,
  keywords: [
    "Western NC portrait photographer",
    "Sylva NC photographer",
    "family portrait photographer WNC",
    "senior portrait photographer NC",
    "professional headshot photographer Asheville",
    "graduation photos Western NC",
  ],
});

// galleryImages is built inside PortraitsPage so it can pull from Cloudinary.

// ---------------------------------------------------------------------------
// Session Types
// ---------------------------------------------------------------------------

// sessionTypes is built inside PortraitsPage so the Graduates card
// can use the dynamically-fetched image from Cloudinary.

// ---------------------------------------------------------------------------
// Portraits Page
// ---------------------------------------------------------------------------

export const revalidate = 60;

export default async function PortraitsPage() {
  // Pull whatever image is currently in the Portraits/Hero Image folder
  const heroImages = await fetchCloudinaryFolder("Portraits/Hero Image");
  const heroImage = heroImages[0]?.src ?? images.portraits.hero;

  // Graduates card image from Cloudinary
  const graduatesCardImages = await fetchCloudinaryFolder("Portraits/Graduates Card");
  const graduatesCardImage = graduatesCardImages[0]?.src ?? images.portraits.gallery[3];

  // Headshots card image from Cloudinary
  const headshotsCardImages = await fetchCloudinaryFolder("Portraits/Headshots Card");
  const headshotsCardImage = headshotsCardImages[0]?.src ?? images.portraits.gallery[1];

  // Family card image from Cloudinary
  const familyCardImages = await fetchCloudinaryFolder("Portraits/Family Card");
  const familyCardImage = familyCardImages[0]?.src ?? images.portraits.gallery[2];

  // Style guide card image from Cloudinary
  const styleGuideCardImages = await fetchCloudinaryFolder("Portraits/Style Guide Card Image");
  const styleGuideCardImage = styleGuideCardImages[0]?.src ?? images.portraits.gallery[5];

  // Recent sessions gallery images from Cloudinary
  const recentSessionsImages = await fetchCloudinaryFolder(
    "Portraits/Recent sessions section"
  );
  const galleryImages =
    recentSessionsImages.length > 0
      ? recentSessionsImages.map((img) => ({
          src: img.thumbnail,
          alt: img.alt,
          category: "Portraits",
          width: img.width,
          height: img.height,
        }))
      : images.portraits.gallery.map((src, i) => ({
          src,
          alt: `Portrait photo ${i + 1}`,
          category: "Portraits",
          width: 800,
          height: [1000, 800, 600, 1000, 800, 600][i] ?? 800,
        }));

  const sessionTypes = [
    {
      image: graduatesCardImage,
      title: "Graduates",
      description:
        "Celebrate your milestone with portraits that are fun, authentic, and completely you. Cap and gown or casual — your call.",
      price: "From $150",
    },
    {
      image: headshotsCardImage,
      title: "Headshots & Professional",
      description:
        "Polished headshots for your website, LinkedIn, or business branding. Studio or on-location options available.",
      price: "From $200/hr",
    },
    {
      image: familyCardImage,
      title: "Family",
      description:
        "Relaxed sessions that capture how your family actually is — the laughter, the chaos, the real connection.",
      price: "From $200/hr",
    },
  ];

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero                                                            */}
      {/* ================================================================= */}
      <HeroSection
        image={heroImage}
        title="Be Yourself. We'll Capture the Magic."
        subtitle="Natural, relaxed portrait sessions for graduates, families, professionals, and seniors across Western North Carolina."
      >
        <Button href="/contact" variant="primary" size="lg">
          Book Your Session
        </Button>
        <Button href="#pricing" variant="outline" size="lg">
          Scroll for Pricing
        </Button>
      </HeroSection>

      {/* ================================================================= */}
      {/* 2. Gallery                                                         */}
      {/* ================================================================= */}
      <section id="gallery" className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Portfolio
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Recent Portrait Sessions
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <MasonryGallery images={galleryImages} hideLabels />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Session Types                                                   */}
      {/* ================================================================= */}
      <section id="pricing" className="bg-primary py-20 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Sessions
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Find Your Session
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-text-muted">
              Every session is tailored to you. Pick a starting point and we will
              build the experience around your vision.
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sessionTypes.map((session, i) => (
              <AnimatedSection key={session.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-text-muted/20 bg-secondary transition-colors duration-300 hover:border-accent/40">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={session.image}
                      alt={`${session.title} portrait session`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {session.title}
                    </h3>
                    <p className="mt-2 flex-grow font-sans text-sm leading-relaxed text-text-muted">
                      {session.description}
                    </p>
                    <p className="mt-4 font-sans text-sm font-semibold text-accent">
                      {session.price}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. What to Wear Guide Teaser                                       */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <AnimatedSection>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={styleGuideCardImage}
                  alt="Portrait session styling and wardrobe inspiration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Style Guide
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                Not Sure What to Wear?
              </h2>
              <p className="mt-6 font-sans leading-relaxed text-text-muted">
                Choosing the right outfit can feel overwhelming, but it does not
                have to be. I put together a free style guide with my best tips
                on colors, patterns, layering, and how to coordinate with your
                family -- so you can show up feeling confident and camera-ready.
              </p>
              <p className="mt-4 font-sans leading-relaxed text-text-muted">
                From what works best in natural light to the patterns you should
                avoid, this guide covers everything you need to know before your
                session.
              </p>
              <div className="mt-8">
                <LeadCaptureInline
                  subtext="Enter your email and I'll send it straight to your inbox."
                  ctaLabel="Send Me the Guide"
                  magnetKey="style-guide"
                  source="style-guide-inline"
                  hideDisclaimer
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. FAQ                                                             */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Questions
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <FAQAccordion items={faq.portraits} />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. CTA Banner                                                      */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Ready?
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Ready for Your Session?
              </h2>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Whether it is a graduation milestone, a family update, or a fresh
                professional headshot, let&apos;s create portraits that feel like
                you.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Book Now
                </Button>
                <Button href="tel:(828) 555-0192" variant="outline" size="lg">
                  Call {business.phone}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

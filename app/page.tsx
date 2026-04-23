import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { features } from "@/lib/features";
import {
  images,
  business,
  services,
  testimonials,
  socialLinks,
  about,
} from "@/lib/data";
import { fetchCloudinaryFolder } from "@/lib/cloudinary";
import { getAllReviews } from "@/lib/contentful";
import HeroSection from "@/components/sections/HeroSection";
import ServiceCard from "@/components/sections/ServiceCard";
import MasonryGallery from "@/components/sections/MasonryGallery";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: `${business.name} | ${business.tagline}`,
  description: `${business.name} in ${business.location} -- wedding, portrait, and real estate photography across Western North Carolina. ${business.tagline}`,
  path: "/",
  keywords: [
    "Western North Carolina wedding photographer",
    "Sylva NC photographer",
    "Asheville wedding photographer",
    "WNC portrait photographer",
    "NC real estate photography",
  ],
});

// ---------------------------------------------------------------------------
// ISR — revalidate every 60 seconds
export const revalidate = 60;

// ---------------------------------------------------------------------------
// Service Card Mappings
// ---------------------------------------------------------------------------

// serviceCards is built inside HomePage so the Real Estate card
// can use the dynamically-fetched hero image from Cloudinary.

// ---------------------------------------------------------------------------
// Home Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  // Fetch featured work from Cloudinary
  const cloudinaryImages = await fetchCloudinaryFolder("Featured Work");
  const featuredImages = cloudinaryImages.map((img) => ({
    src: img.thumbnail,
    alt: img.alt,
    category: "Featured",
    width: img.width,
    height: img.height,
  }));

  // Fetch Real Estate hero from Cloudinary (shared with /real-estate page)
  const realEstateHeroImages = await fetchCloudinaryFolder("Real Estate/Hero Image");
  const realEstateHeroImage = realEstateHeroImages[0]?.src ?? images.realEstate.hero;

  // Fetch Portraits hero from Cloudinary (shared with /portraits page)
  const portraitsHeroImages = await fetchCloudinaryFolder("Portraits/Hero Image");
  const portraitsHeroImage = portraitsHeroImages[0]?.src ?? images.portraits.hero;

  // Build service cards with dynamic images
  const allServiceCards = [
    {
      title: "Weddings & Couples",
      description: services[0].shortDescription,
      image: "https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1200/DSC08902_kmmzgj",
      href: "/weddings",
      feature: "weddings" as const,
    },
    {
      title: "Real Estate",
      description: services[1].shortDescription,
      image: realEstateHeroImage,
      href: "/real-estate",
      feature: "realEstate" as const,
    },
    {
      title: "Portraits & Graduates",
      description: services[2].shortDescription,
      image: portraitsHeroImage,
      href: "/portraits",
      feature: "portraits" as const,
    },
  ];
  const serviceCards = allServiceCards.filter((card) => features[card.feature]);

  // Fetch reviews from Contentful
  const contentfulReviews = await getAllReviews();
  const reviewItems = contentfulReviews.length > 0
    ? contentfulReviews.map((r) => ({
        name: r.clientName,
        role: r.clientType,
        quote: r.reviewText,
      }))
    : testimonials.map((t) => ({
        name: t.name,
        role: t.role,
        quote: t.quote,
      }));

  const instagramHandle =
    socialLinks.find((s) => s.name === "Instagram")?.handle ?? "@kairosphotographystudio";

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero Section                                                    */}
      {/* ================================================================= */}
      <HeroSection
        image="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1920/DSC08902_kmmzgj"
        title="Photos that feel like living. Not posing."
        subtitle={`Western North Carolina Photographer — ${[
          features.weddings && "Weddings",
          features.realEstate && "Real Estate",
          features.portraits && "Portraits",
        ].filter(Boolean).join(" · ")}`}
      >
        <Button href="/sessions" variant="primary" size="lg">
          See My Work
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Book a Session
        </Button>
      </HeroSection>

      {/* ================================================================= */}
      {/* 2. Services Overview                                               */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              What I Do
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Photography Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-text-muted">
              From mountain-top weddings to listings that sell faster, every
              shoot gets my full attention and creative energy.
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {serviceCards.map((service, i) => (
              <AnimatedSection key={service.href} delay={i * 0.15}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  href={service.href}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. Featured Portfolio Grid                                         */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Portfolio
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Featured Work
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <MasonryGallery images={featuredImages} hideLabels />
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Button href="/sessions" variant="outline" size="md">
              View Full Portfolio
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. Testimonials                                                    */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Kind Words
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              What Clients Say
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <TestimonialCarousel testimonials={reviewItems} />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. About Teaser                                                    */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Portrait Image */}
            <AnimatedSection>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1200/B_B_SM_-_Jeremy-34_amovsv"
                  alt="Jeremy, photographer at Kairos Photography Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            {/* Text Content */}
            <AnimatedSection delay={0.2}>
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                The Photographer
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                {about.headline}
              </h2>
              <p className="mt-6 font-sans leading-relaxed text-text-muted">
                {about.intro}
              </p>
              <p className="mt-4 font-sans leading-relaxed text-text-muted">
                {about.story[0]}
              </p>
              <div className="mt-8">
                <Button href="/about" variant="primary" size="md">
                  Meet Jeremy Sasser
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. Instagram Feed (Elfsight)                                       */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              {instagramHandle}
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Follow Along
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <div className="elfsight-app-f81cd164-1e24-4da4-868d-0bff71499f90" data-elfsight-app-lazy />
          </div>
        </div>
      </section>
    </>
  );
}

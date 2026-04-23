import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import {
  images,
  business,
  services,
  pricing,
  faq,
  testimonials,
} from "@/lib/data";
import { fetchCloudinaryFolder } from "@/lib/cloudinary";
import HeroSection from "@/components/sections/HeroSection";
import MasonryGallery from "@/components/sections/MasonryGallery";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Wedding Photography | Western North Carolina & Asheville",
  description:
    "Documentary-style wedding photography across Western North Carolina and Asheville. Authentic, emotional coverage of your love story from intimate elopements to full celebrations in the Blue Ridge mountains.",
  path: "/weddings",
  image: images.weddings.hero,
  keywords: [
    "Western North Carolina wedding photographer",
    "Asheville wedding photographer",
    "Blue Ridge wedding photographer",
    "WNC elopement photographer",
    "mountain wedding photography",
    "documentary wedding photographer NC",
  ],
});

// ISR — revalidate every 60 seconds
export const revalidate = 60;

// ---------------------------------------------------------------------------
// Timeline Steps
// ---------------------------------------------------------------------------

const timelineSteps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We start with a relaxed conversation about your vision, your venue, and the moments that matter most. No pressure, no sales pitch -- just getting to know your story.",
  },
  {
    number: "02",
    title: "Your Day",
    description:
      "I blend into the background and let your day unfold naturally. From getting ready to the last dance, I capture the real emotions, the quiet glances, and the unscripted joy.",
  },
  {
    number: "03",
    title: "Gallery Delivery",
    description:
      "Within 6-8 weeks, your private online gallery is ready with every image individually edited. Download, share, and relive every moment whenever you want.",
  },
];

// ---------------------------------------------------------------------------
// Pricing Data
// ---------------------------------------------------------------------------

const weddingPricing = pricing.find((p) => p.slug === "weddings");
const proposalPricing = pricing.find((p) => p.slug === "proposals");
const weddingService = services.find((s) => s.slug === "weddings");

// ---------------------------------------------------------------------------
// Weddings Page
// ---------------------------------------------------------------------------

export default async function WeddingsPage() {
  const cloudinaryImages = await fetchCloudinaryFolder("Wedding Portfolio");
  const galleryImages = cloudinaryImages.map((img) => ({
    src: img.thumbnail,
    alt: img.alt,
    category: "Weddings",
    width: img.width,
    height: img.height,
  }));

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero                                                            */}
      {/* ================================================================= */}
      <HeroSection
        image="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1920/DSC03929_aoeoud"
        title="Your Love Story, Authentically Told"
        subtitle="Documentary-style wedding photography across Western North Carolina -- from intimate elopements to grand celebrations in the Blue Ridge mountains."
      >
        <Button href="/contact" variant="primary" size="lg">
          Check Availability
        </Button>
        <Button href="#pricing" variant="outline" size="lg">
          Scroll for Pricing
        </Button>
      </HeroSection>

      {/* ================================================================= */}
      {/* 2. Philosophy                                                      */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                My Approach
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                Documentary. Candid. Emotional.
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-text-muted">
                {weddingService?.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Gallery                                                         */}
      {/* ================================================================= */}
      <section id="gallery" className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Portfolio
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Recent Wedding Stories
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <MasonryGallery images={galleryImages} hideLabels />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. What to Expect -- Timeline                                      */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              The Process
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              What to Expect
            </h2>
          </AnimatedSection>

          <div className="relative mt-16">
            {/* Vertical connector line (desktop) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-accent/20 md:block" />

            <div className="relative grid gap-12 md:gap-16">
              {/* Vertical connector line (desktop) */}
              <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-accent/20 md:block" />

              {timelineSteps.map((step, i) => (
                <AnimatedSection key={step.number} delay={i * 0.15}>
                  <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-12">
                    {/* Left content */}
                    <div
                      className={`text-center md:text-right ${
                        i % 2 === 0 ? "" : "md:invisible"
                      }`}
                    >
                      {i % 2 === 0 && (
                        <>
                          <h3 className="font-serif text-xl font-bold text-text-primary md:text-2xl">
                            {step.title}
                          </h3>
                          <p className="mt-3 font-sans leading-relaxed text-text-muted">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Number circle — always centered */}
                    <div className="relative z-10 mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent bg-secondary">
                      <span className="font-serif text-2xl font-bold text-accent">
                        {step.number}
                      </span>
                    </div>

                    {/* Right content */}
                    <div
                      className={`text-center md:text-left ${
                        i % 2 !== 0 ? "" : "md:invisible"
                      }`}
                    >
                      {i % 2 !== 0 && (
                        <>
                          <h3 className="font-serif text-xl font-bold text-text-primary md:text-2xl">
                            {step.title}
                          </h3>
                          <p className="mt-3 font-sans leading-relaxed text-text-muted">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. Featured Venue                                                  */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <AnimatedSection>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1200/DSC01710_ueusuu"
                  alt="Castle Ladyhawke wedding venue in Western North Carolina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Featured Venue
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                Castle Ladyhawke
              </h2>
              <p className="mt-6 font-sans leading-relaxed text-text-muted">
                Nestled in the mountains of Western North Carolina, Castle
                Ladyhawke is one of the most breathtaking wedding venues in the
                region. With its European-inspired architecture, sweeping mountain
                views, and magical golden-hour light, it is a dream backdrop for
                couples who want timeless, romantic imagery.
              </p>
              <p className="mt-4 font-sans leading-relaxed text-text-muted">
                I have had the privilege of photographing multiple celebrations
                here and know every angle that makes this venue shine. If Castle
                Ladyhawke is your venue, I would love to talk about capturing your
                day there.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="outline" size="md">
                  Ask About This Venue
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. Packages Overview                                               */}
      {/* ================================================================= */}
      <section id="pricing" className="bg-secondary py-20 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Investment
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Wedding Packages
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-text-muted">
              {weddingPricing?.description}
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {weddingPricing?.tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.15}>
                <div
                  className={`relative flex h-full flex-col rounded-lg border p-8 transition-colors duration-300 ${
                    tier.popular
                      ? "border-accent bg-accent/5"
                      : "border-text-muted/20 bg-primary"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-sans text-xs font-semibold uppercase tracking-label text-primary">
                      Most Popular
                    </span>
                  )}

                  <h3 className="font-serif text-xl font-bold text-text-primary">
                    {tier.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-text-muted">
                    {tier.description}
                  </p>
                  <p className="mt-4 font-serif text-4xl font-bold text-accent">
                    {tier.price}
                  </p>

                  <ul className="mt-6 flex-grow space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 font-sans text-sm text-text-muted"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 flex-shrink-0 text-accent"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      href="/contact"
                      variant={tier.popular ? "primary" : "outline"}
                      size="md"
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {weddingPricing?.note && (
            <AnimatedSection className="mt-10">
              <p className="text-center font-sans text-sm text-text-muted">
                {weddingPricing.note}
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. Proposals & Engagements                                         */}
      {/* ================================================================= */}
      {proposalPricing && (
        <section className="bg-primary py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection>
              <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
                Before the Big Day
              </p>
              <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
                Proposals &amp; Engagements
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-text-muted">
                {proposalPricing.description}
              </p>
            </AnimatedSection>

            <div className="mx-auto mt-14 grid max-w-3xl gap-8 md:grid-cols-2">
              {proposalPricing.tiers.map((tier, i) => (
                <AnimatedSection key={tier.name} delay={i * 0.15}>
                  <div
                    className={`relative flex h-full flex-col rounded-lg border p-8 transition-colors duration-300 ${
                      tier.popular
                        ? "border-accent bg-accent/5"
                        : "border-text-muted/20 bg-secondary"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-sans text-xs font-semibold uppercase tracking-label text-primary">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {tier.name}
                    </h3>
                    <p className="mt-2 font-sans text-sm text-text-muted">
                      {tier.description}
                    </p>
                    <p className="mt-4 font-serif text-3xl font-bold text-accent">
                      {tier.price}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 font-sans text-sm text-text-muted"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/contact"
                      variant={tier.popular ? "primary" : "outline"}
                      size="md"
                      className="mt-8 w-full text-center"
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 8. FAQ                                                             */}
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
            <FAQAccordion items={faq.weddings} />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. CTA Banner                                                      */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Ready?
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Let&apos;s Talk About Your Wedding
              </h2>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Every love story is different. Tell me about yours, and let&apos;s
                make sure those once-in-a-lifetime moments are captured exactly
                the way they felt.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Book Your Date
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

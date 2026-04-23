import Image from "next/image";
import { redirect } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { features } from "@/lib/features";
import { images, business, services, pricing, faq } from "@/lib/data";
import { fetchCloudinaryFolder } from "@/lib/cloudinary";
import HeroSection from "@/components/sections/HeroSection";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Real Estate Photography | NC Real Estate Photography",
  description:
    "Professional real estate photography services in Western North Carolina. MLS-ready images, twilight exteriors, aerial drone photography, and 72 hour turnaround (24 hour rush available) for agents and homeowners across the Asheville area.",
  path: "/real-estate",
  image: images.realEstate.hero,
  keywords: [
    "NC real estate photography",
    "Asheville real estate photos",
    "real estate photographer Western NC",
    "MLS photography Asheville",
    "drone real estate photography NC",
    "twilight real estate photos",
  ],
});

// ---------------------------------------------------------------------------
// Value Propositions
// ---------------------------------------------------------------------------

const valueProps = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "72 Hour Turnaround",
    description:
      "Get your listing live fast. Edited, MLS-ready images delivered within 72 hours of your shoot.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "MLS-Ready Images",
    description:
      "Every image is formatted, sized, and color-corrected for MLS, Zillow, Realtor.com, and your brokerage site.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="9" x2="12" y2="2" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
        <polyline points="8 6 12 2 16 6" />
      </svg>
    ),
    title: "Twilight & Golden Hour",
    description:
      "Dramatic exterior shots at dusk that make buyers fall in love before they ever step inside.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Aerial & Drone",
    description:
      "FAA-certified drone photography that showcases acreage, mountain views, and neighborhood context from above.",
  },
];

// ---------------------------------------------------------------------------
// Service Cards
// ---------------------------------------------------------------------------

const realEstateServices = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "Standard Shoot",
    description:
      "HDR interiors and exteriors with professional editing. Perfect for residential listings up to 3,000 sq ft.",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="9" x2="12" y2="2" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
        <polyline points="8 6 12 2 16 6" />
      </svg>
    ),
    title: "Twilight Photography",
    description:
      "Exterior shots captured during the golden hour and blue hour for maximum curb appeal and buyer engagement.",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "Video Tours",
    description:
      "Cinematic property walkthroughs and agent-led video tours that give buyers a real feel for the space before they ever step inside.",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Aerial / Drone",
    description:
      "FAA Part 107 certified aerial photography for properties with acreage, waterfront access, or stunning mountain views.",
  },
];

// ---------------------------------------------------------------------------
// Deliverables
// ---------------------------------------------------------------------------

const deliverables = [
  "High-resolution, edited images in MLS-ready and web-optimized sizes",
  "Secure online gallery with direct download access",
  "HDR processing for balanced interior lighting",
  "Blue sky replacement and color correction as needed",
  "Social media sized images for Instagram and Facebook marketing",
  "Licensed for full commercial use by the listing agent",
];

// ---------------------------------------------------------------------------
// Trusted Agencies
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Pricing Data
// ---------------------------------------------------------------------------

const realEstatePricing = pricing.find((p) => p.slug === "real-estate");
const realEstateServiceData = services.find((s) => s.slug === "real-estate");

// ---------------------------------------------------------------------------
// Real Estate Page
// ---------------------------------------------------------------------------

export const revalidate = 60;

export default async function RealEstatePage() {
  if (!features.realEstate) redirect("/");

  // Pull whatever image is currently in the Real Estate/Hero Image folder
  const heroImages = await fetchCloudinaryFolder("Real Estate/Hero Image");
  const heroImage = heroImages[0]?.src ?? images.realEstate.hero;

  // Turnaround section image from Cloudinary
  const turnaroundImages = await fetchCloudinaryFolder("Real Estate/Turnaround Image");
  const turnaroundImage = turnaroundImages[0]?.src ?? images.realEstate.gallery[2];

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero                                                            */}
      {/* ================================================================= */}
      <HeroSection
        image={heroImage}
        title="Sell the Dream. One Frame at a Time."
        subtitle="Professional real estate photography that helps listings stand out and sell faster across Western North Carolina."
      >
        <Button href="/contact" variant="primary" size="lg">
          Book a Shoot
        </Button>
        <Button href="#pricing" variant="outline" size="lg">
          Scroll for Pricing
        </Button>
      </HeroSection>

      {/* ================================================================= */}
      {/* 2. Value Propositions                                              */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Why It Matters
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              First Impressions Happen Online
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-text-muted">
              {realEstateServiceData?.description}
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, i) => (
              <AnimatedSection key={prop.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 text-accent">
                    {prop.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-text-primary">
                    {prop.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-text-muted">
                    {prop.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Slider — hidden for now
      <section className="bg-primary py-20 md:py-24">
        ...
      </section>
      */}

      {/* ================================================================= */}
      {/* 4. Services                                                        */}
      {/* ================================================================= */}
      <section id="services" className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Services
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              What I Offer
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {realEstateServices.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="flex gap-5 rounded-lg border border-text-muted/20 bg-primary p-6 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex-shrink-0 text-accent">{service.icon}</div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. Turnaround & Deliverables                                       */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <AnimatedSection>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={turnaroundImage}
                  alt="Professionally photographed home interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Turnaround & Deliverables
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                72 Hour Delivery
              </h2>
              <p className="mt-6 font-sans leading-relaxed text-text-muted">
                Time kills deals. That is why every real estate shoot is edited
                and delivered within 72 hours. Need it faster? A rushed 24-hour
                turnaround is available for an additional fee &mdash; just ask
                when you book.
              </p>

              <ul className="mt-6 space-y-3">
                {deliverables.map((item) => (
                  <li
                    key={item}
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
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. Packages                                                        */}
      {/* ================================================================= */}
      <section id="pricing" className="bg-secondary py-20 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Pricing
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Real Estate Packages
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-text-muted">
              {realEstatePricing?.description}
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {realEstatePricing?.tiers.map((tier, i) => (
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

          {/* Horizontal Add-Ons Card */}
          <AnimatedSection className="mt-12">
            <div className="rounded-lg border border-accent/30 bg-primary p-8 md:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                {/* Left — intro */}
                <div className="lg:w-1/3">
                  <p className="font-sans text-xs uppercase tracking-label text-accent">
                    Add-Ons
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold text-text-primary md:text-3xl">
                    Elevate Any Listing
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted">
                    Mix and match premium extras to make your property stand
                    out. Add any of these to a package at booking.
                  </p>
                </div>

                {/* Right — add-ons grid */}
                <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                  {[
                    { name: "Drone Photos (10 images)", price: "$100" },
                    { name: "Drone Video + Photos", price: "$250" },
                    { name: "Twilight Photos (5 images)", price: "$200" },
                    { name: "Video Showcase Tour", price: "$500" },
                    { name: "Video Agent Tour", price: "$750" },
                  ].map((addon) => (
                    <div
                      key={addon.name}
                      className="flex items-center justify-between gap-3 border-b border-text-muted/10 py-2"
                    >
                      <span className="font-sans text-sm text-text-primary">
                        {addon.name}
                      </span>
                      <span className="font-serif text-lg font-bold text-accent">
                        {addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {realEstatePricing?.note && (
            <AnimatedSection className="mt-10">
              <p className="text-center font-sans text-sm text-text-muted">
                {realEstatePricing.note}
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. FAQ                                                             */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
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
            <FAQAccordion items={faq["real-estate"]} />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. CTA Banner                                                      */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Get Started
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Ready to Elevate Your Listings?
              </h2>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Book a real estate shoot today and get professional, MLS-ready
                images delivered to your inbox within 48 hours.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Schedule a Shoot
                </Button>
                <Button href={`tel:${business.phone}`} variant="outline" size="lg">
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

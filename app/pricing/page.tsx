import { generatePageMetadata } from "@/lib/metadata";
import { features } from "@/lib/features";
import { business, pricing, faq } from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";
import PricingCard from "@/components/sections/PricingCard";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Pricing",
  description:
    "Straightforward pricing for wedding, real estate, and portrait photography in Western North Carolina. Explore packages starting at $200 and find the perfect fit for your project.",
  path: "/pricing",
  keywords: [
    "photography pricing WNC",
    "wedding photographer cost Asheville",
    "real estate photography pricing NC",
    "portrait session pricing Sylva NC",
  ],
});

// ---------------------------------------------------------------------------
// Category Icons
// ---------------------------------------------------------------------------

const categoryIcons: Record<string, React.ReactNode> = {
  weddings: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  "real-estate": (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  portraits: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Pricing Page
// ---------------------------------------------------------------------------

export default function PricingPage() {
  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero                                                            */}
      {/* ================================================================= */}
      <section className="bg-primary pb-10 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Packages &amp; Pricing
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
                Investment
              </h1>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Straightforward pricing for every type of shoot. Each package
                includes professional editing, an online gallery, and my full
                attention on your project.
              </p>
            </div>
            <a href="#packages" className="mt-8 inline-flex items-center gap-2 font-sans text-sm text-accent transition-colors hover:text-accent/80">
              Scroll for Pricing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. Pricing Categories                                              */}
      {/* ================================================================= */}
      {pricing
        .filter((category) => {
          const featureMap: Record<string, keyof typeof features> = {
            weddings: "weddings",
            "real-estate": "realEstate",
            portraits: "portraits",
          };
          const key = featureMap[category.slug];
          return !key || features[key];
        })
        .map((category, catIndex) => (
        <section
          key={category.slug}
          id={catIndex === 0 ? "packages" : category.slug}
          className={`${
            catIndex % 2 === 0 ? "bg-secondary" : "bg-primary"
          } py-20 md:py-24 scroll-mt-20`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection>
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                  {categoryIcons[category.slug]}
                </div>
                <h2 className="font-serif text-3xl font-bold text-text-primary md:text-4xl">
                  {category.title}
                </h2>
                <p className="mt-4 font-sans text-text-muted">
                  {category.description}
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {category.tiers.map((tier, i) => (
                <AnimatedSection key={tier.name} delay={i * 0.15}>
                  <PricingCard
                    name={tier.name}
                    price={tier.price}
                    features={tier.features}
                    featured={i === 1}
                    cta={tier.cta}
                    href="/contact"
                  />
                </AnimatedSection>
              ))}
            </div>

            {category.note && (
              <AnimatedSection className="mt-10">
                <p className="text-center font-sans text-sm text-text-muted">
                  {category.note}
                </p>
              </AnimatedSection>
            )}
          </div>
        </section>
      ))}

      {/* ================================================================= */}
      {/* 3. FAQ                                                             */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              Questions
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Pricing FAQ
            </h2>
          </AnimatedSection>

          <div className="mt-14">
            <FAQAccordion items={faq.pricing} />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. Custom Quote CTA                                                */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Something Different?
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Custom Quote
              </h2>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Every project is unique. Let&apos;s create a package that fits
                your vision. Tell me about what you have in mind, and I will put
                together a custom proposal.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Request a Custom Quote
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

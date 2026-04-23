import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { business, about } from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "About Jeremy Sasser",
  description:
    "Meet Jeremy Sasser, the photographer behind Kairos Photography Studio in Sylva, NC. Learn about Jeremy's approach to capturing authentic moments across Western North Carolina.",
  path: "/about",
  keywords: [
    "Sylva NC photographer",
    "Western North Carolina photographer",
    "about Kairos Photography",
    "WNC portrait photographer",
  ],
});

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

const values = [
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
        className="text-accent"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Authentic",
    description:
      "The best photos happen when you stop performing for the camera. I create space for real emotions, real laughter, and real connection -- and the camera catches all of it.",
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
        className="text-accent"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Present",
    description:
      "I am fully there on your shoot day -- not distracted, not rushing, not checking a shot list. When I am present, I catch the moments that nobody else sees.",
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
        className="text-accent"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Intentional",
    description:
      "Every frame has a reason. I do not spray and pray -- I wait for the right light, the right expression, and the right moment. Quality over quantity, always.",
  },
];

// ---------------------------------------------------------------------------
// About Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero                                                            */}
      {/* ================================================================= */}
      <HeroSection
        image="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1920/B_B_SM_-_Jeremy-5_p2zpz3"
        title="The Photographer Behind the Lens"
        subtitle="Capturing the kairos -- the perfect, fleeting moment -- across Western North Carolina."
      />

      {/* ================================================================= */}
      {/* 2. Story                                                           */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Portrait */}
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

            {/* Story Text */}
            <AnimatedSection delay={0.2}>
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                My Story
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                {about.headline}
              </h2>
              <div className="mt-6 space-y-4">
                <p className="font-sans leading-relaxed text-text-muted">
                  {about.intro}
                </p>
                {about.story.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans leading-relaxed text-text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Values                                                          */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
              How I Work
            </p>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
              Three Pillars
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.15}>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                    {value.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 font-sans leading-relaxed text-text-muted">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. CTA                                                             */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Ready?
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Let&apos;s Work Together
              </h2>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Whether it is a wedding, a portrait session, or a property
                listing, I would love to hear about your project. Let&apos;s
                create something you will be proud of.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Get in Touch
                </Button>
                <Button href="/pricing" variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

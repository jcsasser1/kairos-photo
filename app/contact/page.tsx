import { generatePageMetadata } from "@/lib/metadata";
import { business, socialLinks } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Book a photography session with Kairos Photography Studio in Sylva, NC. Weddings, portraits, and real estate photography across Western North Carolina.",
  path: "/contact",
  keywords: [
    "book photographer Sylva NC",
    "Western North Carolina photography booking",
    "contact wedding photographer WNC",
    "Asheville photographer contact",
  ],
});

// ---------------------------------------------------------------------------
// Contact Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      {/* ================================================================= */}
      {/* 1. Minimal Hero                                                    */}
      {/* ================================================================= */}
      <section className="bg-primary pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sans text-xs uppercase tracking-label text-accent">
                Contact
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
                Let&apos;s Create Something Beautiful
              </h1>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Ready to book a session or have questions? Fill out the form
                below and I will be in touch soon.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. Dubsado Form + Info Panel                                       */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Dubsado Form (Left — Larger) */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <p className="font-sans text-xs uppercase tracking-label text-accent">
                  Send a Message
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                  Tell Me About Your Vision
                </h2>
                <div className="mt-8">
                  <iframe
                    src="https://dashboard.kairosphoto.co/public/form/view/698d4edb3be7dae32caf6c8a?iframe=true"
                    frameBorder={0}
                    width="100%"
                    height={750}
                    className="rounded-lg"
                    title="Booking inquiry form"
                  />
                  <script
                    type="text/javascript"
                    src="//cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js"
                  />
                  <script
                    dangerouslySetInnerHTML={{
                      __html: 'setTimeout(function(){if(typeof iFrameResize==="function"){iFrameResize({checkOrigin:false})}},30);',
                    }}
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Info Panel (Right) */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <p className="font-sans text-xs uppercase tracking-label text-accent">
                  Info
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary md:text-4xl">
                  Get in Touch
                </h2>

                <div className="mt-8 space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-primary">Email</p>
                      <a href={`mailto:${business.email}`} className="font-sans text-text-muted transition-colors hover:text-accent">
                        {business.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-primary">Phone</p>
                      <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="font-sans text-text-muted transition-colors hover:text-accent">
                        {business.phone}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-primary">Location</p>
                      <p className="font-sans text-text-muted">{business.location} | {business.region}</p>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-primary">Service Area</p>
                      <p className="font-sans text-text-muted">Serving all of Western NC, Asheville, and available for travel</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-primary">Instagram</p>
                      <a href={socialLinks[0].url} target="_blank" rel="noopener noreferrer" className="font-sans text-text-muted transition-colors hover:text-accent">
                        {socialLinks[0].handle}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="mt-8 rounded-lg border border-accent/20 bg-accent/5 px-5 py-4">
                  <p className="font-sans text-sm text-text-muted">
                    <span className="font-semibold text-accent">Response time:</span>{" "}
                    I typically respond within 24&ndash;48 hours.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Map Placeholder                                                 */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection>
            <div className="flex h-80 items-center justify-center rounded-lg bg-secondary md:h-96">
              <div className="text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-accent">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="mt-4 font-serif text-xl font-bold text-text-primary">Map &mdash; Sylva, NC</p>
                <p className="mt-2 font-sans text-sm text-text-muted">Located in the heart of Western North Carolina</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

import { generatePageMetadata } from "@/lib/metadata";
import { blogPosts as fallbackPosts } from "@/lib/data";
import { getAllBlogPosts } from "@/lib/contentful";
import BlogCard from "@/components/blog/BlogCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Photography tips, venue guides, and stories from behind the lens in Western North Carolina. Wedding planning advice, real estate photo tips, and portrait session prep from Kairos Photography Studio.",
  path: "/blog",
  keywords: [
    "WNC wedding venues blog",
    "photography tips",
    "real estate photography tips",
    "portrait session guide",
    "Western North Carolina photographer blog",
  ],
});

// ---------------------------------------------------------------------------
// Blog Index Page
// ---------------------------------------------------------------------------

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function BlogPage() {
  // Fetch from Contentful; fall back to hardcoded posts if none exist yet
  const contentfulPosts = await getAllBlogPosts();

  const posts =
    contentfulPosts.length > 0
      ? contentfulPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.date,
          category: p.category,
          excerpt: p.excerpt,
          image: p.image,
          readTime: p.readTime,
        }))
      : fallbackPosts;

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
                From the Blog
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
                Stories &amp; Tips
              </h1>
              <p className="mt-6 font-sans text-lg text-text-muted">
                Venue guides, session prep advice, and honest thoughts on
                photography in Western North Carolina.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. Blog Grid                                                       */}
      {/* ================================================================= */}
      <section className="bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.15}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

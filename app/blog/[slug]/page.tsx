import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts as fallbackPosts, business } from "@/lib/data";
import { getAllBlogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/lib/contentful";
import { fetchCloudinaryFolder, type GalleryImage } from "@/lib/cloudinary";
import { generatePageMetadata, generateArticleJsonLd, jsonLdScript } from "@/lib/metadata";
import BlogCard from "@/components/blog/BlogCard";
import RichTextBody from "@/components/blog/RichTextBody";
import GalleryLightbox from "@/components/sections/GalleryLightbox";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ---------------------------------------------------------------------------
// ISR — revalidate every 60 seconds
// ---------------------------------------------------------------------------

export const revalidate = 60;

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  // Try Contentful slugs first, fall back to hardcoded
  const contentfulSlugs = await getAllBlogSlugs();
  const slugs =
    contentfulSlugs.length > 0
      ? contentfulSlugs
      : fallbackPosts.map((p) => p.slug);

  return slugs.map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try Contentful first
  const contentfulPost = await getBlogPostBySlug(slug);
  if (contentfulPost) {
    return generatePageMetadata({
      title: contentfulPost.title,
      description: contentfulPost.excerpt,
      path: `/blog/${contentfulPost.slug}`,
      image: contentfulPost.image,
      keywords: [contentfulPost.category, "photography blog", "WNC photographer"],
    });
  }

  // Fall back to hardcoded
  const post = fallbackPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: [post.category, "photography blog", "WNC photographer"],
  });
}

// ---------------------------------------------------------------------------
// Hardcoded fallback content
// ---------------------------------------------------------------------------

const fallbackContent: Record<string, string[]> = {
  "best-wedding-venues-western-north-carolina": [
    "Western North Carolina is home to some of the most stunning wedding venues in the entire Southeast. After years of photographing weddings across this region, I have watched couples say their vows against backdrops that look like paintings -- misty mountain ridges, cascading waterfalls, and century-old barns draped in golden light. The variety is what makes WNC so special. Within an hour of Asheville, you can find everything from a grand estate to a rustic mountaintop clearing with views that stretch for miles.",
    "Some of my favorite venues sit along the Blue Ridge Parkway corridor, where elevation brings dramatic skies and that soft, diffused light that photographers dream about. Venues like The Ridge in Asheville offer sweeping panoramic views with modern amenities, while more intimate spots near Sylva and Waynesville provide a quieter, more personal feel. For couples who want something truly wild, elopement-style ceremonies on rocky outcrops or beside hidden waterfalls have become incredibly popular -- and the photos speak for themselves.",
    "One thing I always tell couples during the planning process: think about the light. A venue that faces west will give you incredible golden-hour portraits during a summer ceremony. A forest setting brings beautiful dappled light during midday. I have scouted most of the major WNC venues and know exactly where to position couples for the best shots at different times of day. That local knowledge is something you cannot get from a photographer who is flying in for the weekend.",
    "If you are planning a wedding in Western North Carolina and want help choosing a venue that will photograph beautifully, I am always happy to chat. The right venue sets the tone for the entire day -- and the entire gallery. Whether you are dreaming of a grand mountain celebration or an intimate riverside elopement, WNC has a spot that will take your breath away.",
  ],
  "real-estate-photography-tips-sell-faster": [
    "The statistics are hard to ignore: homes with professional photography sell faster and for more money than those with phone snapshots. In Western North Carolina, where the market includes everything from charming mountain cabins to modern Asheville condos, the visual first impression is often the only chance you get. Buyers are scrolling through dozens of listings, and the photos are what make them stop and click.",
    "So what separates a professional real estate photo from a quick phone shot? It starts with lighting. I use HDR techniques to balance bright windows with darker interior spaces, producing images where every room looks bright, inviting, and true to life. Wide-angle lenses capture the full feel of a space without distortion, and careful composition leads the viewer's eye through the room naturally. Twilight exterior shots -- taken during that brief window of warm sky and interior glow -- are consistently the most-clicked images in any listing.",
    "Preparation matters just as much as the photography itself. Before a shoot, I always recommend decluttering surfaces, opening all blinds, turning on every light, and making beds with crisp linens. Small details like fresh flowers on a kitchen counter or a neatly set dining table can make a room feel aspirational without looking staged. For agents who work with me regularly, I send a simple prep checklist that makes shoot day faster and more productive for everyone.",
    "The return on investment for professional listing photos is significant. In my experience working with agents across WNC, listings with high-quality images generate more showings in the first week and spend fewer days on market overall. If you are listing properties in Western North Carolina and want images that do the selling for you, let us talk about setting up a consistent workflow that fits your schedule.",
  ],
  "what-to-wear-portrait-session": [
    "If there is one question I hear before every single portrait session, it is this: what should I wear? The good news is that it does not need to be complicated. The best outfits for photos are the ones that make you feel confident and comfortable. When you feel good, it shows in your expression and body language -- and that matters far more than any specific color or style.",
    "That said, a few general guidelines can help. Solid colors and simple patterns tend to photograph best because they keep the focus on your face and expression rather than competing for attention. Earth tones, muted blues, soft greens, and warm neutrals all look beautiful against WNC's natural landscapes. If you are doing a family session, aim for coordinating tones rather than matching outfits -- think complementary rather than identical. A shared color palette looks polished without feeling forced.",
    "A few things to avoid: large logos, very bright neons, and busy patterns can be distracting in photos. Very shiny or reflective fabrics can catch light in unflattering ways. And while all-black or all-white outfits are classic, they can sometimes lose detail in outdoor lighting. Layering with textures -- a denim jacket over a dress, a scarf, rolled sleeves -- adds visual interest and gives you options for different looks within the same session.",
    "Ultimately, the most important thing is that you feel like yourself. If you never wear dresses, don't wear one for your session. If your favorite outfit is jeans and a flannel shirt, wear that. Authenticity always photographs better than something borrowed from a Pinterest board. I send a full style guide after booking, and I am always happy to review outfit options over text or email before your session day. No question is too small.",
  ],
};

// ---------------------------------------------------------------------------
// Blog Post Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Try Contentful first
  const contentfulPost = await getBlogPostBySlug(slug);

  // Fall back to hardcoded
  const fallbackPost = fallbackPosts.find((p) => p.slug === slug);

  if (!contentfulPost && !fallbackPost) {
    notFound();
  }

  // Unified post data
  const post = contentfulPost
    ? {
        title: contentfulPost.title,
        slug: contentfulPost.slug,
        date: contentfulPost.date,
        category: contentfulPost.category,
        excerpt: contentfulPost.excerpt,
        image: contentfulPost.image,
        readTime: contentfulPost.readTime,
        author: business.name,
      }
    : fallbackPost!;

  const isContentful = !!contentfulPost;

  // Related posts
  const allContentful = await getAllBlogPosts();
  const relatedPosts =
    allContentful.length > 0
      ? allContentful
          .filter((p) => p.slug !== slug)
          .slice(0, 2)
          .map((p) => ({
            slug: p.slug,
            title: p.title,
            date: p.date,
            category: p.category,
            excerpt: p.excerpt,
            image: p.image,
            readTime: p.readTime,
          }))
      : fallbackPosts.filter((p) => p.slug !== slug);

  // Fetch gallery images from Cloudinary if a folder is specified
  let galleryImages: GalleryImage[] = [];
  if (contentfulPost?.galleryFolder) {
    galleryImages = await fetchCloudinaryFolder(contentfulPost.galleryFolder);
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    date: post.date,
    image: post.image,
    author: post.author ?? business.name,
  });

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />

      {/* ================================================================= */}
      {/* 1. Hero Image                                                      */}
      {/* ================================================================= */}
      {post.image && (
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden md:h-[60vh]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </section>
      )}

      {/* ================================================================= */}
      {/* 2. Article                                                         */}
      {/* ================================================================= */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 font-sans text-sm text-text-muted">
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="transition-colors hover:text-accent">
                Blog
              </Link>
              <span>/</span>
              <span className="text-text-primary">{post.title}</span>
            </nav>

            {/* Category + Date + Read Time */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-block rounded bg-accent/10 px-2.5 py-1 font-sans text-xs uppercase tracking-label text-accent">
                {post.category}
              </span>
              <span className="font-sans text-sm text-text-muted">
                <time dateTime={post.date}>{formattedDate}</time>
              </span>
              <span className="font-sans text-sm text-text-muted">&middot;</span>
              <span className="font-sans text-sm text-text-muted">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-6 font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </AnimatedSection>

          {/* Body */}
          <AnimatedSection delay={0.2}>
            <div className="mt-10">
              {isContentful && contentfulPost?.body ? (
                <RichTextBody document={contentfulPost.body} />
              ) : (
                <div className="space-y-6">
                  {(fallbackContent[slug] ?? []).map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-sans text-base leading-relaxed text-text-muted md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Divider */}
          <hr className="my-14 border-text-muted/10" />

          {/* Author Bio */}
          <AnimatedSection delay={0.3}>
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_128,h_128,c_fill,g_face/B_B_SM_-_Jeremy-34_amovsv"
                  alt={post.author ?? business.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-text-primary">
                  Jeremy Sasser
                </p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-text-muted">
                  Jeremy Sasser is the photographer behind Kairos Photography Studio, based in Sylva, NC. Capturing authentic moments across Western North Carolina since 2019.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Photo Gallery (from Cloudinary)                                 */}
      {/* ================================================================= */}
      {galleryImages.length > 0 && (
        <section className="bg-primary py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection>
              <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
                From the Session
              </p>
              <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
                Photo Gallery
              </h2>
            </AnimatedSection>

            <div className="mt-14">
              <GalleryLightbox images={galleryImages} title={post.title} />
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 4. Related Posts                                                   */}
      {/* ================================================================= */}
      {relatedPosts.length > 0 && (
        <section className="bg-primary py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection>
              <p className="text-center font-sans text-xs uppercase tracking-label text-accent">
                Keep Reading
              </p>
              <h2 className="mt-3 text-center font-serif text-3xl font-bold text-text-primary md:text-4xl">
                More Stories &amp; Tips
              </h2>
            </AnimatedSection>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {relatedPosts.map((related, i) => (
                <AnimatedSection key={related.slug} delay={i * 0.15}>
                  <BlogCard post={related} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

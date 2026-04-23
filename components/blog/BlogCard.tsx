import Image from "next/image";
import Link from "next/link";
import { resolveFocalPoint } from "@/lib/focalPoint";
import type { BlogPost } from "@/lib/data";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-lg bg-secondary">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: resolveFocalPoint(post.focalPoint) }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Tag */}
          <span className="inline-block rounded bg-accent/10 px-2.5 py-1 font-sans text-xs uppercase tracking-label text-accent">
            {post.category}
          </span>

          <h3 className="mt-3 font-serif text-xl font-bold text-text-primary transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          <div className="mt-2 flex items-center gap-3 font-sans text-xs text-text-muted">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

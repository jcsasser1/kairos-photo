import Image from 'next/image'
import Link from 'next/link'
import { resolveFocalPoint } from '@/lib/focalPoint'

interface SessionCardProps {
  session: {
    slug: string
    title: string
    date: string
    category: string
    image: string
    focalPoint?: string
  }
}

export default function SessionCard({ session }: SessionCardProps) {
  const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/sessions/${session.slug}`}
      className="group block overflow-hidden rounded-lg bg-secondary"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {session.image ? (
          <Image
            src={session.image}
            alt={session.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: resolveFocalPoint(session.focalPoint) }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-text-muted"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-block rounded bg-accent/90 px-2.5 py-1 font-sans text-xs uppercase tracking-label text-primary">
            {session.category}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-text-primary transition-colors group-hover:text-accent">
          {session.title}
        </h3>
        <p className="mt-2 font-sans text-sm text-text-muted">{formattedDate}</p>
        <span className="mt-3 inline-flex items-center gap-1 font-sans text-sm text-accent">
          View Gallery
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

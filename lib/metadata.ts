// =============================================================================
// Kairos Photography Studio - SEO Metadata & JSON-LD Helpers
// =============================================================================

import type { Metadata } from "next";
import { business, socialLinks } from "./data";

// -----------------------------------------------------------------------------
// Default / Fallback Metadata
// -----------------------------------------------------------------------------

const siteUrl = business.website;

// Default OG image (hero photo from Cloudinary) — 1200x630 recommended
const defaultOgImage = "https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/DSC08902_kmmzgj";
const defaultLogo = "https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto/Asset_16_acnqys";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description: `Jeremy Sasser is the photographer behind ${business.name} in ${business.location} -- wedding, portrait, and real estate photography across Western North Carolina. ${business.tagline}`,
  keywords: [
    "Jeremy Sasser photographer",
    "Jeremy Sasser photography",
    "Western North Carolina wedding photographer",
    "Sylva NC photographer",
    "Asheville wedding photographer",
    "NC real estate photography",
    "Western NC portrait photographer",
    "Blue Ridge wedding photographer",
    "WNC elopement photographer",
    "mountain wedding photography",
    "Asheville real estate photographer",
    "Western NC family photographer",
  ],
  authors: [{ name: business.name, url: siteUrl }],
  creator: business.name,
  publisher: business.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: business.name,
    title: `${business.name} | ${business.tagline}`,
    description: `Wedding, portrait, and real estate photography in Western North Carolina. ${business.tagline}`,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${business.name} — ${business.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | ${business.tagline}`,
    description: `Wedding, portrait, and real estate photography in Western North Carolina. ${business.tagline}`,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

// -----------------------------------------------------------------------------
// Page Metadata Generator
// -----------------------------------------------------------------------------

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  keywords = [],
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || defaultOgImage;

  return {
    title,
    description,
    keywords: [
      ...keywords,
      business.name,
      "Sylva NC photographer",
      "Western North Carolina photography",
    ],
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      url,
      siteName: business.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${business.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}

// -----------------------------------------------------------------------------
// JSON-LD: LocalBusiness
// -----------------------------------------------------------------------------

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    description: `Jeremy Sasser is a professional wedding, portrait, and real estate photographer in ${business.region}. ${business.tagline}`,
    founder: {
      "@type": "Person",
      name: "Jeremy Sasser",
      jobTitle: "Photographer",
    },
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.3734,
      longitude: -83.2260,
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Western North Carolina",
      },
      {
        "@type": "Place",
        name: "Asheville, NC",
      },
      {
        "@type": "Place",
        name: "Sylva, NC",
      },
    ],
    priceRange: "$$",
    image: defaultOgImage,
    logo: defaultLogo,
    sameAs: socialLinks.map((link) => link.url),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  };
}

// -----------------------------------------------------------------------------
// JSON-LD: Article (for blog posts)
// -----------------------------------------------------------------------------

interface ArticleJsonLdOptions {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
  author?: string;
}

export function generateArticleJsonLd({
  title,
  description,
  slug,
  date,
  image,
  author = "Jeremy Sasser",
}: ArticleJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: defaultLogo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };
}

// -----------------------------------------------------------------------------
// JSON-LD: ImageGallery
// -----------------------------------------------------------------------------

interface ImageGalleryJsonLdOptions {
  name: string;
  description: string;
  path: string;
  images: string[];
}

export function generateImageGalleryJsonLd({
  name,
  description,
  path,
  images,
}: ImageGalleryJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    url: `${siteUrl}${path}`,
    creator: {
      "@type": "Organization",
      name: business.name,
      url: siteUrl,
    },
    image: images.map((url) => ({
      "@type": "ImageObject",
      url,
      creator: {
        "@type": "Organization",
        name: business.name,
      },
    })),
  };
}

// -----------------------------------------------------------------------------
// JSON-LD: BreadcrumbList
// -----------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

// -----------------------------------------------------------------------------
// JSON-LD: Person (Jeremy Sasser)
// -----------------------------------------------------------------------------

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jeremy Sasser",
    jobTitle: "Photographer",
    url: `${siteUrl}/about`,
    image: "https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto,w_800/B_B_SM_-_Jeremy-34_amovsv",
    worksFor: {
      "@type": "Organization",
      name: business.name,
      url: siteUrl,
    },
    sameAs: socialLinks.map((link) => link.url),
    knowsAbout: [
      "Wedding Photography",
      "Portrait Photography",
      "Real Estate Photography",
      "Western North Carolina",
    ],
  };
}

// -----------------------------------------------------------------------------
// JSON-LD Script Helper (for embedding in pages)
// -----------------------------------------------------------------------------

export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

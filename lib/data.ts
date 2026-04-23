// =============================================================================
// Kairos Photography Studio - Site Data
// =============================================================================

// -----------------------------------------------------------------------------
// Unsplash Image URLs
// -----------------------------------------------------------------------------

const unsplash = (photoId: string, width: number = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  weddings: {
    hero: unsplash("photo-1519741497674-611481863552", 1920),
    gallery: [
      unsplash("photo-1519741497674-611481863552"),
      unsplash("photo-1606216794074-735e91aa2c92"),
      unsplash("photo-1465495976277-4387d4b0b4c6"),
      unsplash("photo-1591604466107-ec97de577aff"),
      unsplash("photo-1532712938310-34cb3982ef74"),
      unsplash("photo-1522673607200-164d1b6ce486"),
      unsplash("photo-1511285560929-80b456fea0bc"),
      unsplash("photo-1519125323398-675f0ddb6308"),
    ],
  },
  realEstate: {
    hero: unsplash("photo-1600596542815-ffad4c1539a9", 1920),
    gallery: [
      unsplash("photo-1600596542815-ffad4c1539a9"),
      unsplash("photo-1600585154340-be6161a56a0c"),
      unsplash("photo-1600607687939-ce8a6c25118c"),
      unsplash("photo-1600566753190-17f0baa2a6c0"),
      unsplash("photo-1600573472592-401b489a3cdc"),
      unsplash("photo-1560448204-e02f11c3d0e2"),
    ],
  },
  portraits: {
    hero: unsplash("photo-1531746020798-e6953c6e8e04", 1920),
    gallery: [
      unsplash("photo-1531746020798-e6953c6e8e04"),
      unsplash("photo-1507003211169-0a1dd7228f2d"),
      unsplash("photo-1494790108377-be9c29b29330"),
      unsplash("photo-1524504388940-b1c1722653e1"),
      unsplash("photo-1517841905240-472988babdf9"),
      unsplash("photo-1534528741775-53994a69daeb"),
    ],
  },
} as const;

// -----------------------------------------------------------------------------
// Business Details
// -----------------------------------------------------------------------------

export const business = {
  name: "Kairos Photography Studio",
  owner: "Jeremy Sasser",
  tagline: "Photos that feel like living. Not posing.",
  location: "Sylva, NC",
  region: "Western North Carolina",
  serviceArea: "All of WNC, Asheville area, available for travel",
  website: "https://kairosphoto.co",
  email: "jeremy@kairosphoto.co",
  phone: "(828) 747-8732",
  address: {
    street: "123 Main Street",
    city: "Sylva",
    state: "NC",
    zip: "28779",
    country: "US",
  },
} as const;

// -----------------------------------------------------------------------------
// Social Links
// -----------------------------------------------------------------------------

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/kairosphotographystudio",
    handle: "@kairosphotographystudio",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61587757331471",
    handle: "Kairos Photography Studio",
  },
] as const;

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

import { features } from "./features";

const allNavLinks = [
  { label: "Home", href: "/", feature: null },
  { label: "Weddings", href: "/weddings", feature: "weddings" as const },
  { label: "Real Estate", href: "/real-estate", feature: "realEstate" as const },
  { label: "Portraits", href: "/portraits", feature: "portraits" as const },
  { label: "Sessions", href: "/sessions", feature: null },
  { label: "About", href: "/about", feature: null },
  { label: "Blog", href: "/blog", feature: null },
  { label: "Contact", href: "/contact", feature: null },
];

const allServiceLinks = [
  { label: "Weddings", href: "/weddings", feature: "weddings" as const },
  { label: "Real Estate", href: "/real-estate", feature: "realEstate" as const },
  { label: "Portraits", href: "/portraits", feature: "portraits" as const },
];

const filterByFeature = <T extends { feature: string | null }>(items: T[]) =>
  items.filter((item) => item.feature === null || features[item.feature as keyof typeof features]);

export const navigation = {
  main: filterByFeature(allNavLinks),
  services: filterByFeature(allServiceLinks),
  footer: [
    { label: "Privacy Policy", href: "/privacy", feature: null },
    { label: "Terms of Service", href: "/terms", feature: null },
  ],
};

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  features: string[];
  cta: string;
}

export const services: Service[] = [
  {
    slug: "weddings",
    title: "Wedding Photography",
    shortDescription:
      "Authentic, emotional wedding photography that captures every unscripted moment of your day in the mountains.",
    description:
      "Your wedding day happens once. I focus on the real moments between the planned ones -- the nervous laughter, the quiet tears, the dance moves nobody expected. From intimate elopements on Blue Ridge parkway overlooks to full celebrations in Asheville venues, every love story gets my full attention.",
    heroImage: images.weddings.hero,
    features: [
      "Full-day coverage from getting ready through the last dance",
      "Second shooter available for larger weddings",
      "Engagement session included with all packages",
      "Private online gallery with download access",
      "Mountain and outdoor location scouting",
      "Timeline planning assistance",
    ],
    cta: "See Wedding Packages",
  },
  {
    slug: "real-estate",
    title: "Real Estate Photography",
    shortDescription:
      "Professional property photography that sells homes faster across Western North Carolina.",
    description:
      "First impressions happen online. I make sure your listings stop the scroll with bright, true-to-life images that show every property at its best. Serving agents and homeowners throughout WNC, from mountain cabins to downtown Asheville condos.",
    heroImage: images.realEstate.hero,
    features: [
      "HDR interior and exterior photography",
      "Twilight and golden hour exterior shots",
      "Drone / aerial photography available",
      "72 hour turnaround on edited photos (24 hour rush available)",
      "MLS-ready formatting and delivery",
    ],
    cta: "See Real Estate Packages",
  },
  {
    slug: "portraits",
    title: "Portrait Photography",
    shortDescription:
      "Natural, relaxed portraits for individuals, families, and professionals in stunning WNC locations.",
    description:
      "Stiff, awkward photos are the worst. My portrait sessions are relaxed, easy, and built around who you actually are. Whether it is senior portraits in downtown Sylva, family sessions along the Tuckasegee River, or professional headshots for your business, you will look like yourself -- just really, really good.",
    heroImage: images.portraits.hero,
    features: [
      "Outdoor and studio sessions available",
      "Wardrobe and location guidance",
      "Family, senior, and professional headshots",
      "Retouching included on all final images",
      "Print packages and digital delivery",
      "Multiple outfit and location changes",
    ],
    cta: "See Portrait Packages",
  },
];

// -----------------------------------------------------------------------------
// Pricing Packages
// -----------------------------------------------------------------------------

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface PricingCategory {
  slug: string;
  title: string;
  description: string;
  tiers: PricingTier[];
  note?: string;
}

export const pricing: PricingCategory[] = [
  {
    slug: "weddings",
    title: "Wedding Packages",
    description:
      "Every wedding package includes professional editing, a private online gallery, a pre-wedding questionnaire, and a comprehensive wedding guide. Your day, your way — documented with intention.",
    tiers: [
      {
        name: "4-Hour Wedding",
        price: "$2,600",
        description: "Ideal for intimate ceremonies, elopements, and smaller celebrations.",
        features: [
          "4 hours of dedicated coverage",
          "Pre-wedding questionnaire and planning",
          "Comprehensive wedding guide and recommendations",
          "Full digital access to all photos",
          "~60 photos per hour of coverage",
          "Professional editing and color grading",
        ],
        cta: "Book 4-Hour",
      },
      {
        name: "8-Hour Wedding",
        price: "$3,800",
        description: "Our most popular package — full coverage for your entire wedding day.",
        features: [
          "8 hours of dedicated coverage",
          "Pre-wedding questionnaire and planning",
          "Comprehensive wedding guide and recommendations",
          "Full digital access to all photos",
          "~60 photos per hour of coverage",
          "Professional editing and color grading",
          "Included engagement session",
        ],
        popular: true,
        cta: "Book 8-Hour",
      },
      {
        name: "12-Hour Wedding",
        price: "$5,000",
        description: "The complete experience — your wedding day plus the events surrounding it.",
        features: [
          "12 hours of dedicated coverage",
          "Pre-wedding questionnaire and planning",
          "Comprehensive wedding guide and recommendations",
          "Full digital access to all photos",
          "~60 photos per hour of coverage",
          "Professional editing and color grading",
          "Included engagement session",
          "4 additional hours for rehearsal, farewell, or welcome events",
        ],
        cta: "Book 12-Hour",
      },
    ],
    note: "Travel within WNC is included. Destination weddings quoted on request. Payment plans available for all packages.",
  },
  {
    slug: "proposals",
    title: "Proposals & Engagements",
    description:
      "Whether it's a surprise proposal or a planned engagement session, these packages are designed to capture one of the most exciting moments of your life.",
    tiers: [
      {
        name: "Mini-Proposal",
        price: "$200",
        description: "A short, sweet session for proposals and small moments — under an hour of magic.",
        features: [
          "Under 1 hour of coverage",
          "Planning, location scouting, and logistics",
          "~50 professionally edited photos",
          "Full digital access to your gallery",
          "Sneak peeks delivered within 24 hours",
          "Can be applied as credit toward select wedding packages",
        ],
        cta: "Book Mini-Proposal",
      },
      {
        name: "Engagement / Proposal",
        price: "$400",
        description: "The full engagement experience — planned around your vision, your way.",
        features: [
          "Full planning, location scouting, and logistics",
          "~100 professionally edited photos",
          "Full digital access to your gallery",
          "Sneak peeks delivered within 24 hours",
          "Can be applied as credit toward select wedding packages",
        ],
        popular: true,
        cta: "Book Engagement",
      },
    ],
  },
  {
    slug: "real-estate",
    title: "Residential Real Estate",
    description:
      "Professional imagery that sells homes faster. Every shoot includes 72 hour delivery, guaranteed blue-sky replacement, and enhanced editing to showcase each property at its best.",
    tiers: [
      {
        name: "Small Home",
        price: "$250",
        description: "For homes under 2,000 square feet — compact listings that still deserve the full professional treatment.",
        features: [
          "Professional HDR photography",
          "Interior and exterior coverage",
          "72 hour delivery guaranteed",
          "Blue sky replacement included",
          "Enhanced photo editing and touch-ups",
          "MLS-ready formatting",
        ],
        cta: "Book Small Home",
      },
      {
        name: "Standard",
        price: "$350",
        description: "For homes between 2,000 and 3,000 square feet — the most popular choice for most listings.",
        features: [
          "Professional HDR photography",
          "Interior and exterior coverage",
          "72 hour delivery guaranteed",
          "Blue sky replacement included",
          "Enhanced photo editing and touch-ups",
          "MLS-ready formatting",
        ],
        popular: true,
        cta: "Book Standard",
      },
      {
        name: "Large Home",
        price: "$450",
        description: "For properties over 3,000 square feet that deserve comprehensive coverage.",
        features: [
          "Professional HDR photography",
          "Comprehensive interior and exterior coverage",
          "72 hour delivery guaranteed",
          "Blue sky replacement included",
          "Enhanced photo editing and touch-ups",
          "MLS-ready formatting",
        ],
        cta: "Book Large Home",
      },
    ],
    note: "Every real estate shoot includes 72 hour delivery, blue sky guarantee, and enhanced editing at no extra cost. Volume discounts available for agents with recurring listings.",
  },
  {
    slug: "portraits",
    title: "Graduates, Portraits & Family",
    description:
      "Whether you're celebrating a milestone, updating your headshot, or capturing your family as they are right now — sessions are relaxed, fun, and completely tailored to you.",
    tiers: [
      {
        name: "1-Hour Session",
        price: "$200",
        description: "A full hour of shooting — enough time for multiple outfits, locations, and plenty of variety.",
        features: [
          "1 hour of dedicated shooting time",
          "Multiple outfit changes welcome",
          "Up to 2 locations",
          "Full digital access to your gallery",
          "Professional editing and retouching",
          "Online gallery with easy downloads and sharing",
        ],
        popular: true,
        cta: "Book Session",
      },
      {
        name: "Extended Session",
        price: "$200/hr",
        description: "Need more time? Extended sessions are billed hourly for families, groups, or multi-location shoots.",
        features: [
          "Billed per hour of shooting time",
          "Unlimited outfit changes",
          "Multiple locations",
          "Full digital access to your gallery",
          "Professional editing and retouching",
          "Online gallery with easy downloads and sharing",
          "Perfect for larger families or group sessions",
        ],
        cta: "Book Extended",
      },
      {
        name: "Mini Session",
        price: "Seasonal",
        description: "Keep an eye out for seasonal mini session events throughout the year.",
        features: [
          "Shorter, focused sessions at curated locations",
          "Available during spring and fall events",
          "Limited spots available per event",
          "Follow us on Instagram for announcements",
          "Sign up for our email list to book first",
        ],
        cta: "Get Notified",
      },
    ],
    note: "Group sessions (3+ people) are welcome at the standard hourly rate. Pets are always encouraged — no extra charge. Sessions are relaxed and guided, never stiff or over-posed.",
  },
];

// -----------------------------------------------------------------------------
// Testimonials
// -----------------------------------------------------------------------------

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
  rating: number;
  service: "weddings" | "real-estate" | "portraits";
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah & Marcus",
    role: "Married October 2025, The Ridge Asheville",
    quote:
      "We hate being in front of a camera. Somehow, every single photo looks like us at our happiest. Our parents cried when they saw the gallery. We did too, honestly.",
    rating: 5,
    service: "weddings",
  },
  {
    name: "Dana Whitfield",
    role: "Realtor, Berkshire Hathaway WNC",
    quote:
      "My listings with Kairos photos sell 40% faster on average. The twilight shots alone are worth it -- buyers fall in love before they even schedule a showing.",
    rating: 5,
    service: "real-estate",
  },
  {
    name: "Jordan Ellis",
    role: "Senior Portrait Session, Sylva",
    quote:
      "I was so nervous but the whole session felt like hanging out with a friend. The photos actually look like me, not some stiff yearbook version of me. My mom ordered prints of basically every single one.",
    rating: 5,
    service: "portraits",
  },
];

// -----------------------------------------------------------------------------
// Blog Posts
// -----------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  author?: string;
  focalPoint?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-wedding-venues-western-north-carolina",
    title: "10 Stunning Wedding Venues in Western North Carolina",
    excerpt:
      "From mountaintop ceremonies to riverside receptions, WNC has some of the most breathtaking wedding venues in the Southeast. Here are my favorites after years of shooting in the region.",
    date: "2026-03-15",
    category: "Weddings",
    image: unsplash("photo-1465495976277-4387d4b0b4c6"),
    readTime: "8 min read",
    author: "Kairos Photography Studio",
  },
  {
    slug: "real-estate-photography-tips-sell-faster",
    title: "Why Professional Photos Help Homes Sell Faster in WNC",
    excerpt:
      "Listings with professional photography receive 118% more online views. Here is what makes a real estate photo stop the scroll and get buyers through the door.",
    date: "2026-02-28",
    category: "Real Estate",
    image: unsplash("photo-1600585154340-be6161a56a0c"),
    readTime: "5 min read",
    author: "Kairos Photography Studio",
  },
  {
    slug: "what-to-wear-portrait-session",
    title: "What to Wear to Your Portrait Session: A Simple Guide",
    excerpt:
      "The number one question I get before every session. Here is my honest advice on colors, patterns, and how to feel confident without overthinking it.",
    date: "2026-02-10",
    category: "Portraits",
    image: unsplash("photo-1494790108377-be9c29b29330"),
    readTime: "4 min read",
    author: "Kairos Photography Studio",
  },
];

// -----------------------------------------------------------------------------
// FAQ Data
// -----------------------------------------------------------------------------

export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: Record<string, FAQItem[]> = {
  weddings: [
    {
      question: "How far in advance should I book my wedding photographer?",
      answer:
        "I recommend booking 8-12 months in advance, especially for peak season (May through October) in Western North Carolina. Popular fall dates with mountain foliage can book over a year ahead. That said, I always keep a few dates open for shorter timelines, so don't hesitate to reach out even if your wedding is coming up soon.",
    },
    {
      question: "Do you travel for weddings outside of WNC?",
      answer:
        "Absolutely. While most of my work is throughout Western North Carolina and the Asheville area, I am available for travel anywhere. Domestic travel within the Southeast is included in the Luxe package. Other destinations are quoted based on travel costs.",
    },
    {
      question: "How long until we receive our wedding photos?",
      answer:
        "You will receive a sneak peek of 20-30 images within one week. Full galleries are delivered within 6-8 weeks, or 2 weeks with the Luxe package's priority editing. I know the wait is hard, so the sneak peek is designed to hold you over.",
    },
    {
      question: "What happens if it rains on our wedding day?",
      answer:
        "Rain creates some of the most dramatic, beautiful photos -- I promise. I always scout backup locations and come prepared with lighting for any weather. Some of my favorite wedding galleries have been on rainy mountain days.",
    },
    {
      question: "Can we customize a wedding package?",
      answer:
        "Of course. The listed packages are starting points. If you need something slightly different -- more hours, an extra shooter, a bridal session add-on -- just ask. I will build a package that fits your day and your budget.",
    },
  ],

  "real-estate": [
    {
      question: "How quickly can you schedule a real estate shoot?",
      answer:
        "I can typically accommodate shoots within 2-3 business days, and same-week availability is common. For agents with ongoing needs, I offer priority scheduling so you can lock in times that work with your listing calendar.",
    },
    {
      question: "How fast is the turnaround on edited photos?",
      answer:
        "Standard turnaround is 72 hours. A rushed 24-hour turnaround is available for an additional fee when you need images for a fast-moving listing — just let me know at the time of booking.",
    },
    {
      question: "Do you offer drone or aerial photography?",
      answer:
        "Yes. Drone photography is included in the Premium package and available as an add-on for other packages. I am FAA Part 107 certified and insured for commercial drone operations. Aerial shots are especially valuable for properties with acreage, mountain views, or waterfront access.",
    },
    {
      question: "What is your coverage area for real estate shoots?",
      answer:
        "Travel is included within 30 miles of Sylva, which covers most of Jackson, Swain, Haywood, and Macon counties. Shoots in the greater Asheville area and beyond are available with a small travel fee.",
    },
  ],

  portraits: [
    {
      question: "What should I wear to my portrait session?",
      answer:
        "Solid colors and simple patterns photograph best. I send a detailed style guide after booking, but the short version: wear something you feel great in, avoid large logos and busy patterns, and coordinate (not match) with anyone joining you. I am always happy to review outfit choices beforehand.",
    },
    {
      question: "Where do portrait sessions take place?",
      answer:
        "Anywhere that feels right for you. I have a list of beautiful WNC locations -- river spots, mountain overlooks, downtown Sylva, wildflower fields -- and I am open to your ideas too. Studio sessions are also available for headshots and more controlled lighting.",
    },
    {
      question: "Can I bring my dog to the session?",
      answer:
        "Please do. Pets are welcome at no extra charge. Some of my best portrait work involves dogs who refuse to sit still. It always makes for genuine, fun images.",
    },
    {
      question: "How many final images will I receive?",
      answer:
        "It depends on the package: Mini sessions include 10 images, Standard includes 25, and Signature includes 50. Every image is individually edited and retouched. You can purchase additional images from your gallery if you want more.",
    },
    {
      question: "What if I am really awkward in front of the camera?",
      answer:
        "Most people are, and that is completely fine. My job is to make you forget the camera is there. I use prompts, movement, and conversation instead of stiff posing. By the end, most clients tell me it was actually fun. I hear 'that was way less painful than I expected' at almost every session.",
    },
  ],

  pricing: [
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes. All wedding packages can be split into 2-3 payments leading up to your wedding date. Portrait and real estate sessions are due at the time of booking. If you need a different arrangement, just ask -- I am flexible.",
    },
    {
      question: "Is a deposit required to book?",
      answer:
        "A 30% non-refundable retainer is required to reserve your date for weddings. Portrait and real estate sessions require full payment at booking. Your date is not secured until the retainer or payment is received.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Wedding retainers are non-refundable but can be applied to a rescheduled date within 12 months. Portrait sessions can be rescheduled with 48 hours notice at no charge. Real estate sessions can be rescheduled with 24 hours notice.",
    },
    {
      question: "Do you offer mini sessions or discounted rates?",
      answer:
        "I run seasonal mini session events a few times a year (usually spring and fall). Sign up for my email list or follow me on Instagram @kairosphotographystudio to be the first to know. Volume discounts are available for real estate agents with regular booking needs.",
    },
    {
      question: "Are prints and albums included?",
      answer:
        "Digital files are included in every package. The Luxe wedding package includes a custom linen album, and the Signature portrait package includes a mounted 11x14 print. Additional prints, canvases, and albums can be ordered through your online gallery.",
    },
  ],
};

// -----------------------------------------------------------------------------
// About Page Data
// -----------------------------------------------------------------------------

export const about = {
  headline: "Real moments. Real people. That is the whole point.",
  intro:
    "I'm Jeremy Sasser, the photographer behind Kairos Photography Studio. I started Kairos because I was tired of seeing beautiful people look stiff and uncomfortable in their own photos. Photography should capture who you are, not some posed version of you that nobody recognizes.",
  story: [
    "Kairos is a Greek word that means the perfect, fleeting moment -- the kind you cannot plan for and cannot get back. That is exactly what I chase with my camera every single day.",
    "Based in Sylva, North Carolina, I have spent years exploring every corner of Western North Carolina with a camera in hand. The Blue Ridge mountains, the rivers, the small towns with more character than most cities -- this place is home, and it shows up in every shoot.",
    "Whether it is a wedding at a mountaintop venue near Asheville, a real estate listing in Waynesville, or a family portrait session along the Tuckasegee River, I bring the same approach: keep it real, keep it relaxed, and let the moments speak for themselves.",
  ],
  values: [
    {
      title: "Authenticity Over Perfection",
      description:
        "The best photos happen when people stop performing. I create an environment where you can be yourself, and the camera catches it.",
    },
    {
      title: "Mountain Roots",
      description:
        "WNC is home. I know the light on the Parkway at golden hour, the secret waterfall spots, and the venues that photograph like a dream. That local knowledge is part of every session.",
    },
    {
      title: "Fast and Reliable",
      description:
        "Deadlines matter. Whether you need listing photos in 24 hours or wedding sneak peeks in a week, I deliver on time, every time.",
    },
  ],
  credentials: [
    "Full-time professional photographer since 2019",
    "500+ weddings, portraits, and real estate shoots completed",
    "FAA Part 107 certified for drone photography",
    "Published in Blue Ridge Outdoors, WNC Magazine, and Asheville Wedding Guide",
    "Member of Professional Photographers of America (PPA)",
  ],
};

// -----------------------------------------------------------------------------
// SEO Target Keywords
// -----------------------------------------------------------------------------

export const seoKeywords = [
  "Jeremy Sasser photographer",
  "Western North Carolina wedding photographer",
  "Sylva NC photographer",
  "Asheville wedding photographer",
  "NC real estate photography",
  "Western NC portrait photographer",
  "Blue Ridge wedding photographer",
  "WNC elopement photographer",
  "Asheville real estate photographer",
  "mountain wedding photography",
  "Western NC family photographer",
] as const;

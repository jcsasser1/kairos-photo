# Kairos Photography Studio

Photography business website for Kairos Photography Studio — Western North Carolina.

- **Photographer:** Jeremy Sasser
- **Location:** Sylva, NC
- **Services:** Weddings · Real Estate · Portraits

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- **Cloudinary** — image storage & transformations
- **Contentful** — blog posts, client reviews, session galleries
- **Dubsado** — embedded contact form + client portal
- **Elfsight** — Instagram feed widget

## Local Development

```bash
npm install
cp .env.local.example .env.local   # then fill in credentials
npm run dev
```

Opens at http://localhost:3000

## Environment Variables

Set these in Vercel (or `.env.local` for local dev):

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary → Settings → API Keys |
| `CONTENTFUL_SPACE_ID` | Contentful → Settings → API Keys |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful → Content Delivery API token |

## Content Management

- **Blog posts:** Contentful → `blogPost` content type
- **Client reviews:** Contentful → `reviews` content type
- **Session galleries:** Contentful → `sessionGallery` content type (field `galleryFolder` points to a Cloudinary folder)
- **Image assets:** Cloudinary folders (e.g., `Featured Work`, `Wedding Portfolio`, `Real Estate/Hero Image`)

## Build & Deploy

```bash
npm run build    # production build
npm run start    # serve production build locally
```

Deployed via Vercel — pushes to `main` auto-deploy.

## Feature Flags

Toggle services on/off in `lib/features.ts`:

```ts
export const features = {
  weddings: true,
  realEstate: true,
  portraits: true,
}
```

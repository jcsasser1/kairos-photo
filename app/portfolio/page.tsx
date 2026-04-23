import { generatePageMetadata } from "@/lib/metadata";
import { images } from "@/lib/data";
import PortfolioContent from "@/components/sections/PortfolioContent";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: "Portfolio | Western NC Wedding, Real Estate & Portrait Photography",
  description:
    "Browse the full portfolio of Kairos Photography Studio -- weddings, real estate, and portraits across Western North Carolina. See the work that makes moments last.",
  path: "/portfolio",
  image: images.weddings.gallery[2],
  keywords: [
    "Western NC photography portfolio",
    "Sylva NC photographer portfolio",
    "WNC wedding photography gallery",
    "Asheville real estate photography",
    "Western NC portrait gallery",
  ],
});

// ---------------------------------------------------------------------------
// Portfolio Page (Server Component wrapper)
// ---------------------------------------------------------------------------

export default function PortfolioPage() {
  return <PortfolioContent />;
}

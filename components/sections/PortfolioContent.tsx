"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import MasonryGallery from "@/components/sections/MasonryGallery";
import Lightbox from "@/components/sections/Lightbox";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { images } from "@/lib/data";
import { features } from "@/lib/features";

// ---------------------------------------------------------------------------
// Combined Gallery Data
// ---------------------------------------------------------------------------

interface PortfolioImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

const weddingAlts = [
  "Wedding ceremony in the Blue Ridge mountains",
  "Bride and groom first look moment",
  "Wedding couple walking through a wildflower field",
  "Candid laughter during wedding reception",
  "Emotional exchange of vows",
  "Bridal party portrait on a mountain overlook",
  "First dance at a rustic WNC venue",
  "Golden hour couple portrait",
];

const realEstateAlts = [
  "Luxury mountain home exterior at twilight",
  "Bright modern kitchen interior",
  "Living room with mountain views",
  "Contemporary bathroom design",
  "Backyard with mountain landscape",
  "Elegant dining room staging",
];

const portraitAlts = [
  "Natural light portrait in Western North Carolina",
  "Professional headshot with mountain backdrop",
  "Relaxed family portrait session",
  "Senior portrait in downtown Sylva",
  "Creative portrait with golden hour light",
  "Lifestyle portrait in a wildflower field",
];

const allImages: PortfolioImage[] = [
  ...images.weddings.gallery.map((src, i) => ({
    src,
    alt: weddingAlts[i] ?? `Wedding photo ${i + 1}`,
    category: "Weddings",
    width: 800,
    height: [1000, 800, 600, 1000, 800, 600, 1000, 800][i] ?? 800,
  })),
  ...(features.realEstate
    ? images.realEstate.gallery.map((src, i) => ({
        src,
        alt: realEstateAlts[i] ?? `Real estate photo ${i + 1}`,
        category: "Real Estate",
        width: 800,
        height: [600, 800, 600, 800, 600, 800][i] ?? 800,
      }))
    : []),
  ...images.portraits.gallery.map((src, i) => ({
    src,
    alt: portraitAlts[i] ?? `Portrait photo ${i + 1}`,
    category: "Portraits",
    width: 800,
    height: [1000, 800, 600, 1000, 800, 600][i] ?? 800,
  })),
];

// ---------------------------------------------------------------------------
// Filter Tabs
// ---------------------------------------------------------------------------

const allFilters = ["All", "Weddings", "Real Estate", "Portraits"] as const;
const filters = allFilters.filter(
  (f) => f !== "Real Estate" || features.realEstate
);
type FilterCategory = (typeof filters)[number];

// ---------------------------------------------------------------------------
// Portfolio Content Component
// ---------------------------------------------------------------------------

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return allImages;
    return allImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const lightboxImages = filteredImages.map((img) => ({
    src: img.src,
    alt: img.alt,
  }));

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev < filteredImages.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev > 0 ? prev - 1 : filteredImages.length - 1
    );
  };

  return (
    <>
      {/* ================================================================= */}
      {/* 1. Hero                                                            */}
      {/* ================================================================= */}
      <HeroSection
        image={images.weddings.gallery[2]}
        title="The Work"
        subtitle="A curated collection of weddings, real estate, and portrait photography from across Western North Carolina."
      />

      {/* ================================================================= */}
      {/* 2. Filter Tabs + Gallery                                           */}
      {/* ================================================================= */}
      <section className="bg-primary py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter Pills */}
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-6 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
                    activeFilter === filter
                      ? "bg-accent text-primary"
                      : "border border-text-muted/30 text-text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Gallery */}
          <div className="mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MasonryGallery
                  images={filteredImages}
                  onImageClick={handleImageClick}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. Lightbox                                                        */}
      {/* ================================================================= */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}

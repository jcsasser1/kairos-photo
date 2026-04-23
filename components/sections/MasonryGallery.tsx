"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";

const IMAGES_PER_PAGE = 20;

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  onImageClick?: (index: number) => void;
  hideLabels?: boolean;
  initialCount?: number;
}

function MasonryItem({
  image,
  index,
  onImageClick,
  hideLabel,
}: {
  image: GalleryImage;
  index: number;
  onImageClick?: (index: number) => void;
  hideLabel?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="masonry-item group cursor-pointer overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: (index % IMAGES_PER_PAGE) * 0.05 }}
      onClick={() => onImageClick?.(index)}
    >
      <div className="relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-end bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
          {!hideLabel && (
            <span className="translate-y-full px-4 pb-4 font-sans text-sm uppercase tracking-label text-text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {image.category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MasonryGallery({
  images,
  onImageClick,
  hideLabels,
  initialCount,
}: MasonryGalleryProps) {
  const perPage = initialCount ?? IMAGES_PER_PAGE;
  const [visibleCount, setVisibleCount] = useState(perPage);

  const visibleImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount]
  );

  const hasMore = visibleCount < images.length;

  return (
    <>
      <div className="masonry-grid">
        {visibleImages.map((image, index) => (
          <MasonryItem
            key={`${image.src}-${index}`}
            image={image}
            index={index}
            onImageClick={onImageClick}
            hideLabel={hideLabels}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + perPage)}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-8 py-3 font-sans text-sm text-accent transition-colors hover:bg-accent/10"
          >
            Load More Photos
            <span className="text-text-muted">
              ({visibleCount} of {images.length})
            </span>
          </button>
        </div>
      )}
    </>
  );
}

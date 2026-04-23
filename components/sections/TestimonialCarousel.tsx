"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewItem {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialCarouselProps {
  testimonials: ReviewItem[];
}

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrent(([prev]) => {
        const next =
          (prev + newDirection + testimonials.length) % testimonials.length;
        return [next, newDirection];
      });
    },
    [testimonials.length]
  );

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  return (
    <div className="relative mx-auto max-w-3xl px-4">
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center text-center"
          >
            <StarRating />

            <blockquote className="mt-6 font-serif text-lg leading-relaxed text-text-primary md:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="mt-6">
              <p className="font-sans text-base font-medium text-text-primary">
                {testimonial.name}
              </p>
              <p className="mt-1 font-sans text-sm text-text-muted">
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="mt-8 flex justify-center gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setCurrent([index, index > current ? 1 : -1])
            }
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
              index === current ? "bg-accent" : "bg-text-muted/30"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function HeroSection({
  image,
  title,
  subtitle,
  children,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay — stronger at bottom where text sits, for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content — anchored to bottom-left */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-12 lg:px-20 text-left max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            {title}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 max-w-2xl font-sans text-lg text-white/90 md:text-xl"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-primary/70"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}

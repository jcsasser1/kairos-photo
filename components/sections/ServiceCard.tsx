"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href} className="block">
      <motion.div
        className="group relative h-[400px] overflow-hidden rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-colors duration-300 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/5" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-serif text-2xl font-bold text-text-primary">
            {title}
          </h3>

          <p className="mt-2 max-h-0 overflow-hidden font-sans text-sm leading-relaxed text-text-muted opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
            {description}
          </p>

          <span className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-accent">
            Learn More
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
  cta: string;
  href: string;
}

export default function PricingCard({
  name,
  price,
  features,
  featured = false,
  cta,
  href,
}: PricingCardProps) {
  return (
    <motion.div
      className={`relative flex flex-col rounded-lg border p-6 ${
        featured
          ? "border-accent bg-secondary shadow-lg shadow-accent/10"
          : "border-text-muted/20 bg-secondary"
      }`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Most Popular Badge */}
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-sans text-xs font-medium uppercase tracking-label text-primary">
          Most Popular
        </span>
      )}

      {/* Tier Name */}
      <h3 className="font-serif text-xl font-bold text-text-primary">
        {name}
      </h3>

      {/* Price */}
      <p className="mt-2 font-sans text-sm text-text-muted">Starting at</p>
      <p className="font-serif text-3xl font-bold text-accent">{price}</p>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0 text-accent"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-sans text-sm text-text-muted">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={href}
        className={`mt-8 block rounded-lg py-3 text-center font-sans text-sm font-medium uppercase tracking-label transition-colors ${
          featured
            ? "bg-accent text-primary hover:bg-accent/90"
            : "border border-accent text-accent hover:bg-accent hover:text-primary"
        }`}
      >
        {cta}
      </Link>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/lib/data";
import Button from "./Button";

const navLinks = navigation.main.filter((link) => link.label !== "Home");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-primary shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto/Asset_16_acnqys"
              alt="Kairos Photography Studio"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-wide text-text-primary/80 transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://dashboard.kairosphoto.co/public/client/portal/698d4edb3be7dae32caf6c75"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm tracking-wide text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Client Portal
            </a>
            <Button href="/contact" size="sm">
              Book Now
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex w-6 flex-col items-end gap-1.5">
              <motion.span
                className="block h-0.5 bg-text-primary"
                animate={{
                  width: mobileOpen ? 24 : 24,
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ width: 24 }}
              />
              <motion.span
                className="block h-0.5 w-4 bg-text-primary"
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                  width: mobileOpen ? 0 : 16,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-text-primary"
                animate={{
                  width: mobileOpen ? 24 : 20,
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ width: 20 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-20 z-40 bg-primary lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 px-6 pt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="font-sans text-lg tracking-wide text-text-primary transition-colors duration-200 hover:text-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
              >
                <a
                  href="https://dashboard.kairosphoto.co/public/client/portal/698d4edb3be7dae32caf6c75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-lg tracking-wide text-text-muted transition-colors duration-200 hover:text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Client Portal
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (navLinks.length + 1) * 0.05,
                  duration: 0.3,
                }}
                className="pt-4"
              >
                <Button
                  href="/contact"
                  size="md"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

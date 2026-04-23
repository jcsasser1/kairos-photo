import Link from "next/link";
import Image from "next/image";
import { navigation, business, socialLinks } from "@/lib/data";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIcons: Record<string, React.FC> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export default function Footer() {
  const instagramLink = socialLinks.find((s) => s.name === "Instagram");

  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="https://res.cloudinary.com/dmhifjh7n/image/upload/f_auto,q_auto/Asset_16_acnqys"
                alt="Kairos Photography Studio"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted">
              {business.tagline}
            </p>
            <p className="mt-2 font-sans text-sm text-text-muted">
              Photography by Jeremy Sasser &middot; {business.location}
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-text-muted transition-colors duration-200 hover:text-accent"
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-label text-text-muted">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-text-primary/70 transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-label text-text-muted">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="font-sans text-sm text-text-primary/70 transition-colors duration-200 hover:text-accent"
                >
                  {business.email}
                </a>
              </li>
              <li className="font-sans text-sm text-text-primary/70">
                {business.location} | {business.region}
              </li>
              {instagramLink && (
                <li>
                  <a
                    href={instagramLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-primary/70 transition-colors duration-200 hover:text-accent"
                  >
                    {instagramLink.handle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-sans text-xs text-text-muted">
            &copy; 2026 {business.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {navigation.footer.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

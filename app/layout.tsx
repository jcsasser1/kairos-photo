import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { defaultMetadata, generateLocalBusinessJsonLd, generatePersonJsonLd, jsonLdScript } from "@/lib/metadata";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ExitIntentPopup } from "@/components/sections/LeadCapture";
import "./globals.css";

// ---------------------------------------------------------------------------
// Google Fonts
// ---------------------------------------------------------------------------

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = defaultMetadata;

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = generateLocalBusinessJsonLd();
  const personJsonLd = generatePersonJsonLd();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-primary text-text-primary font-sans min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(personJsonLd),
          }}
        />
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          strategy="lazyOnload"
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup magnetKey="style-guide" source="exit-intent" />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

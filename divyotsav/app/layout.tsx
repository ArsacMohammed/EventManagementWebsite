import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jost",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://divyotsav.com"),
  title: {
    default: "Divyotsav — Divine Celebrations | Premium Event Management India",
    template: "%s | Divyotsav",
  },
  description: "Divyotsav crafts luxury weddings, corporate galas, social functions, and bespoke gift experiences across India. 500+ events. 15+ years. Pan India.",
  keywords: ["wedding planner india", "luxury event management", "corporate event planner mumbai", "indian wedding planner", "divyotsav"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://divyotsav.com",
    siteName: "Divyotsav",
    title: "Divyotsav — Divine Celebrations",
    description: "Premium Indian event management. Weddings, Corporate Galas, Social Functions, Luxury Gifting.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyotsav — Divine Celebrations",
    description: "Premium Indian event management across India.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://divyotsav.com" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on iOS notch devices
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventPlanner",
    "name": "Divyotsav",
    "description": "Premium Indian event management. Weddings, corporate galas, social functions, luxury gifting.",
    "url": "https://divyotsav.com",
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "108, Sanskriti Heights, Luxury Avenue",
      "addressLocality": "Colaba, Mumbai",
      "postalCode": "400005",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN",
    },
    "openingHours": "Mo-Sa 10:00-19:00",
    "areaServed": "India",
    "priceRange": "₹₹₹",
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${devanagari.variable}`}
    >
      <body className="antialiased font-jost bg-cream text-obsidian flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

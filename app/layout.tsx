import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://smartmerd.no";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Smart Merd OS™ | Bedre beslutninger i havbruk",
  description:
    "Smart Merd OS™ samler og analyserer produksjons-, miljø- og biologiske data for å gi produksjonsledelsen bedre og mer forklarbar beslutningsstøtte i havbruk.",
  keywords: [
    "Smart Merd OS",
    "havbruk",
    "akvakultur",
    "beslutningsstøtte",
    "produksjonsdata",
    "aquaculture decision support",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "nb-NO": siteUrl,
      en: siteUrl,
    },
  },
  openGraph: {
    title: "Smart Merd OS™ | Bedre beslutninger i havbruk",
    description:
      "Smart Merd OS™ samler og analyserer produksjons-, miljø- og biologiske data for å gi produksjonsledelsen bedre og mer forklarbar beslutningsstøtte i havbruk.",
    url: siteUrl,
    siteName: "Smart Merd OS™",
    locale: "nb_NO",
    alternateLocale: "en_US",
    type: "website",
    images: [{ url: "/logo-icon.png", width: 512, height: 512, alt: "Smart Merd OS™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Merd OS™ | Bedre beslutninger i havbruk",
    description:
      "Smart Merd OS™ samler og analyserer produksjons-, miljø- og biologiske data for bedre beslutningsstøtte i havbruk.",
    images: ["/logo-icon.png"],
  },
  icons: {
    icon: "/logo-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Smart Merd OS™",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Smart Merd OS™ samler og analyserer produksjons-, miljø- og biologiske data og gir produksjonsledelsen forklarbar beslutningsstøtte i havbruk.",
  publisher: {
    "@type": "Organization",
    name: "Smart Merd OS",
  },
  areaServed: "NO",
  audience: {
    "@type": "Audience",
    audienceType: "Aquaculture production management",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${manrope.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-void text-text-primary">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

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

const title = "Smart Merd | Smart Cage – beslutningsstøtte for havbruk";
const description =
  "Smart Cage fra Smart Merd analyserer produksjonsdata, overvåker driften i sanntid og simulerer mulige tiltak – før beslutningene tas. Første bruksområde: fôring.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Smart Merd",
    "Smart Cage",
    "havbruk",
    "akvakultur",
    "beslutningsstøtte",
    "fôring",
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
    title,
    description,
    url: siteUrl,
    siteName: "Smart Merd",
    locale: "nb_NO",
    alternateLocale: "en_US",
    type: "website",
    images: [{ url: "/logo-icon.png", width: 512, height: 512, alt: "Smart Merd" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-icon.png"],
  },
  icons: {
    icon: "/logo-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Smart Cage",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  publisher: {
    "@type": "Organization",
    name: "Smart Merd",
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

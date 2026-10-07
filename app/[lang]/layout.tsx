import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { StructuredData } from "@/components/StructuredData";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const canonicalUrl = `${siteConfig.url}/${lang}/`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Moroccan Beauty Products Wholesale | From 50 Pieces",
      template: `%s | ${siteConfig.name}`,
    },
    description:
      "Ready-to-sell Moroccan beauty products for shops, spas and hotels: argan oil, black soap, ghassoul, rose water and hammam kits. Wholesale from 50 pieces.",
    openGraph: {
      type: "website",
      locale: lang === "ar" ? "ar_MA" : lang === "fr" ? "fr_FR" : "en_US",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: "Moroccan Beauty Products Wholesale | From 50 Pieces",
      description:
        "Ready-to-sell Moroccan beauty products for shops, spas and hotels: argan oil, black soap, ghassoul, rose water and hammam kits. Wholesale from 50 pieces.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Moroccan Beauty Products Wholesale | From 50 Pieces",
      description:
        "Ready-to-sell Moroccan beauty products for shops, spas and hotels: argan oil, black soap, ghassoul, rose water and hammam kits. Wholesale from 50 pieces.",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteConfig.url}/en/`,
        fr: `${siteConfig.url}/fr/`,
        ar: `${siteConfig.url}/ar/`,
        "x-default": `${siteConfig.url}/en/`,
      },
    },
    icons: {
      icon: "/favicon/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* Next.js automatically injects the single canonical and hreflang from generateMetadata */}
        {/* JSON-LD Structured Data */}
        <StructuredData lang={lang} />
      </head>
      <body className="font-sans antialiased bg-white text-[#2A211C] selection:bg-[#284B35]/20">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/siteConfig";
import { SITE_URL } from "@/lib/siteUrl";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Moroccan Beauty Products Wholesale Supplier | Argan Oil",
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

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
        <StructuredData lang={lang} />
      </head>
      <body className="font-sans antialiased bg-white text-[#2A211C] selection:bg-[#284B35]/20">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

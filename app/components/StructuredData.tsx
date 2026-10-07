import { siteConfig } from "@/lib/siteConfig";

/** Organization JSON-LD: rendered once on every page by the [lang] layout. */
export function StructuredData({ lang = "en" }: { lang?: string }) {
  void lang;
  const { foundingYear } = siteConfig.businessFacts;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-full.webp`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lot 377 N°3/6, Sidi Ghanem industrial zone",
      addressLocality: "Marrakesh",
      postalCode: "40110",
      addressCountry: "MA",
    },
    description:
      "Moroccan Beauty Wholesale supplies ready-to-sell Moroccan beauty products to shops, spas and hotels, with a minimum order of 50 pieces.",
    availableLanguage: ["en", "fr", "ar"],
    sameAs: [],
    ...(foundingYear ? { foundingDate: String(foundingYear) } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

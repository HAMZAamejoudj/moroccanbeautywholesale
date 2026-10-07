import { siteConfig } from "@/lib/siteConfig";

const organizationDescriptions: Record<string, string> = {
  en: "Wholesale supplier of Moroccan beauty products: argan oil, black soap, ghassoul, rose water and hammam kits, ready to sell for shops, spas and hotels.",
  fr: "Grossiste de produits de beauté marocains : huile d'argan, savon noir, ghassoul, eau de rose et kits hammam pour boutiques, spas et hôtels.",
  ar: "مورد منتجات التجميل المغربية بالجملة: زيت الأركان، الصابون البلدي، الغاسول، ماء الورد وأطقم الحمام المغربي، جاهزة للبيع للمتاجر والسبا والفنادق.",
};

/** Organization JSON-LD: rendered once on every page by the [lang] layout. */
export function StructuredData({ lang = "en" }: { lang?: string }) {
  const activeLang = organizationDescriptions[lang] ? lang : "en";
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
    description: organizationDescriptions[activeLang],
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

import { siteConfig } from "@/lib/siteConfig";

interface PageSchemasProps {
  lang: string;
  /** Homepage only. */
  website?: boolean;
  /** Inner pages: adds a Home > Section BreadcrumbList. */
  section?: keyof typeof sectionNames.en;
  /** Only pass FAQs that are visible on the page, with identical text. */
  faq?: { q: string; a: string }[];
}

const homeLabels: Record<string, string> = { en: "Home", fr: "Accueil", ar: "الرئيسية" };

const sectionNames = {
  en: { benefits: "Benefits", "private-label": "Private Label", contact: "Contact", blog: "Blog" },
  fr: { benefits: "Avantages", "private-label": "Marque Blanche", contact: "Contact", blog: "Blog" },
  ar: { benefits: "المزايا", "private-label": "علامة خاصة", contact: "اتصل بنا", blog: "المدونة" },
} as const;

export function PageSchemas({ lang, website, section, faq }: PageSchemasProps) {
  const graphs: Record<string, unknown>[] = [];

  if (website) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: ["en", "fr", "ar"],
      publisher: { "@id": `${siteConfig.url}/#organization` },
    });
  }

  if (section) {
    const names = sectionNames[(lang in sectionNames ? lang : "en") as keyof typeof sectionNames];
    const breadcrumbs = [{ name: names[section], path: section }];
    graphs.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: homeLabels[lang] ?? "Home", path: "" },
        ...breadcrumbs,
      ].map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${siteConfig.url}/${lang}/${item.path ? item.path + "/" : ""}`,
      })),
    });
  }

  if (faq?.length) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      {graphs.map((g, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(g) }} />
      ))}
    </>
  );
}

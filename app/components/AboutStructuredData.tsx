import { siteConfig } from "@/lib/siteConfig";

interface FAQItem {
  q: string;
  a: string;
}

interface AboutStructuredDataProps {
  lang: string;
  dict: {
    seo: {
      title: string;
      description: string;
    };
    breadcrumb: {
      home: string;
      about: string;
    };
    faq: {
      items: FAQItem[];
    };
  };
}

export function AboutStructuredData({ lang, dict }: AboutStructuredDataProps) {
  const { madeInHouse, sourcedProducts, foundingYear } = siteConfig.businessFacts;
  const inLanguage = lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US";
  const canonicalUrl = `${siteConfig.url}/${lang}/about/`;
  const homeUrl = `${siteConfig.url}/${lang}/`;

  // Build visible FAQs matching page content word for word
  const visibleFaqItems = [...dict.faq.items];
  if (madeInHouse && sourcedProducts) {
    visibleFaqItems.splice(1, 0, {
      q: "Do you make all the products yourselves?",
      a: `Products made in Agadir: ${madeInHouse.join(", ")}. Products from partner cooperatives: ${sourcedProducts.join(", ")}.`,
    });
  }

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: dict.seo.title,
    description: dict.seo.description,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-full.webp`,
    email: siteConfig.ordersEmail,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lot 377 N°3/6, Sidi Ghanem industrial zone",
      addressLocality: "Marrakesh",
      postalCode: "40110",
      addressCountry: "MA",
    },
    sameAs: [],
    ...(foundingYear ? { foundingDate: String(foundingYear) } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.breadcrumb.home,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.breadcrumb.about,
        item: canonicalUrl,
      },
    ],
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: visibleFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </>
  );
}

import { siteConfig } from "@/lib/siteConfig";

interface StructuredDataProps {
  lang?: string;
}

const faqDataByLang: Record<
  string,
  Array<{ question: string; answer: string }>
> = {
  en: [
    {
      question: "What is your minimum order?",
      answer: "50 pieces. You can mix products in one order.",
    },
    {
      question: "How quickly do you reply?",
      answer:
        "Within 24 hours on business days, with prices, formats and shipping options.",
    },
    {
      question: "Do you sell to small shops and single spas?",
      answer:
        "Yes - that's who this service is built for. You can start from 50 pieces and mix products in one order.",
    },
    {
      question: "Can you put my logo on the products?",
      answer: "Yes, from 50 pieces. See our custom label page.",
    },
    {
      question: "Where is your factory?",
      answer:
        "Our factory is in Agadir, Morocco. Our office is at Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh.",
    },
    {
      question: "Do you ship outside Morocco?",
      answer: "Yes, worldwide, by express courier, air or sea freight.",
    },
  ],
  fr: [
    {
      question: "Quel est votre minimum de commande ?",
      answer:
        "50 pièces. Vous pouvez mélanger les produits dans une même commande.",
    },
    {
      question: "En combien de temps répondez-vous ?",
      answer:
        "Sous 24 heures les jours ouvrables, avec les tarifs, formats et options d'expédition.",
    },
    {
      question: "Vendez-vous aux petites boutiques et aux spas indépendants ?",
      answer:
        "Oui — c'est exactement pour vous que ce service est conçu. Vous pouvez commencer dès 50 pièces et mélanger les produits dans une seule commande.",
    },
    {
      question: "Pouvez-vous apposer mon logo sur les produits ?",
      answer: "Oui, dès 50 pièces. Consultez notre page marque personnalisée.",
    },
    {
      question: "Où se trouve votre atelier de production ?",
      answer:
        "Notre usine est à Agadir, Maroc. Notre bureau est au Lot 377 N°3/6, zone industrielle Sidi Ghanem, 40110 Marrakech.",
    },
    {
      question: "Livrez-vous en dehors du Maroc ?",
      answer:
        "Oui, dans le monde entier, par coursier express, fret aérien ou maritime.",
    },
  ],
  ar: [
    {
      question: "ما هو الحد الأدنى للطلب لديكم؟",
      answer: "50 قطعة. يمكنك الجمع بين منتجات مختلفة في طلبية واحدة.",
    },
    {
      question: "ما هي سرعة الرد على الاستفسارات؟",
      answer:
        "خلال 24 ساعة في أيام العمل، مع توضيح الأسعار والأحجام وخيارات الشحن.",
    },
    {
      question: "هل تبيعون للمتاجر الصغيرة والصالونات المستقلة؟",
      answer:
        "نعم — لقد صممنا هذه الخدمة خصيصاً لكم. يمكنكم البدء من 50 قطعة مع إمكانية مزج المنتجات في نفس الطلبية.",
    },
    {
      question: "هل يمكنكم وضع شعاري (اللوغو) على المنتجات؟",
      answer: "نعم، ابتداءً من 50 قطعة. راجع صفحة العلامة المخصصة.",
    },
    {
      question: "أين يقع معملكم؟",
      answer:
        "معملنا في أكادير، المغرب. مكتبنا في القطعة 377 رقم 3/6، المنطقة الصناعية سيدي غانم، 40110 مراكش.",
    },
    {
      question: "هل تقومون بالشحن خارج المغرب؟",
      answer:
        "نعم، إلى جميع أنحاء العالم، عبر البريد السريع، أو الشحن الجوي، أو الشحن البحري.",
    },
  ],
};

const audienceDescriptions: Record<string, string[]> = {
  en: [
    "Shops and concept stores",
    "Spas and hammams",
    "Hotels and riads",
    "Online sellers",
  ],
  fr: [
    "Boutiques et concept stores",
    "Spas et hammams",
    "Hôtels et riads",
    "Vendeurs en ligne",
  ],
  ar: [
    "المتاجر والمتاجر الفاخرة",
    "المنتجعات الصحية والحمامات",
    "الفنادق والرياضات",
    "البائعون عبر الإنترنت",
  ],
};

interface StructuredDataProps {
  lang?: string;
  includeHomeSchemas?: boolean;
}

export function StructuredData({ lang = "en", includeHomeSchemas = false }: StructuredDataProps) {
  const activeLang = faqDataByLang[lang] ? lang : "en";
  const faqs = faqDataByLang[activeLang];
  const audience = audienceDescriptions[activeLang] || audienceDescriptions.en;
  const { foundingYear } = siteConfig.businessFacts;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-full.webp`,
    description:
      "Ready-to-sell Moroccan beauty products for shops, spas and hotels. Wholesale from 50 pieces.",
    telephone: siteConfig.phone,
    email: siteConfig.email,
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["en", "fr", "ar"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: activeLang,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Who It's For",
    itemListElement: audience.map((title, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {includeHomeSchemas && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(itemListSchema),
            }}
          />
        </>
      )}
    </>
  );
}

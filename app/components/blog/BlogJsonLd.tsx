import { siteConfig } from "@/lib/siteConfig";
import type { Post } from "@/lib/blog";
import { ogSrc } from "@/lib/blog";

export function BlogJsonLd({ post, lang, url, blogLabel, homeLabel }: { post: Post; lang: string; url: string; blogLabel: string; homeLabel: string }) {
  const org = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/logo-full.webp` },
  };

  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      image: [`${siteConfig.url}${ogSrc(post.slug)}`],
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: post.contentLocale,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: org,
      publisher: org,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${siteConfig.url}/${lang}/` },
        { "@type": "ListItem", position: 2, name: blogLabel, item: `${siteConfig.url}/${lang}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: post.contentLocale,
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answerText },
      })),
    });
  }

  return (
    <>
      {graph.map((g, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(g) }} />
      ))}
    </>
  );
}

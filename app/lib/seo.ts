import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  SITE_URL,
} from "@/lib/siteUrl";

export type SeoLocale = "en" | "fr" | "ar";

const OG_LOCALE: Record<SeoLocale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_MA",
};

/** Absolute URL with trailing slash on path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Files (images, xml, txt) keep their exact path; pages get a trailing slash.
  const isFile = /\.[a-z0-9]{2,5}$/i.test(normalized);
  const withSlash = isFile || normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${SITE_URL}${withSlash}`;
}

export function localePath(lang: SeoLocale, segments: string[] = []): string {
  const tail = segments.filter(Boolean).join("/");
  return tail ? `/${lang}/${tail}/` : `/${lang}/`;
}

/** hreflang set including x-default (English when present). */
export function languageAlternates(
  pathForLocale: (lang: SeoLocale) => string | null
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of ["en", "fr", "ar"] as SeoLocale[]) {
    const path = pathForLocale(lang);
    if (path) languages[lang] = absoluteUrl(path);
  }
  if (languages.en) languages["x-default"] = languages.en;
  return languages;
}

export function allLocalesAlternates(segments: string[] = []): Record<string, string> {
  return languageAlternates((lang) => localePath(lang, segments));
}

export function openGraphLocales(current: SeoLocale): { locale: string; alternateLocale: string[] } {
  const locale = OG_LOCALE[current];
  const alternateLocale = (["en", "fr", "ar"] as SeoLocale[])
    .filter((l) => l !== current)
    .map((l) => OG_LOCALE[l]);
  return { locale, alternateLocale };
}

type PageMetadataInput = {
  lang: SeoLocale;
  /** Path segments after locale, e.g. ["about"] or ["blog", "slug"] */
  segments?: string[];
  title: string;
  description: string;
  /** Override canonical path (must include locale). Default: built from lang + segments */
  canonicalPath?: string;
  /** Locales that exist for this URL; default all three */
  availableLocales?: SeoLocale[];
  ogType?: "website" | "article";
  ogImage?: { path: string; alt: string; width?: number; height?: number };
};

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    lang,
    segments = [],
    title,
    description,
    ogType = "website",
    availableLocales = ["en", "fr", "ar"],
  } = input;

  const canonicalPath =
    input.canonicalPath ?? localePath(lang, segments);
  const canonical = absoluteUrl(canonicalPath);

  const languages = languageAlternates((l) =>
    availableLocales.includes(l) ? localePath(l, segments) : null
  );

  const ogImagePath = input.ogImage?.path ?? DEFAULT_OG_IMAGE_PATH;
  const ogImageAlt = input.ogImage?.alt ?? DEFAULT_OG_IMAGE_ALT;
  const ogImageUrl = absoluteUrl(ogImagePath);
  const { locale, alternateLocale } = openGraphLocales(lang);

  return {
    metadataBase: new URL(SITE_URL),
    // Titles are written in full (brand included); do not let the layout template append a second brand name.
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: ogType,
      url: canonical,
      siteName: "Moroccan Beauty Wholesale",
      title,
      description,
      locale,
      alternateLocale,
      images: [
        {
          url: ogImageUrl,
          width: input.ogImage?.width ?? 1200,
          height: input.ogImage?.height ?? 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

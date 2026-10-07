import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

export type Locale = "en" | "fr" | "ar";
export const LOCALES: Locale[] = ["en", "fr", "ar"];

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  categorySlug: string;
  date: string;
  updated?: string;
  readingTime: number;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  related: string[];
  draft: boolean;
}

export interface FaqItem {
  question: string;
  answerHtml: string;
  answerText: string;
}

export interface Post extends PostMeta {
  bodyHtml: string;
  toc: { id: string; text: string }[];
  faq: FaqItem[];
  ctaHtml: string;
  ctaText: string;
  /** Locale the content is actually written in (may differ from the requested one). */
  contentLocale: Locale;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Rewrites internal /blog/... links so they keep the current locale prefix. */
function rehypeLocaleLinks(lang: Locale) {
  return () => (tree: any) => {
    visit(tree, "element", (node: any) => {
      // A paragraph made entirely of italic text is an editorial note
      if (node.tagName === "p" && node.children?.length === 1 && node.children[0].tagName === "em") {
        node.properties = { ...node.properties, className: ["blog-note"] };
        return;
      }
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href === "string" && href.startsWith("/blog")) {
        const clean = href.replace(/\/+$/, "");
        node.properties.href = `/${lang}${clean}/`;
      }
    });
  };
}

async function render(markdown: string, lang: Locale): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeLocaleLinks(lang))
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

const stripMd = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function readEntry(lang: Locale, slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(CONTENT_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const meta: PostMeta = {
    slug: data.slug ?? slug,
    title: data.title,
    metaTitle: data.metaTitle ?? data.title,
    metaDescription: data.metaDescription ?? data.excerpt,
    primaryKeyword: data.primaryKeyword ?? "",
    secondaryKeywords: data.secondaryKeywords ?? [],
    category: data.category,
    categorySlug: slugify(data.category),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    readingTime: Number(data.readingTime),
    excerpt: data.excerpt,
    coverImage: data.coverImage ?? "",
    coverAlt: data.coverAlt ?? data.title,
    related: data.related ?? [],
    draft: data.draft === true,
  };
  return { meta, content };
}

/** All slugs, newest first. English is the source of truth for what exists. */
export function getAllSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, "en");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort((a, b) => readEntry("en", b)!.meta.date.localeCompare(readEntry("en", a)!.meta.date));
}

/** Locale that is actually served for a post: the translation if published, otherwise English. */
export function resolveLocale(lang: Locale, slug: string): Locale {
  if (lang === "en") return "en";
  const t = readEntry(lang, slug);
  return t && !t.meta.draft ? lang : "en";
}

export const isTranslated = (lang: Locale, slug: string) => resolveLocale(lang, slug) === lang;

export function getPostMetas(lang: Locale): PostMeta[] {
  return getAllSlugs().map((slug) => readEntry(resolveLocale(lang, slug), slug)!.meta);
}

export async function getPost(lang: Locale, slug: string): Promise<Post | null> {
  const contentLocale = resolveLocale(lang, slug);
  const entry = readEntry(contentLocale, slug);
  if (!entry) return null;
  const { meta, content } = entry;

  // Body | "## FAQ" section | "---" closing CTA paragraph
  const normalized = content.replace(/\r\n/g, "\n").trim();
  const ctaIdx = normalized.lastIndexOf("\n---");
  const withoutCta = ctaIdx >= 0 ? normalized.slice(0, ctaIdx).trim() : normalized;
  const ctaMd = ctaIdx >= 0 ? normalized.slice(ctaIdx + 4).trim() : "";

  const faqMatch = withoutCta.match(/^## FAQ\s*$/m);
  const bodyMd = faqMatch ? withoutCta.slice(0, faqMatch.index).trim() : withoutCta;
  const faqMd = faqMatch ? withoutCta.slice(faqMatch.index! + faqMatch[0].length).trim() : "";

  const faq: FaqItem[] = [];
  const parts = faqMd ? faqMd.split(/^### /m).map((s) => s.trim()).filter(Boolean) : [];
  for (const part of parts) {
    const nl = part.indexOf("\n");
    const answerMd = part.slice(nl + 1).trim();
    faq.push({
      question: part.slice(0, nl).trim(),
      answerHtml: await render(answerMd, lang),
      answerText: stripMd(answerMd),
    });
  }

  const bodyHtml = await render(bodyMd, lang);
  const toc = [...bodyHtml.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ""),
  }));

  return {
    ...meta,
    bodyHtml,
    toc,
    faq,
    ctaHtml: await render(ctaMd, lang),
    ctaText: stripMd(ctaMd),
    contentLocale,
  };
}

export const coverSrc = (slug: string) => `/images/blog/${slug}.webp`;
export const ogSrc = (slug: string) => `/images/blog/${slug}-og.jpg`;

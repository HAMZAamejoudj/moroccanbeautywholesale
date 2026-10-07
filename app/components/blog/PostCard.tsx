import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate, getUi } from "@/lib/blogUi";

/** Serializable subset of a post, safe to pass to client components. */
export interface CardPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  readingTime: number;
  coverAlt: string;
}

interface PostCardProps {
  post: CardPost;
  lang: string;
  /** First visible card: load eagerly. All others are lazy-loaded. */
  priority?: boolean;
  as?: "h2" | "h3";
}

export const coverUrl = (slug: string) => `/images/blog/${slug}.webp`;

export function PostCard({ post, lang, priority = false, as: Heading = "h2" }: PostCardProps) {
  const ui = getUi(lang);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_-12px_rgba(42,33,28,0.25)] focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-offset-2">
      <div className="relative aspect-video overflow-hidden bg-sand">
        <Image
          src={coverUrl(post.slug)}
          alt={post.coverAlt}
          width={1280}
          height={720}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-warm-secondary">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span aria-hidden="true"> · </span>
          {ui.minRead(post.readingTime)}
        </p>

        <Heading className="mt-3 line-clamp-2 font-serif text-[22px] font-bold leading-snug text-deep-brown">
          <Link
            href={`/${lang}/blog/${post.slug}/`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </Heading>

        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-warm-secondary">{post.excerpt}</p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-semibold text-brand-green">
          {ui.readArticle}
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

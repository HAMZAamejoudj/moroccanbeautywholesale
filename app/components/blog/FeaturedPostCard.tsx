import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate, getUi } from "@/lib/blogUi";
import { coverUrl, type CardPost } from "./PostCard";

export function FeaturedPostCard({ post, lang }: { post: CardPost; lang: string }) {
  const ui = getUi(lang);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-hairline bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_-14px_rgba(42,33,28,0.28)] focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-offset-2 lg:grid-cols-2">
      <div className="relative aspect-video overflow-hidden bg-sand lg:aspect-auto lg:min-h-[360px]">
        <Image
          src={coverUrl(post.slug)}
          alt={post.coverAlt}
          width={1280}
          height={720}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-green">{ui.featured}</p>
        <p className="mt-3 text-sm text-warm-secondary">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span aria-hidden="true"> · </span>
          {ui.minRead(post.readingTime)}
        </p>

        <h2 className="mt-3 font-serif text-[26px] font-bold leading-tight text-deep-brown sm:text-3xl lg:text-[34px]">
          <Link
            href={`/${lang}/blog/${post.slug}/`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 line-clamp-4 text-base leading-relaxed text-warm-secondary sm:text-[17px]">{post.excerpt}</p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-green">
          {ui.readArticle}
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

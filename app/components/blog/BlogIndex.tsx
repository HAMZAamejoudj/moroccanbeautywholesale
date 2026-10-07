"use client";

import { useCallback, useEffect, useState } from "react";
import { getUi } from "@/lib/blogUi";
import { PostCard, type CardPost } from "./PostCard";
import { FeaturedPostCard } from "./FeaturedPostCard";

interface BlogIndexProps {
  posts: CardPost[]; // newest first
  lang: string;
}

const PARAM = "category";

export function BlogIndex({ posts, lang }: BlogIndexProps) {
  const ui = getUi(lang);
  const [active, setActive] = useState("all");

  const categories = Array.from(
    new Map(posts.map((p) => [p.categorySlug, p.category])).entries(),
  );

  // Sync the filter with ?category= (shareable links, back/forward)
  const readUrl = useCallback(() => {
    const value = new URLSearchParams(window.location.search).get(PARAM) ?? "all";
    setActive(categories.some(([slug]) => slug === value) ? value : "all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  useEffect(() => {
    readUrl();
    window.addEventListener("popstate", readUrl);
    return () => window.removeEventListener("popstate", readUrl);
  }, [readUrl]);

  const select = (slug: string) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug === "all") url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, slug);
    window.history.replaceState(null, "", url);
  };

  const showFeatured = active === "all";
  const featured = showFeatured ? posts[0] : null;
  const gridPosts = showFeatured ? posts.slice(1) : posts.filter((p) => p.categorySlug === active);

  const chip = (slug: string, label: string) => {
    const on = active === slug;
    return (
      <button
        key={slug}
        type="button"
        aria-pressed={on}
        onClick={() => select(slug)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green ${
          on
            ? "border-brand-green bg-brand-green text-white"
            : "border-hairline bg-white text-warm-secondary hover:border-brand-green hover:text-deep-brown"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="mx-auto max-w-[1480px] px-4 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24 xl:px-14 2xl:max-w-[1560px]">
      <div role="group" aria-label={ui.filterLabel} className="flex flex-wrap gap-2.5">
        {chip("all", ui.all)}
        {categories.map(([slug, label]) => chip(slug, label))}
      </div>

      {featured && (
        <div className="mt-8">
          <FeaturedPostCard post={featured} lang={lang} />
        </div>
      )}

      {gridPosts.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {gridPosts.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-warm-secondary">{ui.noPosts}</p>
      )}
    </div>
  );
}

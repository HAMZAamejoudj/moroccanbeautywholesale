"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
}

/** Desktop: sticky side list with active-section highlight. Mobile: collapsible block above the content. */
export function TableOfContents({ items, title, variant }: { items: TocItem[]; title: string; variant: "mobile" | "desktop" }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -65% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ol className="space-y-1">
      {items.map((item) => {
        const on = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={`block rounded-md border-s-2 py-1.5 ps-3 text-[14px] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green ${
                on
                  ? "border-brand-green font-semibold text-brand-green"
                  : "border-transparent text-warm-secondary hover:text-deep-brown"
              }`}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="group mb-8 rounded-xl border border-hairline bg-sand-light lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[15px] font-semibold text-deep-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label={title} className="px-5 pb-4">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <aside className="sticky top-32 hidden lg:block">
      <nav aria-label={title}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-warm-secondary">{title}</p>
        {list}
      </nav>
    </aside>
  );
}

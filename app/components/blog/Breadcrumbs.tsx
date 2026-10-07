import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Breadcrumbs({
  lang,
  items,
}: {
  lang: string;
  items: { label: string; href?: string }[];
}) {
  const Sep = lang === "ar" ? ChevronLeft : ChevronRight;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] text-warm-secondary">
        {items.map((item, i) => (
          <li key={i} className="flex min-w-0 items-center gap-2">
            {i > 0 && <Sep className="h-3.5 w-3.5 shrink-0 text-warm-secondary/60" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="rounded transition-colors hover:text-deep-brown">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 font-medium text-deep-brown">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

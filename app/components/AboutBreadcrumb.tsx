import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface AboutBreadcrumbProps {
  dict: {
    home: string;
    about: string;
  };
  lang: string;
}

export function AboutBreadcrumb({ dict, lang }: AboutBreadcrumbProps) {
  const isRtl = lang === "ar";
  const Separator = isRtl ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label="Breadcrumb" className="pt-6 pb-2">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <ol className="flex items-center gap-2 text-[13px] text-warm-secondary">
          <li>
            <Link
              href={`/${lang}/`}
              className="hover:text-deep-brown transition-colors"
            >
              {dict.home}
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <Separator className="w-3.5 h-3.5 text-warm-secondary/60" />
          </li>
          <li aria-current="page" className="text-deep-brown font-medium">
            {dict.about}
          </li>
        </ol>
      </div>
    </nav>
  );
}

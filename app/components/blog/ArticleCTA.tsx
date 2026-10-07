import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { getUi } from "@/lib/blogUi";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

/** Closing CTA box built from the article's final paragraph (after the `---`). */
export function ArticleCTA({ html, title, lang }: { html: string; title: string; lang: string }) {
  const ui = getUi(lang);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const wa = `${siteConfig.whatsapp}?text=${encodeURIComponent(ui.waMessage(title))}`;

  return (
    <aside className="rounded-2xl border border-hairline bg-sand-light p-6 shadow-sm sm:p-8">
      <div className="blog-cta" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/${lang}/contact/`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-green px-7 text-[15px] font-medium text-white shadow-md transition-all hover:bg-brand-green-hover hover:shadow-lg"
        >
          {ui.ctaPrice}
          <Arrow className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-[#3A2A22]/20 bg-white px-7 text-[15px] font-medium text-deep-brown transition-all hover:border-[#3A2A22] hover:shadow-md"
        >
          <WhatsAppIcon className="h-5 w-5 text-brand-green" />
          {ui.ctaWhatsapp}
        </a>
      </div>
    </aside>
  );
}

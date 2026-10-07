import { Plus } from "lucide-react";

interface FaqEntry {
  question: string;
  answerHtml: string;
}

/**
 * FAQ accordion built on native <details>/<summary>: answers are in the static HTML (crawlable, matches FAQPage JSON-LD),
 * keyboard accessible, no JavaScript. Each question is an H3 under the FAQ H2.
 */
export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <div className="divide-y divide-hairline rounded-2xl border border-hairline bg-white">
      {items.map((item, i) => (
        <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none select-none items-center justify-between gap-4 rounded-2xl px-5 py-4 hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-green">
            <h3 className="text-start font-serif text-[18px] font-bold leading-snug text-deep-brown">{item.question}</h3>
            <Plus
              className="h-5 w-5 shrink-0 text-warm-secondary transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 text-[17px] leading-relaxed text-deep-brown">
            <div className="blog-prose blog-prose--compact" dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
          </div>
        </details>
      ))}
    </div>
  );
}

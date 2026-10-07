"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqEntry {
  question: string;
  answerHtml: string;
}

/** FAQ rendered as an accordion. Radix renders each trigger inside an <h3>, so questions are H3 under the FAQ H2. */
export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <Accordion type="single" collapsible className="divide-y divide-hairline rounded-2xl border border-hairline bg-white">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="rounded-2xl px-5 py-4 text-start font-serif text-[18px] font-bold leading-snug text-deep-brown hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-green">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 text-[17px] leading-relaxed text-deep-brown">
            <div className="blog-prose blog-prose--compact" dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

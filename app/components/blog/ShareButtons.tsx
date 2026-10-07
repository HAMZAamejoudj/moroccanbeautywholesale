"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Mail } from "lucide-react";
import { getUi } from "@/lib/blogUi";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

/** Plain share links (no external scripts). */
export function ShareButtons({ url, title, lang }: { url: string; title: string; lang: string }) {
  const ui = getUi(lang);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const base =
    "inline-flex h-10 items-center gap-2 rounded-full border border-hairline bg-white px-4 text-sm font-medium text-deep-brown transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green";
  const text = encodeURIComponent(`${title} ${url}`);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="me-1 text-sm font-semibold text-deep-brown">{ui.share}</span>
      <button type="button" onClick={copy} className={base}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? ui.copied : ui.copyLink}</span>
      </button>
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer" className={base}>
        <WhatsAppIcon className="h-4 w-4" />
        {ui.whatsapp}
      </a>
      <button
        type="button"
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
        className={base}
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
        {ui.linkedin}
      </button>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} className={base}>
        <Mail className="h-4 w-4" aria-hidden="true" />
        {ui.email}
      </a>
    </div>
  );
}

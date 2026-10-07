"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
export function MobileStickyBar() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const [footerVisible, setFooterVisible] = useState(false);

  const labels: Record<string, { priceList: string }> = {
    en: { priceList: "Request Price List" },
    fr: { priceList: "Demander la liste des prix" },
    ar: { priceList: "طلب لائحة الأسعار" },
  };

  const t = labels[lang] || labels.en;

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (footerVisible) return null;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md py-2.5 px-4 sm:hidden flex items-center gap-3 shadow-lg"
    >
      <Link
        href={`/${lang}/contact/`}
        className="w-full h-11 rounded-lg bg-[#284B35] text-white text-sm font-semibold flex items-center justify-center transition-colors hover:bg-[#1E3827]"
      >
        {t.priceList}
      </Link>
    </aside>
  );
}

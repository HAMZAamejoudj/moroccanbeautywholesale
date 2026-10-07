"use client";

import { useEffect, useRef } from "react";

/** Thin reading progress bar, sticky right under the site header. Tracks the element with `targetId`. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el || !bar.current) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-rect.top + 120, 0), Math.max(total, 1));
      bar.current.style.transform = `scaleX(${total > 0 ? done / total : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="sticky top-24 z-40 h-[3px] w-full bg-hairline/60">
      <div ref={bar} className="h-full w-full origin-left bg-brand-green rtl:origin-right" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

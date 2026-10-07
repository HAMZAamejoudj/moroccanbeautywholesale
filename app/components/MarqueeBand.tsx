import {
  CheckCircle2,
  Globe,
  Heart,
  Box,
  ShieldCheck,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

type MarqueeItem = { text: string; icon: LucideIcon };

function MarqueeRow({
  items,
  duplicate = false,
}: {
  items: MarqueeItem[];
  duplicate?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-8 shrink-0 pr-8"
      aria-hidden={duplicate || undefined}
    >
      {items.map((item, itemIdx) => {
        const Icon = item.icon;
        return (
          <div key={itemIdx} className="flex items-center gap-2.5 shrink-0">
            <Icon className="w-4 h-4 text-white" aria-hidden="true" />
            <span className="font-bold tracking-wider text-xs sm:text-sm uppercase text-white whitespace-nowrap">
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function MarqueeBand({ dict }: { dict?: { items: string[] } }) {
  const defaultItems = [
    "MOQ FROM 50 PIECES",
    "COA AND SDS PROVIDED",
    "QUALITY TESTED",
    "NATURAL ORIGIN",
    "WORLDWIDE EXPORT",
    "ETHICALLY PRODUCED",
  ];

  const rawItems =
    dict?.items && dict.items.length > 0 ? dict.items : defaultItems;
  const icons = [Box, FileCheck, CheckCircle2, ShieldCheck, Globe, Heart];

  const items: MarqueeItem[] = rawItems.map((text: string, index: number) => ({
    text,
    icon: icons[index % icons.length] || CheckCircle2,
  }));

  return (
    <div
      aria-label="Key Wholesale Facts"
      className="bg-[#2f4f2f] py-3.5 overflow-hidden border-y border-[#243d24]"
      dir="ltr"
    >
      <div className="marquee-track">
        <MarqueeRow items={items} />
        <MarqueeRow items={items} duplicate />
      </div>
    </div>
  );
}

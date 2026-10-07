"use client";

import Link from "next/link";
import {
  ChevronDown,
  Globe,
  Handshake,
  Leaf,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { site, whyUs } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  shield: Shield,
  sparkles: Sparkles,
  handshake: Handshake,
  globe: Globe,
};

const statColor: Record<string, string> = {
  argan: "text-argan",
  terracotta: "text-terracotta",
  olive: "text-olive",
};

export function WhyUsSection({ dict }: { dict: any }) {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-background">
      <div className="container px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-olive/10 border border-olive/30 mb-6">
              <span className="text-xs font-semibold text-olive uppercase tracking-wider">
                {dict.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
              {dict.title}{" "}
              <span className="text-olive">{dict.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {dict.intro}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {dict.stats.map((stat: any) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white border border-border shadow-soft"
                >
                  <div
                    className={`text-2xl lg:text-3xl font-serif font-bold mb-1 ${statColor[stat.color]}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Accordion
              type="single"
              collapsible
              defaultValue="authenticity"
              className="space-y-4"
            >
              {dict.accordion.map((item: any, i: number) => {
                // Get original to know the icon.
                const originalItem = whyUs.accordion[i];
                const Icon = iconMap[originalItem ? originalItem.icon : "leaf"];
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border border-border rounded-xl px-6 bg-card shadow-soft data-[state=open]:shadow-elevated transition-shadow duration-300"
                  >
                    <AccordionTrigger
                      showIcon={false}
                      className="hover:no-underline py-6"
                    >
                      <div className="flex flex-1 items-center gap-4 text-left min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-argan/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-argan" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-serif font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-16 text-muted-foreground leading-relaxed text-base">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <div className="p-8 lg:p-12 rounded-2xl bg-[#f5ede3] text-rich-brown shadow-soft border border-border/20">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-forest mb-4">
                {dict.cta.title}
              </h3>
              <p className="text-rich-brown/70 text-lg mb-8">
                {dict.cta.description}
              </p>
              <Link
                href={site.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-argan text-rich-brown font-bold hover:bg-argan-dark transition-all duration-300 shadow-md hover:shadow-elevated group"
              >
                {dict.cta.button}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function MobileMenu() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="left-0 top-0 max-w-sm translate-x-0 translate-y-0 h-full w-[min(100%,20rem)] rounded-none border-r sm:rounded-none">
        <nav className="flex flex-col gap-6 pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${lang}${link.href.startsWith("/") && (link.href as string) !== "/" ? link.href : link.href.replace("/", "")}`}
              className="text-lg text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="hero" className="mt-4" asChild>
            <a
              href="https://wa.me/212641517831"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full"
            >
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Discuss on WhatsApp
            </a>
          </Button>
        </nav>
      </DialogContent>
    </Dialog>
  );
}

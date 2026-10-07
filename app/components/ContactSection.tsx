import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { contact, site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-olive/10 border border-olive/30">
            <span className="text-xs font-semibold text-olive uppercase tracking-wider">
              {contact.badge}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            {contact.title}{" "}
            <span className="text-olive">{contact.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {contact.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a
                href={site.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.ctaCatalog}
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.ctaWhatsapp}
              </a>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 text-muted-foreground">
            <Link
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone className="w-5 h-5 text-olive" />
              <span>{site.phoneDisplay}</span>
            </Link>
            <Link
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5 text-olive" />
              <span>{site.email}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

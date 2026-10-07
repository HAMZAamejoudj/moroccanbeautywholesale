import { siteConfig } from "./siteConfig";
import { businessFacts } from "./businessFacts";

export { siteConfig, businessFacts };

export const site = {
  name: siteConfig.name,
  url: siteConfig.url,
  // Internal fallback until dedicated catalog page is built
  catalogUrl: "/contact/",
  whatsapp: siteConfig.whatsapp,
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  email: siteConfig.email,
  address: siteConfig.address,
  addressLabel: businessFacts.addressLabel,
  factoryCity: siteConfig.factoryCity,
  factoryLine: siteConfig.factoryLine,
  social: siteConfig.social,
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Benefits", href: "/benefits/" },
  { label: "Private Label", href: "/private-label/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const paymentLogos = [
  { src: "/images/payment-credit.webp", alt: "Visa and Mastercard" },
  { src: "/images/stripe.svg", alt: "Stripe", className: "invert" },
  { src: "/images/payment-wise.webp", alt: "Wise", className: "invert h-4" },
  { src: "/images/payment-tijaribank.webp", alt: "Attijariwafa Bank" },
] as const;

export const carrierLogos = [
  { src: "/images/carrier-dhl.webp", alt: "DHL Express", className: "h-4" },
  { src: "/images/carrier-fedex.webp", alt: "FedEx", className: "h-4" },
  { src: "/images/ups.svg", alt: "UPS", className: "h-5" },
  { src: "/images/carrier-aramex.webp", alt: "Aramex", className: "h-4" },
  { src: "/images/carrier-chronopost.webp", alt: "Chronopost", className: "h-4" },
] as const;

export const contact = {
  badge: "Get in Touch",
  title: "Request a Quote or",
  titleHighlight: "Ask a Question",
  description: "Tell us your type of business, products of interest, and destination country. We respond within 24 hours with pricing and shipping options.",
  ctaCatalog: "Request Price List",
  ctaWhatsapp: "Chat on WhatsApp",
} as const;

export const whyUs = {
  badge: "Our Commitment",
  title: "Why Choose Us as Your",
  titleHighlight: "Wholesale Supplier",
  intro: "We partner with businesses to deliver authentic Moroccan beauty products with transparent documentation and low entry barriers.",
  stats: [
    { value: "50", label: "Pieces minimum order", color: "argan" },
    { value: "24h", label: "Reply on business days", color: "terracotta" },
    { value: "Agadir", label: "Factory location", color: "olive" },
  ],
  accordion: [
    {
      id: "authenticity",
      title: "Authentic Direct Sourcing",
      subtitle: "Directly from Moroccan producers and cooperatives.",
      content: "Cold-pressed argan oil from the Agadir region, distilled rose water, and traditional ghassoul clay prepared for retail and professional use.",
      icon: "leaf",
    },
    {
      id: "low-moq",
      title: "Low 50-Piece Minimum Order",
      subtitle: "Mix products in manageable quantities.",
      content: "Start with 50 pieces across multiple product lines to test your market without tying up capital.",
      icon: "sparkles",
    },
  ],
} as const;

export const featureCards = [
  {
    id: "shops",
    badge: "Retail",
    title: "Shops and Concept Stores",
    titleHighlight: "Finished Lines",
    paragraph: "Ready-labelled products and gift sets in quantities a shop can move.",
    image: { src: "/images/hero-ingredients-background.webp", alt: "Retail ready Moroccan products" },
    tags: ["Retail", "Gift Sets"],
  },
  {
    id: "spas",
    badge: "Professional",
    title: "Spas and Hammams",
    titleHighlight: "Bulk and Care",
    paragraph: "Professional formats of black soap and ghassoul for treatments.",
    image: { src: "/images/card-premium-oils.webp", alt: "Spa hammam supplies" },
    tags: ["Spa", "Hammam"],
  },
] as const;

export interface ContentSectionItem {
  id: string;
  badge: string;
  title: string;
  titleHighlight: string;
  paragraphs: string[];
  image?: { src: string; alt: string };
  imagePosition?: "left" | "right";
  tags?: string[];
}

export const contentSections: ContentSectionItem[] = [
  {
    id: "who-we-are",
    badge: "Who We Are",
    title: "A Wholesale Partner,",
    titleHighlight: "Not Just a Price List",
    paragraphs: [
      "We source directly from Moroccan cooperatives and producers, giving you clean pricing and traceable origin.",
    ],
    image: { src: "/images/about-manufacturing.webp", alt: "Moroccan cooperative production" },
    imagePosition: "right",
    tags: ["Direct Sourcing", "Cooperative Partnerships"],
  },
  {
    id: "the-range",
    badge: "The Range",
    title: "Core Moroccan Ingredients,",
    titleHighlight: "in Bulk",
    paragraphs: [
      "Our catalogue covers authentic ingredients wholesale buyers ask for most.",
    ],
    image: { src: "/images/hero-ingredients-background.webp", alt: "Authentic ingredients" },
    imagePosition: "left",
    tags: ["Argan Oil", "Black Soap"],
  },
  {
    id: "private-label",
    badge: "Build Your Brand",
    title: "Private Label,",
    titleHighlight: "From 50 Pieces",
    paragraphs: [
      "You bring the brand vision; we handle production and export.",
    ],
    image: { src: "/images/private-label-showcase.webp", alt: "Private label items" },
    imagePosition: "right",
    tags: ["White Label", "Low MOQ"],
  },
  {
    id: "why-us",
    badge: "Why Businesses Choose Us",
    title: "Authenticity, Traceability",
    titleHighlight: "and Reliability",
    paragraphs: [
      "A genuinely low entry point of 50 pieces lets you test a market without tying up capital.",
    ],
    imagePosition: "left",
    tags: ["Reliability", "Fast Support"],
  },
];

import { SITE_URL } from "@/lib/siteUrl";

/**
 * Site configuration - single source of truth for branding, contact details, and URLs.
 */
export const siteConfig = {
  name: "Moroccan Beauty Wholesale",
  legalName: "Moroccan Beauty Wholesale",
  url: SITE_URL,
  email: "orders@moroccanbeautywholesale.com",
  ordersEmail: "orders@moroccanbeautywholesale.com",
  phone: "+212641517831",
  phoneDisplay: "+212 6 41 51 78 31",
  phoneDisplayIntl: "+212 6 41 51 78 31",
  officeLine:
    "Office: Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh, Morocco",
  whatsapp: "https://wa.me/212641517831",
  address: "Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh",
  fullAddress: "Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh, Morocco",
  factoryCity: "Agadir",
  factoryCountry: "Morocco",
  factoryLine: "Factory: Agadir",
  // Social links are null until official Moroccan Beauty Wholesale brand profiles exist.
  social: {
    instagram: null,
    facebook: null,
    tiktok: null,
  },
  // Business facts - confirmed vs unconfirmed
  businessFacts: {
    minOrderPieces: 50,
    replyHours: 24,
    factoryCity: "Agadir",
    address: "Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh, Morocco",
    email: "orders@moroccanbeautywholesale.com",
    phone: "+212 6 41 51 78 31",
    // Unconfirmed fields (null until confirmed by user)
    foundingYear: null as number | null,
    agadirActivities: null as string | null,
    madeInHouse: null as string[] | null,
    sourcedProducts: null as string[] | null,
    openingHours: null as string | null,
    videoCallAvailable: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;

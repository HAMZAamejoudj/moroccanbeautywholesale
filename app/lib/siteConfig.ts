/**
 * Site configuration - single source of truth for branding, contact details, and URLs.
 */
export const siteConfig = {
  name: "Moroccan Beauty Wholesale",
  legalName: "Moroccan Beauty Wholesale",
  url: "https://www.moroccanbeautywholesale.com",
  email: "contact@moroccanbeautywholesale.com",
  ordersEmail: "orders@moroccanbeautywholesale.com",
  phone: "+212641517831",
  phoneDisplay: "06 41 51 78 31",
  phoneDisplayIntl: "+212 641 517 831",
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
    phone: "06 41 51 78 31",
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

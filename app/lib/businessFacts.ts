/**
 * Business facts configuration.
 * Only confirmed facts have values; all unconfirmed fields are strictly null.
 * UI components and structured data adapt dynamically based on these values.
 */

export interface Certification {
  name: string;
  number: string;
  scope: string;
  products: string[];
  url?: string;
}

export interface BusinessFacts {
  minOrderPieces: number;
  minOrderScope: "per product" | "per order" | null;
  minOrderDisplay: string;
  replyHours: number;
  factoryCity: string;
  addressLabel: string;
  address: string;
  certifications: Certification[];
  formats: {
    arganOil: string | null;
    blackSoap: string | null;
    ghassoul: string | null;
    roseWater: string | null;
    kessaGloves: string | null;
    hammamKits: string | null;
  };
  samplePolicy: string | null;
  paymentTerms: string | null;
  countries: string[] | null;
  batchAnalysesProvided: boolean | null;
}

export const businessFacts: BusinessFacts = {
  minOrderPieces: 50,
  minOrderScope: null,
  minOrderDisplay: "Minimum order: 50 pieces",
  replyHours: 24,
  factoryCity: "Agadir",
  addressLabel: "Address",
  address: "Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh",
  // No certifications confirmed yet. None rendered.
  certifications: [],
  // All formats null -> rendered as "On request" in the table
  formats: {
    arganOil: null,
    blackSoap: null,
    ghassoul: null,
    roseWater: null,
    kessaGloves: null,
    hammamKits: null,
  },
  samplePolicy: null,
  paymentTerms: null,
  countries: null,
  batchAnalysesProvided: null,
};

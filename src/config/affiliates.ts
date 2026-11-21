/**
 * CENTRAL AFFILIATE REGISTRY — the single source of truth for every outbound
 * affiliate destination (blueprint section 5). Never hard-code affiliate URLs in
 * page components; never put secrets/API keys/tokens here (affiliate IDs and
 * referral params in URLs are public identifiers, not secrets).
 *
 * All entries ship INACTIVE. Do not set active:true until program acceptance,
 * terms, tracking URL, region eligibility, and a verified test click exist.
 */
export interface AffiliateEntry {
  key: string;
  name: string;
  provider: string;
  active: boolean;
  destination: string;
  fallback: string | null;
  trackingParams?: Record<string, string>;
  categories: string[];
  languages: ("en" | "es")[];
  placements: string[];
  disclosureGroup: string;
  rel: ("sponsored" | "nofollow" | "noopener" | "noreferrer")[];
  regions: string[];
  lastReviewed: string | null;
  termsUrl: string | null;
  notes?: string;
}

export const affiliates = {
  newark: {
    key: "newark",
    name: "Newark",
    provider: "Newark / element14",
    active: false,
    destination: "https://www.newark.com/",
    fallback: "https://www.newark.com/",
    categories: ["components", "semiconductors"],
    languages: ["en", "es"],
    placements: ["component", "category", "guide"],
    disclosureGroup: "affiliate",
    rel: ["sponsored", "nofollow", "noopener", "noreferrer"],
    regions: [],
    lastReviewed: null,
    termsUrl: "https://www.newark.com/affiliate",
    notes: "Research candidate only — not a confirmed partner.",
  },
  electronComponents: {
    key: "electron-components",
    name: "ElectronComponents",
    provider: "ElectronComponents.com",
    active: false,
    destination: "https://www.electroncomponents.com/",
    fallback: "https://www.electroncomponents.com/",
    categories: ["components"],
    languages: ["en", "es"],
    placements: ["component", "category"],
    disclosureGroup: "affiliate",
    rel: ["sponsored", "nofollow", "noopener", "noreferrer"],
    regions: [],
    lastReviewed: null,
    termsUrl: null,
    notes: "Research candidate only — not a confirmed partner.",
  },
} satisfies Record<string, AffiliateEntry>;

export type AffiliateKey = keyof typeof affiliates;

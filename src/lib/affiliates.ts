import { affiliates, type AffiliateKey, type AffiliateEntry } from "@/config/affiliates";
import type { Locale } from "@/lib/i18n";

export interface ResolvedAffiliate {
  href: string;
  rel: string;
  disclosureGroup: string;
  active: boolean;
}

/**
 * Resolve a configured affiliate key into a safe outbound link.
 * - Refuses inactive/missing entries (falls back to the plain destination).
 * - Validates HTTPS destinations (prevents open-redirect / non-https).
 * - Applies approved tracking params only when active.
 * - Never allows a visitor-supplied value to control the destination.
 */
export function resolveAffiliate(key: AffiliateKey, locale: Locale): ResolvedAffiliate | null {
  const entry: AffiliateEntry | undefined = affiliates[key];
  if (!entry) return null;

  const base = safeHttps(entry.destination) ? entry.destination : entry.fallback;
  if (!base || !safeHttps(base)) return null;

  const rel = entry.rel.join(" ");

  if (!entry.active) {
    // Inactive entries NEVER render tracking params and NEVER imply partnership.
    return { href: base, rel, disclosureGroup: entry.disclosureGroup, active: false };
  }

  let href = base;
  if (entry.trackingParams) {
    const url = new URL(base);
    for (const [k, v] of Object.entries(entry.trackingParams)) url.searchParams.set(k, v);
    href = url.toString();
  }
  if (entry.languages.length && !entry.languages.includes(locale)) {
    // Not enabled for this language: fall back to plain destination, no tracking.
    return { href: base, rel, disclosureGroup: entry.disclosureGroup, active: false };
  }

  return { href, rel, disclosureGroup: entry.disclosureGroup, active: true };
}

function safeHttps(u: string | null | undefined): boolean {
  if (!u) return false;
  try {
    return new URL(u).protocol === "https:";
  } catch {
    return false;
  }
}

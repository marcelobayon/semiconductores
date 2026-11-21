import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://semiconductores.net").replace(/\/$/, "");

/**
 * Build Metadata for a localized page: canonical + hreflang alternates for every
 * locale of the same page, per the blueprint SEO requirements.
 * `path` is the locale-less path, e.g. "" for home or "/platform".
 */
export function buildMetadata(opts: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const path = opts.path && opts.path !== "/" ? opts.path : "";
  const canonical = `${siteUrl}/${opts.locale}${path}`;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}/${l}${path}`;
  languages["x-default"] = `${siteUrl}/en${path}`;

  // Locale-specific social preview: Spanish pages get the Spanish OG image.
  // Read per-URL by the scraper, so sharing /es adds no friction.
  const ogImage = opts.locale === "es" ? "/og-es.png" : "/og.png";

  return {
    title: opts.title,
    description: opts.description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: "Semiconductores.net",
      locale: opts.locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Semiconductores.net" }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}

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
  /**
   * Per-locale locale-less paths, for pages whose slug is localized (e.g. a
   * category hub at /en/categories/operational-amplifiers and
   * /es/categories/amplificadores-operacionales). When provided, canonical and
   * every hreflang alternate use the correct per-locale path. Omit for
   * shared-slug pages (the common case).
   */
  localizedPaths?: Partial<Record<Locale, string>>;
}): Metadata {
  const norm = (p?: string) => (p && p !== "/" ? p : "");
  const pathFor = (l: Locale) => norm(opts.localizedPaths?.[l] ?? opts.path);
  const canonical = `${siteUrl}/${opts.locale}${pathFor(opts.locale)}`;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}/${l}${pathFor(l)}`;
  languages["x-default"] = `${siteUrl}/en${pathFor("en")}`;

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

/**
 * BreadcrumbList JSON-LD matching the page's actual navigation hierarchy.
 * `items` are {name, path} where path is a locale-less path ("" for home).
 */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}/${locale}${it.path && it.path !== "/" ? it.path : ""}`,
    })),
  };
}

import { octopartUrl, type CatalogPart } from "@/lib/catalog";
import { siteUrl } from "@/lib/seo";

export const API_VERSION = "v1";
const BASE = `${siteUrl}/api/${API_VERSION}`;

/**
 * Public API DTO for a catalog component. Facts only — specifications entered
 * from the manufacturer datasheet, with provenance and a last-checked date.
 * No pricing, stock, lead time, or purchase authorization is exposed.
 * Localized fields are returned for every supported language.
 */
export function componentDTO(p: CatalogPart) {
  return {
    mpn: p.mpn,
    slug: p.slug,
    manufacturer: p.manufacturer,
    package: p.package,
    categorySlug: p.categorySlug,
    category: p.category,
    description: p.description,
    specs: p.specs,
    alternatives: p.alternatives,
    provenance: p.provenance,
    lastChecked: p.lastChecked,
    links: {
      self: `${BASE}/components/${p.slug}`,
      web: `${siteUrl}/en/components/${p.slug}`,
      datasheetSearch: octopartUrl(p.mpn),
    },
  };
}

/** JSON response with permissive CORS + cache headers (public read-only beta). */
export function apiJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2) + "\n", {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

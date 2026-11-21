import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { locales } from "@/lib/i18n";

const paths = ["", "/platform", "/marketplace", "/suppliers", "/search", "/compare", "/calculators", "/education", "/research", "/api", "/bom-analyzer", "/about", "/contact", "/privacy", "/terms", "/affiliate-disclosure", "/insights", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];
  for (const p of paths) {
    for (const l of locales) {
      out.push({
        url: `${siteUrl}/${l}${p}`,
        lastModified: now,
        alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}${p}`])) },
      });
    }
  }
  return out;
}

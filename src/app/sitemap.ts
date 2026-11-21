import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { locales } from "@/lib/i18n";
import { catalog, categories } from "@/lib/catalog";
import { manufacturers } from "@/lib/manufacturers";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { glossary } from "@/lib/glossary";
import { courses } from "@/lib/courses";

// Substantive, indexable routes only (stubs excluded).
const staticPaths = [
  "", "/platform", "/search", "/categories", "/calculators", "/education",
  "/guides", "/glossary", "/research", "/research/secd", "/api", "/bom-analyzer",
  "/manufacturers", "/suppliers/join", "/sourcing/request", "/privacy", "/terms", "/affiliate-disclosure",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [...staticPaths];
  for (const p of catalog) paths.push(`/components/${p.slug}`);
  for (const c of categories()) paths.push(`/categories/${c.slug}`);
  for (const c of calculators) paths.push(`/calculators/${c.slug}`);
  for (const g of guides) paths.push(`/guides/${g.slug}`);
  for (const t of glossary) paths.push(`/glossary/${t.slug}`);
  for (const c of courses) paths.push(`/courses/${c.slug}`);
  for (const m of manufacturers()) paths.push(`/manufacturers/${m.slug}`);

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

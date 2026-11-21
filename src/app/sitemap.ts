import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { locales } from "@/lib/i18n";
import { catalog, categories } from "@/lib/catalog";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { glossary } from "@/lib/glossary";
import { courses } from "@/lib/courses";
import { manufacturers } from "@/lib/manufacturers";

const staticPaths = [
  "", "/platform", "/search", "/categories", "/manufacturers", "/suppliers",
  "/suppliers/join", "/sourcing/request", "/calculators", "/education", "/guides",
  "/glossary", "/research", "/research/secd", "/api", "/bom-analyzer",
  "/about", "/privacy", "/terms", "/affiliate-disclosure",
];
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [...staticPaths];
  for (const p of catalog) paths.push(`/components/${p.slug}`);
  for (const c of categories()) paths.push(`/categories/${c.slug}`);
  for (const m of manufacturers()) paths.push(`/manufacturers/${m.slug}`);
  for (const c of calculators) paths.push(`/calculators/${c.slug}`);
  for (const g of guides) paths.push(`/guides/${g.slug}`);
  for (const t of glossary) paths.push(`/glossary/${t.slug}`);
  for (const c of courses) paths.push(`/courses/${c.slug}`);
  const out: MetadataRoute.Sitemap = [];
  for (const p of paths) for (const l of locales) out.push({
    url: `${siteUrl}/${l}${p}`, lastModified: now,
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}${p}`])) },
  });
  return out;
}

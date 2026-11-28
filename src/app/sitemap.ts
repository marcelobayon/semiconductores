import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { locales, type Locale } from "@/lib/i18n";
import { catalog, categories } from "@/lib/catalog";
import { calculators } from "@/lib/calculators";
import { guides, guideSlug } from "@/lib/guides";
import { glossary } from "@/lib/glossary";
import { courses } from "@/lib/courses";
import { manufacturers } from "@/lib/manufacturers";
import { categoryHubs } from "@/lib/category-hubs";

// Shared-slug routes: same locale-less path in every language.
const staticPaths = [
  "", "/platform", "/search", "/compare", "/categories", "/manufacturers", "/suppliers",
  "/suppliers/join", "/sourcing/request", "/calculators", "/education", "/guides",
  "/glossary", "/research", "/research/secd", "/api", "/bom-analyzer",
  "/about", "/privacy", "/terms", "/affiliate-disclosure",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Each page is a locale -> locale-less path map, so localized slugs get
  // correct per-locale URLs and hreflang alternates.
  const pages: Partial<Record<Locale, string>>[] = [];
  const shared = (p: string) => pages.push(Object.fromEntries(locales.map((l) => [l, p])));

  for (const p of staticPaths) shared(p);
  for (const p of catalog) shared(`/components/${p.slug}`);
  for (const c of categories()) shared(`/categories/${c.slug}`);
  for (const m of manufacturers()) shared(`/manufacturers/${m.slug}`);
  for (const c of calculators) shared(`/calculators/${c.slug}`);
  for (const t of glossary) shared(`/glossary/${t.slug}`);
  for (const c of courses) shared(`/courses/${c.slug}`);

  // Localized-slug pages.
  for (const g of guides) pages.push(Object.fromEntries(locales.map((l) => [l, `/guides/${guideSlug(g, l)}`])));
  for (const h of categoryHubs) pages.push(Object.fromEntries(locales.map((l) => [l, `/categories/${h.slug[l]}`])));

  const out: MetadataRoute.Sitemap = [];
  for (const page of pages) {
    const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${page[l]}`]));
    for (const l of locales) {
      out.push({ url: `${siteUrl}/${l}${page[l]}`, lastModified: now, alternates: { languages } });
    }
  }
  return out;
}

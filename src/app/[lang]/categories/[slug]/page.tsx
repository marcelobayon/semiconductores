import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { categories, partsInCategory } from "@/lib/catalog";
import { categoryHubs, getHubBySlug, hubParams } from "@/lib/category-hubs";
import CategoryHubView from "@/components/CategoryHubView";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  // Editorial hubs (localized slugs).
  for (const p of hubParams(locales)) out.push({ lang: p.lang, slug: p.slug });
  // Catalog category listings (shared slug).
  for (const lang of locales) for (const c of categories()) out.push({ lang, slug: c.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const hub = getHubBySlug(params.slug, lang);
  if (hub) {
    return buildMetadata({
      locale: lang,
      path: `/categories/${hub.slug[lang]}`,
      title: hub.title[lang],
      description: hub.description[lang],
      localizedPaths: Object.fromEntries(
        locales.map((l) => [l, `/categories/${hub.slug[l]}`]),
      ) as Partial<Record<Locale, string>>,
    });
  }
  const cat = categories().find((c) => c.slug === params.slug);
  if (!cat) return {};
  return buildMetadata({ locale: lang, path: `/categories/${cat.slug}`, title: cat.name[lang], description: `${cat.name[lang]} — Semiconductores.net` });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;

  const hub = getHubBySlug(params.slug, lang);
  if (hub) return <CategoryHubView hub={hub} locale={lang} />;

  const cat = categories().find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const d = getDictionary(lang);
  const parts = partsInCategory(cat.slug);
  // Does an editorial hub cover this catalog category? Offer a link up to it.
  const relatedHub = categoryHubs.find((h) => h.catalogCategorySlug === cat.slug);
  return (
    <main className="band"><div className="wrap">
      <div className="crumb"><Link href={`/${lang}/categories`}>{d.category.all}</Link></div>
      <h1 className="pzh">{cat.name[lang]}</h1>
      {relatedHub ? (
        <p className="sub">
          <Link className="rlink" href={`/${lang}/categories/${relatedHub.slug[lang]}`}>{relatedHub.h1[lang]} →</Link>
        </p>
      ) : null}
      <div className="catlist">
        {parts.map((p) => (
          <Link key={p.slug} className="catrow" href={`/${lang}/components/${p.slug}`}>
            <span className="mpn">{p.mpn}</span>
            <span className="meta">{p.manufacturer}</span>
            <span className="pkg">{p.package}</span>
          </Link>
        ))}
      </div>
    </div></main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { categories, partsInCategory } from "@/lib/catalog";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const c of categories()) out.push({ lang, slug: c.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const cat = categories().find((c) => c.slug === params.slug);
  if (!cat) return {};
  return buildMetadata({ locale: lang, path: `/categories/${cat.slug}`, title: cat.name[lang], description: `${cat.name[lang]} — Semiconductores.net` });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const cat = categories().find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const d = getDictionary(lang);
  const parts = partsInCategory(cat.slug);
  return (
    <main className="band"><div className="wrap">
      <div className="crumb"><Link href={`/${lang}/categories`}>{d.category.all}</Link></div>
      <h1 className="pzh">{cat.name[lang]}</h1>
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

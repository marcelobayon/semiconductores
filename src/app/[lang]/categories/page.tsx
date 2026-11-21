import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/lib/catalog";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/categories", title: d.category.title, description: d.category.intro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getDictionary(lang);
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{d.category.title}</h1>
      <p className="sub">{d.category.intro}</p>
      <div className="cards">
        {categories().map((cat) => (
          <Link key={cat.slug} className="rcard" href={`/${lang}/categories/${cat.slug}`}>
            <span className="r">{cat.count} {d.search.title.toLowerCase()}</span>
            <h3>{cat.name[lang]}</h3>
          </Link>
        ))}
      </div>
    </div></main>
  );
}

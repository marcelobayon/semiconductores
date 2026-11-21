import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import CatalogSearch from "@/components/CatalogSearch";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/search", title: d.search.title, description: d.search.intro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getDictionary(lang);
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{d.search.title}</h1>
      <p className="sub">{d.search.intro}</p>
      <CatalogSearch locale={lang} s={d.search} />
    </div></main>
  );
}

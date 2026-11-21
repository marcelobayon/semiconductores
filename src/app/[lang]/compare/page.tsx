import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import CompareView from "@/components/CompareView";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const c = getDictionary(lang).compare;
  return buildMetadata({ locale: lang, path: "/compare", title: c.title, description: c.intro });
}
export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const c = getDictionary(lang).compare;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{c.title}</h1>
      <p className="sub">{c.intro}</p>
      <CompareView locale={lang} t={c} />
    </div></main>
  );
}

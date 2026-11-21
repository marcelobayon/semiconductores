import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import BomAnalyzer from "@/components/BomAnalyzer";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/bom-analyzer", title: d.bom.title, description: d.bom.intro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const d = getDictionary(params.lang);
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{d.bom.title}</h1>
      <p className="sub">{d.bom.intro}</p>
      <BomAnalyzer locale={params.lang} t={d.bom} />
    </div></main>
  );
}

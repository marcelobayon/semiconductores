import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const s = getDictionary(lang).suppliers;
  return buildMetadata({ locale: lang, path: "/suppliers", title: s.title, description: s.intro });
}
export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const s = getDictionary(lang).suppliers;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{s.title}</h1>
      <p className="sub">{s.intro}</p>
      <div className="cards" style={{ marginTop: 20 }}>
        <div className="rcard amber" style={{ display: "block" }}>
          <h3>{s.buyersH}</h3><p>{s.buyersText}</p>
          <Link className="formbtn" href={`/${lang}/sourcing/request`} style={{ marginTop: 12, display: "inline-block" }}>{s.buyersCta}</Link>
        </div>
        <div className="rcard" style={{ display: "block" }}>
          <h3>{s.suppliersH}</h3><p>{s.suppliersText}</p>
          <Link className="formbtn" href={`/${lang}/suppliers/join`} style={{ marginTop: 12, display: "inline-block" }}>{s.suppliersCta}</Link>
        </div>
      </div>
      <p className="mfr-note" style={{ marginTop: 20 }}>{s.note}</p>
    </div></main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { glossary } from "@/lib/glossary";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const e = getDictionary(lang).education;
  return buildMetadata({ locale: lang, path: "/glossary", title: e.glossaryH, description: e.glossaryIntro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const e = getDictionary(lang).education;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{e.glossaryH}</h1>
      <p className="sub">{e.glossaryIntro}</p>
      <div className="catlist">
        {glossary.map((t) => (
          <Link key={t.slug} className="catrow" href={`/${lang}/glossary/${t.slug}`}>
            <span className="mpn">{t.term}</span>
            <span className="meta">{t.definition[lang]}</span>
          </Link>
        ))}
      </div>
    </div></main>
  );
}

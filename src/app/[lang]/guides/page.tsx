import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const e = getDictionary(lang).education;
  return buildMetadata({ locale: lang, path: "/guides", title: e.guidesH, description: e.guidesIntro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const e = getDictionary(lang).education;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{e.guidesH}</h1>
      <p className="sub">{e.guidesIntro}</p>
      <div className="cards">
        {guides.map((g) => (
          <Link key={g.slug} className="rcard" href={`/${lang}/guides/${g.slug}`}>
            <h3>{g.title[lang]}</h3><p>{g.summary[lang]}</p>
          </Link>
        ))}
      </div>
    </div></main>
  );
}

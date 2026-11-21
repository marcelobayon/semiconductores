import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { calculators } from "@/lib/calculators";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/calculators", title: d.calc.title, description: d.calc.intro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getDictionary(lang);
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{d.calc.title}</h1>
      <p className="sub">{d.calc.intro}</p>
      <div className="calclist">
        {calculators.map((c) => (
          <Link key={c.slug} className="rcard" href={`/${lang}/calculators/${c.slug}`}>
            <span className="r">{c.theme[lang]}</span>
            <h3>{c.title[lang]}</h3>
            <p>{c.purpose[lang]}</p>
          </Link>
        ))}
      </div>
    </div></main>
  );
}

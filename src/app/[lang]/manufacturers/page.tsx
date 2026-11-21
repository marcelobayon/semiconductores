import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { manufacturers, partsByManufacturer } from "@/lib/manufacturers";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/manufacturers", title: d.manufacturer.title, description: d.manufacturer.intro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getDictionary(lang);
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{d.manufacturer.title}</h1>
      <p className="sub">{d.manufacturer.intro}</p>
      <div className="cards">
        {manufacturers.map((m) => (
          <Link key={m.slug} className="rcard" href={`/${lang}/manufacturers/${m.slug}`}>
            <span className="r">{partsByManufacturer(m.slug).length} {d.manufacturer.parts.toLowerCase()}</span>
            <h3>{m.name}</h3>
            <p>{m.country[lang]}</p>
          </Link>
        ))}
      </div>
    </div></main>
  );
}

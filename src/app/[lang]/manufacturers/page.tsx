import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { manufacturers, partsByManufacturer } from "@/lib/manufacturers";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const m = getDictionary(lang).manufacturers;
  return buildMetadata({ locale: lang, path: "/manufacturers", title: m.title, description: m.intro });
}
export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const t = getDictionary(lang).manufacturers;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{t.title}</h1>
      <p className="sub">{t.intro}</p>
      <div className="cards">
        {manufacturers().map((m) => {
          const n = partsByManufacturer(m.name).length;
          return (
            <Link key={m.slug} className="rcard" href={`/${lang}/manufacturers/${m.slug}`}>
              <span className="r">{n} {n === 1 ? t.part : t.parts}</span>
              <h3>{m.name}</h3><p>{m.blurb[lang]}</p>
            </Link>
          );
        })}
      </div>
    </div></main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import PlatformScene from "@/components/PlatformScene";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/platform", title: d.platform.h, description: d.platform.p });
}

export default function PlatformPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getDictionary(lang);
  return (
    <main>
      <PlatformScene locale={lang} />
      <section className="band"><div className="wrap">
        <div className="kick"><span>{d.platform.kick}</span></div>
        <h2 className="pzh">{d.platform.h}</h2>
        <p className="sub">{d.platform.p}</p>
        <div className="cards">
          {d.cards.slice(0, 5).map((card) => (
            <Link key={card.route} className={"rcard" + (card.accent ? " " + card.accent : "")} href={`/${lang}${card.route}`}>
              <span className="r">{card.route}</span><h3>{card.t}</h3><p>{card.d}</p>
            </Link>
          ))}
        </div>
        <p className="fdisc" style={{ marginTop: 18 }}>{d.platform.note}</p>
      </div></section>
    </main>
  );
}

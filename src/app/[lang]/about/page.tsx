import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const a = getDictionary(lang).about;
  return buildMetadata({ locale: lang, path: "/about", title: a.title, description: a.intro });
}
export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const a = getDictionary(lang).about;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{a.title}</h1>
      <p className="sub">{a.intro}</p>
      <h2 className="sec" style={{ marginTop: 26 }}>{a.whatH}</h2>
      <p className="apibody">{a.whatText}</p>
      <h2 className="sec" style={{ marginTop: 22 }}>{a.ambitionH}</h2>
      <p className="apibody">{a.ambitionText}</p>
      <p style={{ marginTop: 10 }}><Link href={`/${lang}/research`} className="rlink">{a.ambitionCta} →</Link></p>
      <h2 className="sec" style={{ marginTop: 22 }}>{a.isntH}</h2>
      <p className="apibody">{a.isntText}</p>
      <div className="bomcta" style={{ marginTop: 26 }}>
        <h3 className="sec">{a.ctaH}</h3><p>{a.ctaText}</p>
        <Link className="formbtn" href={`/${lang}/sourcing/request`}>{a.ctaBtn}</Link>
      </div>
    </div></main>
  );
}

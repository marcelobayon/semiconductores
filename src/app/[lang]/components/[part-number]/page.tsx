import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { catalog, getPart, octopartUrl } from "@/lib/catalog";
import WhereToBuy from "@/components/WhereToBuy";

export function generateStaticParams() {
  const out: { lang: string; "part-number": string }[] = [];
  for (const lang of locales) for (const p of catalog) out.push({ lang, "part-number": p.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; "part-number": string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const part = getPart(params["part-number"]);
  if (!part) return {};
  return buildMetadata({ locale: lang, path: `/components/${part.slug}`, title: `${part.mpn} — ${part.manufacturer}`, description: part.description[lang] });
}

export default function Page({ params }: { params: { lang: string; "part-number": string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const part = getPart(params["part-number"]);
  if (!part) notFound();
  const d = getDictionary(lang);
  const c = d.component;
  const jsonld = {
    "@context": "https://schema.org", "@type": "Product",
    name: part.mpn, mpn: part.mpn, category: part.category.en,
    brand: { "@type": "Brand", name: part.manufacturer }, description: part.description[lang],
  };
  return (
    <main className="detailwrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <div className="crumb">
        <Link href={`/${lang}/search`}>{c.components}</Link> / <Link href={`/${lang}/categories/${part.categorySlug}`}>{part.category[lang]}</Link>
      </div>
      <h1>{part.mpn}</h1>
      <p className="detailsub">{part.manufacturer} · {part.category[lang]} · {part.package}</p>
      <p className="detaildesc">{part.description[lang]}</p>

      <div className="spectable">
        {part.specs.map((s, i) => (
          <div className="specrow" key={i}><span className="sl">{s.label[lang]}</span><span className="sv">{s.value}</span></div>
        ))}
      </div>

      <div className="nopricing">{c.noPricing}</div>
      <a className="extlink" href={octopartUrl(part.mpn)} target="_blank" rel="noopener noreferrer nofollow">{c.findOn} {"↗"}</a>
      <div className="provbox">{part.provenance[lang]}<br /><b>{c.lastChecked}:</b> {part.lastChecked}</div>

      <WhereToBuy locale={lang} e={d.education} />

      <section style={{ marginTop: 20 }}>
        <h3 className="sec">{c.altsH}</h3>
        {part.alternatives.length === 0 ? <p className="sub">{c.noAlts}</p> : (
          <div className="catlist">
            {part.alternatives.map((a) => {
              const ap = getPart(a);
              return ap ? (
                <Link key={a} className="catrow" href={`/${lang}/components/${ap.slug}`}>
                  <span className="mpn">{ap.mpn}</span><span className="meta">{ap.manufacturer}</span>
                </Link>
              ) : null;
            })}
          </div>
        )}
      </section>
    </main>
  );
}

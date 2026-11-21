import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { guides, getGuide } from "@/lib/guides";
import PageView from "@/components/PageView";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const g of guides) out.push({ lang, slug: g.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const g = getGuide(params.slug);
  if (!g) return {};
  return buildMetadata({ locale: lang, path: `/guides/${g.slug}`, title: g.title[lang], description: g.summary[lang] });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const g = getGuide(params.slug);
  if (!g) notFound();
  const e = getDictionary(lang).education;
  const jsonld = { "@context": "https://schema.org", "@type": "Article", headline: g.title[lang], datePublished: g.published, dateModified: g.updated };
  return (
    <main className="detailwrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <PageView event="guide_view" params={{ guide: g.slug, business_unit: "education" }} />
      <div className="crumb"><Link href={`/${lang}/guides`}>{e.allGuides}</Link></div>
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.5px" }}>{g.title[lang]}</h1>
      <p className="detailsub">{e.editor}: {g.editor} {"·"} {e.published}: {g.published}</p>
      <p className="detaildesc">{g.summary[lang]}</p>
      {g.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 18 }}>
          <h2 className="gsec">{s.heading[lang]}</h2>
          <p className="gbody">{s.body[lang]}</p>
        </section>
      ))}
      <div className="provbox">
        <b>{e.sources}:</b> {g.sources.map((s, i) => (
          <span key={i}>{i > 0 ? ", " : " "}<a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.label}</a></span>
        ))}
        <br /><b>{e.limitations}:</b> {g.limitations[lang]}
      </div>
    </main>
  );
}

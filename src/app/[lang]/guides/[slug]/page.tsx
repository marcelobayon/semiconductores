import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { guides, getGuide, guideSlug } from "@/lib/guides";
import { getPart } from "@/lib/catalog";
import { categoryHubs } from "@/lib/category-hubs";
import PageView from "@/components/PageView";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const g of guides) out.push({ lang, slug: guideSlug(g, lang) });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const g = getGuide(params.slug);
  if (!g) return {};
  return buildMetadata({
    locale: lang,
    path: `/guides/${guideSlug(g, lang)}`,
    title: g.title[lang],
    description: g.summary[lang],
    localizedPaths: g.esSlug
      ? { en: `/guides/${g.slug}`, es: `/guides/${g.esSlug}` }
      : undefined,
  });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const g = getGuide(params.slug);
  if (!g) notFound();
  const e = getDictionary(lang).education;

  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: g.title[lang],
    description: g.summary[lang],
    inLanguage: lang,
    datePublished: g.published,
    dateModified: g.updated,
    author: { "@type": "Organization", name: g.editor },
    publisher: { "@type": "Organization", name: "Semiconductores.net" },
    mainEntityOfPage: `${siteUrl}/${lang}/guides/${guideSlug(g, lang)}`,
  };
  const crumb = breadcrumbJsonLd(lang, [
    { name: lang === "es" ? "Inicio" : "Home", path: "" },
    { name: e.guidesH ?? "Guides", path: "/guides" },
    { name: g.title[lang], path: `/guides/${guideSlug(g, lang)}` },
  ]);

  const parts = (g.relatedComponents ?? []).map((s) => getPart(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const hub = g.relatedHubKey ? categoryHubs.find((h) => h.key === g.relatedHubKey) : undefined;
  const hasSeeAlso = parts.length > 0 || hub;

  return (
    <main className="detailwrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <PageView event="guide_view" params={{ guide: g.slug, business_unit: "education" }} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${lang}/guides`}>{e.allGuides}</Link>
      </nav>
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.5px" }}>{g.title[lang]}</h1>
      <p className="detailsub">{e.editor}: {g.editor} {"·"} {e.published}: {g.published}</p>
      <p className="detaildesc">{g.summary[lang]}</p>
      {g.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 18 }}>
          <h2 className="gsec">{s.heading[lang]}</h2>
          <p className="gbody">{s.body[lang]}</p>
        </section>
      ))}

      {hasSeeAlso ? (
        <div className="seealso">
          <b>{e.seeAlso}:</b>{" "}
          {hub ? <Link href={`/${lang}/categories/${hub.slug[lang]}`}>{hub.h1[lang]}</Link> : null}
          {parts.map((p, i) => (
            <span key={p.slug}>{hub || i > 0 ? " · " : ""}<Link href={`/${lang}/components/${p.slug}`}>{p.mpn}</Link></span>
          ))}
        </div>
      ) : null}

      <div className="provbox">
        <b>{e.sources}:</b> {g.sources.map((s, i) => (
          <span key={i}>{i > 0 ? ", " : " "}<a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.label}</a></span>
        ))}
        <br /><b>{e.limitations}:</b> {g.limitations[lang]}
      </div>
    </main>
  );
}

import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getPart } from "@/lib/catalog";
import { manufacturers } from "@/lib/manufacturers";
import { getGuide } from "@/lib/guides";
import type { CategoryHub } from "@/lib/category-hubs";
import PageView from "@/components/PageView";

function mfrSlug(name: string): string | undefined {
  return manufacturers().find((m) => m.name === name)?.slug;
}

function guideHref(locale: Locale, slug: string): string {
  const g = getGuide(slug);
  const s = g && locale === "es" && g.esSlug ? g.esSlug : slug;
  return `/${locale}/guides/${s}`;
}

export default function CategoryHubView({ hub, locale }: { hub: CategoryHub; locale: Locale }) {
  const t = getDictionary(locale).hub;
  const parts = hub.relatedComponents.map((s) => getPart(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const guides = hub.relatedGuides.map((s) => ({ slug: s, g: getGuide(s) })).filter((x) => x.g);
  const crumb = breadcrumbJsonLd(locale, [
    { name: t.home, path: "" },
    { name: t.categories, path: "/categories" },
    { name: hub.h1[locale], path: `/categories/${hub.slug[locale]}` },
  ]);

  return (
    <main className="band"><div className="wrap hubwrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <PageView event="category_view" params={{ category: hub.key, business_unit: "component_intelligence" }} />

      <nav className="crumb" aria-label="Breadcrumb">
        <Link href={`/${locale}`}>{t.home}</Link> <span>/</span>{" "}
        <Link href={`/${locale}/categories`}>{t.categories}</Link> <span>/</span> {hub.h1[locale]}
      </nav>

      <h1 className="pzh">{hub.h1[locale]}</h1>
      <p className="sub hublede">{hub.intro[locale]}</p>

      <p className="hubdo">
        <span>{t.whatYouCanDo}</span>{" "}
        <Link href={`/${locale}/search`}>{t.doBrowse}</Link> {"·"}{" "}
        <Link href={`/${locale}/compare`}>{t.doCompare}</Link> {"·"}{" "}
        <Link href={`/${locale}/calculators`}>{t.doCalc}</Link> {"·"}{" "}
        <Link href={`/${locale}/sourcing/request`}>{t.doSource}</Link>
      </p>

      <h2 className="sec hubh">{t.overviewH}</h2>
      {hub.overview.map((s, i) => (
        <section key={i} className="hubsec">
          <h3 className="gsec">{s.heading[locale]}</h3>
          <p className="gbody">{s.body[locale]}</p>
        </section>
      ))}

      <h2 className="sec hubh">{t.selectionH}</h2>
      <p className="gbody">{hub.selectionIntro[locale]}</p>
      <div className="bomtablewrap" style={{ marginTop: 12 }}>
        <table className="bomtable">
          <thead><tr><th>{t.paramCol}</th><th>{t.whyCol}</th></tr></thead>
          <tbody>
            {hub.selection.map((p, i) => (
              <tr key={i}><td><b>{p.name[locale]}</b></td><td>{p.why[locale]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="hubnote">{hub.selectionNote[locale]}</p>

      <h2 className="sec hubh">{t.applicationsH}</h2>
      <ul className="bullets">
        {hub.applications.map((a, i) => <li key={i}>{a[locale]}</li>)}
      </ul>

      <h2 className="sec hubh">{t.componentsH}</h2>
      <p className="hubnote">{hub.discovery[locale]}</p>
      <div className="catlist">
        {parts.map((p) => {
          const ms = mfrSlug(p.manufacturer);
          return (
            <div key={p.slug} className="catrow hubpart">
              <Link className="mpn" href={`/${locale}/components/${p.slug}`}>{p.mpn}</Link>
              <span className="meta">
                {ms ? <Link href={`/${locale}/manufacturers/${ms}`}>{p.manufacturer}</Link> : p.manufacturer}
                {" · "}{p.package}
              </span>
              <Link className="hubview" href={`/${locale}/components/${p.slug}`}>{t.viewComponent} →</Link>
            </div>
          );
        })}
      </div>
      {hub.catalogCategorySlug ? (
        <p style={{ marginTop: 12 }}>
          <Link className="rlink" href={`/${locale}/categories/${hub.catalogCategorySlug}`}>{t.browseAll} →</Link>
        </p>
      ) : null}

      {guides.length ? (
        <>
          <h2 className="sec hubh">{t.relatedH}</h2>
          <div className="cards">
            {guides.map(({ slug, g }) => (
              <Link key={slug} className="rcard" href={guideHref(locale, slug)}>
                <h3>{g!.title[locale]}</h3><p>{g!.summary[locale]}</p>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      <div className="bomcta" style={{ marginTop: 28 }}>
        <h3 className="sec">{t.sourceH}</h3>
        <p>{hub.sourcingNote[locale]}</p>
        <Link className="formbtn" href={`/${locale}/sourcing/request`}>{t.doSource}</Link>
      </div>

      <div className="provbox" style={{ marginTop: 24 }}>
        <b>{t.sourcesH}:</b>
        <ul className="srclist">
          {hub.sources.map((s, i) => (
            <li key={i}>
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.label}</a> — {s.publisher} <span className="srctype">({s.type})</span>
            </li>
          ))}
        </ul>
        <span className="srcdate">{t.published}: {hub.publishedAt} {"·"} {t.lastReviewed}: {hub.lastReviewedAt}</span>
      </div>
    </div></main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { institutionsByCountry, legislation, peruPillars, type Institution } from "@/lib/research";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const r = getDictionary(lang).research;
  return buildMetadata({ locale: lang, path: "/research", title: r.title, description: r.intro });
}

function kindLabel(r: ReturnType<typeof getDictionary>["research"], k: Institution["kind"]) {
  return k === "gov" ? r.kindGov : k === "uni" ? r.kindUni : r.kindIndustry;
}

function InstitutionCard({ inst, r, lang }: { inst: Institution; r: ReturnType<typeof getDictionary>["research"]; lang: Locale }) {
  return (
    <a className="rcard" href={inst.url} target="_blank" rel="noopener noreferrer">
      <span className="r">{kindLabel(r, inst.kind)}</span>
      <h3>{inst.name}</h3>
      <p>{inst.note[lang]}</p>
      <span className="rlink">{r.visit} ↗</span>
    </a>
  );
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const r = getDictionary(lang).research;
  const co = institutionsByCountry("colombia");
  const pe = institutionsByCountry("peru");

  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{r.title}</h1>
      <p className="sub">{r.intro}</p>

      <h2 className="sec" style={{ marginTop: 28 }}>{r.ourResearchH}</h2>
      <Link className="rcard amber" href={`/${lang}/research/secd`} style={{ display: "block", maxWidth: 560 }}>
        <span className="r">SECD</span>
        <h3>{r.secdTitle}</h3>
        <p>{r.secdNote}</p>
        <span className="rlink">{r.secdCta} →</span>
      </Link>

      <h2 className="sec" style={{ marginTop: 32 }}>{r.policyH}</h2>
      <p className="sub">{r.policyIntro}</p>
      {legislation.map((law, i) => (
        <div key={i} className="lawcard">
          <h3>{law.title[lang]}</h3>
          <p className="lawref mono">{law.ref}</p>
          <p className="lawstatus"><span className="badge">{r.statusLabel}</span> {law.status[lang]} <span className="lawasof">({law.asOf[lang]})</span></p>
          <p className="lawnote">{law.note[lang]}</p>
          <p className="lawsrc">{r.sourcesLabel}: {law.sources.map((s, j) => (
            <span key={j}>{j > 0 ? " · " : " "}<a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.label} ↗</a></span>
          ))}</p>
        </div>
      ))}

      <h2 className="sec" style={{ marginTop: 32 }}>{r.institutionsH}</h2>
      <p className="sub">{r.institutionsIntro}</p>
      <h3 className="csub">{r.colombiaH}</h3>
      <div className="cards">{co.map((i) => <InstitutionCard key={i.url} inst={i} r={r} lang={lang} />)}</div>
      <h3 className="csub" style={{ marginTop: 18 }}>{r.peruH}</h3>
      <div className="cards">{pe.map((i) => <InstitutionCard key={i.url} inst={i} r={r} lang={lang} />)}</div>

      <h2 className="sec" style={{ marginTop: 32 }}>{r.peruRoadmapH}</h2>
      <p className="sub">{r.peruRoadmapIntro}</p>
      <ul className="pillars">{peruPillars.map((p, i) => <li key={i}>{p[lang]}</li>)}</ul>

      <div className="disclaimer">
        <b>{r.disclaimerTitle}</b>
        <p>{r.disclaimer}</p>
      </div>

      <div className="bomcta" style={{ marginTop: 24 }}>
        <h3 className="sec">{r.ctaTitle}</h3>
        <p>{r.ctaText}</p>
        <Link className="formbtn" href={`/${lang}/sourcing/request`}>{r.ctaBtn}</Link>
      </div>
    </div></main>
  );
}

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const f = getDictionary(locale).footer;
  const cols: { h: string; links: { r: string; l: string }[] }[] = [
    { h: f.colCatalog, links: [{ r: "/search", l: f.lSearch }, { r: "/categories", l: f.lCategories }, { r: "/manufacturers", l: f.lManufacturers }] },
    { h: f.colTools, links: [{ r: "/calculators", l: f.lCalculators }, { r: "/bom-analyzer", l: f.lBom }, { r: "/api", l: f.lApi }] },
    { h: f.colLearn, links: [{ r: "/education", l: f.lEducation }, { r: "/guides", l: f.lGuides }, { r: "/glossary", l: f.lGlossary }] },
    { h: f.colInitiative, links: [{ r: "/research", l: f.lResearch }, { r: "/platform", l: f.lPlatform }] },
  ];
  const legal = [{ r: "/privacy", l: f.privacy }, { r: "/terms", l: f.terms }, { r: "/affiliate-disclosure", l: f.affiliate }];
  return (
    <footer className="sfoot">
      <div className="wrap">
        <div className="fcols">
          <div className="fbrand">
            <Link className="logo" href={`/${locale}`}><span className="dot" />Semiconductores<span className="faint">.net</span></Link>
            <p>{f.tagline}</p>
          </div>
          {cols.map((c) => (
            <nav key={c.h} className="fcol" aria-label={c.h}>
              <h4>{c.h}</h4>
              {c.links.map((l) => <Link key={l.r} href={`/${locale}${l.r}`}>{l.l}</Link>)}
            </nav>
          ))}
        </div>
        <div className="fbottom">
          <div className="flegal">
            {legal.map((l, i) => <span key={l.r}>{i > 0 ? " · " : ""}<Link href={`/${locale}${l.r}`}>{l.l}</Link></span>)}
          </div>
          <div className="fdisc">{f.disc}</div>
        </div>
      </div>
    </footer>
  );
}

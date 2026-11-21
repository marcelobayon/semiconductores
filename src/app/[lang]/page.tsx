import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import PartSearch from "@/components/PartSearch";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "", title: `${d.home.h1a} ${d.home.h1b}`, description: d.home.sub });
}

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getDictionary(lang);
  return (
    <main>
      <header className="hero">
        <div className="wrap">
          <div className="kick"><span>{d.home.kick}</span><span className="pill">{d.home.kick2}</span></div>
          <h1>{d.home.h1a} <u>{d.home.h1b}</u></h1>
          <p className="sub">{d.home.sub}</p>
          <PartSearch locale={lang} c={d.common} />
          <div className="secact">
            <Link className="lk" href={`/${lang}/platform`}>{d.home.sa1} <span className="ar">{"→"}</span></Link>
            <Link className="lk amber" href={`/${lang}/api`}>{d.home.sa2} <span className="ar">{"→"}</span></Link>
            <Link className="lk" href={`/${lang}/bom-analyzer`}>{d.home.sa3} <span className="ar">{"→"}</span></Link>
          </div>
          <div className="tstrip">
            {[d.home.t1, d.home.t2, d.home.t3, d.home.t4].map((t) => (
              <span key={t}><i />{t}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="band"><div className="wrap">
        <Link className="ptease" href={`/${lang}/platform`}>
          <div className="txt">
            <div className="k">{d.home.ptK}</div>
            <h3>{d.home.ptH}</h3>
            <p>{d.home.ptP}</p>
            <span className="lk">{d.home.ptCta} <span className="ar">{"→"}</span></span>
          </div>
          <div className="iso" aria-hidden>
            <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice">
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00F0FF" stopOpacity="0" /><stop offset="1" stopColor="#00F0FF" stopOpacity=".18" /></linearGradient></defs>
              <g stroke="rgba(0,240,255,.28)" strokeWidth="1" fill="none">
                <path d="M40 150 L160 90 L280 150 L160 210 Z" /><path d="M70 135 L160 180" /><path d="M100 120 L190 165" /><path d="M130 105 L220 150" /><path d="M250 135 L160 180" /><path d="M220 120 L130 165" /><path d="M190 105 L100 150" />
              </g>
              <path d="M60 70 L260 70" stroke="rgba(154,163,180,.5)" strokeWidth="2" />
              <rect className="node" x="96" y="62" width="16" height="12" rx="2" fill="#00F0FF" opacity=".8" />
              <rect className="node b" x="206" y="150" width="20" height="9" rx="2" fill="#FFB800" opacity=".85" />
              <rect className="scanline" x="40" y="90" width="240" height="2" fill="url(#g)" />
            </svg>
          </div>
        </Link>
      </div></section>

      <section className="band soft"><div className="wrap">
        <h2 className="sec">{d.home.fnH}</h2>
        <div className="funnel">
          {d.funnel.map((f, i) => (
            <div key={f.n} className={"fstep" + (i === 4 ? " amber" : "")}>
              <div className="n">{f.n}</div><div className="t">{f.t}</div><div className="d">{f.d}</div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="band soft"><div className="wrap">
        <h2 className="sec">{d.home.rcH}</h2>
        <div className="cards">
          {d.cards.map((card) => (
            <Link key={card.route} className={"rcard" + (card.accent ? " " + card.accent : "")} href={`/${lang}${card.route}`}>
              <span className="r">{card.route}</span>
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </Link>
          ))}
        </div>
      </div></section>
    </main>
  );
}

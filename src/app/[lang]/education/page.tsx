import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { courses } from "@/lib/courses";
import { guides } from "@/lib/guides";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/education", title: d.education.title, description: d.education.intro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const e = getDictionary(lang).education;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{e.title}</h1>
      <p className="sub">{e.intro}</p>

      <h2 className="sec" style={{ marginTop: 28 }}>{e.coursesH}</h2>
      <p className="sub">{e.coursesIntro}</p>
      <div className="cards">
        {courses.map((c) => (
          <Link key={c.slug} className="rcard amber" href={`/${lang}/courses/${c.slug}`}>
            <span className="r">{c.level[lang]}</span>
            <h3>{c.title[lang]}</h3>
            <p>{c.subtitle[lang]}</p>
          </Link>
        ))}
      </div>

      <h2 className="sec" style={{ marginTop: 32 }}>{e.guidesH}</h2>
      <p className="sub">{e.guidesIntro}</p>
      <div className="cards">
        {guides.map((g) => (
          <Link key={g.slug} className="rcard" href={`/${lang}/guides/${g.slug}`}>
            <span className="r">{e.guidesH}</span>
            <h3>{g.title[lang]}</h3>
            <p>{g.summary[lang]}</p>
          </Link>
        ))}
      </div>

      <h2 className="sec" style={{ marginTop: 32 }}>{e.glossaryH} &amp; {e.calcH}</h2>
      <div className="cards">
        <Link className="rcard" href={`/${lang}/glossary`}><span className="r">{e.glossaryH}</span><h3>{e.glossaryH}</h3><p>{e.glossaryIntro}</p></Link>
        <Link className="rcard" href={`/${lang}/calculators`}><span className="r">{e.calcH}</span><h3>{e.calcH}</h3><p>{e.calcIntro}</p></Link>
      </div>
    </div></main>
  );
}

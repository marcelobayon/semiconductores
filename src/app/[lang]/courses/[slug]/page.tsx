import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { courses, getCourse } from "@/lib/courses";
import CourseWaitlist from "@/components/CourseWaitlist";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const c of courses) out.push({ lang, slug: c.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const c = getCourse(params.slug);
  if (!c) return {};
  return buildMetadata({ locale: lang, path: `/courses/${c.slug}`, title: c.title[lang], description: c.subtitle[lang] });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const c = getCourse(params.slug);
  if (!c) notFound();
  const e = getDictionary(lang).education;
  return (
    <main className="detailwrap">
      <div className="crumb"><Link href={`/${lang}/education`}>{e.backEducation}</Link></div>
      <span className="stubtag">{c.level[lang]}</span>
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.5px", marginTop: 10 }}>{c.title[lang]}</h1>
      <p className="detaildesc">{c.subtitle[lang]}</p>
      <div className="nopricing">{e.notBuilt}</div>

      <div className=" cols">
        <section style={{ marginTop: 10 }}>
          <h3 className="sec">{e.youLearn}</h3>
          <ul className="bullets">{c.learn.map((x, i) => <li key={i}>{x[lang]}</li>)}</ul>
        </section>
        <section style={{ marginTop: 18 }}>
          <h3 className="sec">{e.forWho}</h3>
          <ul className="bullets">{c.forWho.map((x, i) => <li key={i}>{x[lang]}</li>)}</ul>
        </section>
        <section style={{ marginTop: 18 }}>
          <h3 className="sec">{e.curriculum}</h3>
          <ul className="bullets">{c.curriculum.map((x, i) => <li key={i}>{x[lang]}</li>)}</ul>
        </section>
      </div>

      <div style={{ marginTop: 24 }}>
        <CourseWaitlist course={c.slug} e={e} />
      </div>
    </main>
  );
}

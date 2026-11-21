import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { calculators, getCalculator } from "@/lib/calculators";
import CalculatorView from "@/components/CalculatorView";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const c of calculators) out.push({ lang, slug: c.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const calc = getCalculator(params.slug);
  if (!calc) return {};
  return buildMetadata({ locale: lang, path: `/calculators/${calc.slug}`, title: calc.title[lang], description: calc.purpose[lang] });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const calc = getCalculator(params.slug);
  if (!calc) notFound();
  const d = getDictionary(lang);
  const c = d.calc;
  const ui = { inputs: c.inputs, result: c.result, formula: c.formula, assumptions: c.assumptions, worked: c.worked, limitations: c.limitations, purpose: c.purpose, verify: c.verify };
  return (
    <main className="calcwrap">
      <div className="calctheme">{calc.theme[lang]}</div>
      <h1>{calc.title[lang]}</h1>
      <p className="calcpurpose">{calc.purpose[lang]}</p>
      <CalculatorView slug={calc.slug} locale={lang} ui={ui} />
      <div className="calcmeta">
        <section><h3>{c.formula}</h3><div className="formula">{calc.formula}</div></section>
        <section><h3>{c.assumptions}</h3><p>{calc.assumptions[lang]}</p></section>
        <section><h3>{c.worked}</h3><p>{calc.worked[lang]}</p></section>
        <section><h3>{c.limitations}</h3><p>{calc.limitations[lang]}</p></section>
        <div className="calcverify">{c.verify}</div>
      </div>
      <p style={{ marginTop: 24 }}><Link className="lk" href={`/${lang}/calculators`}>{c.all} <span className="ar">{"→"}</span></Link></p>
    </main>
  );
}

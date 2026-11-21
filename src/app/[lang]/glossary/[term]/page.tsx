import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { glossary, getTerm } from "@/lib/glossary";

export function generateStaticParams() {
  const out: { lang: string; term: string }[] = [];
  for (const lang of locales) for (const t of glossary) out.push({ lang, term: t.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; term: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const t = getTerm(params.term);
  if (!t) return {};
  return buildMetadata({ locale: lang, path: `/glossary/${t.slug}`, title: t.term, description: t.definition[lang] });
}

export default function Page({ params }: { params: { lang: string; term: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const t = getTerm(params.term);
  if (!t) notFound();
  const e = getDictionary(lang).education;
  return (
    <main className="detailwrap">
      <div className="crumb"><Link href={`/${lang}/glossary`}>{e.allTerms}</Link></div>
      <h1 style={{ fontFamily: "var(--sans)" }}>{t.term}</h1>
      <p className="detaildesc">{t.definition[lang]}</p>
    </main>
  );
}

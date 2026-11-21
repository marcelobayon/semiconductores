import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const t = getDictionary(lang).terms;
  return buildMetadata({ locale: lang, path: "/terms", title: t.title, description: t.intro });
}
export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const t = getDictionary(params.lang).terms;
  return (
    <main className="detailwrap">
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.4px" }}>{t.title}</h1>
      <p className="lawref mono">{t.updated}</p>
      <p className="detaildesc">{t.intro}</p>
      {t.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 16 }}>
          <h2 className="gsec">{s.h}</h2>
          <p className="gbody">{s.p}</p>
        </section>
      ))}
    </main>
  );
}

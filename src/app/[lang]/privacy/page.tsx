import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const p = getDictionary(lang).privacy;
  return buildMetadata({ locale: lang, path: "/privacy", title: p.title, description: p.intro });
}
export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const p = getDictionary(params.lang).privacy;
  return (
    <main className="detailwrap">
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.4px" }}>{p.title}</h1>
      <p className="lawref mono">{p.updated}</p>
      <p className="detaildesc">{p.intro}</p>
      {p.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 16 }}>
          <h2 className="gsec">{s.h}</h2>
          <p className="gbody">{s.p}</p>
        </section>
      ))}
    </main>
  );
}

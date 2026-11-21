import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const a = getDictionary(lang).affiliateDisclosure;
  return buildMetadata({ locale: lang, path: "/affiliate-disclosure", title: a.title, description: a.body.slice(0, 150) });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const a = getDictionary(params.lang).affiliateDisclosure;
  return (
    <main className="detailwrap">
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.4px" }}>{a.title}</h1>
      <p className="detaildesc">{a.body}</p>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import StubPage from "@/components/StubPage";

const TITLES: Record<Locale, string> = { en: 'Tools & Calculators', es: 'Herramientas y Calculadoras' };

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  return buildMetadata({ locale: lang, path: '/calculators', title: TITLES[lang], description: TITLES[lang] });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  return <StubPage locale={params.lang} title={TITLES[params.lang]} />;
}

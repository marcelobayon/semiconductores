import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Analytics from "@/components/Analytics";
import { locales, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LangLayout({
  children, params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  return (
    <html lang={params.lang}>
      <body>
        <Analytics />
        <SiteNav locale={params.lang} />
        {children}
        <SiteFooter locale={params.lang} />
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { manufacturers, getManufacturer, partsByManufacturer } from "@/lib/manufacturers";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const m of manufacturers()) out.push({ lang, slug: m.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const m = getManufacturer(params.slug);
  if (!m) return {};
  return buildMetadata({ locale: lang, path: `/manufacturers/${m.slug}`, title: m.name, description: m.blurb[lang] });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const m = getManufacturer(params.slug);
  if (!m) notFound();
  const t = getDictionary(lang).manufacturers;
  const parts = partsByManufacturer(m.name);
  const cats = [...new Set(parts.map((p) => p.category[lang]))];
  const jsonld = { "@context": "https://schema.org", "@type": "Organization", name: m.name, description: m.blurb[lang] };
  return (
    <main className="detailwrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <div className="crumb"><Link href={`/${lang}/manufacturers`}>{t.backAll}</Link></div>
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.4px" }}>{m.name}</h1>
      <p className="detaildesc">{m.blurb[lang]}</p>

      <div className="mfr-cats">{cats.map((c) => <span key={c}>{c}</span>)}</div>

      <h3 className="sec">{t.inCatalog} ({parts.length})</h3>
      <div className="catlist">
        {parts.map((p) => (
          <Link key={p.slug} className="catrow" href={`/${lang}/components/${p.slug}`}>
            <span className="mpn">{p.mpn}</span>
            <span className="meta">{p.category[lang]} · {p.package}</span>
          </Link>
        ))}
      </div>

      <p className="mfr-note">{t.profileNote}</p>
    </main>
  );
}

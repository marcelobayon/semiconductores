import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { manufacturers, getManufacturer, partsByManufacturer } from "@/lib/manufacturers";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) for (const m of manufacturers) out.push({ lang, slug: m.slug });
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const m = getManufacturer(params.slug);
  if (!m) return {};
  return buildMetadata({ locale: lang, path: `/manufacturers/${m.slug}`, title: m.name, description: m.description[lang] });
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const m = getManufacturer(params.slug);
  if (!m) notFound();
  const d = getDictionary(lang);
  const mc = d.manufacturer;
  const parts = partsByManufacturer(m.slug);
  const jsonld = {
    "@context": "https://schema.org", "@type": "Organization",
    name: m.name, url: m.website,
  };
  return (
    <main className="detailwrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <div className="crumb"><Link href={`/${lang}/manufacturers`}>{mc.all}</Link></div>
      <h1 style={{ fontFamily: "var(--sans)", letterSpacing: "-.5px" }}>{m.name}</h1>
      <p className="detailsub">{m.country[lang]}</p>
      <p className="detaildesc">{m.description[lang]}</p>
      <a className="extlink" href={m.website} target="_blank" rel="noopener noreferrer nofollow">{mc.website} {"↗"}</a>

      <section style={{ marginTop: 24 }}>
        <h3 className="sec">{mc.parts}</h3>
        <div className="catlist">
          {parts.map((p) => (
            <Link key={p.slug} className="catrow" href={`/${lang}/components/${p.slug}`}>
              <span className="mpn">{p.mpn}</span>
              <span className="meta">{p.category[lang]}</span>
              <span className="pkg">{p.package}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

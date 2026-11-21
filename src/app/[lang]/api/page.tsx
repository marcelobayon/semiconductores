import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, siteUrl } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const a = getDictionary(lang).apiDocs;
  return buildMetadata({ locale: lang, path: "/api", title: a.title, description: a.intro });
}

const rows = [
  { path: "/api/v1/components", key: "epComponents" as const },
  { path: "/api/v1/components/{slug}", key: "epComponent" as const },
  { path: "/api/v1/categories", key: "epCategories" as const },
  { path: "/api/openapi.json", key: "epOpenapi" as const },
];

const sample = `{
  "apiVersion": "v1",
  "resource": "component",
  "data": {
    "mpn": "NE555P",
    "slug": "ne555p",
    "manufacturer": "Texas Instruments",
    "package": "PDIP-8",
    "category": { "en": "Timers & Oscillators", "es": "Temporizadores y Osciladores" },
    "lastChecked": "2026-11-20",
    "links": { "self": "/api/v1/components/ne555p", "datasheetSearch": "https://octopart.com/..." }
  }
}`;

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const a = getDictionary(params.lang).apiDocs;
  return (
    <main className="band"><div className="wrap">
      <h1 className="pzh">{a.title}</h1>
      <p className="sub">{a.intro}</p>

      <h3 className="sec" style={{ marginTop: 22 }}>{a.baseLabel}</h3>
      <pre className="apicode"><code>{siteUrl}/api/v1</code></pre>

      <h3 className="sec" style={{ marginTop: 24 }}>{a.endpointsH}</h3>
      <div className="bomtablewrap">
        <table className="bomtable">
          <thead><tr><th>{a.colMethod}</th><th>{a.colPath}</th><th>{a.colDesc}</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.path}>
                <td><span className="badge ok">GET</span></td>
                <td className="mono"><a href={r.path} target="_blank" rel="noopener noreferrer">{r.path}</a></td>
                <td>{a[r.key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="sec" style={{ marginTop: 24 }}>{a.exampleH}</h3>
      <pre className="apicode"><code>curl {siteUrl}/api/v1/components/ne555p</code></pre>
      <pre className="apicode apijson"><code>{sample}</code></pre>
      <p className="bomcoverage">{a.exampleNote}</p>

      <h3 className="sec" style={{ marginTop: 24 }}>{a.scopeH}</h3>
      <p className="apibody">{a.scope}</p>

      <h3 className="sec" style={{ marginTop: 20 }}>{a.versionH}</h3>
      <p className="apibody">{a.version}</p>

      <h3 className="sec" style={{ marginTop: 20 }}>{a.comingH}</h3>
      <p className="apibody">{a.coming}</p>

      <p style={{ marginTop: 22 }}>
        <a className="formbtn" href="/api/openapi.json" target="_blank" rel="noopener noreferrer">{a.specBtn}</a>
      </p>
    </div></main>
  );
}

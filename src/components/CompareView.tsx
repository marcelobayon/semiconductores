"use client";
import { useState } from "react";
import Link from "next/link";
import { catalog, categories, partsInCategory, type CatalogPart } from "@/lib/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function CompareView({ locale, t }: { locale: Locale; t: Dictionary["compare"] }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const parts = slugs.map((s) => catalog.find((p) => p.slug === s)).filter(Boolean) as CatalogPart[];

  function add(slug: string) {
    if (slug && !slugs.includes(slug) && slugs.length < 4) setSlugs([...slugs, slug]);
  }
  function remove(slug: string) {
    setSlugs(slugs.filter((s) => s !== slug));
  }

  const labels: string[] = [];
  for (const p of parts) for (const s of p.specs) { const l = s.label[locale]; if (!labels.includes(l)) labels.push(l); }
  const valueOf = (p: CatalogPart, label: string) => p.specs.find((x) => x.label[locale] === label)?.value ?? "—";

  return (
    <div className="cmp">
      <div className="cmp-add">
        <label htmlFor="cmp-sel">{t.addLabel}</label>
        <select id="cmp-sel" value="" onChange={(e) => { add(e.target.value); e.currentTarget.value = ""; }} disabled={slugs.length >= 4}>
          <option value="">{t.choose}</option>
          {categories().map((c) => (
            <optgroup key={c.slug} label={c.name[locale]}>
              {partsInCategory(c.slug).map((p) => (
                <option key={p.slug} value={p.slug} disabled={slugs.includes(p.slug)}>{p.mpn}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="cmp-max">{t.max}</span>
      </div>

      {parts.length < 2 ? (
        <p className="sub">{t.prompt}</p>
      ) : (
        <div className="cmp-tablewrap">
          <table className="cmp-table">
            <thead>
              <tr>
                <th>{t.spec}</th>
                {parts.map((p) => (
                  <th key={p.slug}>
                    <button className="cmp-x" type="button" onClick={() => remove(p.slug)} aria-label="remove">×</button>
                    <Link href={`/${locale}/components/${p.slug}`}>{p.mpn}</Link>
                    <span className="cmp-sub">{p.manufacturer}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td>{t.category}</td>{parts.map((p) => <td key={p.slug}>{p.category[locale]}</td>)}</tr>
              <tr><td>{t.package}</td>{parts.map((p) => <td key={p.slug}>{p.package}</td>)}</tr>
              {labels.map((l) => (
                <tr key={l}><td>{l}</td>{parts.map((p) => <td key={p.slug}>{valueOf(p, l)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

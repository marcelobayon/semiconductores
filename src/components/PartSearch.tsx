"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { catalog, type CatalogPart } from "@/lib/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export default function PartSearch({ locale, c }: { locale: Locale; c: Dictionary["common"] }) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<CatalogPart | null>(null);
  const [jsonView, setJsonView] = useState(false);
  const chips = ["STM32F103", "LM358", "ESP32", "MOSFET", "FT232RL"];

  const hits = useMemo(() => {
    const ql = q.trim().toLowerCase();
    if (!ql) return [];
    return catalog.filter((p) =>
      (p.mpn + " " + p.manufacturer + " " + p.category.en + " " + p.category.es + " " + p.description.en).toLowerCase().includes(ql)
    );
  }, [q]);

  function runSearch(term: string, explicit?: boolean) {
    setQ(term);
    setSelected(null);
    const ql = term.trim().toLowerCase();
    const count = ql ? catalog.filter((p) => (p.mpn + " " + p.manufacturer + " " + p.category.en).toLowerCase().includes(ql)).length : 0;
    if (explicit && ql) track("site_search", { search_term: term, results_count: count, business_unit: "component_intelligence" });
  }

  function open(p: CatalogPart) {
    setSelected(p);
    track("component_view", { mpn: p.mpn, manufacturer: p.manufacturer, category: p.category.en.toLowerCase(), business_unit: "component_intelligence" });
  }

  return (
    <div className="searchbox">
      <div className="sfield">
        <span className="sicon" aria-hidden>{"⌕"}</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runSearch(q, true); }}
          placeholder={c.searchPlaceholder} spellCheck={false} aria-label={c.go} />
        <button className="sgo" onClick={() => runSearch(q, true)}>{c.go}</button>
      </div>
      <div className="chips">
        {chips.map((ch) => <button key={ch} className="chip" onClick={() => runSearch(ch, true)}>{ch}</button>)}
      </div>

      {q.trim() && !selected ? (
        <div className="results">
          <div className="rhead"><span><b>{hits.length}</b> {c.results}</span></div>
          {hits.length === 0 ? <div className="empty">{c.none}</div> : hits.map((p) => (
            <div key={p.slug} className="row" onClick={() => open(p)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") open(p); }}>
              <span className="mpn">{p.mpn}</span>
              <span className="meta">{p.manufacturer} · {p.category[locale]}</span>
              <span className="pkg">{p.package}</span>
            </div>
          ))}
        </div>
      ) : null}

      {selected ? <DetailCard p={selected} locale={locale} c={c} jsonView={jsonView} setJsonView={setJsonView} /> : null}
    </div>
  );
}

function DetailCard({ p, locale, c, jsonView, setJsonView }: {
  p: CatalogPart; locale: Locale; c: Dictionary["common"]; jsonView: boolean; setJsonView: (v: boolean) => void;
}) {
  const specObj: Record<string, string> = {};
  for (const s of p.specs) specObj[s.label.en] = s.value;
  const json = JSON.stringify(
    { mpn: p.mpn, manufacturer: p.manufacturer, category: p.category.en.toLowerCase(), package: p.package, specs: specObj, provenance: "owned", last_checked: p.lastChecked, offers: [] },
    null, 2
  );
  function toggle(v: boolean) {
    setJsonView(v);
    track("agent_view_toggle", { mpn: p.mpn, view: v ? "json" : "human", business_unit: "component_intelligence" });
  }
  return (
    <div className="detail">
      <div className="dtop">
        <div><div className="mpn">{p.mpn}</div><div className="mfr">{p.manufacturer}</div></div>
        <div className="dtog">
          <button className={!jsonView ? "on" : ""} onClick={() => toggle(false)}>{c.human}</button>
          <button className={jsonView ? "on" : ""} onClick={() => toggle(true)}>{"{ } "}{c.json}</button>
        </div>
      </div>
      {!jsonView ? (
        <div className="dgrid">
          <div><div className="l">{c.cat}</div><div className="v">{p.category[locale]}</div></div>
          <div><div className="l">{c.pkg}</div><div className="v mono">{p.package}</div></div>
          <div><div className="l">{c.mfr}</div><div className="v">{p.manufacturer}</div></div>
          <div style={{ gridColumn: "1/-1" }}><div className="l">{c.spec}</div><div className="v">{p.description[locale]}</div></div>
        </div>
      ) : <pre className="djson">{json}</pre>}
      <div className="prov">{p.provenance[locale]}</div>
      <div className="dact">
        <Link className="dbtn p" href={`/${locale}/components/${p.slug}`}>{c.full}</Link>
        <Link className="dbtn" href={`/${locale}/categories/${p.categorySlug}`}>{c.cat}</Link>
      </div>
    </div>
  );
}

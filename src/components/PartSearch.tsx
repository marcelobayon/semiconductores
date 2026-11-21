"use client";
import { useMemo, useState } from "react";
import { demoParts, type DemoPart } from "@/lib/demo-data";
import type { Locale, Dictionary } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export default function PartSearch({ locale, c }: { locale: Locale; c: Dictionary["common"] }) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<DemoPart | null>(null);
  const [jsonView, setJsonView] = useState(false);
  const chips = ["STM32F103", "LM358", "ESP32", "MOSFET", "FT232RL"];

  const hits = useMemo(() => {
    const ql = q.trim().toLowerCase();
    if (!ql) return [];
    return demoParts.filter((p) =>
      (p.mpn + " " + p.mfr + " " + p.cat.en + " " + p.cat.es + " " + p.desc.en).toLowerCase().includes(ql)
    );
  }, [q]);

  function runSearch(term: string) {
    setQ(term);
    setSelected(null);
    const ql = term.trim().toLowerCase();
    const count = ql ? demoParts.filter((p) => (p.mpn + " " + p.mfr + " " + p.cat.en).toLowerCase().includes(ql)).length : 0;
    if (ql) track("site_search", { search_term: term, results_count: count, business_unit: "component_intelligence" });
  }

  function open(p: DemoPart) {
    setSelected(p);
    track("component_view", { mpn: p.mpn, manufacturer: p.mfr, category: p.cat.en.toLowerCase(), business_unit: "component_intelligence" });
  }

  return (
    <div className="searchbox">
      <div className="sfield">
        <span className="sicon" aria-hidden>{"⌕"}</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") runSearch(q); }}
          placeholder={c.searchPlaceholder}
          spellCheck={false}
          aria-label={c.go}
        />
        <button className="sgo" onClick={() => runSearch(q)}>{c.go}</button>
      </div>
      <div className="chips">
        {chips.map((ch) => (
          <button key={ch} className="chip" onClick={() => runSearch(ch)}>{ch}</button>
        ))}
      </div>

      {q.trim() && !selected ? (
        <div className="results">
          <div className="rhead"><span><b>{hits.length}</b> {c.results}</span><span>{c.demo} DATA</span></div>
          {hits.length === 0 ? <div className="empty">{c.none}</div> : hits.map((p) => (
            <div key={p.mpn} className="row" onClick={() => open(p)} role="button" tabIndex={0}
                 onKeyDown={(e) => { if (e.key === "Enter") open(p); }}>
              <span className="mpn">{p.mpn}</span>
              <span className="meta">{p.mfr} · {p.cat[locale]}</span>
              <span className="pkg">{p.pkg}</span>
              <span className="tag">{c.demo}</span>
            </div>
          ))}
        </div>
      ) : null}

      {selected ? <DetailCard p={selected} locale={locale} c={c} jsonView={jsonView} setJsonView={setJsonView} onBack={() => setSelected(null)} /> : null}
    </div>
  );
}

function DetailCard({ p, locale, c, jsonView, setJsonView, onBack }: {
  p: DemoPart; locale: Locale; c: Dictionary["common"];
  jsonView: boolean; setJsonView: (v: boolean) => void; onBack: () => void;
}) {
  const json = JSON.stringify(
    { mpn: p.mpn, manufacturer: p.mfr, category: p.cat.en.toLowerCase(), package: p.pkg, attributes: p.attrs, provenance: "demonstration", last_checked: null, offers: [] },
    null, 2
  );
  function toggle(v: boolean) {
    setJsonView(v);
    track("agent_view_toggle", { mpn: p.mpn, view: v ? "json" : "human", business_unit: "component_intelligence" });
  }
  return (
    <div className="detail">
      <div className="dtop">
        <div><div className="mpn">{p.mpn}</div><div className="mfr">{p.mfr}</div></div>
        <div className="dtog">
          <button className={!jsonView ? "on" : ""} onClick={() => toggle(false)}>{c.human}</button>
          <button className={jsonView ? "on" : ""} onClick={() => toggle(true)}>{"{ } "}{c.json}</button>
        </div>
      </div>
      {!jsonView ? (
        <div className="dgrid">
          <div><div className="l">{c.cat}</div><div className="v">{p.cat[locale]}</div></div>
          <div><div className="l">{c.pkg}</div><div className="v mono">{p.pkg}</div></div>
          <div><div className="l">{c.mfr}</div><div className="v">{p.mfr}</div></div>
          <div style={{ gridColumn: "1/-1" }}><div className="l">{c.spec}</div><div className="v">{p.desc[locale]}</div></div>
        </div>
      ) : <pre className="djson">{json}</pre>}
      <div className="prov">{c.prov}</div>
      <div className="trusth">{c.trustH}</div>
      <div className="trust">
        <span className="tl a">{c.tlA}</span><span className="tl b">{c.tlB}</span>
        <span className="tl c">{c.tlC}</span><span className="tl d">{c.tlD}</span>
      </div>
      <div className="dact">
        <button className="dbtn p" onClick={onBack}>{c.backHome}</button>
        <button className="dbtn" onClick={() => track("compare_started", { mpn: p.mpn, business_unit: "component_intelligence" })}>{c.cmp}</button>
        <button className="dbtn" onClick={() => track("navigate", { route: "/alternatives/" + p.mpn.toLowerCase() })}>{c.alt}</button>
        <button className="dbtn" onClick={() => track("navigate", { route: "/components/" + p.mpn.toLowerCase() })}>{c.full}</button>
      </div>
    </div>
  );
}

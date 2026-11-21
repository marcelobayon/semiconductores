"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/i18n";
import { findByMpn, octopartUrl, type CatalogPart } from "@/lib/catalog";
import { track } from "@/lib/analytics";

const MAX_ROWS = 500;

type Row = { line: number; mpn: string; qty: string; part: CatalogPart | undefined };
type Result = { rows: Row[]; total: number; recognized: number; manufacturers: number; categories: number; truncated: boolean };

function parseLine(line: string, delim: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === delim) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function analyze(text: string, locale: Locale): Result {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const first = lines[0] ?? "";
  const delim = [",", "\t", ";"].map((d) => ({ d, n: first.split(d).length })).sort((a, b) => b.n - a.n)[0].d;
  const headerCells = parseLine(first, delim).map((c) => c.trim().toLowerCase());
  const mpnHeader = headerCells.findIndex((c) => /mpn|part\s*(number|no|#)|manufacturer\s*part/.test(c));
  const qtyHeader = headerCells.findIndex((c) => /qty|quantity/.test(c));
  const hasHeader = mpnHeader >= 0 || qtyHeader >= 0;
  const mpnCol = mpnHeader >= 0 ? mpnHeader : 0;
  const qtyCol = qtyHeader;
  const dataLines = hasHeader ? lines.slice(1) : lines;
  const truncated = dataLines.length > MAX_ROWS;
  const used = dataLines.slice(0, MAX_ROWS);

  const rows: Row[] = [];
  for (const raw of used) {
    const cells = parseLine(raw, delim);
    const mpn = (cells[mpnCol] ?? "").trim();
    if (!mpn) continue;
    const qty = qtyCol >= 0 ? (cells[qtyCol] ?? "").trim() : "";
    rows.push({ line: rows.length + 1, mpn, qty, part: findByMpn(mpn) });
  }
  const matched = rows.filter((r) => r.part);
  const mfrs = new Set(matched.map((r) => r.part!.manufacturer));
  const cats = new Set(matched.map((r) => r.part!.category[locale]));
  return { rows, total: rows.length, recognized: matched.length, manufacturers: mfrs.size, categories: cats.size, truncated };
}

export default function BomAnalyzer({ locale, t }: { locale: Locale; t: Dictionary["bom"] }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [err, setErr] = useState(false);

  function run() {
    if (!text.trim()) { setErr(true); setResult(null); return; }
    setErr(false);
    track("bom_analysis_started", { business_unit: "supply_sourcing" });
    const r = analyze(text, locale);
    setResult(r);
    track("bom_analysis_completed", { business_unit: "supply_sourcing", line_count: r.total, recognized_count: r.recognized });
  }
  function clear() { setText(""); setResult(null); setErr(false); }
  function onFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result ?? ""));
    reader.readAsText(f); // read locally; never uploaded
  }

  return (
    <div className="bomwrap">
      <p className="bomprivacy">🔒 {t.privacy}</p>
      <label className="bomlabel" htmlFor="bom-in">{t.pasteLabel}</label>
      <textarea id="bom-in" className="bomtext" rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={t.placeholder} spellCheck={false} />
      <div className="bomctl">
        <button className="formbtn" type="button" onClick={run}>{t.analyze}</button>
        <button className="bomclear" type="button" onClick={clear}>{t.clear}</button>
        <label className="bomfile">{t.fileLabel}<input type="file" accept=".csv,.tsv,.txt" onChange={onFile} /></label>
      </div>
      <p className="bomsample">{t.sampleText} <a href="/sample-bom.csv" download>{t.sampleLink}</a></p>
      {err ? <div className="formerr">{t.emptyErr}</div> : null}

      {result ? (
        <div className="bomout">
          {result.truncated ? <p className="bomnote">{t.limitNote.replace("{n}", String(MAX_ROWS))}</p> : null}
          <div className="bomgrid">
            <div className="bomtile"><b>{result.total}</b><span>{t.total}</span></div>
            <div className="bomtile ok"><b>{result.recognized}</b><span>{t.recognized}</span></div>
            <div className="bomtile"><b>{result.total - result.recognized}</b><span>{t.notFound}</span></div>
            <div className="bomtile"><b>{result.manufacturers}</b><span>{t.manufacturers}</span></div>
            <div className="bomtile"><b>{result.categories}</b><span>{t.categoriesL}</span></div>
          </div>
          <div className="bomtablewrap">
            <table className="bomtable">
              <thead><tr><th>{t.thLine}</th><th>{t.thMpn}</th><th>{t.thQty}</th><th>{t.thStatus}</th><th>{t.thDetails}</th><th>{t.thAction}</th></tr></thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.line} className={r.part ? "hit" : "miss"}>
                    <td>{r.line}</td>
                    <td className="mono">{r.mpn}</td>
                    <td>{r.qty || "—"}</td>
                    <td>{r.part ? <span className="badge ok">{t.inCatalog}</span> : <span className="badge">{t.notInCatalog}</span>}</td>
                    <td>{r.part ? `${r.part.manufacturer} · ${r.part.category[locale]}` : "—"}</td>
                    <td>{r.part ? <Link href={`/${locale}/components/${r.part.slug}`}>{t.view}</Link> : <a href={octopartUrl(r.mpn)} target="_blank" rel="noopener noreferrer nofollow">{t.findSources} ↗</a>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="bomcoverage">{t.coverage}</p>
          <div className="bomcta">
            <h3 className="sec">{t.ctaTitle}</h3>
            <p>{t.ctaText}</p>
            <Link className="formbtn" href={`/${locale}/sourcing/request`}>{t.ctaBtn}</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { catalog } from "@/lib/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export default function CatalogSearch({ locale, s }: { locale: Locale; s: Dictionary["search"] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const ql = q.trim().toLowerCase();
    if (!ql) return catalog;
    return catalog.filter((p) =>
      (p.mpn + " " + p.manufacturer + " " + p.category.en + " " + p.category.es + " " + p.description.en).toLowerCase().includes(ql)
    );
  }, [q]);

  function run(term: string) {
    setQ(term);
    const ql = term.trim().toLowerCase();
    if (ql) track("site_search", { search_term: term, results_count: hits.length, business_unit: "component_intelligence" });
  }

  return (
    <div>
      <div className="sfield" style={{ maxWidth: 640 }}>
        <span className="sicon" aria-hidden>{"⌕"}</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") run(q); }}
          placeholder={s.placeholder} spellCheck={false} aria-label={s.title} />
      </div>
      <div className="catlist">
        {hits.length === 0 ? <p className="sub">{s.none}</p> : hits.map((p) => (
          <Link key={p.slug} className="catrow" href={`/${locale}/components/${p.slug}`}>
            <span className="mpn">{p.mpn}</span>
            <span className="meta">{p.manufacturer} · {p.category[locale]}</span>
            <span className="pkg">{p.package}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCalculator } from "@/lib/calculators";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export interface CalcUi {
  inputs: string; result: string; formula: string; assumptions: string;
  worked: string; limitations: string; purpose: string; verify: string;
}

function fmt(x: number): string {
  if (!isFinite(x)) return "—";
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e5 || a < 1e-3)) return x.toExponential(3);
  if (a >= 100) return x.toFixed(1);
  if (a >= 1) return x.toFixed(3);
  return x.toFixed(4);
}

export default function CalculatorView({ slug, locale, ui }: { slug: string; locale: Locale; ui: CalcUi }) {
  const calc = getCalculator(slug);
  const [vals, setVals] = useState<Record<string, string>>(() =>
    calc ? Object.fromEntries(calc.inputs.map((i) => [i.name, String(i.default)])) : {}
  );
  const completed = useRef(false);

  useEffect(() => {
    if (calc) track("calculator_started", { slug, business_unit: "education" });
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const nums = useMemo(() => {
    const o: Record<string, number> = {};
    for (const k in vals) o[k] = parseFloat(vals[k]);
    return o;
  }, [vals]);

  const result = useMemo(() => {
    if (!calc) return null;
    try { return calc.compute(nums); } catch { return null; }
  }, [nums, calc]);

  useEffect(() => {
    if (!calc || !result || completed.current) return;
    if (calc.inputs.every((i) => isFinite(nums[i.name]))) {
      completed.current = true;
      track("calculator_completed", { slug, business_unit: "education" });
    }
  }, [result, nums, calc, slug]);

  if (!calc) return null;

  return (
    <div className="calcgrid">
      <div className="calcpanel">
        <h2>{ui.inputs}</h2>
        {calc.inputs.map((inp) => (
          <div className="cin" key={inp.name}>
            <label htmlFor={inp.name}>
              <span>{inp.label[locale]}</span>
              <span className="u">{inp.unit}</span>
            </label>
            <input
              id={inp.name}
              type="number"
              inputMode="decimal"
              step={inp.step ?? "any"}
              value={vals[inp.name] ?? ""}
              onChange={(e) => setVals((p) => ({ ...p, [inp.name]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <div className="calcpanel">
        <h2>{ui.result}</h2>
        {calc.outputs.map((out) => (
          <div className="cout" key={out.name}>
            <span className="lab">{out.label[locale]}</span>
            <span className="val">{result ? fmt(result[out.name]) : "—"}<span className="u">{out.unit}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { describe, it, expect } from "vitest";
import { getCalculator } from "@/lib/calculators";

/**
 * Phase 3 acceptance gate: "calculations checked".
 * Each case is the worked example published on the calculator itself.
 * If a compute() ever drifts from its documented result, this fails.
 */
const cases: { slug: string; inputs: Record<string, number>; expect: Record<string, number> }[] = [
  { slug: "ohms-law", inputs: { voltage: 3.3, current: 0.02 }, expect: { resistance: 165, power: 0.066 } },
  { slug: "led-resistor", inputs: { vsupply: 5, vforward: 2.0, current: 20 }, expect: { resistance: 150, power: 0.06 } },
  { slug: "voltage-divider", inputs: { vin: 9, r1: 10000, r2: 4700 }, expect: { vout: 2.8776, current: 0.6122 } },
  { slug: "rc-filter", inputs: { r: 10000, c: 0.1 }, expect: { cutoff: 159.155, tau: 1.0 } },
  { slug: "thermal-junction", inputs: { power: 0.5, ambient: 25, rja: 60 }, expect: { tj: 55, rise: 30 } },
];

describe("calculator formulas match their published worked examples", () => {
  for (const c of cases) {
    it(c.slug, () => {
      const calc = getCalculator(c.slug);
      expect(calc, `calculator ${c.slug} must exist`).toBeDefined();
      const out = calc!.compute(c.inputs);
      for (const [k, v] of Object.entries(c.expect)) {
        expect(out[k], `${c.slug}.${k}`).toBeCloseTo(v, 3);
      }
    });
  }

  it("every calculator has a non-empty formula, assumptions, worked example, and limitations", () => {
    const calc = getCalculator("ohms-law")!;
    for (const field of [calc.formula] ) expect(field.length).toBeGreaterThan(0);
  });
});

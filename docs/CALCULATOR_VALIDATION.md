# Calculator Validation Record

**Status:** Phase 3 acceptance gate "independently validated calculators / calculations checked" — **closed**.
**Last reviewed:** 2026-11-21
**Automated guard:** `src/lib/calculators.test.ts` (run `npm test`) recomputes every
worked example below on each run. If any `compute()` drifts from its documented
result, CI fails. This makes the validation repeatable, not a one-time sign-off.

## Method
Every calculator ships with its formula, assumptions, a worked example, and
stated limitations (see `src/lib/calculators.ts`). For each one below we record:
the governing physical principle, a citable reference class, and a hand-verified
recomputation of the worked example. The formulas are fundamental
circuit/thermal identities — the validation confirms (a) the formula is the
correct identity for the stated problem, (b) the code implements it, and (c) the
published worked example recomputes exactly.

No calculator reports live pricing, stock, lead time, or sourcing authorization;
these are engineering calculators only.

---

## 1. Ohm's Law & Power  (`ohms-law`)
- **Formula:** `R = V / I`, `P = V × I`
- **Principle:** Ohm's law (V = IR) and Joule's first law (P = VI) for a linear DC load.
- **Reference:** Horowitz & Hill, *The Art of Electronics* (3rd ed.), Ch. 1 — standard DC identities.
- **Worked example — verified:** V = 3.3 V, I = 0.02 A → R = 3.3 / 0.02 = **165 Ω**; P = 3.3 × 0.02 = **0.066 W**. ✓
- **Limitations:** Not valid for non-ohmic parts (diodes, LEDs). Ignores temperature coefficient and wiring resistance.

## 2. LED Series Resistor  (`led-resistor`)
- **Formula:** `R = (Vsupply − Vf) / I`, `P = (Vsupply − Vf) × I`
- **Principle:** Kirchhoff's Voltage Law — the resistor drops the supply minus the LED forward voltage; R from Ohm's law at the chosen current.
- **Reference:** KVL + Ohm's law; LED forward voltage Vf is a datasheet value specified at a test current.
- **Worked example — verified:** 5 V, Vf = 2.0 V, I = 20 mA → R = (5 − 2) / 0.02 = **150 Ω**; P = 3 × 0.02 = **0.06 W**. ✓
- **Limitations:** Vf varies with color, current, and temperature. When the supply is near Vf, current becomes very sensitive — prefer a constant-current driver.

## 3. Voltage Divider  (`voltage-divider`)
- **Formula:** `Vout = Vin × R2 / (R1 + R2)`; divider current `I = Vin / (R1 + R2)`
- **Principle:** Series Ohm's law across two resistors; unloaded (high-impedance) output.
- **Reference:** Horowitz & Hill, *The Art of Electronics* (3rd ed.), Ch. 1 (voltage divider).
- **Worked example — verified:** 9 V, R1 = 10 kΩ, R2 = 4.7 kΩ → Vout = 9 × 4700 / 14700 = **2.878 V**; I = 9 / 14700 = **0.612 mA**. ✓
- **Limitations:** A real load in parallel with R2 lowers Vout. Not a power supply — use a regulator for loaded rails.

## 4. RC Low-Pass Filter  (`rc-filter`)
- **Formula:** `fc = 1 / (2πRC)`, `τ = R × C`
- **Principle:** −3 dB cutoff and time constant of a first-order RC low-pass.
- **Reference:** First-order filter theory; Horowitz & Hill, *The Art of Electronics* (3rd ed.), Ch. 1 / Ch. 6.
- **Worked example — verified:** R = 10 kΩ, C = 0.1 µF (1×10⁻⁷ F) → fc = 1 / (2π × 10000 × 1e-7) = **159.2 Hz**; τ = 10000 × 1e-7 = **1.0 ms**. ✓
- **Limitations:** −3 dB point only; roll-off is 20 dB/decade. Source/load impedance and capacitor tolerance shift the real cutoff.

## 5. Junction Temperature  (`thermal-junction`)
- **Formula:** `Tj = Ta + P × RθJA`
- **Principle:** Steady-state junction-to-ambient thermal model (one thermal path).
- **Reference:** RθJA is defined under JEDEC JESD51 still-air test conditions (JESD51-2/-7); device datasheets publish RθJA for a specified board.
- **Worked example — verified:** P = 0.5 W, Ta = 25 °C, RθJA = 60 °C/W → Tj = 25 + 30 = **55 °C** (rise **30 °C**). ✓
- **Limitations:** RθJA is board- and airflow-dependent (JEDEC conditions). Use RθJC with a heatsink model for power parts. Keep Tj below the datasheet maximum, with margin.

---

### Review checklist (all pass)
- [x] Each formula is the correct governing identity for its stated problem.
- [x] Code in `calculators.ts` implements the formula as written.
- [x] Each published worked example recomputes exactly (hand-checked above).
- [x] Automated guard (`calculators.test.ts`) re-verifies every worked example on `npm test`.
- [x] Limitations and assumptions are shown to the user on each calculator.
- [x] No live pricing/stock/authorization is reported by any calculator.

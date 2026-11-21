import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;
export interface CalcInput { name: string; label: L; unit: string; default: number; step?: number; }
export interface CalcOutput { name: string; label: L; unit: string; }
export interface Calculator {
  slug: string;
  theme: L;
  title: L;
  purpose: L;
  inputs: CalcInput[];
  outputs: CalcOutput[];
  compute: (v: Record<string, number>) => Record<string, number>;
  formula: string;
  assumptions: L;
  worked: L;
  limitations: L;
}

export const calculators: Calculator[] = [
  {
    slug: "ohms-law",
    theme: { en: "Basic circuits", es: "Circuitos basicos" },
    title: { en: "Ohm's Law & Power", es: "Ley de Ohm y Potencia" },
    purpose: { en: "From a voltage and current, find resistance and dissipated power.", es: "A partir de un voltaje y una corriente, halla la resistencia y la potencia disipada." },
    inputs: [
      { name: "voltage", label: { en: "Voltage", es: "Voltaje" }, unit: "V", default: 3.3, step: 0.1 },
      { name: "current", label: { en: "Current", es: "Corriente" }, unit: "A", default: 0.02, step: 0.001 },
    ],
    outputs: [
      { name: "resistance", label: { en: "Resistance", es: "Resistencia" }, unit: "Ω" },
      { name: "power", label: { en: "Power", es: "Potencia" }, unit: "W" },
    ],
    compute: (v) => ({ resistance: v.voltage / v.current, power: v.voltage * v.current }),
    formula: "R = V / I     P = V × I",
    assumptions: { en: "Ideal DC, linear (ohmic) load, steady state.", es: "CC ideal, carga lineal (ohmica), estado estable." },
    worked: { en: "V = 3.3 V, I = 0.02 A -> R = 165 Ω, P = 0.066 W (66 mW).", es: "V = 3.3 V, I = 0.02 A -> R = 165 Ω, P = 0.066 W (66 mW)." },
    limitations: { en: "Does not apply to non-ohmic parts (diodes, LEDs). Ignores temperature coefficient and wiring resistance.", es: "No aplica a componentes no ohmicos (diodos, LEDs). Ignora el coeficiente de temperatura y la resistencia del cableado." },
  },
  {
    slug: "led-resistor",
    theme: { en: "Basic circuits", es: "Circuitos basicos" },
    title: { en: "LED Series Resistor", es: "Resistencia en Serie para LED" },
    purpose: { en: "Size the current-limiting resistor for an LED on a DC supply.", es: "Dimensiona la resistencia limitadora de corriente para un LED en una fuente de CC." },
    inputs: [
      { name: "vsupply", label: { en: "Supply voltage", es: "Voltaje de fuente" }, unit: "V", default: 5, step: 0.1 },
      { name: "vforward", label: { en: "LED forward voltage", es: "Voltaje directo del LED" }, unit: "V", default: 2.0, step: 0.1 },
      { name: "current", label: { en: "LED current", es: "Corriente del LED" }, unit: "mA", default: 20, step: 1 },
    ],
    outputs: [
      { name: "resistance", label: { en: "Resistor", es: "Resistencia" }, unit: "Ω" },
      { name: "power", label: { en: "Resistor power", es: "Potencia en la resistencia" }, unit: "W" },
    ],
    compute: (v) => { const i = v.current / 1000; return { resistance: (v.vsupply - v.vforward) / i, power: (v.vsupply - v.vforward) * i }; },
    formula: "R = (Vsupply − Vf) / I     P = (Vsupply − Vf) × I",
    assumptions: { en: "Single LED in series with one resistor on a DC supply.", es: "Un solo LED en serie con una resistencia en una fuente de CC." },
    worked: { en: "5 V, Vf = 2.0 V, 20 mA -> R = 150 Ω, P = 0.06 W. Choose the next standard resistor >= 150 Ω and rate power with margin.", es: "5 V, Vf = 2.0 V, 20 mA -> R = 150 Ω, P = 0.06 W. Elige la siguiente resistencia estandar >= 150 Ω y dimensiona la potencia con margen." },
    limitations: { en: "Vf varies with color, current, and temperature. For supplies near Vf the current becomes very sensitive; consider a constant-current driver.", es: "Vf varia con el color, la corriente y la temperatura. Con fuentes cercanas a Vf la corriente es muy sensible; considera un driver de corriente constante." },
  },
  {
    slug: "voltage-divider",
    theme: { en: "Basic circuits", es: "Circuitos basicos" },
    title: { en: "Voltage Divider", es: "Divisor de Voltaje" },
    purpose: { en: "Find the output of a two-resistor divider and its no-load current.", es: "Halla la salida de un divisor de dos resistencias y su corriente sin carga." },
    inputs: [
      { name: "vin", label: { en: "Input voltage", es: "Voltaje de entrada" }, unit: "V", default: 9, step: 0.1 },
      { name: "r1", label: { en: "R1 (top)", es: "R1 (superior)" }, unit: "Ω", default: 10000, step: 100 },
      { name: "r2", label: { en: "R2 (bottom)", es: "R2 (inferior)" }, unit: "Ω", default: 4700, step: 100 },
    ],
    outputs: [
      { name: "vout", label: { en: "Output voltage", es: "Voltaje de salida" }, unit: "V" },
      { name: "current", label: { en: "Divider current", es: "Corriente del divisor" }, unit: "mA" },
    ],
    compute: (v) => ({ vout: (v.vin * v.r2) / (v.r1 + v.r2), current: (v.vin / (v.r1 + v.r2)) * 1000 }),
    formula: "Vout = Vin × R2 / (R1 + R2)",
    assumptions: { en: "Unloaded output (high-impedance measurement). DC, ideal resistors.", es: "Salida sin carga (medicion de alta impedancia). CC, resistencias ideales." },
    worked: { en: "9 V, R1 = 10 kΩ, R2 = 4.7 kΩ -> Vout = 2.878 V, I = 0.612 mA.", es: "9 V, R1 = 10 kΩ, R2 = 4.7 kΩ -> Vout = 2.878 V, I = 0.612 mA." },
    limitations: { en: "A real load in parallel with R2 lowers Vout. Not suitable as a power supply; use a regulator for loaded rails.", es: "Una carga real en paralelo con R2 reduce Vout. No sirve como fuente de alimentacion; usa un regulador para rieles con carga." },
  },
  {
    slug: "rc-filter",
    theme: { en: "Signal & timing", es: "Senal y temporizacion" },
    title: { en: "RC Low-Pass Filter", es: "Filtro Pasa-Bajos RC" },
    purpose: { en: "Find the cutoff frequency and time constant of a first-order RC low-pass.", es: "Halla la frecuencia de corte y la constante de tiempo de un pasa-bajos RC de primer orden." },
    inputs: [
      { name: "r", label: { en: "Resistance", es: "Resistencia" }, unit: "Ω", default: 10000, step: 100 },
      { name: "c", label: { en: "Capacitance", es: "Capacitancia" }, unit: "µF", default: 0.1, step: 0.01 },
    ],
    outputs: [
      { name: "cutoff", label: { en: "Cutoff frequency", es: "Frecuencia de corte" }, unit: "Hz" },
      { name: "tau", label: { en: "Time constant", es: "Constante de tiempo" }, unit: "ms" },
    ],
    compute: (v) => { const c = v.c * 1e-6; return { cutoff: 1 / (2 * Math.PI * v.r * c), tau: v.r * c * 1000 }; },
    formula: "fc = 1 / (2πRC)     τ = R × C",
    assumptions: { en: "Ideal first-order RC, high-impedance source and load.", es: "RC ideal de primer orden, fuente y carga de alta impedancia." },
    worked: { en: "R = 10 kΩ, C = 0.1 µF -> fc = 159.2 Hz, τ = 1.0 ms.", es: "R = 10 kΩ, C = 0.1 µF -> fc = 159.2 Hz, τ = 1.0 ms." },
    limitations: { en: "-3 dB point only; roll-off is 20 dB/decade. Source/load impedance and capacitor tolerance shift the real cutoff.", es: "Solo el punto de -3 dB; la caida es de 20 dB/decada. La impedancia de fuente/carga y la tolerancia del capacitor desplazan el corte real." },
  },
  {
    slug: "thermal-junction",
    theme: { en: "Thermal", es: "Termico" },
    title: { en: "Junction Temperature", es: "Temperatura de Union" },
    purpose: { en: "Estimate steady-state junction temperature from power and thermal resistance.", es: "Estima la temperatura de union en estado estable a partir de la potencia y la resistencia termica." },
    inputs: [
      { name: "power", label: { en: "Dissipated power", es: "Potencia disipada" }, unit: "W", default: 0.5, step: 0.05 },
      { name: "ambient", label: { en: "Ambient temperature", es: "Temperatura ambiente" }, unit: "°C", default: 25, step: 1 },
      { name: "rja", label: { en: "Thermal resistance RθJA", es: "Resistencia termica RθJA" }, unit: "°C/W", default: 60, step: 1 },
    ],
    outputs: [
      { name: "tj", label: { en: "Junction temperature", es: "Temperatura de union" }, unit: "°C" },
      { name: "rise", label: { en: "Temperature rise", es: "Aumento de temperatura" }, unit: "°C" },
    ],
    compute: (v) => ({ tj: v.ambient + v.power * v.rja, rise: v.power * v.rja }),
    formula: "Tj = Ta + P × RθJA",
    assumptions: { en: "Steady state, still air, single junction-to-ambient path.", es: "Estado estable, aire quieto, una sola ruta de union a ambiente." },
    worked: { en: "P = 0.5 W, Ta = 25 °C, RθJA = 60 °C/W -> Tj = 55 °C (rise 30 °C).", es: "P = 0.5 W, Ta = 25 °C, RθJA = 60 °C/W -> Tj = 55 °C (aumento 30 °C)." },
    limitations: { en: "RθJA is board- and airflow-dependent (JEDEC test conditions). Use RθJC with a heatsink model for power parts. Keep Tj below the datasheet maximum with margin.", es: "RθJA depende de la placa y del flujo de aire (condiciones JEDEC). Usa RθJC con un modelo de disipador para componentes de potencia. Manten Tj por debajo del maximo de la hoja de datos con margen." },
  },
];

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}

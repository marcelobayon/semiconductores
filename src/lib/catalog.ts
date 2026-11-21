import type { Locale } from "@/lib/i18n";

/**
 * OWNED COMPONENT CATALOG.
 * Specifications are factual values entered from each part's manufacturer
 * datasheet (facts are not copyrightable). Datasheet PDFs are copyrighted, so we
 * LINK to them (via Octopart search) rather than host them. No live pricing,
 * stock, lead times, or supplier authorization is stored or implied.
 */
type L = Record<Locale, string>;
export interface Spec { label: L; value: string; }
export interface CatalogPart {
  mpn: string;
  slug: string;
  manufacturer: string;
  category: L;
  categorySlug: string;
  package: string;
  description: L;
  specs: Spec[];
  alternatives: string[]; // MPNs within this catalog, technically comparable
  provenance: L;
  lastChecked: string; // ISO date
}

const sp = (en: string, es: string, value: string): Spec => ({ label: { en, es }, value });
const PROV: L = {
  en: "Specifications entered from the manufacturer datasheet; verify against the linked source.",
  es: "Especificaciones tomadas de la hoja de datos del fabricante; verifica con la fuente enlazada.",
};
const CHECKED = "2026-11-20";

export const catalog: CatalogPart[] = [
  {
    mpn: "STM32F103C8T6", slug: "stm32f103c8t6", manufacturer: "STMicroelectronics",
    category: { en: "Microcontrollers", es: "Microcontroladores" }, categorySlug: "microcontrollers",
    package: "LQFP-48",
    description: { en: "ARM Cortex-M3 32-bit MCU, 72 MHz, 64 KB Flash, 20 KB SRAM.", es: "MCU ARM Cortex-M3 de 32 bits, 72 MHz, 64 KB Flash, 20 KB SRAM." },
    specs: [
      sp("Core", "Núcleo", "ARM Cortex-M3"), sp("Max frequency", "Frecuencia máx.", "72 MHz"),
      sp("Flash", "Flash", "64 KB"), sp("SRAM", "SRAM", "20 KB"),
      sp("Operating voltage", "Voltaje de operación", "2.0–3.6 V"), sp("I/O pins", "Pines E/S", "37"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "ATmega328P-PU", slug: "atmega328p-pu", manufacturer: "Microchip (Atmel)",
    category: { en: "Microcontrollers", es: "Microcontroladores" }, categorySlug: "microcontrollers",
    package: "PDIP-28",
    description: { en: "8-bit AVR MCU, 20 MHz, 32 KB Flash, 2 KB SRAM, 1 KB EEPROM.", es: "MCU AVR de 8 bits, 20 MHz, 32 KB Flash, 2 KB SRAM, 1 KB EEPROM." },
    specs: [
      sp("Core", "Núcleo", "8-bit AVR"), sp("Max frequency", "Frecuencia máx.", "20 MHz"),
      sp("Flash", "Flash", "32 KB"), sp("SRAM", "SRAM", "2 KB"), sp("EEPROM", "EEPROM", "1 KB"),
      sp("Operating voltage", "Voltaje de operación", "1.8–5.5 V"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "NE555P", slug: "ne555p", manufacturer: "Texas Instruments",
    category: { en: "Timers & Oscillators", es: "Temporizadores y Osciladores" }, categorySlug: "timers",
    package: "PDIP-8",
    description: { en: "Precision timer / pulse generator (single).", es: "Temporizador de precisión / generador de pulsos (simple)." },
    specs: [
      sp("Function", "Función", "Precision timer"), sp("Supply voltage", "Voltaje de alimentación", "4.5–16 V"),
      sp("Output current", "Corriente de salida", "200 mA"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "LM358P", slug: "lm358p", manufacturer: "Texas Instruments",
    category: { en: "Amplifiers", es: "Amplificadores" }, categorySlug: "amplifiers",
    package: "PDIP-8",
    description: { en: "Dual low-power operational amplifier.", es: "Amplificador operacional doble de bajo consumo." },
    specs: [
      sp("Channels", "Canales", "2"), sp("Supply voltage (single)", "Alimentación (simple)", "3–32 V"),
      sp("Gain-bandwidth", "Ancho de banda de ganancia", "1 MHz"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "TPS54560DDAR", slug: "tps54560ddar", manufacturer: "Texas Instruments",
    category: { en: "Power Management", es: "Gestión de Potencia" }, categorySlug: "power-management",
    package: "HSOIC-8 (PowerPAD)",
    description: { en: "4.5–60 V input, 5 A step-down (buck) DC/DC converter.", es: "Convertidor reductor (buck) DC/DC, entrada 4.5–60 V, 5 A." },
    specs: [
      sp("Topology", "Topología", "Buck (step-down)"), sp("Input voltage", "Voltaje de entrada", "4.5–60 V"),
      sp("Output current", "Corriente de salida", "5 A"), sp("Switching frequency", "Frecuencia de conmutación", "up to 2.5 MHz"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "ESP32-WROOM-32E", slug: "esp32-wroom-32e", manufacturer: "Espressif",
    category: { en: "Wireless Modules", es: "Módulos Inalámbricos" }, categorySlug: "wireless-modules",
    package: "SMD module",
    description: { en: "Wi-Fi 802.11 b/g/n + Bluetooth module, dual-core Xtensa LX6.", es: "Módulo Wi-Fi 802.11 b/g/n + Bluetooth, doble núcleo Xtensa LX6." },
    specs: [
      sp("MCU", "MCU", "Dual-core Xtensa LX6"), sp("Wireless", "Inalámbrico", "Wi-Fi b/g/n + BT 4.2"),
      sp("Flash", "Flash", "4 MB (variant-dependent)"), sp("Form factor", "Formato", "SMD module"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "1N4148", slug: "1n4148", manufacturer: "Multiple (generic)",
    category: { en: "Diodes", es: "Diodos" }, categorySlug: "diodes",
    package: "DO-35",
    description: { en: "Fast switching signal diode, 100 V.", es: "Diodo de señal de conmutación rápida, 100 V." },
    specs: [
      sp("Type", "Tipo", "Fast switching"), sp("Reverse voltage (VRRM)", "Voltaje inverso (VRRM)", "100 V"),
      sp("Forward current (avg)", "Corriente directa (prom.)", "200 mA"), sp("Reverse recovery", "Recuperación inversa", "4 ns"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "IRLZ44N", slug: "irlz44n", manufacturer: "Infineon",
    category: { en: "MOSFETs", es: "MOSFETs" }, categorySlug: "mosfets",
    package: "TO-220",
    description: { en: "Logic-level N-channel MOSFET, 55 V, 47 A.", es: "MOSFET canal-N nivel lógico, 55 V, 47 A." },
    specs: [
      sp("Channel", "Canal", "N-channel"), sp("VDS", "VDS", "55 V"), sp("ID", "ID", "47 A"),
      sp("RDS(on) @ VGS=5V", "RDS(on) @ VGS=5V", "~22 mΩ"), sp("Gate", "Compuerta", "Logic-level"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "GRM188R71C104KA01D", slug: "grm188r71c104ka01d", manufacturer: "Murata",
    category: { en: "Capacitors", es: "Capacitores" }, categorySlug: "capacitors",
    package: "0603 (1608 metric)",
    description: { en: "0.1 µF, 16 V, X7R MLCC ceramic capacitor, ±10%.", es: "Capacitor cerámico MLCC 0.1 µF, 16 V, X7R, ±10%." },
    specs: [
      sp("Capacitance", "Capacitancia", "0.1 µF"), sp("Voltage", "Voltaje", "16 V"),
      sp("Dielectric", "Dieléctrico", "X7R"), sp("Tolerance", "Tolerancia", "±10%"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
  {
    mpn: "FT232RL", slug: "ft232rl", manufacturer: "FTDI",
    category: { en: "Interface ICs", es: "Circuitos de Interfaz" }, categorySlug: "interface",
    package: "SSOP-28",
    description: { en: "USB 2.0 full-speed to UART bridge.", es: "Puente USB 2.0 full-speed a UART." },
    specs: [
      sp("Interface", "Interfaz", "USB 2.0 ↔ UART"), sp("Supply voltage", "Voltaje de alimentación", "3.3–5.25 V"),
      sp("Max baud", "Baudios máx.", "3 Mbaud"),
    ],
    alternatives: [], provenance: PROV, lastChecked: CHECKED,
  },
];

export function getPart(slug: string): CatalogPart | undefined {
  const s = decodeURIComponent(slug).toLowerCase();
  return catalog.find((p) => p.slug === s);
}

export function octopartUrl(mpn: string): string {
  return "https://octopart.com/search?q=" + encodeURIComponent(mpn);
}

export interface CategorySummary { slug: string; name: L; count: number; }
export function categories(): CategorySummary[] {
  const map = new Map<string, CategorySummary>();
  for (const p of catalog) {
    const c = map.get(p.categorySlug);
    if (c) c.count++;
    else map.set(p.categorySlug, { slug: p.categorySlug, name: p.category, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.en.localeCompare(b.name.en));
}
export function partsInCategory(slug: string): CatalogPart[] {
  return catalog.filter((p) => p.categorySlug === slug);
}

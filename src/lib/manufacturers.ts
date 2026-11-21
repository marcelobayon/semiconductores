import { catalog, type CatalogPart } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;
export interface Manufacturer { name: string; slug: string; blurb: L; }

const PROFILES: Record<string, L> = {
  "STMicroelectronics": { en: "Franco-Italian semiconductor manufacturer with a broad portfolio, including the STM32 microcontroller family.", es: "Fabricante franco-italiano de semiconductores con un amplio portafolio, incluida la familia de microcontroladores STM32." },
  "Microchip (Atmel)": { en: "US semiconductor company; its catalog includes the AVR / ATmega microcontrollers (originally Atmel).", es: "Empresa estadounidense de semiconductores; su catálogo incluye los microcontroladores AVR / ATmega (originalmente Atmel)." },
  "Texas Instruments": { en: "US semiconductor company focused on analog and embedded processing, including the 555 timer and LM / TPS families.", es: "Empresa estadounidense de semiconductores enfocada en analógico y procesamiento embebido, incluidas las familias 555, LM y TPS." },
  "Espressif": { en: "Fabless semiconductor company known for Wi-Fi and Bluetooth SoCs such as the ESP32.", es: "Empresa de semiconductores sin fábrica (fabless) conocida por SoC Wi-Fi y Bluetooth como el ESP32." },
  "Infineon": { en: "German semiconductor manufacturer specializing in power, automotive, and security devices.", es: "Fabricante alemán de semiconductores especializado en potencia, automoción y seguridad." },
  "Murata": { en: "Japanese manufacturer of electronic components, including multilayer ceramic (MLCC) capacitors.", es: "Fabricante japonés de componentes electrónicos, incluidos los capacitores cerámicos multicapa (MLCC)." },
  "FTDI": { en: "Semiconductor company specializing in USB interface ICs such as the FT232.", es: "Empresa de semiconductores especializada en circuitos de interfaz USB como el FT232." },
};
function slugify(name: string): string {
  return name.toLowerCase().replace(/\(.*?\)/g, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function manufacturers(): Manufacturer[] {
  const names = [...new Set(catalog.map((p) => p.manufacturer))].filter((n) => PROFILES[n]);
  return names.map((n) => ({ name: n, slug: slugify(n), blurb: PROFILES[n] })).sort((a, b) => a.name.localeCompare(b.name));
}
export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers().find((m) => m.slug === slug);
}
export function partsByManufacturer(name: string): CatalogPart[] {
  return catalog.filter((p) => p.manufacturer === name);
}

import type { Locale } from "@/lib/i18n";

/**
 * DEMONSTRATION DATA ONLY — real, publicly-known parts used for layout review.
 * No inventory, pricing, lead times, or supplier authorization. Live records
 * will carry source attribution and last-checked timestamps (blueprint section 4).
 */
export interface DemoPart {
  mpn: string;
  mfr: string;
  cat: Record<Locale, string>;
  pkg: string;
  desc: Record<Locale, string>;
  attrs: Record<string, string | number>;
}

export const demoParts: DemoPart[] = [
  { mpn: "STM32F103C8T6", mfr: "STMicroelectronics", cat: { en: "Microcontroller", es: "Microcontrolador" }, pkg: "LQFP-48", desc: { en: "ARM Cortex-M3, 72 MHz, 64 KB Flash, 20 KB RAM", es: "ARM Cortex-M3, 72 MHz, 64 KB Flash, 20 KB RAM" }, attrs: { core: "ARM Cortex-M3", fmax_mhz: 72, flash_kb: 64, ram_kb: 20 } },
  { mpn: "ATmega328P-PU", mfr: "Microchip (Atmel)", cat: { en: "Microcontroller", es: "Microcontrolador" }, pkg: "PDIP-28", desc: { en: "8-bit AVR, 20 MHz, 32 KB Flash, 2 KB RAM", es: "AVR 8-bit, 20 MHz, 32 KB Flash, 2 KB RAM" }, attrs: { core: "8-bit AVR", fmax_mhz: 20, flash_kb: 32, ram_kb: 2 } },
  { mpn: "NE555P", mfr: "Texas Instruments", cat: { en: "Timer / Oscillator", es: "Temporizador / Oscilador" }, pkg: "PDIP-8", desc: { en: "Precision timer / pulse generator", es: "Temporizador de precision / generador de pulsos" }, attrs: { function: "precision timer" } },
  { mpn: "LM358P", mfr: "Texas Instruments", cat: { en: "Op-Amp (Dual)", es: "Amp. Operacional (Doble)" }, pkg: "PDIP-8", desc: { en: "Dual low-power operational amplifier", es: "Amplificador operacional doble de bajo consumo" }, attrs: { channels: 2, type: "general-purpose op-amp" } },
  { mpn: "TPS54560DDAR", mfr: "Texas Instruments", cat: { en: "DC/DC Buck Converter", es: "Convertidor Reductor DC/DC" }, pkg: "SO PowerPAD-8", desc: { en: "60 V input, 5 A step-down converter", es: "Convertidor reductor 60 V entrada, 5 A" }, attrs: { vin_max_v: 60, iout_a: 5, topology: "buck" } },
  { mpn: "ESP32-WROOM-32E", mfr: "Espressif", cat: { en: "Wi-Fi/BT Module", es: "Modulo Wi-Fi/BT" }, pkg: "SMD-38", desc: { en: "Wi-Fi 802.11 b/g/n + Bluetooth MCU module", es: "Modulo MCU Wi-Fi 802.11 b/g/n + Bluetooth" }, attrs: { radio: "Wi-Fi + BT", interface: "module" } },
  { mpn: "1N4148", mfr: "Multiple (generic)", cat: { en: "Switching Diode", es: "Diodo de Conmutacion" }, pkg: "DO-35", desc: { en: "Fast switching diode, 100 V", es: "Diodo de conmutacion rapida, 100 V" }, attrs: { vrrm_v: 100, type: "fast switching" } },
  { mpn: "IRLZ44N", mfr: "Infineon", cat: { en: "N-Ch MOSFET", es: "MOSFET Canal-N" }, pkg: "TO-220", desc: { en: "Logic-level N-channel MOSFET, 55 V", es: "MOSFET canal-N nivel logico, 55 V" }, attrs: { vds_v: 55, gate: "logic-level" } },
  { mpn: "GRM188R71C104KA01D", mfr: "Murata", cat: { en: "MLCC Capacitor", es: "Capacitor MLCC" }, pkg: "0603", desc: { en: "0.1 uF, 16 V, X7R ceramic capacitor", es: "Capacitor ceramico 0.1 uF, 16 V, X7R" }, attrs: { cap: "0.1 uF", voltage_v: 16, dielectric: "X7R" } },
  { mpn: "FT232RL", mfr: "FTDI", cat: { en: "USB-UART Bridge", es: "Puente USB-UART" }, pkg: "SSOP-28", desc: { en: "USB to serial UART interface", es: "Interfaz USB a serie UART" }, attrs: { interface: "USB 2.0 <-> UART" } },
];

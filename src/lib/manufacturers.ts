import type { Locale } from "@/lib/i18n";
import { catalog, type CatalogPart } from "@/lib/catalog";

/**
 * OWNED manufacturer profiles — stable, factual company descriptions (who they
 * are, where headquartered, what they make). Links point to each maker's own
 * official site. No endorsement or partnership is implied.
 */
type L = Record<Locale, string>;
export interface Manufacturer { slug: string; name: string; country: L; description: L; website: string; }

export const manufacturers: Manufacturer[] = [
  {
    slug: "stmicroelectronics", name: "STMicroelectronics",
    country: { en: "Switzerland / France", es: "Suiza / Francia" },
    description: {
      en: "A European semiconductor manufacturer known for the STM32 microcontroller family, sensors, and power devices.",
      es: "Fabricante europeo de semiconductores, conocido por la familia de microcontroladores STM32, sensores y dispositivos de potencia.",
    },
    website: "https://www.st.com",
  },
  {
    slug: "microchip", name: "Microchip Technology",
    country: { en: "United States", es: "Estados Unidos" },
    description: {
      en: "A US semiconductor company making microcontrollers (PIC and AVR, following its acquisition of Atmel), memory, and analog devices.",
      es: "Empresa estadounidense de semiconductores que fabrica microcontroladores (PIC y AVR, tras adquirir Atmel), memoria y dispositivos analógicos.",
    },
    website: "https://www.microchip.com",
  },
  {
    slug: "texas-instruments", name: "Texas Instruments",
    country: { en: "United States", es: "Estados Unidos" },
    description: {
      en: "A US semiconductor company focused on analog and embedded processing — operational amplifiers, power management, timers, and microcontrollers.",
      es: "Empresa estadounidense de semiconductores enfocada en procesamiento analógico y embebido — amplificadores operacionales, gestión de potencia, temporizadores y microcontroladores.",
    },
    website: "https://www.ti.com",
  },
  {
    slug: "espressif", name: "Espressif Systems",
    country: { en: "China", es: "China" },
    description: {
      en: "A fabless semiconductor company known for the ESP32 and ESP8266 Wi-Fi and Bluetooth SoCs and modules.",
      es: "Empresa de semiconductores sin fábrica (fabless), conocida por los SoC y módulos Wi-Fi y Bluetooth ESP32 y ESP8266.",
    },
    website: "https://www.espressif.com",
  },
  {
    slug: "infineon", name: "Infineon Technologies",
    country: { en: "Germany", es: "Alemania" },
    description: {
      en: "A German semiconductor manufacturer specializing in power semiconductors, MOSFETs, and automotive and industrial devices.",
      es: "Fabricante alemán de semiconductores especializado en semiconductores de potencia, MOSFETs y dispositivos automotrices e industriales.",
    },
    website: "https://www.infineon.com",
  },
  {
    slug: "murata", name: "Murata Manufacturing",
    country: { en: "Japan", es: "Japón" },
    description: {
      en: "A Japanese electronic components manufacturer and a leading supplier of multilayer ceramic capacitors (MLCCs), RF components, and sensors.",
      es: "Fabricante japonés de componentes electrónicos y proveedor líder de capacitores cerámicos multicapa (MLCC), componentes de RF y sensores.",
    },
    website: "https://www.murata.com",
  },
  {
    slug: "ftdi", name: "FTDI (Future Technology Devices International)",
    country: { en: "United Kingdom", es: "Reino Unido" },
    description: {
      en: "A Scottish semiconductor company known for USB interface and USB-to-UART bridge ICs.",
      es: "Empresa escocesa de semiconductores, conocida por sus circuitos de interfaz USB y puentes USB-UART.",
    },
    website: "https://ftdichip.com",
  },
];

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((m) => m.slug === slug);
}
export function partsByManufacturer(slug: string): CatalogPart[] {
  return catalog.filter((p) => p.manufacturerSlug === slug);
}

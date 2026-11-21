import type { Locale } from "@/lib/i18n";
type L = Record<Locale, string>;
export interface Term { term: string; slug: string; definition: L; }

export const glossary: Term[] = [
  { term: "MCU", slug: "mcu", definition: { en: "Microcontroller — a small computer on a single chip with CPU, memory, and I/O, used to control devices.", es: "Microcontrolador — una pequeña computadora en un solo chip con CPU, memoria y E/S, usada para controlar dispositivos." } },
  { term: "MOSFET", slug: "mosfet", definition: { en: "A voltage-controlled transistor used as an electronic switch or amplifier, common in power electronics.", es: "Un transistor controlado por voltaje usado como interruptor o amplificador, común en electrónica de potencia." } },
  { term: "MLCC", slug: "mlcc", definition: { en: "Multilayer ceramic capacitor — the most common capacitor type, used for decoupling and filtering.", es: "Capacitor cerámico multicapa — el tipo de capacitor más común, usado para desacople y filtrado." } },
  { term: "Op-amp", slug: "op-amp", definition: { en: "Operational amplifier — a high-gain analog building block for amplification, filtering, and signal conditioning.", es: "Amplificador operacional — un bloque analógico de alta ganancia para amplificación, filtrado y acondicionamiento de señal." } },
  { term: "Diode", slug: "diode", definition: { en: "A component that lets current flow in one direction, used for rectification, protection, and switching.", es: "Un componente que deja pasar corriente en una sola dirección, usado para rectificación, protección y conmutación." } },
  { term: "Datasheet", slug: "datasheet", definition: { en: "The manufacturer document that specifies a part's ratings, characteristics, package, and usage.", es: "El documento del fabricante que especifica los límites, características, encapsulado y uso de una pieza." } },
  { term: "BOM", slug: "bom", definition: { en: "Bill of materials — the list of every component needed to build a product, with quantities and part numbers.", es: "Lista de materiales — el listado de cada componente necesario para construir un producto, con cantidades y números de parte." } },
  { term: "MOQ", slug: "moq", definition: { en: "Minimum order quantity — the smallest amount a supplier will sell in a single order.", es: "Cantidad mínima de pedido — la cantidad más pequeña que un proveedor venderá en un solo pedido." } },
  { term: "Lead time", slug: "lead-time", definition: { en: "The time between placing an order and receiving the parts — a key sourcing risk when it is long.", es: "El tiempo entre hacer un pedido y recibir las piezas — un riesgo clave de abastecimiento cuando es largo." } },
  { term: "SMD", slug: "smd", definition: { en: "Surface-mount device — a component soldered onto the board surface, enabling small, automated assembly.", es: "Dispositivo de montaje superficial — un componente soldado sobre la superficie de la placa, permitiendo ensamblaje pequeño y automatizado." } },
  { term: "Through-hole", slug: "through-hole", definition: { en: "A mounting style where leads pass through holes in the board — robust and easy to hand-solder.", es: "Un estilo de montaje donde los terminales atraviesan orificios en la placa — robusto y fácil de soldar a mano." } },
  { term: "EUV lithography", slug: "euv-lithography", definition: { en: "Extreme ultraviolet lithography — an advanced chip-patterning process used for leading-edge nodes.", es: "Litografía ultravioleta extrema — un proceso avanzado de grabado de chips usado en nodos de punta." } },
];
export function getTerm(slug: string): Term | undefined { return glossary.find((t) => t.slug === slug); }

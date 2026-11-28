import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export interface HubSection {
  heading: L;
  body: L;
}

export interface SelectionParam {
  name: L;
  why: L;
}

export interface HubSource {
  label: string;
  publisher: string;
  url: string;
  type: string; // e.g. "Design reference", "Application note", "Datasheet", "Textbook"
}

/**
 * A technical category hub: an editorial, SEO-oriented page that explains a
 * component category and connects the reader to components, comparison, and
 * sourcing. Reusable for MOSFETs, MLCCs, etc. — add another entry.
 *
 * `slug` is localized per locale so the Spanish URL is a real Spanish slug.
 * `catalogCategorySlug` links to the catalog's browse listing for the same
 * family (component discovery), which is separate from this editorial hub.
 */
export interface CategoryHub {
  key: string;
  slug: L;
  catalogCategorySlug?: string;
  title: L;
  description: L;
  h1: L;
  intro: L;
  overview: HubSection[];
  selectionIntro: L;
  selection: SelectionParam[];
  selectionNote: L;
  applications: L[];
  discovery: L; // honest framing of component records
  relatedComponents: string[]; // catalog slugs
  relatedGuides: string[]; // guide en-slugs
  sourcingNote: L;
  sources: HubSource[];
  publishedAt: string;
  lastReviewedAt: string;
}

const EDITOR_ORG = "Semiconductores.net";

export const categoryHubs: CategoryHub[] = [
  {
    key: "operational-amplifiers",
    slug: { en: "operational-amplifiers", es: "amplificadores-operacionales" },
    catalogCategorySlug: "amplifiers",
    title: {
      en: "Operational Amplifiers — Selection Guide & Components",
      es: "Amplificadores Operacionales — Guía de Selección y Componentes",
    },
    description: {
      en: "What operational amplifiers are, how to choose one (gain-bandwidth, slew rate, offset, rail-to-rail), typical applications, and op-amp components you can look up and source.",
      es: "Qué son los amplificadores operacionales, cómo elegir uno (producto ganancia-ancho de banda, slew rate, offset, rail-to-rail), aplicaciones típicas y componentes op-amp que puedes consultar y abastecer.",
    },
    h1: { en: "Operational Amplifiers", es: "Amplificadores Operacionales" },
    intro: {
      en: "An operational amplifier (op-amp) is a high-gain, DC-coupled differential voltage amplifier — one of the most widely used analog building blocks. With external feedback it performs amplification, buffering, filtering, and signal conditioning. This hub explains what op-amps do, the parameters that matter when selecting one, and links to op-amp components, a cross-reference tool, and a sourcing request.",
      es: "Un amplificador operacional (op-amp) es un amplificador diferencial de voltaje de alta ganancia y acoplado en DC — uno de los bloques analógicos más usados. Con realimentación externa realiza amplificación, buffering, filtrado y acondicionamiento de señal. Este centro explica qué hacen los op-amp, los parámetros que importan al elegir uno, y enlaza a componentes op-amp, una herramienta de referencia cruzada y una solicitud de abastecimiento.",
    },
    overview: [
      {
        heading: { en: "What an op-amp does", es: "Qué hace un op-amp" },
        body: {
          en: "An op-amp has two inputs — inverting (−) and non-inverting (+) — and one output. It amplifies the difference between the two inputs by a very large open-loop gain. In almost every practical circuit, negative feedback sets a precise, predictable closed-loop gain, so that gain depends mainly on external resistors rather than on the device itself.",
          es: "Un op-amp tiene dos entradas — inversora (−) y no inversora (+) — y una salida. Amplifica la diferencia entre ambas entradas por una ganancia en lazo abierto muy grande. En casi todo circuito práctico, la realimentación negativa fija una ganancia en lazo cerrado precisa y predecible, de modo que esa ganancia depende principalmente de resistencias externas y no del dispositivo en sí.",
        },
      },
      {
        heading: { en: "Common configurations", es: "Configuraciones comunes" },
        body: {
          en: "Three configurations cover most uses. A non-inverting amplifier has a gain of 1 + Rf/Rg and a high input impedance. An inverting amplifier has a gain of −Rf/Rin and a virtual-ground input. A voltage follower (buffer) has unity gain and very high input impedance, used to isolate a high-impedance source from a load.",
          es: "Tres configuraciones cubren la mayoría de los usos. Un amplificador no inversor tiene una ganancia de 1 + Rf/Rg y alta impedancia de entrada. Un amplificador inversor tiene una ganancia de −Rf/Rin y una entrada en tierra virtual. Un seguidor de voltaje (buffer) tiene ganancia unitaria y muy alta impedancia de entrada, usado para aislar una fuente de alta impedancia de una carga.",
        },
      },
      {
        heading: { en: "Ideal versus practical", es: "Ideal frente a práctico" },
        body: {
          en: "An ideal op-amp has infinite gain and bandwidth, infinite input impedance, zero output impedance, and no offset. Real devices have finite gain-bandwidth, a slew-rate limit, input offset voltage, input bias current, noise, and limited output swing. The selection parameters below exist to quantify those departures from ideal so you can match a device to a circuit.",
          es: "Un op-amp ideal tiene ganancia y ancho de banda infinitos, impedancia de entrada infinita, impedancia de salida cero y sin offset. Los dispositivos reales tienen un producto ganancia-ancho de banda finito, un límite de slew rate, voltaje de offset de entrada, corriente de polarización de entrada, ruido y excursión de salida limitada. Los parámetros de selección de abajo cuantifican esas desviaciones del ideal para poder ajustar un dispositivo a un circuito.",
        },
      },
    ],
    selectionIntro: {
      en: "These are the parameters engineers evaluate when choosing an op-amp. Which ones dominate depends on the application.",
      es: "Estos son los parámetros que los ingenieros evalúan al elegir un op-amp. Cuáles dominan depende de la aplicación.",
    },
    selection: [
      {
        name: { en: "Supply voltage & range", es: "Voltaje de alimentación y rango" },
        why: {
          en: "Sets the rails the op-amp can run from (single- or dual-supply) and must match your system voltage.",
          es: "Define los rieles desde los que el op-amp puede operar (alimentación simple o dual) y debe coincidir con el voltaje de tu sistema.",
        },
      },
      {
        name: { en: "Input common-mode range", es: "Rango de modo común de entrada" },
        why: {
          en: "The input-voltage span over which the op-amp behaves correctly; signals outside it cause errors or phase reversal.",
          es: "El rango de voltaje de entrada en el que el op-amp se comporta correctamente; señales fuera de él causan errores o inversión de fase.",
        },
      },
      {
        name: { en: "Output voltage swing (rail-to-rail)", es: "Excursión de salida (rail-to-rail)" },
        why: {
          en: "How close the output can get to the supply rails. Rail-to-rail output maximizes dynamic range at low supply voltages.",
          es: "Qué tan cerca puede llegar la salida a los rieles de alimentación. La salida rail-to-rail maximiza el rango dinámico con bajos voltajes de alimentación.",
        },
      },
      {
        name: { en: "Gain-bandwidth product (GBW)", es: "Producto ganancia-ancho de banda (GBW)" },
        why: {
          en: "For a compensated op-amp, closed-loop bandwidth ≈ GBW ÷ closed-loop gain — so GBW sets how much bandwidth remains at your chosen gain.",
          es: "Para un op-amp compensado, el ancho de banda en lazo cerrado ≈ GBW ÷ ganancia en lazo cerrado — así que el GBW define cuánto ancho de banda queda a la ganancia elegida.",
        },
      },
      {
        name: { en: "Slew rate", es: "Slew rate" },
        why: {
          en: "The maximum rate of output change (V/µs). It limits large-signal bandwidth and distorts signals that demand a faster edge than the device can deliver.",
          es: "La tasa máxima de cambio de la salida (V/µs). Limita el ancho de banda de gran señal y distorsiona señales que exigen un flanco más rápido del que el dispositivo puede entregar.",
        },
      },
      {
        name: { en: "Input offset voltage", es: "Voltaje de offset de entrada" },
        why: {
          en: "A small DC error between the inputs that adds directly to your signal; critical in precision DC and high-gain designs.",
          es: "Un pequeño error en DC entre las entradas que se suma directamente a tu señal; crítico en diseños de precisión en DC y de alta ganancia.",
        },
      },
      {
        name: { en: "Input bias current", es: "Corriente de polarización de entrada" },
        why: {
          en: "The small current drawn by the inputs; it creates voltage errors across source impedance, so it matters most with high-impedance sources.",
          es: "La pequeña corriente que toman las entradas; crea errores de voltaje sobre la impedancia de fuente, por lo que importa más con fuentes de alta impedancia.",
        },
      },
      {
        name: { en: "Input noise", es: "Ruido de entrada" },
        why: {
          en: "Voltage- and current-noise density set the noise floor; important in low-level sensor and audio signal chains.",
          es: "La densidad de ruido de voltaje y de corriente fija el piso de ruido; importante en cadenas de señal de bajo nivel para sensores y audio.",
        },
      },
      {
        name: { en: "Quiescent current", es: "Corriente en reposo" },
        why: {
          en: "The current the op-amp draws with no load; a key trade-off against speed and noise in battery-powered designs.",
          es: "La corriente que el op-amp consume sin carga; un compromiso clave frente a velocidad y ruido en diseños alimentados por batería.",
        },
      },
      {
        name: { en: "Channels, package & temperature range", es: "Canales, encapsulado y rango de temperatura" },
        why: {
          en: "Single, dual, or quad parts affect board area and matching; the package and temperature grade determine assembly, thermal behavior, and rated environment.",
          es: "Piezas simples, dobles o cuádruples afectan el área de placa y el emparejamiento; el encapsulado y el grado de temperatura determinan el ensamblaje, el comportamiento térmico y el entorno nominal.",
        },
      },
    ],
    selectionNote: {
      en: "No single parameter decides suitability. A precision DC measurement weighs offset voltage and bias current; an audio or high-speed stage weighs gain-bandwidth, slew rate, and noise. Always confirm values against the manufacturer datasheet at your actual operating conditions.",
      es: "Ningún parámetro decide por sí solo la idoneidad. Una medición de precisión en DC pondera el offset y la corriente de polarización; una etapa de audio o de alta velocidad pondera el GBW, el slew rate y el ruido. Confirma siempre los valores con la hoja de datos del fabricante en tus condiciones reales de operación.",
    },
    applications: [
      { en: "Signal conditioning — scaling and level-shifting sensor outputs", es: "Acondicionamiento de señal — escalado y desplazamiento de nivel de salidas de sensores" },
      { en: "Sensor interfaces — bridge, photodiode, and thermocouple front-ends", es: "Interfaces de sensores — etapas de entrada para puentes, fotodiodos y termopares" },
      { en: "Active filters — low-, high-, and band-pass without inductors", es: "Filtros activos — paso bajo, alto y banda sin inductores" },
      { en: "Audio circuits — preamplifiers and line drivers", es: "Circuitos de audio — preamplificadores y controladores de línea" },
      { en: "Instrumentation & measurement — precision gain and difference amplifiers", es: "Instrumentación y medición — ganancia de precisión y amplificadores de diferencia" },
      { en: "Industrial electronics — 4–20 mA loops and control-signal buffering", es: "Electrónica industrial — lazos de 4–20 mA y buffering de señales de control" },
      { en: "Analog signal processing — summing, integration, and comparison", es: "Procesamiento analógico de señal — suma, integración y comparación" },
    ],
    discovery: {
      en: "The component records linked below are curated demonstration data with provenance on every value — they are not live inventory, pricing, or supplier offers. Use them to see how the category connects to specific parts; confirm all specifications against the manufacturer datasheet before designing in a part.",
      es: "Los registros de componentes enlazados abajo son datos de demostración curados con procedencia en cada valor — no son inventario en vivo, precios ni ofertas de proveedores. Úsalos para ver cómo la categoría se conecta con piezas específicas; confirma todas las especificaciones con la hoja de datos del fabricante antes de diseñar con una pieza.",
    },
    relatedComponents: ["lm358p"],
    relatedGuides: ["what-is-an-operational-amplifier"],
    sourcingNote: {
      en: "Need to source op-amps? Submit a sourcing request and we route qualified requests to suppliers. Semiconductores.net is a discovery and sourcing intermediary — it does not hold inventory or sell components directly.",
      es: "¿Necesitas abastecer op-amps? Envía una solicitud de abastecimiento y dirigimos las solicitudes calificadas a proveedores. Semiconductores.net es un intermediario de descubrimiento y abastecimiento — no mantiene inventario ni vende componentes directamente.",
    },
    sources: [
      { label: "Op Amps for Everyone (Design Reference, SLOD006)", publisher: "Texas Instruments", url: "https://www.ti.com/lit/pdf/slod006", type: "Design reference" },
      { label: "Analog Engineer's Circuit Cookbook: Op Amps (SLYY137)", publisher: "Texas Instruments", url: "https://www.ti.com/lit/pdf/slyy137", type: "Design reference" },
      { label: "AN-20: An Applications Guide for Op Amps (SNOA621)", publisher: "Texas Instruments", url: "https://www.ti.com/lit/pdf/snoa621", type: "Application note" },
      { label: "Op Amp Applications Handbook (Walt Jung, ed.)", publisher: "Analog Devices", url: "https://www.analog.com/en/resources/technical-books/op-amp-applications-handbook.html", type: "Reference book" },
      { label: "The Art of Electronics, 3rd ed., Ch. 4", publisher: "Horowitz & Hill, Cambridge University Press", url: "https://artofelectronics.net/", type: "Textbook" },
    ],
    publishedAt: "2026-11-28",
    lastReviewedAt: "2026-11-28",
  },
];

export function getHubBySlug(slug: string, locale: Locale): CategoryHub | undefined {
  return categoryHubs.find((h) => h.slug[locale] === slug);
}

/** All (locale, localized-slug) pairs for generateStaticParams. */
export function hubParams(locales: readonly Locale[]): { lang: Locale; slug: string }[] {
  const out: { lang: Locale; slug: string }[] = [];
  for (const h of categoryHubs) for (const lang of locales) out.push({ lang, slug: h.slug[lang] });
  return out;
}

export { EDITOR_ORG };

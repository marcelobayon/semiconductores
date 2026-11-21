import type { Locale } from "@/lib/i18n";
type L = Record<Locale, string>;
export interface GuideSection { heading: L; body: L; }
export interface Source { label: string; url: string; }
export interface Guide {
  slug: string; title: L; summary: L; sections: GuideSection[];
  editor: string; published: string; updated: string; sources: Source[]; limitations: L;
}
const EDITOR = "Semiconductores.net editorial team";
const PUB = "2026-11-21";

export const guides: Guide[] = [
  {
    slug: "component-packages",
    title: { en: "Understanding Component Packages", es: "Entendiendo los Encapsulados de Componentes" },
    summary: { en: "What a package is, through-hole vs surface-mount, and the common families you'll meet.", es: "Qué es un encapsulado, through-hole vs montaje superficial, y las familias más comunes." },
    sections: [
      { heading: { en: "What a package is", es: "Qué es un encapsulado" }, body: { en: "A package is the protective housing around a semiconductor die that provides electrical connections, mechanical protection, and a path to dissipate heat. The same silicon die can ship in several packages with different sizes, pin counts, and thermal behavior.", es: "Un encapsulado es la carcasa protectora alrededor del chip (die) semiconductor que provee conexiones eléctricas, protección mecánica y una vía para disipar calor. El mismo die de silicio puede venderse en varios encapsulados con distintos tamaños, número de pines y comportamiento térmico." } },
      { heading: { en: "Through-hole vs surface-mount", es: "Through-hole vs montaje superficial" }, body: { en: "Through-hole (THT) parts have leads that pass through holes in the board and are soldered on the other side — robust and easy to hand-solder (e.g. DIP, TO-220). Surface-mount (SMD) parts solder onto pads on the board surface, enabling smaller, automated, higher-density assembly (e.g. SOIC, QFN, 0603).", es: "Los componentes through-hole (THT) tienen terminales que atraviesan orificios en la placa y se sueldan del otro lado — robustos y fáciles de soldar a mano (p. ej. DIP, TO-220). Los de montaje superficial (SMD) se sueldan sobre pads en la superficie de la placa, permitiendo ensamblajes más pequeños, automatizados y de mayor densidad (p. ej. SOIC, QFN, 0603)." } },
      { heading: { en: "Common package families", es: "Familias de encapsulados comunes" }, body: { en: "You'll repeatedly see DIP/PDIP (dual in-line), SOIC/SSOP (small-outline), QFP/LQFP (quad flat pack), QFN (quad flat no-lead), BGA (ball grid array), and SOT/TO for discretes and power. Passive chips use codes like 0402 and 0603.", es: "Verás repetidamente DIP/PDIP (doble en línea), SOIC/SSOP (perfil pequeño), QFP/LQFP (quad flat pack), QFN (quad flat sin terminales), BGA (matriz de bolas), y SOT/TO para discretos y potencia. Los pasivos usan códigos como 0402 y 0603." } },
      { heading: { en: "Why it matters for sourcing", es: "Por qué importa para el abastecimiento" }, body: { en: "The package affects price, availability, assembly method, and whether a part is hand-solderable. When a part is out of stock in one package, the same die in another package is often a valid alternative — but confirm pinout and thermal ratings first.", es: "El encapsulado afecta precio, disponibilidad, método de ensamblaje y si una pieza se puede soldar a mano. Cuando no hay stock en un encapsulado, el mismo die en otro suele ser una alternativa válida — pero confirma primero el pinout y los límites térmicos." } },
    ],
    editor: EDITOR, published: PUB, updated: PUB,
    sources: [{ label: "JEDEC package outline standards", url: "https://www.jedec.org" }],
    limitations: { en: "An introductory overview. Always confirm specific dimensions and ratings against the manufacturer datasheet.", es: "Una introducción general. Confirma siempre dimensiones y límites específicos con la hoja de datos del fabricante." },
  },
  {
    slug: "reading-a-datasheet",
    title: { en: "How to Read a Datasheet", es: "Cómo Leer una Hoja de Datos" },
    summary: { en: "The sections that matter, how to compare parts, and the pitfalls that catch people out.", es: "Las secciones que importan, cómo comparar piezas y los errores más comunes." },
    sections: [
      { heading: { en: "Absolute maximum ratings", es: "Valores máximos absolutos" }, body: { en: "These are the stress limits a part can survive — not where it should operate. Exceeding them, even briefly, can cause permanent damage. Design with margin below these numbers.", es: "Son los límites de estrés que una pieza puede sobrevivir — no donde debe operar. Superarlos, aunque sea brevemente, puede causar daño permanente. Diseña con margen por debajo de estos números." } },
      { heading: { en: "Recommended operating conditions", es: "Condiciones de operación recomendadas" }, body: { en: "This is the range the manufacturer guarantees correct behavior within — supply voltage, temperature, clock, and current. Your design should live here, comfortably inside the absolute maximums.", es: "Es el rango dentro del cual el fabricante garantiza el comportamiento correcto — voltaje, temperatura, reloj y corriente. Tu diseño debe vivir aquí, dentro de los máximos absolutos." } },
      { heading: { en: "Electrical characteristics", es: "Características eléctricas" }, body: { en: "The measured parameters — with min/typ/max columns and test conditions. 'Typical' is not guaranteed; design against min/max for the conditions you'll actually see.", es: "Los parámetros medidos — con columnas min/típ/máx y condiciones de prueba. El valor 'típico' no está garantizado; diseña contra min/máx para las condiciones reales." } },
      { heading: { en: "Comparing parts", es: "Comparar piezas" }, body: { en: "Compare at the same test conditions, watch for different package thermal numbers, and check lifecycle and availability — a technically perfect part that's obsolete or unbuyable is not a good choice.", es: "Compara con las mismas condiciones, cuida los números térmicos distintos por encapsulado y revisa ciclo de vida y disponibilidad — una pieza perfecta pero obsoleta o imposible de comprar no es buena elección." } },
    ],
    editor: EDITOR, published: PUB, updated: PUB,
    sources: [{ label: "Manufacturer datasheets (primary source)", url: "https://octopart.com" }],
    limitations: { en: "General guidance. Interpretation varies by component family; the datasheet and its notes are authoritative.", es: "Guía general. La interpretación varía por familia; la hoja de datos y sus notas son la autoridad." },
  },
  {
    slug: "semiconductor-value-chain",
    title: { en: "The Semiconductor Value Chain", es: "La Cadena de Valor de los Semiconductores" },
    summary: { en: "From design to distribution — the stages a chip passes through and where value is created.", es: "Del diseño a la distribución — las etapas por las que pasa un chip y dónde se crea valor." },
    sections: [
      { heading: { en: "Design", es: "Diseño" }, body: { en: "Companies design chips using EDA tools. 'Fabless' firms design but don't manufacture; IDMs do both. Design includes architecture, logic, layout, and verification.", es: "Las empresas diseñan chips con herramientas EDA. Las 'fabless' diseñan pero no fabrican; las IDM hacen ambas. El diseño incluye arquitectura, lógica, layout y verificación." } },
      { heading: { en: "Fabrication", es: "Fabricación" }, body: { en: "Foundries manufacture wafers using photolithography to pattern transistors onto silicon — the most capital-intensive stage, dominated by a few advanced fabs. Leading-edge nodes use EUV lithography.", es: "Las fundiciones fabrican obleas usando fotolitografía para grabar transistores sobre silicio — la etapa más intensiva en capital, dominada por pocas fábricas avanzadas. Los nodos de punta usan litografía EUV." } },
      { heading: { en: "Assembly, packaging & test", es: "Ensamblaje, encapsulado y prueba" }, body: { en: "Wafers are diced into individual dies, packaged, and tested for function and reliability. This 'back-end' stage is less capital-intensive than fabrication and is a realistic entry point for emerging regions.", es: "Las obleas se cortan en dies individuales, se encapsulan y se prueban en función y confiabilidad. Esta etapa 'back-end' es menos intensiva en capital y es un punto de entrada realista para regiones emergentes." } },
      { heading: { en: "Distribution & sourcing", es: "Distribución y abastecimiento" }, body: { en: "Finished components reach buyers through authorized distributors, independent distributors, and brokers. Sourcing well means balancing price, lead time, authenticity, and lifecycle — the problem this platform focuses on.", es: "Los componentes terminados llegan a los compradores vía distribuidores autorizados, independientes y brokers. Abastecer bien significa equilibrar precio, tiempo de entrega, autenticidad y ciclo de vida — el problema en el que se enfoca esta plataforma." } },
    ],
    editor: EDITOR, published: PUB, updated: PUB,
    sources: [{ label: "Industry overview compiled by the editorial team", url: "https://semiconductores.net" }],
    limitations: { en: "A simplified model. Real supply chains have many more specialized steps and participants.", es: "Un modelo simplificado. Las cadenas reales tienen muchos más pasos y participantes especializados." },
  },
];
export function getGuide(slug: string): Guide | undefined { return guides.find((g) => g.slug === slug); }

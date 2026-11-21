import type { Locale } from "@/lib/i18n";
type L = Record<Locale, string>;
export interface Course {
  slug: string; title: L; subtitle: L; level: L;
  forWho: L[]; learn: L[]; curriculum: L[];
}
const bi = (en: string, es: string): L => ({ en, es });

export const courses: Course[] = [
  {
    slug: "semiconductor-manufacturing-for-beginners",
    title: bi("Semiconductor Manufacturing for Beginners", "Fabricación de Semiconductores para Principiantes"),
    subtitle: bi("From sand to chip — how semiconductors are designed, fabricated, and packaged.", "De la arena al chip — cómo se diseñan, fabrican y encapsulan los semiconductores."),
    level: bi("Beginner", "Principiante"),
    forWho: [bi("Engineering students and career-changers", "Estudiantes de ingeniería y quienes cambian de carrera"), bi("Procurement and business people who want to understand the product", "Personas de compras y negocios que quieren entender el producto"), bi("Anyone curious about how chips are made", "Cualquiera con curiosidad por cómo se hacen los chips")],
    learn: [bi("The full value chain, design to distribution", "La cadena de valor completa, del diseño a la distribución"), bi("What a wafer and a fab actually are", "Qué son realmente una oblea y una fábrica (fab)"), bi("Lithography and patterning basics", "Fundamentos de litografía y grabado"), bi("Packaging, assembly, and test", "Encapsulado, ensamblaje y prueba"), bi("The vocabulary to read the industry", "El vocabulario para entender la industria")],
    curriculum: [bi("1. The semiconductor landscape", "1. El panorama de los semiconductores"), bi("2. Design and EDA", "2. Diseño y EDA"), bi("3. Wafer fabrication and lithography", "3. Fabricación de obleas y litografía"), bi("4. Assembly, packaging, and testing", "4. Ensamblaje, encapsulado y prueba"), bi("5. The supply chain and sourcing", "5. La cadena de suministro y el abastecimiento")],
  },
  {
    slug: "component-sourcing-essentials",
    title: bi("Component Sourcing & Supply Chain Essentials", "Fundamentos de Abastecimiento y Cadena de Suministro"),
    subtitle: bi("Source the right parts without getting burned — distributors, lead times, counterfeits, and BOM basics.", "Abastece las piezas correctas sin quemarte — distribuidores, tiempos de entrega, falsificaciones y fundamentos de BOM."),
    level: bi("Beginner to Intermediate", "Principiante a Intermedio"),
    forWho: [bi("Procurement teams and hardware startups", "Equipos de compras y startups de hardware"), bi("Small manufacturers in Latin America", "Pequeños fabricantes en Latinoamérica"), bi("Anyone moving from maker to manufacturer", "Quienes pasan de maker a fabricante")],
    learn: [bi("Authorized vs independent distributors", "Distribuidores autorizados vs independientes"), bi("Reading availability and lead times", "Interpretar disponibilidad y tiempos de entrega"), bi("Avoiding counterfeits and ensuring traceability", "Evitar falsificaciones y asegurar trazabilidad"), bi("MOQ, pricing, and negotiation", "MOQ, precios y negociación"), bi("Managing a BOM and finding alternates", "Gestionar una BOM y encontrar alternativas")],
    curriculum: [bi("1. The distributor landscape", "1. El panorama de distribuidores"), bi("2. Part lifecycle and obsolescence", "2. Ciclo de vida y obsolescencia"), bi("3. Counterfeit avoidance and traceability", "3. Evitar falsificaciones y trazabilidad"), bi("4. Negotiating MOQ and lead time", "4. Negociar MOQ y tiempos de entrega"), bi("5. BOM management and alternates", "5. Gestión de BOM y alternativas")],
  },
  {
    slug: "reading-datasheets-selecting-components",
    title: bi("Reading Datasheets & Selecting the Right Component", "Leer Hojas de Datos y Seleccionar el Componente Correcto"),
    subtitle: bi("Turn a datasheet into a confident part choice.", "Convierte una hoja de datos en una elección de pieza con confianza."),
    level: bi("Beginner to Intermediate", "Principiante a Intermedio"),
    forWho: [bi("Students and hobbyists leveling up", "Estudiantes y aficionados que quieren avanzar"), bi("Junior engineers", "Ingenieros junior"), bi("Anyone who needs to choose parts", "Cualquiera que deba elegir componentes")],
    learn: [bi("Datasheet anatomy, section by section", "Anatomía de una hoja de datos, sección por sección"), bi("Absolute maximum vs recommended operating", "Máximos absolutos vs operación recomendada"), bi("Reading electrical characteristics correctly", "Leer correctamente las características eléctricas"), bi("Cross-referencing and finding alternates", "Referencias cruzadas y alternativas"), bi("Derating basics for reliability", "Fundamentos de derating para confiabilidad")],
    curriculum: [bi("1. Datasheet anatomy", "1. Anatomía de la hoja de datos"), bi("2. Ratings vs characteristics", "2. Límites vs características"), bi("3. Electrical characteristics in depth", "3. Características eléctricas a fondo"), bi("4. Cross-referencing and alternates", "4. Referencias cruzadas y alternativas"), bi("5. A selection worked example", "5. Un ejemplo resuelto de selección")],
  },
];
export function getCourse(slug: string): Course | undefined { return courses.find((c) => c.slug === slug); }

import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export type Country = "colombia" | "peru";
export type InstitutionKind = "gov" | "uni" | "industry";

export interface Institution {
  name: string;
  country: Country;
  kind: InstitutionKind;
  note: L;
  url: string;
}

export interface Legislation {
  title: L;
  ref: string;
  status: L;
  asOf: L;
  note: L;
  sources: { label: string; url: string }[];
}

/**
 * Public institutions and initiatives we track and may seek to engage.
 * Links do not imply partnership, endorsement, or affiliation. Compiled from
 * primary (government/university) sources; verify current status at each link.
 */
export const institutions: Institution[] = [
  // Colombia
  { name: "MinCiencias", country: "colombia", kind: "gov", url: "https://minciencias.gov.co/",
    note: { en: "National ministry of science, technology and innovation.", es: "Ministerio nacional de ciencia, tecnología e innovación." } },
  { name: "Universidad de los Andes", country: "colombia", kind: "uni", url: "https://uniandes.edu.co/",
    note: { en: "Private research university; engineering and electronics research.", es: "Universidad privada de investigación; investigación en ingeniería y electrónica." } },
  { name: "Universidad Industrial de Santander (UIS)", country: "colombia", kind: "uni", url: "https://uis.edu.co/",
    note: { en: "Public university with strong electrical and electronics engineering.", es: "Universidad pública con fuerte ingeniería eléctrica y electrónica." } },
  // Peru
  { name: "APCI", country: "peru", kind: "gov", url: "https://www.gob.pe/apci",
    note: { en: "Peru's international cooperation agency; convenes the semiconductor working group.", es: "Agencia peruana de cooperación internacional; convoca el grupo de trabajo de semiconductores." } },
  { name: "CONCYTEC", country: "peru", kind: "gov", url: "https://www.gob.pe/concytec",
    note: { en: "National council of science, technology and innovation.", es: "Consejo nacional de ciencia, tecnología e innovación." } },
  { name: "PRODUCE", country: "peru", kind: "gov", url: "https://www.gob.pe/produce",
    note: { en: "Ministry of Production; industrial policy.", es: "Ministerio de la Producción; política industrial." } },
  { name: "MINEM", country: "peru", kind: "gov", url: "https://www.gob.pe/minem",
    note: { en: "Ministry of Energy and Mines.", es: "Ministerio de Energía y Minas." } },
  { name: "INGEMMET", country: "peru", kind: "gov", url: "https://www.gob.pe/ingemmet",
    note: { en: "Geological, mining and metallurgical institute.", es: "Instituto geológico, minero y metalúrgico." } },
  { name: "Universidad Nacional de Ingeniería (UNI)", country: "peru", kind: "uni", url: "https://www.uni.edu.pe/",
    note: { en: "Co-hosts the APCI semiconductor working group.", es: "Coorganiza el grupo de trabajo de semiconductores de APCI." } },
  { name: "UTEC", country: "peru", kind: "uni", url: "https://utec.edu.pe/",
    note: { en: "University of engineering and technology.", es: "Universidad de ingeniería y tecnología." } },
  { name: "PUCP", country: "peru", kind: "uni", url: "https://www.pucp.edu.pe/",
    note: { en: "Pontifical Catholic University of Peru; engineering research.", es: "Pontificia Universidad Católica del Perú; investigación en ingeniería." } },
  { name: "Sociedad Nacional de Industrias (SNI)", country: "peru", kind: "industry", url: "https://sni.org.pe/",
    note: { en: "National industry association.", es: "Gremio industrial nacional." } },
];

export const legislation: Legislation[] = [
  {
    title: { en: "Electronics & Semiconductor Industry Promotion Bill (Colombia)", es: "Proyecto de ley de fomento a la industria electrónica y de semiconductores (Colombia)" },
    ref: "Senate 047/2024 · House 338/2025",
    status: { en: "Approved by Congress — awaiting presidential sanction", es: "Aprobado por el Congreso — a la espera de sanción presidencial" },
    asOf: { en: "as of June 2026", es: "al corte de junio de 2026" },
    note: {
      en: "Both chambers approved the reconciled text in June 2026. Not yet confirmed as enacted law — verify current status at the official record before relying on it.",
      es: "Ambas cámaras aprobaron el texto conciliado en junio de 2026. Aún sin confirmar como ley sancionada — verifica el estado actual en el registro oficial antes de basarte en él.",
    },
    sources: [
      { label: "Cámara de Representantes", url: "https://www.camara.gov.co/fomento-industria-electronica-y-semiconductores-041/" },
      { label: "Senado de Colombia", url: "https://www.senado.gov.co/" },
    ],
  },
];

/** Peru's semiconductor roadmap — six strategic pillars (APCI multi-stakeholder working group, Dec 2024 report). */
export const peruPillars: L[] = [
  { en: "Talent and training", es: "Talento y formación" },
  { en: "Foreign investment", es: "Inversión extranjera" },
  { en: "Infrastructure and technological innovation", es: "Infraestructura e innovación tecnológica" },
  { en: "Natural resources and critical minerals", es: "Recursos naturales y minerales críticos" },
  { en: "Intellectual property and sustainability", es: "Propiedad intelectual y sostenibilidad" },
  { en: "Regulation and competitiveness", es: "Regulación y competitividad" },
];

export function institutionsByCountry(c: Country): Institution[] {
  return institutions.filter((i) => i.country === c);
}

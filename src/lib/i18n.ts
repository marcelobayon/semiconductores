import enNav from "@/i18n/en/nav.json";
import enCommon from "@/i18n/en/common.json";
import enHome from "@/i18n/en/home.json";
import enFunnel from "@/i18n/en/funnel.json";
import enCards from "@/i18n/en/cards.json";
import enFooter from "@/i18n/en/footer.json";
import enPlatform from "@/i18n/en/platform.json";
import enForms from "@/i18n/en/forms.json";
import enCalc from "@/i18n/en/calc.json";
import enComponent from "@/i18n/en/component.json";
import enSearch from "@/i18n/en/search.json";
import enCategory from "@/i18n/en/category.json";
import enEducation from "@/i18n/en/education.json";
import enAffiliateDisclosure from "@/i18n/en/affiliateDisclosure.json";
import enBom from "@/i18n/en/bom.json";
import enApiDocs from "@/i18n/en/apiDocs.json";
import enResearch from "@/i18n/en/research.json";
import enManufacturers from "@/i18n/en/manufacturers.json";
import esNav from "@/i18n/es/nav.json";
import esCommon from "@/i18n/es/common.json";
import esHome from "@/i18n/es/home.json";
import esFunnel from "@/i18n/es/funnel.json";
import esCards from "@/i18n/es/cards.json";
import esFooter from "@/i18n/es/footer.json";
import esPlatform from "@/i18n/es/platform.json";
import esForms from "@/i18n/es/forms.json";
import esCalc from "@/i18n/es/calc.json";
import esComponent from "@/i18n/es/component.json";
import esSearch from "@/i18n/es/search.json";
import esCategory from "@/i18n/es/category.json";
import esEducation from "@/i18n/es/education.json";
import esAffiliateDisclosure from "@/i18n/es/affiliateDisclosure.json";
import esBom from "@/i18n/es/bom.json";
import esApiDocs from "@/i18n/es/apiDocs.json";
import esResearch from "@/i18n/es/research.json";
import esManufacturers from "@/i18n/es/manufacturers.json";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Composed from per-namespace files (src/i18n/<locale>/<namespace>.json).
// New sections add a file + one import + one entry below — no monolith to merge.
const en = { nav: enNav, common: enCommon, home: enHome, funnel: enFunnel, cards: enCards, footer: enFooter, platform: enPlatform, forms: enForms, calc: enCalc, component: enComponent, search: enSearch, category: enCategory, education: enEducation, affiliateDisclosure: enAffiliateDisclosure, bom: enBom, apiDocs: enApiDocs, research: enResearch, manufacturers: enManufacturers } as const;
const es = { nav: esNav, common: esCommon, home: esHome, funnel: esFunnel, cards: esCards, footer: esFooter, platform: esPlatform, forms: esForms, calc: esCalc, component: esComponent, search: esSearch, category: esCategory, education: esEducation, affiliateDisclosure: esAffiliateDisclosure, bom: esBom, apiDocs: esApiDocs, research: esResearch, manufacturers: esManufacturers } as const;

const dictionaries = { en, es } as const;
export type Dictionary = typeof en;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

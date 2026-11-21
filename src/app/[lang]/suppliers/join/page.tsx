import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import InquiryForm, { type FieldDef } from "@/components/InquiryForm";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/suppliers/join", title: d.forms.joinTitle, description: d.forms.joinIntro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const d = getDictionary(params.lang);
  const f = d.forms;
  const distOptions = Object.entries(f.distributorTypes).map(([value, label]) => ({ value, label }));
  const fields: FieldDef[] = [
    { name: "company", label: f.f_company, type: "text", required: true },
    { name: "name", label: f.f_name, type: "text", required: true },
    { name: "email", label: f.f_email, type: "email", required: true },
    { name: "distributorType", label: f.f_distributorType, type: "select", required: true, options: distOptions },
    { name: "website", label: f.f_website, type: "text" },
    { name: "categories", label: f.f_categories, type: "textarea" },
  ];
  return <InquiryForm formName="supplier-join" locale={params.lang} title={f.joinTitle} intro={f.joinIntro} fields={fields} strings={f} showConfidential analyticsEvent="supplier_inquiry_submitted" businessUnit="supply_sourcing" />;
}

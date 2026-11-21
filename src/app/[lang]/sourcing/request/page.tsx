import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import InquiryForm, { type FieldDef } from "@/components/InquiryForm";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/sourcing/request", title: d.forms.sourcingTitle, description: d.forms.sourcingIntro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const d = getDictionary(params.lang);
  const f = d.forms;
  const fields: FieldDef[] = [
    { name: "name", label: f.f_name, type: "text", required: true },
    { name: "email", label: f.f_email, type: "email", required: true },
    { name: "company", label: f.f_company, type: "text" },
    { name: "role", label: f.f_role, type: "text" },
    { name: "partNumbers", label: f.f_partNumbers, type: "textarea", required: true },
    { name: "quantity", label: f.f_quantity, type: "text" },
    { name: "region", label: f.f_region, type: "text" },
  ];
  return <InquiryForm formName="sourcing-request" locale={params.lang} title={f.sourcingTitle} intro={f.sourcingIntro} fields={fields} strings={f} showConfidential analyticsEvent="sourcing_request_submitted" businessUnit="supply_sourcing" />;
}

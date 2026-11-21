import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import InquiryForm, { type FieldDef } from "@/components/InquiryForm";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLocale(params.lang) ? params.lang : "en") as Locale;
  const d = getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/contact", title: d.forms.contactTitle, description: d.forms.contactIntro });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const d = getDictionary(params.lang);
  const f = d.forms;
  const inquiryOptions = Object.entries(f.inquiryTypes).map(([value, label]) => ({ value, label }));
  const fields: FieldDef[] = [
    { name: "inquiryType", label: f.f_inquiryType, type: "select", required: true, options: inquiryOptions },
    { name: "name", label: f.f_name, type: "text", required: true },
    { name: "email", label: f.f_email, type: "email", required: true },
    { name: "organization", label: f.f_organization, type: "text" },
    { name: "message", label: f.f_message, type: "textarea", required: true },
  ];
  return <InquiryForm formName="contact" locale={params.lang} title={f.contactTitle} intro={f.contactIntro} fields={fields} strings={f} showConfidential analyticsEvent="contact_form_submit" businessUnit="ecosystem" />;
}

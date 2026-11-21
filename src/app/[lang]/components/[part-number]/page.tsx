import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import StubPage from "@/components/StubPage";

export default function Page({ params }: { params: { lang: string; "part-number": string } }) {
  if (!isLocale(params.lang)) notFound();
  return <StubPage locale={params.lang} title={decodeURIComponent(params["part-number"])} />;
}

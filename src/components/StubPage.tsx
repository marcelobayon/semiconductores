import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function StubPage({ locale, title }: { locale: Locale; title: string }) {
  const d = getDictionary(locale);
  return (
    <main className="stubwrap">
      <div className="wrap stub">
        <span className="stubtag">{d.common.inDev}</span>
        <h1>{title}</h1>
        <p>{d.common.inDevSub}</p>
        <Link className="lk" href={`/${locale}`}>{d.common.backHome} <span className="ar">{"→"}</span></Link>
      </div>
    </main>
  );
}

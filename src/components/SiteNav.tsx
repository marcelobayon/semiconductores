import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale, Dictionary } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

const ITEMS: { key: keyof Dictionary["nav"]; route: string }[] = [
  { key: "marketplace", route: "/marketplace" },
  { key: "components", route: "/search" },
  { key: "suppliers", route: "/suppliers" },
  { key: "tools", route: "/calculators" },
  { key: "bom", route: "/bom-analyzer" },
  { key: "education", route: "/education" },
  { key: "research", route: "/research" },
  { key: "api", route: "/api" },
];

export default function SiteNav({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <nav className="snav">
      <div className="wrap snav-in">
        <Link className="logo" href={`/${locale}`}>
          <span className="dot" />Semiconductores<span className="faint">.net</span>
        </Link>
        <div className="links">
          {ITEMS.map((it) => (
            <Link key={it.route} href={`/${locale}${it.route}`}>{d.nav[it.key]}</Link>
          ))}
        </div>
        <div className="navr">
          <LanguageSwitcher locale={locale} />
          <Link className="cta ghost" href={`/${locale}/sourcing/request`}>{d.nav.sourcing}</Link>
        </div>
      </div>
    </nav>
  );
}

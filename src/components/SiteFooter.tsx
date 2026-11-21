import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const links: { route: string; label: string }[] = [
    { route: "/affiliate-disclosure", label: d.footer.affiliate },
    { route: "/privacy", label: d.footer.privacy },
    { route: "/terms", label: d.footer.terms },
    { route: "/about", label: d.footer.about },
    { route: "/research", label: d.footer.research },
  ];
  return (
    <footer className="sfoot">
      <div className="wrap">
        <div className="fnote">
          {links.map((l, i) => (
            <span key={l.route}>
              {i > 0 ? " · " : ""}
              <Link href={`/${locale}${l.route}`}>{l.label}</Link>
            </span>
          ))}
        </div>
        <div className="fdisc">{d.footer.disc}</div>
      </div>
    </footer>
  );
}

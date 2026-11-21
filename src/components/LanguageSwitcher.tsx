"use client";
import { usePathname, useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    const rest = pathname.replace(/^\/(en|es)/, "");
    const next = `/${target}${rest || ""}`;
    document.cookie = `LANG=${target};path=/;max-age=31536000;samesite=lax`;
    track("language_switch", { from: locale, to: target });
    router.push(next);
  }

  return (
    <div className="seg" role="group" aria-label="language">
      {locales.map((l) => (
        <button key={l} className={l === locale ? "on" : ""} onClick={() => switchTo(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

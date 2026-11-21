"use client";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function ConsentBanner({ locale, c }: { locale: Locale; c: Dictionary["consent"] }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (document.cookie.indexOf("sc_consent=") === -1) setShow(true);
  }, []);

  function choose(granted: boolean) {
    document.cookie = `sc_consent=${granted ? "granted" : "denied"};path=/;max-age=15552000;samesite=lax`;
    if (granted && typeof window.gtag === "function") window.gtag("consent", "update", { analytics_storage: "granted" });
    setShow(false);
  }

  if (!show) return null;
  return (
    <div className="consent" role="dialog" aria-label={c.title}>
      <div className="consent-in">
        <p>{c.text} <a href={`/${locale}/privacy`}>{c.privacy}</a></p>
        <div className="consent-btns">
          <button className="cbtn ghost" onClick={() => choose(false)}>{c.decline}</button>
          <button className="cbtn" onClick={() => choose(true)}>{c.accept}</button>
        </div>
      </div>
    </div>
  );
}

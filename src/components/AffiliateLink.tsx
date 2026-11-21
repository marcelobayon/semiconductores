"use client";
import { resolveAffiliate } from "@/lib/affiliates";
import type { AffiliateKey } from "@/config/affiliates";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

/**
 * Renders a safe affiliate outbound link from the central registry.
 * Inactive entries render as a plain (non-sponsored) link with no tracking.
 */
export default function AffiliateLink({
  affiliateKey, locale, children, disclosure,
}: {
  affiliateKey: AffiliateKey;
  locale: Locale;
  children: React.ReactNode;
  disclosure?: string;
}) {
  const r = resolveAffiliate(affiliateKey, locale);
  if (!r) return <>{children}</>;
  return (
    <span className="afflink">
      <a
        href={r.href}
        rel={r.rel}
        target="_blank"
        onClick={() => track("affiliate_outbound_click", { key: affiliateKey, active: r.active, business_unit: "supply_sourcing" })}
      >
        {children}
      </a>
      {r.active && disclosure ? <small className="affdisc"> {disclosure}</small> : null}
    </span>
  );
}

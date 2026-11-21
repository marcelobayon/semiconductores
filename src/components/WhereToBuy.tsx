"use client";
import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";
import { affiliates, type AffiliateKey } from "@/config/affiliates";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function WhereToBuy({ locale, e }: { locale: Locale; e: Dictionary["education"] }) {
  const keys = Object.keys(affiliates) as AffiliateKey[];
  return (
    <div className="wtb">
      <h3 className="sec">{e.whereToBuy}</h3>
      <div className="wtb-links">
        {keys.map((k) => (
          <AffiliateLink key={k} affiliateKey={k} locale={locale}>{affiliates[k].name} {"↗"}</AffiliateLink>
        ))}
      </div>
      <p className="affnote">{e.affNote} <Link href={`/${locale}/affiliate-disclosure`}>{e.affDisclosure}</Link></p>
    </div>
  );
}

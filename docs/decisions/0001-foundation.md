# ADR 0001 — Phase 1 foundation stack

- **Date:** 2026-11-20
- **Status:** Accepted (Marcelo approved scaffold)

## Decisions
- **Framework:** Next.js 14 (App Router, TypeScript).
- **Hosting:** Netlify (`@netlify/plugin-nextjs`).
- **i18n:** `/[lang]` routing (`en` default, `es`), middleware locale redirect, hreflang + canonical on every page.
- **Analytics:** GA4-direct via `gtag.js` (ID `G-NYC1V06H6X`), loaded only when `NEXT_PUBLIC_GA_ID` is set. GTM container `GTM-TKZCRS6B` is deferred to the Portfolio Intelligence milestone — the two are not run together.
- **Styling:** plain CSS design tokens (no CSS framework dependency) per the low-maintenance / economical principle.
- **Affiliates:** one central registry (`src/config/affiliates.ts`) + resolver; all entries inactive.

## Not in this foundation
No database, CMS, search cluster, payments, public API, or BOM uploads (blueprint non-goals). Demonstration data only; nothing claimed as live/licensed/authorized.

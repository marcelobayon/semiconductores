# Semiconductores.net

Global, bilingual (EN/ES) semiconductor **commerce & intelligence** platform for engineers and AI agents. This repository is the web application foundation (Phase 1).

> Product plan, not evidence of live operations. Nothing here is a live catalog, licensed data feed, or confirmed supplier/partner relationship. See `docs/WEBSITE_BLUEPRINT.md`.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Netlify** hosting (`@netlify/plugin-nextjs`)
- Bilingual `/[lang]` routing (`en` default, `es`), hreflang + canonical on every page
- **GA4-direct** analytics (loads only when `NEXT_PUBLIC_GA_ID` is set)
- Central affiliate registry + resolver (all entries inactive)
- Plain-CSS design system (no CSS framework dependency)

## Develop
```bash
npm install
npm run dev        # http://localhost:3000  -> redirects to /en
```
Analytics stays OFF in dev unless you set `NEXT_PUBLIC_GA_ID` in `.env.local`.

## Build
```bash
npm run lint && npx tsc --noEmit && npm run build
```

## Environment
Copy `.env.example` to `.env.local`. On Netlify set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_ID` **in the Production context only** so preview deploys never send analytics to the live property.

## Structure
```
src/
  app/            # App Router: root layout + [lang]/ pages + sitemap/robots
  components/     # SiteNav, PartSearch, Analytics, FabScene (3D), ...
  config/         # affiliates.ts  (single affiliate registry — all inactive)
  lib/            # i18n, seo (hreflang/canonical), analytics (GA4), affiliates resolver, demo-data
  i18n/           # en.json / es.json dictionaries
docs/             # WEBSITE_BLUEPRINT.md, INDIGENOUS_SEMICONDUCTORS_PROJECT.md, decisions/
```

## Honesty rules (enforced in code + copy)
No invented prices, stock, lead times, authorization, or authenticity. Demonstration data is labeled. Live values will carry source attribution + last-checked timestamps. GTM (`GTM-TKZCRS6B`) is deferred to the Portfolio Intelligence milestone — GA4-direct and GTM are never run together.

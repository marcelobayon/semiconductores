# SEO Content Architecture

Status: introduced by the "SEO Foundation: Operational Amplifier" PR.
This document explains the reusable content architecture so the next category
(MOSFETs, MLCCs) and future manufacturer/component pages extend it without a
rebuild.

## Page families

| Family | Route | Source of truth | Slug |
|---|---|---|---|
| Category hub (editorial) | `/[lang]/categories/<slug>` | `src/lib/category-hubs.ts` | **localized** per locale |
| Catalog category (browse) | `/[lang]/categories/<slug>` | `src/lib/catalog.ts` (`categories()`) | shared |
| Technical guide | `/[lang]/guides/<slug>` | `src/lib/guides.ts` | shared, or **localized** via `esSlug` |
| Manufacturer profile | `/[lang]/manufacturers/<slug>` | `src/lib/manufacturers.ts` | shared |
| Component detail | `/[lang]/components/<slug>` | `src/lib/catalog.ts` | shared |

The category route resolves an **editorial hub first** (by the locale's slug),
and falls back to the **catalog category listing**. Both are useful and
cross-linked: the hub teaches and routes to discovery; the catalog listing
browses parts. The thin catalog listing links up to its hub when one exists.

## Localized slugs + hreflang

Editorial hubs and the op-amp guide use **per-locale slugs** so the Spanish URL
is a real Spanish slug (e.g. `/es/categories/amplificadores-operacionales`).
`buildMetadata({ …, localizedPaths })` (in `src/lib/seo.ts`) then emits the
correct **canonical** (the current locale's URL) and **hreflang** alternates
(each locale → its own localized URL, plus `x-default` → English). Shared-slug
pages omit `localizedPaths` and behave as before. The sitemap (`app/sitemap.ts`)
emits per-locale URLs with matching `alternates.languages` for every page.

Rule enforced by tests: a Spanish canonical never points at an English URL, and
the English hub slug does not resolve under `/es`.

## Structured data

- Category hub: `BreadcrumbList` (matches the visible breadcrumb).
- Guide: `TechArticle` (headline, description, `inLanguage`, dates, author =
  editorial org, publisher) + `BreadcrumbList`.
- No invented offers, prices, ratings, reviews, or availability — see honesty.

## Adding the next hub (e.g. MOSFETs)

1. Add an entry to `categoryHubs` in `src/lib/category-hubs.ts` with a localized
   `slug`, bilingual content (overview, selection params, applications),
   `catalogCategorySlug` (e.g. `"mosfets"`, which already exists in the catalog),
   `relatedComponents` (catalog slugs that exist), `relatedGuides`, real
   `sources`, and `lastReviewedAt`.
2. Optionally add a matching guide to `src/lib/guides.ts` (set `esSlug`,
   `relatedComponents`, `relatedHubKey`).
3. Nothing else: routing, metadata, sitemap, breadcrumbs, JSON-LD, internal
   links, and the `category_view` event are already wired. Tests in
   `src/lib/seo-content.test.ts` show the invariants to keep (bilingual
   completeness, links resolve, hreflang correctness).

## Analytics (decision)

The site uses **GA4-direct** (gtag.js + Consent Mode v2 + a versioned
`track()` taxonomy in `src/lib/analytics.ts`). The GTM container
`GTM-TKZCRS6B` is **intentionally not installed** here: adding it alongside
GA4-direct would create a duplicate/competing analytics path, and GTM was
already deferred to the later Portfolio-Intelligence phase. This PR adds a
`category_view` event (privacy-safe: category key + business unit only, no
query strings, PII, BOM contents, or sourcing details) and reuses the existing
`guide_view`. If/when GTM is adopted, it replaces GA4-direct rather than
duplicating it.

## Commercial honesty

"Verified suppliers / verified distributors" active claims were removed from
the hero, two homepage cards, and the sourcing intro (replaced with "supplier
discovery" / "distributor discovery" / "suppliers"). The four-tier trust-label
*definitions* (`tlA`–`tlD`) remain as unused vocabulary for a future,
evidence-backed labeling system — they are not displayed as active statuses.
Component records are labeled as curated demonstration data with provenance,
not live inventory, pricing, or supplier offers. A regression test asserts the
"verified" phrases stay out of the i18n.

## Sources used (operational amplifiers)

- Texas Instruments — *Op Amps for Everyone* (SLOD006) — https://www.ti.com/lit/pdf/slod006
- Texas Instruments — *Analog Engineer's Circuit Cookbook: Op Amps* (SLYY137) — https://www.ti.com/lit/pdf/slyy137
- Texas Instruments — *AN-20: An Applications Guide for Op Amps* (SNOA621) — https://www.ti.com/lit/pdf/snoa621
- Analog Devices — *Op Amp Applications Handbook* (Walt Jung, ed.) — https://www.analog.com/en/resources/technical-books/op-amp-applications-handbook.html
- Texas Instruments — *LM358 datasheet* — https://www.ti.com/lit/ds/symlink/lm358.pdf
- Horowitz & Hill — *The Art of Electronics*, 3rd ed., Ch. 4 — https://artofelectronics.net/

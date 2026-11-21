# SEMICONDUCTORES.NET --- WEBSITE BLUEPRINT

**Canonical filename:** `WEBSITE_BLUEPRINT.md`\
**Version:** 0.2 --- commercial platform revision\
**Date:** 2026-11-20\
**Owner:** Marcelo Bayon\
**Status:** Strategic product specification; repository audit and
implementation approval pending.

> This is a product plan, not evidence that the domain, company,
> supplier relationships, data licenses, products, partnerships, or
> manufacturing capabilities are active.

## 0. Working instructions

Read this blueprint with `ABOUT_ME.md`,
`INDIGENOUS_SEMICONDUCTORS_PROJECT.md`, and
`INDIGENOUS_SEMICONDUCTORS_PROYECTO.md`. Inspect the repository,
deployment, domain, DNS, and existing assets before implementation.
Report verified facts separately from assumptions and proposals. Build
incrementally with tests and reviewable pull requests. Do not deploy,
spend money, subscribe to paid services, or make commercial commitments
without Marcelo's explicit approval. Never claim that data is live,
licensed, verified, authorized, or in stock unless its source and rights
have been checked. Keep SECD separately governed and integrate only
through approved interfaces.

## 1. Product definition

### 1.1 Positioning

**Semiconductores.net is a global, bilingual semiconductor commerce and
intelligence platform.** It combines component and supplier discovery,
engineering calculators, BOM intelligence, sourcing services, technical
education, and APIs for both human users and AI agents. It develops
global commercial relationships while building a Latin American
supplier, research, and industrial ecosystem.

Global customers are in scope from launch. Latin America, initially
Colombia and Peru, is an ecosystem-development focus rather than a
geographic restriction.

### 1.2 Parent platform and business units

1.  **Supply & Sourcing:** component discovery, supplier directory,
    RFQs, referrals, sourcing assistance.
2.  **Component Intelligence:** component records, comparisons,
    alternatives, BOM enrichment, lifecycle/availability monitoring,
    APIs and webhooks.
3.  **Education & Knowledge:** guides, calculators, learning paths,
    curated third-party courses, and later original education.
4.  **SECD Research & Technology:** parallel research and IP track,
    separately governed.
5.  **Research & Ecosystem:** institutional relationships, regional
    supplier discovery, and ecosystem intelligence.
6.  **Future Industrial Capabilities:** design, prototyping, testing,
    packaging, or manufacturing only if demand, capability, talent,
    infrastructure, capital, and economics justify each step.

Do not present future business units as operating businesses before they
exist.

### 1.3 Customer priority

Serve both people and software agents. Initial priority: 1. Engineering
and procurement organizations. 2. AI developers and agents needing
machine-readable discovery and sourcing workflows. 3. Distributors,
suppliers, brokers, and manufacturers seeking qualified leads. 4.
Universities, researchers, educators, and students. 5. Other industrial
and ecosystem participants.

Human usability remains first-class; agent access complements it.

### 1.4 Commercial wedge

The initial wedge is **hybrid component sourcing + component
intelligence**. Start as a directory, discovery, comparison, referral,
and broker/intermediary service. Do not hold inventory. Route buyers to
supplier checkout where possible, collect RFQs, and coordinate sourcing
when justified. Add deeper transaction functionality only after repeat
demand and unit economics are demonstrated.

### 1.5 Conversion funnel

**Discover → Compare → Calculate → Enrich → Source → Monitor**

-   Discover components, categories, manufacturers, and suppliers.
-   Compare specifications and authorized supplier offers.
-   Use free calculators and basic BOM analysis.
-   Capture buyer intent through useful tools.
-   Offer a paid enriched BOM report or sourcing assistance.
-   Offer ongoing monitoring and API access after recurring value is
    proven.

First microtransaction candidate: **paid enriched BOM report**. Keep
basic discovery free enough to attract and qualify users.

### 1.6 Initial non-goals

No inventory, warehouse, full checkout/escrow/fulfillment, payment
wallet, unrestricted public API, autonomous purchasing agent, public BOM
uploads, unnecessary CMS/database complexity, fabrication facility, or
unsubstantiated SECD performance claims at launch.

## 2. Approved decisions and constraints

  ---------------------------------------------------------------------------------------
  Area                                Decision
  ----------------------------------- ---------------------------------------------------
  Brand/domain                        Semiconductores.net; ownership, DNS, legal operator
                                      and trademark status require verification

  Reach                               Global

  Languages                           English and Spanish

  Customers                           Humans and AI agents

  First paying audience               Engineering/procurement organizations; AI
                                      developers/agents next

  Commercial wedge                    Hybrid sourcing + component intelligence

  Geography                           Global customers; Latin American ecosystem focus

  Sourcing                            Broker/intermediary; no inventory initially

  Architecture                        Parent platform with business units

  Commercial infrastructure           API-first, phased and cost-controlled

  Inquiries                           Netlify Forms

  Transactional email                 Resend

  Analytics                           GTM container supplied below; GA4 destination must
                                      be verified

  Future integration                  Portfolio Intelligence-compatible identifiers,
                                      events and reporting interfaces

  Web repository                      `https://github.com/marcelobayon/semiconductores`
                                      (reported empty; inspect)

  SECD repository                     `https://github.com/marcelobayon/secd-crf`
                                      (access/content not yet verified)

  GTM container                       `GTM-TKZCRS6B`
  ---------------------------------------------------------------------------------------

Keep recurring costs low. No unlimited anonymous API. No paid data feed
until its rights, cost, and expected return are reviewed. A data feed
does not automatically grant republication rights. Do not invent a GA4
measurement ID: the supplied identifier is a GTM container ID.

## 3. Sitemap and navigation

### Main navigation

Marketplace; Components; Suppliers; Tools & Calculators; BOM Analyzer;
Education; Research; API / Developers. Header also includes EN \| ES,
search, and a sourcing CTA. Add sign-in only when accounts exist.

### Proposed routes

**Discovery:** `/`, `/marketplace`, `/components/[part-number]`,
`/manufacturers/[slug]`, `/suppliers/[slug]`, `/categories/[slug]`,
`/compare`, `/alternatives/[part-number]`, `/search`.

**Conversion:** `/bom-analyzer`, `/reports/bom/[report-id]` (only if
secure reports are implemented), `/sourcing/request`, `/suppliers/join`,
`/pricing` (only when real offers and terms are approved).

**Tools and education:** `/calculators`, `/calculators/[slug]`,
`/education`, `/courses/[slug]`, `/guides/[slug]`, `/glossary/[term]`.

**Developer:** `/api`, `/api/docs`, `/webhooks`, `/developers`,
`/status` (only if maintainable).

**Research and trust:** `/research`, `/research/secd`,
`/ecosystem/latin-america`, `/insights`, `/about`, `/contact`,
`/privacy`, `/terms`, `/affiliate-disclosure`.

Use a consistent bilingual URL strategy, e.g. `/en/...` and `/es/...`,
selected after repository inspection. Implement correct canonicals,
`hreflang`, and equivalent-page language switching. Do not publish
untranslated pages as complete.

### Homepage priorities

Explain and route users to: component/supplier search; BOM analysis;
comparison and alternatives; calculators; sourcing requests; education;
APIs; Latin American ecosystem and SECD research. Clearly label live
data, static reference data, supplier-submitted data, and illustrative
examples.

## 4. Marketplace and data quality

### MVP directory

-   Search by part number, manufacturer, category, and selected
    attributes.
-   Component detail pages with sourced specifications.
-   Manufacturer and supplier profiles.
-   Datasheet/documentation links where lawful.
-   Alternatives only where technically supported.
-   Supplier offers only from authorized data sources with republication
    rights.
-   RFQ and sourcing routing.
-   Affiliate/outbound links where valid agreements exist.
-   Source attribution and last-checked timestamps.

Never invent prices, stock, lead times, authorization, authenticity, or
delivery promises.

### Component record

Support canonical part number, manufacturer, category, normalized
technical attributes and units, package, description, datasheet/source,
lifecycle data where licensed, compliance data where authoritative,
permitted supplier offers, alternative candidates with
rationale/confidence, provenance, retrieval date, license notes, and
localized content.

Preserve conflicting source values rather than blending them into one
apparently authoritative value.

### Supplier trust labels

-   **Manufacturer-authorized:** current authorization evidence checked.
-   **Independently verified:** checks and date explicitly defined.
-   **Supplier-provided:** self-submitted, not independently verified.
-   **Unverified listing:** directory presence only.

Explain every label. Do not use vague "verified supplier" badges.

### Initial category candidates

Semiconductors/ICs, microcontrollers/processors, memory, power
management/power semiconductors, sensors, FPGAs/program logic,
analog/mixed-signal, connectivity/interface. Prioritize a narrow subset
after demand, supplier access, and data-rights research. Avoid thin
mass-generated SEO pages.

### Data rights

For each source document allowed uses (internal lookup, display,
caching, redistribution, derivative data, commercial use), attribution,
refresh, retention, rate limits/cost, regional limits, and
correction/takedown procedures. Publicly accessible does not mean
licensed for bulk republication.

## 5. Central affiliate configuration

### Requirement

All affiliate destinations must be controlled from one obvious
version-controlled configuration file. A link change must not require
editing page components.

Recommended path for a TypeScript app:
`apps/web/src/config/affiliates.ts`. If the chosen stack favors plain
JSON, use `affiliates.json` instead. Select one canonical registry after
inspecting the repository; never keep duplicate registries.

### Entry schema

Each entry supports: - Stable internal key, display name,
provider/merchant. - Destination URL and optional affiliate ID/tracking
parameters. - Product/category purpose. - Supported languages and
placements. - Active/inactive status. - Disclosure group/label. - `rel`
policy (`sponsored`, `nofollow`) and safe external-link behavior. -
Region restrictions and fallback destination. - Terms/program URL,
last-reviewed date, and internal notes.

Do not put secrets, API keys, passwords, private tokens, or payment
credentials in this public configuration. Affiliate IDs and referral
parameters in browser URLs are public identifiers, not secrets.

### Example

``` ts
export const affiliates = {
  newark: {
    key: "newark",
    name: "Newark",
    provider: "Newark / element14",
    active: false,
    destination: "https://www.newark.com/",
    categories: ["components", "semiconductors"],
    languages: ["en", "es"],
    placements: ["component", "category", "guide"],
    disclosureGroup: "affiliate",
    rel: ["sponsored", "nofollow"],
    regions: [],
    lastReviewed: null,
    termsUrl: "https://www.newark.com/affiliate",
  },
  electronComponents: {
    key: "electron-components",
    name: "ElectronComponents",
    provider: "ElectronComponents.com",
    active: false,
    destination: "https://www.electroncomponents.com/",
    categories: ["components"],
    languages: ["en", "es"],
    placements: ["component", "category"],
    disclosureGroup: "affiliate",
    rel: ["sponsored", "nofollow"],
    regions: [],
    lastReviewed: null,
    termsUrl: null,
  },
} as const;
```

These are inactive schema examples, not active affiliate links or
confirmation of program acceptance, regional eligibility, or current
terms. The URLs shown are ordinary provider destinations, not tracking
URLs. Do not activate until acceptance, terms, tracking URL, region, and
test click are verified.

### Shared resolver/component

Create one helper/component that resolves a configured affiliate key,
refuses inactive/missing entries, validates HTTPS destinations, safely
applies tracking parameters, adds appropriate external-link attributes,
shows a clear disclosure, and emits a non-PII outbound click event.
Support a normal destination fallback when appropriate. Never allow a
visitor-supplied query parameter to control an arbitrary redirect
(open-redirect vulnerability).

### Update workflow

1.  Edit the central config.
2.  Update tracking URL and review date.
3.  Recheck program terms, geography, and allowed placements.
4.  Run URL validation and tests.
5.  Review through pull request.
6.  Deploy through normal release process.
7.  Verify live destination and tracking.

No affiliate URL should be hard-coded in page components. Search for
duplicate merchant URLs during QA.

### Governance

Verify acceptance, commission terms, regional eligibility, and rules for
paid search, email, social, coupons, product feeds, and international
traffic. Disclose material connections close to recommendations and on
`/affiliate-disclosure`. Label sponsored placements. Payment must not
affect technical compatibility or safety judgments. Investigate
Newark/element14 and ElectronComponents.com as potential programs only;
do not represent them as approved partners. Verify any other distributor
partnership individually.

## 6. Monetization roadmap

1.  **Affiliate referrals:** component, category, supplier, calculator,
    guide, and course pages. Track clicks separately from confirmed
    conversions and commissions; reconcile partner reporting when
    available.
2.  **Supplier directory/leads:** qualified lead fees, enhanced
    profiles, subscriptions, disclosed sponsorship, referral agreements.
    Define lead qualification, consent, supplier claims, disputes, and
    removal.
3.  **Microtransactions:** enriched BOM report first; later comparison
    reports, sourcing shortlists, lifecycle reports, and custom
    research. Free preview before purchase. State limitations and
    freshness.
4.  **API/webhooks:** component lookup, matching, BOM analysis,
    alternatives, licensed supplier offers, lifecycle/availability
    monitoring. Registered beta first; prepaid credits before
    unrestricted usage; subscriptions after recurring demand.
5.  **Education:** curated course directory and permitted affiliate
    referrals first; original guides and courses later. Use the supplied
    Udemy semiconductor search page as a discovery reference, not
    permission to scrape or republish course content.
6.  **SECD research/IP:** licensing, private deployment, hosted
    computation, and research contracts only after technical audit and
    IP review.
7.  **Aggregated intelligence:** use privacy-safe aggregate patterns
    internally and potentially in reports. Do not sell identifiable
    buyer behavior, individual BOMs, private RFQs, or confidential
    procurement plans without explicit lawful basis and consent.

## 7. BOM analyzer and buyer-intent capture

Flow: upload/enter BOM → validate → free basic analysis → preview
matches/gaps → paid enriched report or sourcing request → optional
monitoring later.

Treat BOMs as confidential commercial information: - Do not send raw
BOMs or confidential part details to analytics or advertising tools. -
Do not use uploaded BOMs to train models or resell data. - Disclose
processors and define retention, deletion, access, and backup
behavior. - Encrypt in transit and at rest if stored; use private
storage and short-lived authorized report links. - Enforce file type,
size, row count, parse-time, and request limits. - Reject
executable/unexpected formats; patch parsers and scan uploads where
practical. - Protect report IDs from guessing/enumeration. - Provide
deletion process; never make uploads public by default.

Free tier: bounded input, basic normalization and match summary. Paid:
enriched downloadable report, larger BOM/deeper analysis, sourcing
shortlist, human assistance, or monitoring. Exact limits and pricing
require validation and approval.

## 8. Calculators, education, and content

Calculators must state purpose, inputs/units, validation,
formula/assumptions, sources or derivation, worked example, and
limitations. Independently check calculations before publication.
Candidate themes: power/energy, basic circuits, thermal dissipation,
signal/timing, component derating, unit conversions, and BOM
quantity/cost when valid data exists.

Initial content clusters: semiconductor value chain; component families
and selection; design versus fabrication/assembly/packaging/testing;
sourcing and supplier due diligence; lifecycle/obsolescence; BOM
procurement; power, sensors, MCUs, memory, FPGAs; Latin American
ecosystem; curated technical learning paths.

Use search-demand research before scaling. Every substantive article
needs an editor, dates, sources, limitations, technical review where
required, translation status, and corrections process. No thin SEO
pages.

## 9. API-first and AI-agent experience

Human-readable pages remain first-class. Machine-readable information
must agree with visible content. Version APIs and document provenance,
timestamps, units, and data quality. AI agents may not purchase,
disclose private data, or create supplier commitments without explicit
user authorization.

Phases: - A: static pages, structured metadata, bounded search. - B:
registered read-only API beta, caching and per-key quotas. - C: paid API
via prepaid credits or approved subscriptions after demand evidence. -
D: webhooks after signature verification, retries, replay protection,
and delivery limits are tested.

API requirements: versioned paths (e.g. `/api/v1`), OpenAPI,
authentication/key rotation, per-key/IP limits, payload/response bounds,
timeouts, concurrency caps, pagination, idempotency where relevant,
structured errors, privacy-safe audit logs, quotas, usage reporting,
deprecation policy, and kill switch.

## 10. Security and cost controls

Cost safety is a launch requirement: - Prefer static generation and
cached public data. - No anonymous expensive compute or unbounded
third-party calls. - Validate inputs; rate-limit by IP/account/key. -
Bound payloads, rows, responses, execution time, and concurrency. -
Spam/bot protection on forms and uploads. - Safe URL handling; prevent
open redirects. - Dependency scanning and updates. - Secrets only in
hosting environment variables; `.env.example` contains
names/descriptions only. - Separate local, preview, and production
credentials; least privilege and rotation. - Small allowlisted API beta,
daily/monthly quotas, global ceilings, caching, budget alerts/hard caps
where available, and kill switch. - Keep static pages online if API
services are disabled. - Separate customer billing from infrastructure
costs. - Rate limits alone do not guarantee zero overage because
enforcement may lag. - Use a payment processor; never store card data.
Verify payment webhooks server-side, make fulfillment idempotent, and
define refunds/disputes before charging.

## 11. Forms and email

Use Netlify Forms for appropriate public inquiries and supplier-interest
forms, not as the commerce engine. Forms must be bilingual, minimal,
consent-aware, spam-protected, validated, and tested. Show success only
after confirmed receipt. Warn users not to submit confidential BOMs or
trade secrets through general contact forms.

Use Resend for transactional messages: inquiry acknowledgments,
verification, report delivery, API onboarding, quota warnings, webhook
failures, and sourcing status. Keep API keys server-side. Configure SPF,
DKIM, and DMARC after domain control is verified. Do not send marketing
email without appropriate consent and compliance review.

## 12. Analytics and Google Tag Manager

Marcelo supplied the **Google Tag Manager container ID**:

`GTM-TKZCRS6B`

This is a GTM container ID, **not a GA4 measurement ID**. The container
must be configured in the intended Google Tag Manager account. A GA4 tag
and its measurement ID must be confirmed inside that container; do not
invent one.

The supplied code includes a GTM script URL and a `gtag()` helper. The
helper is associated with the Google tag / `gtag.js` pattern and is not,
by itself, a complete GTM installation. During implementation, use
current official GTM installation instructions, including correct script
placement and the `noscript` iframe placement where appropriate. Do not
install competing snippets in a way that duplicates page views or
events.

Do not claim tracking is active because an ID is present in code. Verify
container load, GA4 destination, consent behavior, and event firing in
preview/debug tools.

Analytics principles: - Use the supplied container only after confirming
account access and intended ownership. - Do not create a GA4 property or
measurement ID without approval. - Respect privacy/consent
requirements. - Never send names, email addresses, messages, raw BOMs,
confidential part data, API keys, or private sourcing details to
analytics. - Document events and conversion definitions; avoid duplicate
client/server events.

Suggested events: `site_search`, `component_view`,
`supplier_profile_view`, `compare_started`, `calculator_started`,
`calculator_completed`, `bom_analysis_started`,
`bom_analysis_completed`, `bom_report_purchase`,
`sourcing_request_submitted`, `affiliate_outbound_click`,
`supplier_inquiry_submitted`, `api_key_created`, `api_quota_warning`,
`course_outbound_click`, `language_switch`.

Use safe parameters only: public slugs, category, language, count/result
bands, placement, product SKU, currency/value after confirmed purchase.
No PII or BOM contents. A click is not a sale or commission.

Report organic discovery, zero-result search patterns where
privacy-safe, category interest, calculator completion, BOM funnel, RFQ
qualification, affiliate clicks and confirmed commissions, API
retention/usage/cost, revenue, refunds, and contribution margin.

## 13. Portfolio Intelligence compatibility

Do not build Portfolio Intelligence in this milestone. Preserve
integration seams: - Stable project ID: `semiconductores`. -
Business-unit IDs: `supply_sourcing`, `component_intelligence`,
`education`, `secd_research`, `ecosystem`. - Versioned event
names/timestamps. - Documented revenue, conversion, usage, and inquiry
definitions. - Export/API for aggregate metrics and an event/webhook
adapter. - No dependency on Portfolio Intelligence for site operation. -
No unnecessary cross-project sharing of personal or confidential
customer data.

Potential future events: qualified lead, supplier referral, affiliate
commission, paid report, API revenue, subscription conversion, research
contract. Never emit fictional revenue records.

## 14. SECD boundary

SECD proceeds in parallel and separately: 1. Technical audit and
reproducible benchmarks. 2. Private proof of concept. 3. Research
partnership.

Keep source code and sensitive materials in the separate SECD
repository. Publish only reviewed public summaries and artifacts. Do not
expose proprietary kernels, equations, source, data, or implementation
details without approval. Distinguish numerical verification,
benchmarks, simulation, experimental validation, and fab validation. Do
not claim production readiness, patent status, or manufacturing benefit
without evidence. Review IP ownership, contributor rights, publication
terms, and licensing before collaboration.

## 15. Brand, trust, SEO, and design

The brand should feel global, technically credible, bilingual,
practical, and commercially useful---not like a speculative investment
pitch. Verify domain ownership, renewal, DNS, legal operator, and
trademark conflicts. The former "Indigenous Semiconductors /
Semiconductores Indígenas" name remains subject to cultural and
trademark screening; the domain does not settle the legal brand
question.

Design principles: prominent search and tools; readable technical tables
on mobile; visible provenance/freshness; explained trust labels;
accessible contrast and keyboard support; reduced motion; no fake
supplier logos, false trust badges, fake facility imagery, or unverified
partner claims. No final palette/logo/typeface is approved yet.

SEO: unique titles/descriptions; canonicals; `hreflang`; sitemap/robots;
valid structured data only; optimized performance; authoritative
citations; no thin duplicate pages. Agent discovery may use semantic
HTML, stable URLs, structured metadata, OpenAPI, and public
machine-readable data where rights permit. Do not expose private or
licensed data to improve crawlability.

## 16. Technical architecture and repository

No framework, hosting architecture, database, or billing provider is
finally approved until repository and deployment are inspected. Select a
low-maintenance architecture supporting bilingual SEO routes, static
pages, selective server functions, structured content/catalog, secure
forms/uploads, versioned APIs, central affiliate config, Resend, Netlify
Forms, cost controls, and future integration. Do not add
CMS/database/search cluster/microservices without a justified use case.

Suggested layout (adapt to the actual repo; do not force it):

``` text
semiconductores/
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CHANGELOG.md
├── .editorconfig
├── .gitignore
├── .env.example
├── docs/{strategy,architecture,decisions,research,api}/
├── apps/web/src/
│   ├── app/
│   ├── components/
│   ├── content/
│   ├── config/affiliates.ts
│   ├── lib/
│   ├── data/
│   └── i18n/
├── packages/{shared,api-contracts}/
├── services/api/
└── .github/{ISSUE_TEMPLATE,workflows}/
```

Protect `main`; use feature branches/PRs; require lint, type checks,
tests and production build in CI; scan dependencies; keep secrets out of
Git history; record architecture decisions; use clear commits/changelog;
review deploy previews; document rollback. Choose a license only after
ownership/licensing intent is decided.

## 17. Phased roadmap

**Phase 0 --- Audit:** repository/hosting/domain/analytics inventory,
asset review, data-rights research, cost/risk register, first-release
scope. No deployment or paid integration.

**Phase 1 --- Foundation:** repository hygiene/CI, bilingual routing,
design system, affiliate config and resolver (all sample entries
inactive), GTM/consent plan, Netlify Forms/Resend design, structured
data/provenance, security baseline. Acceptance: clean build/tests, no
secrets, inactive affiliate entries never render as active.

**Phase 2 --- Directory:** marketplace, focused categories, initial
components, manufacturer/supplier profiles, search/filters, detail
templates, provenance/freshness, priority English/Spanish pages.
Acceptance: no invented live offers, prices, stock, or authorization.

**Phase 3 --- Tools/education:** independently validated calculators,
guides/glossary, curated courses where terms permit, affiliate
placements via central config. Acceptance: calculations checked,
disclosures visible, inactive/invalid links blocked.

**Phase 4 --- BOM/sourcing:** bounded upload, free basic analysis,
secure report if needed, RFQ routing, paid report only after
payment/privacy/support approval. Acceptance: limits, deletion, no
confidential analytics, end-to-end delivery verified.

**Phase 5 --- API/webhooks:** versioned read-only beta, OpenAPI,
registered access, quotas/rate limits/cache/logging/budget alerts/kill
switch. Acceptance: abuse/load/cost tests and static site remains
available if APIs disabled.

**Phase 6 --- Monetization expansion:** supplier paid profiles/leads,
affiliate expansion, prepaid API credits/subscriptions, monitoring and
education products only after demand, terms, support and unit economics
are established.

**Phase 7 --- Portfolio Intelligence:** stable identifiers/events,
aggregate metrics exports/API, adapter and access controls.

SECD runs independently through its audit → private PoC → research
partnership sequence.

## 18. Release gates

Test navigation, bilingual routes, search, detail pages, calculators,
forms/email, affiliate resolver/fallback, BOM security/deletion, API
quotas, source provenance, data freshness, supplier labels, affiliate
terms/disclosures/rel attributes, no open redirects, GTM loads once, GA4
destination and events verified, no PII in analytics, no secrets,
limits/rate controls, cost alerts/kill switch, SEO metadata,
accessibility, and responsive behavior.

No production launch until Marcelo approves content, legal/privacy
notices, domain setup, integrations, and deployment.

## 19. Open decisions

1.  Verify domain ownership, DNS, legal operator, trademark/name
    screening.
2.  Inspect actual GitHub repository and current deployment.
3.  Confirm GTM account access and GA4 destination.
4.  Identify authorized component data sources and republication rights.
5.  Select first component categories.
6.  Define supplier verification evidence.
7.  Confirm affiliate program acceptance, terms, geography, tracking
    URLs, and reporting.
8.  Select and validate initial calculators.
9.  Define BOM limits, retention/deletion, and report scope.
10. Select API hosting/quotas after cost modeling.
11. Set pricing after customer discovery.
12. Confirm official contact recipients and Resend domain
    authentication.
13. Approve design identity and bilingual editorial workflow.
14. Review privacy/legal notices with qualified counsel.
15. Confirm what SECD information may be public.

Do not ask Marcelo to repeat approved decisions. Ask a focused question
only when a missing answer blocks the next action.

## 20. First assignment for Claude

Do not begin broad implementation or production deployment.

1.  Read this blueprint and companion source-of-truth documents.
2.  Inspect the complete `marcelobayon/semiconductores` repository and
    deployment.
3.  Report current state and reusable assets.
4.  Reconcile repository reality with this blueprint.
5.  Produce a concise Phase 0 audit and implementation plan.
6.  Recommend the lowest-cost architecture.
7.  Confirm official GTM installation and identify required
    account/configuration access.
8.  Design/test affiliate config schema and resolver before adding
    active links.
9.  Research data licensing and initial supplier options.
10. Propose the first small PR with acceptance tests.

Wait for Marcelo's approval before implementation beyond the
specifically authorized first task. Never deploy without explicit
approval.

## Document control

Canonical filename: `WEBSITE_BLUEPRINT.md`\
Revision: 0.2 --- 2026-11-20\
Status: Revised strategic/product blueprint; implementation approval
pending.

Record material changes with date, rationale, evidence, and whether each
is an approved decision or proposal. Preserve the distinction between
verified implementation and planned capability.

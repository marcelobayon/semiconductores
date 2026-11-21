/**
 * GA4-direct analytics. (GTM container GTM-TKZCRS6B is deferred to the Portfolio
 * Intelligence milestone — do not run both; they would double-count page views.)
 *
 * Every event is versioned and carries Portfolio Intelligence integration seams:
 * schema_version, project, and business_unit.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const ANALYTICS_ENABLED = typeof GA_ID === "string" && GA_ID.length > 0;

export const SCHEMA_VERSION = "1";
export const PROJECT_ID = "semiconductores";

export type BusinessUnit =
  | "supply_sourcing"
  | "component_intelligence"
  | "education"
  | "secd_research"
  | "ecosystem";

// Documented event taxonomy (blueprint section 12 + platform events).
export type AnalyticsEvent =
  | "site_search"
  | "component_view"
  | "agent_view_toggle"
  | "compare_started"
  | "supplier_profile_view"
  | "calculator_started"
  | "calculator_completed"
  | "bom_analysis_started"
  | "bom_analysis_completed"
  | "sourcing_request_submitted"
  | "supplier_inquiry_submitted"
  | "affiliate_outbound_click"
  | "course_outbound_click"
  | "language_switch"
  | "navigate"
  | "platform_view"
  | "platform_node_click"
  | "platform_motion_toggle";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  const payload = { schema_version: SCHEMA_VERSION, project: PROJECT_ID, ...params };
  if (ANALYTICS_ENABLED && typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
  // Never send PII, raw BOM contents, API keys, or confidential sourcing data.
}

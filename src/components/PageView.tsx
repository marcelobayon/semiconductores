"use client";
import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Params = Record<string, string | number | boolean | undefined>;

/**
 * Privacy-safe view beacon. Fires one GA4 event on mount with only the
 * caller-supplied params (slugs/IDs only — never form values or PII).
 */
export default function PageView({ event, params = {} }: { event: AnalyticsEvent; params?: Params }) {
  useEffect(() => {
    track(event, params);
    // mount-only: a page view fires once; params are stable for the route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

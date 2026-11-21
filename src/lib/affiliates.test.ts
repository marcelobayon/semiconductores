import { describe, it, expect } from "vitest";
import { affiliates, type AffiliateKey, type AffiliateEntry } from "@/config/affiliates";
import { resolveAffiliate } from "@/lib/affiliates";

const keys = Object.keys(affiliates) as AffiliateKey[];

describe("affiliate registry safety (Phase 3 gate: inactive/invalid links blocked)", () => {
  it("ships at least one entry, and every entry is inactive", () => {
    expect(keys.length).toBeGreaterThan(0);
    for (const k of keys) expect(affiliates[k].active).toBe(false);
  });

  it("resolves every inactive entry to its plain destination — never active, never tracked", () => {
    for (const k of keys) {
      const e: AffiliateEntry = affiliates[k];
      const r = resolveAffiliate(k, "en");
      expect(r).not.toBeNull();
      expect(r!.active).toBe(false);
      const expected = e.destination.startsWith("https://") ? e.destination : e.fallback;
      expect(r!.href).toBe(expected);
      const tp = e.trackingParams ?? {};
      for (const v of Object.values(tp)) expect(r!.href.includes(v)).toBe(false);
    }
  });

  it("marks outbound links sponsored + nofollow even when inactive", () => {
    for (const k of keys) {
      const r = resolveAffiliate(k, "es");
      expect(r!.rel).toContain("sponsored");
      expect(r!.rel).toContain("nofollow");
    }
  });

  it("returns null for an unknown key (no open-redirect surface)", () => {
    // @ts-expect-error intentionally invalid key
    expect(resolveAffiliate("___not_a_real_key___", "en")).toBeNull();
  });
});

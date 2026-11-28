import { describe, it, expect } from "vitest";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";
import type { Locale } from "@/lib/i18n";
import { categoryHubs, getHubBySlug } from "@/lib/category-hubs";
import { getGuide, guideSlug } from "@/lib/guides";
import { getPart } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

const L: Locale[] = ["en", "es"];
const hub = categoryHubs.find((h) => h.key === "operational-amplifiers")!;

describe("operational-amplifier category hub", () => {
  it("exists with localized slugs", () => {
    expect(hub).toBeTruthy();
    expect(hub.slug.en).toBe("operational-amplifiers");
    expect(hub.slug.es).toBe("amplificadores-operacionales");
  });

  it("resolves by each locale's own slug, and not cross-locale", () => {
    expect(getHubBySlug("operational-amplifiers", "en")?.key).toBe("operational-amplifiers");
    expect(getHubBySlug("amplificadores-operacionales", "es")?.key).toBe("operational-amplifiers");
    // the EN slug must not resolve under /es (prevents a wrong-language duplicate)
    expect(getHubBySlug("operational-amplifiers", "es")).toBeUndefined();
  });

  it("has non-empty bilingual content everywhere (bilingual integrity)", () => {
    for (const l of L) {
      expect(hub.title[l].length).toBeGreaterThan(10);
      expect(hub.description[l].length).toBeGreaterThan(10);
      expect(hub.h1[l].length).toBeGreaterThan(0);
      expect(hub.intro[l].length).toBeGreaterThan(30);
      for (const s of hub.overview) {
        expect(s.heading[l].length).toBeGreaterThan(0);
        expect(s.body[l].length).toBeGreaterThan(40);
      }
      for (const p of hub.selection) {
        expect(p.name[l].length).toBeGreaterThan(0);
        expect(p.why[l].length).toBeGreaterThan(15);
      }
      for (const a of hub.applications) expect(a[l].length).toBeGreaterThan(3);
      expect(hub.sourcingNote[l].length).toBeGreaterThan(20);
    }
  });

  it("EN and ES are real equivalents, not identical copies", () => {
    expect(hub.intro.en).not.toBe(hub.intro.es);
    expect(hub.h1.en).not.toBe(hub.h1.es);
  });

  it("links only to components and guides that exist (no dead links)", () => {
    for (const s of hub.relatedComponents) expect(getPart(s), `component ${s}`).toBeTruthy();
    for (const s of hub.relatedGuides) expect(getGuide(s), `guide ${s}`).toBeTruthy();
  });

  it("cites at least three authoritative https sources", () => {
    expect(hub.sources.length).toBeGreaterThanOrEqual(3);
    for (const src of hub.sources) {
      expect(src.url).toMatch(/^https:\/\//);
      expect(src.publisher.length).toBeGreaterThan(1);
    }
  });

  it("records a review date (not fabricated monitoring, just a dated review)", () => {
    expect(hub.lastReviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("op-amp guide", () => {
  const g = getGuide("what-is-an-operational-amplifier")!;

  it("exists with a localized Spanish slug resolvable both ways", () => {
    expect(g).toBeTruthy();
    expect(g.esSlug).toBe("que-es-un-amplificador-operacional");
    expect(getGuide("que-es-un-amplificador-operacional")?.slug).toBe("what-is-an-operational-amplifier");
  });

  it("guideSlug returns the localized slug per locale", () => {
    expect(guideSlug(g, "en")).toBe("what-is-an-operational-amplifier");
    expect(guideSlug(g, "es")).toBe("que-es-un-amplificador-operacional");
  });

  it("has bilingual content throughout", () => {
    for (const l of L) {
      expect(g.title[l].length).toBeGreaterThan(5);
      expect(g.summary[l].length).toBeGreaterThan(20);
      for (const s of g.sections) {
        expect(s.heading[l].length).toBeGreaterThan(0);
        expect(s.body[l].length).toBeGreaterThan(40);
      }
      expect(g.limitations[l].length).toBeGreaterThan(20);
    }
    expect(g.title.en).not.toBe(g.title.es);
  });

  it("has sources and discovery links that resolve", () => {
    expect(g.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of g.sources) expect(s.url).toMatch(/^https:\/\//);
    for (const c of g.relatedComponents ?? []) expect(getPart(c)).toBeTruthy();
    expect(categoryHubs.find((h) => h.key === g.relatedHubKey)).toBeTruthy();
  });
});

describe("hreflang / canonical for localized slugs", () => {
  const localizedPaths = { en: `/categories/${hub.slug.en}`, es: `/categories/${hub.slug.es}` };

  it("EN page: canonical en; hreflang es points to the localized ES slug", () => {
    const m = buildMetadata({ locale: "en", path: localizedPaths.en, title: "t", description: "d", localizedPaths }) as {
      alternates: { canonical: string; languages: Record<string, string> };
    };
    expect(m.alternates.canonical).toBe("https://semiconductores.net/en/categories/operational-amplifiers");
    expect(m.alternates.languages.en).toBe("https://semiconductores.net/en/categories/operational-amplifiers");
    expect(m.alternates.languages.es).toBe("https://semiconductores.net/es/categories/amplificadores-operacionales");
    expect(m.alternates.languages["x-default"]).toBe("https://semiconductores.net/en/categories/operational-amplifiers");
  });

  it("ES page: Spanish canonical never points at an English URL", () => {
    const m = buildMetadata({ locale: "es", path: localizedPaths.es, title: "t", description: "d", localizedPaths }) as {
      alternates: { canonical: string };
    };
    expect(m.alternates.canonical).toBe("https://semiconductores.net/es/categories/amplificadores-operacionales");
    expect(m.alternates.canonical).not.toContain("/en/");
  });
});

describe("commercial honesty", () => {
  it("no 'verified supplier / distributor' claims remain in i18n", () => {
    const blob = (JSON.stringify(en) + JSON.stringify(es)).toLowerCase();
    expect(blob).not.toContain("verified suppliers");
    expect(blob).not.toContain("verified distributors");
    expect(blob).not.toContain("proveedores verificados");
    expect(blob).not.toContain("distribuidores verificados");
  });
});

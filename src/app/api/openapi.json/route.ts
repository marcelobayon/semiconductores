import { apiJson, API_VERSION } from "@/lib/api";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Semiconductores.net API",
      version: "1.0.0-beta",
      description:
        "Read-only JSON API over an owned component catalog. Facts only (specifications from manufacturer datasheets); no pricing, stock, lead times, or purchase authorization. Open beta, no key required.",
    },
    servers: [{ url: `${siteUrl}/api/${API_VERSION}`, description: "v1 (beta)" }],
    paths: {
      "/components": {
        get: {
          summary: "List components",
          operationId: "listComponents",
          responses: { "200": { description: "A list of components", content: { "application/json": { schema: { $ref: "#/components/schemas/ComponentList" } } } } },
        },
      },
      "/components/{slug}": {
        get: {
          summary: "Get one component by slug",
          operationId: "getComponent",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" }, example: "ne555p" }],
          responses: {
            "200": { description: "A component", content: { "application/json": { schema: { $ref: "#/components/schemas/ComponentEnvelope" } } } },
            "404": { description: "Not found" },
          },
        },
      },
      "/categories": {
        get: {
          summary: "List categories with counts",
          operationId: "listCategories",
          responses: { "200": { description: "A list of categories", content: { "application/json": { schema: { type: "object" } } } } },
        },
      },
    },
    components: {
      schemas: {
        LocalizedString: { type: "object", properties: { en: { type: "string" }, es: { type: "string" } } },
        Spec: { type: "object", properties: { label: { $ref: "#/components/schemas/LocalizedString" }, value: { type: "string" } } },
        Component: {
          type: "object",
          properties: {
            mpn: { type: "string" },
            slug: { type: "string" },
            manufacturer: { type: "string" },
            package: { type: "string" },
            categorySlug: { type: "string" },
            category: { $ref: "#/components/schemas/LocalizedString" },
            description: { $ref: "#/components/schemas/LocalizedString" },
            specs: { type: "array", items: { $ref: "#/components/schemas/Spec" } },
            alternatives: { type: "array", items: { type: "string" } },
            provenance: { $ref: "#/components/schemas/LocalizedString" },
            lastChecked: { type: "string", format: "date" },
            links: { type: "object", properties: { self: { type: "string" }, web: { type: "string" }, datasheetSearch: { type: "string" } } },
          },
        },
        ComponentList: {
          type: "object",
          properties: { apiVersion: { type: "string" }, resource: { type: "string" }, count: { type: "integer" }, data: { type: "array", items: { $ref: "#/components/schemas/Component" } } },
        },
        ComponentEnvelope: {
          type: "object",
          properties: { apiVersion: { type: "string" }, resource: { type: "string" }, data: { $ref: "#/components/schemas/Component" } },
        },
      },
    },
  };
  return apiJson(spec);
}

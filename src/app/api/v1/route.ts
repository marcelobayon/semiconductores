import { apiJson, API_VERSION } from "@/lib/api";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const base = `${siteUrl}/api/${API_VERSION}`;
  return apiJson({
    name: "Semiconductores.net API",
    apiVersion: API_VERSION,
    status: "beta",
    access: "open, read-only (no key required)",
    documentation: `${siteUrl}/en/api`,
    openapi: `${siteUrl}/api/openapi.json`,
    endpoints: {
      components: `${base}/components`,
      component: `${base}/components/{slug}`,
      categories: `${base}/categories`,
    },
    notice: "Facts only: specifications from manufacturer datasheets. No pricing, stock, lead times, or purchase authorization.",
  });
}

import { categories } from "@/lib/catalog";
import { apiJson, API_VERSION } from "@/lib/api";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const data = categories().map((c) => ({
    ...c,
    links: { components: `${siteUrl}/api/${API_VERSION}/components`, web: `${siteUrl}/en/categories/${c.slug}` },
  }));
  return apiJson({ apiVersion: API_VERSION, resource: "categories", count: data.length, data });
}

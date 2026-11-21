import { catalog } from "@/lib/catalog";
import { apiJson, componentDTO, API_VERSION } from "@/lib/api";

export const dynamic = "force-static";

export function GET() {
  const data = catalog.map(componentDTO);
  return apiJson({ apiVersion: API_VERSION, resource: "components", count: data.length, data });
}

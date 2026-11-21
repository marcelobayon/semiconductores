import { catalog, getPart } from "@/lib/catalog";
import { apiJson, componentDTO, API_VERSION } from "@/lib/api";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const part = getPart(params.slug);
  if (!part) return apiJson({ apiVersion: API_VERSION, error: "not_found", slug: params.slug }, 404);
  return apiJson({ apiVersion: API_VERSION, resource: "component", data: componentDTO(part) });
}

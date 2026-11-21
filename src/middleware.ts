import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function pickLocale(req: NextRequest): string {
  const cookie = req.cookies.get("LANG")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.startsWith("es") || al.includes(",es") || al.includes(" es")) return "es";
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = (locales as readonly string[]).some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, API routes, and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

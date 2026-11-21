import "./globals.css";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Semiconductores.net", template: "%s — Semiconductores.net" },
  description: "Bilingual semiconductor commerce & intelligence platform for engineers and AI agents.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import "./globals.css";
import "../styles/features/calculators.css";
import "../styles/features/component.css";
import "../styles/features/education.css";
import "../styles/features/bom.css";
import "../styles/features/api.css";
import "../styles/features/research.css";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Semiconductores.net", template: "%s — Semiconductores.net" },
  description: "Bilingual semiconductor commerce & intelligence platform for engineers and AI agents.",
  robots: { index: true, follow: true },
  openGraph: { siteName: "Semiconductores.net", type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

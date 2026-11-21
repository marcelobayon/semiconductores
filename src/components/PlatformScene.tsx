"use client";
import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";

const FabScene = dynamic(() => import("@/components/FabScene"), {
  ssr: false,
  loading: () => <div className="scene-loading">Initializing cleanroom…</div>,
});

export default function PlatformScene({ locale }: { locale: Locale }) {
  return <FabScene locale={locale} />;
}

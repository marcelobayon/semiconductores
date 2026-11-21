"use client";
import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

const FabScene = dynamic(() => import("@/components/FabScene"), {
  ssr: false,
  loading: () => <div className="scene-loading">Initializing cleanroom…</div>,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    console.error("3D scene failed", err);
  }
  render() {
    if (this.state.failed) {
      return <div className="scene-loading">3D scene unavailable here — the routes below work without it.</div>;
    }
    return this.props.children;
  }
}

export default function PlatformScene({ locale }: { locale: Locale }) {
  return (
    <SceneBoundary>
      <FabScene locale={locale} />
    </SceneBoundary>
  );
}

"use client";

import { useEffect } from "react";
import { trackCtaClick } from "@/lib/analytics";

export default function AnalyticsClickTracker() {
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const ctaNode = target?.closest<HTMLElement>("[data-analytics-cta='1']");
      if (!ctaNode) return;

      const label = ctaNode.dataset.analyticsLabel || ctaNode.textContent?.trim() || "CTA";
      const destination = ctaNode.dataset.analyticsDestination;
      const context = ctaNode.dataset.analyticsContext;
      const funnel = ctaNode.closest<HTMLElement>("[data-funnel-slug]")?.dataset.funnelSlug;

      trackCtaClick({
        label,
        destination,
        funnel,
        context,
      });
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return null;
}

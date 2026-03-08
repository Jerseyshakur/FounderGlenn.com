"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type FunnelProgressTrackerProps = {
  funnel: string;
};

const THRESHOLDS = [25, 50, 75, 90] as const;

export default function FunnelProgressTracker({ funnel }: FunnelProgressTrackerProps) {
  const firedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedThresholds.current.has(threshold)) {
          firedThresholds.current.add(threshold);
          trackEvent("funnel_progress", {
            funnel,
            progress_percent: threshold,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [funnel]);

  return null;
}

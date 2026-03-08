"use client";

import { useEffect } from "react";
import { trackViewItem, type AnalyticsItem } from "@/lib/analytics";

type ViewItemTrackerProps = {
  item: AnalyticsItem;
  context?: string;
};

export default function ViewItemTracker({ item, context }: ViewItemTrackerProps) {
  useEffect(() => {
    trackViewItem(item, { context });
  }, [context, item]);

  return null;
}

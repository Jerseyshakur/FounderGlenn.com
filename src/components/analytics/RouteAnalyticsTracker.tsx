"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export default function RouteAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const query = typeof window !== "undefined" ? window.location.search : "";
    trackPageView(pathname || "/", query);
  }, [pathname]);

  return null;
}

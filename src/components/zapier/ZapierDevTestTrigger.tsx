"use client";

import { useEffect } from "react";
import { sendZapierTestEvent } from "@/lib/zapier";

declare global {
  interface Window {
    __fgZapierDevTestSent?: boolean;
  }
}

export default function ZapierDevTestTrigger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (window.__fgZapierDevTestSent) return;

    window.__fgZapierDevTestSent = true;
    void sendZapierTestEvent();
  }, []);

  return null;
}

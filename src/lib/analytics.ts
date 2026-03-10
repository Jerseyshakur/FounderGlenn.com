"use client";

export type AnalyticsEventName =
  | "page_view"
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "cta_click"
  | "funnel_progress";

export type AnalyticsItem = {
  item_id?: string;
  item_name?: string;
  item_category?: string;
  price?: number;
  currency?: string;
  quantity?: number;
};

export type AnalyticsEventPayload = {
  route?: string;
  path?: string;
  url?: string;
  referrer?: string;
  funnel?: string;
  cta_label?: string;
  destination?: string;
  value?: number;
  currency?: string;
  items?: AnalyticsItem[];
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function getCurrentPathWithQuery(): string {
  if (typeof window === "undefined") return "/";
  const query = window.location.search || "";
  return `${window.location.pathname}${query}`;
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsEventPayload = {}): void {
  if (typeof window === "undefined") return;
  if (!window.dataLayer) window.dataLayer = [];

  const defaultPayload: AnalyticsEventPayload = {
    path: getCurrentPathWithQuery(),
    route: window.location.pathname,
    url: window.location.href,
    referrer: document.referrer || undefined,
  };

  window.dataLayer.push({
    event,
    ...defaultPayload,
    ...payload,
  });
}

export function trackPageView(pathname: string, search: string = ""): void {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const utm_source = params.get("utm_source") || undefined;
  const utm_medium = params.get("utm_medium") || undefined;
  const utm_campaign = params.get("utm_campaign") || undefined;
  const utm_term = params.get("utm_term") || undefined;
  const utm_content = params.get("utm_content") || undefined;

  // In GA fallback mode (no GTM), send SPA pageviews via gtag only.
  // This avoids duplicating page_view through both dataLayer and gtag.
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      page_title: document.title,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    });
    return;
  }

  // GTM path: push page_view once to dataLayer for container-driven routing.
  trackEvent("page_view", {
    path: `${pathname}${search}`,
    route: pathname,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  });
}

export function trackViewItem(item: AnalyticsItem, extra: AnalyticsEventPayload = {}): void {
  trackEvent("view_item", {
    items: [item],
    currency: item.currency,
    value: item.price,
    ...extra,
  });
}

export function trackAddToCart(item: AnalyticsItem, extra: AnalyticsEventPayload = {}): void {
  trackEvent("add_to_cart", {
    items: [{ quantity: 1, ...item }],
    currency: item.currency,
    value: item.price,
    ...extra,
  });
}

export function trackBeginCheckout(items: AnalyticsItem[] = [], extra: AnalyticsEventPayload = {}): void {
  trackEvent("begin_checkout", {
    items,
    ...extra,
  });
}

export function trackPurchase(items: AnalyticsItem[] = [], extra: AnalyticsEventPayload = {}): void {
  // For this headless Shopify setup, purchase confirmation typically occurs on Shopify-hosted surfaces.
  // Call this only when a trusted post-checkout signal is available to the Next.js app.
  trackEvent("purchase", {
    items,
    ...extra,
  });
}

export function trackCtaClick(input: {
  label: string;
  destination?: string;
  funnel?: string;
  context?: string;
}): void {
  trackEvent("cta_click", {
    cta_label: input.label,
    destination: input.destination,
    funnel: input.funnel,
    context: input.context,
  });
}

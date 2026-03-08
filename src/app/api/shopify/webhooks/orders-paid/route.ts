import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sendZapierEvent } from "@/lib/zapier";

export const runtime = "nodejs";

type ShopifyOrderLineItem = {
  title?: string;
  name?: string;
  quantity?: number;
  sku?: string | null;
  variant_title?: string | null;
  handle?: string;
};

type ShopifyOrderWebhookPayload = {
  id?: number | string;
  name?: string;
  order_number?: number | string;
  email?: string | null;
  contact_email?: string | null;
  current_total_price?: string | number | null;
  total_price?: string | number | null;
  currency?: string | null;
  line_items?: ShopifyOrderLineItem[];
  customer?: {
    email?: string | null;
  } | null;
};

function verifyShopifyWebhook(rawBody: string, hmacHeader: string, secret: string): boolean {
  const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");

  const expected = Buffer.from(digest, "base64");
  const received = Buffer.from(hmacHeader, "base64");

  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

function normalizePaidOrderPayload(order: ShopifyOrderWebhookPayload) {
  const lineItems = Array.isArray(order.line_items) ? order.line_items : [];
  const products = lineItems.map((line) => ({
    title: line.title || line.name || "Untitled item",
    handle: line.handle || null,
    sku: line.sku || null,
    variantTitle: line.variant_title || null,
    quantity: Number(line.quantity ?? 0),
  }));

  return {
    orderId: order.id ? String(order.id) : undefined,
    orderName: order.name || (order.order_number ? `#${order.order_number}` : undefined),
    email: order.email || order.contact_email || order.customer?.email || undefined,
    totalPrice:
      order.current_total_price !== null && order.current_total_price !== undefined
        ? String(order.current_total_price)
        : order.total_price !== null && order.total_price !== undefined
          ? String(order.total_price)
          : undefined,
    currency: order.currency || undefined,
    itemCount: products.reduce((sum, product) => sum + (Number.isFinite(product.quantity) ? product.quantity : 0), 0),
    products,
    checkoutSource: "shopify-webhook-orders-paid",
  };
}

export async function POST(request: Request) {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
  if (!hmacHeader) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const topicHeader = request.headers.get("x-shopify-topic");
  if (topicHeader !== "orders/paid") {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const rawBody = await request.text();
  const isValid = verifyShopifyWebhook(rawBody, hmacHeader, webhookSecret);
  if (!isValid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody) as ShopifyOrderWebhookPayload;

    // Completed purchase must be sent server-side from a trusted Shopify webhook.
    // Browser tracking only captures intent (e.g. begin_checkout), not verified payment completion.
    await sendZapierEvent("purchase_completed", normalizePaidOrderPayload(payload));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

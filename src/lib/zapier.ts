/**
 * Reusable Zapier webhook helper for lightweight website automations.
 *
 * Common event names we will send:
 * - funnel_lead
 * - newsletter_signup
 * - kit_purchase_interest
 * - contact_form
 * - waitlist_signup
 *
 * Example usage (do not auto-fire; call from form/funnel handlers):
 * await sendZapierEvent("funnel_lead", {
 *   email,
 *   funnel: "legal",
 * });
 */
export async function sendZapierEvent(eventName: string, payload: Record<string, unknown>) {
  const webhook = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL;

  if (!webhook) {
    return;
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: eventName,
        site: "founderglenn.com",
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    });
  } catch {}
}

export async function sendZapierTestEvent() {
  await sendZapierEvent("funnel_lead", {
    email: "test@founderglenn.com",
    funnel: "legal",
  });
}

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? "https://wu8ctw-1g.myshopify.com";
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "6d82559564b46dd7be0964e398a67f58";

const KIT_HANDLES = [
  "ceo-confessions",
  "emotional-intelligence",
  "leadership-and-love",
  "legacy-and-longevity",
  "paperwork-and-pillow-talk",
  "the-fatherhood-framework",
  "the-heart-ledger",
  "the-mogul-mindset-kit",
  "the-pre-trust-toolkit",
  "trust-before-touch",
  "universal-red-flags",
  "the-signback",
  "the-sync-bag",
  "fan-funnel-kit",
  "sample-clearance-kit",
  "rollout-kit",
  "label-deal-kit",
  "how-to-start-an-indie-record-label",
  "distribution-protection-kit",
  "artist-legal-glossary",
  "seven-steps-to-get-paid",
  "seven-steps-to-find-every-dollar",
  "seven-steps-to-claim-every-royalty",
];

async function queryProductByHandle(handle) {
  const endpoint = `${STORE_DOMAIN}/api/2025-04/graphql.json`;
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        selectedOrFirstAvailableVariant {
          id
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables: { handle } }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for handle "${handle}"`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }

  return payload.data?.productByHandle ?? null;
}

async function main() {
  const rows = [];
  for (const handle of KIT_HANDLES) {
    try {
      const product = await queryProductByHandle(handle);
      rows.push({
        requestedHandle: handle,
        found: product ? "yes" : "no",
        title: product?.title ?? "",
        handle: product?.handle ?? "",
        productId: product?.id ?? "",
        firstAvailableVariantId: product?.selectedOrFirstAvailableVariant?.id ?? "",
      });
    } catch (error) {
      rows.push({
        requestedHandle: handle,
        found: "error",
        title: "",
        handle: "",
        productId: "",
        firstAvailableVariantId: "",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  console.table(rows);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


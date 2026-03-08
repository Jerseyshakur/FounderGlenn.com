import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FunnelPageTemplate } from "@/components/funnel";
import type { FunnelPageConfig } from "@/components/funnel";
import ViewItemTracker from "@/components/analytics/ViewItemTracker";
import { getFunnelConfig } from "@/content/funnels";
import { getShopifyProductByHandle, type ShopifyProductSummary } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Royalty Survival Kit",
  description:
    "Find every dollar your music earns with a premium royalty recovery funnel for artists who already have music out.",
  alternates: {
    canonical: "/royalties",
  },
};

const ROYALTY_PRIMARY_HANDLE_CANDIDATES = [
  "royalty-survival-kit",
  "seven-steps-to-find-every-dollar",
  "seven-steps-to-claim-every-royalty",
];

const ROYALTY_SUPPORTING_PRODUCT_HANDLES: Record<string, string[]> = {
  "7 Steps to Find Every Dollar": ["seven-steps-to-find-every-dollar"],
  "7 Steps to Claim Every Royalty": ["seven-steps-to-claim-every-royalty"],
  "Artist Legal Glossary": ["artist-legal-glossary"],
};

async function resolveFirstProduct(handles: string[]) {
  for (const handle of handles) {
    try {
      const product = await getShopifyProductByHandle(handle);
      if (product?.variantId) return product;
    } catch {
      // Try next handle.
    }
  }
  return null;
}

async function resolveSupportingVariants() {
  const entries = await Promise.all(
    Object.entries(ROYALTY_SUPPORTING_PRODUCT_HANDLES).map(async ([title, handles]) => {
      const product = await resolveFirstProduct(handles);
      return [title, product] as const;
    }),
  );
  return new Map(entries);
}

function buildRoyaltiesConfig(
  base: FunnelPageConfig,
  primaryProduct: ShopifyProductSummary | null,
  supportingVariantMap: Map<string, ShopifyProductSummary | null>,
): FunnelPageConfig {
  const next = structuredClone(base);

  if (primaryProduct?.variantId) {
    next.hero.primaryAction = {
      type: "shopify-add",
      label: "Add Royalty Survival Kit to Cart",
      variantId: primaryProduct.variantId,
      productHandle: primaryProduct.handle,
      productTitle: primaryProduct.title,
      productCategory: "kits",
      priceAmount: primaryProduct.priceAmount,
      priceCurrencyCode: primaryProduct.priceCurrencyCode,
    };
    next.hero.secondaryAction = {
      type: "open-cart",
      label: "Open Cart",
    };
    if (next.cta) {
      next.cta.primaryAction = {
        type: "shopify-add",
        label: "Add Royalty Survival Kit to Cart",
        variantId: primaryProduct.variantId,
        productHandle: primaryProduct.handle,
        productTitle: primaryProduct.title,
        productCategory: "kits",
        priceAmount: primaryProduct.priceAmount,
        priceCurrencyCode: primaryProduct.priceCurrencyCode,
      };
      next.cta.secondaryAction = {
        type: "open-cart",
        label: "Open Cart",
      };
    }
  }

  if (next.upsells) {
    next.upsells.items = next.upsells.items.map((item) => {
      const product = supportingVariantMap.get(item.title);
      if (!product?.variantId) return item;
      return {
        ...item,
        action: {
          type: "shopify-add" as const,
          label: "Add to Cart",
          variantId: product.variantId,
          productHandle: product.handle,
          productTitle: product.title,
          productCategory: "kits",
          priceAmount: product.priceAmount,
          priceCurrencyCode: product.priceCurrencyCode,
        },
      };
    });
  }

  return next;
}

export default async function RoyaltiesPage() {
  const baseConfig = getFunnelConfig("royalties");
  if (!baseConfig) notFound();

  const [primaryProduct, supportingVariantMap] = await Promise.all([
    resolveFirstProduct(ROYALTY_PRIMARY_HANDLE_CANDIDATES),
    resolveSupportingVariants(),
  ]);

  const config = buildRoyaltiesConfig(baseConfig, primaryProduct, supportingVariantMap);

  return (
    <>
      {primaryProduct ? (
        <ViewItemTracker
          item={{
            item_id: primaryProduct.handle,
            item_name: primaryProduct.title,
            item_category: "kits",
            price: primaryProduct.priceAmount ? Number(primaryProduct.priceAmount) : undefined,
            currency: primaryProduct.priceCurrencyCode,
          }}
          context="royalties-funnel-primary-offer"
        />
      ) : null}
      <FunnelPageTemplate config={config} />
    </>
  );
}

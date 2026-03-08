import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FunnelPageTemplate } from "@/components/funnel";
import type { FunnelPageConfig } from "@/components/funnel";
import ViewItemTracker from "@/components/analytics/ViewItemTracker";
import { getFunnelConfig } from "@/content/funnels";
import { KITS } from "@/content/kits";
import { getShopifyProductByHandle, type ShopifyProductSummary } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Indie Artist Legal Kit",
  description:
    "Protect your music before anyone steals your rights. A premium legal funnel for independent artists by Founder Glenn.",
  alternates: {
    canonical: "/legal",
  },
};

const LEGAL_PRIMARY_HANDLE = "indie-artist-legal-kit";
const LEGAL_PRIMARY_SLUG = "indie-artist-legal-kit";

async function resolveLegalVariant() {
  try {
    const product = await getShopifyProductByHandle(LEGAL_PRIMARY_HANDLE);
    if (product?.variantId) return product;
  } catch {
    // Keep funnel rendering if Shopify is temporarily unavailable.
  }
  return null;
}

function buildLegalConfig(
  base: FunnelPageConfig,
  product: ShopifyProductSummary | null,
): FunnelPageConfig {
  const next = structuredClone(base);
  const legalKit = KITS.find((kit) => kit.slug === LEGAL_PRIMARY_SLUG) ?? null;

  next.hero.media = {
    src: legalKit?.coverSrc || "/indie-artist-legal-kit.png",
    alt: legalKit?.title || "Sign Here: The Indie Artist Legal Kit",
    caption: legalKit?.title || "Sign Here: The Indie Artist Legal Kit",
  };

  if (!product?.variantId) return next;

  next.hero.primaryAction = {
    type: "shopify-add",
    label: "Add Legal Kit to Cart",
    variantId: product.variantId,
    productHandle: product.handle,
    productTitle: product.title,
    productCategory: "kits",
    priceAmount: product.priceAmount,
    priceCurrencyCode: product.priceCurrencyCode,
  };
  next.hero.secondaryAction = {
    type: "open-cart",
    label: "Open Cart",
  };

  if (next.cta) {
    next.cta.primaryAction = {
      type: "shopify-add",
      label: "Add Legal Kit to Cart",
      variantId: product.variantId,
      productHandle: product.handle,
      productTitle: product.title,
      productCategory: "kits",
      priceAmount: product.priceAmount,
      priceCurrencyCode: product.priceCurrencyCode,
    };
    next.cta.secondaryAction = {
      type: "open-cart",
      label: "Open Cart",
    };
  }

  return next;
}

export default async function LegalPage() {
  const baseConfig = getFunnelConfig("legal");
  if (!baseConfig) notFound();

  const legalVariant = await resolveLegalVariant();
  const config = buildLegalConfig(baseConfig, legalVariant);

  return (
    <>
      {legalVariant ? (
        <ViewItemTracker
          item={{
            item_id: legalVariant.handle,
            item_name: legalVariant.title,
            item_category: "kits",
            price: legalVariant.priceAmount ? Number(legalVariant.priceAmount) : undefined,
            currency: legalVariant.priceCurrencyCode,
          }}
          context="legal-funnel-primary-offer"
        />
      ) : null}
      <FunnelPageTemplate config={config} />
    </>
  );
}

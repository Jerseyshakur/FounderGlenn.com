"use client";

import { useEffect, useState } from "react";
import { SHOPIFY_PUBLIC_STOREFRONT_TOKEN, SHOPIFY_STORE_DOMAIN } from "@/lib/shopify";
import { trackAddToCart, trackBeginCheckout } from "@/lib/analytics";
import { sendZapierEvent } from "@/lib/zapier";

const STORE_ID = "fg-shopify-store";
const CART_ID = "fg-shopify-cart";

type ShopifyCartElement = HTMLElement & {
  showModal: () => void;
  addLine: (source: Event | { variantId: string; quantity?: number }) => ShopifyCartElement;
};

type ShopifyCartDataEventDetail = {
  totalQuantity?: number;
  lines?: { nodes?: unknown[] };
};

declare global {
  interface Window {
    __fgOpenCart?: () => void;
  }
}

export function ShopifyRuntime() {
  const [cartHasItems, setCartHasItems] = useState(false);

  const handleCheckoutIntent = async () => {
    trackBeginCheckout([], { context: "shopify-cart-checkout" });

    // Strongest reliable site-side commerce signal is begin_checkout.
    // Completed purchase occurs on Shopify-controlled surfaces (needs Shopify webhook/server callback later).
    await sendZapierEvent("begin_checkout", {
      checkoutSource: "shopify-cart",
      funnelSource: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  };

  useEffect(() => {
    const cartEl = document.getElementById(CART_ID);
    if (!cartEl) return;

    const onCartData = (event: Event) => {
      const { detail } = event as CustomEvent<ShopifyCartDataEventDetail>;
      const qty = typeof detail?.totalQuantity === "number" ? detail.totalQuantity : 0;
      const nodes = detail?.lines?.nodes;
      const lineCount = Array.isArray(nodes) ? nodes.length : 0;
      setCartHasItems(qty > 0 || lineCount > 0);
    };

    cartEl.addEventListener("shopify:cartData", onCartData);
    return () => cartEl.removeEventListener("shopify:cartData", onCartData);
  }, []);

  useEffect(() => {
    const itemFromActionNode = (actionNode: HTMLElement) => {
      const rawPrice = actionNode.dataset.shopifyPrice;
      const parsedPrice = rawPrice ? Number(rawPrice) : undefined;
      return {
        item_id: actionNode.dataset.shopifyProductHandle || actionNode.dataset.shopifyVariantId,
        item_name: actionNode.dataset.shopifyProductTitle,
        item_category: actionNode.dataset.shopifyProductCategory,
        price: Number.isFinite(parsedPrice) ? parsedPrice : undefined,
        currency: actionNode.dataset.shopifyCurrency,
      };
    };

    const openCart = () => {
      const cart = document.getElementById(CART_ID) as ShopifyCartElement | null;
      cart?.showModal();
    };
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const actionNode = target?.closest<HTMLElement>("[data-shopify-action]");
      if (!actionNode) return;

      // Use delegated handlers so actions inside <template> output
      // (rendered by Shopify components, outside React tree) still work.
      const action = actionNode.dataset.shopifyAction;
      const explicitVariantId = actionNode.dataset.shopifyVariantId;
      if (action === "open-cart") {
        openCart();
        return;
      }
      if (action === "add-line") {
        const cart = document.getElementById(CART_ID) as ShopifyCartElement | null;
        if (!cart) return;
        trackAddToCart(itemFromActionNode(actionNode), { context: "shopify-add-line" });
        if (explicitVariantId) {
          cart.addLine({ variantId: explicitVariantId, quantity: 1 }).showModal();
          return;
        }
        cart.addLine(event).showModal();
      }
      if (action === "buy-now") {
        trackAddToCart(itemFromActionNode(actionNode), { context: "shopify-buy-now" });
        if (explicitVariantId) {
          const cart = document.getElementById(CART_ID) as ShopifyCartElement | null;
          cart?.addLine({ variantId: explicitVariantId, quantity: 1 }).showModal();
          return;
        }
        const store = document.getElementById(STORE_ID) as
          | (HTMLElement & { buyNow: (source: Event) => void })
          | null;
        store?.buyNow(event);
      }
    };

    window.__fgOpenCart = openCart;
    document.addEventListener("click", onDocumentClick);

    return () => {
      delete window.__fgOpenCart;
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <>
      <shopify-store
        id={STORE_ID}
        store-domain={SHOPIFY_STORE_DOMAIN}
        public-access-token={SHOPIFY_PUBLIC_STOREFRONT_TOKEN}
        country="US"
        language="en"
      />
      <shopify-cart id={CART_ID} className={cartHasItems ? undefined : "fg-cart-empty"}>
        <div slot="empty" hidden aria-hidden="true" />
        {cartHasItems ? (
          <button
            slot="checkout-button"
            type="button"
            onClick={() => {
              void handleCheckoutIntent();
            }}
          >
            Checkout
          </button>
        ) : (
          <span slot="checkout-button" hidden aria-hidden="true" />
        )}
      </shopify-cart>
    </>
  );
}

export function ShopifyCartButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.__fgOpenCart?.()}
      className={className}
      aria-label="Open cart"
    >
      Cart
    </button>
  );
}


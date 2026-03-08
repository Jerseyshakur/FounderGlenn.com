"use client";

import { useEffect } from "react";
import { SHOPIFY_PUBLIC_STOREFRONT_TOKEN, SHOPIFY_STORE_DOMAIN } from "@/lib/shopify";

const STORE_ID = "fg-shopify-store";
const CART_ID = "fg-shopify-cart";

type ShopifyCartElement = HTMLElement & {
  showModal: () => void;
  addLine: (source: Event | { variantId: string; quantity?: number }) => ShopifyCartElement;
};

declare global {
  interface Window {
    __fgOpenCart?: () => void;
  }
}

export function ShopifyRuntime() {
  useEffect(() => {
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
      if (action === "add-line") {
        const cart = document.getElementById(CART_ID) as ShopifyCartElement | null;
        if (!cart) return;
        if (explicitVariantId) {
          cart.addLine({ variantId: explicitVariantId, quantity: 1 }).showModal();
          return;
        }
        cart.addLine(event).showModal();
      }
      if (action === "buy-now") {
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
      <shopify-cart id={CART_ID}>
        <div slot="empty" className="text-sm text-zinc-300">
          Your cart is empty.
        </div>
        <div slot="checkout-button">Checkout</div>
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


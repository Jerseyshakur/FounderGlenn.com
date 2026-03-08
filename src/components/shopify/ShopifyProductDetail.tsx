import ViewItemTracker from "@/components/analytics/ViewItemTracker";

type ShopifyProductDetailProps = {
  handle: string;
  kindLabel: string;
  backHref: string;
  backLabel: string;
};

export default function ShopifyProductDetail({
  handle,
  kindLabel,
  backHref,
  backLabel,
}: ShopifyProductDetailProps) {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <ViewItemTracker item={{ item_id: handle, item_category: kindLabel.toLowerCase() }} context="product-detail" />
      <shopify-context type="product" handle={handle}>
        <template>
          <article className="mx-auto max-w-5xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{kindLabel}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              <shopify-data query="product.title" />
            </h1>

            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,360px),1fr]">
              <div className="overflow-hidden border border-white/10 bg-black/40">
                <div className="aspect-[3/4] w-full">
                  <shopify-media query="product.selectedOrFirstAvailableVariant.image" width="720" height="960" />
                </div>
              </div>

              <div>
                <p className="text-base leading-relaxed text-zinc-300">
                  <shopify-data query="product.description" />
                </p>

                <div className="mt-6 text-xl font-semibold text-white">
                  <shopify-money
                    query="product.selectedOrFirstAvailableVariant.price"
                    format="money_with_currency"
                  />
                </div>

                <div className="mt-6">
                  <shopify-variant-selector />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    data-shopify-action="add-line"
                    data-shopify-product-handle={handle}
                    data-shopify-product-category={kindLabel.toLowerCase()}
                    shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale"
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    data-shopify-action="buy-now"
                    data-shopify-product-handle={handle}
                    data-shopify-product-category={kindLabel.toLowerCase()}
                    shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale"
                    className="rounded-full border border-white/20 bg-white text-sm font-semibold text-black px-5 py-2.5 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>

            <a
              href={backHref}
              className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              {backLabel}
            </a>
          </article>
        </template>
        <article
          shopify-loading-placeholder=""
          className="mx-auto max-w-5xl border border-white/10 bg-white/[0.02] p-8 md:p-12"
        >
          <div className="h-4 w-24 bg-white/10" />
          <div className="mt-4 h-10 w-2/3 bg-white/10" />
          <div className="mt-8 h-[420px] w-full bg-white/5" />
        </article>
      </shopify-context>
    </main>
  );
}


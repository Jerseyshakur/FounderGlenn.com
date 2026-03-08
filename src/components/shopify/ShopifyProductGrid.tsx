import type { ShopifyProductSummary } from "@/lib/shopify";

type ShopifyProductGridProps = {
  products: ShopifyProductSummary[];
  collectionHandle?: string | null;
  routeBase: "/books" | "/kits" | "/essays";
  emptyLabel: string;
};

function ProductCardTemplate({ routeBase }: { routeBase: ShopifyProductGridProps["routeBase"] }) {
  return (
    <article className="group block" shopify-attr--id="product.handle">
      <a
        className="block"
        shopify-attr--href={`'${routeBase}/' + product.handle`}
      >
        <div className="overflow-hidden border border-white/10 bg-white/[0.02]">
          <div className="aspect-[3/4] w-full bg-black/30">
            <shopify-media query="product.featuredImage" width="640" height="800" />
          </div>
        </div>
        <p className="mt-3 text-sm font-medium leading-snug text-zinc-100">
          <shopify-data query="product.title" />
        </p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          <shopify-data query="product.description" />
        </p>
      </a>

      <div className="mt-3 flex items-center justify-between gap-3">
        <shopify-money
          className="text-sm text-zinc-300"
          query="product.selectedOrFirstAvailableVariant.price"
          format="money_with_currency"
        />
        <button
          type="button"
          data-shopify-action="add-line"
          shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale"
          className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </article>
  );
}

export default function ShopifyProductGrid({
  products,
  collectionHandle,
  routeBase,
  emptyLabel,
}: ShopifyProductGridProps) {
  if (collectionHandle) {
    return (
      <shopify-context type="collection" handle={collectionHandle}>
        <template>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            <shopify-list-context type="product" query="collection.products" first="80">
              <template>
                <ProductCardTemplate routeBase={routeBase} />
              </template>
            </shopify-list-context>
          </div>
        </template>
        <div
          shopify-loading-placeholder=""
          className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <article key={`loading-${index}`} className="block animate-pulse" aria-hidden="true">
              <div className="aspect-[3/4] border border-white/10 bg-white/[0.02]" />
              <div className="mt-3 h-3 w-3/4 bg-white/10" />
              <div className="mt-2 h-3 w-1/2 bg-white/10" />
            </article>
          ))}
        </div>
      </shopify-context>
    );
  }

  if (products.length === 0) {
    return <p className="text-sm text-zinc-400">{emptyLabel}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <shopify-context key={product.handle} type="product" handle={product.handle}>
          <template>
            <ProductCardTemplate routeBase={routeBase} />
          </template>
          <article
            shopify-loading-placeholder=""
            className="block animate-pulse"
            aria-hidden="true"
          >
            <div className="aspect-[3/4] border border-white/10 bg-white/[0.02]" />
            <div className="mt-3 h-3 w-3/4 bg-white/10" />
            <div className="mt-2 h-3 w-1/2 bg-white/10" />
          </article>
        </shopify-context>
      ))}
    </div>
  );
}


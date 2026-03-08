import type { Metadata } from "next";
import Link from "next/link";
import ShopifyProductGrid from "@/components/shopify/ShopifyProductGrid";
import { getShopifyProductsByCategory } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Kits",
  description: "Kits organized by IP universe.",
};

export default async function KitsPage() {
  const { products, collectionHandle } = await getShopifyProductsByCategory("kits");

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Kits</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">KITS</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">Frameworks and toolkits organized by universe.</p>
        </header>

        <ShopifyProductGrid
          products={products}
          collectionHandle={collectionHandle}
          routeBase="/kits"
          emptyLabel="No kits available in Shopify yet."
        />

        <div className="mt-10">
          <Link
            href="/books"
            className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    </main>
  );
}

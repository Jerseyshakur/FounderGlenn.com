import type { Metadata } from "next";
import Link from "next/link";
import ShopifyProductGrid from "@/components/shopify/ShopifyProductGrid";
import { getShopifyProductsByCategory } from "@/lib/shopify";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Essays",
  description: "Founder Glenn essays on systems, economics, sovereignty, and creator infrastructure.",
  alternates: {
    canonical: "/essays",
  },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl("/essays"),
    siteName: seoConfig.siteName,
    title: "Essays | Founder Glenn",
    description: "Founder Glenn essays on systems, economics, sovereignty, and creator infrastructure.",
    images: [{ url: resolveOgImage() }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Essays | Founder Glenn",
    description: "Founder Glenn essays on systems, economics, sovereignty, and creator infrastructure.",
    images: [resolveOgImage()],
  },
};

export default async function EssaysPage() {
  const { products, collectionHandle } = await getShopifyProductsByCategory("essays");

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Essays</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">ESSAYS</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Essays on systems, economics, sovereignty, and infrastructure for creators.
          </p>
        </header>

        <ShopifyProductGrid
          products={products}
          collectionHandle={collectionHandle}
          routeBase="/essays"
          emptyLabel="No essays available in Shopify yet."
        />

        <Link
          href="/books"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Collections
        </Link>
      </div>
    </main>
  );
}

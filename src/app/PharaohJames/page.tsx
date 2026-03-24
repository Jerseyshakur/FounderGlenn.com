import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ShopifyProductDetail from "@/components/shopify/ShopifyProductDetail";
import { PHARAOH_JAMES_HOODIE_SHOPIFY_HANDLE } from "@/content/pharaoh-james-shop";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

const PATH = "/PharaohJames";
const TITLE = "Pharaoh James — Autism Texas Hoodie";
const DESCRIPTION =
  "Autism Texas print hoodie from Pharaoh James — premium fleece-style hoodie celebrating neurodiversity and Texas pride, available through Founder Glenn.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl(PATH),
    siteName: seoConfig.siteName,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: resolveOgImage("/images/pharaoh-james-autism-texas-hoodie.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [resolveOgImage("/images/pharaoh-james-autism-texas-hoodie.png")],
  },
};

export default function PharaohJamesPage() {
  if (PHARAOH_JAMES_HOODIE_SHOPIFY_HANDLE) {
    return (
      <ShopifyProductDetail
        handle={PHARAOH_JAMES_HOODIE_SHOPIFY_HANDLE}
        kindLabel="Apparel"
        backHref="/PharaohGlenn"
        backLabel="About Pharaoh Glenn"
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-5xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Pharaoh James · Shop</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Autism Texas Print Hoodie
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          Fleece hoodie with the Autism Texas print — worn and represented by Pharaoh James. When the
          storefront connection is live, pricing and checkout will appear here automatically.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,400px),1fr] md:items-start">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <Image
              src="/images/pharaoh-james-autism-texas-hoodie.png"
              alt="Pharaoh James wearing the Autism Texas print hoodie"
              width={800}
              height={1000}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Product</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                <li>
                  <span className="font-semibold text-white">Name:</span> Autism Texas Print Hoodie
                </li>
                <li>
                  <span className="font-semibold text-white">Curated by:</span> Pharaoh James
                </li>
                <li>
                  <span className="font-semibold text-white">Store:</span> Founder Glenn / family catalog
                </li>
              </ul>
            </section>

            <p className="text-sm leading-relaxed text-zinc-400">
              Online checkout for this hoodie is being connected to the store. Use{" "}
              <span className="text-zinc-300">Inquire to purchase</span> for now and we&apos;ll route you
              to the right link or size.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Inquire to purchase
              </Link>
              <Link
                href="/PharaohGlenn"
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                About Pharaoh Glenn
              </Link>
              <Link
                href="/founder-glenn"
                className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Founder Glenn
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

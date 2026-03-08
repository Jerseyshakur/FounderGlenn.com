import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/CoverImage";
import { KITS } from "@/content/kits";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";
import { hydrateLocalCatalogWithShopify } from "@/lib/shopify";

type KitPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return KITS.map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }: KitPageProps) {
  const kit = KITS.find((entry) => entry.slug === params.slug);
  if (!kit) {
    return {};
  }

  const hydrated = await hydrateLocalCatalogWithShopify("kits", [kit]);
  const matched = hydrated.items[0]?.shopify ?? null;

  const path = `/kits/${kit.slug}`;
  const title = `${kit.title} | Kits`;
  const description = matched?.description || `${kit.title} toolkit by ${seoConfig.person.name}.`;
  const ogImage = resolveOgImage(kit.coverSrc || matched?.featuredImageUrl);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: buildAbsoluteUrl(path),
      siteName: seoConfig.siteName,
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  } satisfies Metadata;
}

export default async function KitDetailPage({ params }: KitPageProps) {
  const kit = KITS.find((entry) => entry.slug === params.slug);
  if (!kit) {
    notFound();
  }

  const hydrated = await hydrateLocalCatalogWithShopify("kits", [kit]);
  const matched = hydrated.items[0]?.shopify ?? null;
  const priceText =
    matched?.priceAmount && matched?.priceCurrencyCode
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: matched.priceCurrencyCode,
        }).format(Number(matched.priceAmount))
      : null;

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-4xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">Kit</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{kit.title}</h1>
        <p className="mt-4 text-base text-zinc-400">{matched?.description || "Coming Soon"}</p>

        <div className="mt-8 max-w-sm">
          <CoverImage kind="kits" slug={kit.slug} title={kit.title} src={kit.coverSrc || matched?.featuredImageUrl} />
        </div>

        {matched ? (
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Storefront</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-white">{priceText ?? "Available on Shopify"}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                {matched.availableForSale ? "In Stock" : "Unavailable"}
              </p>
            </div>
            {matched.variantId ? (
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-shopify-action="add-line"
                  data-shopify-variant-id={matched.variantId}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  data-shopify-action="buy-now"
                  data-shopify-variant-id={matched.variantId}
                  className="rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  Buy Now
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        <Link
          href="/kits"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Kits
        </Link>
      </div>
    </main>
  );
}

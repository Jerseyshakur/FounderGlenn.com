import type { Metadata } from "next";
import { BOOKS } from "@/content/books";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";
import CoverImage from "@/components/CoverImage";
import { hydrateLocalCatalogWithShopify } from "@/lib/shopify";

type EssayPageProps = {
  params: {
    slug: string;
  };
};

const essaysCatalog = BOOKS.filter((book) => book.category === "essays");

export async function generateStaticParams() {
  return essaysCatalog.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: EssayPageProps) {
  const essay = essaysCatalog.find((entry) => entry.slug === params.slug);
  if (!essay) {
    return {};
  }

  const hydrated = await hydrateLocalCatalogWithShopify("essays", [essay]);
  const matched = hydrated.items[0]?.shopify ?? null;

  const path = `/essays/${essay.slug}`;
  const title = `${essay.title} | Essays`;
  const description = matched?.description || `${essay.title} by ${seoConfig.person.name}.`;
  const ogImage = resolveOgImage(essay.coverSrc || matched?.featuredImageUrl);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
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

export default async function EssayPage({ params }: EssayPageProps) {
  const essay = essaysCatalog.find((entry) => entry.slug === params.slug);

  if (!essay) {
    notFound();
  }

  const hydrated = await hydrateLocalCatalogWithShopify("essays", [essay]);
  const matched = hydrated.items[0]?.shopify ?? null;
  const priceText =
    matched?.priceAmount && matched?.priceCurrencyCode
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: matched.priceCurrencyCode,
        }).format(Number(matched.priceAmount))
      : null;

  const essaySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: essay.title,
    description: matched?.description || `${essay.title} by ${seoConfig.person.name}.`,
    url: buildAbsoluteUrl(`/essays/${essay.slug}`),
    image: resolveOgImage(essay.coverSrc || matched?.featuredImageUrl),
    author: {
      "@type": "Person",
      name: seoConfig.person.name,
      alternateName: seoConfig.person.alternateName,
      url: seoConfig.person.url,
    },
    inLanguage: "en-US",
  };

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <script
          id="essay-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(essaySchema) }}
        />

        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Essay</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{essay.title}</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.12em] text-zinc-500">Founder Glenn</p>
        <p className="mt-6 text-lg text-zinc-400">{matched?.description || "Coming Soon"}</p>

        <div className="mt-8 max-w-xs">
          <CoverImage
            kind="essays"
            slug={essay.slug}
            title={essay.title}
            src={essay.coverSrc || matched?.featuredImageUrl}
          />
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
            <shopify-context type="product" handle={matched.handle}>
              <template>
                <div className="mt-4">
                  <shopify-variant-selector />
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    data-shopify-action="add-line"
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    data-shopify-action="buy-now"
                    className="rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                  >
                    Buy Now
                  </button>
                </div>
              </template>
            </shopify-context>
          </div>
        ) : null}

        <Link
          href="/essays"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Essays
        </Link>
      </article>
    </main>
  );
}

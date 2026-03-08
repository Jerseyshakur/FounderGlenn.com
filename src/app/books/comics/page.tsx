import type { Metadata } from "next";
import Link from "next/link";
import { BOOKS } from "@/content/books";
import CoverImage from "@/components/CoverImage";
import { hydrateLocalCatalogWithShopify } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Comics",
  description: "Comics catalog.",
};

const comicsCatalog = BOOKS.filter((book) => book.category === "comics");

export default async function ComicsPage() {
  const hydrated = await hydrateLocalCatalogWithShopify("comics", comicsCatalog);

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Comics</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">COMICS</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">Narratives, universes, and character arcs.</p>
        </header>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {hydrated.items.map((book) => {
            const priceText =
              book.shopify?.priceAmount && book.shopify?.priceCurrencyCode
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: book.shopify.priceCurrencyCode,
                  }).format(Number(book.shopify.priceAmount))
                : null;

            return (
              <article key={book.slug} className="group block">
                <Link href={`/books/${book.slug}`} className="block">
                  <CoverImage
                    kind="books"
                    slug={book.slug}
                    title={book.title}
                    src={book.coverSrc || book.shopify?.featuredImageUrl}
                  />
                  <p className="mt-3 text-sm leading-snug text-zinc-300 transition-colors group-hover:text-white">
                    {book.title}
                  </p>
                </Link>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">{priceText ?? "Coming Soon"}</p>
                  {book.shopify?.variantId ? (
                    <button
                      type="button"
                      data-shopify-action="add-line"
                      data-shopify-variant-id={book.shopify.variantId}
                      data-shopify-product-handle={book.shopify.handle}
                      data-shopify-product-title={book.title}
                      data-shopify-product-category="comics"
                      data-shopify-price={book.shopify.priceAmount}
                      data-shopify-currency={book.shopify.priceCurrencyCode}
                      className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-black"
                    >
                      Add
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

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

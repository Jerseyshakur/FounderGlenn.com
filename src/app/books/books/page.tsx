import type { Metadata } from "next";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import { BOOKS } from "@/content/books";
import { hydrateLocalCatalogWithShopify } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Books",
  description: "Books on systems, creativity, and sovereignty.",
};

const booksCatalog = BOOKS.filter((book) => book.category === "books");

function excerpt(value: string): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  return normalized.length > 110 ? `${normalized.slice(0, 107)}...` : normalized;
}

export default async function BooksPage() {
  const hydrated = await hydrateLocalCatalogWithShopify("books", booksCatalog);

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-7xl md:flex md:gap-10 lg:gap-14">
        <aside className="md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:w-[290px] md:flex-shrink-0 md:overflow-hidden">
          <div className="border-b border-white/10 pb-5 md:border-b-0 md:border-r md:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Books</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">BOOKS</h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Dispatches on systems, creativity, and sovereignty.
            </p>
          </div>

          <details className="mt-4 border-b border-white/10 pb-4 md:hidden">
            <summary className="cursor-pointer list-none text-sm font-medium text-zinc-200">
              Browse Titles ({hydrated.items.length})
            </summary>
            <nav className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-2">
              {hydrated.items.map((book) => (
                <a
                  key={book.slug}
                  href={`#${book.slug}`}
                  className="block rounded px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {book.title}
                </a>
              ))}
            </nav>
          </details>

          <nav className="mt-6 hidden max-h-[calc(100vh-16rem)] space-y-1 overflow-y-auto pr-2 md:block">
            {hydrated.items.map((book) => (
              <a
                key={book.slug}
                href={`#${book.slug}`}
                className="block rounded px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {book.title}
              </a>
            ))}
          </nav>
        </aside>

        <section className="mt-8 flex-1 md:mt-0">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {hydrated.items.map((book) => {
              const cardDescription = excerpt(book.shopify?.description || "");
              const priceText =
                book.shopify?.priceAmount && book.shopify?.priceCurrencyCode
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: book.shopify.priceCurrencyCode,
                    }).format(Number(book.shopify.priceAmount))
                  : null;

              return (
                <article key={book.slug} id={book.slug} className="group block">
                  <Link href={`/books/${book.slug}`} className="block">
                    <CoverImage
                      kind="books"
                      slug={book.slug}
                      title={book.title}
                      src={book.coverSrc || book.shopify?.featuredImageUrl}
                      alt={book.coverAlt}
                    />
                    <p className="mt-3 text-sm leading-snug text-zinc-300 transition-colors group-hover:text-white">
                      {book.title}
                    </p>
                    {cardDescription ? <p className="mt-1 text-xs leading-relaxed text-zinc-500">{cardDescription}</p> : null}
                  </Link>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                      {priceText ?? "Coming Soon"}
                    </p>
                    {book.shopify?.variantId ? (
                      <button
                        type="button"
                        data-shopify-action="add-line"
                        data-shopify-variant-id={book.shopify.variantId}
                        data-shopify-product-handle={book.shopify.handle}
                        data-shopify-product-title={book.title}
                        data-shopify-product-category="books"
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
          <div className="mt-8">
            <Link
              href="/books"
              className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              Back to Collections
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

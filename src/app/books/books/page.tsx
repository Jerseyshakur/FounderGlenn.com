import type { Metadata } from "next";
import Link from "next/link";
import ShopifyProductGrid from "@/components/shopify/ShopifyProductGrid";
import { getShopifyProductsByCategory } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Books",
  description: "Books on systems, creativity, and sovereignty.",
};

export default async function BooksPage() {
  const { products, collectionHandle } = await getShopifyProductsByCategory("books");

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
              Browse Titles ({products.length})
            </summary>
            <nav className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-2">
              {products.map((book) => (
                <a
                  key={book.handle}
                  href={`#${book.handle}`}
                  className="block rounded px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {book.title}
                </a>
              ))}
            </nav>
          </details>

          <nav className="mt-6 hidden max-h-[calc(100vh-16rem)] space-y-1 overflow-y-auto pr-2 md:block">
            {products.map((book) => (
              <a
                key={book.handle}
                href={`#${book.handle}`}
                className="block rounded px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {book.title}
              </a>
            ))}
          </nav>
        </aside>

        <section className="mt-8 flex-1 md:mt-0">
          <div id="shopify-books-grid">
            <ShopifyProductGrid
              products={products}
              collectionHandle={collectionHandle}
              routeBase="/books"
              emptyLabel="No books available in Shopify yet."
            />
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

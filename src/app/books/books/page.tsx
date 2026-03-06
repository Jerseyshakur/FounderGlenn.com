import type { Metadata } from "next";
import Link from "next/link";
import { BOOKS } from "@/content/books";

export const metadata: Metadata = {
  title: "Books",
  description: "Books on systems, creativity, and sovereignty.",
};

const booksCatalog = BOOKS.filter((book) => book.category === "books");

export default function BooksPage() {
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
              Browse Titles ({booksCatalog.length})
            </summary>
            <nav className="mt-3 max-h-64 space-y-1 overflow-y-auto pr-2">
              {booksCatalog.map((book) => (
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
            {booksCatalog.map((book) => (
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
            {booksCatalog.map((book) => (
              <Link key={book.slug} id={book.slug} href={`/books/${book.slug}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden rounded-md bg-white/[0.03] ring-1 ring-white/10 transition-colors group-hover:bg-white/[0.06]">
                  {book.coverSrc ? (
                    <img src={book.coverSrc} alt={book.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center">
                      <p className="text-sm leading-snug text-zinc-300">{book.title}</p>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm leading-snug text-zinc-300 transition-colors group-hover:text-white">
                  {book.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

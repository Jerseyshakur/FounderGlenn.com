import type { Metadata } from "next";
import Link from "next/link";
import { BOOKS } from "@/content/books";

export const metadata: Metadata = {
  title: "Comics",
  description: "Comics catalog.",
};

const comicsCatalog = BOOKS.filter((book) => book.category === "comics");

export default function ComicsPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Comics</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">COMICS</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">Narratives, universes, and character arcs.</p>
        </header>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {comicsCatalog.map((book) => (
            <Link key={book.slug} href={`/books/${book.slug}`} className="group block">
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

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Books",
  description: "Browse books, kits, comics, and essays by Founder Glenn.",
};

const categories = [
  {
    name: "Books",
    href: "/books/books",
    description: "Full catalog of books and dispatches.",
  },
  {
    name: "Kits",
    href: "/books/kits",
    description: "Framework kits and tactical playbooks.",
  },
  {
    name: "Comics",
    href: "/books/comics",
    description: "Visual narratives and universe drops.",
  },
  {
    name: "Essays",
    href: "/essays",
    description: "Ideas, frameworks, and strategic essays.",
  },
] as const;

export default function WritingGatewayPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <section className="mx-auto max-w-4xl">
        <header className="mb-12 border-b border-white/10 pb-8 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Writing</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Choose a Collection</h1>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
            >
              <p className="text-2xl font-semibold tracking-tight text-white">{category.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

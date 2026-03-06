import type { Metadata } from "next";
import Link from "next/link";
import { KITS, KIT_PARENTS } from "@/content/kits";

export const metadata: Metadata = {
  title: "Kits",
  description: "Kits organized by IP universe.",
};

export default function KitsPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Kits</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">KITS</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">Frameworks and toolkits organized by universe.</p>
        </header>

        <div className="space-y-12">
          {KIT_PARENTS.map((parent) => {
            const kits = KITS.filter((kit) => kit.parent === parent.id);

            return (
              <section key={parent.id}>
                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{parent.title}</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
                  {kits.map((kit) => (
                    <article key={kit.slug} className="group block">
                      <div className="aspect-[3/4] overflow-hidden rounded-md bg-white/[0.03] ring-1 ring-white/10 transition-colors group-hover:bg-white/[0.06]">
                        <div className="flex h-full w-full items-center justify-center px-4 text-center">
                          <p className="text-sm leading-snug text-zinc-300">{kit.title}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-snug text-zinc-300 transition-colors group-hover:text-white">
                        {kit.title}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
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

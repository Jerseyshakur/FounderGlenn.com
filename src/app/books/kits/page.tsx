import type { Metadata } from "next";
import Link from "next/link";
import { KITS, KIT_PARENTS } from "@/content/kits";
import CoverImage from "@/components/CoverImage";

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
                    <Link key={kit.slug} href={`/kits/${kit.slug}`} className="group block">
                      <CoverImage kind="kits" slug={kit.slug} title={kit.title} src={kit.coverSrc} />
                      <p className="mt-3 text-sm leading-snug text-zinc-300 transition-colors group-hover:text-white">
                        {kit.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </main>
  );
}

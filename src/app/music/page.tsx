import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Music",
  description: "Legacy Talk by Founder Glenn. Coming Soon.",
};

export default function MusicPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-16 text-zinc-100 md:py-20">
      <section className="mx-auto max-w-5xl">
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10 md:p-10">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Music</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">Legacy Talk</h1>
            <p className="mt-4 text-xl text-zinc-300">Coming Soon</p>
            <p className="mt-5 max-w-xl text-zinc-400">
              A focused new chapter in sound and storytelling, built with intention.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/founder-glenn"
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                About Founder Glenn
              </Link>
              <Link
                href="/books"
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
              >
                Explore Writing
              </Link>
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-2xl border border-white/10 md:order-2">
            <img src="/things/LTcover.PNG" alt="Legacy Talk cover art" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}

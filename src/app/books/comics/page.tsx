import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comics",
  description: "Comics collection coming soon.",
};

export default function ComicsPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">Comics</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Coming Soon</h1>
        <p className="mt-6 text-zinc-400">Comics are on the way.</p>
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

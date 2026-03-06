import Link from "next/link";

export const metadata = {
  title: "GLÈNN",
  description: "GLÈNN by Founder Glenn. Coming soon.",
};

export default function GlennPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-4xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">GLÈNN</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Coming Soon</h1>
        <p className="mt-6 max-w-2xl text-zinc-400">
          Lifestyle design, discipline, and identity systems are in development.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/about"
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
    </main>
  );
}

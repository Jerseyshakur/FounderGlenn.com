import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Media",
  description: "Media and press resources for Founder Glenn.",
};

const shortBio =
  "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.";

const longBio =
  "Founder Glenn builds books, products, and operating systems designed to help creators own their work, scale their leverage, and build enduring legacies.";

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Media / Press</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">Founder Glenn</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">{shortBio}</p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Headshot</p>
            <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <Image
                src="/things/founderGlennHEADSHOT.jpg"
                alt="Founder Glenn headshot"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Short Bio</p>
              <p className="mt-3 text-zinc-300">{shortBio}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Long Bio</p>
              <p className="mt-3 text-zinc-300">{longBio}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Project References</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["Books", "/books"],
              ["Blogs", "/blogs"],
              ["GLÈNN", "/glenn"],
              ["Nexus", "/nexus"],
              ["Kits", "/kits"],
              ["Comics", "/comics"],
              ["Music", "/music"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <p className="mt-7 text-sm text-zinc-400">
            For interviews and collaborations, use the contact page or reach out through the official profiles below.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {seoConfig.person.sameAs.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                {url.replace(/^https?:\/\//, "")}
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

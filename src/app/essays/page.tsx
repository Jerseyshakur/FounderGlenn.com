import type { Metadata } from "next";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import { BOOKS } from "@/content/books";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Essays",
  description: "Founder Glenn essays on systems, economics, sovereignty, and creator infrastructure.",
  alternates: {
    canonical: "/essays",
  },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl("/essays"),
    siteName: seoConfig.siteName,
    title: "Essays | Founder Glenn",
    description: "Founder Glenn essays on systems, economics, sovereignty, and creator infrastructure.",
    images: [{ url: resolveOgImage() }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Essays | Founder Glenn",
    description: "Founder Glenn essays on systems, economics, sovereignty, and creator infrastructure.",
    images: [resolveOgImage()],
  },
};

const essaysCatalog = BOOKS.filter((book) => book.category === "essays");

export default function EssaysPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Essays</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">ESSAYS</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Essays on systems, economics, sovereignty, and infrastructure for creators.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {essaysCatalog.map((essay) => (
            <Link key={essay.slug} href={`/essays/${essay.slug}`} className="group block">
              <CoverImage kind="essays" slug={essay.slug} title={essay.title} src={essay.coverSrc} />
              <p className="mt-3 text-sm leading-snug text-zinc-300 transition-colors group-hover:text-white">
                {essay.title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-zinc-500">Founder Glenn</p>
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

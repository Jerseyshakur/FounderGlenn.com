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
  const projectReferences = [
    ["Books", "/books"],
    ["Blogs", "/blogs"],
    ["GLÈNN", "/glenn"],
    ["Nexus BodyOS", "/NexusBodyOS"],
    ["Kits", "/kits"],
    ["Comics", "/comics"],
    ["Music", "/music"],
  ] as const;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-[900px] py-4 md:py-10">
        <section className="mx-auto mb-10 w-full max-w-[620px]">
          <Image
            src="/things/founderGlennHEADSHOT.jpg"
            alt="Founder Glenn headshot"
            width={1240}
            height={1550}
            priority
            className="h-auto w-full rounded-xl shadow-[0_40px_90px_rgba(255,255,255,0.08)]"
          />
        </section>

        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Media / Press</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-white md:text-6xl">Founder Glenn</h1>
          <h2 className="mt-4 text-xl font-medium tracking-wide text-zinc-300 md:text-2xl">
            Shakur Raqon Ziyār Glenn
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-lg leading-[1.75] text-gray-300">{shortBio}</p>
        </header>

        <section className="mx-auto max-w-[720px] px-0 md:px-6">
          <div className="space-y-8 text-lg leading-[1.75] text-gray-300">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Short Bio</p>
            <p>{shortBio}</p>

            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Long Bio</p>
            <p>{longBio}</p>

            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Project References</p>
            <div className="space-y-2">
              {projectReferences.map(([label, href]) => (
                <p key={href}>
                  <Link href={href} className="text-zinc-200 underline underline-offset-4 hover:text-white">
                    {label}
                  </Link>
                </p>
              ))}
            </div>

            <p>
              For interviews and collaborations, use the contact page or reach out through the official
              profiles below.
            </p>

            <div className="space-y-2">
              {seoConfig.person.sameAs.map((url) => (
                <p key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-200 underline underline-offset-4 hover:text-white"
                  >
                    {url.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

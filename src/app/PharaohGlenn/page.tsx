import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

const PATH = "/PharaohGlenn";
const TITLE = "Pharaoh Glenn";
const DESCRIPTION =
  "Pharaoh Glenn — profile and story on Founder Glenn, alongside family projects including the Autism Texas print hoodie with Pharaoh James.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl(PATH),
    siteName: seoConfig.siteName,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: resolveOgImage("/images/pharaoh-glenn-portrait.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [resolveOgImage("/images/pharaoh-glenn-portrait.png")],
  },
};

export default function PharaohGlennPage() {
  const exploreLinks = [
    { label: "Pharaoh James · Shop", href: "/PharaohJames" },
    { label: "Founder Glenn", href: "/founder-glenn" },
    { label: "Home", href: "/" },
  ] as const;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-[900px] py-4 md:py-10">
        <section className="mx-auto mb-10 w-full max-w-[620px]">
          <Image
            src="/images/pharaoh-glenn-portrait.png"
            alt="Pharaoh Glenn portrait"
            width={1240}
            height={1640}
            priority
            className="h-auto w-full rounded-xl shadow-[0_40px_90px_rgba(255,255,255,0.08)]"
          />
        </section>

        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">Pharaoh Glenn</h1>
          <p className="mx-auto mt-6 max-w-[780px] text-lg leading-[1.8] text-zinc-300">
            Pharaoh Glenn is part of the Founder Glenn family — curious, kind, and full of personality.
            This page is his corner of the site: a simple introduction and a bridge to the projects we
            build together.
          </p>
        </header>

        <section className="mx-auto max-w-[720px] px-0 md:px-6">
          <div className="space-y-8 text-lg leading-[1.75] text-gray-300">
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Entity Snapshot</p>
              <div className="mt-4 space-y-3 text-base leading-7 text-zinc-300">
                <p>
                  <span className="font-semibold text-white">Known as:</span> Pharaoh Glenn
                </p>
                <p>
                  <span className="font-semibold text-white">Context:</span> Family · Founder Glenn
                </p>
                <p>
                  <span className="font-semibold text-white">Focus:</span> Growing up with creativity,
                  care, and room to be exactly who he is
                </p>
                <p>
                  <span className="font-semibold text-white">Official website:</span>{" "}
                  <a
                    href={seoConfig.person.url}
                    className="underline underline-offset-4 hover:text-white"
                  >
                    founderglenn.com
                  </a>
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Explore</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {exploreLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-white/35 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>

            <p>
              Every family has its own rhythm. Ours moves between books, software, music, and the
              everyday work of showing up for each other. Pharaoh Glenn is at the center of that story
              in the ways only a child can be — honest, surprising, and deeply human.
            </p>
            <p>
              This site is mostly a record of what his father builds in public: systems for creators,
              long-form writing, and products that carry meaning. Pharaoh Glenn&apos;s page is here so
              friends, readers, and community can see the person behind the name when it shows up in
              that work.
            </p>
            <p>
              Alongside him, his brother Pharaoh James helps bring forward pieces like the{" "}
              <Link href="/PharaohJames" className="text-white underline underline-offset-4 hover:text-zinc-200">
                Autism Texas print hoodie
              </Link>
              — apparel that celebrates neurodiversity and pride of place. Family projects like that sit
              next to the larger catalog on Founder Glenn.
            </p>
            <p>
              If you&apos;re here from somewhere we haven&apos;t met yet: welcome. The through-line is
              simple — build with integrity, tell the truth, and leave room for the next generation to
              inherit something better than noise.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PharaohGlennAtmosphere } from "@/components/PharaohGlennAtmosphere";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

const PATH = "/PharaohGlenn";
const TITLE = "Pharaoh James Glenn";
const DESCRIPTION =
  "Pharaoh James Glenn — the heart of the dynasty; the Pharaoh James Foundation and legacy fashion house rooted in compassion, culture, and generational vision.";

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
    { label: "Shop · Autism Texas hoodie", href: "/PharaohJames" },
    { label: "Founder Glenn", href: "/founder-glenn" },
    { label: "Home", href: "/" },
  ] as const;

  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100">
      <PharaohGlennAtmosphere />

      <section className="relative px-6 pb-12 pt-20 md:px-10 md:pt-24">
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Family · Founder Glenn</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Pharaoh James Glenn
            <span className="block bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200 bg-clip-text text-transparent">
              The Heart of the Dynasty
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Pharaoh James Glenn is more than a name — he is a foundation, a signal, and a future being built in
            real time.
          </p>

          <nav aria-label="Related pages" className="mt-7 flex flex-wrap gap-2">
            {exploreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="relative px-6 pb-12 md:px-10 md:pb-16">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)_minmax(0,1fr)] lg:items-center">
            <div className="hidden space-y-4 lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Foundation</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  The Pharaoh James Foundation supports children with autism and their families — access, resources,
                  and environments where they are truly seen.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Fashion house</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  A legacy brand in development: timeless identity, cultural permanence, lineage and intention.
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[620px]">
              <Image
                src="/images/pharaoh-glenn-portrait.png"
                alt="Pharaoh Glenn portrait"
                width={880}
                height={1168}
                priority
                className="h-auto w-full rounded-xl shadow-[0_40px_90px_rgba(255,255,255,0.08)]"
              />
            </div>

            <div className="hidden space-y-4 lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Shop</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  The{" "}
                  <Link href="/PharaohJames" className="text-amber-200/90 underline-offset-4 hover:text-white">
                    Autism Texas print hoodie
                  </Link>{" "}
                  — family apparel alongside the Founder Glenn catalog.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Vision</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Impact and legacy, compassion and power, purpose and presence — unified under one name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-20 md:px-10 md:pb-24">
        <div className="relative mx-auto max-w-6xl">
          <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
            <div className="mx-auto max-w-3xl space-y-6 text-base leading-[1.8] text-zinc-300 md:text-lg">
              <p>
                Named after the ancient kings of Kemet, &ldquo;Pharaoh&rdquo; represents legacy, sovereignty, and
                divine purpose. In that same spirit, Pharaoh James stands as the heart behind the Pharaoh James
                Foundation and the Pharaoh James clothing house — a dual movement rooted in compassion, culture, and
                generational vision.
              </p>
              <p>
                Diagnosed with autism, Pharaoh experiences the world through a lens of depth, sensitivity, and quiet
                intelligence. His presence is not defined by limitation, but by a different kind of awareness — one
                that has inspired an entire ecosystem dedicated to understanding, empowerment, and elevation.
              </p>
              <p>
                The Pharaoh James Foundation exists to support children with autism and their families, creating
                access, resources, and environments where they are not only supported, but truly seen. It is built on
                the belief that every child carries a unique frequency of brilliance — and deserves a world that knows
                how to receive it.
              </p>
              <p>
                Alongside the foundation, the Pharaoh James brand is being developed as a legacy fashion house — a
                symbol of timeless identity and cultural permanence. Inspired by the structure of global luxury
                institutions, it represents more than clothing; it is a statement of lineage, intention, and enduring
                value.
              </p>
              <p>
                Together, these pillars form a unified vision: impact and legacy, compassion and power, purpose and
                presence.
              </p>
              <p className="font-medium text-zinc-200">
                Pharaoh James Glenn is not just the inspiration behind it all — he is the reason it exists.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ShopifyProductDetail from "@/components/shopify/ShopifyProductDetail";
import { PHARAOH_JAMES_HOODIE_SHOPIFY_HANDLE } from "@/content/pharaoh-james-shop";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

const PATH = "/PharaohJames";
const TITLE = "Pharaoh James Glenn";
const DESCRIPTION =
  "Pharaoh James Glenn — the heart of the dynasty, inspiring the Pharaoh James Foundation and a legacy fashion house rooted in compassion, culture, and generational vision.";

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
    images: [{ url: resolveOgImage("/images/pharaoh-james-autism-texas-hoodie.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [resolveOgImage("/images/pharaoh-james-autism-texas-hoodie.png")],
  },
};

export default function PharaohJamesPage() {
  if (PHARAOH_JAMES_HOODIE_SHOPIFY_HANDLE) {
    return (
      <ShopifyProductDetail
        handle={PHARAOH_JAMES_HOODIE_SHOPIFY_HANDLE}
        kindLabel="Apparel"
        backHref="/PharaohGlenn"
        backLabel="About Pharaoh Glenn"
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-5xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Pharaoh James · About</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Pharaoh James Glenn
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          The Heart of the Dynasty. Pharaoh James Glenn is more than a name; he is a foundation, a
          signal, and a future being built in real time.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,400px),1fr] md:items-start">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <Image
              src="/images/pharaoh-james-autism-texas-hoodie.png"
              alt="Pharaoh James wearing the Autism Texas print hoodie"
              width={800}
              height={1000}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Profile</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                <li>
                  <span className="font-semibold text-white">Name:</span> Pharaoh James Glenn
                </li>
                <li>
                  <span className="font-semibold text-white">Role:</span> The heart behind the Pharaoh
                  James Foundation and clothing house
                </li>
                <li>
                  <span className="font-semibold text-white">Vision:</span> Impact and legacy,
                  compassion and power, purpose and presence
                </li>
              </ul>
            </section>

            <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
              <p>
                Named after the ancient kings of Kemet, &ldquo;Pharaoh&rdquo; represents legacy,
                sovereignty, and divine purpose. In that same spirit, Pharaoh James stands as the heart
                behind the Pharaoh James Foundation and the Pharaoh James clothing house, a dual
                movement rooted in compassion, culture, and generational vision.
              </p>
              <p>
                Diagnosed with autism, Pharaoh experiences the world through a lens of depth,
                sensitivity, and quiet intelligence. His presence is not defined by limitation, but by a
                different kind of awareness, one that has inspired an entire ecosystem dedicated to
                understanding, empowerment, and elevation.
              </p>
              <p>
                The Pharaoh James Foundation exists to support children with autism and their families,
                creating access, resources, and environments where they are not only supported, but
                truly seen. It is built on the belief that every child carries a unique frequency of
                brilliance and deserves a world that knows how to receive it.
              </p>
              <p>
                Alongside the foundation, the Pharaoh James brand is being developed as a legacy
                fashion house, a symbol of timeless identity and cultural permanence. Inspired by the
                structure of global luxury institutions, it represents more than clothing; it is a
                statement of lineage, intention, and enduring value.
              </p>
              <p>
                Together, these pillars form a unified vision: impact and legacy, compassion and power,
                purpose and presence. Pharaoh James Glenn is not just the inspiration behind it all; he
                is the reason it exists.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Inquire to purchase
              </Link>
              <Link
                href="/PharaohGlenn"
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                About Pharaoh Glenn
              </Link>
              <Link
                href="/founder-glenn"
                className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Founder Glenn
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

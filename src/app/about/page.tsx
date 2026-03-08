import type { Metadata } from "next";
import Link from "next/link";
import {
  buildAbsoluteUrl,
  buildProfilePageSchema,
  resolveOgImage,
  seoConfig,
} from "@/lib/seo";

const ABOUT_PATH = "/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
  alternates: {
    canonical: ABOUT_PATH,
  },
  openGraph: {
    type: "profile",
    url: buildAbsoluteUrl(ABOUT_PATH),
    siteName: seoConfig.siteName,
    title: `${seoConfig.person.name} | About`,
    description:
      "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
    images: [{ url: resolveOgImage(seoConfig.person.image) }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${seoConfig.person.name} | About`,
    description:
      "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
    images: [resolveOgImage(seoConfig.person.image)],
  },
};

const hubLinks = [
  ["Books", "/books"],
  ["Blogs", "/blogs"],
  ["GLÈNN", "/glenn"],
  ["Nexus HealthKit", "/nexus"],
  ["Kits", "/kits"],
  ["Comics", "/comics"],
  ["Music", "/music"],
] as const;

export default function AboutPage() {
  const profileSchema = buildProfilePageSchema(ABOUT_PATH);

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <script
        id="profile-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <article className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">About</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">Founder Glenn</h1>
          <p className="mt-3 text-lg text-zinc-300">Shakur Raqon Ziyār Glenn</p>
          <p className="mt-5 max-w-4xl text-zinc-300">
            Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder
            creating infrastructure for creators.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white">About Founder Glenn</h2>
          <div className="mt-5 space-y-6 text-zinc-300">
            <div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-zinc-500">Bio</h3>
              <p className="mt-2">
                Founder Glenn works at the intersection of publishing, technology, and long-horizon brand
                systems, with a focus on ownership and enduring value creation.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-zinc-500">What I Build</h3>
              <p className="mt-2">
                Books, publishing frameworks, product ecosystems, and strategic infrastructure that support
                creator independence.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-zinc-500">Projects</h3>
              <p className="mt-2">
                Writing systems, GLÈNN, Nexus HealthKit, kits, comics, and Legacy Talk.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-zinc-500">Mission & Philosophy</h3>
              <p className="mt-2">
                Build infrastructure that helps creators own their output, protect leverage, and compound
                legacy with discipline.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white">Explore the Hub</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {hubLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
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

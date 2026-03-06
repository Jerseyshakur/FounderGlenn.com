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
  ["Nexus", "/nexus"],
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

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-white">Bio / Origin</h2>
            <p className="mt-3 text-zinc-300">
              The work centers on long-term ownership, disciplined execution, and systems that outlast
              short-term trends.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-white">What I Build</h2>
            <p className="mt-3 text-zinc-300">
              Books, publishing frameworks, product ecosystems, and strategic infrastructure for creators.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-white">Projects</h2>
            <p className="mt-3 text-zinc-300">
              Writing systems, GLÈNN, Nexus, kits, comics, and Legacy Talk.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-white">Philosophy / Mission</h2>
            <p className="mt-3 text-zinc-300">
              Build infrastructure that helps creators own their output, protect leverage, and compound legacy.
            </p>
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

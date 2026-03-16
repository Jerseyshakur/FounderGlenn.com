import type { Metadata } from "next";
import Link from "next/link";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

const PAGE_PATH = "/maynard-eaton";
const ARCHIVE_PDF_PATH = "/things/maynard-eaton-program.pdf";

export const metadata: Metadata = {
  title: "Maynard Eaton Archive",
  description:
    "A memorial and archival page honoring Maynard Eaton, preserving legacy, memory, and record.",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl(PAGE_PATH),
    siteName: seoConfig.siteName,
    title: "Maynard Eaton Archive | Founder Glenn",
    description:
      "A memorial and archival page honoring Maynard Eaton, preserving legacy, memory, and record.",
    images: [{ url: resolveOgImage() }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maynard Eaton Archive | Founder Glenn",
    description:
      "A memorial and archival page honoring Maynard Eaton, preserving legacy, memory, and record.",
    images: [resolveOgImage()],
  },
};

export default function MaynardEatonPage() {
  const pageUrl = buildAbsoluteUrl(PAGE_PATH);
  const archivePdfUrl = buildAbsoluteUrl(ARCHIVE_PDF_PATH);

  const archiveSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Maynard Eaton Archive & Memorial",
    url: pageUrl,
    description:
      "A memorial and archival page honoring Maynard Eaton, preserving legacy, memory, and record.",
    about: {
      "@type": "Thing",
      name: "Maynard Eaton",
    },
    isPartOf: {
      "@type": "WebSite",
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
    primaryImageOfPage: resolveOgImage(),
    mainEntity: {
      "@type": "CreativeWork",
      name: "Maynard Eaton Program Archive PDF",
      encodingFormat: "application/pdf",
      contentUrl: archivePdfUrl,
    },
  };

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-16 text-zinc-100 md:py-20">
      <script
        id="maynard-eaton-archive-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveSchema) }}
      />

      <article className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">In honor of my cousin</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">Maynard Eaton</h1>
          <p className="mt-2 text-lg text-zinc-300">Archive &amp; Memorial</p>
          <p className="mt-5 max-w-4xl text-zinc-300">
            Created in honor of Maynard Eaton, this archive preserves memory, legacy, and record with care.
            Presented as a family and historical preservation page.
          </p>
          <p className="mt-3 max-w-4xl text-zinc-400">
            Maynard Eaton is my cousin. His mother is my grandmother&apos;s sister.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">Archive Document</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Maynard Eaton Program (Revised Program 2)</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={ARCHIVE_PDF_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Open PDF
              </a>
              <a
                href={ARCHIVE_PDF_PATH}
                download
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
              >
                Download
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <iframe
              src={`${ARCHIVE_PDF_PATH}#view=FitH`}
              title="Maynard Eaton archive PDF"
              className="h-[72vh] min-h-[520px] w-full"
            />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white">Legacy</h2>
          <p className="mt-4 max-w-4xl text-zinc-300">
            This page exists as part of preserving family and public memory with clarity, dignity, and continuity.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/founder-glenn"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
            >
              About
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
            >
              Home
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

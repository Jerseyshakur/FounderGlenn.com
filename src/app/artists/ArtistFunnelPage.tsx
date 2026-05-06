"use client";

/**
 * ArtistFunnelPage — bespoke client component for the Artist Funnel.
 *
 * Psychology map:
 *   1. Hero — orient: "this is for you."
 *   2. Problem — name the pain before offering the cure.
 *   3. Reframe — shift from victim to operator.
 *   4. Sign Here — the ideological core; book is the worldview, not a product.
 *   5. Lead magnet — low-friction entry. Email in exchange for immediate value.
 *   6. Kits — education operationalized. Books inspire; kits execute.
 *   7. Splits — infrastructure layer. Where ideology becomes software.
 *   8. Authority — founder trust; not credentials, but proven philosophy.
 *   9. Final CTA — one clear next action per user type.
 *  10. Ecosystem — soft bridge out; no dead end.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import ArtistFunnelCapture from "@/components/funnel/ArtistFunnelCapture";
import { sectionClassName } from "@/components/funnel/FunnelPrimitives";

// Shared motion config — consistent with ScrollyCanvas pacing
const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const FADE_UP_DELAY = (delay: number) => ({
  ...FADE_UP,
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

// ─── Ownership problem data ───────────────────────────────────────────────────
const OWNERSHIP_PROBLEMS = [
  {
    label: "The paperwork trap",
    body: "Verbal agreements become disputes the moment money appears. Most artists sign before they understand what they're signing.",
  },
  {
    label: "The royalty leak",
    body: "Publishing, streaming, YouTube Content ID, SoundExchange, the MLC — money is sitting uncollected in systems you haven't registered for.",
  },
  {
    label: "The split sheet gap",
    body: "Collaborators remember things differently. Without a documented split, your share of the record is whoever argues loudest.",
  },
  {
    label: "The distribution blind spot",
    body: "Most distribution agreements contain clauses that transfer leverage to the platform. Artists discover this after the catalog is locked in.",
  },
];

// ─── Kit inventory ────────────────────────────────────────────────────────────
const KITS = [
  {
    title: "Sign Here: The Indie Artist Legal Kit",
    description: "Contract templates, clause decoders, and a pre-release ownership checklist — built for artists, not lawyers.",
    href: "/kits/indie-artist-legal-kit",
    tag: "Legal Infrastructure",
  },
  {
    title: "7 Steps to Find Every Dollar",
    description: "A royalty lane map across streaming, publishing, YouTube, PROs, SoundExchange, and the MLC — with a claim execution workflow.",
    href: "/kits/seven-steps-to-find-every-dollar",
    tag: "Royalty Recovery",
  },
  {
    title: "7 Steps to Claim Every Royalty",
    description: "The follow-through kit. Claim submission, verification cadence, and an ongoing audit routine to close payout gaps.",
    href: "/kits/seven-steps-to-claim-every-royalty",
    tag: "Royalty Recovery",
  },
  {
    title: "Fan Funnel Kit",
    description: "Turn casual listeners into direct audience relationships you own — before platforms change their algorithm.",
    href: "/kits/fan-funnel-kit",
    tag: "Audience Infrastructure",
  },
  {
    title: "Distribution Protection Kit",
    description: "Understand what you're agreeing to before you click confirm — and what leverage you have to negotiate.",
    href: "/kits/distribution-protection-kit",
    tag: "Contract Literacy",
  },
  {
    title: "Artist Legal Glossary",
    description: "Every contract term that directly affects your rights, explained in the language of someone who's been at the table.",
    href: "/kits/artist-legal-glossary",
    tag: "Contract Literacy",
  },
];

// ─── Funnel stages (for the transformation visual) ───────────────────────────
const BEFORE_POINTS = [
  "Signing paperwork you don't fully understand",
  "Collaborators with different memories of the split",
  "Royalties sitting uncollected across 6 different systems",
  "Distribution deals with buried leverage clauses",
  "No systematic way to audit what you're owed",
];

const AFTER_POINTS = [
  "A legal operating system before your next release",
  "Split sheets that document ownership from day one",
  "A royalty lane map and claim cadence you run quarterly",
  "Distribution terms you've read, decoded, and negotiated",
  "Infrastructure that works whether you're releasing or dormant",
];

export default function ArtistFunnelPage() {
  return (
    <main
      className="min-h-screen bg-[#121212] px-4 pb-32 pt-20 text-zinc-100 sm:px-6"
      data-funnel-slug="artist"
    >
      {/* Breadcrumb */}
      <div className="mx-auto mb-10 max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
          <Link href="/" className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:text-zinc-400">
            Founder Glenn
          </Link>
          <span>/</span>
          <span className="text-zinc-500">Artists</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 md:space-y-6">

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <motion.section
          {...FADE_UP}
          className={sectionClassName("pt-10 md:pt-16")}
        >
          <div className="mx-auto max-w-4xl">
            <motion.p
              {...FADE_UP_DELAY(0.05)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600"
            >
              Artist Infrastructure
            </motion.p>

            <motion.h1
              {...FADE_UP_DELAY(0.1)}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              The music industry runs
              <span className="block text-zinc-400"> on paperwork.</span>
            </motion.h1>

            <motion.p
              {...FADE_UP_DELAY(0.18)}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl"
            >
              If you don&apos;t understand the paperwork, you don&apos;t control the music.
              This is the operating system for artists who want to own what they build.
            </motion.p>

            <motion.div
              {...FADE_UP_DELAY(0.24)}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/legal"
                data-analytics-cta="1"
                data-analytics-label="Artist Hero — Legal Kit"
                data-analytics-destination="/legal"
                data-analytics-context="artist-funnel-hero"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Get the Indie Artist Legal Kit
              </Link>
              <Link
                href="/royalties"
                data-analytics-cta="1"
                data-analytics-label="Artist Hero — Royalties"
                data-analytics-destination="/royalties"
                data-analytics-context="artist-funnel-hero"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Find Missing Royalties
              </Link>
            </motion.div>

            <motion.div
              {...FADE_UP_DELAY(0.3)}
              className="mt-8 flex flex-wrap gap-2"
            >
              {["Built for independent artists", "System-first creator strategy", "Implementation-ready"].map((proof) => (
                <span
                  key={proof}
                  className="rounded-full border border-white/10 bg-black/25 px-4 py-1.5 text-xs text-zinc-300"
                >
                  {proof}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ── 2. PROBLEM FRAMING ───────────────────────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
              The Risk
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Most artists lose ownership in the paperwork stage.
            </h2>
            <p className="mt-4 max-w-3xl text-zinc-300">
              The legal side of music is rarely explained before signatures happen.
              That&apos;s where leverage gets transferred — quietly, permanently, and entirely legally.
            </p>
          </header>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {OWNERSHIP_PROBLEMS.map((problem, i) => (
              <motion.article
                key={problem.label}
                {...FADE_UP_DELAY(i * 0.06)}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  {problem.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {problem.body}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* ── 3. REFRAME — Before / After ──────────────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
              The Shift
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              From reactive to infrastructure-first.
            </h2>
          </header>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600">
                Without a system
              </p>
              <ul className="mt-4 space-y-3">
                {BEFORE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-zinc-700 bg-black/40" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                With the system
              </p>
              <ul className="mt-4 space-y-3">
                {AFTER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-zinc-200">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-white/20 bg-white/10" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </motion.section>

        {/* ── 4. SIGN HERE — Ideological Core ─────────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,280px)] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
                The Doctrine
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                Sign Here isn&apos;t just a book.
                <span className="block text-zinc-400">It&apos;s a worldview.</span>
              </h2>
              <p className="mt-5 max-w-xl text-zinc-300 leading-relaxed">
                The music business has always been designed to extract from creators
                who don&apos;t know the rules. Sign Here is the rules — decoded, translated,
                and put in the hands of the people who actually make the music.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed text-sm">
                Every kit in this ecosystem is built on the frameworks inside Sign Here.
                Start with the ideology. Then operationalize it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/books/sign-here-the-blueprint-decoded-founder-edition"
                  data-analytics-cta="1"
                  data-analytics-label="Artist Funnel — Sign Here Book"
                  data-analytics-destination="/books/sign-here-the-blueprint-decoded-founder-edition"
                  data-analytics-context="artist-funnel-doctrine"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  Get Sign Here
                </Link>
                <Link
                  href="/books"
                  data-analytics-cta="1"
                  data-analytics-label="Artist Funnel — All Books"
                  data-analytics-destination="/books"
                  data-analytics-context="artist-funnel-doctrine"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
                >
                  Browse All Books
                </Link>
              </div>
            </div>
            {/* Typographic cover stand-in — no stock image */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex h-64 w-44 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                    Founder Glenn
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-white">
                    Sign Here
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    The Blueprint Decoded
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                  Founder Edition
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 5. LEAD MAGNET — Email capture ───────────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
              Free Guide
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              5 Contracts Every Artist Needs Before Releasing Music
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              A concise checklist of the agreements that protect ownership before
              momentum creates ambiguity. Free. Practical. No legal theater.
            </p>
            <ArtistFunnelCapture />
          </div>
        </motion.section>

        {/* ── 6. KITS — Education operationalized ─────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
              Digital Kits
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Books inspire. Kits execute.
            </h2>
            <p className="mt-4 max-w-3xl text-zinc-300">
              Each kit is a focused operational system — not a course, not a video,
              not a PDF that collects dust. These are tools built to be used
              the week you get them.
            </p>
          </header>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {KITS.map((kit, i) => (
              <motion.article
                key={kit.href}
                {...FADE_UP_DELAY(i * 0.05)}
              >
                <Link
                  href={kit.href}
                  data-analytics-cta="1"
                  data-analytics-label={`Artist Funnel Kit — ${kit.title}`}
                  data-analytics-destination={kit.href}
                  data-analytics-context="artist-funnel-kits"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <span className="mb-3 self-start rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    {kit.tag}
                  </span>
                  <h3 className="text-base font-semibold leading-tight tracking-tight text-white">
                    {kit.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {kit.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 transition-colors group-hover:text-white">
                      Explore
                    </span>
                    <svg
                      className="h-3.5 w-3.5 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/kits"
              data-analytics-cta="1"
              data-analytics-label="Artist Funnel — All Kits"
              data-analytics-destination="/kits"
              data-analytics-context="artist-funnel-kits"
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            >
              View All Kits
            </Link>
          </div>
        </motion.section>

        {/* ── 7. SPLITS — Infrastructure layer ────────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,340px)] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
                Infrastructure
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                Education turns into
                <span className="block text-zinc-400">software infrastructure.</span>
              </h2>
              <p className="mt-5 text-zinc-300 leading-relaxed">
                Splits is the next layer of the artist operating system — where the
                split sheet knowledge from the kits becomes a living document with
                real enforcement power.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed text-sm">
                The funnel flows: content → ideology → implementation → software.
                Splits is the software.
              </p>
              <div className="mt-7">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-sm text-zinc-400">
                  Coming to the ecosystem — start with the kits
                </span>
              </div>
            </div>
            {/* Infrastructure visualization — typographic, no stock image */}
            <div className="space-y-2">
              {[
                { stage: "01", label: "Content", sub: "Ownership education on X, TikTok, IG" },
                { stage: "02", label: "Ideology", sub: "Sign Here — the worldview" },
                { stage: "03", label: "Implementation", sub: "Kits — tactical execution tools" },
                { stage: "04", label: "Infrastructure", sub: "Splits — live split sheet software" },
              ].map((step, i) => (
                <div
                  key={step.stage}
                  className={`flex items-start gap-4 rounded-xl border p-4 ${i === 3 ? "border-white/15 bg-white/[0.04]" : "border-white/[0.07] bg-black/20"}`}
                >
                  <span className="text-xs font-semibold text-zinc-700 tabular-nums">{step.stage}</span>
                  <div>
                    <p className={`text-sm font-semibold ${i === 3 ? "text-white" : "text-zinc-300"}`}>{step.label}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── 8. AUTHORITY — Founder trust ─────────────────────────────────── */}
        <motion.section {...FADE_UP} className={sectionClassName()}>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
                Why Founder Glenn
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Founder-led systems for creator ownership.
              </h2>
              <p className="mt-5 text-zinc-300 leading-relaxed">
                This ecosystem wasn&apos;t built by a consultant or a marketing team.
                It was built by someone who watched the industry extract from creators
                who didn&apos;t have the infrastructure to resist — and decided to build
                the infrastructure instead.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed text-sm">
                The kits, books, and software are all extensions of the same philosophy:
                creators deserve ownership, clarity, structure, systems, and infrastructure.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "System-first creator strategy",
                "Practical and implementation-ready",
                "Aligned with long-term ownership and control",
                "Author · Physicist · Builder",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── 9. FINAL CTA ─────────────────────────────────────────────────── */}
        <motion.section
          {...FADE_UP}
          className={sectionClassName("text-center")}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
            Start Here
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-4xl">
            Protect your rights before your next signature.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-zinc-300">
            The strongest entry point for artists who want control before momentum
            makes the legal conversation harder to have.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/legal"
              data-analytics-cta="1"
              data-analytics-label="Artist CTA — Legal Kit"
              data-analytics-destination="/legal"
              data-analytics-context="artist-funnel-cta"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Get the Indie Artist Legal Kit
            </Link>
            <Link
              href="/royalties"
              data-analytics-cta="1"
              data-analytics-label="Artist CTA — Royalties"
              data-analytics-destination="/royalties"
              data-analytics-context="artist-funnel-cta"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              Find Missing Royalties
            </Link>
          </div>
          <div className="mt-5">
            <Link
              href="/kits"
              data-analytics-cta="1"
              data-analytics-label="Artist CTA — All Kits"
              data-analytics-destination="/kits"
              data-analytics-context="artist-funnel-cta"
              className="text-sm text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
            >
              Or browse all kits →
            </Link>
          </div>
        </motion.section>

        {/* ── 10. ECOSYSTEM BRIDGE ─────────────────────────────────────────── */}
        <motion.section
          {...FADE_UP}
          className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-10"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
            The Ecosystem
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Nexus BodyOS", sub: "Understand your body like a system.", href: "/NexusBodyOS" },
              { label: "Books", sub: "Frameworks for ownership and legacy.", href: "/books/books" },
              { label: "Codex", sub: "Essays, philosophy, and future thinking.", href: "/essays" },
              { label: "About Founder Glenn", sub: "The worldview behind the systems.", href: "/founder-glenn" },
            ].map((path) => (
              <Link
                key={path.href}
                href={path.href}
                data-analytics-cta="1"
                data-analytics-label={`Artist Ecosystem — ${path.label}`}
                data-analytics-destination={path.href}
                data-analytics-context="artist-funnel-ecosystem-bridge"
                className="group flex flex-col rounded-2xl border border-white/[0.07] bg-black/20 p-5 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              >
                <h3 className="text-sm font-semibold text-white">{path.label}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-zinc-500">{path.sub}</p>
                <svg
                  className="mt-4 h-3.5 w-3.5 text-zinc-700 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}

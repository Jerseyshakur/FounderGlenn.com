"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PATHS = [
  {
    id: "artists",
    eyebrow: "Artists",
    title: "Protect your work.\nUnderstand your rights.\nBuild ownership.",
    description:
      "The creator operating system — legal infrastructure, royalty recovery, and the systems independent artists actually need.",
    cta: "Enter the Artist Infrastructure",
    href: "/artists",
    analyticsLabel: "Homepage Artist Path",
    analyticsDestination: "/artists",
  },
  {
    id: "nexus",
    eyebrow: "Nexus",
    title: "Understand your body\nlike a system.",
    description:
      "Recovery and readiness intelligence powered by physiology and AI. Built for founders, athletes, and high-output operators.",
    cta: "Explore Nexus BodyOS",
    href: "/NexusBodyOS",
    analyticsLabel: "Homepage Nexus Path",
    analyticsDestination: "/NexusBodyOS",
  },
  {
    id: "books",
    eyebrow: "Books",
    title: "Frameworks for ownership,\nlove, legacy, and infrastructure.",
    description:
      "Books that don't just inform — they reframe. Written for creators building something that outlasts the moment.",
    cta: "Browse the Library",
    href: "/books/books",
    analyticsLabel: "Homepage Books Path",
    analyticsDestination: "/books/books",
  },
  {
    id: "codex",
    eyebrow: "Codex",
    title: "Essays, systems,\nphilosophy, and future thinking.",
    description:
      "The ideological layer. Where the thinking that drives the work gets written down, refined, and published.",
    cta: "Read the Codex",
    href: "/essays",
    analyticsLabel: "Homepage Codex Path",
    analyticsDestination: "/essays",
  },
  {
    id: "kits",
    eyebrow: "Kits",
    title: "Tactical tools for creators,\nfounders, and operators.",
    description:
      "Ideas operationalized. Kits convert ideology into execution — split sheets, royalty workflows, legal templates, release checklists.",
    cta: "Browse the Kits",
    href: "/kits",
    analyticsLabel: "Homepage Kits Path",
    analyticsDestination: "/kits",
  },
];

export default function Projects() {
  return (
    <section className="relative z-20 w-full bg-[#121212] px-6 pb-32 pt-24 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            The Ecosystem
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Choose Your Path
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
            This isn&apos;t one site. It&apos;s one worldview expressed through five systems.
          </p>
        </motion.div>

        {/* Path cards — 2-col grid, last card full-width when count is odd */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04]">
          <div className="grid grid-cols-1 gap-px md:grid-cols-2">
            {PATHS.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
                className={
                  index === PATHS.length - 1 && PATHS.length % 2 !== 0
                    ? "md:col-span-2"
                    : ""
                }
              >
                <Link
                  href={path.href}
                  data-analytics-cta="1"
                  data-analytics-label={path.analyticsLabel}
                  data-analytics-destination={path.analyticsDestination}
                  data-analytics-context="homepage-ecosystem-gateway"
                  className="group flex h-full flex-col bg-[#121212] p-8 transition-colors duration-300 hover:bg-zinc-900/60 md:p-10"
                >
                  {/* Eyebrow */}
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                    {path.eyebrow}
                  </p>

                  {/* Title — whitespace-pre-line preserves intentional line breaks */}
                  <h3 className="mb-4 whitespace-pre-line text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                    {path.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-zinc-400 md:text-base">
                    {path.description}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-300 transition-colors duration-300 group-hover:text-white">
                      {path.cta}
                    </span>
                    <svg
                      className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/founder-glenn"
            className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:border-white/35 hover:text-white"
          >
            About Founder Glenn
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

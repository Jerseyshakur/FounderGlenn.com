"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendZapierEvent } from "@/lib/zapier";

type Path = {
  id: string;
  label: string;
  cta: string;
  zapierFunnel: string;
  hint: string;
};

const PATHS: Path[] = [
  {
    id: "artist",
    label: "Artist",
    cta: "Enter the Artist Infrastructure",
    zapierFunnel: "artist",
    hint: "Legal kits, royalty recovery, and creator ownership frameworks.",
  },
  {
    id: "founder",
    label: "Founder",
    cta: "Join the Founder Glenn Letter",
    zapierFunnel: "founder",
    hint: "Systems thinking, infrastructure strategy, and founder doctrine.",
  },
  {
    id: "health",
    label: "Health / Nexus",
    cta: "Get the Ownership Starter Pack",
    zapierFunnel: "nexus",
    hint: "Physiology-first performance and recovery intelligence.",
  },
  {
    id: "codex",
    label: "Books / Codex",
    cta: "Get the Ownership Starter Pack",
    zapierFunnel: "codex",
    hint: "Essays, manifestos, and frameworks for creators building legacy.",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function HomepageCapture() {
  const [selectedPath, setSelectedPath] = useState<string>(PATHS[0].id);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const activePath = PATHS.find((p) => p.id === selectedPath) ?? PATHS[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) return;

    setStatus("submitting");
    try {
      await sendZapierEvent("newsletter_signup", {
        email: trimmed,
        funnel: activePath.zapierFunnel,
        path_label: activePath.label,
        source: "homepage_capture",
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative z-20 w-full bg-[#121212] px-6 pb-24 pt-4 lg:px-12">
      {/* Hairline separator */}
      <div className="mx-auto mb-20 max-w-7xl border-t border-white/[0.06]" />

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Stay Connected
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Enter the ecosystem.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
              Choose your path. Get the content, frameworks, and tools built for where you are.
            </p>
          </div>

          {/* Path selector */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {PATHS.map((path) => (
              <button
                key={path.id}
                type="button"
                onClick={() => {
                  setSelectedPath(path.id);
                  setStatus("idle");
                }}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  selectedPath === path.id
                    ? "border-white/40 bg-white/[0.08] text-white"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {path.label}
              </button>
            ))}
          </div>

          {/* Path hint */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activePath.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mb-7 text-center text-xs leading-relaxed text-zinc-600"
            >
              {activePath.hint}
            </motion.p>
          </AnimatePresence>

          {/* Form */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <p className="text-sm font-semibold text-white">You&apos;re in.</p>
                <p className="text-xs text-zinc-500">
                  Check your inbox — the first dispatch is on its way.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your email address"
                  required
                  className="h-11 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-white/25 focus:bg-white/[0.06] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white px-6 text-xs font-semibold uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : activePath.cta}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Error message */}
          {status === "error" && (
            <p className="mt-3 text-center text-xs text-red-400/80">
              Something went wrong. Try again in a moment.
            </p>
          )}

          {/* Privacy note */}
          {status !== "success" && (
            <p className="mt-4 text-center text-[11px] text-zinc-700">
              No noise. Unsubscribe anytime.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

/**
 * ArtistFunnelCapture
 *
 * Email capture wired to Zapier with funnel tag "artist".
 * Follows the same pattern as LegalLeadCaptureForm — client component,
 * controlled email state, submits via sendZapierEvent, shows success inline.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendZapierEvent } from "@/lib/zapier";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ArtistFunnelCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) return;

    setStatus("submitting");
    try {
      await sendZapierEvent("funnel_lead", {
        email: trimmed,
        funnel: "artist",
        source: "artist-funnel-page",
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-7">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2"
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
              className="h-11 flex-1 rounded-full border border-white/15 bg-black/30 px-5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-white/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Get the Ownership Starter Pack"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p className="mt-3 text-xs text-red-400/80">
          Something went wrong. Try again in a moment.
        </p>
      )}
      {status !== "success" && (
        <p className="mt-4 text-xs text-zinc-700">No noise. Unsubscribe anytime.</p>
      )}
    </div>
  );
}

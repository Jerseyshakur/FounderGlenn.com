"use client";

import { useState } from "react";
import { sendZapierEvent } from "@/lib/zapier";

type LegalLeadCaptureFormProps = {
  ctaLabel?: string;
  placeholder?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LegalLeadCaptureForm({ ctaLabel, placeholder }: LegalLeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const rawEmail = new FormData(form).get("email");
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";

    if (!email || !isValidEmail(email)) return;

    setIsSubmitting(true);
    try {
      // Send lead to Zapier for funnel lead tracking
      await sendZapierEvent("funnel_lead", {
        email,
        funnel: "legal",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        placeholder={placeholder ?? "Enter your email"}
        required
        className="h-11 flex-1 rounded-full border border-white/15 bg-black/30 px-5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-white/35 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {ctaLabel ?? "Get the Guide"}
      </button>
    </form>
  );
}

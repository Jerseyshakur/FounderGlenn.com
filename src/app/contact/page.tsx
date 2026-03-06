import type { Metadata } from "next";
import { seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Founder Glenn for collaborations, media, and project inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Contact</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Let&apos;s Build</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          For collaborations, partnerships, media requests, or strategic projects, use the channels below.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">General Inquiries</p>
            <p className="mt-3 text-zinc-200">hello@founderglenn.com</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Media / Press</p>
            <p className="mt-3 text-zinc-200">press@founderglenn.com</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
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
    </main>
  );
}

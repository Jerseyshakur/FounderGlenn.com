import { buildNexusMetadata, NEXUS_BUSINESS_EMAIL, NEXUS_SUPPORT_EMAIL, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Contact | Founder Glenn",
  description: "Contact Nexus HealthKit support and business team.",
  path: "/NexusHealthKit/contact",
});

export default function NexusContactPage() {
  return (
    <NexusPageShell
      title="Contact"
      description="Support requests and business inquiries for Nexus HealthKit."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Support Email</h2>
          <p className="mt-4 text-zinc-300">
            <a href={`mailto:${NEXUS_SUPPORT_EMAIL}`} className="underline underline-offset-4 hover:text-white">
              {NEXUS_SUPPORT_EMAIL}
            </a>
          </p>
          <h3 className="mt-8 text-xl font-semibold text-white">Business Inquiries</h3>
          <p className="mt-3 text-zinc-300">
            <a href={`mailto:${NEXUS_BUSINESS_EMAIL}`} className="underline underline-offset-4 hover:text-white">
              {NEXUS_BUSINESS_EMAIL}
            </a>
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Support Request Form</h2>
          <form className="mt-6 space-y-4" action={`mailto:${NEXUS_SUPPORT_EMAIL}`} method="post" encType="text/plain">
            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35"
            />
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="How can we help?"
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35"
            />
            <button
              type="submit"
              className="inline-flex rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Send Request
            </button>
          </form>
        </section>
      </div>
    </NexusPageShell>
  );
}

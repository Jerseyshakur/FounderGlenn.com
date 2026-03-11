import { buildNexusMetadata, NEXUS_SUPPORT_EMAIL, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Support | Founder Glenn",
  description: "Support center for Nexus HealthKit with troubleshooting, HealthKit permissions, and subscription help.",
  path: "/NexusHealthKit/support",
});

export default function NexusSupportPage() {
  return (
    <NexusPageShell
      title="Support"
      description="Need help with setup, HealthKit sync, or subscriptions? Start here."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Getting Started",
            body: "Install Nexus HealthKit, grant Apple Health permissions, and complete your onboarding profile to unlock recovery and readiness analytics.",
          },
          {
            title: "Troubleshooting",
            body: "If metrics look delayed, force-close and reopen the app, confirm iOS background refresh is enabled, and verify Health permissions remain active.",
          },
          {
            title: "HealthKit Permissions",
            body: "Open iPhone Settings > Health > Data Access & Devices > Nexus HealthKit and ensure read access is enabled for required data types.",
          },
          {
            title: "Sync Issues",
            body: "Sync delays can occur when devices are low power or recently restored. Reconnect permissions and wait for Apple Health to fully update.",
          },
          {
            title: "Subscription Questions",
            body: "Manage plans, renewal, and cancellation through your Apple ID subscription settings. Billing is handled by Apple.",
          },
        ].map((item) => (
          <section key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-4 text-zinc-300">{item.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Support Request Form</h2>
        <p className="mt-3 text-zinc-300">Use this form for technical support. For urgent account issues, email {NEXUS_SUPPORT_EMAIL}.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" action={`mailto:${NEXUS_SUPPORT_EMAIL}`} method="post" encType="text/plain">
          <input
            type="text"
            name="name"
            required
            placeholder="Full name"
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35"
          />
          <input
            type="text"
            name="subject"
            required
            placeholder="Issue summary"
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35 md:col-span-2"
          />
          <textarea
            name="message"
            required
            placeholder="Describe the issue, device model, iOS version, and steps tried"
            rows={5}
            className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white/35 md:col-span-2"
          />
          <button
            type="submit"
            className="inline-flex rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 md:col-span-2 md:w-fit"
          >
            Send Support Request
          </button>
        </form>
      </section>
    </NexusPageShell>
  );
}

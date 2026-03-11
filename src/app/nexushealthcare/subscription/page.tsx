import { buildNexusMetadata, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Subscription | Founder Glenn",
  description: "Subscription details for Nexus HealthKit Free and Pro plans billed through Apple.",
  path: "/NexusHealthKit/subscription",
});

export default function NexusSubscriptionPage() {
  return (
    <NexusPageShell
      title="Subscription"
      description="Nexus HealthKit offers Free and Pro access with billing handled through Apple."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Free</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">Foundation tier</h2>
          <ul className="mt-5 space-y-2 text-zinc-300">
            <li>• Core daily analytics</li>
            <li>• Basic signal summaries</li>
            <li>• Essential HealthKit sync</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-cyan-300/35 bg-gradient-to-br from-cyan-500/12 via-violet-500/10 to-emerald-500/12 p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Pro</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">Advanced tier</h2>
          <ul className="mt-5 space-y-2 text-zinc-200">
            <li>• Pro analytics</li>
            <li>• Deeper performance insights</li>
            <li>• Advanced metrics and trend interpretation</li>
            <li>• Enhanced readiness and recovery context</li>
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Billing Through Apple</h2>
        <p className="mt-4 text-zinc-300">
          Subscriptions are purchased and managed through Apple In-App Purchase. Renewal, cancellation, and billing
          settings are controlled by your Apple account.
        </p>
        <p className="mt-4 text-zinc-300">
          You can cancel anytime in iOS Settings under Apple ID subscriptions. Access remains active through the end of
          your billing period.
        </p>
      </section>
    </NexusPageShell>
  );
}

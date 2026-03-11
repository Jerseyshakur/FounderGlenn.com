import { buildNexusMetadata, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Features | Founder Glenn",
  description: "Recovery scoring, strain tracking, HRV analysis, sleep insights, training load, and readiness metrics.",
  path: "/NexusHealthKit/features",
});

export default function NexusFeaturesPage() {
  const features = [
    "Recovery scoring",
    "Strain tracking",
    "HRV analysis",
    "Sleep tracking",
    "Training load insights",
    "Readiness metrics",
  ];

  return (
    <NexusPageShell title="Features" description="Core systems inside Nexus HealthKit.">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <h2 className="text-xl font-semibold tracking-tight text-white">{feature}</h2>
              <p className="mt-3 text-sm text-zinc-300">
                Nexus HealthKit translates this signal into practical guidance so users can align output with real
                physiological capacity.
              </p>
            </article>
          ))}
        </div>
      </section>
    </NexusPageShell>
  );
}

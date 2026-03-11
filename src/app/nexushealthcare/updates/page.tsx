import { buildNexusMetadata, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Updates | Founder Glenn",
  description: "Product changelog for Nexus HealthKit releases, feature improvements, and bug fixes.",
  path: "/nexushealthcare/updates",
});

const changelog = [
  {
    version: "v1.2.0",
    date: "2026-03-10",
    improvements: [
      "Improved readiness trend interpretation for multi-day load patterns",
      "Expanded recovery explanations for clearer next-step guidance",
    ],
    fixes: ["Resolved intermittent sync state lag on recent iOS builds"],
  },
  {
    version: "v1.1.0",
    date: "2026-02-18",
    improvements: [
      "Added deeper strain context for training and workload planning",
      "Refined dashboard density for faster daily scans",
    ],
    fixes: ["Fixed occasional delayed rendering in summary cards"],
  },
  {
    version: "v1.0.0",
    date: "2026-01-29",
    improvements: ["Initial public release with core HealthKit analytics and readiness workflow"],
    fixes: ["Baseline stability and launch hardening updates"],
  },
];

export default function NexusUpdatesPage() {
  return (
    <NexusPageShell
      title="Product Updates"
      description="Release notes for Nexus HealthKit. Version history, feature improvements, and bug fixes."
    >
      <div className="space-y-6">
        {changelog.map((entry) => (
          <section key={entry.version} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Version</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{entry.version}</h2>
            <p className="mt-2 text-sm text-zinc-400">Release date: {entry.date}</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-zinc-400">Feature improvements</h3>
                <ul className="mt-3 space-y-2 text-zinc-300">
                  {entry.improvements.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-zinc-400">Bug fixes</h3>
                <ul className="mt-3 space-y-2 text-zinc-300">
                  {entry.fixes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </NexusPageShell>
  );
}

import { buildNexusMetadata, NEXUS_SUPPORT_EMAIL, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Delete Data | Founder Glenn",
  description: "Instructions for requesting Nexus HealthKit account deletion and data removal.",
  path: "/NexusHealthKit/delete-data",
});

export default function NexusDeleteDataPage() {
  return (
    <NexusPageShell
      title="Account & Data Deletion"
      description="Request deletion of your Nexus HealthKit account and associated data."
    >
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-zinc-300 md:p-9">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">How to Request Deletion</h2>
        <ol className="mt-5 space-y-3">
          <li>1. Email {NEXUS_SUPPORT_EMAIL} from the account email linked to Nexus HealthKit.</li>
          <li>2. Use subject line: “Nexus HealthKit Deletion Request”.</li>
          <li>3. Specify whether you want account deletion, data removal, or both.</li>
        </ol>
        <p className="mt-5">
          We may verify ownership before processing requests. Approved deletion requests are processed within a
          reasonable operational period.
        </p>
        <p className="mt-5">
          Send requests to{" "}
          <a href={`mailto:${NEXUS_SUPPORT_EMAIL}`} className="underline underline-offset-4 hover:text-white">
            {NEXUS_SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </NexusPageShell>
  );
}

import Link from "next/link";
import { buildNexusMetadata, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus BodyOS FAQ | Founder Glenn",
  description: "Frequently asked questions about Nexus BodyOS data usage, subscriptions, and account management.",
  path: "/NexusBodyOS/faq",
});

export default function NexusFaqPage() {
  return (
    <NexusPageShell title="FAQ" description="Answers to the most common Nexus BodyOS questions.">
      <div className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How does Nexus use Apple Health data?</h2>
          <p className="mt-4 text-zinc-300">
            Nexus reads authorized HealthKit metrics to produce readiness, recovery, and performance analytics. Data is
            used only for Nexus product functionality.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Is my health data private?</h2>
          <p className="mt-4 text-zinc-300">
            Yes. Nexus BodyOS does not sell health data. You control permissions through Apple Health and can revoke
            access at any time.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How do I cancel my subscription?</h2>
          <p className="mt-4 text-zinc-300">
            Open your Apple ID subscription settings on iOS, find Nexus BodyOS, and cancel renewal there.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Why isn’t my HealthKit data syncing?</h2>
          <p className="mt-4 text-zinc-300">
            Confirm HealthKit permissions are still enabled, app background refresh is active, and your device has
            recent Health data available.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How do I delete my account?</h2>
          <p className="mt-4 text-zinc-300">
            Use the account and data deletion instructions on the{" "}
            <Link href="/NexusBodyOS/delete-data" className="underline underline-offset-4 hover:text-white">
              Delete Data page
            </Link>
            .
          </p>
        </section>
      </div>
    </NexusPageShell>
  );
}

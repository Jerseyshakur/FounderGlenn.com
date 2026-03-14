import { buildNexusMetadata, NEXUS_SUPPORT_EMAIL, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus BodyOS Privacy Policy | Founder Glenn",
  description:
    "Privacy policy for Nexus BodyOS, including Apple HealthKit disclosures, data usage, and user privacy rights.",
  path: "/NexusBodyOS/privacy",
});

export default function NexusPrivacyPage() {
  return (
    <NexusPageShell
      title="Privacy Policy"
      description="How Nexus BodyOS handles Apple Health data, account information, and user privacy rights."
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Apple HealthKit Data Disclosure</h2>
          <p className="mt-4 text-zinc-300">
            Nexus BodyOS integrates with Apple HealthKit to read user-authorized data. We never access Apple Health
            data without your explicit permission inside iOS Health settings.
          </p>
          <ul className="mt-4 space-y-2 text-zinc-300">
            <li>• Heart rate</li>
            <li>• HRV (heart rate variability)</li>
            <li>• Steps</li>
            <li>• Sleep</li>
            <li>• Workouts</li>
            <li>• Calories</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">How Data Is Used</h2>
          <p className="mt-4 text-zinc-300">
            Health data is used only to power Nexus analytics, including recovery scoring, readiness, strain context,
            and training guidance. Nexus BodyOS does not sell health data.
          </p>
          <p className="mt-4 text-zinc-300">
            Where applicable, processing is performed locally on-device to reduce unnecessary transfer of sensitive
            health signals.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">User Rights</h2>
          <p className="mt-4 text-zinc-300">
            You can revoke HealthKit permissions at any time in Apple Health settings, request account deletion, and
            request removal of associated data according to applicable law.
          </p>
          <p className="mt-4 text-zinc-300">
            Privacy requests can be sent to{" "}
            <a href={`mailto:${NEXUS_SUPPORT_EMAIL}`} className="underline underline-offset-4 hover:text-white">
              {NEXUS_SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </NexusPageShell>
  );
}

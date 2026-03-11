import { buildNexusMetadata, NEXUS_SUPPORT_EMAIL, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus HealthKit Terms of Service | Founder Glenn",
  description: "Terms of Service for Nexus HealthKit including use rules, subscriptions, and liability limitations.",
  path: "/NexusHealthKit/terms",
});

export default function NexusTermsPage() {
  return (
    <NexusPageShell
      title="Terms of Service"
      description="Clear terms governing use of Nexus HealthKit, subscriptions, and service limitations."
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-zinc-300 md:p-9">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Terms</h2>
        <p className="mt-4">
          By accessing Nexus HealthKit, you agree to use the app lawfully, follow platform policies, and avoid misuse
          of app services, accounts, or content.
        </p>

        <h3 className="mt-7 text-xl font-semibold text-white">Acceptable Use</h3>
        <p className="mt-3">
          You may not attempt to reverse engineer, disrupt service integrity, or use Nexus HealthKit for fraudulent or
          abusive behavior.
        </p>

        <h3 className="mt-7 text-xl font-semibold text-white">Subscriptions</h3>
        <p className="mt-3">
          Paid tiers are billed through Apple in-app subscriptions. Billing cadence, renewal, and cancellation are
          controlled through your Apple account settings.
        </p>

        <h3 className="mt-7 text-xl font-semibold text-white">Refunds</h3>
        <p className="mt-3">
          Refund eligibility is determined by Apple’s billing policies. Nexus HealthKit does not independently process
          App Store subscription refunds.
        </p>

        <h3 className="mt-7 text-xl font-semibold text-white">Liability Limitation</h3>
        <p className="mt-3">
          Nexus HealthKit provides informational analytics and is not medical advice. Use of analytics and performance
          recommendations remains your responsibility.
        </p>

        <h3 className="mt-7 text-xl font-semibold text-white">Governing Law</h3>
        <p className="mt-3">These terms are governed by applicable U.S. law, without waiving rights granted by local consumer law.</p>

        <h3 className="mt-7 text-xl font-semibold text-white">Contact</h3>
        <p className="mt-3">
          Terms inquiries:{" "}
          <a href={`mailto:${NEXUS_SUPPORT_EMAIL}`} className="underline underline-offset-4 hover:text-white">
            {NEXUS_SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </NexusPageShell>
  );
}

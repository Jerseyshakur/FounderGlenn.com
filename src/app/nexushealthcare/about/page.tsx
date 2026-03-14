import { buildNexusMetadata, NexusPageShell } from "../_shared";

export const metadata = buildNexusMetadata({
  title: "About Nexus BodyOS | Founder Glenn",
  description: "What Nexus BodyOS is, why it exists, and the philosophy behind Founder Glenn’s performance analytics stack.",
  path: "/NexusBodyOS/about",
});

export default function NexusAboutPage() {
  return (
    <NexusPageShell
      title="About Nexus BodyOS"
      description="Built to translate physiology into decisions creators and athletes can execute daily."
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">What Nexus BodyOS Is</h2>
          <p className="mt-4 text-zinc-300">
            Nexus BodyOS is a personal performance analytics app that converts health and recovery signals into
            readable execution guidance.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Product Philosophy</h2>
          <p className="mt-4 text-zinc-300">
            We believe data without interpretation creates noise. Nexus exists to reduce noise, clarify capacity, and
            improve the quality of high-stakes daily decisions.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Founder Vision</h2>
          <p className="mt-4 text-zinc-300">
            Founder Glenn’s vision is to build long-horizon performance infrastructure that helps people sustain output
            without sacrificing health, clarity, or longevity.
          </p>
        </section>
      </div>
    </NexusPageShell>
  );
}

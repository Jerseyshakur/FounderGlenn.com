import Link from "next/link";
import { NexusBodyOSAtmosphere } from "@/components/NexusBodyOSAtmosphere";
import { APPS } from "@/content/apps";
import { buildNexusMetadata, NEXUS_LINKS } from "../nexushealthcare/_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus BodyOS",
  description:
    "Nexus BodyOS by Founder Glenn: a premium physiological engine for recovery, readiness, and performance.",
  path: "/NexusBodyOS",
});

const nexusApp = APPS.find((app) => app.slug === "nexus");

export default function NexusBodyOSPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100">
      <NexusBodyOSAtmosphere />

      <section className="relative px-6 pb-16 pt-20 md:px-10 md:pt-24">
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Nexus BodyOS</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Your Body Is Running a System.
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
              Nexus BodyOS Shows You the Code.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Most health apps report numbers. Nexus BodyOS interprets recovery, readiness, stress, sleep, and workload
            so your next move is clear before performance drops.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://testflight.apple.com/join/j1tpp54U"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Join TestFlight
            </a>
            <a
              href="https://apps.apple.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              View App Store
            </a>
          </div>

          <nav aria-label="Nexus BodyOS section navigation" className="mt-7 flex flex-wrap gap-2">
            {NEXUS_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_minmax(0,360px)_1fr] lg:items-center">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Readiness Engine</p>
                <p className="mt-2 text-sm text-zinc-300">
                  Interprets how prepared your body is for deep work, training, or recovery.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Signal Translation</p>
                <p className="mt-2 text-sm text-zinc-300">
                  Turns noisy health metrics into clear, actionable guidance.
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[360px]">
              <div className="rounded-[2.6rem] border border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-2 shadow-[0_0_80px_rgba(56,189,248,0.18)]">
                <div className="rounded-[2.2rem] border border-white/10 bg-[#0f1013] p-4">
                  <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/20" />
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-emerald-500/20 p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={nexusApp?.iconSrc || "/images/placeholder-cover.svg"}
                        alt="Nexus BodyOS app icon"
                        className="h-11 w-11 rounded-2xl border border-white/15 object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">Nexus BodyOS</p>
                        <p className="text-xs text-zinc-300">Live daily signal</p>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                        <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">Readiness</p>
                        <p className="mt-1 text-xl font-semibold text-emerald-300">84</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                        <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">Recovery</p>
                        <p className="mt-1 text-xl font-semibold text-cyan-300">78</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-3">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">Nexus insight</p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-200">
                        Body strain is elevated. Favor focused output blocks and lower-intensity training today.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Recovery Intelligence</p>
                <p className="mt-2 text-sm text-zinc-300">
                  Detects trend shifts before fatigue compounds into performance decline.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Daily Decision Layer</p>
                <p className="mt-2 text-sm text-zinc-300">
                  Connects physiological state to execution plans you can apply immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Founder Story</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Built while physically run down and still expected to perform
            </h2>
            <p className="mt-4 text-zinc-300">
              Nexus BodyOS was built during a period where output looked strong but internal capacity was collapsing.
              The engine reflected reality early, before burnout made it obvious.
            </p>
            <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-zinc-200">
              "The engine reflected what I felt before the dashboards did."
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">System Outcomes</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              From raw metrics to operational health decisions
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-zinc-300">
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                Interpret sleep debt, stress load, and recovery direction in one view.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                Adjust training and cognitive intensity before capacity drops.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                Create a repeatable rhythm for sustained output and longevity.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

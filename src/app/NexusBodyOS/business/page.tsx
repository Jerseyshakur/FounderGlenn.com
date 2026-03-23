import Link from "next/link";
import { NexusBodyOSAtmosphere } from "@/components/NexusBodyOSAtmosphere";
import { buildNexusMetadata, NEXUS_LINKS } from "../../nexushealthcare/_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus BodyOS for Business | Founder Glenn",
  description:
    "Nexus BodyOS as a health intelligence system: unified data, decision support, integrations, and business value.",
  path: "/NexusBodyOS/business",
});

const problems = [
  {
    title: "Too many inputs",
    body: "Health data is spread across multiple apps, devices, and dashboards, making it difficult to see the full picture in one place.",
  },
  {
    title: "No clear interpretation",
    body: "Most platforms show numbers, but they do not translate those numbers into clear daily action or decision support.",
  },
  {
    title: "Weak decision support",
    body: "Users are often left guessing whether to push harder, recover more, or maintain their current workload.",
  },
];

const productFunctions = [
  "Aggregates health and activity data from connected systems",
  "Processes that data through a physiological scoring engine",
  "Displays recovery, readiness, sleep, and stress insights in one clear interface",
  "Helps users understand whether to push, maintain, or recover",
  "Supports trend analysis over time instead of isolated one-day readings",
];

const steps = [
  {
    title: "Collect",
    body: "Nexus BodyOS connects to external health sources and wearable systems to receive user data.",
  },
  {
    title: "Organize",
    body: "The platform structures incoming health metrics so they can be interpreted together, not separately.",
  },
  {
    title: "Analyze",
    body: "The scoring engine evaluates patterns across recovery, sleep, stress, and workload.",
  },
  {
    title: "Display",
    body: "Users receive a real-time dashboard that turns raw inputs into practical guidance.",
  },
];

const integrations = [
  {
    title: "Apple HealthKit",
    body: "Pulls core health and fitness data from the Apple ecosystem.",
  },
  {
    title: "Apple Watch",
    body: "Supports continuous physiological tracking through connected wearable inputs.",
  },
  {
    title: "Cloud infrastructure",
    body: "Processes, syncs, and serves user data through backend application services.",
  },
  {
    title: "Analytics engine",
    body: "Transforms raw metrics into readiness, recovery, and performance insights.",
  },
  {
    title: "Mobile interface",
    body: "Delivers outputs through an iPhone-first dashboard experience.",
  },
];

const impacts = [
  "Saves time by removing the need to check multiple apps",
  "Improves decision-making through one unified dashboard",
  "Reduces confusion by translating raw metrics into action",
  "Streamlines health tracking across sleep, recovery, and strain",
  "Creates more consistent performance and recovery visibility",
];

const sectionWrap = "px-6 py-12 md:px-10 md:py-16";
const container = "mx-auto max-w-6xl";

export default function NexusBodyOSBusinessPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100">
      <NexusBodyOSAtmosphere />

      <section className="relative px-6 pb-16 pt-20 md:px-10 md:pt-24">
        <div className={`relative ${container}`}>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Nexus BodyOS / Business</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Your health data lives in fragments.
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
              Nexus BodyOS turns it into decisions.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Nexus BodyOS is a health intelligence system that unifies recovery, sleep, stress, activity, and readiness
            into a single decision layer so users can stop guessing and start adjusting in real time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/NexusBodyOS"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Explore the System
            </Link>
            <Link
              href="/NexusBodyOS"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              View Product
            </Link>
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
        </div>
      </section>

      <section className={sectionWrap}>
        <div className={container}>
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">The Business Problem</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
            The problem isn&apos;t a lack of data. It&apos;s disconnected data.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300">
            Most health and fitness users already generate a constant stream of information through phones, watches,
            wearable sensors, and activity platforms. The problem is that the data is scattered across multiple apps,
            dashboards, and reports. That makes it harder to understand what is actually happening in the body and
            even harder to decide what to do next.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {problems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionWrap}>
        <div className={`${container} grid gap-6 md:grid-cols-2`}>
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">The Solution</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Nexus BodyOS is the decision layer.
            </h2>
            <p className="mt-5 text-zinc-300">
              Nexus BodyOS is a mobile information system designed to collect, organize, interpret, and display
              physiological data in one place. Instead of forcing users to read disconnected metrics one by one, the
              system converts raw health inputs into clear outputs such as readiness, recovery, strain, sleep
              interpretation, and daily guidance.
            </p>
            <p className="mt-4 text-zinc-300">
              The result is a system that saves time, reduces confusion, and helps users make better health and
              performance decisions faster.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">What Nexus BodyOS Does</p>
            <ul className="mt-5 space-y-3 text-sm text-zinc-300">
              {productFunctions.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={sectionWrap}>
        <div className={container}>
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">How It Works</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
            A simple system flow built on connected inputs.
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionWrap}>
        <div className={container}>
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Systems It Integrates With</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Built to work with the systems users already use.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
            Nexus BodyOS functions as an integrated information system because it combines hardware inputs, software
            processing, database storage, and network communication into one usable platform.
          </p>
        </div>
      </section>

      <section className={sectionWrap}>
        <div className={`${container} grid gap-6 md:grid-cols-2`}>
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Business Impact</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              What problem does it solve?
            </h2>
            <p className="mt-5 text-zinc-300">
              Nexus BodyOS addresses the problem of fragmented health data and poor decision visibility. It turns
              scattered inputs into usable guidance and helps users manage performance, recovery, and daily output more
              consistently.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {impacts.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-relaxed text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionWrap}>
        <div className={container}>
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Why This Matters</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              More than a health dashboard. A real information system.
            </h2>
            <p className="mt-5 text-zinc-300">
              Modern information systems are valuable when they do more than store information. They need to collect
              data, process it, organize it, and turn it into something useful. Nexus BodyOS does that by combining user
              hardware, connected health software, databases, analytics, and network-based syncing into a single
              decision support system.
            </p>
            <p className="mt-4 text-zinc-300">
              That makes Nexus BodyOS more than a fitness app. It becomes a health intelligence platform designed to
              improve decisions through integrated systems thinking.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-relaxed text-zinc-300">
              <span className="font-medium text-white">Product Name:</span> Nexus BodyOS
              <br />
              <span className="font-medium text-white">Category:</span> Health intelligence information system
            </div>
          </article>
        </div>
      </section>

      <section className={`${sectionWrap} pb-20 md:pb-24`}>
        <div className={`${container} text-center`}>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Final Word</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Most apps show you data. Nexus BodyOS shows you what to do with it.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-300">
              For users trying to manage performance, recovery, and long-term output, the real advantage is not more
              information. It is better interpretation.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/NexusBodyOS"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Open Nexus BodyOS
              </Link>
              <Link
                href="/NexusBodyOS"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                View Core System
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

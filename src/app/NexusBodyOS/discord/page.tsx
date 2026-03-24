import { APPS } from "@/content/apps";
import { buildNexusMetadata, NexusPageShell } from "../../nexushealthcare/_shared";

export const metadata = buildNexusMetadata({
  title: "Nexus BodyOS Discord | Founder Glenn",
  description:
    "Join the Nexus BodyOS Discord community for updates, conversations, and direct access to the system's orbit.",
  path: "/NexusBodyOS/discord",
});

const DISCORD_INVITE_URL = "https://discord.gg/zmVTTj5z3f";
const nexusApp = APPS.find((app) => app.slug === "nexus");

function DiscordMark() {
  return (
    <svg viewBox="0 0 127.14 96.36" aria-hidden="true" className="h-8 w-8 fill-current">
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.24 8.08C2.79 32.65-1.71 56.6.54 80.21h.01a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.84-5.18c.91-.66 1.8-1.34 2.66-2.04a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2.04a68.68 68.68 0 0 1-10.86 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14h.01c2.64-27.35-4.51-51.09-19.92-72.15ZM42.45 65.69C35.92 65.69 30.56 59.72 30.56 52.4s5.23-13.29 11.89-13.29c6.71 0 12 6.03 11.89 13.29 0 7.32-5.24 13.29-11.89 13.29Zm42.24 0c-6.54 0-11.89-5.97-11.89-13.29s5.23-13.29 11.89-13.29c6.71 0 12 6.03 11.89 13.29 0 7.32-5.18 13.29-11.89 13.29Z" />
    </svg>
  );
}

export default function NexusDiscordPage() {
  return (
    <NexusPageShell
      title="Discord"
      description="Step into the Nexus BodyOS community for updates, early conversations, and a direct place to connect around the system."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-br from-cyan-400/20 via-violet-400/15 to-emerald-400/20 text-[#5865F2] shadow-[0_0_40px_rgba(88,101,242,0.18)]">
              <DiscordMark />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
              <img
                src={nexusApp?.iconSrc || "/images/placeholder-cover.svg"}
                alt="Nexus BodyOS app icon"
                className="h-11 w-11 rounded-2xl border border-white/15 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">Nexus BodyOS</p>
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Discord Community</p>
              </div>
            </div>
          </div>

          <h2 className="mt-8 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Join the room where the system keeps unfolding.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
            The Nexus BodyOS Discord is the place for product drops, community conversation, and closer proximity to
            how the platform is evolving in real time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#5865F2]/50 bg-[#5865F2] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4752c4]"
            >
              Join Discord
            </a>
            <a
              href="/NexusBodyOS"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              Back to Nexus BodyOS
            </a>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#12131b] via-[#0d0e14] to-black p-6 shadow-[0_0_80px_rgba(56,189,248,0.08)] md:p-7">
          <div className="rounded-[1.6rem] border border-white/10 bg-black/30 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5865F2] text-white">
                <DiscordMark />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Nexus BodyOS Server</p>
                <p className="text-sm text-zinc-400">Updates, discussion, and product orbit</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Get access to announcements and new feature momentum",
                "Stay close to the Nexus BodyOS community",
                "Jump in directly through the official invite link",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>

            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Join Discord
            </a>
          </div>
        </aside>
      </div>
    </NexusPageShell>
  );
}

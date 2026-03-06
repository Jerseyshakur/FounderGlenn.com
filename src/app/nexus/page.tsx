import { APPS, PRIMARY_APP_SLUG } from "@/content/apps";
import type { ReactNode } from "react";

export const metadata = {
  title: "Nexus | Founder Glenn",
  description: "Nexus app page.",
};

const primaryApp = APPS.find((app) => app.slug === PRIMARY_APP_SLUG) ?? APPS[0];
const includedApps = [
  {
    slug: primaryApp.slug,
    name: primaryApp.name,
    category: primaryApp.category ?? "Health & Fitness",
    appStoreUrl: primaryApp.appStoreUrl,
    iconSrc: "/things/nexuslogo.PNG",
  },
  {
    slug: "splits",
    name: "Splits",
    category: "Health & Fitness",
    appStoreUrl: "https://apps.apple.com/",
    iconSrc: "/things/nexuslogo.PNG",
  },
  {
    slug: "session-space",
    name: "Session Space",
    category: "Health & Fitness",
    appStoreUrl: "https://apps.apple.com/",
    iconSrc: "/things/nexuslogo.PNG",
  },
];

const stats = [
  { label: "Rating", value: primaryApp.rating ? `${primaryApp.rating.toFixed(1)} ★` : "Coming Soon" },
  { label: "Reviews", value: primaryApp.ratingCountText ?? "TBD" },
  { label: "Age", value: primaryApp.ageRating ?? "4+" },
  { label: "Category", value: primaryApp.category ?? "Health & Fitness" },
  { label: "Developer", value: primaryApp.developer ?? "Founder Glenn" },
  { label: "Language", value: primaryApp.language ?? "EN" },
];

type ShelfProps = {
  title: string;
  children: ReactNode;
};

function Shelf({ title, children }: ShelfProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function NexusPage() {
  return (
    <main className="min-h-screen bg-[#121212] px-6 py-16 text-zinc-100 md:py-20">
      <div className="mx-auto max-w-6xl space-y-8 md:space-y-10">
        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
            <img
              src={"/things/nexuslogo.PNG"}
              alt={`${primaryApp.name} icon`}
              className="h-28 w-28 rounded-[28px] border border-white/10 object-cover shadow-[0_24px_64px_rgba(0,0,0,0.35)] md:h-36 md:w-36"
            />

            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.14em] text-zinc-500">Nexus</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">{primaryApp.name}</h1>
              <p className="mt-3 max-w-2xl text-zinc-300 md:text-lg">{primaryApp.tagline}</p>
              <p className="mt-3 text-sm text-zinc-500">
                {primaryApp.status === "live" ? "In-App Purchases" : "Coming Soon"}
              </p>
            </div>

            <a
              href={primaryApp.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white px-8 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-zinc-200"
            >
              {primaryApp.status === "live" ? "Get" : "View"}
            </a>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3 md:grid-cols-6 md:gap-4 md:p-6">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.13em] text-zinc-500">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-white md:text-lg">{item.value}</p>
            </div>
          ))}
        </section>

        <Shelf title="Also Included In">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {includedApps.map((app) => (
              <a
                key={app.slug}
                href={app.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={app.iconSrc}
                    alt={`${app.name} icon`}
                    className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{app.name}</p>
                    <p className="truncate text-xs text-zinc-400">{app.category ?? "Coming Soon"}</p>
                  </div>
                  <span className="inline-flex h-8 items-center rounded-full border border-white/15 px-4 text-xs font-semibold text-zinc-100 transition-colors group-hover:border-white/30">
                    View
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Shelf>

        <Shelf title="What&apos;s New">
          <p className="max-w-3xl text-zinc-300">
            {primaryApp.whatsNew ??
              "A cleaner onboarding flow, improved coaching cues, and readiness updates designed for more consistent recovery decisions."}
          </p>
        </Shelf>

        <Shelf title="Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Version</p>
              <p className="mt-2 text-zinc-200">{primaryApp.version ?? "1.0.0"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Updated</p>
              <p className="mt-2 text-zinc-200">{primaryApp.updated ?? "March 2026"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Size</p>
              <p className="mt-2 text-zinc-200">{primaryApp.size ?? "84.2 MB"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Compatibility</p>
              <p className="mt-2 text-zinc-200">{primaryApp.compatibility ?? "iPhone, iPad"}</p>
            </div>
          </div>
        </Shelf>
      </div>
    </main>
  );
}

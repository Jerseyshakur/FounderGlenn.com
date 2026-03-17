import type { Metadata } from "next";
import Image from "next/image";
import { PODCAST_SHOWS } from "@/content/podcasts";
import {
  buildAbsoluteUrl,
  resolveOgImage,
  seoConfig,
} from "@/lib/seo";

const PODCASTS_PATH = "/podcasts";
const VISIBLE_SHOW_SLUG = "codex";

export const metadata: Metadata = {
  title: "Podcast Network",
  description:
    "Founder Glenn Podcast Network: full production interviews, Twitter Spaces archives, and codex deep dives.",
  alternates: {
    canonical: PODCASTS_PATH,
  },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl(PODCASTS_PATH),
    siteName: seoConfig.siteName,
    title: "Founder Glenn Podcast Network",
    description:
      "A collection of conversations, archives, and deep dives from Founder Glenn.",
    images: [{ url: resolveOgImage("/things/Glenn.PNG") }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Glenn Podcast Network",
    description:
      "A collection of conversations, archives, and deep dives from Founder Glenn.",
    images: [resolveOgImage("/things/Glenn.PNG")],
  },
};

function SpotifyEmbedPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-black/30 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
        Spotify Player
      </p>
      <p className="mt-3 text-sm text-zinc-300">
        Add the Spotify embed URL for <span className="font-semibold text-white">{title}</span>{" "}
        in <code>src/app/podcasts/page.tsx</code> to display the full player.
      </p>
    </div>
  );
}

export default function PodcastsPage() {
  const codexShow = PODCAST_SHOWS.find((show) => show.slug === VISIBLE_SHOW_SLUG);
  if (!codexShow) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#121212] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(18,18,18,0)_45%)] px-6 py-16 text-zinc-100 md:py-24">
      <article className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Founder Glenn Network
          </p>
          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.35rem)] font-bold tracking-[-0.02em] text-white">
            Founder Glenn Podcast Network
          </h1>
          <p className="mx-auto mt-7 max-w-[46rem] text-[1.06rem] leading-[1.9] text-zinc-300 md:text-xl md:leading-[1.85]">
            The Founder Glenn Podcast Network is a collection of long-form audio experiences built
            around philosophy, business, culture, and creative ownership. Each show explores a
            different layer of the Founder Glenn ecosystem designed for builders, thinkers, and
            future moguls.
          </p>
          <p className="mx-auto mt-5 max-w-[46rem] text-base leading-8 text-zinc-400 md:text-lg">
            <span className="font-semibold text-white">The Founder Glenn Codex</span> is the first
            official release. Additional shows are currently in development and will be published
            here as they go live.
          </p>
        </header>

        <section className="mt-12 grid gap-9">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
              <div className="relative min-h-[260px] border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
                <Image
                  src={codexShow.imageSrc}
                  alt={codexShow.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 300px, 100vw"
                />
              </div>

              <div className="space-y-8 p-6 md:p-9">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Show 01 - Canon Deep Dives</p>
                  <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.35rem)] font-semibold tracking-tight text-white">
                    The Founder Glenn Codex
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-400">
                    The Intellectual Archive of Founder Glenn
                  </p>
                  <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-zinc-300">
                    The Founder Glenn Codex is a long-form podcast dedicated to breaking down the
                    ideas, systems, and philosophies behind the Founder Glenn canon.
                  </p>
                  <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-zinc-300">
                    Each episode explores books, essays, frameworks, and real-world strategies,
                    unpacking the hidden structures behind power, ownership, creativity, and modern
                    civilization.
                  </p>
                  <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-zinc-300">
                    Part intellectual archive. Part builder&apos;s notebook. The Codex is where ideas
                    are decoded, structured, and made actionable.
                  </p>
                </div>

                <div className="grid gap-4 border-y border-white/10 py-5 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Topics</p>
                    <p className="mt-2 leading-7 text-zinc-300">
                      Business Strategy, Creative Ownership, Philosophy, Frameworks, Essays,
                      Worldbuilding, Wealth Structures, Cultural Analysis
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-zinc-200">
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Episode Length</p>
                    <p className="mt-1 font-medium text-white">20-40 minutes</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Sample Episodes</p>
                  <ul className="mt-2 space-y-2 text-zinc-300">
                    <li>Episode 1 - Decoding Founder Glenn: From Personal Tragedy to a Nation Inside a Nation</li>
                    <li>
                      Episode 2 - How to Become a Mogul While Falling in Love: Build Your Empire Without
                      Losing Yourself
                    </li>
                    <li>Episode 3 - Prophecy vs. Paperwork</li>
                    <li>Episode 4 - The Marcus Principle</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Listen</p>
                  <p className="mt-2 leading-7 text-zinc-300">
                    Available on <span className="font-semibold text-white">Spotify</span> and{" "}
                    <span className="font-semibold text-white">Apple Podcasts</span>.
                  </p>
                </div>

                {codexShow.spotifyEmbedUrl ? (
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <iframe
                      src={codexShow.spotifyEmbedUrl}
                      title={`${codexShow.title} Spotify player`}
                      width="100%"
                      height="232"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <SpotifyEmbedPlaceholder title={codexShow.title} />
                )}

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Player Integration</p>
                  <p className="mt-2 leading-7 text-zinc-300">
                    Add the Spotify embed URL for <span className="font-semibold text-white">The Founder Glenn Codex</span>{" "}
                    in <code>src/app/podcasts/page.tsx</code>.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </article>
    </main>
  );
}

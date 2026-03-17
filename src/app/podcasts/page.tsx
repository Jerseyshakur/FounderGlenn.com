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
  const visibleShows = PODCAST_SHOWS.filter((show) => show.slug === VISIBLE_SHOW_SLUG);

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
            The Founder Glenn Codex is the only show currently live on the website. Additional
            network shows remain in the background and will be published here when released.
          </p>
        </header>

        <section className="mt-12 grid gap-9">
          {visibleShows.map((show, index) => (
            <section
              key={show.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
                <div className="relative min-h-[260px] border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
                  <Image
                    src={show.imageSrc}
                    alt={show.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 300px, 100vw"
                  />
                </div>

                <div className="space-y-8 p-6 md:p-9">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Show {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{show.format}</p>
                    <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.35rem)] font-semibold tracking-tight text-white">
                      {show.title}
                    </h2>
                    <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-400">{show.deck}</p>
                    <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-zinc-300">{show.description}</p>
                  </div>

                  <div className="grid gap-4 border-y border-white/10 py-5 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Topics</p>
                      <p className="mt-2 leading-7 text-zinc-300">{show.topics.join(", ")}</p>
                    </div>
                    <div className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-zinc-200">
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Episode Length</p>
                      <p className="mt-1 font-medium text-white">{show.duration}</p>
                    </div>
                  </div>

                  {show.process ? (
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Process</p>
                      <ol className="mt-2 space-y-2 text-zinc-300">
                        {show.process.map((step, index) => (
                          <li key={step}>
                            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-xs text-zinc-200">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}

                  {show.sampleEpisodes ? (
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Sample Episodes</p>
                      <ul className="mt-2 space-y-2 text-zinc-300">
                        {show.sampleEpisodes.map((episode) => (
                          <li key={episode}>{episode}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {show.spotifyEmbedUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <iframe
                        src={show.spotifyEmbedUrl}
                        title={`${show.title} Spotify player`}
                        width="100%"
                        height="232"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <SpotifyEmbedPlaceholder title={show.title} />
                  )}

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Listen On</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {show.links.map((link) => (
                        <a
                          key={`${show.title}-${link.label}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/20 bg-white/[0.02] px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-white/45 hover:bg-white/[0.07] hover:text-white"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </section>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PODCAST_SHOWS,
  PODCAST_EPISODES,
  getPodcastEpisode,
  getPodcastShowBySlug,
  type PodcastShowSlug,
} from "@/content/podcasts";
import { buildAudioUrl, buildSiteUrl } from "@/lib/media";

type PodcastEpisodePageProps = {
  params: {
    show: string;
    episode: string;
  };
};

function isPodcastShowSlug(value: string): value is PodcastShowSlug {
  return value === "founder-glenn-podcast" || value === "foundation" || value === "codex";
}

export async function generateStaticParams() {
  return PODCAST_EPISODES.map((episode) => ({
    show: episode.show,
    episode: episode.slug,
  }));
}

export async function generateMetadata({ params }: PodcastEpisodePageProps): Promise<Metadata> {
  if (!isPodcastShowSlug(params.show)) {
    return {};
  }

  const show = getPodcastShowBySlug(params.show);
  const episode = getPodcastEpisode(params.show, params.episode);
  if (!show || !episode) {
    return {};
  }

  const pagePath = `/podcasts/${params.show}/${params.episode}`;

  return {
    title: `${episode.title} | ${show.title}`,
    description: episode.description,
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      type: "article",
      url: buildSiteUrl(pagePath),
      title: `${episode.title} | ${show.title}`,
      description: episode.description,
      images: [{ url: buildSiteUrl(episode.imageSrc || show.imageSrc) }],
      publishedTime: episode.publishedAt,
    },
  };
}

export default function PodcastEpisodePage({ params }: PodcastEpisodePageProps) {
  if (!isPodcastShowSlug(params.show)) {
    notFound();
  }

  const show = getPodcastShowBySlug(params.show);
  const episode = getPodcastEpisode(params.show, params.episode);
  if (!show || !episode) {
    notFound();
  }

  const audioUrl = buildAudioUrl(episode.audioKey);

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-16 text-zinc-100 md:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{show.title}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {episode.title}
        </h1>
        <p className="mt-5 text-zinc-300">{episode.description}</p>
        <p className="mt-3 text-sm text-zinc-400">
          Published {new Date(episode.publishedAt).toLocaleDateString("en-US")}{" "}
          {episode.duration ? `- ${episode.duration}` : ""}
        </p>

        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <audio controls preload="none" className="w-full" src={audioUrl}>
            <a href={audioUrl}>Listen to the episode audio</a>
          </audio>
          <p className="mt-4 text-xs text-zinc-500">Audio hosted on R2</p>
        </section>

        <div className="mt-7">
          <Link
            href="/podcasts"
            className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Back to Podcast Network
          </Link>
        </div>
      </article>
    </main>
  );
}

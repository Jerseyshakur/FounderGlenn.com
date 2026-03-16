export type PodcastShowSlug = "founder-glenn-podcast" | "foundation" | "codex";

export type PodcastShow = {
  slug: PodcastShowSlug;
  feedPath: `/rss/${string}.xml`;
  title: string;
  format: string;
  deck: string;
  description: string;
  topics: string[];
  duration: string;
  imageSrc: string;
  imageAlt: string;
  spotifyEmbedUrl?: string;
  links: Array<{ label: string; href: string }>;
  process?: string[];
  sampleEpisodes?: string[];
  language: string;
  category: string;
};

export type PodcastEpisode = {
  id: string;
  show: PodcastShowSlug;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  audioKey: string;
  audioBytes: number;
  duration?: string;
  imageSrc?: string;
  explicit?: boolean;
};

export const PODCAST_SHOWS: PodcastShow[] = [
  {
    slug: "founder-glenn-podcast",
    feedPath: "/rss/founder-glenn-podcast.xml",
    title: "The Founder Glenn Podcast",
    format: "Full production podcast",
    deck: "The flagship show",
    description:
      "Long-form conversations at the intersection of culture, systems, and creator leverage.",
    topics: [
      "Interviews",
      "Founder conversations",
      "Philosophy",
      "Culture",
      "Business",
      "Systems thinking",
      "Creator economy",
    ],
    duration: "45-90 minutes",
    imageSrc: "/aboutmefg.png",
    imageAlt: "Founder Glenn podcast cover image",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
      { label: "Amazon Music", href: "https://music.amazon.com/podcasts" },
      { label: "All Apps", href: "https://pod.link/" },
    ],
    language: "en-us",
    category: "Business",
  },
  {
    slug: "foundation",
    feedPath: "/rss/foundation.xml",
    title: "The Foundation",
    format: "Twitter Spaces archive",
    deck: "The live discussion show",
    description: "Live community discourse converted into an evergreen podcast feed.",
    topics: [
      "Creator debates",
      "Artist economics",
      "Tech discussions",
      "Philosophy threads",
      "Live Q&A",
    ],
    duration: "30-60 minutes",
    imageSrc: "/podcasts/the-foundation-cover.jpeg",
    imageAlt: "The Foundation Twitter Spaces cover image",
    process: [
      "Host live Twitter Spaces",
      "Download the recording",
      "Upload the audio as a podcast episode",
    ],
    links: [
      { label: "Spotify", href: "https://open.spotify.com/" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
      { label: "Amazon Music", href: "https://music.amazon.com/podcasts" },
      { label: "All Apps", href: "https://pod.link/" },
    ],
    language: "en-us",
    category: "Society & Culture",
  },
  {
    slug: "codex",
    feedPath: "/rss/codex.xml",
    title: "The Founder Glenn Codex",
    format: "Canon deep dives",
    deck: "The intellectual archive",
    description: "Solo breakdowns of books, frameworks, essays, and long-form philosophy.",
    topics: [
      "Books",
      "Frameworks",
      "Essays",
      "Philosophy",
      "Long-form breakdowns",
      "Project explanations",
    ],
    duration: "20-40 minutes",
    imageSrc: "/podcasts/founder-glenn-codex-cover.jpeg",
    imageAlt: "Founder Glenn Codex cover image",
    sampleEpisodes: [
      "Episode 1 - The Echopoint Vision",
      "Episode 2 - Builder Irrelevance",
      "Episode 3 - The Diaspora Special Zones",
      "Episode 4 - The Father Dynasty Trust",
      "Episode 5 - The Creator Sovereignty Model",
    ],
    links: [
      { label: "Spotify", href: "https://open.spotify.com/" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
      { label: "Amazon Music", href: "https://music.amazon.com/podcasts" },
      { label: "All Apps", href: "https://pod.link/" },
    ],
    language: "en-us",
    category: "Education",
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "fgp-001",
    show: "founder-glenn-podcast",
    title: "Episode 1 - The Beginning",
    slug: "episode-1-the-beginning",
    description: "Foundational conversation on creator leverage, ownership, and long-horizon systems.",
    publishedAt: "2026-03-16T12:00:00.000Z",
    audioKey: "audio/founder-glenn-podcast/episode-001.mp3",
    audioBytes: 12345678,
    duration: "00:48:12",
  },
  {
    id: "foundation-001",
    show: "foundation",
    title: "Episode 1 - Creator Debate Live",
    slug: "episode-1-creator-debate-live",
    description: "Live Twitter Spaces replay focused on artist economics and platform strategy.",
    publishedAt: "2026-03-16T12:00:00.000Z",
    audioKey: "audio/foundation/episode-001.mp3",
    audioBytes: 9988776,
    duration: "00:35:42",
  },
  {
    id: "codex-001",
    show: "codex",
    title: "Episode 1 - The Echopoint Vision",
    slug: "episode-1-the-echopoint-vision",
    description: "A codex deep dive into the architecture and intent behind the Echopoint vision.",
    publishedAt: "2026-03-16T12:00:00.000Z",
    audioKey: "audio/codex/episode-001.mp3",
    audioBytes: 7766554,
    duration: "00:28:04",
  },
];

export function getPodcastShowBySlug(showSlug: PodcastShowSlug) {
  return PODCAST_SHOWS.find((show) => show.slug === showSlug) || null;
}

export function getEpisodesByShow(showSlug: PodcastShowSlug) {
  return PODCAST_EPISODES
    .filter((episode) => episode.show === showSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPodcastEpisode(showSlug: PodcastShowSlug, episodeSlug: string) {
  return PODCAST_EPISODES.find((episode) => episode.show === showSlug && episode.slug === episodeSlug) || null;
}

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
  subcategory?: string;
};

export type PodcastEpisode = {
  id: string;
  show: PodcastShowSlug;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  audioKey: string;
  mimeType?: string;
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
      "The Founder Glenn Podcast is the flagship show of the Founder Glenn network, a space for real conversations about culture, creativity, business, philosophy, and the ideas shaping the modern world. Hosted by Founder Glenn, the podcast blends sharp commentary, storytelling, and deep discussion with creators, builders, and thinkers across different industries. Some episodes are interviews, some are debates, and some are unfiltered reflections on the systems behind music, media, technology, and power. At its core, this show is about understanding how things actually work and how to build something meaningful in the process.",
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
    imageSrc: "/podcasts/founder-glenn-podcast-cover-3000.jpg",
    imageAlt: "Founder Glenn podcast cover image",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com/" },
      { label: "Amazon Music", href: "https://music.amazon.com/podcasts" },
      { label: "All Apps", href: "https://pod.link/" },
    ],
    language: "en-us",
    category: "Business",
    subcategory: "Entrepreneurship",
  },
  {
    slug: "foundation",
    feedPath: "/rss/foundation.xml",
    title: "The Foundation",
    format: "Twitter Spaces archive",
    deck: "The live discussion show",
    description:
      "The Foundation is a live conversation series from the Founder Glenn network, recorded from Twitter Spaces. Each episode captures real-time discussions with creators, builders, and thinkers about culture, technology, business, and the ideas shaping the future. Unfiltered, unscripted, and collaborative, The Foundation is where ideas are tested in public.",
    topics: [
      "Creator debates",
      "Artist economics",
      "Tech discussions",
      "Philosophy threads",
      "Live Q&A",
    ],
    duration: "30-60 minutes",
    imageSrc: "/podcasts/the-foundation-cover-3000.jpg",
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
    subcategory: "Philosophy",
  },
  {
    slug: "codex",
    feedPath: "/rss/codex.xml",
    title: "The Founder Glenn Codex",
    format: "Canon deep dives",
    deck: "The intellectual archive",
    description:
      "The Founder Glenn Codex is a collection of deep dives into the ideas that shape the Founder Glenn canon. Each episode explores books, essays, frameworks, and philosophical concepts through long-form solo breakdowns, revealing the hidden structures behind culture, power, creativity, and civilization. Part intellectual archive, part builder's notebook, The Codex is where ideas are decoded.",
    topics: [
      "Books",
      "Frameworks",
      "Essays",
      "Philosophy",
      "Long-form breakdowns",
      "Project explanations",
    ],
    duration: "20-40 minutes",
    imageSrc: "/podcasts/founder-glenn-codex-cover-3000-v2.jpg",
    imageAlt: "Founder Glenn Codex cover image using Founder Glenn portrait",
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
    subcategory: "Self-Improvement",
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
    mimeType: "audio/mpeg",
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
    mimeType: "audio/mpeg",
    audioBytes: 9988776,
    duration: "00:35:42",
  },
  {
    id: "codex-000",
    show: "codex",
    title: "Decoding Founder Glenn: From Personal Tragedy to Nation Inside",
    slug: "decoding-founder-glenn-from-personal-tragedy-to-nation-inside",
    description:
      "In this episode, Founder Glenn pulls back the curtain on the story behind the philosophy, books, and systems that shaped his rise, from personal loss and internal battles to the construction of an entire intellectual and cultural framework. What begins as a story about tragedy evolves into something much larger: a blueprint for sovereignty, legacy, and structural power. Founder Glenn breaks down the experiences that forged his worldview, how grief became discipline, how isolation became strategy, and how a man searching for meaning began designing institutions meant to outlive him. The conversation explores the ideas behind works like Nation Inside a Nation, the principles of legacy-building, and the belief that true power comes not from noise, but from structure, positioning, and continuity. This episode is not just biography. It is a decoding of the mindset behind the movement. If you have ever wondered how pain turns into purpose, how philosophy becomes infrastructure, or how one man begins thinking in terms of generations instead of moments, this is the episode that explains it. Because the real story is not about surviving tragedy. It is about building something that makes the tragedy mean something.",
    publishedAt: "2026-03-16T11:10:00.000Z",
    audioKey: "CODEX/LIVE/S1/Decoding_Founder_Glenn__From_Personal_Tragedy_to_Nation_Inside_.m4a",
    mimeType: "audio/mp4",
    audioBytes: 71987572,
    duration: "00:37:17",
  },
  {
    id: "codex-001",
    show: "codex",
    title: "How to Become a Mogul While Falling in Love | Build Your Empire Without Losing Yourself",
    slug: "how-to-become-a-mogul-while-falling-in-love-build-your-empire-without-losing-yourself",
    description:
      "Most people think you have to choose: love or legacy, family or empire, heart or structure. This episode breaks that illusion completely. Inspired by How to Become a Mogul While Falling in Love, Founder Glenn walks through the real blueprint for building wealth, power, and emotional alignment at the same time without sacrificing one for the other. This is not relationship advice. This is infrastructure for love. From trust structures and emotional discipline to partner selection, legacy planning, and the concept of the Pre-Trust Era, this episode reframes relationships as something you do not fall into but something you engineer, protect, and scale. If you have ever asked: How do I build an empire and a family? How do I choose the right partner without losing focus? How do I protect my legacy before love even arrives? This is your starting point. Because love without structure collapses. And structure without love becomes empty. This is the middle path: The Mogul Blueprint. FUNNEL CTA: Read the full book: How to Become a Mogul While Falling in Love. Explore the Codex: FounderGlenn.com. Join the movement: The Codex Podcast Archive.",
    publishedAt: "2026-03-16T10:50:00.000Z",
    audioKey: "CODEX/LIVE/S1/Build_Your_Empire,_Find_Your_Love__The_Mogul_Blueprint_for_Lasting_Legacy.mp3",
    mimeType: "audio/mpeg",
    audioBytes: 46226839,
    duration: "00:32:06",
  },
  {
    id: "codex-002",
    show: "codex",
    title: "Prophecy vs Paperwork",
    slug: "prophecy-vs-paperwork",
    description: "Codex episode archive: Prophecy vs Paperwork.",
    publishedAt: "2026-03-16T10:40:00.000Z",
    audioKey:
      "CODEX/LIVE/S1/Prophecy vs Paperwork- The Real Blueprint for Black Sovereignty-18844822.mp3",
    mimeType: "audio/mpeg",
    audioBytes: 31506357,
    duration: "00:43:45",
  },
  {
    id: "codex-003",
    show: "codex",
    title: "The Marcus Principle",
    slug: "the-marcus-principle",
    description: "Codex episode archive: The Marcus Principle.",
    publishedAt: "2026-03-16T10:30:00.000Z",
    audioKey:
      "CODEX/LIVE/S1/The Marcus Principle- Identity vs Institutions-18845736.mp3",
    mimeType: "audio/mpeg",
    audioBytes: 36523434,
    duration: "00:50:43",
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

export function getPodcastEpisodeById(showSlug: PodcastShowSlug, episodeId: string) {
  return PODCAST_EPISODES.find((episode) => episode.show === showSlug && episode.id === episodeId) || null;
}

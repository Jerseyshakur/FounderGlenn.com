import { getAllPostsMeta } from "@/lib/blog";
import { buildSiteUrl, buildAudioProxyUrl } from "@/lib/media";
import { buildAbsoluteUrl, seoConfig } from "@/lib/seo";
import { PODCAST_SHOWS } from "@/content/podcasts";
import type { PodcastEpisode, PodcastShow } from "@/content/podcasts";

const XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>`;
const PODCAST_OWNER_NAME = process.env.PODCAST_OWNER_NAME || seoConfig.person.name;
const PODCAST_OWNER_EMAIL = process.env.PODCAST_OWNER_EMAIL || "contact@founderglenn.com";
const COPYRIGHT_LINE = `Copyright ${new Date().getUTCFullYear()} Founder Glenn`;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function cdata(value: string): string {
  return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function toRfc2822(dateValue: string): string {
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
}

function inferMimeType(audioKey: string): string {
  const lower = audioKey.toLowerCase();
  if (lower.endsWith(".m4a") || lower.endsWith(".mp4")) {
    return "audio/mp4";
  }
  if (lower.endsWith(".aac")) {
    return "audio/aac";
  }
  if (lower.endsWith(".wav")) {
    return "audio/wav";
  }
  return "audio/mpeg";
}

export async function buildBlogFeedXml(feedPath: string): Promise<string> {
  const posts = await getAllPostsMeta();
  const siteUrl = buildSiteUrl();
  const feedUrl = buildAbsoluteUrl(feedPath);

  const itemsXml = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${cdata(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <description>${cdata(post.description)}</description>`,
        `      <pubDate>${toRfc2822(post.date)}</pubDate>`,
        `      <guid>${escapeXml(url)}</guid>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    XML_HEADER,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:podcast="https://podcastindex.org/namespace/1.0">`,
    "  <channel>",
    `    <title>${cdata("Founder Glenn Blog")}</title>`,
    `    <link>${escapeXml(`${siteUrl}/blog`)}</link>`,
    `    <description>${cdata("Essays, frameworks, and build logs from Founder Glenn.")}</description>`,
    "    <language>en-us</language>",
    "    <podcast:guid>founderglenn:blog</podcast:guid>",
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    itemsXml,
    "  </channel>",
    "</rss>",
  ].join("\n");
}

export function buildPodcastFeedXml(
  show: PodcastShow,
  episodes: PodcastEpisode[],
  feedPath: string,
): string {
  const siteUrl = buildSiteUrl();
  const showUrl = buildSiteUrl("/podcasts");
  const feedUrl = buildAbsoluteUrl(feedPath);
  const showImage = buildSiteUrl(show.imageSrc);
  const latestDate = episodes[0]?.publishedAt || new Date().toISOString();

  const itemsXml = episodes
    .map((episode) => {
      const episodeUrl = buildSiteUrl(`/podcasts/${show.slug}/${episode.slug}`);
      const episodeImage = buildSiteUrl(episode.imageSrc || show.imageSrc);
      const audioUrl = buildAudioProxyUrl(show.slug, episode.id, episode.audioKey, episode.mimeType);

      return [
        "    <item>",
        `      <title>${cdata(episode.title)}</title>`,
        `      <description>${cdata(episode.description)}</description>`,
        `      <content:encoded>${cdata(`<p>${episode.description}</p>`)}</content:encoded>`,
        `      <pubDate>${toRfc2822(episode.publishedAt)}</pubDate>`,
        `      <enclosure url="${escapeXml(audioUrl)}" length="${episode.audioBytes}" type="${escapeXml(episode.mimeType || inferMimeType(episode.audioKey))}" />`,
        `      <guid isPermaLink="false">${escapeXml(`${show.slug}:${episode.id}`)}</guid>`,
        `      <link>${escapeXml(episodeUrl)}</link>`,
        `      <itunes:author>${cdata(seoConfig.person.name)}</itunes:author>`,
        `      <itunes:summary>${cdata(episode.description)}</itunes:summary>`,
        `      <itunes:explicit>${episode.explicit ? "true" : "false"}</itunes:explicit>`,
        episode.duration ? `      <itunes:duration>${escapeXml(episode.duration)}</itunes:duration>` : "",
        `      <itunes:image href="${escapeXml(episodeImage)}" />`,
        "      <itunes:episodeType>full</itunes:episodeType>",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    XML_HEADER,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:podcast="https://podcastindex.org/namespace/1.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">`,
    "  <channel>",
    `    <title>${cdata(show.title)}</title>`,
    `    <link>${escapeXml(showUrl)}</link>`,
    `    <description>${cdata(show.description)}</description>`,
    `    <copyright>${cdata(COPYRIGHT_LINE)}</copyright>`,
    `    <language>${escapeXml(show.language)}</language>`,
    `    <lastBuildDate>${toRfc2822(latestDate)}</lastBuildDate>`,
    `    <podcast:guid>${escapeXml(`founderglenn:${show.slug}`)}</podcast:guid>`,
    "    <podcast:locked>no</podcast:locked>",
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `    <itunes:author>${cdata(seoConfig.person.name)}</itunes:author>`,
    "    <itunes:owner>",
    `      <itunes:name>${cdata(PODCAST_OWNER_NAME)}</itunes:name>`,
    `      <itunes:email>${escapeXml(PODCAST_OWNER_EMAIL)}</itunes:email>`,
    "    </itunes:owner>",
    `    <itunes:summary>${cdata(show.description)}</itunes:summary>`,
    `    <itunes:type>episodic</itunes:type>`,
    "    <itunes:explicit>false</itunes:explicit>",
    `    <itunes:image href="${escapeXml(showImage)}" />`,
    show.subcategory
      ? `    <itunes:category text="${escapeXml(show.category)}"><itunes:category text="${escapeXml(show.subcategory)}" /></itunes:category>`
      : `    <itunes:category text="${escapeXml(show.category)}" />`,
    itemsXml,
    "  </channel>",
    "</rss>",
  ].join("\n");
}

export function buildPodcastNetworkFeedXml(episodes: PodcastEpisode[], feedPath: string): string {
  const showBySlug = new Map(PODCAST_SHOWS.map((show) => [show.slug, show]));
  const feedUrl = buildAbsoluteUrl(feedPath);
  const networkUrl = buildSiteUrl("/podcasts");
  const networkTitle = "Founder Glenn Podcast Network";
  const networkDescription =
    "A single feed for The Founder Glenn Podcast, The Foundation, and The Founder Glenn Codex.";
  const codexShow = PODCAST_SHOWS.find((show) => show.slug === "codex");
  const networkImage = buildSiteUrl(codexShow?.imageSrc || "/aboutmefg.png");
  const latestDate = episodes[0]?.publishedAt || new Date().toISOString();

  const itemsXml = episodes
    .map((episode) => {
      const show = showBySlug.get(episode.show);
      const showTitle = show?.title || episode.show;
      const episodeUrl = buildSiteUrl(`/podcasts/${episode.show}/${episode.slug}`);
      const episodeImage = buildSiteUrl(episode.imageSrc || show?.imageSrc || "/og-image.jpg");
      const audioUrl = buildAudioProxyUrl(episode.show, episode.id, episode.audioKey, episode.mimeType);

      return [
        "    <item>",
        `      <title>${cdata(`${showTitle} - ${episode.title}`)}</title>`,
        `      <description>${cdata(episode.description)}</description>`,
        `      <content:encoded>${cdata(`<p>${episode.description}</p>`)}</content:encoded>`,
        `      <pubDate>${toRfc2822(episode.publishedAt)}</pubDate>`,
        `      <enclosure url="${escapeXml(audioUrl)}" length="${episode.audioBytes}" type="${escapeXml(episode.mimeType || inferMimeType(episode.audioKey))}" />`,
        `      <guid isPermaLink="false">${escapeXml(`network:${episode.show}:${episode.id}`)}</guid>`,
        `      <link>${escapeXml(episodeUrl)}</link>`,
        `      <itunes:author>${cdata(seoConfig.person.name)}</itunes:author>`,
        `      <itunes:summary>${cdata(episode.description)}</itunes:summary>`,
        `      <itunes:explicit>${episode.explicit ? "true" : "false"}</itunes:explicit>`,
        episode.duration ? `      <itunes:duration>${escapeXml(episode.duration)}</itunes:duration>` : "",
        `      <itunes:image href="${escapeXml(episodeImage)}" />`,
        "      <itunes:episodeType>full</itunes:episodeType>",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    XML_HEADER,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:podcast="https://podcastindex.org/namespace/1.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">`,
    "  <channel>",
    `    <title>${cdata(networkTitle)}</title>`,
    `    <link>${escapeXml(networkUrl)}</link>`,
    `    <description>${cdata(networkDescription)}</description>`,
    `    <copyright>${cdata(COPYRIGHT_LINE)}</copyright>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${toRfc2822(latestDate)}</lastBuildDate>`,
    "    <podcast:guid>founderglenn:podcast-network</podcast:guid>",
    "    <podcast:locked>no</podcast:locked>",
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `    <itunes:author>${cdata(seoConfig.person.name)}</itunes:author>`,
    "    <itunes:owner>",
    `      <itunes:name>${cdata(PODCAST_OWNER_NAME)}</itunes:name>`,
    `      <itunes:email>${escapeXml(PODCAST_OWNER_EMAIL)}</itunes:email>`,
    "    </itunes:owner>",
    `    <itunes:summary>${cdata(networkDescription)}</itunes:summary>`,
    "    <itunes:type>episodic</itunes:type>",
    "    <itunes:explicit>false</itunes:explicit>",
    `    <itunes:image href="${escapeXml(networkImage)}" />`,
    `    <itunes:category text="${escapeXml("Business")}" />`,
    itemsXml,
    "  </channel>",
    "</rss>",
  ].join("\n");
}

export function rssResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      "Last-Modified": new Date().toUTCString(),
    },
  });
}

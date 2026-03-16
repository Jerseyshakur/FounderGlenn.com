import { getAllPostsMeta } from "@/lib/blog";
import { buildSiteUrl, buildAudioUrl } from "@/lib/media";
import { buildAbsoluteUrl, seoConfig } from "@/lib/seo";
import type { PodcastEpisode, PodcastShow } from "@/content/podcasts";

const XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>`;

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
      const audioUrl = buildAudioUrl(episode.audioKey);

      return [
        "    <item>",
        `      <title>${cdata(episode.title)}</title>`,
        `      <description>${cdata(episode.description)}</description>`,
        `      <pubDate>${toRfc2822(episode.publishedAt)}</pubDate>`,
        `      <enclosure url="${escapeXml(audioUrl)}" length="${episode.audioBytes}" type="audio/mpeg" />`,
        `      <guid isPermaLink="false">${escapeXml(`${show.slug}:${episode.id}`)}</guid>`,
        `      <link>${escapeXml(episodeUrl)}</link>`,
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
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:podcast="https://podcastindex.org/namespace/1.0">`,
    "  <channel>",
    `    <title>${cdata(show.title)}</title>`,
    `    <link>${escapeXml(showUrl)}</link>`,
    `    <description>${cdata(show.description)}</description>`,
    `    <language>${escapeXml(show.language)}</language>`,
    `    <lastBuildDate>${toRfc2822(latestDate)}</lastBuildDate>`,
    `    <podcast:guid>${escapeXml(`founderglenn:${show.slug}`)}</podcast:guid>`,
    "    <podcast:locked>no</podcast:locked>",
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `    <itunes:author>${cdata(seoConfig.person.name)}</itunes:author>`,
    `    <itunes:summary>${cdata(show.description)}</itunes:summary>`,
    `    <itunes:type>episodic</itunes:type>`,
    "    <itunes:explicit>false</itunes:explicit>",
    `    <itunes:image href="${escapeXml(showImage)}" />`,
    `    <itunes:category text="${escapeXml(show.category)}" />`,
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
    },
  });
}

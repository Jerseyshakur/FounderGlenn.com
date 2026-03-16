import { PODCAST_EPISODES } from "@/content/podcasts";
import { buildPodcastNetworkFeedXml, rssResponse } from "@/lib/rss";

const FEED_PATH = "/rss/network.xml";

export async function GET() {
  const episodes = [...PODCAST_EPISODES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const xml = buildPodcastNetworkFeedXml(episodes, FEED_PATH);
  return rssResponse(xml);
}

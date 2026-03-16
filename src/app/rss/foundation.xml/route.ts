import { getEpisodesByShow, getPodcastShowBySlug } from "@/content/podcasts";
import { buildPodcastFeedXml, rssResponse } from "@/lib/rss";

const SHOW_SLUG = "foundation";
const FEED_PATH = "/rss/foundation.xml";

export async function GET() {
  const show = getPodcastShowBySlug(SHOW_SLUG);
  if (!show) {
    return new Response("Not found", { status: 404 });
  }

  const episodes = getEpisodesByShow(SHOW_SLUG);
  const xml = buildPodcastFeedXml(show, episodes, FEED_PATH);
  return rssResponse(xml);
}

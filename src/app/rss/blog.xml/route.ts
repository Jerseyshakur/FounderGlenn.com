import { buildBlogFeedXml, rssResponse } from "@/lib/rss";

const FEED_PATH = "/rss/blog.xml";

export async function GET() {
  const xml = await buildBlogFeedXml(FEED_PATH);
  return rssResponse(xml);
}

/**
 * /blogs — legacy/duplicate route.
 *
 * Canonical blog route is /blog (which has the full article list and /blog/[slug] detail pages).
 * This file exists only to preserve any old links pointing to /blogs.
 * Do NOT delete this file — the redirect preserves inbound SEO equity.
 * To reverse: remove this redirect and restore content here.
 */
import { permanentRedirect } from "next/navigation";

export default function BlogsRedirectPage() {
  // 308 permanent redirect → /blog is the canonical route
  permanentRedirect("/blog");
}

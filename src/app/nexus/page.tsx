/**
 * /nexus — legacy/short route for the Nexus BodyOS product.
 *
 * Canonical Nexus route is /NexusBodyOS (full product page with all content).
 * This file exists only to preserve any old links pointing to /nexus.
 * Do NOT delete this file — the redirect preserves inbound SEO equity.
 * To reverse: remove this redirect and restore content here.
 */
import { permanentRedirect } from "next/navigation";

export default function NexusLegacyRedirectPage() {
  // 308 permanent redirect → /NexusBodyOS is the canonical route
  permanentRedirect("/NexusBodyOS");
}

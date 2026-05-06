/**
 * /nexushealthcare — legacy app-store support route for Nexus BodyOS.
 *
 * Canonical Nexus route is /NexusBodyOS (full product page with all content).
 * Sub-pages under /nexushealthcare (privacy, terms, faq, etc.) remain active
 * for Apple App Store compliance — only the root page redirects.
 * Do NOT delete this file — the redirect preserves inbound SEO equity.
 * To reverse: remove this redirect and restore content here.
 */
import { permanentRedirect } from "next/navigation";

export default function NexusHealthcareRedirectPage() {
  // 308 permanent redirect → /NexusBodyOS is the canonical route
  permanentRedirect("/NexusBodyOS");
}

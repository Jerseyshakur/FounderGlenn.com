export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

/**
 * Primary ecosystem navigation — grouped into 5 pillars.
 * Used by SiteNavDrawer to render a grouped nav with section headers.
 *
 * Legacy flat export (NAV_ITEMS) is preserved below for any component
 * that still consumes it directly, but the canonical structure is NAV_GROUPS.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    group: "Home",
    items: [
      { label: "Home", href: "/" },
    ],
  },
  {
    group: "Artists",
    items: [
      // /artists is the Artist Funnel landing page — primary ecosystem entry for creators
      { label: "Artist Infrastructure", href: "/artists" },
      { label: "Legal Kit", href: "/legal" },
      { label: "Royalty Recovery", href: "/royalties" },
      { label: "Kits", href: "/kits" },
      { label: "Music", href: "/music" },
    ],
  },
  {
    group: "Books",
    items: [
      { label: "Books", href: "/books/books" },
      { label: "Comics", href: "/comics" },
    ],
  },
  {
    group: "Nexus",
    items: [
      { label: "Nexus BodyOS", href: "/NexusBodyOS" },
    ],
  },
  {
    group: "Codex",
    items: [
      { label: "Essays", href: "/essays" },
      // Canonical blog route is /blog — /blogs permanently redirects here
      { label: "Blog", href: "/blog" },
      { label: "Podcasts", href: "/podcasts" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    group: "About / Founder",
    items: [
      { label: "About Founder Glenn", href: "/founder-glenn" },
      { label: "GLÉNN", href: "/glenn" },
      { label: "Pharaoh James Glenn", href: "/PharaohGlenn" },
      { label: "Pharaoh James · Shop", href: "/PharaohJames" },
      { label: "Maynard Eaton", href: "/maynard-eaton" },
      { label: "In Memory", href: "/in-memory" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * Flat list derived from NAV_GROUPS — kept for backward compatibility
 * with any component that iterates NAV_ITEMS directly.
 */
export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

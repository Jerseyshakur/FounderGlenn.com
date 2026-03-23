export type AppStatus = "live" | "coming_soon";

export type AppListing = {
  slug: string;
  name: string;
  tagline: string;
  iconSrc: string;
  appStoreUrl: string;
  rating?: number;
  ratingCountText?: string;
  ageRating?: string;
  category?: string;
  developer?: string;
  language?: string;
  status?: AppStatus;
  version?: string;
  updated?: string;
  size?: string;
  compatibility?: string;
  whatsNew?: string;
};

export const APPS: AppListing[] = [
  {
    slug: "nexus",
    name: "Nexus BodyOS",
    tagline: "Recovery and readiness coaching powered by physiology + AI.",
    iconSrc: "/images/nexus-bodyos-appicon.png",
    appStoreUrl: "https://apps.apple.com/",
    rating: 4.8,
    ratingCountText: "361 Ratings",
    ageRating: "4+",
    category: "Health & Fitness",
    developer: "Founder Glenn",
    language: "EN",
    status: "live",
    version: "1.0.0",
    updated: "March 2026",
    size: "84.2 MB",
    compatibility: "iPhone, iPad",
    whatsNew: "Performance improvements and readiness scoring refinements.",
  },
  {
    slug: "glenn-flow",
    name: "Glenn Flow",
    tagline: "Creative operating system for focused output.",
    iconSrc:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=300&auto=format&fit=crop",
    appStoreUrl: "https://apps.apple.com/",
    category: "Productivity",
    status: "coming_soon",
  },
  {
    slug: "legacy-ledger",
    name: "Legacy Ledger",
    tagline: "Personal legacy planning and system tracking.",
    iconSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop",
    appStoreUrl: "https://apps.apple.com/",
    category: "Lifestyle",
    status: "coming_soon",
  },
];

export const PRIMARY_APP_SLUG = "nexus";

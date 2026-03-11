import { BOOKS } from "@/content/books";
import { KITS } from "@/content/kits";
import { getAllPostSlugs } from "@/lib/blog";

const BASE_URL = "https://founderglenn.com";
const ROUTES = [
  "/",
  "/about",
  "/in-memory",
  "/books",
  "/books/books",
  "/essays",
  "/blog",
  "/glenn",
  "/NexusHealthKit",
  "/NexusHealthKit/privacy",
  "/NexusHealthKit/terms",
  "/NexusHealthKit/support",
  "/NexusHealthKit/subscription",
  "/NexusHealthKit/contact",
  "/NexusHealthKit/faq",
  "/NexusHealthKit/delete-data",
  "/NexusHealthKit/about",
  "/NexusHealthKit/features",
  "/NexusHealthKit/updates",
  "/legal",
  "/royalties",
  "/music",
  "/maynard-eaton",
  "/media",
  "/contact",
  "/kits",
  "/comics",
] as const;

function buildUrlEntry(route: string, lastModified: string) {
  const priority =
    route === "/"
      ? "1.0"
      : route === "/legal" || route === "/royalties" || route === "/NexusHealthKit"
        ? "0.9"
        : "0.8";

  return [
    "  <url>",
    `    <loc>${BASE_URL}${route === "/" ? "" : route}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export async function GET() {
  const lastModified = new Date().toISOString();
  const blogSlugs = await getAllPostSlugs();
  const essaySlugs = BOOKS.filter((book) => book.category === "essays").map((book) => book.slug);
  const kitSlugs = KITS.map((kit) => kit.slug);
  const bookSlugs = BOOKS.filter((book) => book.category !== "essays").map((book) => book.slug);

  const dynamicRoutes = [
    ...blogSlugs.map((slug) => `/blog/${slug}`),
    ...essaySlugs.map((slug) => `/essays/${slug}`),
    ...kitSlugs.map((slug) => `/kits/${slug}`),
    ...bookSlugs.map((slug) => `/books/${slug}`),
  ];

  const canonicalRoutes = Array.from(new Set([...ROUTES, ...dynamicRoutes]));
  const urls = canonicalRoutes.map((route) => buildUrlEntry(route, lastModified)).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

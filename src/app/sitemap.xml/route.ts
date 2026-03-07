const BASE_URL = "https://founderglenn.com";
const ROUTES = [
  "/",
  "/about",
  "/books",
  "/books/books",
  "/books/kits",
  "/books/comics",
  "/books/essays",
  "/essays",
  "/blog",
  "/blogs",
  "/glenn",
  "/nexus",
  "/music",
  "/maynard-eaton",
  "/media",
  "/contact",
  "/kits",
  "/comics",
] as const;

export async function GET() {
  const lastmod = new Date().toISOString();

  const urls = ROUTES.map((route) => {
    const priority = route === "/" ? "1.0" : "0.8";
    return [
      "  <url>",
      `    <loc>${BASE_URL}${route === "/" ? "" : route}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      "    <changefreq>weekly</changefreq>",
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

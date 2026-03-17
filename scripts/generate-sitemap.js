const fs = require("fs");
const path = require("path");

const SITE_URL = "https://adampeleback.com";
const PAGES_DIR = path.join(process.cwd(), "pages");
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");
const EXCLUDED_ROUTES = new Set(["/thanks"]);

function getAllPageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "api") {
        return [];
      }

      return getAllPageFiles(fullPath);
    }

    if (!/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      return [];
    }

    return [fullPath];
  });
}

function toRoute(filePath) {
  const relativePath = path.relative(PAGES_DIR, filePath).replace(/\\/g, "/");

  if (relativePath.startsWith("_")) {
    return null;
  }

  if (relativePath.includes("[")) {
    return null;
  }

  const route = relativePath
    .replace(/\.(js|jsx|ts|tsx)$/, "")
    .replace(/\/index$/, "")
    .replace(/^index$/, "");

  return route ? `/${route}` : "/";
}

function buildSitemapXml(routes) {
  const lastmod = new Date().toISOString();
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function generateSitemap() {
  const routes = getAllPageFiles(PAGES_DIR)
    .map(toRoute)
    .filter(Boolean)
    .filter((route) => !EXCLUDED_ROUTES.has(route))
    .sort((a, b) => a.localeCompare(b));

  fs.writeFileSync(OUTPUT_PATH, buildSitemapXml(routes), "utf8");
  console.log(`Generated sitemap with ${routes.length} routes at ${OUTPUT_PATH}`);
}

generateSitemap();

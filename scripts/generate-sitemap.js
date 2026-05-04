const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

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

function getLastModForFile(filePath) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (iso) return iso;
  } catch {
    // fall through to fs mtime
  }
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return null;
  }
}

function buildSitemapXml(entries) {
  const urls = entries
    .map(({ route, lastmod }) => {
      const lines = [`    <loc>${SITE_URL}${route}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function generateSitemap() {
  const entries = getAllPageFiles(PAGES_DIR)
    .map((filePath) => ({ filePath, route: toRoute(filePath) }))
    .filter(({ route }) => route && !EXCLUDED_ROUTES.has(route))
    .map(({ filePath, route }) => ({
      route,
      lastmod: getLastModForFile(filePath),
    }))
    .sort((a, b) => a.route.localeCompare(b.route));

  fs.writeFileSync(OUTPUT_PATH, buildSitemapXml(entries), "utf8");
  console.log(`Generated sitemap with ${entries.length} routes at ${OUTPUT_PATH}`);
}

generateSitemap();

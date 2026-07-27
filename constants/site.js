// The apex domain 308-redirects to www, so www is the canonical host.
// Everything that emits an absolute URL (canonicals, og tags, sitemap,
// structured data) must agree on this value.
const SITE_URL = "https://www.adampeleback.com";

module.exports = { SITE_URL };

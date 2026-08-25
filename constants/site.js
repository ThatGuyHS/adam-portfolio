// The apex domain 308-redirects to www, so www is the canonical host.
// Everything that emits an absolute URL (canonicals, og tags, sitemap,
// structured data) must agree on this value.
const SITE_URL = "https://www.adampeleback.com";

// Herotofu form endpoint used by every contact form on the site.
const CONTACT_FORM_ENDPOINT =
  "https://public.herotofu.com/v1/415b4140-5268-11ee-be6e-c34ffd625ead";

module.exports = { SITE_URL, CONTACT_FORM_ENDPOINT };

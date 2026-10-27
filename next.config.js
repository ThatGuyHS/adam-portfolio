/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Screenshots never change under the same file name, so cache optimized
    // versions for a month instead of the 60-second default.
    minimumCacheTTL: 2678400,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/seo-konsult",
        destination: "/webbkonsult",
        permanent: true,
      },
      // Projects removed in Oct 2026 because their sites went offline.
      ...[
        "book-report-template",
        "remote-work-radar",
        "nexus-collegiate",
        "best-travel-route",
        "webbdoktorn",
      ].map((slug) => ({
        source: `/project/${slug}`,
        destination: "/projects",
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;

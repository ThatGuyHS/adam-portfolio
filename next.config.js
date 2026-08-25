/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/seo-konsult",
        destination: "/webbkonsult",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

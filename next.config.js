/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // Rewrite /liveblog/stockcheck.htm -> /liveblog/stockcheck
      {
        source: '/liveblog/:slug.htm',
        destination: '/liveblog/:slug',
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; frame-ancestors 'self' https://nextgameceo.github.io; connect-src 'self' https://generativelanguage.googleapis.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
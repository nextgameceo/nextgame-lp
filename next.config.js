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
            value: `
              default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;
              img-src 'self' data: blob: https:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src 'self' 'unsafe-inline' https:;
              font-src 'self' data: https:;
              frame-src 'self' https:;
              frame-ancestors 'self' https://nextgameceo.github.io;
              connect-src 'self' https:;
            `.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
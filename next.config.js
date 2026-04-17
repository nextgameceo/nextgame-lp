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
      // LPページ（必要なら残す）
      {
        source: '/lp/:path*',
        headers: [
          // ⚠️ 削除 or コメントアウト推奨
          // SAMEORIGINだと外部iframe完全ブロック
          // {
          //   key: 'X-Frame-Options',
          //   value: 'SAMEORIGIN',
          // },
        ],
      },

      // 全体設定
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
              frame-ancestors 'self' https://nextgameceo.github.io;
              connect-src 'self' https://generativelanguage.googleapis.com;
            `.replace(/\n/g, ''),
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // ← 全ページ対象（ここ重要）
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
              frame-ancestors 
                'self'
                https://nextgame-limited.com
                https://www.nextgame-limited.com
                https://nextgameceo.github.io
                https://nextgame-lp.vercel.app;
              connect-src 'self' https:;
            `.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
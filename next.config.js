/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['openai'],
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // تنظیمات برای جلوگیری از redirect loop
  trailingSlash: false,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: '/business',
        destination: '/ai-marketing',
        permanent: true, // 308
      },
      {
        source: '/articles/ai/psychometrics',
        destination: '/what-does-an-ai-marketing-specialist-do',
        permanent: true, // 308
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\.(js|css|svg|png|jpg|jpeg|gif|webp|ico|woff2?)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

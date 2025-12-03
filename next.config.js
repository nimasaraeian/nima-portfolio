/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['openai'],
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // تنظیمات برای جلوگیری از redirect loop
  trailingSlash: false,
  poweredByHeader: false,
  
  // Image optimization for performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
    unoptimized: false,
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  reactStrictMode: true,
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },

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
      {
        source: '/articles/ai/ai-marketing-tools-2026',
        destination: '/articles/ai/marketing-tools-2026',
        permanent: true, // 308
      },
      {
        source: '/articles/ai/predictive-buyer-intent-ai',
        destination: '/articles/ai/predictive-buyer-intent-ai-2026',
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

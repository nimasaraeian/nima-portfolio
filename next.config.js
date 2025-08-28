/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['openai']
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // تنظیمات برای جلوگیری از redirect loop
  trailingSlash: false,
  poweredByHeader: false,
};

module.exports = nextConfig;

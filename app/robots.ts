import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = "https://nimasaraeian.com";
  
  // Explicit allow rules for key public sections
  const allowedPaths = [
    '/',
    '/about',
    '/services',
    '/projects',
    '/research',
    '/seminars',
    '/articles',
    '/contact',
    '/ai-marketing', // Allow main AI marketing page, but not sub-tools
  ];
  
  // Disallow non-indexable routes
  const disallowedPaths = [
    '/api/',
    '/admin/',
    '/ai-marketing/decision-brain',
    '/decision-brain',
    '/decision-demo',
    '/dashboard',
    '/dev/',
    '/result',
    '/content-analysis',
    '/articles/new',
    '/healthz',
    '/portfolio',
    '/strategy',
    '/_next/',
  ];
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: allowedPaths,
        disallow: disallowedPaths,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/image/', '/public/image/', '/seminars/', ...allowedPaths],
        disallow: disallowedPaths,
      },
      {
        userAgent: 'Googlebot',
        allow: allowedPaths,
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}


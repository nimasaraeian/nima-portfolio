import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.nimasaraeian.com";
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/image/', '/public/image/', '/seminars/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}


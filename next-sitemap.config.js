/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.nimasaraeian.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml'],
  
  // تنظیمات اضافی برای تصاویر
  additionalPaths: async (config) => {
    const result = [];
    
    // اضافه کردن تصاویر مهم
    const importantImages = [
      '/image/nima-bw.jpg',
      '/image/nima-pic.png',
      '/image/signature-white.png',
      '/image/SELPHLYZE_LOGO_HIGH_RES.png',
      '/image/aesthlyzerjpg.jpg',
      '/image/emotionai.JPG',
      '/image/Neuralfeedback.jpg',
      '/image/psychometrics.JPG'
    ];
    
    importantImages.forEach(imagePath => {
      result.push({
        loc: imagePath,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  },
  
  // تنظیمات robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/image/',
        allow: '/public/image/',
        allow: '/seminars/',
      },
    ],
    additionalSitemaps: [
      'https://www.nimasaraeian.com/image-sitemap.xml',
      'https://www.nimasaraeian.com/articles-sitemap.xml'
    ],
  },
};

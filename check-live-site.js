#!/usr/bin/env node

/**
 * بررسی وضعیت سایت زنده nimasaraeian.com
 */

const https = require('https');

const SITE_DOMAIN = 'www.nimasaraeian.com';

// لیست فایل‌های مهم برای بررسی
const criticalFiles = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/googlea749cf479c48223f.html',
  '/nima-saraeian.vcf',
  '/about',
  '/articles',
  '/projects'
];

// تابع بررسی وضعیت هر URL
function checkURL(url) {
  return new Promise((resolve) => {
    const fullUrl = `https://${SITE_DOMAIN}${url}`;
    
    const request = https.get(fullUrl, (res) => {
      const status = res.statusCode;
      const statusEmoji = status === 200 ? '✅' : status === 404 ? '❌' : '⚠️';
      
      console.log(`${statusEmoji} ${fullUrl} - Status: ${status}`);
      
      if (url === '/') {
        // بررسی meta tags صفحه اصلی
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          checkMetaTags(data);
          resolve({ url, status, hasContent: data.length > 0 });
        });
      } else {
        resolve({ url, status, hasContent: true });
      }
    });

    request.on('error', (err) => {
      console.log(`❌ ${fullUrl} - Error: ${err.message}`);
      resolve({ url, status: 'ERROR', hasContent: false });
    });

    request.setTimeout(10000, () => {
      console.log(`⏰ ${fullUrl} - Timeout`);
      request.destroy();
      resolve({ url, status: 'TIMEOUT', hasContent: false });
    });
  });
}

// بررسی meta tags
function checkMetaTags(html) {
  console.log('\n🔍 بررسی Meta Tags صفحه اصلی:');
  console.log('═'.repeat(50));
  
  const checks = [
    { pattern: /<title[^>]*>([^<]+)<\/title>/i, name: 'Title' },
    { pattern: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i, name: 'Description' },
    { pattern: /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i, name: 'OG Title' },
    { pattern: /<meta[^>]*name=["']google-site-verification["'][^>]*content=["']([^"']+)["']/i, name: 'Google Verification' },
    { pattern: /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i, name: 'Structured Data' }
  ];
  
  checks.forEach(check => {
    const match = html.match(check.pattern);
    if (match) {
      const content = match[1] || 'موجود';
      console.log(`✅ ${check.name}: ${content.substring(0, 80)}${content.length > 80 ? '...' : ''}`);
    } else {
      console.log(`❌ ${check.name}: یافت نشد`);
    }
  });
}

// تابع اصلی
async function main() {
  console.log(`🌐 بررسی وضعیت سایت: ${SITE_DOMAIN}`);
  console.log('═'.repeat(60));
  
  const results = [];
  
  for (const file of criticalFiles) {
    const result = await checkURL(file);
    results.push(result);
    
    // فاصله کوتاه بین درخواست‌ها
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // نتیجه‌گیری
  console.log('\n📊 خلاصه نتایج:');
  console.log('═'.repeat(50));
  
  const working = results.filter(r => r.status === 200).length;
  const total = results.length;
  
  console.log(`✅ فایل‌های کارآمد: ${working}/${total}`);
  console.log(`❌ فایل‌های مشکل‌دار: ${total - working}/${total}`);
  
  if (working === total) {
    console.log('\n🎉 عالی! همه چیز آماده است!');
    console.log('📝 مراحل بعدی:');
    console.log('1. Google Search Console رو باز کن');
    console.log('2. Property اضافه کن: https://nimasaraeian.com');
    console.log('3. Verification انجام بده');
    console.log('4. Sitemap submit کن: https://nimasaraeian.com/sitemap.xml');
  } else {
    console.log('\n⚠️ برخی فایل‌ها مشکل دارند!');
    console.log('🔧 ابتدا مشکلات را برطرف کنید.');
  }
  
  console.log('\n🔗 لینک‌های مهم:');
  console.log('• Google Search Console: https://search.google.com/search-console');
  console.log('• Rich Results Test: https://search.google.com/test/rich-results');
  console.log('• PageSpeed Insights: https://pagespeed.web.dev/');
}

// اجرا
main().catch(console.error);

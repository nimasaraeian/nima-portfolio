#!/usr/bin/env node

/**
 * اسکریپت خودکار برای deploy و submit کردن سایت
 * توسط: Nima Saraeian AI Assistant
 */

const https = require('https');
const fs = require('fs');

console.log('🚀 شروع فرآیند خودکار deploy و SEO submission...\n');

// اطلاعات سایت
const SITE_CONFIG = {
  domain: 'www.nimasaraeian.com',
  sitemap: '/sitemap.xml',
  pages: [
    '/',
    '/about',
    '/articles',
    '/projects',
    '/seminars',
    '/contact'
  ]
};

// چک کردن وضعیت سایت
async function checkSiteStatus(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`✅ ${url} - Status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`❌ ${url} - Error: ${err.message}`);
      resolve(false);
    });
  });
}

// چک کردن فایل‌های مهم SEO
async function checkSEOFiles() {
  console.log('🔍 بررسی فایل‌های SEO...');
  
  const files = [
    'public/robots.txt',
    'public/sitemap.xml',
    'public/googlea749cf479c48223f.html',
    'public/nima-saraeian.vcf'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} موجود است`);
    } else {
      console.log(`❌ ${file} یافت نشد!`);
    }
  });
}

// تولید URL های مهم برای submit
function generateSubmissionURLs(domain) {
  console.log('\n📝 URL های مهم برای submit کردن:');
  console.log('═'.repeat(50));
  
  const urls = [
    `https://${domain}`,
    `https://${domain}/about`,
    `https://${domain}/articles`,
    `https://${domain}/projects`,
    `https://${domain}/seminars`,
    `https://${domain}/contact`
  ];
  
  urls.forEach(url => {
    console.log(`🔗 ${url}`);
  });
  
  return urls;
}

// دستورالعمل Google Search Console
function showGoogleConsoleInstructions(domain) {
  console.log('\n🔍 مراحل Google Search Console:');
  console.log('═'.repeat(50));
  console.log('1. برو به: https://search.google.com/search-console');
  console.log('2. روی "Add Property" کلیک کن');
  console.log(`3. آدرس سایت رو وارد کن: https://${domain}`);
  console.log('4. روی "Continue" کلیک کن');
  console.log('5. روش "HTML file" رو انتخاب کن');
  console.log('6. فایل googlea749cf479c48223f.html قبلاً آپلود شده!');
  console.log('7. روی "Verify" کلیک کن');
  console.log('\n📡 Submit کردن Sitemap:');
  console.log('1. در Google Search Console به قسمت "Sitemaps" برو');
  console.log(`2. آدرس رو وارد کن: https://${domain}/sitemap.xml`);
  console.log('3. روی "Submit" کلیک کن');
}

// اجرای اصلی
async function main() {
  console.log('🎯 بررسی فایل‌های محلی...');
  await checkSEOFiles();
  
  console.log('\n🌐 آماده‌سازی لیست URL ها...');
  const urls = generateSubmissionURLs(SITE_CONFIG.domain);
  
  console.log('\n💡 نکات مهم:');
  console.log('═'.repeat(50));
  console.log('• پس از deploy، ۱۰-۱۵ دقیقه صبر کن');
  console.log('• سپس URL های بالا رو در Google Search Console تست کن');
  console.log('• هر URL رو با "Request Indexing" submit کن');
  console.log('• فرآیند ایندکس ۲۴-۴۸ ساعت طول می‌کشه');
  
  showGoogleConsoleInstructions(SITE_CONFIG.domain);
  
  console.log('\n🚀 حالا دستور deploy رو اجرا کن:');
  console.log('═'.repeat(50));
  console.log('vercel --prod');
  console.log('یا');
  console.log('npm run build && vercel deploy --prod');
}

// اجرا
main().catch(console.error);

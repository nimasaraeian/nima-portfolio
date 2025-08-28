#!/usr/bin/env node

/**
 * 🚀 اسکریپت ایندکس فوری تمام صفحات - Nima Saraeian
 * این اسکریپت همه URL های مهم رو برات لیست می‌کنه
 */

const SITE_DOMAIN = 'www.nimasaraeian.com';

// تمام صفحات موجود در سایت (از نتیجه build)
const ALL_PAGES = [
  '/',
  '/about',
  '/articles',
  '/articles/ai',
  '/articles/AI-Digital-Psychology',
  '/articles/ai/aesthlyzer',
  '/articles/ai/ai-powered-content-specialist',
  '/articles/ai/emoconnect',
  '/articles/ai/emotion-ai',
  '/articles/ai/ethics',
  '/articles/ai/neural-feedback',
  '/articles/ai/personality-models',
  '/articles/ai/psychometrics',
  '/articles/ai/selfCode',
  '/articles/Daily-Insights',
  '/articles/Marketing-Branding',
  '/articles/new',
  '/articles/psychology',
  '/articles/psychology/mental-health',
  '/articles/psychology/personality',
  '/projects',
  '/resume',
  '/seminars',
  '/contact'
];

// فایل‌های SEO مهم
const SEO_FILES = [
  '/robots.txt',
  '/sitemap.xml',
  '/googlea749cf479c48223f.html',
  '/nima-saraeian.vcf'
];

console.log('🎯 ایندکس فوری تمام صفحات سایت Nima Saraeian');
console.log('═'.repeat(60));

console.log(`📊 آمار کلی:`);
console.log(`• تعداد صفحات اصلی: ${ALL_PAGES.length}`);
console.log(`• تعداد فایل‌های SEO: ${SEO_FILES.length}`);
console.log(`• مجموع: ${ALL_PAGES.length + SEO_FILES.length} آیتم`);

console.log('\n🔗 لیست کامل URL های برای ایندکس:');
console.log('═'.repeat(60));

// نمایش URL های اصلی
console.log('\n📄 صفحات اصلی:');
ALL_PAGES.forEach((page, index) => {
  const fullUrl = `https://${SITE_DOMAIN}${page}`;
  console.log(`${(index + 1).toString().padStart(2, '0')}. ${fullUrl}`);
});

// نمایش فایل‌های SEO
console.log('\n🔧 فایل‌های SEO:');
SEO_FILES.forEach((file, index) => {
  const fullUrl = `https://${SITE_DOMAIN}${file}`;
  console.log(`${(index + 1).toString().padStart(2, '0')}. ${fullUrl}`);
});

console.log('\n🚀 مراحل ایندکس فوری:');
console.log('═'.repeat(60));
console.log('1️⃣ برو به Google Search Console:');
console.log('   👉 https://search.google.com/search-console');
console.log('');
console.log('2️⃣ اگر Property نداری، اضافه کن:');
console.log(`   👉 Add Property: https://${SITE_DOMAIN}`);
console.log('   👉 Verify با فایل HTML (قبلاً آماده شده)');
console.log('');
console.log('3️⃣ Submit کردن Sitemap (یکبار کافیه):');
console.log('   👉 قسمت Sitemaps رو باز کن');
console.log(`   👉 آدرس وارد کن: https://${SITE_DOMAIN}/sitemap.xml`);
console.log('   👉 Submit کن');
console.log('');
console.log('4️⃣ Request Indexing صفحات مهم (دستی):');
console.log('   👉 قسمت URL Inspection رو باز کن');
console.log('   👉 هر URL رو وارد کن و "Request Indexing" بزن');

console.log('\n⚡ صفحات اولویت بالا برای Request Indexing:');
console.log('═'.repeat(60));
const priorityPages = [
  '/',
  '/about',
  '/articles',
  '/projects',
  '/seminars'
];

priorityPages.forEach((page, index) => {
  const fullUrl = `https://${SITE_DOMAIN}${page}`;
  console.log(`🔥 ${index + 1}. ${fullUrl}`);
});

console.log('\n🤖 روش‌های سریع‌تر ایندکس:');
console.log('═'.repeat(60));
console.log('• پست کردن لینک‌ها در شبکه‌های اجتماعی');
console.log('• لینک دادن از سایت‌های دیگه');
console.log('• ثبت در directory های معتبر');
console.log('• ایجاد backlink از منابع مرتبط');

console.log('\n📈 نتیجه‌گیری:');
console.log('═'.repeat(60));
console.log('✅ فایل‌های SEO آماده');
console.log('✅ Sitemap تولید شده');
console.log('✅ Meta tags بهینه');
console.log('✅ Structured data اضافه شده');
console.log('');
console.log('🕐 زمان انتظار ایندکس:');
console.log('• Sitemap: 2-24 ساعت');
console.log('• Request Indexing: 1-7 روز');
console.log('• ایندکس طبیعی: 1-4 هفته');

console.log('\n💡 نکته مهم:');
console.log('تمام URL های بالا رو کپی کن و تو یه فایل text ذخیره کن');
console.log('بعد یکی یکی تو Google Search Console تست کن!');

// تولید فایل متنی URL ها
const allUrls = [
  ...ALL_PAGES.map(page => `https://${SITE_DOMAIN}${page}`),
  ...SEO_FILES.map(file => `https://${SITE_DOMAIN}${file}`)
];

console.log(`\n📝 تولید فایل URL List...`);

// ذخیره لیست URL ها
require('fs').writeFileSync('all-urls-for-indexing.txt', allUrls.join('\n'));
console.log('✅ فایل all-urls-for-indexing.txt تولید شد!');
console.log('این فایل رو باز کن و URL ها رو کپی کن.');

console.log('\n🎯 آماده برای شروع ایندکس!');

const cron = require('node-cron');
const { generateDailyArticles, saveArticleToFile } = require('../lib/content-generator');
const fs = require('fs');
const path = require('path');

// تنظیمات محیطی
require('dotenv').config();

// تابع تولید و ذخیره مقالات روزانه
async function generateAndSaveDailyContent() {
  console.log('🚀 Starting daily content generation...');
  console.log(`📅 Date: ${new Date().toLocaleDateString('fa-IR')}`);
  
  try {
    // تولید مقالات برای تمام دسته‌ها
    const articles = await generateDailyArticles();
    
    console.log(`✅ Generated ${articles.length} articles successfully`);
    
    // ذخیره هر مقاله در فایل جداگانه
    for (const article of articles) {
      saveArticleToFile(article);
      console.log(`📝 Saved: ${article.title} (${article.category})`);
    }
    
    // به‌روزرسانی فایل index برای مقالات جدید
    updateArticlesIndex(articles);
    
    // به‌روزرسانی sitemap
    updateSitemap(articles);
    
    console.log('🎉 Daily content generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in daily content generation:', error);
  }
}

// به‌روزرسانی فایل index مقالات
function updateArticlesIndex(articles) {
  const indexFile = path.join(process.cwd(), 'app', 'articles', 'data.ts');
  
  let indexContent = `// Auto-generated articles index
export interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  category: 'psychology' | 'ai' | 'marketing' | 'daily';
  tags: string[];
  publishedAt: string;
  wordCount: number;
  imageUrl?: string;
  href: string;
}

export const articles: ArticleData[] = [
`;

  // گروه‌بندی مقالات بر اساس دسته
  const categories = ['psychology', 'ai', 'marketing', 'daily'];
  
  for (const category of categories) {
    const categoryArticles = articles.filter(article => article.category === category);
    
    for (const article of categoryArticles) {
      indexContent += `  {
    id: '${article.id}',
    title: '${article.title.replace(/'/g, "\\'")}',
    excerpt: '${article.excerpt.replace(/'/g, "\\'")}',
    category: '${article.category}',
    tags: [${article.tags.map(tag => `'${tag.replace(/'/g, "\\'")}'`).join(', ')}],
    publishedAt: '${article.publishedAt}',
    wordCount: ${article.wordCount},
    imageUrl: '${article.imageUrl}',
    href: '/articles/${article.category}/${article.id}'
  },
`;
    }
  }
  
  indexContent += `];

export default articles;
`;
  
  fs.writeFileSync(indexFile, indexContent);
  console.log('📚 Updated articles index');
}

// به‌روزرسانی sitemap
function updateSitemap(articles) {
  const sitemapFile = path.join(process.cwd(), 'public', 'articles-sitemap.xml');
  
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  for (const article of articles) {
    sitemapContent += `  <url>
    <loc>https://www.nimasaraeian.com/articles/${article.category}/${article.id}</loc>
    <lastmod>${article.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }
  
  sitemapContent += `</urlset>`;
  
  fs.writeFileSync(sitemapFile, sitemapContent);
  console.log('🗺️ Updated articles sitemap');
}

// تنظیم زمانبندی - هر روز ساعت 6 صبح
const schedule = '0 6 * * *'; // Cron format: هر روز ساعت 6 صبح

console.log('⏰ Setting up daily content generation schedule...');
console.log(`📅 Schedule: ${schedule} (Every day at 6:00 AM)`);

// راه‌اندازی cron job
cron.schedule(schedule, () => {
  console.log('⏰ Daily content generation triggered by cron');
  generateAndSaveDailyContent();
}, {
  scheduled: true,
  timezone: "Asia/Tehran" // زمان تهران
});

// اجرای اولیه برای تست
console.log('🧪 Running initial content generation for testing...');
generateAndSaveDailyContent();

// نگه داشتن اسکریپت در حال اجرا
console.log('🔄 Content generator is running... Press Ctrl+C to stop');
process.on('SIGINT', () => {
  console.log('\n👋 Stopping content generator...');
  process.exit(0);
});



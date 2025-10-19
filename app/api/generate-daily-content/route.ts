import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  console.log('🚀 Daily content generation API called');
  console.log(`📅 Date: ${new Date().toLocaleDateString('en-US')}`);
  console.log(`⏰ Time: ${new Date().toLocaleTimeString('en-US')}`);
  
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: false, message: 'OPENAI_API_KEY is not set' }, { status: 200 });
    }
    
    // Dynamic import to avoid build-time errors
    const { generateDailyArticles, saveArticleToFile } = await import('../../../lib/content-generator');
    
    // تولید یک مقاله جدید برای امروز
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
    
    return NextResponse.json({
      success: true,
      message: 'Daily content generated successfully',
      articlesGenerated: articles.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error in daily content generation:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error generating daily content',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// به‌روزرسانی فایل index مقالات
function updateArticlesIndex(articles: any[]) {
  const indexFile = path.join(process.cwd(), 'app', 'articles', 'data.ts');
  
  let indexContent = `// Auto-generated articles index - Updated: ${new Date().toISOString()}
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
    tags: [${article.tags.map((tag: string) => `'${tag.replace(/'/g, "\\'")}'`).join(', ')}],
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
function updateSitemap(articles: any[]) {
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





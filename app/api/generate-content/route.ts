import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey || apiKey === 'sk-your-actual-openai-api-key-here') {
      return NextResponse.json(
        { error: 'لطفاً API Key معتبر OpenAI را وارد کنید' },
        { status: 400 }
      );
    }

    // تنظیم API Key در محیط
    const envApiKey = apiKey;

    // Dynamic import برای جلوگیری از خطای build-time
    const { generateDailyArticles, saveArticleToFile } = await import('../../../lib/content-generator');

    console.log('🚀 Starting content generation...');
    
    // تولید مقالات
    const articles = await generateDailyArticles();
    
    // ذخیره مقالات در فایل
    for (const article of articles) {
      saveArticleToFile(article);
    }

    console.log(`✅ Generated ${articles.length} articles successfully`);

    return NextResponse.json({
      success: true,
      articlesGenerated: articles.length,
      articles: articles.map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        wordCount: article.wordCount,
        imageUrl: article.imageUrl
      }))
    });

  } catch (error) {
    console.error('❌ Error in content generation:', error);
    
    let errorMessage = 'خطا در تولید محتوا';
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'API Key نامعتبر است';
      } else if (error.message.includes('quota')) {
        errorMessage = 'محدودیت استفاده از OpenAI API';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // اطلاعات سیستم
    const fs = require('fs');
    const path = require('path');
    
    // بررسی تعداد مقالات موجود
    let totalArticles = 0;
    const categories = ['psychology', 'ai', 'marketing', 'daily'];
    
    for (const category of categories) {
      const categoryPath = path.join(process.cwd(), 'app', 'articles', category);
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath);
        totalArticles += files.filter((file: string) => file.endsWith('.tsx')).length;
      }
    }

    // بررسی آخرین اجرا
    const lastRun = fs.existsSync('.last-run') 
      ? fs.readFileSync('.last-run', 'utf8') 
      : null;

    return NextResponse.json({
      status: 'Active',
      lastRun,
      totalArticles,
      categories,
      systemInfo: {
        version: '1.0.0',
        lastCheck: new Date().toISOString(),
        features: [
          'Daily content generation',
          'AI-powered image creation',
          'Automatic SEO optimization',
          'Multi-category support'
        ]
      }
    });

  } catch (error) {
    console.error('Error getting system info:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت اطلاعات سیستم' },
      { status: 500 }
    );
  }
}

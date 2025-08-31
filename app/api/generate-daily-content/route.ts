import { NextRequest, NextResponse } from 'next/server';
import { generateDailyArticles } from '../../../../lib/content-generator';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Daily content generation triggered via API');
    
    // تولید مقالات روزانه
    const articles = await generateDailyArticles();
    
    console.log(`✅ Generated ${articles.length} articles successfully`);
    
    return NextResponse.json({
      success: true,
      message: `Generated ${articles.length} articles successfully`,
      articles: articles.map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        publishedAt: article.publishedAt
      }))
    });
    
  } catch (error) {
    console.error('❌ Error in daily content generation:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Manual content generation triggered via API');
    
    // تولید مقالات روزانه
    const articles = await generateDailyArticles();
    
    console.log(`✅ Generated ${articles.length} articles successfully`);
    
    return NextResponse.json({
      success: true,
      message: `Generated ${articles.length} articles successfully`,
      articles: articles.map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        publishedAt: article.publishedAt
      }))
    });
    
  } catch (error) {
    console.error('❌ Error in manual content generation:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

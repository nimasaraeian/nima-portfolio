const { generateDailyArticles } = require('../lib/content-generator');

// تنظیمات محیطی
require('dotenv').config({ path: '.env.local' });

async function testDailyContentGeneration() {
  console.log('🧪 Testing daily content generation...');
  console.log(`📅 Date: ${new Date().toLocaleDateString('en-US')}`);
  console.log(`⏰ Time: ${new Date().toLocaleTimeString('en-US')}`);
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Set' : 'Not Set'}`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in .env.local file');
    console.log('Please add your OpenAI API key to .env.local file:');
    console.log('OPENAI_API_KEY=your_actual_api_key_here');
    return;
  }
  
  try {
    // تولید یک مقاله برای تست
    const articles = await generateDailyArticles();
    
    console.log(`✅ Generated ${articles.length} articles successfully`);
    
    for (const article of articles) {
      console.log(`📝 Article: ${article.title}`);
      console.log(`   Category: ${article.category}`);
      console.log(`   Word Count: ${article.wordCount}`);
      console.log(`   Tags: ${article.tags.join(', ')}`);
      console.log(`   Image: ${article.imageUrl}`);
      console.log('---');
    }
    
    console.log('🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in test:', error);
  }
}

// اجرای تست
testDailyContentGeneration();












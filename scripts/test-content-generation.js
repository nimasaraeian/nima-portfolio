// Test script for content generation system
require('dotenv').config();

const { generateDailyArticles, saveArticleToFile } = require('../lib/content-generator');

async function testContentGeneration() {
  console.log('🧪 Testing content generation system...\n');
  
  try {
    // Test single article generation
    console.log('📝 Testing single article generation...');
    const articles = await generateDailyArticles();
    
    if (articles.length > 0) {
      console.log(`✅ Successfully generated ${articles.length} articles`);
      
      // Save first article as test
      const testArticle = articles[0];
      console.log(`\n📄 Test article details:`);
      console.log(`   Title: ${testArticle.title}`);
      console.log(`   Category: ${testArticle.category}`);
      console.log(`   Word Count: ${testArticle.wordCount}`);
      console.log(`   Tags: ${testArticle.tags.join(', ')}`);
      
      // Save to file
      saveArticleToFile(testArticle);
      console.log(`\n💾 Article saved to file system`);
      
    } else {
      console.log('❌ No articles were generated');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('\n💡 Make sure to set your OPENAI_API_KEY in .env.local');
      console.log('   Example: OPENAI_API_KEY=sk-your-key-here');
    }
  }
  
  console.log('\n🏁 Test completed');
}

// Run test
testContentGeneration();

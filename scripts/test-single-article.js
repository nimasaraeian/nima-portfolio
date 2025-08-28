require('dotenv').config({ path: '.env.local' });

const { generateArticle } = require('../lib/content-generator.js');

async function testSingleArticle() {
  console.log('🧪 Testing single article generation...\n');
  
  try {
    // تست تولید یک مقاله در دسته AI
    console.log('📝 Generating AI article...');
    const article = await generateArticle('ai');
    
    console.log('\n✅ Article generated successfully!');
    console.log('📄 Title:', article.title);
    console.log('🏷️ Category:', article.category);
    console.log('📊 Word Count:', article.wordCount);
    console.log('🖼️ Image URL:', article.imageUrl);
    console.log('🏷️ Tags:', article.tags.join(', '));
    console.log('📅 Published:', article.publishedAt);
    
    console.log('\n📝 Excerpt:');
    console.log(article.excerpt);
    
    console.log('\n🖼️ Image Prompt used:', article.imageUrl.includes('http') ? 'DALL-E generated' : 'Default image');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('\n💡 Make sure to set your OPENAI_API_KEY in .env.local');
      console.log('   Example: OPENAI_API_KEY=sk-your-actual-key-here');
    }
  }
  
  console.log('\n🏁 Test completed');
}

// Run test
testSingleArticle();

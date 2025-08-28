const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

// تنظیمات OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// تعریف انواع مقالات
const CATEGORIES = {
  psychology: {
    name: 'Psychology',
    topics: [
      'Cognitive Behavioral Therapy',
      'Emotional Intelligence',
      'Personality Development',
      'Mental Health Awareness',
      'Social Psychology',
      'Child Psychology',
      'Positive Psychology',
      'Stress Management',
      'Mindfulness and Meditation',
      'Relationship Psychology'
    ]
  },
  ai: {
    name: 'Artificial Intelligence',
    topics: [
      'Machine Learning in Psychology',
      'AI-Powered Mental Health Tools',
      'Natural Language Processing',
      'Computer Vision in Healthcare',
      'Ethical AI Development',
      'AI and Human Behavior',
      'Neural Networks',
      'Deep Learning Applications',
      'AI in Education',
      'Future of AI Technology'
    ]
  },
  marketing: {
    name: 'Marketing & Branding',
    topics: [
      'Consumer Psychology',
      'Digital Marketing Strategies',
      'Brand Identity Development',
      'Neuromarketing Techniques',
      'Social Media Marketing',
      'Content Marketing',
      'User Experience Design',
      'Market Research Methods',
      'Brand Positioning',
      'Customer Behavior Analysis'
    ]
  },
  daily: {
    name: 'Daily Insights',
    topics: [
      'Personal Development',
      'Habit Formation',
      'Productivity Tips',
      'Work-Life Balance',
      'Health and Wellness',
      'Financial Psychology',
      'Time Management',
      'Goal Setting',
      'Self-Improvement',
      'Life Skills Development'
    ]
  }
};

// دانلود و ذخیره تصویر
async function downloadAndSaveImage(imageUrl, fileName) {
  try {
    const imageDir = path.join(process.cwd(), 'public', 'image');
    const imagePath = path.join(imageDir, fileName);
    
    // ایجاد دایرکتوری اگر وجود ندارد
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    
    // دانلود تصویر
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(imagePath);
      https.get(imageUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Image saved: ${imagePath}`);
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(imagePath, () => {}); // حذف فایل ناقص
        reject(err);
      });
    });
    
  } catch (error) {
    console.error('Error in downloadAndSaveImage:', error);
    throw error;
  }
}

// انتخاب تصویر پیش‌فرض بر اساس دسته‌بندی
function getDefaultImageForCategory(category) {
  const defaultImages = {
    psychology: '/image/mentalhealth.jpg',
    ai: '/image/emotionai.JPG',
    marketing: '/image/ConsumerBehavior.jpg',
    daily: '/image/mood.JPG'
  };
  
  return defaultImages[category] || '/image/nima-bw.jpg';
}

// تولید تصویر مناسب برای مقاله
async function generateArticleImage(prompt, category, title) {
  try {
    // استفاده از DALL-E برای تولید تصویر
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt}. Professional, modern, clean design. Suitable for ${category} article. High quality, detailed.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural",
    });

    const imageUrl = imageResponse.data[0]?.url;
    
    if (imageUrl) {
      // ذخیره تصویر در پوشه public/image
      const imageName = `${category}-${Date.now()}.jpg`;
      const imagePath = `/image/${imageName}`;
      
      try {
        // دانلود و ذخیره تصویر
        await downloadAndSaveImage(imageUrl, imageName);
        return imagePath;
      } catch (downloadError) {
        console.error('Error downloading image:', downloadError);
        return imageUrl; // در صورت خطا، URL مستقیم را برمی‌گردانیم
      }
    }
    
    // اگر تولید تصویر موفق نبود، از تصاویر پیش‌فرض استفاده کنید
    return getDefaultImageForCategory(category);
    
  } catch (error) {
    console.error('Error generating image:', error);
    // در صورت خطا، از تصاویر پیش‌فرض استفاده کنید
    return getDefaultImageForCategory(category);
  }
}

// تولید محتوای مقاله با OpenAI
async function generateArticle(category) {
  const categoryInfo = CATEGORIES[category];
  const randomTopic = categoryInfo.topics[Math.floor(Math.random() * categoryInfo.topics.length)];
  
  const prompt = `Write a comprehensive, professional article about "${randomTopic}" in the context of ${categoryInfo.name}. 
  
  Requirements:
  - Minimum 1000 words
  - Professional and academic tone
  - Include practical examples and case studies
  - Use clear headings and structure
  - Include relevant statistics and research findings
  - Make it engaging and informative
  - Focus on practical applications and insights
  
  Format the response as:
  TITLE: [Article Title]
  EXCERPT: [Brief summary in 2-3 sentences]
  CONTENT: [Full article content with proper formatting]
  TAGS: [5-7 relevant tags separated by commas]
  IMAGE_PROMPT: [Detailed description for generating a relevant cover image]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert content writer specializing in psychology, AI, marketing, and personal development. Write high-quality, informative articles that provide real value to readers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // تجزیه پاسخ
    const titleMatch = response.match(/TITLE:\s*(.+)/);
    const excerptMatch = response.match(/EXCERPT:\s*(.+)/);
    const contentMatch = response.match(/CONTENT:\s*([\s\S]*?)(?=TAGS:|$)/);
    const tagsMatch = response.match(/TAGS:\s*(.+)/);
    const imagePromptMatch = response.match(/IMAGE_PROMPT:\s*(.+)/);

    const title = titleMatch?.[1]?.trim() || `Latest Insights in ${categoryInfo.name}`;
    const excerpt = excerptMatch?.[1]?.trim() || 'Discover the latest insights and research findings.';
    const content = contentMatch?.[1]?.trim() || response;
    const tags = tagsMatch?.[1]?.split(',').map(tag => tag.trim()) || [categoryInfo.name.toLowerCase()];
    const imagePrompt = imagePromptMatch?.[1]?.trim() || `Professional ${categoryInfo.name} concept illustration`;

    // تولید تصویر مناسب برای مقاله
    const imageUrl = await generateArticleImage(imagePrompt, category, title);

    const article = {
      id: generateArticleId(),
      title,
      content,
      excerpt,
      category,
      tags,
      publishedAt: new Date().toISOString(),
      wordCount: content.split(' ').length,
      imageUrl
    };

    return article;
  } catch (error) {
    console.error('Error generating article:', error);
    throw new Error('Failed to generate article content');
  }
}

// تولید ID منحصر به فرد
function generateArticleId() {
  return `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// تولید مقالات برای تمام دسته‌ها
async function generateDailyArticles() {
  const articles = [];
  
  for (const category of Object.keys(CATEGORIES)) {
    try {
      console.log(`Generating article for ${category}...`);
      const article = await generateArticle(category);
      articles.push(article);
      console.log(`✅ Generated: ${article.title} (${article.wordCount} words)`);
      
      // تأخیر کوتاه بین درخواست‌ها
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating article for ${category}:`, error);
    }
  }
  
  return articles;
}

// Export functions
module.exports = {
  generateDailyArticles,
  generateArticle,
  CATEGORIES
};

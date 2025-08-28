# 🤖 Content Generation System Guide

## 📋 Overview

This system automatically generates high-quality articles daily for your website in four categories:
- **Psychology** 🧠
- **Artificial Intelligence** 🤖  
- **Marketing & Branding** 📈
- **Daily Insights** 🌟

Each article is professionally written with 1000+ words, SEO optimized, and automatically published to your site.

## 🚀 Quick Start

### 1. Setup OpenAI API Key

Create a `.env.local` file in your project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
CONTENT_GENERATION_ENABLED=true
```

### 2. Install Dependencies

```bash
npm install openai cron node-cron
```

### 3. Access Content Manager

Navigate to `/admin/content` to access the content management interface.

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ Yes |
| `CONTENT_GENERATION_ENABLED` | Enable/disable system | ❌ No |
| `DAILY_ARTICLE_COUNT` | Articles per day (default: 4) | ❌ No |
| `MAX_WORDS_PER_ARTICLE` | Target word count (default: 1500) | ❌ No |

### Schedule Configuration

The system runs automatically every day at **6:00 AM Tehran time**.

To modify the schedule, edit `scripts/daily-content-generator.js`:

```javascript
const schedule = '0 6 * * *'; // Cron format: Daily at 6 AM
```

## 🔧 Manual Operation

### Generate Content Manually

1. Go to `/admin/content`
2. Enter your OpenAI API key
3. Click "Generate Daily Content"
4. Wait for completion (typically 2-3 minutes)

### API Endpoint

You can also trigger generation via API:

```bash
curl -X POST /api/generate-content \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 📁 File Structure

```
app/
├── articles/
│   ├── psychology/     # Psychology articles
│   ├── ai/            # AI articles  
│   ├── marketing/     # Marketing articles
│   ├── daily/         # Daily insights
│   └── data.ts        # Auto-generated index
├── api/
│   └── generate-content/  # Content generation API
└── admin/
    └── content/           # Management interface

lib/
└── content-generator.ts   # Core generation logic

scripts/
└── daily-content-generator.js  # Cron job script

public/
└── articles-sitemap.xml   # Auto-updated sitemap
```

## 🎯 Article Categories & Topics

### Psychology 🧠
- Cognitive Behavioral Therapy
- Emotional Intelligence
- Personality Development
- Mental Health Awareness
- Social Psychology
- Child Psychology
- Positive Psychology
- Stress Management
- Mindfulness and Meditation
- Relationship Psychology

### Artificial Intelligence 🤖
- Machine Learning in Psychology
- AI-Powered Mental Health Tools
- Natural Language Processing
- Computer Vision in Healthcare
- Ethical AI Development
- AI and Human Behavior
- Neural Networks
- Deep Learning Applications
- AI in Education
- Future of AI Technology

### Marketing & Branding 📈
- Consumer Psychology
- Digital Marketing Strategies
- Brand Identity Development
- Neuromarketing Techniques
- Social Media Marketing
- Content Marketing
- User Experience Design
- Market Research Methods
- Brand Positioning
- Customer Behavior Analysis

### Daily Insights 🌟
- Personal Development
- Habit Formation
- Productivity Tips
- Work-Life Balance
- Health and Wellness
- Financial Psychology
- Time Management
- Goal Setting
- Self-Improvement
- Life Skills Development

## 🔄 Automation Features

### Daily Generation
- **Time**: 6:00 AM Tehran time
- **Frequency**: Every day
- **Articles**: 4 (one per category)
- **Word Count**: 1000+ words each

### Automatic Updates
- ✅ Article files created
- ✅ React components generated
- ✅ SEO metadata injected
- ✅ Sitemap updated
- ✅ Index files refreshed

### Quality Control
- Professional writing style
- Academic tone
- Practical examples
- Research citations
- SEO optimization
- Responsive design

## 🛡️ Security Features

- API key stored locally only
- Authentication required for manual generation
- No external data transmission
- Protected admin interface
- Rate limiting protection

## 📊 Monitoring & Status

### Check System Status
- Visit `/admin/content`
- Click "Check Status"
- View generation history
- Monitor error logs

### Logs
System logs are displayed in the terminal when running the cron job:

```bash
🚀 Starting daily content generation...
📅 Date: 1403/01/15
✅ Generated 4 articles successfully
📝 Saved: Cognitive Behavioral Therapy (psychology)
📝 Saved: Machine Learning in Psychology (ai)
📝 Saved: Consumer Psychology (marketing)
📝 Saved: Personal Development (daily)
📚 Updated articles index
🗺️ Updated articles sitemap
🎉 Daily content generation completed successfully!
```

## 🚨 Troubleshooting

### Common Issues

1. **API Key Error**
   - Verify your OpenAI API key is correct
   - Ensure you have sufficient credits
   - Check API rate limits

2. **Generation Fails**
   - Check internet connection
   - Verify OpenAI service status
   - Review error logs in terminal

3. **Files Not Created**
   - Check file permissions
   - Verify directory structure
   - Ensure sufficient disk space

4. **Cron Job Not Running**
   - Verify timezone settings
   - Check system clock
   - Review cron service status

### Error Recovery

The system includes automatic error handling:
- Retry logic for failed requests
- Graceful degradation
- Error logging and reporting
- Automatic cleanup on failures

## 📈 Performance Optimization

### Tips for Better Results

1. **API Key Management**
   - Use dedicated API key for content generation
   - Monitor usage and costs
   - Implement rate limiting if needed

2. **Content Quality**
   - Review generated content regularly
   - Adjust prompts for better results
   - Monitor reader engagement

3. **SEO Optimization**
   - Review meta tags and descriptions
   - Check keyword density
   - Monitor search rankings

## 🔮 Future Enhancements

### Planned Features
- [ ] Content analytics dashboard
- [ ] A/B testing for article titles
- [ ] Social media auto-posting
- [ ] Content performance tracking
- [ ] Multi-language support
- [ ] Advanced topic selection
- [ ] Content scheduling flexibility

### Customization Options
- [ ] Custom article templates
- [ ] Brand voice configuration
- [ ] Topic preference settings
- [ ] Content length options
- [ ] Publication timing control

## 📞 Support

For technical support or questions:
1. Check this documentation
2. Review error logs
3. Verify configuration settings
4. Test with manual generation
5. Check system requirements

## 📝 License

This content generation system is part of your website project and follows the same licensing terms.

---

**Note**: This system generates high-quality, original content using OpenAI's GPT-4. All generated content is automatically published to your website and should be reviewed for accuracy and appropriateness before publication.




# Nima Saraeian - AI & Digital Psychology Expert Website

This is the official website of Nima Saraeian (نیما سرائیان), an AI-driven psychological researcher and digital psychology expert. The website showcases research, projects, and insights in the intersection of AI, psychology, and human behavior.

**Live Site**: [https://www.nimasaraeian.com](https://www.nimasaraeian.com)

## Features

- 🤖 **AI-Powered Content Generation**: Daily articles in psychology, AI, marketing, and daily insights
- 🧠 **Psychology Research**: Latest insights in digital psychology and behavioral analytics
- 🤖 **AI Technology**: Research and applications in artificial intelligence
- 📈 **Marketing & Branding**: Consumer behavior and digital marketing strategies
- 🌟 **Daily Insights**: Personal development and life skills content
- 📱 **Responsive Design**: Optimized for all devices
- 🔍 **SEO Optimized**: Full meta tags, structured data, and sitemaps
- 🌐 **Persian & English**: Bilingual content support

## Content Generation System

The website features an automated content generation system powered by OpenAI GPT-4:

- **Daily Articles**: 4 new articles every day at 6 AM Tehran time
- **Categories**: Psychology, AI, Marketing, Daily Insights
- **Quality**: 1000+ words per article, professionally written
- **SEO**: Automatic meta tags, structured data, and sitemap updates
- **Management**: Admin interface at `/admin/content`

## Getting Started

First, set up your environment:

```bash
# Install dependencies
npm install

# Set up OpenAI API key
echo "OPENAI_API_KEY=your_key_here" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Access the content management system at `/admin/content`:

```bash
# Generate content manually
npm run generate-content

# Test content generation
npm run content-manual
```

## Learn More

To learn more about the content generation system, see:

- [Content Generation Guide](CONTENT-GENERATION-GUIDE.md) - Complete system documentation
- [Admin Interface](/admin/content) - Content management system
- [API Documentation](/api/generate-content) - Content generation API

## Deployment

The website is deployed on Vercel:

- **Production**: [https://www.nimasaraeian.com](https://www.nimasaraeian.com)
- **Vercel Dashboard**: [Vercel Platform](https://vercel.com)

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Content**: OpenAI GPT-4 integration
- **Deployment**: Vercel
- **SEO**: Next-sitemap, structured data, meta tags
- **Languages**: TypeScript, JavaScript

## Contact

- **Website**: [https://www.nimasaraeian.com](https://www.nimasaraeian.com)
- **Email**: nimasaraeian65@gmail.com
- **LinkedIn**: [linkedin.com/in/nima.saraeian](https://www.linkedin.com/in/nima.saraeian)

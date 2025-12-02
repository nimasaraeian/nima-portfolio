require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateArticleAudio() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set. Please add it to .env.local');
    process.exit(1);
  }

  // این آرایه را می‌توانی بعداً برای مقالات دیگر هم گسترش بدهی
  const summaries = [
    {
      slug: 'marketing/ai-marketing-roles-2026',
      filename: 'ai-marketing-roles-2026-summary.mp3',
      text: `
This article is a practical map of the AI marketing job landscape in 2026. It explains why classic digital marketing roles are no longer enough, how AI has become the operating system of modern marketing, and why companies now need clearly defined roles like AI Marketing Specialist, Strategist, Expert, Consultant, and Engineer. You’ll hear how these roles differ in responsibility and mindset: from hands-on execution and content production, to system design, data-backed decision making, and long‑term AI transformation inside an organization. The article also covers what skills actually matter in this new market — from prompt engineering and analytics to consumer psychology, automation, and behavior prediction — plus which types of businesses should hire which roles first. By the end, you’ll have a clear mental model of where you fit in this ecosystem, how to position yourself for future AI marketing careers, and how companies can build lean, high‑leverage teams that use AI to move faster instead of just adding more tools and job titles.
      `,
      voice: 'alloy',
      format: 'mp3',
    },
    {
      slug: 'ai/predictive-buyer-intent-ai',
      filename: 'predictive-buyer-intent-ai-summary.mp3',
      text: `
This article is a deep dive into Predictive Buyer Intent AI and why reading behavior before someone decides to buy is becoming the new foundation of marketing. It starts with a real case study from a beauty clinic that looked successful on the surface but failed to convert, showing how traditional metrics like clicks and CTR can hide the truth about intent. You’ll learn what buyer intent really is, how micro‑signals like scroll patterns, hesitations, returns, and page jumps can reveal when someone is curious, evaluating, or genuinely ready to take action. The article then explains how modern AI systems turn these tiny behavioral clues into an Intent Score, build predictive funnels around stages like Awareness, Consideration, and Decision, and automatically adapt messaging, offers, and follow‑ups in real time. By the end, you’ll see how Buyer Intent AI lets you stop guessing, stop wasting ad spend on low‑intent traffic, and start building smarter campaigns that speak to people at the exact moment their psychology is ready to move forward.
      `,
      voice: 'alloy',
      format: 'mp3',
    },
  ];

  for (const item of summaries) {
    console.log(`🎧 Generating audio for: ${item.slug}`);

    const cleanText = item.text.trim().slice(0, 4000);

    try {
      const response = await openai.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: item.voice || 'alloy',
        format: item.format || 'mp3',
        input: cleanText,
      });

      const audioBuffer = Buffer.from(await response.arrayBuffer());

      const outDir = path.join(process.cwd(), 'public', 'audio');
      const outPath = path.join(outDir, item.filename);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outPath, audioBuffer);
      console.log(`✅ Saved audio to: ${outPath}`);
    } catch (error) {
      console.error(`❌ Failed to generate audio for ${item.slug}:`, error.message || error);
    }
  }

  console.log('🏁 Audio generation finished');
}

generateArticleAudio().catch((err) => {
  console.error('❌ Unexpected error during audio generation:', err);
  process.exit(1);
});



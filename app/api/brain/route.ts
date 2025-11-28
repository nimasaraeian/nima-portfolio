import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface BrainRequest {
  role: string;
  locale: string;
  city: string;
  industry: string;
  channel: string;
  query: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: BrainRequest = await req.json();
    const { role, locale, city, industry, channel, query } = body;

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OpenAI API key not configured',
          response: 'Please configure OPENAI_API_KEY in your environment variables.',
          quality_score: 0,
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    // Build system prompt based on role
    let systemPrompt = `You are an expert AI Marketing Strategist specializing in behavior-first marketing systems. 
You use Selphlyze (psychometrics) and Contlyze (behavior & content intelligence) to provide actionable insights.

Your responses should be:
- Practical and actionable
- Based on behavioral psychology and data
- Specific to the industry, city, and channel provided
- Structured with clear sections and recommendations
- Include specific examples and next steps

Format your response in markdown with clear headings (##, ###) and bullet points.`;

    // Customize prompt based on module/role
    if (role === 'ai_marketing_strategist') {
      systemPrompt += `\n\nYou are analyzing: ${query}\nIndustry: ${industry}\nCity: ${city}\nChannel: ${channel}\nLocale: ${locale}`;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using cost-effective model, can upgrade to gpt-4o if needed
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content || 'No response generated';

    // Calculate quality score (simple heuristic based on response length and structure)
    let quality_score = 3; // Base score
    if (responseText.length > 500) quality_score += 1;
    if (responseText.includes('##') || responseText.includes('###')) quality_score += 1; // Has structure
    if (quality_score > 5) quality_score = 5;

    return NextResponse.json({
      response: responseText,
      quality_score: quality_score,
      quality_checks: {
        has_structure: responseText.includes('##') || responseText.includes('###'),
        has_specific_recommendations: responseText.length > 300,
        has_examples: responseText.toLowerCase().includes('example') || responseText.toLowerCase().includes('مثال'),
        actionable: responseText.toLowerCase().includes('step') || responseText.toLowerCase().includes('action') || responseText.toLowerCase().includes('گام'),
      },
    });
  } catch (error) {
    console.error('Error in /api/brain:', error);
    
    let errorMessage = 'An error occurred while processing your request';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        response: 'Please try again later or contact support if the issue persists.',
        quality_score: 0,
      },
      { status: 500 }
    );
  }
}


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
  console.log('📥 /api/brain POST request received');
  
  try {
    // Check if request is FormData (for Behavioral DeepScan) or JSON (for other modules)
    const contentType = req.headers.get('content-type') || '';
    let body: any;
    let query: string;
    let role: string = 'marketer';
    let locale: string = 'en';
    let city: string = '';
    let industry: string = '';
    let channel: string = '';
    let imageFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (Behavioral DeepScan)
      const formData = await req.formData();
      const content = formData.get('content') as string || '';
      imageFile = formData.get('image') as File | null;
      const platform = formData.get('platform') as string || 'landing_page';
      let goalStr = formData.get('goal') as string || '["leads"]';
      const audience = formData.get('audience') as string || 'cold';
      const language = formData.get('language') as string || 'en';

      // Parse goal JSON string safely
      let goalArray: string[] = ['leads'];
      try {
        if (goalStr) {
          const parsed = JSON.parse(goalStr);
          goalArray = Array.isArray(parsed) ? parsed : [parsed];
        }
      } catch (e) {
        console.warn('Failed to parse goal, using default:', e);
        goalArray = ['leads'];
      }

      // Build query from content and image
      if (imageFile) {
        // If image is provided, we'll need to process it
        // For now, include it in the query description
        query = `Behavioral DeepScan Analysis for ${platform}. Content: ${content || '[Image provided]'}. Goal: ${goalArray.join(', ')}. Audience: ${audience}. Language: ${language}.`;
      } else {
        query = `Behavioral DeepScan Analysis for ${platform}. Content: ${content}. Goal: ${goalArray.join(', ')}. Audience: ${audience}. Language: ${language}.`;
      }
      
      console.log('📋 FormData received:', { platform, goal: goalArray, audience, language, hasImage: !!imageFile, contentLength: content.length });
    } else {
      // Handle JSON (other modules)
      body = await req.json();
      console.log('📋 Request body:', { role: body.role, industry: body.industry, city: body.city, channel: body.channel });
      
      ({ role, locale, city, industry, channel, query } = body);
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('❌ OpenAI API key not configured');
      return NextResponse.json(
        {
          error: 'OpenAI API key not configured',
          response: 'Please configure OPENAI_API_KEY in your environment variables.',
          quality_score: 0,
        },
        { status: 500 }
      );
    }
    
    console.log('✅ OpenAI API key found, proceeding with request...');

    const openai = new OpenAI({ apiKey });

    // Build system prompt based on role and query content
    let systemPrompt = `You are an expert AI Marketing Strategist specializing in behavior-first marketing systems. 
You use Selphlyze (psychometrics) and Contlyze (behavior & content intelligence) to provide actionable insights.

Your responses should be:
- Practical and actionable
- Based on behavioral psychology and data
- Specific to the industry, city, and channel provided
- Structured with clear sections and recommendations
- Include specific examples and next steps

Format your response in markdown with clear headings (##, ###) and bullet points.`;

    // Check if this is a Behavioral DeepScan request
    const isDeepScan = query.includes('Behavioral DeepScan Analysis') || query.includes('Psychometric mapping') || contentType.includes('multipart/form-data');
    
    if (isDeepScan) {
      // Specialized prompt for Behavioral DeepScan
      systemPrompt = `You are an expert Behavioral Psychologist and Marketing Strategist using Selphlyze (proprietary AI psychometric layer).
Your task is to perform a Behavioral DeepScan analysis.

Provide a comprehensive analysis including:
1. **Summary**: Overview of behavioral patterns and insights
2. **Segments**: Audience segments with distinct behavioral characteristics
3. **Barriers**: Psychological and practical barriers preventing action
4. **Triggers**: Emotional and behavioral triggers that drive action
5. **Recommendations**: Actionable strategies based on psychometric insights

Format your response as structured JSON with these keys: summary, segments (array), barriers (array), triggers (array), recommendations (array).
If you cannot provide structured JSON, format clearly with these sections using markdown headings.`;
    } else {
      // Standard prompt for other modules
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
    console.log('✅ OpenAI response received, length:', responseText.length);

    // Check if this is a DeepScan response and try to parse structured data
    // isDeepScan was already declared above, so we reuse it
    
    if (isDeepScan) {
      console.log('🔍 Processing DeepScan response...');
      // Try to parse JSON response, fallback to text parsing
      let parsedResponse: any = { response: responseText };
      
      try {
        // Try to extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
          // Ensure summary is a string
          if (parsedResponse.summary) {
            if (typeof parsedResponse.summary === 'object' && parsedResponse.summary !== null) {
              parsedResponse.summary = parsedResponse.summary.overview || parsedResponse.summary.text || parsedResponse.summary.description || JSON.stringify(parsedResponse.summary);
            } else {
              parsedResponse.summary = String(parsedResponse.summary);
            }
          }
          // Ensure arrays contain only strings
          if (parsedResponse.segments && Array.isArray(parsedResponse.segments)) {
            parsedResponse.segments = parsedResponse.segments.map((s: any) => 
              typeof s === 'string' ? s : (typeof s === 'object' && s !== null ? (s.name || s.text || s.description || JSON.stringify(s)) : String(s))
            );
          }
          if (parsedResponse.barriers && Array.isArray(parsedResponse.barriers)) {
            parsedResponse.barriers = parsedResponse.barriers.map((s: any) => 
              typeof s === 'string' ? s : (typeof s === 'object' && s !== null ? (s.name || s.text || s.description || JSON.stringify(s)) : String(s))
            );
          }
          if (parsedResponse.triggers && Array.isArray(parsedResponse.triggers)) {
            parsedResponse.triggers = parsedResponse.triggers.map((s: any) => 
              typeof s === 'string' ? s : (typeof s === 'object' && s !== null ? (s.name || s.text || s.description || JSON.stringify(s)) : String(s))
            );
          }
          if (parsedResponse.recommendations && Array.isArray(parsedResponse.recommendations)) {
            parsedResponse.recommendations = parsedResponse.recommendations.map((s: any) => 
              typeof s === 'string' ? s : (typeof s === 'object' && s !== null ? (s.name || s.text || s.description || JSON.stringify(s)) : String(s))
            );
          }
        } else {
          // Parse markdown sections
          const summaryMatch = responseText.match(/##?\s*Summary[\s\S]*?(?=##|$)/i);
          const segmentsMatch = responseText.match(/##?\s*Segments[\s\S]*?(?=##|$)/i);
          const barriersMatch = responseText.match(/##?\s*Barriers[\s\S]*?(?=##|$)/i);
          const triggersMatch = responseText.match(/##?\s*Triggers[\s\S]*?(?=##|$)/i);
          const recommendationsMatch = responseText.match(/##?\s*Recommendations[\s\S]*?(?=##|$)/i);
          
          if (summaryMatch) {
            const summaryText = summaryMatch[0].replace(/##?\s*Summary\s*/i, '').trim();
            // Ensure summary is a string
            parsedResponse.summary = typeof summaryText === 'string' ? summaryText : String(summaryText);
          }
          if (segmentsMatch) {
            const segmentsText = segmentsMatch[0].replace(/##?\s*Segments\s*/i, '').trim();
            const segmentsArray = segmentsText.split(/\n/).filter((s: string) => s.trim().startsWith('-') || s.trim().startsWith('•')).map((s: string) => s.replace(/^[-•]\s*/, '').trim());
            // Ensure all items are strings
            parsedResponse.segments = segmentsArray.map((s: any) => typeof s === 'string' ? s : String(s));
          }
          if (barriersMatch) {
            const barriersText = barriersMatch[0].replace(/##?\s*Barriers\s*/i, '').trim();
            const barriersArray = barriersText.split(/\n/).filter((s: string) => s.trim().startsWith('-') || s.trim().startsWith('•')).map((s: string) => s.replace(/^[-•]\s*/, '').trim());
            // Ensure all items are strings
            parsedResponse.barriers = barriersArray.map((s: any) => typeof s === 'string' ? s : String(s));
          }
          if (triggersMatch) {
            const triggersText = triggersMatch[0].replace(/##?\s*Triggers\s*/i, '').trim();
            const triggersArray = triggersText.split(/\n/).filter((s: string) => s.trim().startsWith('-') || s.trim().startsWith('•')).map((s: string) => s.replace(/^[-•]\s*/, '').trim());
            // Ensure all items are strings
            parsedResponse.triggers = triggersArray.map((s: any) => typeof s === 'string' ? s : String(s));
          }
          if (recommendationsMatch) {
            const recommendationsText = recommendationsMatch[0].replace(/##?\s*Recommendations\s*/i, '').trim();
            const recommendationsArray = recommendationsText.split(/\n/).filter((s: string) => s.trim().startsWith('-') || s.trim().startsWith('•')).map((s: string) => s.replace(/^[-•]\s*/, '').trim());
            // Ensure all items are strings
            parsedResponse.recommendations = recommendationsArray.map((s: any) => typeof s === 'string' ? s : String(s));
          }
        }
      } catch (parseError) {
        console.error('Error parsing DeepScan response:', parseError);
        // Fallback to simple response
        parsedResponse = { response: responseText };
      }

      // Calculate quality score
      let quality_score = 3;
      if (parsedResponse.summary) quality_score += 1;
      if (parsedResponse.segments && parsedResponse.segments.length > 0) quality_score += 1;
      if (quality_score > 5) quality_score = 5;

      console.log('✅ DeepScan response processed successfully');
      return NextResponse.json({
        ...parsedResponse,
        quality_score: quality_score,
      });
    }

    // Standard response for other modules
    console.log('📝 Processing standard response...');
    // Calculate quality score (simple heuristic based on response length and structure)
    let quality_score = 3; // Base score
    if (responseText.length > 500) quality_score += 1;
    if (responseText.includes('##') || responseText.includes('###')) quality_score += 1; // Has structure
    if (quality_score > 5) quality_score = 5;

    console.log('✅ Standard response processed, quality_score:', quality_score);
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
    console.error('❌ Error in /api/brain:', error);
    
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





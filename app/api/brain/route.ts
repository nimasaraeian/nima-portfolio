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
      // Handle FormData (Behavioral DeepScan with image support)
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

      // If image is provided, forward to backend API with image
      if (imageFile) {
        console.log('📸 Image file received, forwarding to backend API...');
        
        // Get backend URL from environment
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
        
        // Create FormData for backend
        const backendFormData = new FormData();
        backendFormData.append('content', content);
        backendFormData.append('image', imageFile);
        
        try {
          // Forward to backend API
          const backendResponse = await fetch(`${backendUrl}/api/brain`, {
            method: 'POST',
            body: backendFormData,
          });
          
          if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            throw new Error(`Backend API error: ${backendResponse.status} - ${errorText}`);
          }
          
          const backendData = await backendResponse.json();
          console.log('✅ Backend API response received');
          return NextResponse.json(backendData);
        } catch (backendError: any) {
          console.error('❌ Error forwarding to backend:', backendError);
          // Fallback to OpenAI if backend fails
          query = `Behavioral DeepScan Analysis for ${platform}. Content: ${content || '[Image provided]'}. Goal: ${goalArray.join(', ')}. Audience: ${audience}. Language: ${language}.`;
        }
      } else {
        // No image, build query normally
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
      // Specialized prompt for Behavioral DeepScan - must return CognitiveFrictionResult format
      systemPrompt = `You are an expert Behavioral Psychologist and Marketing Strategist using Selphlyze (proprietary AI psychometric layer).
Your task is to perform a Behavioral DeepScan analysis and return results in a specific JSON format.

You MUST return a valid JSON object with EXACTLY these fields:
{
  "frictionScore": <number 0-100>,  // Cognitive friction score (higher = more friction)
  "trustScore": <number 0-100>,     // Trust level score (higher = more trust)
  "emotionalClarityScore": <number 0-100>,  // Emotional clarity score
  "motivationMatchScore": <number 0-100>,   // How well content matches audience motivation
  "decisionProbability": <number 0-1>,      // Probability of user making a decision (0.0 to 1.0)
  "conversionLiftEstimate": <number>,       // Estimated conversion lift percentage (can be negative)
  "keyDecisionBlockers": [<string>],       // Array of decision blockers
  "emotionalResistanceFactors": [<string>], // Array of emotional resistance factors
  "cognitiveOverloadFactors": [<string>],    // Array of cognitive overload factors
  "trustBreakpoints": [<string>],           // Array of trust breakpoints
  "motivationMisalignments": [<string>],    // Array of motivation misalignments
  "recommendedQuickWins": [<string>],       // Array of quick win recommendations
  "recommendedDeepChanges": [<string>],     // Array of deep change recommendations
  "explanationSummary": "<string>"           // Overall explanation summary
}

IMPORTANT: Return ONLY valid JSON, no markdown, no explanations outside the JSON object.`;
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
      temperature: isDeepScan ? 0.3 : 0.7, // Lower temperature for more consistent DeepScan results
      max_tokens: isDeepScan ? 3000 : 2000,
      ...(isDeepScan && { response_format: { type: 'json_object' } }), // Force JSON for DeepScan
    });

    const responseText = completion.choices[0]?.message?.content || 'No response generated';
    console.log('✅ OpenAI response received, length:', responseText.length);

    // Check if this is a DeepScan response and try to parse structured data
    // isDeepScan was already declared above, so we reuse it
    
    if (isDeepScan) {
      console.log('🔍 Processing DeepScan response...');
      // Parse JSON response - should be valid JSON due to response_format
      let parsedResponse: any;
      
      try {
        // Parse JSON response directly (response_format ensures it's valid JSON)
        parsedResponse = JSON.parse(responseText);
        
        // Validate and ensure all required fields exist with correct types
        const result: any = {
          frictionScore: typeof parsedResponse.frictionScore === 'number' && !isNaN(parsedResponse.frictionScore) ? Math.max(0, Math.min(100, parsedResponse.frictionScore)) : 50,
          trustScore: typeof parsedResponse.trustScore === 'number' && !isNaN(parsedResponse.trustScore) ? Math.max(0, Math.min(100, parsedResponse.trustScore)) : 50,
          emotionalClarityScore: typeof parsedResponse.emotionalClarityScore === 'number' && !isNaN(parsedResponse.emotionalClarityScore) ? Math.max(0, Math.min(100, parsedResponse.emotionalClarityScore)) : 50,
          motivationMatchScore: typeof parsedResponse.motivationMatchScore === 'number' && !isNaN(parsedResponse.motivationMatchScore) ? Math.max(0, Math.min(100, parsedResponse.motivationMatchScore)) : 50,
          decisionProbability: typeof parsedResponse.decisionProbability === 'number' && !isNaN(parsedResponse.decisionProbability) ? Math.max(0, Math.min(1, parsedResponse.decisionProbability)) : 0.5,
          conversionLiftEstimate: typeof parsedResponse.conversionLiftEstimate === 'number' && !isNaN(parsedResponse.conversionLiftEstimate) ? parsedResponse.conversionLiftEstimate : 0,
          keyDecisionBlockers: Array.isArray(parsedResponse.keyDecisionBlockers) ? parsedResponse.keyDecisionBlockers.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          emotionalResistanceFactors: Array.isArray(parsedResponse.emotionalResistanceFactors) ? parsedResponse.emotionalResistanceFactors.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          cognitiveOverloadFactors: Array.isArray(parsedResponse.cognitiveOverloadFactors) ? parsedResponse.cognitiveOverloadFactors.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          trustBreakpoints: Array.isArray(parsedResponse.trustBreakpoints) ? parsedResponse.trustBreakpoints.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          motivationMisalignments: Array.isArray(parsedResponse.motivationMisalignments) ? parsedResponse.motivationMisalignments.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          recommendedQuickWins: Array.isArray(parsedResponse.recommendedQuickWins) ? parsedResponse.recommendedQuickWins.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          recommendedDeepChanges: Array.isArray(parsedResponse.recommendedDeepChanges) ? parsedResponse.recommendedDeepChanges.map((s: any) => String(s)).filter((s: string) => s.trim().length > 0) : [],
          explanationSummary: typeof parsedResponse.explanationSummary === 'string' && parsedResponse.explanationSummary.trim().length > 0 ? parsedResponse.explanationSummary : (parsedResponse.summary || 'Analysis completed successfully'),
        };
        
        console.log('✅ DeepScan response processed successfully', {
          frictionScore: result.frictionScore,
          trustScore: result.trustScore,
          blockersCount: result.keyDecisionBlockers.length,
          quickWinsCount: result.recommendedQuickWins.length,
        });
        
        return NextResponse.json(result);
      } catch (parseError: any) {
        console.error('❌ Error parsing DeepScan JSON response:', parseError);
        console.error('Response text (first 500 chars):', responseText.substring(0, 500));
        
        // Return a default structure with error indication
        return NextResponse.json({
          frictionScore: 50,
          trustScore: 50,
          emotionalClarityScore: 50,
          motivationMatchScore: 50,
          decisionProbability: 0.5,
          conversionLiftEstimate: 0,
          keyDecisionBlockers: ['Error parsing response from AI'],
          emotionalResistanceFactors: [],
          cognitiveOverloadFactors: [],
          trustBreakpoints: [],
          motivationMisalignments: [],
          recommendedQuickWins: [],
          recommendedDeepChanges: [],
          explanationSummary: 'Error processing analysis. Please try again.',
        }, { status: 500 });
      }
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





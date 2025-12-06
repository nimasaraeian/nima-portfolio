import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';
import OpenAI from 'openai';
import { WizardInput, StrategyDocSchema } from '@/app/types/strategy';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let input: WizardInput;
  
  try {
    input = await req.json();
    console.log('Received input:', JSON.stringify(input, null, 2));
  } catch (parseError) {
    return jsonResponse(
      { 
        success: false, 
        error: 'Invalid request format',
      },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('No OpenAI API key found, using fallback strategy');
      return jsonResponse({
        success: true,
        strategy: generateFallbackStrategy(input),
        usedFallback: true
      });
    }

    const openai = new OpenAI({ apiKey });
    
    // Build comprehensive prompt
    const systemPrompt = `You are an AI Marketing Strategist. Produce a complete, practical, and measurable AI-driven marketing strategy.
Output MUST be valid JSON strictly following the provided TypeScript schema (StrategyDoc). Do not include any prose outside JSON.
Use the provided business inputs. Be specific, use realistic assumptions if needed (clearly mark them).
Include numeric KPI targets where possible and a concrete 90-day plan.`;

    const userPrompt = `BUSINESS INPUT
- Business Name: ${input.businessName}
- Industry: ${input.industry}
- Geo/Locale: ${input.geo} / ${input.locale}
- Budget Monthly (USD): ${input.budgetMonthly}
- Objectives: ${input.objectives.join(', ')}
- Value Proposition: ${input.valueProposition}
- Website: ${input.websiteUrl || 'N/A'}
- Email List: ${input.emailListSize || 0} subscribers
- Social Platforms: ${input.activeSocials?.join(', ') || 'N/A'}
- Ad Platforms: ${input.adPlatforms?.join(', ') || 'N/A'}
- Analytics Tools: ${input.analyticsTools?.join(', ') || 'N/A'}
- Primary Audience: ${input.primaryAudience}
- Secondary Audience: ${input.secondaryAudience || 'N/A'}
- Competitors: ${input.competitors}
- Pricing Tier: ${input.pricingTier}
- Brand Tone: ${input.brandTone}
- Team Size: ${input.teamSize}
- Creative Limitations: ${input.creativeLimitations || 'N/A'}
- Data Maturity: ${input.dataMaturity}
- Content Types: ${input.contentTypes?.join(', ') || 'N/A'}
- Timeframe: ${input.timeframeWeeks} weeks

REQUIREMENTS
- Language: English
- Follow StrategyDoc schema exactly (valid JSON only).
- Provide: personas (2-4), segmentation, contentPlan (with weekly calendar), campaigns (3-5), automation, analytics (KPIs + forecast), ethicsAndData, and a 90-day plan.
- Be specific with numbers, tools, and actionable steps.
- Include realistic KPI targets and budget allocations.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from AI');
    }

    // Parse and validate the response
    const strategyData = JSON.parse(responseText);
    
    // Validate against schema
    const validatedStrategy = StrategyDocSchema.parse(strategyData);
    
    return jsonResponse({
      success: true,
      strategy: validatedStrategy,
      usage: completion.usage,
    });

  } catch (error) {
    console.error('Strategy generation error:', error);
    
    // Use fallback strategy for any error
    return jsonResponse({
      success: true,
      strategy: generateFallbackStrategy(input),
      usedFallback: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function generateFallbackStrategy(input: WizardInput) {
  return {
    meta: {
      businessName: input.businessName || 'Your Business',
      industry: input.industry || 'General',
      locale: input.locale || 'en-US',
      budgetMonthly: input.budgetMonthly || 1000,
      geo: input.geo || 'Global',
      timeframeWeeks: input.timeframeWeeks || 12,
    },
    overview: {
      executiveSummary: `A comprehensive AI marketing strategy for ${input.businessName} in the ${input.industry} industry, targeting ${input.primaryAudience} with a focus on ${input.objectives.join(' and ')}.`,
      keyInsights: [
        'Digital presence optimization needed for better customer acquisition',
        'Content marketing should focus on educational value and brand building',
        'Marketing automation can improve efficiency and customer experience',
        'Data-driven decision making will improve ROI over time'
      ],
      riskNotes: [
        'Market competition may affect customer acquisition costs',
        'Budget constraints may limit channel diversity',
        'Team capacity might require prioritization of initiatives'
      ]
    },
    personas: [
      {
        name: 'Primary Customer',
        summary: input.primaryAudience || 'Target customer segment',
        pains: [
          'Finding reliable solutions in the market',
          'Comparison shopping between multiple options',
          'Understanding product/service value proposition'
        ],
        gains: [
          'Quality solution that meets their needs',
          'Good value for money',
          'Excellent customer service and support'
        ],
        channels: ['Social Media', 'Email', 'Search Engines'],
        sampleMessages: [
          'Discover the solution you\'ve been looking for',
          'Join thousands of satisfied customers',
          'Get started with a free consultation'
        ]
      }
    ],
    segmentation: {
      segments: [
        {
          label: 'High-Value Prospects',
          descriptor: 'Customers with strong buying intent and budget',
          targetingHints: ['Use premium messaging', 'Focus on quality and results', 'Provide detailed information'],
          predictedValue: 'high' as const
        },
        {
          label: 'Price-Conscious Buyers',
          descriptor: 'Budget-focused customers looking for value',
          targetingHints: ['Emphasize cost-effectiveness', 'Show ROI clearly', 'Offer promotional pricing'],
          predictedValue: 'mid' as const
        }
      ]
    },
    contentPlan: {
      themes: ['Educational Content', 'Product Benefits', 'Customer Success', 'Industry Insights'],
      keywords: [input.industry, 'solution', 'benefits', 'reviews', 'comparison'],
      calendar: Array.from({ length: Math.min(input.timeframeWeeks || 12, 12) }, (_, i) => ({
        week: i + 1,
        channel: (['blog', 'instagram', 'email', 'linkedin'] as const)[i % 4],
        idea: `Week ${i + 1}: Create engaging content for ${input.industry} audience`,
        CTA: 'Learn More',
        metric: 'Engagement Rate'
      }))
    },
    campaigns: [
      {
        name: 'Brand Awareness Campaign',
        objective: 'awareness' as const,
        channels: ['Social Media', 'Content Marketing'],
        audience: input.primaryAudience || 'Target audience',
        creativeBrief: 'Focus on brand introduction and value proposition',
        offers: ['Free consultation', 'Educational content'],
        abTests: ['Headline variations', 'Image vs video content']
      }
    ],
    automation: {
      journeyMap: 'Awareness → Interest → Consideration → Purchase → Retention → Advocacy',
      emailFlows: ['Welcome series', 'Educational nurture', 'Abandoned cart recovery'],
      chatbotIdeas: ['FAQ automation', 'Lead qualification', 'Appointment booking'],
      adAutomations: ['Retargeting campaigns', 'Lookalike audiences', 'Dynamic product ads']
    },
    analytics: {
      kpis: [
        {
          name: 'Customer Acquisition Cost (CAC)',
          target: `≤ $${Math.round((input.budgetMonthly || 1000) * 0.3)} by week 8`,
          howToMeasure: 'Total marketing spend / New customers acquired'
        },
        {
          name: 'Conversion Rate',
          target: '≥ 2.5% by week 6',
          howToMeasure: 'Website conversions / Total website visits'
        },
        {
          name: 'Email Open Rate',
          target: '≥ 25% consistently',
          howToMeasure: 'Email marketing platform analytics'
        }
      ],
      forecast: {
        assumptions: [
          `Monthly marketing budget of $${input.budgetMonthly}`,
          'Industry average conversion rates apply',
          'Team capacity allows for consistent execution'
        ],
        simpleProjection: `Projected to acquire 20-30 new customers per month by week 8, with improving efficiency over time.`
      },
      dashboardSpec: [
        'Traffic sources and conversion paths',
        'Campaign performance by channel',
        'Customer lifetime value trends',
        'Marketing qualified leads pipeline'
      ]
    },
    ethicsAndData: {
      privacyNotes: [
        'Ensure GDPR/privacy law compliance in data collection',
        'Transparent opt-in processes for email marketing',
        'Secure customer data storage and handling'
      ],
      biasRisks: [
        'Avoid discriminatory targeting based on protected characteristics',
        'Ensure diverse representation in marketing materials',
        'Regular review of algorithmic targeting for fairness'
      ],
      governanceChecklist: [
        'Privacy policy updated and accessible',
        'Marketing claims are truthful and substantiated',
        'Customer complaint handling process in place'
      ]
    },
    '90dayPlan': Array.from({ length: Math.min(Math.ceil((input.timeframeWeeks || 12) / 4), 12) }, (_, i) => ({
      week: (i * 4) + 1,
      tasks: [
        `Week ${(i * 4) + 1}-${(i * 4) + 4}: Implement phase ${i + 1} initiatives`,
        'Monitor and optimize campaign performance',
        'Analyze results and adjust strategy as needed'
      ],
      ownerHint: 'Marketing Lead / Team'
    }))
  };
}



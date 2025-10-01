import { CampaignPlaybook, InsightsReport, Persona } from '@/app/types/strategyV2'

export function mockPersonaInsights(input: {
  industry: string
  geography: string[]
  seedKeywords: string[]
  competitors: { name: string; url?: string }[]
}): InsightsReport {
  const personas: Persona[] = [
    {
      name: 'Gulf Investor',
      ageRange: '35-55',
      countries: ['QA', 'KW', 'AE'],
      motivations: ['ROI', 'Luxury'],
      pains: ['Legal clarity'],
      preferredChannels: ['GoogleAds', 'Facebook'],
      messagingAngle: 'Secure luxury investment',
    },
    {
      name: 'Iranian Family',
      ageRange: '30-45',
      countries: ['IR', 'TR'],
      motivations: ['Nature', 'Weekend'],
      pains: ['Paperwork'],
      preferredChannels: ['Instagram', 'SEO'],
      messagingAngle: 'Peaceful second home near Istanbul',
    },
  ]

  return {
    personas,
    competitorNotes: [`${input.industry} competitive landscape baseline…`],
    keywordThemes: input.seedKeywords?.length ? input.seedKeywords : ['villa sapanca', 'sapanca investment'],
    marketObservations: [`Top interest in ${input.geography?.[0] ?? 'TR'} during summer months`],
  }
}

export function mockBudgetAllocation(input: {
  monthlyBudgetUSD: number
  objectives: { type: string; priority: number }[]
  channels: ('GoogleAds' | 'Instagram' | 'TikTok' | 'LinkedIn' | 'Email' | 'SEO')[]
}): CampaignPlaybook {
  const per = Math.max(1, Math.floor(input.monthlyBudgetUSD / input.channels.length))
  return {
    allocation: input.channels.map((c) => ({ channel: c, budgetUSD: per })),
    rationale: ['Baseline even split across selected channels; adjust after 2 weeks based on CPL/CVR.'],
  }
}

export function mockCreatives(input: {
  channel: string
  persona: string
  offer: string
  tone?: string
}) {
  return [
    { headline: `${input.offer} for ${input.persona}`, primaryText: `Discover more – ${input.tone ?? 'confident'} tone`, cta: 'Get Offer' },
    { headline: `Why ${input.persona} choose us`, primaryText: `Top benefits and social proof`, cta: 'Learn More' },
  ]
}

export function mockOptimize(input: {
  kpis: { metric: string; target: number }[]
  recentMetrics?: any
}) {
  return {
    kpis: input.kpis,
    rules: [
      { condition: 'If CPL > target by 20% for 3 days', action: 'Shift 15% budget to Google Search' },
      { condition: 'If CTR < 1% for 5 days', action: 'Pause lowest CTR ads and refresh creatives' },
      { condition: 'If ROAS < 1.5 for 7 days', action: 'Reduce spend by 20% and focus on SEO/Email' },
    ],
    dashboardNotes: ['Add cards for CPL trend, CVR by channel, ROAS week-over-week.'],
  }
}



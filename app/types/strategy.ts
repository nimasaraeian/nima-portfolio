import { z } from 'zod';

// Core StrategyDoc schema
export const StrategyDocSchema = z.object({
  meta: z.object({
    businessName: z.string(),
    industry: z.string(),
    locale: z.string(),
    budgetMonthly: z.number(),
    geo: z.string(),
    timeframeWeeks: z.number(),
  }),
  overview: z.object({
    executiveSummary: z.string(),
    keyInsights: z.array(z.string()),
    riskNotes: z.array(z.string()),
  }),
  personas: z.array(z.object({
    name: z.string(),
    summary: z.string(),
    pains: z.array(z.string()),
    gains: z.array(z.string()),
    channels: z.array(z.string()),
    sampleMessages: z.array(z.string()),
  })),
  segmentation: z.object({
    segments: z.array(z.object({
      label: z.string(),
      descriptor: z.string(),
      targetingHints: z.array(z.string()),
      predictedValue: z.enum(['low', 'mid', 'high']),
    })),
  }),
  contentPlan: z.object({
    themes: z.array(z.string()),
    keywords: z.array(z.string()),
    calendar: z.array(z.object({
      week: z.number(),
      channel: z.enum(['blog', 'instagram', 'tiktok', 'email', 'linkedin', 'youtube', 'ads']),
      idea: z.string(),
      CTA: z.string(),
      metric: z.string(),
    })),
  }),
  campaigns: z.array(z.object({
    name: z.string(),
    objective: z.enum(['awareness', 'traffic', 'lead', 'sales', 'retention']),
    channels: z.array(z.string()),
    audience: z.string(),
    creativeBrief: z.string(),
    offers: z.array(z.string()),
    abTests: z.array(z.string()),
  })),
  automation: z.object({
    journeyMap: z.string(),
    emailFlows: z.array(z.string()),
    chatbotIdeas: z.array(z.string()),
    adAutomations: z.array(z.string()),
  }),
  analytics: z.object({
    kpis: z.array(z.object({
      name: z.string(),
      target: z.string(),
      howToMeasure: z.string(),
    })),
    forecast: z.object({
      assumptions: z.array(z.string()),
      simpleProjection: z.string(),
    }),
    dashboardSpec: z.array(z.string()),
  }),
  ethicsAndData: z.object({
    privacyNotes: z.array(z.string()),
    biasRisks: z.array(z.string()),
    governanceChecklist: z.array(z.string()),
  }),
  '90dayPlan': z.array(z.object({
    week: z.number(),
    tasks: z.array(z.string()),
    ownerHint: z.string(),
  })),
});

export type StrategyDoc = z.infer<typeof StrategyDocSchema>;

// Wizard input schema
export const WizardInputSchema = z.object({
  // Step 1: Business Basics
  businessName: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  geo: z.string().min(1, 'Geography is required'),
  locale: z.string().default('en-US'),
  budgetMonthly: z.number().min(0, 'Budget must be positive'),
  objectives: z.array(z.enum(['awareness', 'leads', 'sales', 'retention'])).min(1, 'Select at least one objective'),
  valueProposition: z.string().min(1, 'Value proposition is required'),
  
  // Step 2: Channels & Assets
  websiteUrl: z.string().optional(),
  emailListSize: z.number().min(0).optional(),
  activeSocials: z.array(z.string()).optional(),
  adPlatforms: z.array(z.string()).optional(),
  analyticsTools: z.array(z.string()).optional(),
  
  // Step 3: Audience & Competitors
  primaryAudience: z.string().min(1, 'Primary audience is required'),
  secondaryAudience: z.string().optional(),
  competitors: z.string().min(1, 'Competitors are required'),
  pricingTier: z.enum(['low', 'mid', 'high']),
  brandTone: z.string().min(1, 'Brand tone is required'),
  
  // Step 4: Constraints & Timeframe
  teamSize: z.string().min(1, 'Team size is required'),
  creativeLimitations: z.string().optional(),
  dataMaturity: z.enum(['low', 'mid', 'high']),
  contentTypes: z.array(z.string()).optional(),
  timeframeWeeks: z.number().min(1, 'Timeframe must be at least 1 week'),
});

export type WizardInput = z.infer<typeof WizardInputSchema>;

// Industry templates
export const INDUSTRIES = [
  'Retail/DTC',
  'Restaurant/Café', 
  'Local Services',
  'SaaS',
  'EdTech',
  'Real Estate',
  'Beauty/Health',
  'Fashion E-commerce',
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
] as const;

export const OBJECTIVES = [
  'awareness',
  'leads', 
  'sales',
  'retention',
] as const;

export const SOCIAL_PLATFORMS = [
  'Instagram',
  'TikTok',
  'Facebook',
  'LinkedIn',
  'YouTube',
  'Twitter/X',
  'Pinterest',
] as const;

export const AD_PLATFORMS = [
  'Google Ads',
  'Meta Ads',
  'TikTok Ads',
  'LinkedIn Ads',
  'YouTube Ads',
] as const;

export const ANALYTICS_TOOLS = [
  'Google Analytics 4',
  'HubSpot',
  'Mixpanel',
  'Amplitude',
  'Hotjar',
  'Klaviyo',
] as const;

export const CONTENT_TYPES = [
  'Blog Posts',
  'Video Content',
  'Social Media Posts',
  'Email Newsletters',
  'Infographics',
  'Podcasts',
  'Webinars',
  'Case Studies',
] as const;

export const BRAND_TONES = [
  'Professional',
  'Friendly',
  'Playful',
  'Authoritative',
  'Inspirational',
  'Minimal',
  'Luxury',
  'Tech-savvy',
] as const;



'use client'

import { z } from 'zod'

export type Objective = 'Awareness' | 'Leads' | 'Sales' | 'Retention'

export const ObjectiveSchema = z.enum(['Awareness', 'Leads', 'Sales', 'Retention'])

export interface Foundation {
  businessName: string
  industry: string
  geography: string[]
  monthlyBudgetUSD: number
  uniqueValue: string
  objectives: { type: Objective; priority: 1 | 2 | 3 | 4 }[]
}

export const FoundationSchema = z.object({
  businessName: z.string().min(1),
  industry: z.string().min(1),
  geography: z.array(z.string()).min(1),
  monthlyBudgetUSD: z.number().min(0),
  uniqueValue: z.string().min(1),
  objectives: z
    .array(
      z.object({
        type: ObjectiveSchema,
        priority: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
      })
    )
    .min(1),
})

export interface DataSources {
  websiteUrl?: string
  ga4?: boolean
  socials?: { instagram?: string; tiktok?: string; linkedin?: string }
  crm?: { name?: string }
  competitors: { name: string; url?: string }[]
  seedKeywords: string[]
  regions: string[]
}

export const DataSourcesSchema = z.object({
  websiteUrl: z.string().url().optional(),
  ga4: z.boolean().optional(),
  socials: z
    .object({
      instagram: z.string().optional(),
      tiktok: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  crm: z.object({ name: z.string().optional() }).optional(),
  competitors: z.array(z.object({ name: z.string(), url: z.string().url().optional() })).default([]),
  seedKeywords: z.array(z.string()).default([]),
  regions: z.array(z.string()).default([]),
})

export interface Persona {
  name: string
  ageRange: string
  gender?: string
  incomeLevel?: string
  countries: string[]
  motivations: string[]
  pains: string[]
  preferredChannels: string[]
  messagingAngle: string
}

export const PersonaSchema = z.object({
  name: z.string(),
  ageRange: z.string(),
  gender: z.string().optional(),
  incomeLevel: z.string().optional(),
  countries: z.array(z.string()).default([]),
  motivations: z.array(z.string()).default([]),
  pains: z.array(z.string()).default([]),
  preferredChannels: z.array(z.string()).default([]),
  messagingAngle: z.string(),
})

export interface InsightsReport {
  personas: Persona[]
  competitorNotes: string[]
  keywordThemes: string[]
  marketObservations: string[]
}

export const InsightsReportSchema = z.object({
  personas: z.array(PersonaSchema).default([]),
  competitorNotes: z.array(z.string()).default([]),
  keywordThemes: z.array(z.string()).default([]),
  marketObservations: z.array(z.string()).default([]),
})

export interface AIIntegrationItem {
  key: 'chatbot' | 'predictive' | 'personalization' | 'programmatic' | 'aiContent'
  enabled: boolean
  prerequisites: string[]
  expectedImpactNote: string
  complexity: 'low' | 'medium' | 'high'
}

export const AIIntegrationItemSchema = z.object({
  key: z.enum(['chatbot', 'predictive', 'personalization', 'programmatic', 'aiContent']),
  enabled: z.boolean(),
  prerequisites: z.array(z.string()).default([]),
  expectedImpactNote: z.string().default(''),
  complexity: z.enum(['low', 'medium', 'high']).default('low'),
})

export interface ChannelBudget {
  channel: 'GoogleAds' | 'Instagram' | 'TikTok' | 'LinkedIn' | 'Email' | 'SEO'
  budgetUSD: number
  abTests?: { hypothesis: string; variantA: string; variantB: string }[]
  creatives?: { headline: string; primaryText: string; cta: string }[]
}

export const ChannelBudgetSchema = z.object({
  channel: z.enum(['GoogleAds', 'Instagram', 'TikTok', 'LinkedIn', 'Email', 'SEO']),
  budgetUSD: z.number().min(0),
  abTests: z
    .array(z.object({ hypothesis: z.string(), variantA: z.string(), variantB: z.string() }))
    .optional(),
  creatives: z
    .array(z.object({ headline: z.string(), primaryText: z.string(), cta: z.string() }))
    .optional(),
})

export interface CampaignPlaybook {
  allocation: ChannelBudget[]
  rationale: string[]
}

export const CampaignPlaybookSchema = z.object({
  allocation: z.array(ChannelBudgetSchema).default([]),
  rationale: z.array(z.string()).default([]),
})

export interface KPIConfig {
  metric: 'Reach' | 'CTR' | 'CPL' | 'CVR' | 'ROAS'
  target: number
  perChannel?: { channel: ChannelBudget['channel']; target: number }[]
}

export const KPIConfigSchema = z.object({
  metric: z.enum(['Reach', 'CTR', 'CPL', 'CVR', 'ROAS']),
  target: z.number().min(0),
  perChannel: z.array(z.object({ channel: z.enum(['GoogleAds', 'Instagram', 'TikTok', 'LinkedIn', 'Email', 'SEO']), target: z.number().min(0) })).optional(),
})

export interface OptimizationRule {
  condition: string
  action: string
}

export const OptimizationRuleSchema = z.object({
  condition: z.string(),
  action: z.string(),
})

export interface OptimizationPlan {
  kpis: KPIConfig[]
  rules: OptimizationRule[]
  dashboardNotes: string[]
}

export const OptimizationPlanSchema = z.object({
  kpis: z.array(KPIConfigSchema).default([]),
  rules: z.array(OptimizationRuleSchema).default([]),
  dashboardNotes: z.array(z.string()).default([]),
})

export interface ScalePlan {
  newMarkets: string[]
  languages: string[]
  automationHooks: string[]
  ltvNotes?: string
}

export const ScalePlanSchema = z.object({
  newMarkets: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  automationHooks: z.array(z.string()).default([]),
  ltvNotes: z.string().optional(),
})

export interface StrategyState {
  foundation: Foundation
  dataSources: DataSources
  insightsReport: InsightsReport
  aiPlan: AIIntegrationItem[]
  campaignPlaybook: CampaignPlaybook
  optimization: OptimizationPlan
  scalePlan: ScalePlan
}

export const StrategyStateSchema = z.object({
  foundation: FoundationSchema,
  dataSources: DataSourcesSchema,
  insightsReport: InsightsReportSchema,
  aiPlan: z.array(AIIntegrationItemSchema).default([]),
  campaignPlaybook: CampaignPlaybookSchema,
  optimization: OptimizationPlanSchema,
  scalePlan: ScalePlanSchema,
})

export const defaultStrategyState: StrategyState = {
  foundation: {
    businessName: '',
    industry: '',
    geography: [],
    monthlyBudgetUSD: 0,
    uniqueValue: '',
    objectives: [],
  },
  dataSources: {
    competitors: [],
    seedKeywords: [],
    regions: [],
  },
  insightsReport: {
    personas: [],
    competitorNotes: [],
    keywordThemes: [],
    marketObservations: [],
  },
  aiPlan: [],
  campaignPlaybook: { allocation: [], rationale: [] },
  optimization: { kpis: [], rules: [], dashboardNotes: [] },
  scalePlan: { newMarkets: [], languages: [], automationHooks: [] },
}



// Shared types and utilities for AI Marketing page variants

export interface CognitiveFrictionResult {
  frictionScore: number;
  trustScore: number;
  emotionalClarityScore: number;
  motivationMatchScore: number;
  decisionProbability: number;
  conversionLiftEstimate: number;
  keyDecisionBlockers: string[];
  emotionalResistanceFactors: string[];
  cognitiveOverloadFactors: string[];
  trustBreakpoints: string[];
  motivationMisalignments: string[];
  recommendedQuickWins: string[];
  recommendedDeepChanges: string[];
  explanationSummary: string;
}

export type RewriteInputPayload = {
  text: string;
  platform: string;
  goal: string[];
  audience: string;
  language: string;
};

export type RewriteOutput = {
  soft_version: string;
  value_version: string;
  proof_version: string;
  emotional_version: string;
  direct_version: string;
  cta: string;
};


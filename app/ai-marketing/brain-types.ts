// Shared types for AI Brain responses used across AI Marketing frontend
// These are aligned with the auto-generated JS types in
// src/shared/ai-brain-types/types-generated.js and the FastAPI /api/brain schema.

export interface QualityChecks {
  has_examples?: boolean;
  has_action_plan?: boolean;
  has_metrics?: boolean;
  has_analysis?: boolean;
  has_image_analysis?: boolean;
  // Allow extra flags from backend without breaking the UI
  [key: string]: unknown;
}

export interface ImageDebug {
  has_image: boolean;
  image_filename?: string;
  image_size_bytes?: number;
  [key: string]: unknown;
}

export interface PageStructure {
  nav_bar?: string | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_image?: string | null;
  hero_video?: string | null;
  primary_cta?: string | null;
  secondary_cta?: string | null;
  trust_badges?: string | null;
  social_proof_section?: string | null;
  benefits_section?: string | null;
  pricing_section?: string | null;
  form_area?: string | null;
  footer_legal?: string | null;
  extra_sections?: Record<string, string>;
}

export interface DecisionBlockerItem {
  element?: string | null;
  issue?: string | null;
  psychological_impact?: string | null;
  evidence?: string | null;
}

export interface AIRecommendationItem {
  element?: string | null;
  change?: string | null;
  psychological_effect?: string | null;
  impact?: string | null;
  priority?: string | null;
}

export interface VisualTrustAnalysis {
  overall_label?: string | null;
  low_percent?: number | null;
  medium_percent?: number | null;
  high_percent?: number | null;
  explanation?: string | null;
}

export interface PsychologyNarrative {
  analysis_summary?: string | null;
  ai_interpretation?: string | null;
}

// Matches PsychologyAnalysisResult from types-generated.js plus
// additional optional per-metric fields used by the dashboard.
// All fields are optional/nullable so the UI can fail gracefully
// if the backend has not implemented a specific dimension yet.
export interface PsychologyAnalysisResult {
  // Raw structured fields from backend
  analysis: any | null;
  overall: any | null;
  human_readable_report: string;

  // High-level decision friction metric (0–100)
  decision_friction_score?: number | null;

  // Sub-metrics (0–100) for the KPI cards
  cognitive_overload_score?: number | null;
  emotional_resistance_score?: number | null;
  trust_breakpoints_score?: number | null;
  action_triggers_score?: number | null;

  // Factor lists backing the qualitative bullet-points
  key_blockers?: string[];
  emotional_resistance_factors?: string[];
  cognitive_overload_factors?: string[];
  trust_breakpoints_factors?: string[];
  motivation_misalignments_factors?: string[];

  // Narrative fields (if backend exposes them)
  recommendations?: string[];
  summary?: string;
  interpretation?: string;

  // Future-proof: allow extra fields without breaking the UI
  [key: string]: unknown;
}

export interface BrainResponse {
  response: string;
  model: string;
  quality_score: number;
  quality_checks: QualityChecks;
  image_score?: number | null;
  image_debug?: ImageDebug;
  debug_version?: string;

  // Structured psychology result (if backend provides it)
  psychology_analysis?: PsychologyAnalysisResult | null;

  // Allow backend to add more structured fields without breaking the UI
  [key: string]: unknown;
}

export interface PersonalityActivation {
  dominant_profile?: string;
  explanation?: string;
  O?: number;
  C?: number;
  E?: number;
  A?: number;
  N?: number;
  [key: string]: string | number | undefined;
}

export interface CognitiveStyle {
  type?: string;
  processing_speed?: string;
  reasoning_bias?: string;
  overload_risk?: string;
  ambiguity_aversion?: string;
  explanation?: string;
  [key: string]: string | undefined;
}

export interface EmotionalResponse {
  trust?: number;
  curiosity?: number;
  motivation?: number;
  confusion?: number;
  anxiety?: number;
  [key: string]: number | undefined;
}

export interface DecisionFrame {
  risk_style?: string;
  framing?: string;
  loss_aversion_trigger?: string;
  mode?: string;
  decision_tendency?: string;
  summary?: string;
  [key: string]: string | undefined;
}

export interface TrustDynamics {
  primary_trust_cue?: string;
  risk_flags?: string[];
  recommendation?: string;
  visual_trust?: number;
  institutional_trust?: number;
  social_trust?: number;
  skepticism?: number;
  data_trust?: number;
  [key: string]: string | string[] | number | undefined;
}

export interface MotivationStyle {
  primary?: string;
  secondary?: string;
  drivers?: string[];
  blockers?: string[];
  explanation?: string;
  [key: string]: string | string[] | undefined;
}

export interface CognitiveLoad {
  clarity_score?: number;
  overload_score?: number;
  ambiguity_score?: number;
  summary?: string;
  [key: string]: number | string | undefined;
}

export interface BehavioralPrediction {
  convert?: number;
  hesitate?: number;
  bounce?: number;
  postpone?: number;
  summary?: string;
  [key: string]: number | string | undefined;
}

export interface AttentionMap {
  hotspots?: string[];
  friction_points?: string[];
  hot_zones?: string[];
  dropoff_points?: string[];
  notes?: string;
  [key: string]: string | string[] | undefined;
}

export interface EmotionalTriggers {
  positive?: string[];
  negative?: string[];
  activated?: string[];
  missing?: string[];
  description?: string;
  [key: string]: string | string[] | undefined;
}

export interface MemoryActivation {
  hooks?: string[];
  semantic?: string[];
  emotional?: string[];
  pattern?: string[];
  retention_score?: number;
  summary?: string;
  [key: string]: string | string[] | number | undefined;
}

export interface RiskPerception {
  risk_level?: string;
  level?: string;
  triggers?: string[];
  safety_requests?: string[];
  uncertainty_points?: string[];
  [key: string]: string | string[] | undefined;
}

export interface CtaMatch {
  strength?: string;
  friction_points?: string[];
  recommendation?: string;
  fit_score?: number;
  clarity?: number;
  motivation_alignment?: number;
  action_probability?: number;
  [key: string]: string | string[] | number | undefined;
}

export interface PsychologyDashboard {
  personality_activation?: PersonalityActivation;
  cognitive_style?: CognitiveStyle;
  emotional_response?: EmotionalResponse;
  decision_frame?: DecisionFrame;
  trust_dynamics?: TrustDynamics;
  motivation_style?: MotivationStyle;
  cognitive_load?: CognitiveLoad;
  behavioral_prediction?: BehavioralPrediction;
  attention_map?: AttentionMap;
  emotional_triggers?: EmotionalTriggers;
  memory_activation?: MemoryActivation;
  risk_perception?: RiskPerception;
  cta_match?: CtaMatch;
  [key: string]: unknown;
}

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
  primary_diagnosis?: string | null;
  psychology_dashboard?: PsychologyDashboard | null;
  page_structure?: PageStructure | null;
  decision_blockers?: Record<string, DecisionBlockerItem[]> | null;
  ai_recommendations?: Record<string, AIRecommendationItem[]> | null;
  visual_trust_analysis?: VisualTrustAnalysis | null;
  visual_trust_score?: number | null;
  psychology_narrative?: PsychologyNarrative | null;
  visual_textual_psychology_analysis?: Record<string, any> | null;
  [key: string]: unknown;
}



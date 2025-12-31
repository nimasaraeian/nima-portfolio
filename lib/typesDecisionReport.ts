/**
 * Type definitions for Evidence-Based Decision Output + Attention Path
 */

export type AttentionItem = {
  label: string;
  why_first?: string;
  evidence?: {
    quote?: string;
    observation?: string;
  };
  location?: {
    section?: string;
    selector?: string;
    bbox?: any;
  };
  confidence?: number;
};

export type AttentionPath = {
  first_3s?: AttentionItem[];
  next_10s?: AttentionItem[];
  confidence?: number;
  limitations?: string[];
};

export type EvidenceItem = {
  quote_or_observation: string;
  location?: {
    section?: string;
    selector?: string;
  };
  source?: string;
};

export type ActionItem = {
  action: string;
  why?: string;
  expected_shift?: string;
  related_evidence_ids?: string[];
};

export type Driver = {
  id: string;
  score: number;
  role?: "primary" | "secondary" | "context";
  evidence?: EvidenceItem[];
  actions?: ActionItem[];
};

export type Report = {
  attention_path?: AttentionPath;
  decision?: any;
  decision_model?: any;
  verdict?: any;
  quick_wins?: any[];
  issues?: any[];
  fix_first?: any;
  page_map?: {
    headline?: string;
    primary_cta?: string;
    offer?: string;
    trust_signals?: string[];
  };
};



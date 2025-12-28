export type DecisionMachine = {
  decision_mode?: string;        // e.g., "Ready_Heuristic"
  confidence?: number;           // e.g., 0.9
  lens_scores?: Record<string, number>; // trust/cta/friction/heuristic/emotional/visual
  conflicts?: string[];
  signals?: string[];
  human_explanation?: string;
};


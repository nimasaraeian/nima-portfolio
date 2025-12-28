// API Request/Response types for backend integration

export interface BrainAPIRequest {
  url: string
  goals: string[]
  platform: string
}

export interface BrainAPIResponse {
  score: number
  aiConfidence: number
  mainIssues: string[]
  suggestions: string[]
  quickWins: string[]
  // Optional ID assigned by backend for feedback loop
  analysis_id?: number
}

// Decision Machine types for Human Decision Review
export interface DecisionMachine {
  decision_mode: string
  confidence: number
  lens_scores: Record<string, number>
  conflicts?: string[]
  signals: string[]
  human_explanation: string
}


























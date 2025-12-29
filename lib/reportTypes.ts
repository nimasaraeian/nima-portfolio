export type UiReport = {
  mode: "url" | "image" | "text";
  goal: string;
  summary: {
    decisionStyleLabel: string;   // human label
    confidencePct: number | null;   // 0..100 or null
    primaryProblemTitle: string;  // human
    primaryProblemExplanation: string; // human
  };
  evidence: {
    desktopAtf?: string | null;
    mobileAtf?: string | null;
  };
  actions: Array<{
    title: string;
    why: string;
    whereLabel: string;  // "Hero" | "Form" | ...
    priority: "high" | "medium" | "low";
  }>;
  issues: Array<{
    title: string;
    severity: "high" | "medium" | "low";
    explanation: string;
  }>;
  narrative: {
    executiveSummary: string;     // 2 lines max
    whyUsersHesitate: string;     // 3-5 lines
    consequences: string[];       // bullets
  };
  raw?: any;
};


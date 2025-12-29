/**
 * Decision Intelligence Report Types
 * Normalized data contract for UI
 */

export type DecisionStyle = "fast_intuitive" | "slow_deliberate" | "mixed" | "unknown";

export type Priority = "high" | "medium" | "low";

export type Severity = "high" | "medium" | "low";

export interface NormalizedDecisionReport {
  // Core identification
  mode: "url" | "image" | "text";
  goal: string;
  
  // Executive Summary
  executiveSummary: {
    title: string;  // "This page is losing {goal} because {primary_blocker}"
    subtitle: string;  // Human explanation
    decisionStyle: DecisionStyle;
    decisionStyleLabel: string;  // Human-readable label
    confidence: number | null;  // 0-100 or null
    primaryBlocker: string;
    primaryBlockerLabel: string;  // Human-readable
  };
  
  // Expected Impact
  expectedImpact: {
    min: number | null;  // Percentage
    max: number | null;  // Percentage
  } | null;
  
  // Visual Evidence
  evidence: {
    desktopAtf: string | null;
    mobileAtf: string | null;
  };
  
  // Primary Fix
  primaryFix: {
    title: string;
    why: string;
    where: string;  // "Hero" | "Form" | "CTA" | etc.
    priority: Priority;
    impact: Priority;
    effort: Priority;
  } | null;
  
  // Supporting Evidence
  supportingEvidence: Array<{
    title: string;
    why: string;
    where: string | null;
    priority: Priority;
    type: "fix" | "issue";
  }>;
  
  // Confidence & Transparency
  confidence: {
    level: number | null;
    explanation: string;
    limitations: string;
  };
  
  // Raw data (for dev mode only)
  raw?: any;
}


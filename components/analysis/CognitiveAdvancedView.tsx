import { useState } from "react";
import type {
  CognitiveFrictionResult,
  PsychologyAnalysisResult,
  DecisionBlockerItem,
  AIRecommendationItem,
} from "@/app/ai-marketing/brain-types";
import PsychologySummary from "@/components/PsychologySummary";
import KeyInsights from "@/components/KeyInsights";

type Props = {
  result: CognitiveFrictionResult;
  psychologyAnalysis?: PsychologyAnalysisResult | null;
  brainResponse?: string | null;
};

export function CognitiveAdvancedView({ result, psychologyAnalysis, brainResponse }: Props) {
  const narrative =
    psychologyAnalysis?.human_readable_report ??
    brainResponse ??
    result.psychology_narrative?.analysis_summary ??
    result.psychology_narrative?.ai_interpretation ??
    "";

  // Extract blockers from various possible sources
  const extractBlockers = (): Array<{ name: string; feedback: string }> => {
    const blockers: Array<{ name: string; feedback: string }> = [];
    
    // Check for new structured blockers format (blockers array with name/feedback)
    if (result.blockers && Array.isArray(result.blockers)) {
      return result.blockers.map((item: any) => ({
        name: item.name || item.element || "Unknown",
        feedback: item.feedback || item.issue || item.psychological_impact || "",
      }));
    }
    
    // Check for decision_blockers (structured format)
    if (result.decision_blockers) {
      Object.entries(result.decision_blockers).forEach(([category, items]) => {
        if (Array.isArray(items)) {
          items.forEach((item: DecisionBlockerItem) => {
            blockers.push({
              name: item.element || category,
              feedback: item.issue || item.psychological_impact || "",
            });
          });
        }
      });
    }
    
    // Check for simple string arrays
    if (result.keyDecisionBlockers && Array.isArray(result.keyDecisionBlockers)) {
      result.keyDecisionBlockers.forEach((blocker: string) => {
        blockers.push({
          name: blocker,
          feedback: blocker,
        });
      });
    }
    
    return blockers;
  };

  // Extract boosters from various possible sources
  const extractBoosters = (): Array<{ name: string; feedback: string }> => {
    const boosters: Array<{ name: string; feedback: string }> = [];
    
    // Check for new structured boosters format (boosters array with name/feedback)
    if (result.boosters && Array.isArray(result.boosters)) {
      return result.boosters.map((item: any) => ({
        name: item.name || item.element || "Unknown",
        feedback: item.feedback || item.change || item.psychological_effect || "",
      }));
    }
    
    // Check for ai_recommendations (structured format) - treat as boosters
    if (result.ai_recommendations) {
      Object.entries(result.ai_recommendations).forEach(([category, items]) => {
        if (Array.isArray(items)) {
          items.forEach((item: AIRecommendationItem) => {
            boosters.push({
              name: item.element || category,
              feedback: item.change || item.psychological_effect || "",
            });
          });
        }
      });
    }
    
    // Check for recommendedQuickWins as boosters
    if (result.recommendedQuickWins && Array.isArray(result.recommendedQuickWins)) {
      result.recommendedQuickWins.forEach((win: string) => {
        boosters.push({
          name: win,
          feedback: win,
        });
      });
    }
    
    return boosters;
  };

  const blockers = extractBlockers();
  const boosters = extractBoosters();

  return (
    <div className="space-y-6">
      {/* Key Insights - Simplified View */}
      <KeyInsights blockers={blockers} boosters={boosters} />

      {/* Psychology Summary - Keep for high-level metrics */}
      {result.psychology_dashboard && (
          <PsychologySummary result={result} />
      )}

      {narrative && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-2">
          <div className="text-sm font-semibold text-white">Full Psychology Narrative</div>
          <p className="text-sm text-slate-300 whitespace-pre-wrap">{narrative}</p>
        </div>
      )}
    </div>
  );
}


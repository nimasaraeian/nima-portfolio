"use client";

import React from "react";
import type { DecisionMachine } from "@/app/types/human-analyze";

type DecisionProfileCardProps = {
  decision_machine?: DecisionMachine;
};

// Map decision_mode to friendly labels
function getDecisionModeLabel(mode?: string): string {
  if (!mode) return "Unknown";
  
  const modeMap: Record<string, string> = {
    Ready_Heuristic: "Fast & Intuitive (Heuristic)",
    Ready_Analytical: "Slow & Analytical",
    Overwhelmed: "Overwhelmed / Cognitive Load",
    Skeptical: "Skeptical / Trust Barrier",
  };
  return modeMap[mode] || "Unknown";
}

// Map signals to friendly labels
function getSignalLabel(signal: string): string {
  const signalMap: Record<string, string> = {
    missing_primary_cta: "Missing primary CTA",
    unclear_value_prop: "Unclear value proposition",
    message_overload: "Message overload",
    low_trust: "Low trust signals",
    cta_competition: "CTA competition",
  };
  
  if (signalMap[signal]) {
    return signalMap[signal];
  }
  
  // If unknown, replace underscores with spaces and capitalize first letter of each word
  return signal.replace(/_/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Map lens score keys to friendly labels
function getLensLabel(lens: string): string {
  const lensMap: Record<string, string> = {
    trust: "Trust",
    cta: "CTA Clarity",
    friction: "Friction",
    heuristic: "Heuristic Readiness",
    emotional: "Emotional Pull",
    visual: "Visual Clarity",
  };
  return lensMap[lens] || lens.charAt(0).toUpperCase() + lens.slice(1);
}

// Format confidence: if <=1 assume 0..1, if >1 assume already percent
function formatConfidence(confidence?: number): number {
  if (confidence === undefined || confidence === null) return 0;
  if (confidence <= 1) {
    return Math.round(confidence * 100);
  }
  return Math.round(confidence);
}

// Clamp lens score to 0..1 and convert to percent
function formatLensScore(score: number): number {
  const clamped = Math.max(0, Math.min(1, score));
  return Math.round(clamped * 100);
}

export default function DecisionProfileCard({ decision_machine }: DecisionProfileCardProps) {
  // Return null if decision_machine is missing
  if (!decision_machine) {
    return null;
  }

  const decisionModeLabel = getDecisionModeLabel(decision_machine.decision_mode);
  const confidencePercent = formatConfidence(decision_machine.confidence);
  
  // Limit signals to max 6
  const displaySignals = (decision_machine.signals || []).slice(0, 6);
  
  // Get top 4 lens scores sorted desc
  const lensEntries = decision_machine.lens_scores 
    ? Object.entries(decision_machine.lens_scores)
        .sort(([, a], [, b]) => (b || 0) - (a || 0))
        .slice(0, 4)
    : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Decision Profile</h3>
      
      <div className="space-y-4">
        {/* Decision Mode */}
        <div>
          <span className="text-xs text-white/70">Decision Mode:</span>
          <p className="text-sm font-medium text-white mt-1">{decisionModeLabel}</p>
        </div>

        {/* Confidence */}
        <div>
          <span className="text-xs text-white/70">Confidence:</span>
          <p className="text-sm font-medium text-white mt-1">{confidencePercent}%</p>
        </div>

        {/* Primary Signals */}
        {displaySignals.length > 0 && (
          <div>
            <span className="text-xs text-white/70 mb-2 block">Primary Signals:</span>
            <div className="flex flex-wrap gap-2">
              {displaySignals.map((signal, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/90"
                >
                  {getSignalLabel(signal)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lens Scores - Top 4 sorted desc */}
        {lensEntries.length > 0 && (
          <div>
            <span className="text-xs text-white/70 mb-2 block">Lens Scores:</span>
            <div className="space-y-2">
              {lensEntries.map(([lens, score]) => {
                const scorePercent = formatLensScore(score || 0);
                return (
                  <div key={lens} className="flex items-center justify-between">
                    <span className="text-xs text-white/80">{getLensLabel(lens)}</span>
                    <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500/60 rounded-full transition-all"
                          style={{ width: `${scorePercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/70 w-12 text-right">{scorePercent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Human Explanation */}
        {decision_machine.human_explanation && (
          <div>
            <span className="text-xs text-white/70 mb-2 block">Human Explanation:</span>
            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
              {decision_machine.human_explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


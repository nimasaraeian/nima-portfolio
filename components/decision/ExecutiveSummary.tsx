"use client";

import React from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import { formatPct } from "@/lib/normalizeDecisionReport";

type ExecutiveSummaryProps = {
  report: NormalizedDecisionReport;
  rawBackendResponse?: any;
};

export default function ExecutiveSummary({ report, rawBackendResponse }: ExecutiveSummaryProps) {
  if (!report) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm font-medium text-red-400">Error: Report data is missing</p>
      </div>
    );
  }

  // Do NOT render fallback headline when status=limited
  const isLimited = rawBackendResponse?.status === "limited";
  if (isLimited) {
    return null; // Will be handled by InsufficientSignals component
  }

  // Defensive checks with fallbacks
  const primary_blocker = (report.primary_blocker && typeof report.primary_blocker === 'object' && report.primary_blocker.label) 
    ? report.primary_blocker 
    : { id: "unclear_value_proposition", label: "Unclear value proposition" };
  const dominant_causes = report.dominant_causes || [];
  const decision_style = (report.decision_style && typeof report.decision_style === 'object' && report.decision_style.label)
    ? report.decision_style
    : { id: "unknown", label: "Unknown" };
  const confidence = (report.confidence && typeof report.confidence === 'object' && report.confidence.percent !== undefined)
    ? report.confidence
    : { score: 0.35, percent: 35, label: "Medium" as const, explanation: "Confidence data not available." };
  const expected_impact = (report.expected_impact && typeof report.expected_impact === 'object' && report.expected_impact.label)
    ? report.expected_impact
    : { min: 3, max: 8, label: "+3% to +8%", note: "Directional estimate" };
  const goal = (typeof report.goal === 'string' && report.goal) || "leads";
  
  // Use dominant causes if available, otherwise fall back to single primary blocker
  const hasMultipleCauses = dominant_causes.length > 1;
  const causes = dominant_causes.length > 0 ? dominant_causes : [{ id: primary_blocker.id, label: primary_blocker.label, score: 1.0 }];
  const confidencePercent = confidence.percent || 35;
  
  // Generate headline based on whether we have multiple causes
  let title: string;
  if (hasMultipleCauses) {
    // Multiple causes: use combination language
    const primaryCause = causes[0];
    const secondaryCause = causes[1];
    if (confidencePercent < 40) {
      title = `Early hesitation detected: combination of factors, primarily ${primaryCause.label.toLowerCase()} and ${secondaryCause.label.toLowerCase()}.`;
    } else {
      title = `Users hesitate due to a combination of factors, primarily ${primaryCause.label.toLowerCase()} and ${secondaryCause.label.toLowerCase()}.`;
    }
  } else {
    // Single cause: use original logic
    const blockerLabel = causes[0]?.label || "Unclear value proposition";
    if (confidencePercent < 40) {
      // Low confidence - exploratory language
      if (blockerLabel.toLowerCase().includes("trust")) {
        title = "Early hesitation detected: trust is not established fast enough.";
      } else if (blockerLabel.toLowerCase().includes("cta")) {
        title = "Early hesitation detected: action path is unclear.";
      } else if (blockerLabel.toLowerCase().includes("value")) {
        title = "Early hesitation detected: value proposition needs clarity.";
      } else {
        title = "Early hesitation detected: decision friction identified.";
      }
    } else {
      // Higher confidence - assertive language
      if (blockerLabel.toLowerCase().includes("trust")) {
        title = "Users hesitate before acting — trust breaks early in the decision.";
      } else if (blockerLabel.toLowerCase().includes("cta")) {
        title = "Users hesitate before acting — the action path is unclear.";
      } else if (blockerLabel.toLowerCase().includes("value")) {
        title = "Users hesitate before acting — value proposition lacks clarity.";
      } else {
        title = "Users hesitate before acting — decision friction prevents action.";
      }
    }
  }
  
  // Subtitle from raw or default
  const subtitle = report.raw?.verdict?.reason || 
    report.raw?.summary?.message ||
    "This creates hesitation that prevents visitors from taking action.";

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-4xl">
        {subtitle}
      </p>

      {/* Primary Factors (if multiple causes) */}
      {hasMultipleCauses && (
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Primary factors influencing hesitation:
          </h3>
          <div className="space-y-3">
            {causes.slice(0, 3).map((cause, index) => {
              const scorePercent = Math.round(cause.score * 100);
              return (
                <div key={cause.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-white/90 font-medium">{cause.label}</span>
                    <span className="text-white/60 text-sm">({scorePercent}%)</span>
                  </div>
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${scorePercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-3">
          <div className="text-xs text-blue-300/70 mb-1 font-medium">Decision Style</div>
          <div className="text-base font-semibold text-white">
            {decision_style.label}
          </div>
        </div>

        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-3">
          <div className="text-xs text-green-300/70 mb-1 font-medium">Goal</div>
          <div className="text-base font-semibold text-white capitalize">
            {goal}
          </div>
        </div>

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-5 py-3">
          <div className="text-xs text-purple-300/70 mb-1 font-medium">Confidence</div>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-white">
              {formatPct(confidence.percent)}
            </span>
            {confidencePercent < 40 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                Exploratory Signal
              </span>
            ) : confidencePercent < 75 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Validated Signal
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/30 text-green-200 border border-green-400/30">
                High Confidence
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Impact Card - Always show if expected_impact exists */}
        <div className="p-6 rounded-xl border-2 border-green-500/50 bg-green-500/10">
        <div className="mb-3">
          <p className="text-sm text-white/70 mb-2">
            {hasMultipleCauses 
              ? `Estimated behavioral uplift if primary factors are addressed`
              : `Estimated behavioral uplift if ${causes[0]?.label.toLowerCase() || "issues"} ${causes[0]?.label.toLowerCase().includes("trust") ? "are addressed" : "is addressed"}`
            }
          </p>
          <div className="flex items-baseline gap-3">
            <div className="text-5xl md:text-6xl font-bold text-green-400">
              {expected_impact.label}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Confidence</span>
            <span className="text-sm font-semibold text-white">
              {formatPct(confidence.percent)}
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${confidence.percent}%` }}
            ></div>
          </div>
        </div>
        <p className="text-xs text-white/60 mt-3 italic">
          Directional estimate — not a guaranteed outcome
        </p>
        <p className="text-xs text-white/50 mt-2">
          Directional estimate for first-impression fixes only.
        </p>
      </div>
    </div>
  );
}

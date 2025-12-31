"use client";

import React from "react";
import { formatPct } from "@/lib/normalizeReport";
import { UiReport } from "@/lib/reportTypes";

type ExecutiveDecisionSummaryProps = {
  report: UiReport;
};

export default function ExecutiveDecisionSummary({ report }: ExecutiveDecisionSummaryProps) {
  const goal = report.goal || "leads";
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const primaryBlocker = report.summary?.primaryProblemTitle || "Unclear value proposition";
  const confidencePct = report.summary?.confidencePct ?? null;
  
  // Generate headline: "This page is losing [goal] due to [primary blocker]"
  const headline = `This page is losing ${goal} due to ${primaryBlocker.toLowerCase()}.`;
  
  // Get short explanation (max 2 lines)
  const explanation = report.summary?.primaryProblemExplanation || 
    "This causes visitors to stop instead of acting.";
  
  // Confidence explanation for tooltip
  const getConfidenceExplanation = () => {
    if (confidencePct === null) {
      return "Confidence data not available";
    }
    if (confidencePct >= 80) {
      return "High confidence - Very certain about these findings";
    } else if (confidencePct >= 60) {
      return "Medium confidence - Reasonably certain, some factors may vary";
    } else {
      return "Moderate confidence - Findings should be validated with testing";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {headline}
      </h1>

      {/* Three Compact Signal Chips */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Decision Style */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-3">
          <div className="text-xs text-blue-300/70 mb-1 font-medium">Decision Style</div>
          <div className="text-base font-semibold text-white">
            {decisionStyleLabel}
          </div>
        </div>

        {/* Primary Blocker */}
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-3">
          <div className="text-xs text-red-300/70 mb-1 font-medium">Primary Blocker</div>
          <div className="text-base font-semibold text-white">
            {primaryBlocker}
          </div>
        </div>

        {/* Confidence Level with Tooltip */}
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-5 py-3 group relative">
          <div className="text-xs text-purple-300/70 mb-1 font-medium">Confidence Level</div>
          <div className="text-base font-semibold text-white">
            {formatPct(confidencePct)}
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
            <div className="bg-slate-800 text-white text-xs rounded-lg px-3 py-2 max-w-xs border border-white/10 shadow-lg">
              {getConfidenceExplanation()}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Short Explanation (max 2 lines) */}
      <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
        {explanation}
      </p>
    </div>
  );
}







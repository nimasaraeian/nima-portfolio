"use client";

import React from "react";
import { formatPct } from "@/lib/normalizeReport";
import { UiReport } from "@/lib/reportTypes";

type HeroReportSummaryProps = {
  report: UiReport;
};

export default function HeroReportSummary({ report }: HeroReportSummaryProps) {
  const goal = report.goal || "leads";
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const confidencePct = report.summary?.confidencePct ?? null;
  
  // Get subheadline from primary_blocker.reason or fallback to explanation
  const subheadline = report.raw?.verdict?.primary_blocker?.reason || 
    report.raw?.verdict?.reason ||
    report.summary?.primaryProblemExplanation ||
    "This causes visitors to stop instead of acting.";

  // Confidence fallback to "Medium" if null
  const confidenceLabel = confidencePct !== null ? formatPct(confidencePct) : "Medium";

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Why this page is losing {goal}
      </h1>
      
      {/* Subheadline */}
      <p className="text-xl text-white/80 mb-8 leading-relaxed">
        {subheadline}
      </p>

      {/* Chips */}
      <div className="flex flex-wrap gap-4">
        {/* Decision Style */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-3">
          <div className="text-xs text-blue-300/70 mb-1 font-medium">Decision Style</div>
          <div className="text-base font-semibold text-white">
            {decisionStyleLabel}
          </div>
        </div>

        {/* Goal */}
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-3">
          <div className="text-xs text-green-300/70 mb-1 font-medium">Goal</div>
          <div className="text-base font-semibold text-white capitalize">
            {goal}
          </div>
        </div>

        {/* Confidence */}
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-5 py-3">
          <div className="text-xs text-purple-300/70 mb-1 font-medium">Confidence</div>
          <div className="text-base font-semibold text-white">
            {confidenceLabel}
          </div>
        </div>
      </div>
    </div>
  );
}







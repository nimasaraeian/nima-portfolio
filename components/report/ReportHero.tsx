"use client";

import React from "react";
import { formatPct } from "@/lib/normalizeReport";
import { UiReport } from "@/lib/reportTypes";

type ReportHeroProps = {
  report: UiReport;
};

export default function ReportHero({ report }: ReportHeroProps) {
  const executiveSummary = report.narrative?.executiveSummary || 
    `Why this page is losing leads: ${report.summary?.primaryProblemTitle || "Unclear value proposition"}.`;
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const confidencePct = report.summary?.confidencePct ?? null;
  const goal = report.goal || "leads";

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-3">
          {executiveSummary}
        </h1>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Decision Style Chip */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2">
          <div className="text-xs text-blue-300/70 mb-1">Decision Style</div>
          <div className="text-sm font-semibold text-white">
            {decisionStyleLabel}
          </div>
        </div>

        {/* Confidence Chip */}
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2">
          <div className="text-xs text-purple-300/70 mb-1">Confidence</div>
          <div className="text-sm font-semibold text-white">
            {formatPct(confidencePct)}
          </div>
        </div>

        {/* Goal Chip */}
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2">
          <div className="text-xs text-green-300/70 mb-1">Goal</div>
          <div className="text-sm font-semibold text-white capitalize">
            {goal}
          </div>
        </div>
      </div>
    </div>
  );
}


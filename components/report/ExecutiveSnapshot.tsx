"use client";

import React from "react";
import { formatPct } from "@/lib/normalizeReport";
import { UiReport } from "@/lib/reportTypes";

type ExecutiveSnapshotProps = {
  report: UiReport;
};

// Calculate expected lift
function calculateExpectedLift(report: UiReport): { min: number; max: number } {
  const primaryBlocker = report.summary?.primaryProblemTitle?.toLowerCase() || "";
  const confidencePct = report.summary?.confidencePct ?? 50;
  
  let baseMin = 5;
  let baseMax = 15;
  
  if (primaryBlocker.includes("trust")) {
    baseMin = 10;
    baseMax = 25;
  } else if (primaryBlocker.includes("cta") || primaryBlocker.includes("call-to-action")) {
    baseMin = 15;
    baseMax = 35;
  } else if (primaryBlocker.includes("value") || primaryBlocker.includes("proposition")) {
    baseMin = 8;
    baseMax = 20;
  } else if (primaryBlocker.includes("friction")) {
    baseMin = 12;
    baseMax = 30;
  }
  
  const confidenceMultiplier = confidencePct / 100;
  const min = Math.round(baseMin * confidenceMultiplier);
  const max = Math.round(baseMax * confidenceMultiplier);
  
  return { min: Math.max(5, min), max: Math.max(10, max) };
}

export default function ExecutiveSnapshot({ report }: ExecutiveSnapshotProps) {
  const goal = report.goal || "leads";
  const primaryBlocker = report.summary?.primaryProblemTitle || "Unclear value proposition";
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const confidencePct = report.summary?.confidencePct ?? null;
  
  // Primary verdict (1 bold sentence)
  const primaryVerdict = `This page is losing ${goal} because ${primaryBlocker.toLowerCase()}.`;
  
  // Expected Impact
  const lift = calculateExpectedLift(report);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10">
      {/* Primary Verdict */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {primaryVerdict}
      </h1>

      {/* Expected Impact - Visual Emphasis */}
      <div className="mb-8 p-6 rounded-xl border-2 border-green-500/50 bg-green-500/10">
        <div className="flex items-baseline gap-3 mb-2">
          <div className="text-5xl md:text-6xl font-bold text-green-400">
            +{lift.min}% to +{lift.max}%
          </div>
          <div className="text-xl text-white/80">
            Expected Lead Lift
          </div>
        </div>
        <p className="text-sm text-white/60 mt-2">
          Based on decision intelligence assessment
        </p>
      </div>

      {/* Decision Context Pills */}
      <div className="flex flex-wrap gap-4">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-3">
          <div className="text-xs text-blue-300/70 mb-1 font-medium">Decision Style</div>
          <div className="text-base font-semibold text-white">
            {decisionStyleLabel}
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
          <div className="text-base font-semibold text-white">
            {formatPct(confidencePct)}
          </div>
        </div>
      </div>
    </div>
  );
}










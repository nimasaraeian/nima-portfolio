"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";
import { formatPct } from "@/lib/normalizeReport";

type ExpectedImpactProps = {
  report: UiReport;
};

// Calculate expected lift based on primary blocker and confidence
function calculateExpectedLift(report: UiReport): { min: number; max: number } {
  const primaryBlocker = report.summary?.primaryProblemTitle?.toLowerCase() || "";
  const confidencePct = report.summary?.confidencePct ?? 50;
  
  // Base lift ranges by blocker type
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
  
  // Adjust based on confidence
  const confidenceMultiplier = confidencePct / 100;
  const min = Math.round(baseMin * confidenceMultiplier);
  const max = Math.round(baseMax * confidenceMultiplier);
  
  return { min: Math.max(5, min), max: Math.max(10, max) };
}

export default function ExpectedImpact({ report }: ExpectedImpactProps) {
  const confidencePct = report.summary?.confidencePct ?? null;
  const lift = calculateExpectedLift(report);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Expected Impact</h2>
      
      <div className="space-y-4">
        {/* Lead Lift */}
        <div>
          <div className="text-4xl font-bold text-green-400 mb-2">
            +{lift.min}% to +{lift.max}%
          </div>
          <p className="text-lg text-white/80">
            Expected Lead Lift
          </p>
        </div>

        {/* Confidence Bar */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Confidence</span>
            <span className="text-sm font-semibold text-white">{formatPct(confidencePct)}</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${confidencePct ?? 50}%` }}
            ></div>
          </div>
          <p className="text-xs text-white/60 mt-2">
            Early estimate based on decision intelligence analysis
          </p>
        </div>
      </div>
    </div>
  );
}


"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type FixThisFirstCardProps = {
  report: UiReport;
};

// Get the single best fix (highest impact, lowest effort)
function getBestFix(actions: Array<{ title: string; why: string; whereLabel: string; priority: "high" | "medium" | "low" }>) {
  if (actions.length === 0) return null;
  
  // Score: higher priority = higher impact, simpler location = lower effort
  const scored = actions.map((action, index) => {
    let impactScore = action.priority === "high" ? 3 : action.priority === "medium" ? 2 : 1;
    
    let effortScore = 2; // default medium
    const where = action.whereLabel.toLowerCase();
    if (where.includes("hero") || where.includes("cta")) {
      effortScore = 1; // low effort
    } else if (where.includes("form") || where.includes("checkout")) {
      effortScore = 3; // high effort
    }
    
    // Best: highest impact, lowest effort
    const score = impactScore * 2 - effortScore;
    
    return { 
      action, 
      score, 
      impact: impactScore === 3 ? "High" : impactScore === 2 ? "Medium" : "Low",
      effort: effortScore === 1 ? "Low" : effortScore === 2 ? "Medium" : "High"
    };
  });
  
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

export default function FixThisFirstCard({ report }: FixThisFirstCardProps) {
  const actions = report.actions || [];
  const bestFix = getBestFix(actions);
  
  if (!bestFix) {
    return null;
  }

  const { action, impact, effort } = bestFix;

  return (
    <div className="rounded-2xl border-2 border-green-500/50 bg-green-500/10 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Fix This First</h2>

      <div className="space-y-6">
        {/* What to Change */}
        <div>
          <h3 className="text-xl font-semibold text-white/70 mb-2">What to change</h3>
          <p className="text-2xl font-semibold text-white leading-relaxed">
            {action.title}
          </p>
        </div>

        {/* Where */}
        <div>
          <h3 className="text-xl font-semibold text-white/70 mb-2">Where</h3>
          <p className="text-xl text-white">
            {action.whereLabel}
          </p>
        </div>

        {/* Why it Matters (1 sentence, psychology-based) */}
        <div>
          <h3 className="text-xl font-semibold text-white/70 mb-2">Why it matters</h3>
          <p className="text-xl text-white/90 leading-relaxed">
            {action.why}
          </p>
        </div>

        {/* Impact vs Effort Indicator (Visual) */}
        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
          <div className="flex-1">
            <div className="text-sm text-white/70 mb-2">Impact</div>
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-3 rounded-full ${
                impact === "High" ? "bg-green-500" : 
                impact === "Medium" ? "bg-yellow-500" : 
                "bg-blue-500"
              }`} style={{ width: impact === "High" ? "100%" : impact === "Medium" ? "66%" : "33%" }}></div>
              <span className="text-base font-semibold text-white min-w-[60px]">{impact}</span>
            </div>
          </div>
          
          <div className="w-px h-12 bg-white/10"></div>
          
          <div className="flex-1">
            <div className="text-sm text-white/70 mb-2">Effort</div>
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-3 rounded-full ${
                effort === "Low" ? "bg-green-500" : 
                effort === "Medium" ? "bg-yellow-500" : 
                "bg-red-500"
              }`} style={{ width: effort === "Low" ? "33%" : effort === "Medium" ? "66%" : "100%" }}></div>
              <span className="text-base font-semibold text-white min-w-[60px]">{effort}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







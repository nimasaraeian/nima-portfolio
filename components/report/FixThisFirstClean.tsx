"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type FixThisFirstCleanProps = {
  report: UiReport;
};

// Get the single best fix
function getBestFix(actions: Array<{ title: string; why: string; whereLabel: string; priority: "high" | "medium" | "low" }>) {
  if (actions.length === 0) return null;
  
  const scored = actions.map((action) => {
    let impactScore = action.priority === "high" ? 3 : action.priority === "medium" ? 2 : 1;
    
    let effortScore = 2;
    const where = action.whereLabel.toLowerCase();
    if (where.includes("hero") || where.includes("cta")) {
      effortScore = 1;
    } else if (where.includes("form") || where.includes("checkout")) {
      effortScore = 3;
    }
    
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

export default function FixThisFirstClean({ report }: FixThisFirstCleanProps) {
  const actions = report.actions || [];
  const bestFix = getBestFix(actions);
  
  if (!bestFix) {
    return null;
  }

  const { action, impact, effort } = bestFix;

  return (
    <div className="rounded-2xl border-2 border-green-500/50 bg-green-500/10 p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Fix This First</h2>

      <div className="space-y-6">
        {/* What to Fix */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">What to Fix</h3>
          <p className="text-2xl font-semibold text-white leading-relaxed">
            {action.title}
          </p>
        </div>

        {/* Why it Matters */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">Why it Matters</h3>
          <p className="text-xl text-white/90 leading-relaxed">
            {action.why}
          </p>
        </div>

        {/* Where */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">Where</h3>
          <p className="text-xl text-white">
            {action.whereLabel}
          </p>
        </div>

        {/* Impact and Effort Visual Bars */}
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/70">Impact</span>
              <span className="text-lg font-bold text-white">{impact}</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  impact === "High" ? "bg-green-500" : 
                  impact === "Medium" ? "bg-yellow-500" : 
                  "bg-blue-500"
                }`}
                style={{ width: impact === "High" ? "100%" : impact === "Medium" ? "66%" : "33%" }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/70">Effort</span>
              <span className="text-lg font-bold text-white">{effort}</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  effort === "Low" ? "bg-green-500" : 
                  effort === "Medium" ? "bg-yellow-500" : 
                  "bg-red-500"
                }`}
                style={{ width: effort === "Low" ? "33%" : effort === "Medium" ? "66%" : "100%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}










"use client";

import React from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";

type FixThisFirstProps = {
  report: NormalizedDecisionReport;
};

export default function FixThisFirst({ report }: FixThisFirstProps) {
  if (!report || !report.fix_first || !report.fix_first.title) {
    return null;
  }
  
  const { fix_first } = report;
  
  // Defensive checks with fallbacks - remove generic text
  const title = fix_first.title || "Add visible trust signals before the primary CTA";
  const what = fix_first.what || title;
  
  // Behavioral rewrite for "why" - make it psychology-focused
  let why: string;
  if (fix_first.why && !fix_first.why.includes("This change will help") && !fix_first.why.includes("Recommended improvement")) {
    why = fix_first.why;
  } else {
    // Generate behavioral explanation based on blocker type
    const blockerId = report.primary_blocker?.id || "";
    if (blockerId.includes("trust")) {
      why = "Users seek validation before committing cognitive effort. Lack of early trust delays action.";
    } else if (blockerId.includes("cta")) {
      why = "Users need a clear, single path forward. Multiple competing actions create decision paralysis.";
    } else if (blockerId.includes("value")) {
      why = "Users can't understand what you offer. Clear value reduces confusion and accelerates decisions.";
    } else if (blockerId.includes("friction")) {
      why = "Complex processes create hesitation. Simpler paths reduce cognitive load and increase action.";
    } else {
      why = "This addresses the primary decision friction preventing users from taking action.";
    }
  }
  
  const where = fix_first.where || "Page";
  const impact = fix_first.impact || "Medium";
  const effort = fix_first.effort || "Medium";
  const examples = fix_first.examples || [];
  
  // Generate expected behavioral shift
  const getBehavioralShift = (): string => {
    const blockerId = report.primary_blocker?.id || "";
    if (blockerId.includes("trust")) {
      return "Hesitation → Validation → Action";
    } else if (blockerId.includes("cta")) {
      return "Confusion → Clarity → Action";
    } else if (blockerId.includes("value")) {
      return "Uncertainty → Understanding → Action";
    } else if (blockerId.includes("friction")) {
      return "Resistance → Ease → Action";
    }
    return "Hesitation → Clarity → Action";
  };

  return (
    <div className="rounded-2xl border-2 border-green-500/50 bg-green-500/10 p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Fix This First</h2>

      <div className="space-y-6">
        {/* What to Fix */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
            What to Fix
          </h3>
          <p className="text-2xl font-semibold text-white leading-relaxed">
            {title}
          </p>
        </div>

        {/* What (detailed) */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
            What
          </h3>
          <p className="text-xl text-white/90 leading-relaxed">
            {what}
          </p>
        </div>

        {/* Why This Matters */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
            Why This Matters
          </h3>
          <p className="text-xl text-white/90 leading-relaxed">
            {why}
          </p>
        </div>

        {/* Where */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
            Where
          </h3>
          <p className="text-xl text-white">
            {where === "Page" ? "Hero section (before scroll)" : where}
          </p>
        </div>

        {/* Expected Behavioral Shift */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
            Expected Behavioral Shift
          </h3>
          <p className="text-xl text-white/90 leading-relaxed font-medium">
            {getBehavioralShift()}
          </p>
        </div>

        {/* Impact vs Effort */}
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/70">Impact</span>
              <span className="text-lg font-bold text-white capitalize">{impact}</span>
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
              <span className="text-lg font-bold text-white capitalize">{effort}</span>
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

        {/* Example Fix - Contextual */}
        {examples && examples.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Best trust signal for this decision context:</h3>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <ul className="space-y-2 text-sm text-white/80">
                  {examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

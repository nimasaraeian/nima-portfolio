"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type TopOneFixProps = {
  report: UiReport;
};

export default function TopOneFix({ report }: TopOneFixProps) {
  const actions = report.actions || [];
  
  if (actions.length === 0) {
    return null;
  }

  // Get the first (most important) fix
  const topFix = actions[0];
  const where = topFix.whereLabel || "the page";
  const why = topFix.why || "reduce hesitation and increase action";
  const priority = topFix.priority || "medium";

  // Format the fix description
  const fixDescription = topFix.title || "Add clarity and improve the user experience";

  // What happens if fixed
  const getOutcome = () => {
    if (priority === "high") {
      return "Visitors will immediately understand what to do next and feel confident taking action. This directly addresses the primary reason they're leaving.";
    } else {
      return "This improvement will reduce hesitation and make it easier for visitors to move forward with confidence.";
    }
  };

  return (
    <div className="rounded-2xl border-2 border-green-500/50 bg-green-500/10 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🎯</div>
        <h2 className="text-3xl font-bold text-white">Top Fix</h2>
      </div>

      <div className="space-y-6">
        {/* The Fix */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-3">What to do</h3>
          <p className="text-xl text-white/90 leading-relaxed">
            {fixDescription}
          </p>
        </div>

        {/* Where it is */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Where it is</h3>
          <p className="text-lg text-white/80">
            {where.charAt(0).toUpperCase() + where.slice(1)}
          </p>
        </div>

        {/* Why it matters */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Why it matters</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {why.charAt(0).toUpperCase() + why.slice(1)}
          </p>
        </div>

        {/* What happens if fixed */}
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <h3 className="text-xl font-semibold text-white mb-2">What happens if fixed</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {getOutcome()}
          </p>
        </div>
      </div>
    </div>
  );
}







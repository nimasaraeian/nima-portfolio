"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type TopFixesProps = {
  report: UiReport;
};

export default function TopFixes({ report }: TopFixesProps) {
  const actions = report.actions || [];
  
  // Show max 3 fixes (skip the first one which is in FixThisFirst)
  const topFixes = actions.slice(1, 4);
  
  if (topFixes.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Top Fixes</h2>

      <div className="space-y-4">
        {topFixes.map((fix, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {fix.title}
            </h3>
            <p className="text-base text-white/80 leading-relaxed mb-2">
              {fix.why}
            </p>
            <p className="text-sm text-white/60">
              <span className="font-medium">Where:</span> {fix.whereLabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

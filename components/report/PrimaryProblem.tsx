"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type PrimaryProblemProps = {
  report: UiReport;
};

// Get concrete reasons for low trust signals
function getTrustSignalReasons(title: string): string[] {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("trust") || titleLower.includes("credibility")) {
    return [
      "Missing testimonials or customer reviews",
      "No credentials, certifications, or awards visible",
      "Lack of social proof near the main CTA",
    ];
  }
  return [];
}

export default function PrimaryProblem({ report }: PrimaryProblemProps) {
  const title = report.summary?.primaryProblemTitle || "No clear next step above the fold";
  const explanation = report.summary?.primaryProblemExplanation || 
    "Visitors can't instantly see what to do next, so they hesitate and leave.";
  const trustReasons = getTrustSignalReasons(title);

  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
      <div className="flex items-start gap-3">
        <div className="text-2xl">⚠️</div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-2">
            {title}
          </h2>
          <p className="text-base text-white/80 leading-relaxed mb-3">
            {explanation}
          </p>
          
          {trustReasons.length > 0 && (
            <div className="mt-3 space-y-1">
              {trustReasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


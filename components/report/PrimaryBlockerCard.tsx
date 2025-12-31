"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type PrimaryBlockerCardProps = {
  report: UiReport;
};

// Get concrete reasons for primary blocker
function getConcreteReasons(report: UiReport): string[] {
  const blockerTitle = report.summary?.primaryProblemTitle?.toLowerCase() || "";
  const rawBlocker = report.raw?.verdict?.primary_blocker;
  
  // Try to get reasons from API response
  if (rawBlocker?.reasons && Array.isArray(rawBlocker.reasons)) {
    return rawBlocker.reasons;
  }
  
  if (rawBlocker?.reason) {
    return [rawBlocker.reason];
  }
  
  // Fallback to concrete reasons based on blocker type
  if (blockerTitle.includes("trust") || blockerTitle.includes("credibility")) {
    return [
      "Missing testimonials or customer reviews",
      "No credentials, certifications, or awards visible",
      "Lack of social proof near the main CTA",
    ];
  } else if (blockerTitle.includes("cta") || blockerTitle.includes("call-to-action")) {
    return [
      "No clear button or link visible above the fold",
      "Multiple competing actions confuse visitors",
      "The next step isn't obvious or feels risky",
    ];
  } else if (blockerTitle.includes("value") || blockerTitle.includes("proposition")) {
    return [
      "Visitors can't quickly understand what you offer",
      "Benefits aren't clearly stated or visible",
      "No clear differentiation from competitors",
    ];
  } else if (blockerTitle.includes("friction")) {
    return [
      "Too many form fields or steps required",
      "Unclear process or timeline",
      "Barriers that create hesitation",
    ];
  }
  
  return [report.summary?.primaryProblemExplanation || "This issue prevents visitors from taking action."];
}

export default function PrimaryBlockerCard({ report }: PrimaryBlockerCardProps) {
  const blockerTitle = report.summary?.primaryProblemTitle || "Unclear value proposition";
  const concreteReasons = getConcreteReasons(report);

  return (
    <div className="rounded-2xl border-2 border-red-500/50 bg-red-500/10 p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-3xl">⚠️</div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-3">
            {blockerTitle}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Concrete reasons:</h3>
        <ul className="space-y-2">
          {concreteReasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-3 text-base text-white/90 leading-relaxed">
              <span className="text-red-400 mt-1.5 flex-shrink-0">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}







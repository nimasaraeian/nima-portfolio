"use client";

import React, { useState } from "react";
import { UiReport } from "@/lib/reportTypes";

type SupportingEvidenceMergedProps = {
  report: UiReport;
};

export default function SupportingEvidenceMerged({ report }: SupportingEvidenceMergedProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get secondary actions (skip first which is in FixThisFirst)
  const secondaryActions = (report.actions || []).slice(1);
  const issues = report.issues || [];
  
  // Combine and deduplicate
  const allItems = [
    ...secondaryActions.map(action => ({
      title: action.title,
      explanation: action.why,
      where: action.whereLabel,
      type: "fix" as const,
      priority: action.priority,
    })),
    ...issues.map(issue => ({
      title: issue.title,
      explanation: issue.explanation,
      where: null,
      type: "issue" as const,
      priority: issue.severity,
    })),
  ];
  
  if (allItems.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Supporting Evidence</h2>
          <p className="text-sm text-white/60">
            {allItems.length} additional insight{allItems.length !== 1 ? "s" : ""} that contribute to hesitation
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-white/70 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {allItems.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white flex-1">
                  {item.title}
                </h3>
                {item.priority && (
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    item.priority === "high" ? "bg-red-500/20 text-red-300" :
                    item.priority === "medium" ? "bg-yellow-500/20 text-yellow-300" :
                    "bg-blue-500/20 text-blue-300"
                  }`}>
                    {item.priority}
                  </span>
                )}
              </div>
              <p className="text-base text-white/80 leading-relaxed mb-2">
                {item.explanation}
              </p>
              {item.where && (
                <p className="text-sm text-white/60">
                  <span className="font-medium">Location:</span> {item.where}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}










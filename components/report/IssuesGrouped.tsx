"use client";

import React, { useState } from "react";
import { UiReport } from "@/lib/reportTypes";

type IssuesGroupedProps = {
  report: UiReport;
};

export default function IssuesGrouped({ report }: IssuesGroupedProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const issues = report.issues || [];
  
  if (issues.length === 0) {
    return null;
  }

  // Group issues by severity
  const groupedIssues = {
    high: issues.filter(i => i.severity === "high"),
    medium: issues.filter(i => i.severity === "medium"),
    low: issues.filter(i => i.severity === "low"),
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Issues</h2>
          <p className="text-sm text-white/60">
            {issues.length} issue{issues.length !== 1 ? "s" : ""} identified
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
        <div className="mt-6 space-y-6">
          {/* High Severity */}
          {groupedIssues.high.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">High Priority</h3>
              <div className="space-y-3">
                {groupedIssues.high.map((issue, index) => (
                  <div key={index} className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                    <h4 className="text-base font-semibold text-white mb-2">{issue.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">{issue.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medium Severity */}
          {groupedIssues.medium.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Medium Priority</h3>
              <div className="space-y-3">
                {groupedIssues.medium.map((issue, index) => (
                  <div key={index} className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                    <h4 className="text-base font-semibold text-white mb-2">{issue.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">{issue.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Severity */}
          {groupedIssues.low.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Low Priority</h3>
              <div className="space-y-3">
                {groupedIssues.low.map((issue, index) => (
                  <div key={index} className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                    <h4 className="text-base font-semibold text-white mb-2">{issue.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">{issue.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}







"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type InsightsProps = {
  report: UiReport;
};

export default function Insights({ report }: InsightsProps) {
  const issues = report.issues || [];
  
  if (issues.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "border-red-500/30 bg-red-500/10";
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10";
      case "low":
        return "border-blue-500/30 bg-blue-500/10";
    }
  };

  const getSeverityLabel = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Key Insights</h2>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 ${getSeverityColor(issue.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
              <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 font-medium">
                {getSeverityLabel(issue.severity)} Severity
              </span>
            </div>
            <p className="text-base text-white/80 leading-relaxed">
              {issue.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


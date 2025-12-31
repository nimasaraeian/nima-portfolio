"use client";

import React, { useState } from "react";
import { UiReport } from "@/lib/reportTypes";

type SecondaryFixesProps = {
  report: UiReport;
};

export default function SecondaryFixes({ report }: SecondaryFixesProps) {
  const actions = report.actions || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  // Skip the first action (it's shown in TopOneFix)
  const secondaryFixes = actions.slice(1);
  
  if (secondaryFixes.length === 0) {
    return null;
  }

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10";
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10";
      case "low":
        return "border-blue-500/30 bg-blue-500/10";
    }
  };

  const getPriorityLabel = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Additional Fixes</h2>

      <div className="space-y-3">
        {secondaryFixes.map((fix, index) => {
          const isExpanded = expandedIndex === index;
          const priority = fix.priority || "medium";
          
          return (
            <div
              key={index}
              className={`rounded-lg border p-4 cursor-pointer transition ${getPriorityColor(priority)}`}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {fix.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 font-medium">
                      {getPriorityLabel(priority)}
                    </span>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="text-sm font-medium text-white/70">Problem:</span>
                        <p className="text-base text-white/80 mt-1">
                          {fix.title}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-white/70">Impact:</span>
                        <p className="text-base text-white/80 mt-1">
                          {fix.why}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-white/70">Where:</span>
                        <p className="text-base text-white/80 mt-1">
                          {fix.whereLabel}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <svg
                  className={`w-5 h-5 text-white/70 transition-transform flex-shrink-0 ml-4 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}







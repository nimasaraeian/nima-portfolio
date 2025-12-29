"use client";

import React, { useState } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";

type SupportingEvidenceProps = {
  report: NormalizedDecisionReport;
};

/**
 * Detect if text contains non-ASCII characters (e.g., Persian/Farsi)
 */
function containsNonASCII(text: string): boolean {
  return /[^\x00-\x7F]/.test(text);
}

/**
 * Detect primary language of report based on content
 */
function detectReportLanguage(report: NormalizedDecisionReport): "en" | "non-en" {
  // Check executive summary title
  const title = report.primary_blocker?.label || "";
  if (containsNonASCII(title)) return "non-en";
  
  // Check fix_first title
  if (report.fix_first?.title && containsNonASCII(report.fix_first.title)) {
    return "non-en";
  }
  
  // Check raw data for language hints
  if (report.raw?.language && report.raw.language !== "en") {
    return "non-en";
  }
  
  return "en";
}

/**
 * Check if item text matches report language
 */
function matchesLanguage(text: string, reportLanguage: "en" | "non-en"): boolean {
  const textHasNonASCII = containsNonASCII(text);
  return (reportLanguage === "en" && !textHasNonASCII) || 
         (reportLanguage === "non-en" && textHasNonASCII);
}

export default function SupportingEvidence({ report }: SupportingEvidenceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!report) {
    return null;
  }
  
  const supporting = report.supporting || [];
  const reportLanguage = detectReportLanguage(report);

  // Filter by language - only show items that match report language
  const languageFiltered = supporting.filter(item => {
    if (!item || !item.title) return false;
    return matchesLanguage(item.title, reportLanguage) && 
           (!item.summary || matchesLanguage(item.summary, reportLanguage));
  });

  // Check if status is limited
  const isLimited = report.raw?.status === "limited";
  
  if (languageFiltered.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white mb-1">Supporting Evidence</h2>
        <p className="text-sm text-white/60">
          {isLimited ? "Insufficient signals" : "No additional insights available."}
        </p>
      </div>
    );
  }

  // Group by priority - filter out any items without required properties
  const validSupporting = languageFiltered.filter(item => item && item.title);
  const grouped = {
    high: validSupporting.filter(item => item.priority === "high"),
    medium: validSupporting.filter(item => item.priority === "medium"),
    low: validSupporting.filter(item => item.priority === "low"),
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Supporting Evidence</h2>
          <p className="text-sm text-white/60">
            {validSupporting.length} additional insight{validSupporting.length !== 1 ? "s" : ""} that contribute to hesitation
            {languageFiltered.length < supporting.length && (
              <span className="ml-2 text-xs text-white/50">
                ({supporting.length - languageFiltered.length} filtered by language)
              </span>
            )}
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
          {/* High Priority */}
          {grouped.high.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">High Priority</h3>
              <div className="space-y-3">
                {grouped.high.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                    <h4 className="text-base font-semibold text-white mb-2">{item.title || "Issue identified"}</h4>
                    <p className="text-sm text-white/80 leading-relaxed mb-2">{item.summary || ""}</p>
                    {item.where && item.where !== "Page" && (
                      <p className="text-xs text-white/60">
                        <span className="font-medium">Location:</span> {item.where}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medium Priority */}
          {grouped.medium.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Medium Priority</h3>
              <div className="space-y-3">
                {grouped.medium.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                    <h4 className="text-base font-semibold text-white mb-2">{item.title || "Issue identified"}</h4>
                    <p className="text-sm text-white/80 leading-relaxed mb-2">{item.summary || ""}</p>
                    {item.where && item.where !== "Page" && (
                      <p className="text-xs text-white/60">
                        <span className="font-medium">Location:</span> {item.where}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Priority */}
          {grouped.low.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Low Priority</h3>
              <div className="space-y-3">
                {grouped.low.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                    <h4 className="text-base font-semibold text-white mb-2">{item.title || "Issue identified"}</h4>
                    <p className="text-sm text-white/80 leading-relaxed mb-2">{item.summary || ""}</p>
                    {item.where && item.where !== "Page" && (
                      <p className="text-xs text-white/60">
                        <span className="font-medium">Location:</span> {item.where}
                      </p>
                    )}
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

"use client";

import React, { useState } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import { formatPct } from "@/lib/normalizeDecisionReport";

type ConfidenceTransparencyProps = {
  report: NormalizedDecisionReport;
};

export default function ConfidenceTransparency({ report }: ConfidenceTransparencyProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!report || !report.confidence) {
    return null;
  }
  
  const { confidence } = report;
  
  // Check if we should show contextual explanation
  const confidencePercent = confidence.percent || 0;
  const captureStatus = report.raw?.visual?.capture_status || report.raw?.visual?.capture_status;
  const shouldShowExplanation = confidencePercent <= 60 || captureStatus === "failed";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Scientific Transparency</h2>
          <p className="text-sm text-white/60">
            Optional: Methodology and confidence details
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
          {/* Confidence Level */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Confidence Level</h3>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-white mb-3">
                  {formatPct(confidence.percent)}
                  {confidence.percent < 40 ? (
                    <span className="ml-3 text-lg font-normal text-purple-300">(Exploratory Signal)</span>
                  ) : confidence.percent < 75 ? (
                    <span className="ml-3 text-lg font-normal text-blue-300">(Validated Signal)</span>
                  ) : (
                    <span className="ml-3 text-lg font-normal text-green-300">(High Confidence)</span>
                  )}
                </div>
                <p className="text-lg text-white/90 leading-relaxed">
                  {confidence.explanation}
                </p>
                {shouldShowExplanation && (
                  <p className="text-sm text-white/50 mt-3 italic">
                    Lower confidence due to limited visual signals. Accuracy improves with live page capture or higher-resolution input.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Limitations</h3>
            <p className="text-base text-white/80 leading-relaxed italic">
              This is directional intelligence to guide optimization efforts, not absolute truth. Always validate key findings with real user testing.
            </p>
          </div>

          {/* Why AI */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Why AI?</h3>
            <div className="space-y-3 text-sm text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">Detects decision patterns, not UI checklists.</strong> This tool analyzes how users actually make decisions on your page, not just whether elements exist.
              </p>
              <p>
                <strong className="text-white">Uses behavioral signals + visual evidence.</strong> Combines decision psychology with visual intelligence to identify what's really causing hesitation.
              </p>
              <p>
                <strong className="text-white">Improves via feedback & iteration.</strong> The system learns from real conversion data to provide more accurate insights over time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

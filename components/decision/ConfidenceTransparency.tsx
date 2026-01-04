"use client";

import React, { useState } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import { formatPct } from "@/lib/normalizeDecisionReport";
import { getConfidenceSourceOfTruth } from "@/lib/confidenceSelector";

type ConfidenceTransparencyProps = {
  report: NormalizedDecisionReport;
  rawBackendResponse?: any;
};

export default function ConfidenceTransparency({ report, rawBackendResponse }: ConfidenceTransparencyProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get single source of truth for confidence
  const confidenceSource = getConfidenceSourceOfTruth(rawBackendResponse);
  
  // Fallback check - if no confidence at all, don't render
  if (!report || (!confidenceSource && !report.confidence)) {
    return null;
  }
  
  // Use v2 confidence when available, otherwise fallback to report confidence
  const confidencePercent = confidenceSource.percent;
  const confidenceLabel = confidenceSource.label;
  const isV2 = confidenceSource.isV2;
  
  // Check if we should show contextual explanation
  const captureStatus = report.raw?.visual?.capture_status || report.raw?.visual?.capture_status;
  const shouldShowExplanation = confidencePercent <= 60 || captureStatus === "failed";
  
  // Get explanation text (use report explanation as fallback)
  const explanation = report.confidence?.explanation || 
    (confidenceLabel === "High" 
      ? "Very confident. This decision intelligence assessment is highly certain about these findings. You can proceed with confidence, but still validate with real user testing."
      : confidenceLabel === "Medium"
      ? "Moderately confident. Use this as directional guidance, but prioritize validating these findings with user research."
      : "Lower confidence. Treat these as hypotheses to test rather than definitive answers. User testing is essential.");

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
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl font-bold text-white">
                    {formatPct(confidencePercent)}
                  </div>
                  {confidenceLabel && (
                    <span
                      className={`text-lg font-normal ${
                        confidenceLabel === "High"
                          ? "text-green-300"
                          : confidenceLabel === "Medium"
                          ? "text-blue-300"
                          : "text-purple-300"
                      }`}
                    >
                      ({confidenceLabel === "High" ? "High Confidence" : confidenceLabel === "Medium" ? "Validated Signal" : "Exploratory Signal"})
                    </span>
                  )}
                  {isV2 ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Engine: v2
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-300 border border-gray-400/30">
                      Engine: legacy
                    </span>
                  )}
                </div>
                <p className="text-lg text-white/90 leading-relaxed">
                  {explanation}
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

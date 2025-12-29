"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { UiReport } from "@/lib/reportTypes";
import { formatPct } from "@/lib/normalizeReport";

type AdvancedDetailsProps = {
  report: UiReport;
};

export default function AdvancedDetails({ report }: AdvancedDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRawAPI, setShowRawAPI] = useState(false);
  const searchParams = useSearchParams();
  
  // Only show Raw API Response in development, with ?debug=true, or if user toggles
  const isDebugMode = 
    process.env.NODE_ENV === "development" || 
    searchParams.get("debug") === "true" ||
    showRawAPI;

  const confidencePct = report.summary?.confidencePct ?? null;

  // Human explanation of confidence level
  const getConfidenceExplanation = () => {
    if (confidencePct === null) {
      return "Confidence data is not available for this decision intelligence assessment.";
    }
    
    if (confidencePct >= 80) {
      return "Very confident. This decision intelligence assessment is highly certain about these findings. You can proceed with confidence, but still validate with real user testing.";
    } else if (confidencePct >= 60) {
      return "Reasonably confident. This decision intelligence assessment is fairly certain, though some factors may vary. Consider this a strong signal, but validate key assumptions.";
    } else if (confidencePct >= 40) {
      return "Moderately confident. This decision intelligence assessment has moderate certainty. Use this as directional guidance, but prioritize validating these findings with user research.";
    } else {
      return "Lower confidence. This decision intelligence assessment has less certainty. Treat these as hypotheses to test rather than definitive answers. User testing is essential.";
    }
  };
  
  // What 50% means in human terms
  const getConfidenceMeaning = () => {
    if (confidencePct === null) return "";
    
    if (confidencePct === 50) {
      return "50% confidence means this decision intelligence assessment is equally likely to be right or wrong. This is a coin flip—you need additional validation before acting.";
    } else if (confidencePct < 50) {
      return `${formatPct(confidencePct)} confidence means this decision intelligence assessment is less certain than a coin flip. These are hypotheses to test, not conclusions to act on.`;
    } else {
      return `${formatPct(confidencePct)} confidence means this decision intelligence assessment is ${confidencePct >= 80 ? "very" : confidencePct >= 60 ? "fairly" : "somewhat"} certain. ${confidencePct >= 60 ? "You can proceed with confidence, but still validate." : "Validate key assumptions before making major changes."}`;
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white">Advanced</h2>
          <p className="text-sm text-white/60 mt-1">
            Decision profile, confidence explanation, and technical details
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      {isOpen && (
        <div className="mt-6 space-y-6">
          {/* Decision Profile */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Decision Profile</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-white/70">Decision Style:</span>
                <div className="text-base font-medium text-white mt-1">
                  {report.summary?.decisionStyleLabel || "Mixed decision style"}
                </div>
              </div>
              <div>
                <span className="text-sm text-white/70">Goal:</span>
                <div className="text-base font-medium text-white mt-1 capitalize">
                  {report.goal || "leads"}
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Explanation */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Confidence Explanation</h3>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-white mb-3">
                  {formatPct(confidencePct)}
                </div>
                <p className="text-lg text-white/90 leading-relaxed">
                  {getConfidenceExplanation()}
                </p>
              </div>
              
              {confidencePct !== null && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-base text-white/80 leading-relaxed">
                    <strong className="text-white">In human terms:</strong> {getConfidenceMeaning()}
                  </p>
                </div>
              )}
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/70 leading-relaxed italic">
                  This is directional intelligence to guide your optimization efforts, not absolute truth. Always validate key findings with real user testing.
                </p>
              </div>
            </div>
          </div>

          {/* Iteration Metadata */}
          {report.raw && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Iteration Metadata</h3>
              <div className="space-y-2 text-sm text-white/70">
                {report.raw.timestamp && (
                  <div>
                    <span className="font-medium">Timestamp:</span> {new Date(report.raw.timestamp).toLocaleString()}
                  </div>
                )}
                {report.raw.version && (
                  <div>
                    <span className="font-medium">Version:</span> {report.raw.version}
                  </div>
                )}
                {report.raw.model && (
                  <div>
                    <span className="font-medium">Model:</span> {report.raw.model}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Debug Data */}
          {isDebugMode && report.raw && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Debug Data</h3>
              <div className="text-sm text-white/70 space-y-2">
                <div>
                  <span className="font-medium">Request URL:</span> {report.raw.url || report.raw.request?.url || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Mode:</span> {report.mode || "N/A"}
                </div>
                {report.raw.decision_machine && (
                  <div>
                    <span className="font-medium">Decision Machine:</span> {JSON.stringify(report.raw.decision_machine, null, 2).substring(0, 200)}...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Raw API Response */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Raw API Response</h3>
            <p className="text-sm text-white/60 mb-4">
              For advanced users / debugging only
            </p>
            
            <button
              onClick={() => setShowRawAPI(!showRawAPI)}
              className="text-sm text-white/60 hover:text-white/80 transition flex items-center gap-2"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showRawAPI ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {showRawAPI ? "Hide" : "Show"} raw API response
            </button>

            {isDebugMode && showRawAPI && (
              <div className="mt-4 rounded-lg border border-white/10 bg-slate-900/50 p-4">
                <pre className="text-xs text-white/70 overflow-x-auto max-h-96 overflow-y-auto">
                  {JSON.stringify(report.raw, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


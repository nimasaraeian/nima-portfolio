"use client";

import React, { useState } from "react";
import DecisionProfileCard from "@/components/DecisionProfileCard";

type DetailsAccordionProps = {
  result: any;
  confidence: number | null;
};

export default function DetailsAccordion({ result, confidence }: DetailsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const issues = Array.isArray(result.issues) ? result.issues : [];
  const checks = Array.isArray(result.checks) ? result.checks : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition"
      >
        <h3 className="text-lg font-semibold text-white">Details</h3>
        <span className="text-white/70 text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-6">
          {/* Decision Profile */}
          {result.decision_machine && (
            <div>
              <DecisionProfileCard decision_machine={result.decision_machine} />
            </div>
          )}

          {/* Confidence */}
          {confidence !== null && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Confidence</h4>
              <p className="text-2xl font-bold text-white">{confidence}%</p>
            </div>
          )}

          {/* Issues */}
          {issues.length > 0 && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white mb-4">Issues</h4>
              <div className="space-y-3">
                {issues.map((issue: any, index: number) => (
                  <div
                    key={issue.id || index}
                    className={`border-l-4 pl-3 py-2 ${
                      issue.severity === "error" || issue.severity === "high"
                        ? "border-red-500/50"
                        : issue.severity === "warning" || issue.severity === "medium"
                        ? "border-yellow-500/50"
                        : "border-yellow-500/30"
                    }`}
                  >
                    {issue.problem && (
                      <p className="text-sm font-medium text-white mb-1">{issue.problem}</p>
                    )}
                    {issue.why_it_hurts && (
                      <p className="text-xs text-white/70">{issue.why_it_hurts}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checks */}
          {checks.length > 0 && (
            <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
              <h4 className="text-sm font-semibold text-white mb-2">Uncertainty</h4>
              <div className="space-y-2">
                {checks.map((check: any, index: number) => (
                  <p key={index} className="text-xs text-white/80">
                    {typeof check === "string" ? check : JSON.stringify(check)}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Debug Info (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <details className="rounded-lg border border-white/10 bg-white/5 p-4">
              <summary className="text-xs text-white/60 cursor-pointer">Debug Info</summary>
              <pre className="mt-2 text-xs text-white/60 overflow-auto max-h-64">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}



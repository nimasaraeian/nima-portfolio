"use client";

import React, { useState } from "react";
import { UiReport } from "@/lib/reportTypes";
import { formatPct } from "@/lib/normalizeReport";

type DecisionProfileProps = {
  report: UiReport;
};

export default function DecisionProfile({ report }: DecisionProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const confidencePct = report.summary?.confidencePct ?? null;
  const goal = report.goal || "leads";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-2xl font-semibold text-white">Decision Profile</h2>
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
        <div className="mt-6 space-y-4">
          <div>
            <span className="text-sm text-white/70">Decision Style:</span>
            <div className="text-base font-medium text-white mt-1">
              {decisionStyleLabel}
            </div>
          </div>
          
          <div>
            <span className="text-sm text-white/70">Confidence:</span>
            <div className="text-base font-medium text-white mt-1">
              {formatPct(confidencePct)}
            </div>
          </div>
          
          <div>
            <span className="text-sm text-white/70">Goal:</span>
            <div className="text-base font-medium text-white mt-1 capitalize">
              {goal}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}










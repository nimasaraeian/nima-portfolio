"use client";

import React, { useState } from "react";

export default function WhyAI() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-white/70">Why AI?</span>
        <svg
          className={`w-4 h-4 text-white/60 transition-transform ${isExpanded ? "rotate-180" : ""}`}
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
        <div className="mt-3 space-y-2 text-sm text-white/80 leading-relaxed">
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
      )}
    </div>
  );
}


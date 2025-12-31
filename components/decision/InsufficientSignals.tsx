"use client";

import React from "react";

type InsufficientSignalsProps = {
  missingRequired?: string[];
  mode?: "url" | "image" | "text";
  onTryAnother?: () => void;
  message?: string;
};

export default function InsufficientSignals({ 
  missingRequired = [], 
  mode = "image",
  onTryAnother,
  message
}: InsufficientSignalsProps) {
  const tips = mode === "image" ? [
    "Use a higher resolution image (at least 1200px width)",
    "Include the main call-to-action button in the image",
    "Include the value proposition or offer text",
    "Ensure text is clearly readable",
    "Capture the above-the-fold area"
  ] : mode === "url" ? [
    "Ensure the page loads correctly",
    "Check that the page is publicly accessible",
    "Try a different URL if the page requires authentication"
  ] : [
    "Provide more detailed text about the page",
    "Include information about the call-to-action",
    "Describe the value proposition or offer"
  ];

  return (
    <div className="rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/10 p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">Insufficient Signals</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {message || `The analysis couldn't extract enough decision signals from the provided ${mode === "image" ? "image" : mode === "url" ? "page" : "text"} to generate a reliable report.`}
          </p>
        </div>
      </div>

      {missingRequired && missingRequired.length > 0 && (
        <div className="mb-6 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
          <h3 className="text-sm font-semibold text-yellow-300 mb-3 uppercase tracking-wide">
            Missing Required Elements
          </h3>
          <ul className="space-y-2">
            {missingRequired.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/90">
                <span className="text-yellow-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Tips for Better Results</h3>
          <ul className="space-y-2 mb-6">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/80">
                <span className="text-green-400 mt-1">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {onTryAnother && (
          <button
            onClick={onTryAnother}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Another {mode === "image" ? "Image" : mode === "url" ? "URL" : "Text"}
          </button>
        )}
      </div>
    </div>
  );
}


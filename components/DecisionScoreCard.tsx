"use client";

import React, { useState } from "react";

type DecisionScoreCardProps = {
  data: {
    score: number;
    label: string;
    confidence: "High" | "Medium" | "Low";
    primaryBlock?: string;
    topDrivers: string[];
  };
};

export default function DecisionScoreCard({ data }: DecisionScoreCardProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopySummary = async () => {
    const primaryBlockText = data.primaryBlock 
      ? `Primary block: ${data.primaryBlock}. ` 
      : "";
    const driversText = data.topDrivers.length > 0
      ? `Top drivers: ${data.topDrivers.join(", ")}`
      : "";
    
    const summary = `Decision Friction Score: ${data.score}/10 (Confidence: ${data.confidence}). ${primaryBlockText}${driversText}`;
    
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy summary:", err);
    }
  };
  
  // Determine score color based on value
  const getScoreColor = () => {
    if (data.score >= 7.5) return "text-red-400";
    if (data.score >= 4.5) return "text-yellow-400";
    return "text-green-400";
  };
  
  // Determine confidence badge color
  const getConfidenceColor = () => {
    if (data.confidence === "High") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (data.confidence === "Medium") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  };
  
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        {/* Score Display */}
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2">
            <span className={`text-5xl font-bold ${getScoreColor()}`}>
              {data.score.toFixed(1)}
            </span>
            <span className="text-2xl font-semibold text-white/60">/10</span>
          </div>
          <p className="text-lg font-medium text-white/80 mb-4">
            {data.label}
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${getConfidenceColor()}`}>
              Confidence: {data.confidence}
            </span>
            {data.primaryBlock && (
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border border-white/20 bg-white/5 text-white/70">
                Primary block: {data.primaryBlock}
              </span>
            )}
          </div>
          
          {/* Top Drivers */}
          {data.topDrivers.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-white/60 mb-2">Top drivers:</p>
              <ul className="space-y-1">
                {data.topDrivers.map((driver, idx) => (
                  <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-white/40 mt-1.5">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Copy Button */}
        <div>
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy summary
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


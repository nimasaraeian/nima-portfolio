"use client";

import React, { useState, useEffect } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import ExecutiveSummary from "./ExecutiveSummary";
import VisualEvidence from "./VisualEvidence";
import FixThisFirst from "./FixThisFirst";
import SupportingEvidence from "./SupportingEvidence";
import ConfidenceTransparency from "./ConfidenceTransparency";

type DecisionReportDashboardProps = {
  report: NormalizedDecisionReport;
  onRetryCapture?: () => void;
};

const DEV_MODE_KEY = "decision_intelligence_dev_mode";

function generateMarkdownReport(report: NormalizedDecisionReport): string {
  const lines: string[] = [];
  
  // Safe accessors with fallbacks
  const goal = report.goal || "leads";
  const primaryBlockerLabel = report.primary_blocker?.label || "Unclear value proposition";
  const decisionStyleLabel = report.decision_style?.label || "Unknown";
  const confidencePercent = report.confidence?.percent ?? 35;
  const confidenceLabel = report.confidence?.label || "Medium";
  const expectedImpactLabel = report.expected_impact?.label || "+3% to +8%";
  const confidenceExplanation = report.confidence?.explanation || "Confidence data not available.";
  
  lines.push("# Decision Intelligence Report");
  lines.push("");
  lines.push(`## Executive Summary`);
  lines.push(`This page is losing ${goal} because ${primaryBlockerLabel.toLowerCase()}.`);
  lines.push("");
  lines.push(`- **Decision Style:** ${decisionStyleLabel}`);
  lines.push(`- **Confidence:** ${confidencePercent}% (${confidenceLabel})`);
  lines.push(`- **Expected Impact:** ${expectedImpactLabel}`);
  lines.push("");
  
  if (report.fix_first && report.fix_first.title) {
    lines.push(`## Fix This First`);
    lines.push(`**${report.fix_first.title}**`);
    lines.push("");
    if (report.fix_first.what) {
      lines.push(`- **What:** ${report.fix_first.what}`);
    }
    if (report.fix_first.why) {
      lines.push(`- **Why:** ${report.fix_first.why}`);
    }
    if (report.fix_first.where) {
      lines.push(`- **Where:** ${report.fix_first.where}`);
    }
    if (report.fix_first.impact && report.fix_first.effort) {
      lines.push(`- **Impact:** ${report.fix_first.impact} | **Effort:** ${report.fix_first.effort}`);
    }
    lines.push("");
  }
  
  if (report.supporting && Array.isArray(report.supporting) && report.supporting.length > 0) {
    lines.push(`## Supporting Evidence`);
    report.supporting.forEach((item, idx) => {
      if (item && item.title) {
        lines.push(`### ${idx + 1}. ${item.title}`);
        if (item.summary) {
          lines.push(`- ${item.summary}`);
        }
        if (item.where && item.where !== "Page") {
          lines.push(`- Location: ${item.where}`);
        }
        lines.push("");
      }
    });
  }
  
  lines.push(`## Confidence & Transparency`);
  lines.push(`**Confidence:** ${confidencePercent}% (${confidenceLabel})`);
  lines.push(`**Explanation:** ${confidenceExplanation}`);
  lines.push("");
  lines.push(`**Limitations:** This is directional intelligence to guide optimization efforts, not absolute truth. Always validate key findings with real user testing.`);
  
  return lines.join("\n");
}

export default function DecisionReportDashboard({ report, onRetryCapture }: DecisionReportDashboardProps) {
  const [showDevMode, setShowDevMode] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Load dev mode preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(DEV_MODE_KEY);
      if (saved === "true") {
        setShowDevMode(true);
      }
    }
  }, []);

  // Save dev mode preference
  const toggleDevMode = () => {
    const newValue = !showDevMode;
    setShowDevMode(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEV_MODE_KEY, String(newValue));
    }
  };

  const handleCopyReport = async () => {
    const markdown = generateMarkdownReport(report);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy report:", err);
    }
  };

  const isDevMode = process.env.NODE_ENV !== "production" || showDevMode;

  return (
    <div className="mt-8 space-y-10">
      {/* Copy Report Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCopyReport}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          {copySuccess ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Report
            </>
          )}
        </button>
      </div>

      {/* A) Executive Summary */}
      <ExecutiveSummary report={report} />

      {/* B) Visual Evidence */}
      <VisualEvidence report={report} onRetry={onRetryCapture} />

      {/* C) Fix This First */}
      {report.fix_first && <FixThisFirst report={report} />}

      {/* D) Supporting Evidence */}
      <SupportingEvidence report={report} />

      {/* E) Confidence & Transparency */}
      <ConfidenceTransparency report={report} />

      {/* F) Dev-only Raw JSON */}
      {isDevMode && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Developer Mode</h2>
              <p className="text-xs text-white/60">
                Raw API response for debugging
              </p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDevMode}
                  onChange={toggleDevMode}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-white/70">Enable Developer Mode</span>
              </label>
              {showDevMode && (
                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="text-sm text-white/60 hover:text-white/80"
                >
                  {showRawJson ? "Hide" : "Show"} Raw API Response
                </button>
              )}
            </div>
          </div>
          {showDevMode && showRawJson && report.raw && (
            <pre className="text-xs text-white/70 overflow-x-auto max-h-96 overflow-y-auto bg-slate-900/50 p-4 rounded-lg">
              {JSON.stringify(report.raw, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

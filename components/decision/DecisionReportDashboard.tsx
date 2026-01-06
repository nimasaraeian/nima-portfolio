"use client";

import React, { useState, useEffect } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import ExecutiveSummary from "./ExecutiveSummary";
import VisualEvidence from "./VisualEvidence";
import FixThisFirst from "./FixThisFirst";
import SupportingEvidence from "./SupportingEvidence";
import ConfidenceTransparency from "./ConfidenceTransparency";
import InsufficientSignals from "./InsufficientSignals";
import AttentionPathCard from "../report/AttentionPathCard";
import DecisionDriversCard from "../report/DecisionDriversCard";
import FixThisFirstActions from "../report/FixThisFirstActions";
import { areActionsSimilar } from "@/lib/evidenceFilter";
import DecisionScoreCard from "../DecisionScoreCard";
import { extractDecisionFrictionScore } from "@/lib/decisionScore";
import DecisionEngineV2 from "./DecisionEngineV2";
import FullReportSection from "./FullReportSection";
import DecisionMachinePanel from "./DecisionMachinePanel";

type DecisionReportDashboardProps = {
  report: NormalizedDecisionReport;
  rawBackendResponse?: any;
  expertMode?: boolean;
  onRetryCapture?: () => void;
};

const DEV_MODE_KEY = "decision_intelligence_dev_mode";

/**
 * FixThisFirstGroup - Renders Highest and Secondary fixes with de-duplication
 */
function FixThisFirstGroup({ report }: { report: any }) {
  if (!report || !report.fix_factors || !Array.isArray(report.fix_factors) || report.fix_factors.length === 0) {
    return null;
  }
  
  try {
    // Find Highest leverage fix
    const highestFix = report.fix_factors.find((f: any) => f?.leverage === "highest") || report.fix_factors[0];
    
    if (!highestFix) {
      return null;
    }
    
    // Find Secondary leverage fix (must be different driver and action)
    const secondaryFix = report.fix_factors.find((f: any) => {
      if (!f || f.leverage !== "secondary") return false;
      if (f.cause_id === highestFix.cause_id) return false;
      
      const fTitle = typeof f.title === 'string' ? f.title : String(f.title || "");
      const highestTitle = typeof highestFix.title === 'string' ? highestFix.title : String(highestFix.title || "");
      
      return !areActionsSimilar(fTitle, highestTitle);
    });
    
    return (
      <div className="space-y-6">
        {/* Highest Leverage Fix */}
        <FixThisFirst report={report} fixFactor={highestFix} />
        
        {/* Secondary Leverage Fix - only if it adds new value */}
        {secondaryFix && (
          <FixThisFirst report={report} fixFactor={secondaryFix} />
        )}
      </div>
    );
  } catch (e) {
    console.error("Error rendering FixThisFirstGroup:", e);
    return null;
  }
}

function generateMarkdownReport(report: NormalizedDecisionReport, rawBackendResponse?: any): string {
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
  
  // Add summary if available
  if (rawBackendResponse?.summary) {
    lines.push("## Summary");
    lines.push("");
    if (typeof rawBackendResponse.summary === 'string') {
      lines.push(rawBackendResponse.summary);
    } else if (rawBackendResponse.summary.message) {
      lines.push(rawBackendResponse.summary.message);
    } else if (rawBackendResponse.summary.verdict) {
      lines.push(rawBackendResponse.summary.verdict);
    }
    lines.push("");
  }

  // Add human_report if available
  if (rawBackendResponse?.human_report && typeof rawBackendResponse.human_report === 'string') {
    lines.push("## Full Human Report");
    lines.push("");
    lines.push(rawBackendResponse.human_report);
    lines.push("");
  }
  
  // Add decision_machine narrative if available
  const decisionMachine = rawBackendResponse?.decision_machine;
  if (decisionMachine) {
    lines.push("## Decision Machine Analysis");
    lines.push("");
    
    if (decisionMachine.summary) {
      lines.push(`### Summary`);
      lines.push(decisionMachine.summary);
      lines.push("");
    }
    
    if (decisionMachine.human_verdict) {
      lines.push(`### Human Verdict`);
      lines.push(decisionMachine.human_verdict);
      lines.push("");
    }
    
    if (decisionMachine.why_matters_now) {
      lines.push(`### Why This Matters Now`);
      lines.push(decisionMachine.why_matters_now);
      lines.push("");
    }
    
    if (decisionMachine.quick_actions && Array.isArray(decisionMachine.quick_actions)) {
      lines.push(`### Quick Actions`);
      decisionMachine.quick_actions.forEach((action: any, idx: number) => {
        const actionText = typeof action === 'string' ? action : action.title || action.text || JSON.stringify(action);
        lines.push(`${idx + 1}. ${actionText}`);
      });
      lines.push("");
    }
    
    if (decisionMachine.lens_scores && typeof decisionMachine.lens_scores === 'object') {
      lines.push(`### Lens Scores`);
      Object.entries(decisionMachine.lens_scores).forEach(([key, value]) => {
        lines.push(`- **${key.replace(/_/g, ' ')}:** ${value}`);
      });
      lines.push("");
    }
    
    if (decisionMachine.evidence) {
      lines.push(`### Evidence`);
      if (decisionMachine.evidence.input_mode) {
        lines.push(`- **Input Mode:** ${decisionMachine.evidence.input_mode}`);
      }
      if (decisionMachine.evidence.confidence_signals) {
        lines.push(`- **Confidence Signals:** ${JSON.stringify(decisionMachine.evidence.confidence_signals, null, 2)}`);
      }
      if (decisionMachine.evidence.key_observations) {
        lines.push(`- **Key Observations:** ${JSON.stringify(decisionMachine.evidence.key_observations, null, 2)}`);
      }
      lines.push("");
    }
  }
  
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
  
  // Add issues if available
  if (rawBackendResponse?.issues && Array.isArray(rawBackendResponse.issues) && rawBackendResponse.issues.length > 0) {
    lines.push(`## Issues`);
    rawBackendResponse.issues.forEach((issue: any, idx: number) => {
      lines.push(`### ${idx + 1}. ${issue.title || issue.name || `Issue ${idx + 1}`}`);
      if (issue.description) lines.push(`- ${issue.description}`);
      if (issue.explanation) lines.push(`- **Explanation:** ${issue.explanation}`);
      if (issue.why) lines.push(`- **Why:** ${issue.why}`);
      if (issue.severity) lines.push(`- **Severity:** ${issue.severity}`);
      lines.push("");
    });
  }

  // Add quick_wins if available
  if (rawBackendResponse?.quick_wins && Array.isArray(rawBackendResponse.quick_wins) && rawBackendResponse.quick_wins.length > 0) {
    lines.push(`## Quick Wins`);
    rawBackendResponse.quick_wins.forEach((win: any, idx: number) => {
      lines.push(`### ${idx + 1}. ${win.title || win.name || `Quick Win ${idx + 1}`}`);
      if (win.description) lines.push(`- ${win.description}`);
      if (win.why) lines.push(`- **Why:** ${win.why}`);
      if (win.where) {
        const whereText = typeof win.where === 'string' ? win.where : win.where.section || JSON.stringify(win.where);
        lines.push(`- **Where:** ${whereText}`);
      }
      if (win.priority) lines.push(`- **Priority:** ${win.priority}`);
      lines.push("");
    });
  }

  // Add supporting_evidence from raw response if available
  if (rawBackendResponse?.supporting_evidence && Array.isArray(rawBackendResponse.supporting_evidence)) {
    lines.push(`## Additional Supporting Evidence`);
    rawBackendResponse.supporting_evidence.forEach((item: any, idx: number) => {
      lines.push(`### ${idx + 1}. ${item.title || `Evidence ${idx + 1}`}`);
      if (item.summary) lines.push(`- ${item.summary}`);
      if (item.why) lines.push(`- **Why:** ${item.why}`);
      if (item.where) lines.push(`- **Where:** ${item.where}`);
      lines.push("");
    });
  }
  
  lines.push(`## Confidence & Transparency`);
  lines.push(`**Confidence:** ${confidencePercent}% (${confidenceLabel})`);
  lines.push(`**Explanation:** ${confidenceExplanation}`);
  lines.push("");
  lines.push(`**Limitations:** This is directional intelligence to guide optimization efforts, not absolute truth. Always validate key findings with real user testing.`);
  
  return lines.join("\n");
}

export default function DecisionReportDashboard({ report, rawBackendResponse, expertMode = false, onRetryCapture }: DecisionReportDashboardProps) {
  const [showDevMode, setShowDevMode] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Advanced response fields (full human report + decision machine)
  const humanReportText = typeof rawBackendResponse?.human_report === "string"
    ? rawBackendResponse.human_report
    : typeof report.human_report === "string"
      ? report.human_report
      : typeof rawBackendResponse?.human_report?.text === "string"
        ? rawBackendResponse.human_report.text
        : null;
  const decisionMachine = rawBackendResponse?.decision_machine || report.decision_machine;
  const fixFirstRaw = rawBackendResponse?.fix_first || report.fix_first_raw;
  const supportingEvidenceRaw = rawBackendResponse?.supporting_evidence || report.supporting_evidence;
  const visualRaw = rawBackendResponse?.visual || report.visual;
  const hasAdvancedBlocks = Boolean(
    humanReportText ||
    (decisionMachine && Object.keys(decisionMachine).length > 0) ||
    (Array.isArray(supportingEvidenceRaw) && supportingEvidenceRaw.length > 0) ||
    fixFirstRaw ||
    visualRaw
  );

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
    const markdown = generateMarkdownReport(report, rawBackendResponse);
    try {
      // In expert/full mode prefer copying the full human report directly
      if (expertMode && humanReportText) {
        await navigator.clipboard.writeText(humanReportText);
      } else {
        await navigator.clipboard.writeText(markdown);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy report:", err);
    }
  };

  const isDevMode = process.env.NODE_ENV !== "production" || showDevMode;
  
  // Check if backend returned status=limited
  const isLimited = rawBackendResponse?.status === "limited";
  const missingRequired = rawBackendResponse?.missing_required || [];
  const limitedMessage = rawBackendResponse?.message || rawBackendResponse?.detail || null;

  // If status is limited, show Insufficient Signals card instead of normal report
  if (isLimited) {
    return (
      <div className="mt-8 space-y-10">
        {/* Insufficient Signals Card */}
        <InsufficientSignals 
          missingRequired={missingRequired}
          mode={report.mode === "unknown" ? undefined : (report.mode as "url" | "text" | "image" | undefined)}
          onTryAnother={onRetryCapture}
          message={limitedMessage}
        />

        {/* Visual Evidence - still show if available */}
        <VisualEvidence report={report} onRetry={onRetryCapture} />

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
            {showDevMode && showRawJson && (
              <pre className="text-xs text-white/70 overflow-x-auto max-h-96 overflow-y-auto bg-slate-900/50 p-4 rounded-lg">
                {rawBackendResponse ? JSON.stringify(rawBackendResponse, null, 2) : (report.raw ? JSON.stringify(report.raw, null, 2) : "No raw response available")}
              </pre>
            )}
          </div>
        )}
      </div>
    );
  }

  // Extract decision friction score from backend - NO computation, only extraction
  const reportWithRaw = {
    ...report,
    raw: rawBackendResponse || report.raw,
  };
  const scoreData = extractDecisionFrictionScore(reportWithRaw);

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

      {/* Advanced Human Decision Report (full verbatim data) */}
      {hasAdvancedBlocks && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Human Decision Report</h2>
              <p className="text-xs text-white/60">Full expert output (human narrative + decision machine)</p>
            </div>
          </div>

          {humanReportText && (
            <div className="space-y-3">
              <div className="text-xs text-white/60 uppercase tracking-wide">Human Report</div>
              <div className="space-y-3 text-sm text-white/80 leading-relaxed">
                {humanReportText
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((paragraph: string, idx: number) => (
                    <p key={idx} className="whitespace-pre-wrap">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {decisionMachine && Object.keys(decisionMachine).length > 0 && (
            <div className="space-y-3">
              <div className="text-xs text-white/60 uppercase tracking-wide">Decision Machine</div>
              <div className="space-y-3 text-sm text-white/80 leading-relaxed">
                {decisionMachine.summary && (
                  <div>
                    <div className="text-white font-semibold mb-1">Summary</div>
                    <p>{decisionMachine.summary}</p>
                  </div>
                )}
                {decisionMachine.human_verdict && (
                  <div>
                    <div className="text-white font-semibold mb-1">Human Verdict</div>
                    <p>{decisionMachine.human_verdict}</p>
                  </div>
                )}
                {decisionMachine.why_matters_now && (
                  <div>
                    <div className="text-white font-semibold mb-1">Why This Matters Now</div>
                    <p>{decisionMachine.why_matters_now}</p>
                  </div>
                )}
                {decisionMachine.quick_actions && Array.isArray(decisionMachine.quick_actions) && decisionMachine.quick_actions.length > 0 && (
                  <div>
                    <div className="text-white font-semibold mb-1">Quick Actions</div>
                    <ul className="space-y-2">
                      {decisionMachine.quick_actions.map((action: any, idx: number) => {
                        const actionText = typeof action === 'string'
                          ? action
                          : action.title || action.text || action.label || JSON.stringify(action);
                        return (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-white/40 mt-1">•</span>
                            <span className="text-sm text-white/80 flex-1">{actionText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {fixFirstRaw && (
            <div className="space-y-2">
              <div className="text-xs text-white/60 uppercase tracking-wide">Fix First</div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
                <div className="text-white font-semibold text-sm">{fixFirstRaw.title || "Fix this first"}</div>
                {fixFirstRaw.what && <div className="text-sm text-white/80">{fixFirstRaw.what}</div>}
                {fixFirstRaw.why && <div className="text-xs text-white/60">Why: {fixFirstRaw.why}</div>}
                <div className="text-xs text-white/50 flex gap-4">
                  {fixFirstRaw.where && <span>Where: {fixFirstRaw.where}</span>}
                  {fixFirstRaw.impact && <span>Impact: {fixFirstRaw.impact}</span>}
                  {fixFirstRaw.effort && <span>Effort: {fixFirstRaw.effort}</span>}
                </div>
              </div>
            </div>
          )}

          {Array.isArray(supportingEvidenceRaw) && supportingEvidenceRaw.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs text-white/60 uppercase tracking-wide">Supporting Evidence</div>
              <div className="space-y-3">
                {supportingEvidenceRaw.map((item: any, idx: number) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">{item.title || `Evidence ${idx + 1}`}</div>
                    {item.summary && <div className="text-sm text-white/80 mt-1">{item.summary}</div>}
                    <div className="text-xs text-white/50 flex gap-3 mt-1">
                      {item.why && <span>Why: {item.why}</span>}
                      {item.where && <span>Where: {item.where}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visualRaw && (
            <div className="space-y-2">
              <div className="text-xs text-white/60 uppercase tracking-wide">Visual Evidence</div>
              <div className="text-sm text-white/80">
                {visualRaw.capture_status && (
                  <div>
                    <span className="text-white/60">Capture Status: </span>
                    <span className={visualRaw.capture_status === "ok" ? "text-green-400" : "text-orange-300"}>
                      {visualRaw.capture_status}
                    </span>
                  </div>
                )}
                {visualRaw.mode && (
                  <div>
                    <span className="text-white/60">Mode: </span>
                    <span>{visualRaw.mode}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Decision Friction Score Card */}
      <DecisionScoreCard data={scoreData} />

      {/* A) Executive Summary */}
      <ExecutiveSummary report={report} rawBackendResponse={rawBackendResponse} />

      {/* A1) Attention Path - How users see this page */}
      <AttentionPathCard 
        attentionPath={report.attention_path} 
        fallbackFromPageMap={report.page_map}
      />

      {/* A2) Decision Drivers - Primary + Supporting */}
      <DecisionDriversCard report={report} pageMap={report.page_map} />

      {/* A3) Fix This First Actions - Up to 3 actions from evidence-based structure */}
      <FixThisFirstActions report={report} />

      {/* B) Visual Evidence */}
      <VisualEvidence report={report} onRetry={onRetryCapture} />

      {/* C) Fix This First - Detailed fixes with de-duplication */}
      {report.fix_factors && report.fix_factors.length > 0 ? (
        <FixThisFirstGroup report={report} />
      ) : report.fix_first ? (
        <FixThisFirst report={report} />
      ) : null}

      {/* D) Supporting Evidence */}
      <SupportingEvidence report={report} />

      {/* E) Confidence & Transparency */}
      <ConfidenceTransparency report={report} rawBackendResponse={rawBackendResponse} />

      {/* F) Decision Machine Panel - Show when decision_machine exists */}
      {rawBackendResponse?.decision_machine && (
        <DecisionMachinePanel decisionMachine={rawBackendResponse.decision_machine} />
      )}

      {/* F1) Decision Engine (v2) */}
      <DecisionEngineV2 rawBackendResponse={rawBackendResponse} />

      {/* F2) Full Report Section - Auto-expand if expert mode */}
      <FullReportSection rawBackendResponse={rawBackendResponse} defaultExpanded={expertMode} />

      {/* G) Dev-only Raw JSON */}
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
          {showDevMode && showRawJson && (
            <pre className="text-xs text-white/70 overflow-x-auto max-h-96 overflow-y-auto bg-slate-900/50 p-4 rounded-lg">
              {rawBackendResponse ? JSON.stringify(rawBackendResponse, null, 2) : (report.raw ? JSON.stringify(report.raw, null, 2) : "No raw response available")}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

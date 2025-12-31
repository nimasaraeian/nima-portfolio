"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import SignatureInsightCard from "@/components/report/SignatureInsightCard";
import CTARecommendationsCard from "@/components/report/CTARecommendationsCard";
import CostOfInactionCard from "@/components/report/CostOfInactionCard";
import MindsetPersonasCard from "@/components/report/MindsetPersonasCard";
import { ScreenshotOnlyATF } from "@/components/ScreenshotOnlyATF";
import DecisionProfileCard from "@/components/DecisionProfileCard";
import { DECISION_MODE_LABEL, BLOCKER_LABEL, BLOCKER_EXPLAIN, BLOCKER_MAP } from "@/lib/decisionCopy";

type DecisionReportViewProps = {
  result: any;
  inputMode: "url" | "image" | "text";
};

// Helper to convert relative URLs to absolute
const toAbsolute = (u: string | undefined): string => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return u.startsWith("/") ? u : `/${u}`;
};

// Format report text
function formatReport(text?: string): string {
  if (!text) return "";
  return text.trim();
}

// Report component with ReactMarkdown + GFM support
function Report({ text }: { text: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-sm prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-a:text-blue-400 prose-code:text-blue-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {text || ""}
      </ReactMarkdown>
    </div>
  );
}

export default function DecisionReportView({
  result,
  inputMode,
}: DecisionReportViewProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  // Debug logs
  console.debug("API response", result);
  console.debug("Artifacts", result?.capture?.artifacts);
  console.debug("Quick wins", result?.quick_wins);
  console.debug("Issues", result?.issues);

  if (!result) {
    return null;
  }

  // Defensive guard: check response status
  if (result.status && result.status !== "ok") {
    return (
      <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm font-medium text-red-400 mb-2">
          ⚠️ Error
        </p>
        <p className="text-xs text-red-300">
          {result.message || result.error || "An error occurred while processing your request."}
        </p>
      </div>
    );
  }

  // Extract v2 fields
  const decisionModel = result.decision_model;
  const verdict = result.verdict;
  const actions = Array.isArray(result.actions) ? result.actions : [];
  const checks = Array.isArray(result.checks) ? result.checks : [];
  
  // Legacy fields (fallback)
  const mode = result.mode || inputMode;
  const goal = result.goal;
  const issues = Array.isArray(result.issues) ? result.issues : [];
  const quickWins = Array.isArray(result.quick_wins) ? result.quick_wins : [];

  // Check if screenshots exist in new path
  const hasScreenshots = !!(
    result?.capture?.artifacts?.above_the_fold?.desktop ||
    result?.capture?.artifacts?.above_the_fold?.mobile
  );
  
  // Get Decision Mode (v2) - NEVER use as blocker, only for context
  const decisionMode = decisionModel?.decision_mode || result.summary?.decision_mode || null;
  
  // Get Confidence (v2) - check root level analysis_confidence first, then decisionModel
  const confidenceRaw = 
    typeof result.analysis_confidence === "number"
      ? result.analysis_confidence
      : typeof decisionModel?.confidence === "number"
        ? decisionModel.confidence
        : null;
  
  // Convert 0..1 to percent (or keep as-is if already > 1)
  const confidence = confidenceRaw !== null 
    ? (confidenceRaw <= 1 ? Math.round(confidenceRaw * 100) : Math.round(confidenceRaw))
    : null;

  // Determine Primary Blocker - NEVER use decision_mode
  const primaryBlocker =
    verdict?.primary_blocker ||
    issues?.[0]?.type ||
    actions?.[0]?.where?.section ||
    "unclear_value";

  // Get blocker info from BLOCKER_MAP or fallback
  const blockerInfo = BLOCKER_MAP[primaryBlocker] || {
    title: BLOCKER_LABEL[primaryBlocker] || primaryBlocker,
    explain: BLOCKER_EXPLAIN[primaryBlocker] || "Users hesitate due to this issue.",
  };

  // Helper to format Decision Profile for copy
  const formatDecisionProfileForCopy = (dm: any): string => {
    if (!dm) return "";
    
    const modeMap: Record<string, string> = {
      Ready_Heuristic: "Fast & Intuitive (Heuristic)",
      Ready_Analytical: "Slow & Analytical",
      Overwhelmed: "Overwhelmed / Cognitive Load",
      Skeptical: "Skeptical / Trust Barrier",
    };
    const modeLabel = modeMap[dm.decision_mode] || dm.decision_mode || "Unknown";
    
    // Format confidence: if <=1 assume 0..1, if >1 assume already percent
    let confidence = dm.confidence || 0;
    if (confidence <= 1) {
      confidence = Math.round(confidence * 100);
    } else {
      confidence = Math.round(confidence);
    }
    
    let text = "=== Decision Profile ===\n";
    text += `Decision Mode: ${modeLabel}\n`;
    text += `Confidence: ${confidence}%\n`;
    
    if (dm.signals && dm.signals.length > 0) {
      const displaySignals = dm.signals.slice(0, 6);
      text += `Primary Signals: ${displaySignals.join(", ")}\n`;
    }
    
    if (dm.lens_scores && Object.keys(dm.lens_scores).length > 0) {
      text += "Lens Scores:\n";
      const sortedEntries = Object.entries(dm.lens_scores)
        .sort(([, a], [, b]) => (b as number || 0) - (a as number || 0))
        .slice(0, 4);
      sortedEntries.forEach(([lens, score]) => {
        const clampedScore = Math.max(0, Math.min(1, score as number || 0));
        const scorePercent = Math.round(clampedScore * 100);
        text += `  ${lens}: ${scorePercent}%\n`;
      });
    }
    
    if (dm.human_explanation) {
      text += `\nHuman Explanation:\n${dm.human_explanation}\n`;
    }
    
    text += "\n";
    return text;
  };

  const handleCopyReport = async () => {
    let textToCopy = "";
    
    // Prepend Decision Profile if it exists
    if (result.decision_machine) {
      textToCopy += formatDecisionProfileForCopy(result.decision_machine);
    }
    
    // Add v2 "Why users hesitate" section
    textToCopy += "=== Why users hesitate ===\n\n";
    if (decisionMode) {
      textToCopy += `Decision style detected: ${DECISION_MODE_LABEL[decisionMode] || decisionMode}.\n`;
      if (decisionMode === "fast_intuitive") {
        textToCopy += "This means users need clarity within seconds.\n";
      }
      textToCopy += "\n";
    }
    textToCopy += "Users make decisions quickly and intuitively on this page.\n";
    textToCopy += "However, the page does not support fast decisions because:\n\n";
    textToCopy += `→ ${blockerInfo.title}\n`;
    textToCopy += `${blockerInfo.explain}\n\n`;
    
    // Add actions
    if (actions.length > 0) {
      textToCopy += "=== Actions ===\n";
      actions.slice(0, 3).forEach((action: any, index: number) => {
        textToCopy += `${index + 1}. ${action.action || action.description || ''}\n`;
        if (action.reason) textToCopy += `   Reason: ${action.reason}\n`;
      });
      textToCopy += "\n";
    }
    
    // Fallback to legacy report if no v2 data
    if (!verdict?.summary && result.human_report) {
      textToCopy += result.human_report;
    }
    
    await navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Inputs Analyzed */}
      <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
        <span className="font-medium">Inputs analyzed:</span> Mode: {typeof mode === "string" ? mode.toUpperCase() : inputMode.toUpperCase()}
        {goal && (
          <span className="ml-2">
            • Goal: {goal}
          </span>
        )}
      </div>

      {/* Decision Profile Card - After Inputs analyzed */}
      {result.decision_machine && (
        <DecisionProfileCard decision_machine={result.decision_machine} />
      )}

      {/* Decision Mode & Confidence (v2) - Context only, not blocker */}
      {decisionMode && confidence !== null && (
        <div className="rounded-2xl border border-blue-400/30 bg-blue-400/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-white/70">Decision Style:</span>
              <p className="text-lg font-semibold text-white mt-1">
                {DECISION_MODE_LABEL[decisionMode] || decisionMode.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </p>
            </div>
            <div>
              <span className="text-xs text-white/70">Confidence:</span>
              <p className="text-2xl font-bold text-white mt-1">
                {confidence}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Decision Flow Bars (v2) */}
      {decisionModel?.drivers && Array.isArray(decisionModel.drivers) && decisionModel.drivers.length > 0 && (
        <div className="space-y-4">
          {decisionModel.drivers.map((driver: any, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">{BLOCKER_LABEL[driver.id] || driver.id || `Driver ${index + 1}`}</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400/60 rounded-full"
                  style={{ width: `${(driver.score || 0) * 100}%` }}
                />
              </div>
            </div>
          ))}
          
          {/* Primary Friction */}
          {decisionModel.frictions && Array.isArray(decisionModel.frictions) && decisionModel.frictions.length > 0 && (
            <>
              <div className="flex justify-center py-2">
                <div className="text-2xl text-white/40">↓</div>
              </div>
              <div className="rounded-2xl border-2 border-blue-400/50 bg-blue-400/10 p-4 text-center">
                <p className="text-lg font-semibold">
                  {BLOCKER_LABEL[decisionModel.frictions[0].id] || decisionModel.frictions[0].id || decisionModel.frictions[0]}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Screenshots - Use new path: capture.artifacts.above_the_fold */}
      {hasScreenshots && (
        <ScreenshotOnlyATF data={result} />
      )}

      {/* Decision State Card */}
      {result.decision_state && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Decision State
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Label:</span>
              <span className="text-sm font-medium text-white">
                {result.decision_state.label || "—"}
              </span>
            </div>
            {result.decision_state.confidence !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Confidence:</span>
                <span className="text-sm font-medium text-white">
                  {typeof result.decision_state.confidence === "number"
                    ? `${(result.decision_state.confidence * 100).toFixed(1)}%`
                    : result.decision_state.confidence}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Evidence Bullets */}
      {result.evidence && Array.isArray(result.evidence) && result.evidence.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Evidence</h3>
          <ul className="space-y-2">
            {result.evidence.map((item: any, index: number) => (
              <li key={index} className="text-sm text-white/90 flex items-start">
                <span className="mr-2">•</span>
                <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Why users hesitate (v2) - Replaces human_report */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-2xl font-semibold text-white">Why users hesitate</h2>
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
            onClick={handleCopyReport}
          >
            {copySuccess ? "Copied!" : "Copy report"}
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Decision Mode Context */}
          {decisionMode && (
            <div className="mb-4 pb-4 border-b border-white/10">
              <p className="text-sm text-white/70">
                Decision style detected: <span className="font-medium text-white">{DECISION_MODE_LABEL[decisionMode] || decisionMode}</span>.
                {decisionMode === "fast_intuitive" && " This means users need clarity within seconds."}
              </p>
            </div>
          )}

          {/* Main explanation */}
          <div>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              Users make decisions quickly and intuitively on this page.
              However, the page does not support fast decisions because:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl text-white/60 mt-1">→</span>
                <div>
                  <p className="text-lg font-semibold text-white mb-1">
                    {blockerInfo.title}
                  </p>
                  <p className="text-base text-white/80">
                    {blockerInfo.explain}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Layers */}
      {result.decision_psychology_insight && (
        <div id="report-insight" className="mt-6">
          <SignatureInsightCard data={result.decision_psychology_insight} />
        </div>
      )}

      {result.cta_recommendations && (
        <div id="report-ctas" className="mt-6">
          <CTARecommendationsCard data={result.cta_recommendations} />
        </div>
      )}

      {result.cost_of_inaction && (
        <div id="report-cost" className="mt-6">
          <CostOfInactionCard data={result.cost_of_inaction} />
        </div>
      )}

      {result.mindset_personas && result.mindset_personas.length > 0 && (
        <div id="report-personas" className="mt-6">
          <MindsetPersonasCard data={result.mindset_personas} />
        </div>
      )}

      {/* Actions section (v2) */}
      {actions.length > 0 && (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
          <div className="space-y-4">
            {actions.slice(0, 3).map((action: any, index: number) => (
              <div
                key={action.id || index}
                className="border-l-4 border-green-500/50 pl-4 py-2"
              >
                <h4 className="text-sm font-medium text-white mb-1">
                  {action.action || action.description || `Action ${index + 1}`}
                </h4>
                {action.where && (action.where.section || action.where.selector) && (
                  <p className="text-xs text-white/60 mb-2">
                    <span className="font-medium">Where:</span>{" "}
                    {action.where.section || action.where.selector}
                  </p>
                )}
                {action.reason && (
                  <p className="text-sm text-white/80">
                    {action.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Wins List (legacy fallback) */}
      {actions.length === 0 && quickWins.length > 0 && (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Wins</h3>
          <div className="space-y-4">
            {quickWins.map((win: any, index: number) => (
              <div
                key={win.id || index}
                className="border-l-4 border-green-500/50 pl-4 py-2"
              >
                {win.action && (
                  <h4 className="text-sm font-medium text-white mb-1">
                    {win.action}
                  </h4>
                )}
                {win.where && (win.where.section || win.where.selector) && (
                  <p className="text-xs text-white/60 mb-2">
                    <span className="font-medium">Where:</span>{" "}
                    {win.where.section || win.where.selector}
                  </p>
                )}
                {win.reason && (
                  <p className="text-sm text-white/80">
                    {win.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checks section (v2) - Uncertainty */}
      {checks.length > 0 && (
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Uncertainty</h3>
          <div className="space-y-2">
            {checks.map((check: any, index: number) => (
              <p key={index} className="text-sm text-white/80">
                {typeof check === "string" ? check : JSON.stringify(check)}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Issues List (legacy fallback) */}
      {issues.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Issues</h3>
          <div className="space-y-4">
            {issues.map((issue: any, index: number) => (
              <div
                key={issue.id || index}
                className={`border-l-4 pl-4 py-2 ${
                  issue.severity === "error" || issue.severity === "high"
                    ? "border-red-500/50"
                    : issue.severity === "warning" || issue.severity === "medium"
                    ? "border-yellow-500/50"
                    : "border-yellow-500/30"
                }`}
              >
                {issue.problem && (
                  <h4 className="text-sm font-medium text-white mb-1">
                    {issue.problem}
                  </h4>
                )}
                {issue.severity && (
                  <p className="text-xs text-white/60 mb-2">
                    <span className="font-medium">Severity:</span> {issue.severity}
                  </p>
                )}
                {issue.why_it_hurts && (
                  <p className="text-sm text-white/80">
                    {issue.why_it_hurts}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}





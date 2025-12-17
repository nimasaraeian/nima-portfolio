"use client";

import React, { useState } from "react";
import { Copy, Download, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

type NormalizedDecision = {
  primaryBlocker: {
    name: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  };
  primaryBlockerName: string;
  primaryBlockerSeverity: string;
  primaryBlockerFix: string;
  primaryBlockerEvidence: string;
  hesitationExplanation: string;
  decisionProbability: number;
  modelConfidence: number;
  visualTrustConfidence: number;
  quickWins: Array<{
    action: string;
    effort: string;
    liftRange: string;
    exampleCopy?: string;
  }>;
  visualTrust: {
    label: string;
    confidence: number;
    narrative: string[];
  };
  notedElements: string[];
  keyLines: string[];
  missingTrustSignals: Array<{
    signal: string;
    suggestion: string;
  }>;
  primary_outcome?: string;
  executive_summary?: string;
  friction_scores?: Record<string, number>;
};

type DecisionReportProps = {
  normalized: NormalizedDecision;
  raw?: any;
};

// Map severity to human-readable labels
const severityLabels: Record<string, string> = {
  critical: "Critical severity",
  high: "High severity",
  medium: "Medium severity",
  low: "Low severity",
};

// Generate executive summary (6 lines)
const generateExecutiveSummary = (normalized: NormalizedDecision): string => {
  const lines = [
    `Decision Diagnosis Report: ${normalized.primaryBlockerName} (${severityLabels[normalized.primaryBlockerSeverity] || normalized.primaryBlockerSeverity})`,
    `Decision Probability: ${(normalized.decisionProbability * 100).toFixed(0)}% | Diagnosis Confidence: ${(normalized.modelConfidence * 100).toFixed(0)}%`,
    `Primary Blocker: ${normalized.primaryBlockerName}`,
    normalized.primaryBlockerEvidence 
      ? `Evidence: ${normalized.primaryBlockerEvidence}`
      : `Hesitation: ${normalized.hesitationExplanation}`,
    `Visual Trust: ${normalized.visualTrust.label} (${(normalized.visualTrust.confidence * 100).toFixed(0)}% confidence)`,
    `Top Action: ${normalized.quickWins[0]?.action || "Review recommendations"} - Expected ${normalized.quickWins[0]?.liftRange || "5-10%"} lift`,
  ];
  return lines.join("\n");
};

// Generate top 3 actions text
const generateTop3Actions = (normalized: NormalizedDecision): string => {
  return normalized.quickWins.slice(0, 3).map((win, i) => 
    `${i + 1}. ${win.action} (${win.effort}, ${win.liftRange} lift)${win.exampleCopy ? `\n   Example: ${win.exampleCopy}` : ""}`
  ).join("\n\n");
};

// Generate hesitation narrative from evidence and visual trust
const generateHesitationNarrative = (normalized: NormalizedDecision): string => {
  const parts: string[] = [];
  
  // Use primary blocker evidence if available
  if (normalized.primaryBlockerEvidence) {
    parts.push(normalized.primaryBlockerEvidence);
  }
  
  // Add visual trust narrative bullets
  if (normalized.visualTrust.narrative.length > 0) {
    const visualIssues = normalized.visualTrust.narrative
      .filter(n => n.toLowerCase().includes('lack') || n.toLowerCase().includes('missing') || n.toLowerCase().includes('no'))
      .slice(0, 2);
    if (visualIssues.length > 0) {
      parts.push(visualIssues.join(". "));
    }
  }
  
  // Add missing trust signals
  if (normalized.missingTrustSignals.length > 0) {
    const signals = normalized.missingTrustSignals.slice(0, 2).map(s => s.signal.toLowerCase());
    if (signals.length > 0) {
      parts.push(`The page also lacks ${signals.join(" and ")}, delaying commitment.`);
    }
  }
  
  // Fallback to hesitation explanation if no parts
  if (parts.length === 0) {
    return normalized.hesitationExplanation;
  }
  
  // Join parts into 2-4 sentences
  return parts.join(". ").replace(/\.\./g, ".") + ".";
};

export default function DecisionReport({ normalized, raw }: DecisionReportProps) {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);

  const handleCopySummary = async () => {
    const summary = generateExecutiveSummary(normalized);
    await navigator.clipboard.writeText(summary);
    setCopySuccess("Executive summary copied!");
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleCopyActions = async () => {
    const actions = generateTop3Actions(normalized);
    await navigator.clipboard.writeText(actions);
    setCopySuccess("Top 3 actions copied!");
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleDownloadJSON = () => {
    if (!raw) return;
    const dataStr = JSON.stringify(raw, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `decision-diagnosis-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const hesitationNarrative = generateHesitationNarrative(normalized);
  const severityLabel = severityLabels[normalized.primaryBlockerSeverity] || `${normalized.primaryBlockerSeverity} severity`;

  return (
    <div className="space-y-8">
      {/* SECTION A — Verdict */}
      <div className="border border-slate-800 rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Decision Diagnosis Report</h1>
          <p className="text-gray-400 text-sm">Generated {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-slate-700/40 rounded-lg p-6 border border-slate-600/30">
            <p className="text-lg text-white leading-relaxed">
              <span className="font-semibold">Verdict:</span> The primary decision blocker is{" "}
              <span className="font-bold text-white">{normalized.primaryBlockerName}</span> ({severityLabel}).
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Decision Probability</p>
              <p className="text-4xl font-bold text-white">
                {(normalized.decisionProbability * 100).toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Diagnosis Confidence</p>
              <p className="text-4xl font-bold text-white">
                {(normalized.modelConfidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B — Why users hesitate */}
      <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Why Users Hesitate</h2>
        <p className="text-gray-200 leading-relaxed text-base">
          {hesitationNarrative}
        </p>
      </div>

      {/* SECTION C — What to change first */}
      <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">What to Change First</h2>
        <p className="text-sm text-gray-400 mb-4">Top 3 actions to improve decision conversion</p>
        
        <div className="space-y-4">
          {normalized.quickWins.slice(0, 3).map((win, index) => (
            <div
              key={index}
              className={`rounded-lg border p-5 ${
                index === 0
                  ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-orange-600/5'
                  : 'border-slate-700 bg-slate-700/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {index === 0 && (
                      <span className="inline-flex items-center rounded-full bg-orange-500/20 border border-orange-500/30 px-2.5 py-1 text-xs font-semibold text-orange-300">
                        Priority #1
                      </span>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-white mb-2">{win.action}</h3>
                      {normalized.primaryBlockerEvidence && index === 0 && normalized.primaryBlockerEvidence.trim() && (
                        <p className="text-sm text-gray-300 mt-2">
                          <span className="font-medium text-white">Why:</span> {normalized.primaryBlockerEvidence}
                        </p>
                      )}
                      {normalized.primaryBlockerFix && index === 0 && normalized.primaryBlockerFix.trim() && (
                        <p className="text-sm text-gray-300 mt-2">
                          <span className="font-medium text-white">How:</span> {normalized.primaryBlockerFix}
                        </p>
                      )}
                    {win.exampleCopy && (
                      <div className="mt-3 p-3 bg-slate-600/30 rounded border border-slate-600/50">
                        <p className="text-xs text-gray-400 mb-1">Example Copy:</p>
                        <p className="text-sm text-gray-200 italic">{win.exampleCopy}</p>
                      </div>
                    )}
                    {/* Generate simple examples for common actions */}
                    {!win.exampleCopy && (
                      (() => {
                        const lowerAction = win.action.toLowerCase();
                        let example = "";
                        if (lowerAction.includes('pricing') || lowerAction.includes('price')) {
                          example = "Starting at $99/month. No credit card required.";
                        } else if (lowerAction.includes('cta') || lowerAction.includes('button') || lowerAction.includes('call to action')) {
                          example = "Start Your Free Trial Today";
                        } else if (lowerAction.includes('testimonial') || lowerAction.includes('review') || lowerAction.includes('social proof')) {
                          example = "\"This product saved us 10 hours per week.\" — Sarah M., Marketing Director";
                        }
                        return example ? (
                          <div className="mt-3 p-3 bg-slate-600/30 rounded border border-slate-600/50">
                            <p className="text-xs text-gray-400 mb-1">Example Copy:</p>
                            <p className="text-sm text-gray-200 italic">{example}</p>
                          </div>
                        ) : null;
                      })()
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1">Effort</div>
                  <div className="text-sm font-semibold text-white">{win.effort}</div>
                  <div className="text-xs text-gray-400 mt-3 mb-1">Expected Lift</div>
                  <div className="text-sm font-semibold text-green-400">{win.liftRange}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D — Evidence (collapsed by default) */}
      <details className="border border-slate-800 rounded-xl bg-slate-800/70 overflow-hidden">
        <summary
          className="p-6 cursor-pointer list-none flex items-center justify-between hover:bg-slate-700/30 transition"
          onClick={() => setEvidenceExpanded(!evidenceExpanded)}
        >
          <h2 className="text-xl font-semibold text-white">Evidence</h2>
          {evidenceExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </summary>
        
        <div className="px-6 pb-6 space-y-6 border-t border-slate-700 pt-6">
          {/* Visual Trust */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Visual Trust Assessment</h3>
            <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">{normalized.visualTrust.label}</p>
                <span className="text-xs text-gray-400">
                  {(normalized.visualTrust.confidence * 100).toFixed(0)}% confidence
                </span>
              </div>
              {normalized.visualTrust.narrative.length > 0 && (
                <ul className="space-y-1.5 mt-3">
                  {normalized.visualTrust.narrative.map((bullet, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Detected Visual Elements */}
          {normalized.notedElements.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Detected Visual Elements</h3>
              <div className="flex flex-wrap gap-2">
                {normalized.notedElements.map((element, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md border border-slate-600 bg-slate-700/50 px-2.5 py-1 text-xs text-gray-300"
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Extracted Key Lines */}
          {normalized.keyLines.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Extracted Key Lines</h3>
              <div className="space-y-2">
                {normalized.keyLines.map((line, i) => (
                  <div
                    key={i}
                    className="bg-slate-700/40 rounded p-3 border-l-2 border-blue-500/50"
                  >
                    <p className="text-xs text-gray-300 italic">"{line}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </details>

      {/* SECTION E — Export */}
      <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Export Report</h2>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition"
          >
            <Copy className="w-4 h-4" />
            Copy Executive Summary
          </button>
          <button
            onClick={handleCopyActions}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition"
          >
            <Copy className="w-4 h-4" />
            Copy Top 3 Actions
          </button>
          {raw && (
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition"
            >
              <Download className="w-4 h-4" />
              Download JSON
            </button>
          )}
        </div>
        
        {copySuccess && (
          <div className="mt-3 text-sm text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {copySuccess}
          </div>
        )}
      </div>
    </div>
  );
}


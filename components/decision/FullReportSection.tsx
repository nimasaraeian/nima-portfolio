"use client";

import React, { useState } from "react";

type FullReportSectionProps = {
  rawBackendResponse?: any;
  defaultExpanded?: boolean;
};

export default function FullReportSection({ rawBackendResponse, defaultExpanded = false }: FullReportSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!rawBackendResponse) {
    return null;
  }

  const humanReport = rawBackendResponse.human_report;
  const decisionMachine = rawBackendResponse.decision_machine || {};
  const supportingEvidence = rawBackendResponse.supporting_evidence;
  const visual = rawBackendResponse.visual;

  // Check if we have any verbose data to show
  const hasHumanReport = !!humanReport && typeof humanReport === 'string' && humanReport.length > 0;
  const hasDecisionMachine = !!decisionMachine && Object.keys(decisionMachine).length > 0;
  const hasSupportingEvidence = Array.isArray(supportingEvidence) && supportingEvidence.length > 0;
  const hasVisual = !!visual;

  if (!hasHumanReport && !hasDecisionMachine && !hasSupportingEvidence && !hasVisual) {
    return null;
  }

  const handleCopyFullReport = async () => {
    let fullText = "";

    // Add human_report
    if (hasHumanReport) {
      fullText += "=== FULL HUMAN REPORT ===\n\n";
      fullText += humanReport;
      fullText += "\n\n";
    }

    // Add decision_machine narrative
    if (hasDecisionMachine) {
      fullText += "=== DECISION MACHINE ANALYSIS ===\n\n";
      
      if (decisionMachine.summary) {
        fullText += `Summary: ${decisionMachine.summary}\n\n`;
      }
      
      if (decisionMachine.human_verdict) {
        fullText += `Verdict: ${decisionMachine.human_verdict}\n\n`;
      }
      
      if (decisionMachine.why_matters_now) {
        fullText += `Why This Matters Now: ${decisionMachine.why_matters_now}\n\n`;
      }
      
      if (decisionMachine.quick_actions && Array.isArray(decisionMachine.quick_actions)) {
        fullText += "Quick Actions:\n";
        decisionMachine.quick_actions.forEach((action: any, idx: number) => {
          const actionText = typeof action === 'string' ? action : action.title || action.text || JSON.stringify(action);
          fullText += `${idx + 1}. ${actionText}\n`;
        });
        fullText += "\n";
      }
      
      if (decisionMachine.lens_scores && typeof decisionMachine.lens_scores === 'object') {
        fullText += "Lens Scores:\n";
        Object.entries(decisionMachine.lens_scores).forEach(([key, value]) => {
          fullText += `  ${key}: ${value}\n`;
        });
        fullText += "\n";
      }
      
      if (decisionMachine.evidence) {
        fullText += "Evidence:\n";
        if (decisionMachine.evidence.input_mode) {
          fullText += `  Input Mode: ${decisionMachine.evidence.input_mode}\n`;
        }
        if (decisionMachine.evidence.confidence_signals) {
          fullText += `  Confidence Signals: ${JSON.stringify(decisionMachine.evidence.confidence_signals, null, 2)}\n`;
        }
        if (decisionMachine.evidence.key_observations) {
          fullText += `  Key Observations: ${JSON.stringify(decisionMachine.evidence.key_observations, null, 2)}\n`;
        }
        fullText += "\n";
      }
    }

    // Add supporting_evidence
    if (hasSupportingEvidence) {
      fullText += "=== SUPPORTING EVIDENCE ===\n\n";
      supportingEvidence.forEach((item: any, idx: number) => {
        fullText += `${idx + 1}. ${item.title || 'Evidence Item'}\n`;
        if (item.summary) fullText += `   ${item.summary}\n`;
        if (item.why) fullText += `   Why: ${item.why}\n`;
        if (item.where) fullText += `   Where: ${item.where}\n`;
        fullText += "\n";
      });
    }

    // Add visual info
    if (hasVisual) {
      fullText += "=== VISUAL INFORMATION ===\n\n";
      if (visual.mode) fullText += `Mode: ${visual.mode}\n`;
      if (visual.capture_status) fullText += `Capture Status: ${visual.capture_status}\n`;
      fullText += "\n";
    }

    try {
      await navigator.clipboard.writeText(fullText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy full report:", err);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Full Report</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyFullReport}
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
                Copy Full Report
              </>
            )}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            {isExpanded ? "Collapse" : "Expand"}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {!isExpanded && (
        <div className="space-y-3 text-sm text-white/70">
          {hasHumanReport && (
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Human Report ({humanReport.length} characters)</span>
            </div>
          )}
          {hasDecisionMachine && (
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Decision Machine Analysis</span>
            </div>
          )}
          {hasSupportingEvidence && (
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Supporting Evidence ({supportingEvidence.length} items)</span>
            </div>
          )}
          {hasVisual && (
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Visual Information</span>
            </div>
          )}
        </div>
      )}

      {isExpanded && (
        <div className="space-y-6">
          {/* Human Report */}
          {hasHumanReport && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Human Report</h3>
              <div className="prose prose-invert max-w-none">
                <div className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                  {humanReport}
                </div>
              </div>
            </div>
          )}

          {/* Decision Machine */}
          {hasDecisionMachine && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Decision Machine Analysis</h3>
              <div className="space-y-4">
                {decisionMachine.summary && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Summary</div>
                    <div className="text-sm text-white/80">{decisionMachine.summary}</div>
                  </div>
                )}
                
                {decisionMachine.human_verdict && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Human Verdict</div>
                    <div className="text-sm text-white/80">{decisionMachine.human_verdict}</div>
                  </div>
                )}
                
                {decisionMachine.why_matters_now && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Why This Matters Now</div>
                    <div className="text-sm text-white/80">{decisionMachine.why_matters_now}</div>
                  </div>
                )}
                
                {decisionMachine.quick_actions && Array.isArray(decisionMachine.quick_actions) && decisionMachine.quick_actions.length > 0 && (
                  <div>
                    <div className="text-xs text-white/70 mb-2">Quick Actions</div>
                    <ul className="space-y-2">
                      {decisionMachine.quick_actions.map((action: any, idx: number) => {
                        const actionText = typeof action === 'string' ? action : action.title || action.text || JSON.stringify(action);
                        return (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-white/40 mt-1.5">•</span>
                            <span className="text-sm text-white/80 flex-1">{actionText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                
                {decisionMachine.lens_scores && typeof decisionMachine.lens_scores === 'object' && Object.keys(decisionMachine.lens_scores).length > 0 && (
                  <div>
                    <div className="text-xs text-white/70 mb-2">Lens Scores</div>
                    <div className="space-y-2">
                      {Object.entries(decisionMachine.lens_scores).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-white/70 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="text-sm font-medium text-white">
                            {typeof value === 'number' ? (value <= 1 ? `${Math.round(value * 100)}%` : `${value}`) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {decisionMachine.evidence && (
                  <div>
                    <div className="text-xs text-white/70 mb-2">Evidence</div>
                    <div className="space-y-2 text-sm text-white/80">
                      {decisionMachine.evidence.input_mode && (
                        <div>
                          <span className="text-white/70">Input Mode: </span>
                          <span>{decisionMachine.evidence.input_mode}</span>
                        </div>
                      )}
                      {decisionMachine.evidence.confidence_signals && (
                        <div>
                          <span className="text-white/70">Confidence Signals: </span>
                          <pre className="mt-1 text-xs bg-slate-900/50 p-2 rounded overflow-x-auto">
                            {JSON.stringify(decisionMachine.evidence.confidence_signals, null, 2)}
                          </pre>
                        </div>
                      )}
                      {decisionMachine.evidence.key_observations && (
                        <div>
                          <span className="text-white/70">Key Observations: </span>
                          <pre className="mt-1 text-xs bg-slate-900/50 p-2 rounded overflow-x-auto">
                            {JSON.stringify(decisionMachine.evidence.key_observations, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Supporting Evidence */}
          {hasSupportingEvidence && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Supporting Evidence</h3>
              <div className="space-y-4">
                {supportingEvidence.map((item: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-white/20 pl-4">
                    <div className="text-sm font-medium text-white mb-1">
                      {item.title || `Evidence ${idx + 1}`}
                    </div>
                    {item.summary && (
                      <div className="text-sm text-white/80 mb-1">{item.summary}</div>
                    )}
                    {item.why && (
                      <div className="text-xs text-white/60">Why: {item.why}</div>
                    )}
                    {item.where && (
                      <div className="text-xs text-white/60">Where: {item.where}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visual Information */}
          {hasVisual && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Visual Information</h3>
              <div className="space-y-2 text-sm text-white/80">
                {visual.mode && (
                  <div>
                    <span className="text-white/70">Mode: </span>
                    <span>{visual.mode}</span>
                  </div>
                )}
                {visual.capture_status && (
                  <div>
                    <span className="text-white/70">Capture Status: </span>
                    <span className={visual.capture_status === "ok" ? "text-green-400" : "text-orange-400"}>
                      {visual.capture_status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


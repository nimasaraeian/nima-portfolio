"use client";

import React, { useState } from "react";

type DecisionMachinePanelProps = {
  decisionMachine?: any;
};

export default function DecisionMachinePanel({ decisionMachine }: DecisionMachinePanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    evidence: false,
    lensScores: false,
  });

  if (!decisionMachine || Object.keys(decisionMachine).length === 0) {
    return null;
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Decision Machine Analysis</h2>
      
      <div className="space-y-6">
        {/* Summary */}
        {decisionMachine.summary && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
            <p className="text-sm text-white/80 leading-relaxed">{decisionMachine.summary}</p>
          </div>
        )}

        {/* Human Verdict */}
        {decisionMachine.human_verdict && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Human Verdict</h3>
            <p className="text-sm text-white/80 leading-relaxed">{decisionMachine.human_verdict}</p>
          </div>
        )}

        {/* Why Matters Now */}
        {decisionMachine.why_matters_now && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Why This Matters Now</h3>
            <p className="text-sm text-white/80 leading-relaxed">{decisionMachine.why_matters_now}</p>
          </div>
        )}

        {/* Quick Actions */}
        {decisionMachine.quick_actions && Array.isArray(decisionMachine.quick_actions) && decisionMachine.quick_actions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
            <ul className="space-y-2">
              {decisionMachine.quick_actions.map((action: any, idx: number) => {
                const actionText = typeof action === 'string' 
                  ? action 
                  : action.title || action.text || action.label || JSON.stringify(action);
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

        {/* Evidence Accordion */}
        {decisionMachine.evidence && (
          <div className="rounded-lg border border-white/10 bg-white/5">
            <button
              onClick={() => toggleSection('evidence')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition"
            >
              <h3 className="text-lg font-semibold text-white">Evidence</h3>
              <svg
                className={`w-5 h-5 text-white/60 transition-transform ${expandedSections.evidence ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.evidence && (
              <div className="p-4 pt-0 space-y-3">
                {decisionMachine.evidence.input_mode && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Input Mode</div>
                    <div className="text-sm text-white/80">{decisionMachine.evidence.input_mode}</div>
                  </div>
                )}
                {decisionMachine.evidence.confidence_signals && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Confidence Signals</div>
                    <pre className="text-xs bg-slate-900/50 p-3 rounded overflow-x-auto text-white/80">
                      {JSON.stringify(decisionMachine.evidence.confidence_signals, null, 2)}
                    </pre>
                  </div>
                )}
                {decisionMachine.evidence.key_observations && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Key Observations</div>
                    <pre className="text-xs bg-slate-900/50 p-3 rounded overflow-x-auto text-white/80">
                      {JSON.stringify(decisionMachine.evidence.key_observations, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Lens Scores Accordion */}
        {decisionMachine.lens_scores && typeof decisionMachine.lens_scores === 'object' && Object.keys(decisionMachine.lens_scores).length > 0 && (
          <div className="rounded-lg border border-white/10 bg-white/5">
            <button
              onClick={() => toggleSection('lensScores')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition"
            >
              <h3 className="text-lg font-semibold text-white">Lens Scores</h3>
              <svg
                className={`w-5 h-5 text-white/60 transition-transform ${expandedSections.lensScores ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.lensScores && (
              <div className="p-4 pt-0 space-y-3">
                {Object.entries(decisionMachine.lens_scores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-white/70 capitalize">{key.replace(/_/g, ' ')}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 transition-all"
                          style={{
                            width: `${typeof value === 'number' ? (value <= 1 ? value * 100 : Math.min(100, value)) : 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-white w-12 text-right">
                        {typeof value === 'number' 
                          ? (value <= 1 ? `${Math.round(value * 100)}%` : `${value}`)
                          : String(value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}








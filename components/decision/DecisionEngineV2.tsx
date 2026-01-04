"use client";

import React from "react";

type DecisionEngineV2Props = {
  rawBackendResponse?: any;
};

export default function DecisionEngineV2({ rawBackendResponse }: DecisionEngineV2Props) {
  if (!rawBackendResponse) {
    return null;
  }

  const decisionContext = rawBackendResponse.decision_context;
  const decisionDiagnostics = rawBackendResponse.decision_diagnostics;
  const rawSignals = rawBackendResponse.raw_signals;

  // Only show if at least one of the new fields exists
  if (!decisionContext && !decisionDiagnostics && !rawSignals) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-white">Decision Engine (v2)</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
          Engine: v2
        </span>
      </div>

      <div className="space-y-6">
        {/* Decision Context */}
        {decisionContext && (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Decision Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decisionContext.brand_type && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Brand Type</div>
                  <div className="text-base font-medium text-white">
                    {String(decisionContext.brand_type)}
                  </div>
                </div>
              )}
              {decisionContext.baseline_trust !== undefined && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Baseline Trust</div>
                  <div className="text-base font-medium text-white">
                    {typeof decisionContext.baseline_trust === "number"
                      ? decisionContext.baseline_trust.toFixed(2)
                      : String(decisionContext.baseline_trust)}
                  </div>
                </div>
              )}
              {decisionContext.decision_style && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Decision Style</div>
                  <div className="text-base font-medium text-white">
                    {String(decisionContext.decision_style)}
                  </div>
                </div>
              )}
              {decisionContext.risk_level && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Risk Level</div>
                  <div className="text-base font-medium text-white">
                    {String(decisionContext.risk_level)}
                  </div>
                </div>
              )}
              {decisionContext.intent && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Intent</div>
                  <div className="text-base font-medium text-white">
                    {String(decisionContext.intent)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Decision Diagnostics */}
        {decisionDiagnostics && (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Decision Diagnostics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {decisionDiagnostics.hesitation_detected !== undefined && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Hesitation Detected</div>
                    <div className={`text-base font-medium ${
                      decisionDiagnostics.hesitation_detected ? "text-orange-400" : "text-green-400"
                    }`}>
                      {decisionDiagnostics.hesitation_detected ? "Yes" : "No"}
                    </div>
                  </div>
                )}
                {decisionDiagnostics.hesitation_type && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Hesitation Type</div>
                    <div className="text-base font-medium text-white">
                      {String(decisionDiagnostics.hesitation_type)}
                    </div>
                  </div>
                )}
                {decisionDiagnostics.is_friction !== undefined && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Is Friction</div>
                    <div className={`text-base font-medium ${
                      decisionDiagnostics.is_friction ? "text-red-400" : "text-green-400"
                    }`}>
                      {decisionDiagnostics.is_friction ? "Yes" : "No"}
                    </div>
                  </div>
                )}
                {decisionDiagnostics.primary_blocker && (
                  <div>
                    <div className="text-xs text-white/70 mb-1">Primary Blocker</div>
                    <div className="text-base font-medium text-white">
                      {String(decisionDiagnostics.primary_blocker)}
                    </div>
                  </div>
                )}
              </div>

              {/* Friction Score */}
              {decisionDiagnostics.friction_score !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/70">Friction Score</div>
                    <div className="text-sm font-semibold text-white">
                      {typeof decisionDiagnostics.friction_score === "number"
                        ? decisionDiagnostics.friction_score.toFixed(1)
                        : String(decisionDiagnostics.friction_score)} / 10
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all"
                      style={{
                        width: `${
                          typeof decisionDiagnostics.friction_score === "number"
                            ? Math.min(100, (decisionDiagnostics.friction_score / 10) * 100)
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Confidence */}
              {decisionDiagnostics.confidence !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/70">Confidence</div>
                    <div className="text-sm font-semibold text-white">
                      {typeof decisionDiagnostics.confidence === "number"
                        ? (decisionDiagnostics.confidence <= 1
                            ? (decisionDiagnostics.confidence * 100).toFixed(1)
                            : decisionDiagnostics.confidence.toFixed(1))
                        : String(decisionDiagnostics.confidence)}
                      {typeof decisionDiagnostics.confidence === "number" &&
                        decisionDiagnostics.confidence <= 1 && (
                          <span className="ml-1 text-xs">%</span>
                        )}
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all"
                      style={{
                        width: `${
                          typeof decisionDiagnostics.confidence === "number"
                            ? decisionDiagnostics.confidence <= 1
                              ? decisionDiagnostics.confidence * 100
                              : decisionDiagnostics.confidence
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Confidence Label */}
              {decisionDiagnostics.confidence_label && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Confidence Label</div>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${
                      decisionDiagnostics.confidence_label.toLowerCase() === "high"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : decisionDiagnostics.confidence_label.toLowerCase() === "medium"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                    }`}
                  >
                    {String(decisionDiagnostics.confidence_label)}
                  </div>
                </div>
              )}

              {/* Uplift Range */}
              {decisionDiagnostics.uplift_range && (
                <div>
                  <div className="text-xs text-white/70 mb-1">Expected Uplift Range</div>
                  <div className="text-base font-medium text-white">
                    {decisionDiagnostics.uplift_range.min !== undefined &&
                    decisionDiagnostics.uplift_range.max !== undefined
                      ? `+${decisionDiagnostics.uplift_range.min}% to +${decisionDiagnostics.uplift_range.max}%`
                      : String(decisionDiagnostics.uplift_range)}
                  </div>
                </div>
              )}

              {/* Factors */}
              {decisionDiagnostics.factors &&
                Array.isArray(decisionDiagnostics.factors) &&
                decisionDiagnostics.factors.length > 0 && (
                  <div>
                    <div className="text-xs text-white/70 mb-3">Factors</div>
                    <div className="space-y-2">
                      {decisionDiagnostics.factors.map((factor: any, index: number) => {
                        const factorName =
                          factor.name || factor.factor || factor.label || `Factor ${index + 1}`;
                        const factorScore =
                          typeof factor.score === "number"
                            ? factor.score
                            : typeof factor.weight === "number"
                            ? factor.weight
                            : 0;
                        // Normalize score to 0-1 if it appears to be 0-100
                        const normalizedScore = factorScore > 1 ? factorScore / 100 : factorScore;

                        return (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm text-white/90">{factorName}</div>
                              <div className="text-xs text-white/60">
                                {(normalizedScore * 100).toFixed(0)}%
                              </div>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 transition-all"
                                style={{ width: `${normalizedScore * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Raw Signals */}
        {rawSignals && (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Raw Signals</h3>
            <div className="space-y-4">
              {rawSignals.trust_signals !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/70">Trust Signals</div>
                    <div className="text-sm font-semibold text-white">
                      {typeof rawSignals.trust_signals === "number"
                        ? rawSignals.trust_signals.toFixed(2)
                        : String(rawSignals.trust_signals)}
                    </div>
                  </div>
                  {typeof rawSignals.trust_signals === "number" && (
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{
                          width: `${
                            rawSignals.trust_signals <= 1
                              ? rawSignals.trust_signals * 100
                              : Math.min(100, rawSignals.trust_signals)
                          }%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              )}

              {rawSignals.cta_clarity !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/70">CTA Clarity</div>
                    <div className="text-sm font-semibold text-white">
                      {typeof rawSignals.cta_clarity === "number"
                        ? rawSignals.cta_clarity.toFixed(2)
                        : String(rawSignals.cta_clarity)}
                    </div>
                  </div>
                  {typeof rawSignals.cta_clarity === "number" && (
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{
                          width: `${
                            rawSignals.cta_clarity <= 1
                              ? rawSignals.cta_clarity * 100
                              : Math.min(100, rawSignals.cta_clarity)
                          }%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              )}

              {rawSignals.value_clarity !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/70">Value Clarity</div>
                    <div className="text-sm font-semibold text-white">
                      {typeof rawSignals.value_clarity === "number"
                        ? rawSignals.value_clarity.toFixed(2)
                        : String(rawSignals.value_clarity)}
                    </div>
                  </div>
                  {typeof rawSignals.value_clarity === "number" && (
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all"
                        style={{
                          width: `${
                            rawSignals.value_clarity <= 1
                              ? rawSignals.value_clarity * 100
                              : Math.min(100, rawSignals.value_clarity)
                          }%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              )}

              {rawSignals.visual_noise !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/70">Visual Noise</div>
                    <div className="text-sm font-semibold text-white">
                      {typeof rawSignals.visual_noise === "number"
                        ? rawSignals.visual_noise.toFixed(2)
                        : String(rawSignals.visual_noise)}
                    </div>
                  </div>
                  {typeof rawSignals.visual_noise === "number" && (
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 transition-all"
                        style={{
                          width: `${
                            rawSignals.visual_noise <= 1
                              ? rawSignals.visual_noise * 100
                              : Math.min(100, rawSignals.visual_noise)
                          }%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


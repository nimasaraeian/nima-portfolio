'use client';

import { useState } from 'react';
import { postToBrain } from '@/lib/apiClient';
import { Brain, AlertTriangle, Sparkles, Rocket, Copy, Image as ImageIcon } from 'lucide-react';
import type { PsychologyAnalysisResult, CognitiveFrictionResult } from '@/app/ai-marketing/brain-types';
import { CognitiveSummaryView } from '@/components/analysis/CognitiveSummaryView';
import { CognitiveFullView } from '@/components/analysis/CognitiveFullView';
import { CognitiveAdvancedView } from '@/components/analysis/CognitiveAdvancedView';

type RewriteOutput = {
  soft_version: string;
  value_version: string;
  proof_version: string;
  emotional_version: string;
  direct_version: string;
  cta: string;
};

type VisualTrustResult = {
  trust_label: "low" | "medium" | "high";
  trust_scores: {
    low: number;
    medium: number;
    high: number;
  };
} | null;

interface ReportPanelProps {
  result: CognitiveFrictionResult | null;
  loading: boolean;
  error: string | null;
  formData: {
    raw_text: string;
    platform: string;
    goal: string[];
    audience: string;
    language: string;
  };
  visualTrust?: VisualTrustResult | null;
  isImageLoading?: boolean;
  imageError?: string | null;
  brainResponse?: string | null;
  psychologyAnalysis?: PsychologyAnalysisResult | null;
}

function RewriteVariant({ label, body }: { label: string; body: string }) {
  return (
    <div className="group rounded-lg sm:rounded-xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-5 hover:border-purple-500/30 transition-all shadow-lg">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {label}
        </span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(body);
            } catch (err) {
              console.error('Failed to copy:', err);
            }
          }}
          className="text-[10px] sm:text-xs text-slate-500 hover:text-purple-400 transition-colors flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-800/50"
        >
          <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Copy</span>
        </button>
      </div>
      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{body}</p>
    </div>
  );
}

// AI Interpretation generator
function buildAiInterpretation(result: CognitiveFrictionResult): string {
  const narrative = result.psychology_narrative;
  if (typeof narrative === 'string' && narrative.trim().length > 0) {
    return narrative;
  }
  if (narrative && typeof narrative === 'object') {
    if (narrative.ai_interpretation) {
      return narrative.ai_interpretation;
    }
    if (narrative.analysis_summary) {
      return narrative.analysis_summary;
    }
  }

  const parts: string[] = [];

  const frictionScore = typeof result.frictionScore === 'number' ? result.frictionScore : result.decision_friction_score ?? 0;
  const trustScore = typeof result.trustScore === 'number' ? result.trustScore : (result['trust_score'] as number | undefined) ?? 0;
  const motivationScore =
    typeof result.motivationMatchScore === 'number'
      ? result.motivationMatchScore
      : ((result['motivation_match_score'] as number | undefined) ?? 0);
  const decisionProbability =
    typeof result.decisionProbability === 'number'
      ? result.decisionProbability
      : ((result['decision_probability'] as number | undefined) ?? 0);
  const emotionalScore =
    typeof result.emotionalClarityScore === 'number'
      ? result.emotionalClarityScore
      : ((result['emotional_clarity_score'] as number | undefined) ?? 0);

  // Friction and Trust analysis
  if (frictionScore >= 60 && trustScore <= 40) {
    parts.push('Your content currently creates high decision friction and relatively low trust. Users are likely to hesitate and postpone action rather than convert.');
  } else if (frictionScore >= 60) {
    parts.push('The content creates significant cognitive friction that may cause users to abandon the decision process, despite some trust signals.');
  } else if (trustScore <= 40) {
    parts.push('Trust levels are low, which creates hesitation even if the content is relatively clear.');
  }

  // Motivation analysis
  if (motivationScore < 50 && motivationScore > 0) {
    parts.push('The message does not strongly connect with the audience\'s core motivations, which reduces the emotional drive to take action.');
  } else if (motivationScore >= 70) {
    parts.push('The content aligns well with audience motivations, creating a strong emotional connection.');
  }

  // Decision probability analysis
  if (decisionProbability > 0 && decisionProbability < 0.4) {
    parts.push('Overall, the current likelihood of conversion is low. The piece needs clearer value proposition, proof, and emotional resonance.');
  } else if (decisionProbability >= 0.6) {
    parts.push('The content shows strong conversion potential with good decision-making signals.');
  }

  // Emotional clarity
  if (emotionalScore < 50 && emotionalScore > 0) {
    parts.push('Emotional messaging could be clearer to better guide users toward confident decisions.');
  }

  // Default if no specific patterns
  if (parts.length === 0) {
    parts.push('The content shows a balanced psychological profile with moderate conversion potential.');
  }

  return parts.join(' ');
}

const buildLinePath = (values: number[], width = 260, height = 130) => {
  if (!values.length) return '';
  const safeValues = values.map((v) => (isNaN(v) ? 0 : Math.max(0, Math.min(100, v))));
  if (safeValues.length === 1) {
    const y = height - (safeValues[0] / 100) * height;
    return `M0,${y}`;
  }

  return safeValues
    .map((value, index) => {
      const x = (index / (safeValues.length - 1)) * width;
      const y = height - (value / 100) * height;
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
};

export default function ReportPanel({
  result,
  loading,
  error,
  formData,
  visualTrust,
  isImageLoading,
  imageError,
  brainResponse,
  psychologyAnalysis,
}: ReportPanelProps) {
  const [rewriteResult, setRewriteResult] = useState<RewriteOutput | null>(null);
  const [rewriteLoading, setRewriteLoading] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"summary" | "full" | "advanced">("summary");

  const runRewrite = async () => {
    setRewriteError(null);
    setRewriteLoading(true);

    try {
      if (!formData.raw_text.trim()) {
        throw new Error('Please enter content before rewriting.');
      }

      const payload = {
        text: formData.raw_text.trim(),
        platform: formData.platform,
        goal: formData.goal.length ? formData.goal : ['leads'],
        audience: formData.audience,
        language: formData.language,
      };

      const data = await postToBrain<RewriteOutput>('/api/brain/rewrite', payload);
      setRewriteResult(data);
    } catch (err: any) {
      setRewriteError(err.message || 'Failed to generate rewrite');
    } finally {
      setRewriteLoading(false);
    }
  };

  // Empty State
  if (!result && !loading && !error) {
    return (
      <div className="relative rounded-2xl sm:rounded-3xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-purple-900/10 to-slate-900/90 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="text-center max-w-md relative z-10 px-4">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Brain className="w-16 h-16 sm:w-20 sm:h-20 text-purple-500/30" />
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            No analysis yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Paste your content and run the <span className="text-purple-400 font-semibold">Cognitive Friction Analysis</span> to see a full decision psychology report.
          </p>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="relative rounded-2xl sm:rounded-3xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
        
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <div className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Analyzing...</h3>
              <p className="text-xs sm:text-sm text-slate-400">Analyzing emotional friction, trust barriers, and decision flow…</p>
            </div>
          </div>

          {/* Skeleton Loaders */}
          <div className="space-y-4 sm:space-y-6">
            <div className="h-24 sm:h-32 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-xl sm:rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-xl sm:rounded-2xl animate-pulse"></div>
              <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-xl sm:rounded-2xl animate-pulse"></div>
            </div>
            <div className="h-36 sm:h-48 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-xl sm:rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border-2 border-red-500/30 bg-gradient-to-br from-red-900/20 to-slate-900/50 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-red-300">Analysis Error</h3>
          <p className="text-xs sm:text-sm text-red-200 mb-6 sm:mb-8 px-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500/30 text-red-300 font-semibold text-sm hover:bg-red-500/30 transition-all transform hover:scale-105"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }


  // Success State
  if (result) {
    const modeButtonClass = (mode: "summary" | "full" | "advanced") =>
      `rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
        viewMode === mode ? 'bg-white/15 text-white border-white/40' : 'text-slate-400 border-white/15 hover:text-white'
      }`;

    return (
      <div className="space-y-10">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={modeButtonClass("summary")}
              onClick={() => setViewMode("summary")}
            >
              Summary
            </button>
            <button
              type="button"
              className={modeButtonClass("full")}
              onClick={() => setViewMode("full")}
            >
              Full Analysis
            </button>
            <button
              type="button"
              className={modeButtonClass("advanced")}
              onClick={() => setViewMode("advanced")}
            >
              Advanced Psychological View
            </button>
          </div>

          {viewMode === "summary" && (
            <CognitiveSummaryView result={result} onViewFull={() => setViewMode("full")} />
          )}
          {viewMode === "full" && (
            <CognitiveFullView result={result} onViewAdvanced={() => setViewMode("advanced")} />
          )}
          {viewMode === "advanced" && (
            <CognitiveAdvancedView
              result={result}
              psychologyAnalysis={psychologyAnalysis}
              brainResponse={brainResponse}
            />
          )}
        </div>

        {(visualTrust || isImageLoading || imageError) && (
          <div className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              Visual Trust Analysis
            </h3>

            {imageError ? (
              <div className="flex items-center gap-3 text-sm text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Visual analysis error: {imageError}</span>
              </div>
            ) : isImageLoading ? (
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                <span>Analyzing visual trust...</span>
              </div>
            ) : visualTrust ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="rounded-xl border-2 border-cyan-500/20 bg-cyan-900/10 p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm sm:text-base font-semibold text-cyan-300">Visual Trust:</span>
                    <span
                      className={`text-sm sm:text-base font-bold px-3 py-1 rounded-full ${
                        visualTrust.trust_label === 'high'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : visualTrust.trust_label === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {visualTrust.trust_label.charAt(0).toUpperCase() + visualTrust.trust_label.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300">Low:</span>
                    <span className="text-slate-400 font-semibold">
                      {Math.round(visualTrust.trust_scores.low * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-1000"
                      style={{ width: `${Math.round(visualTrust.trust_scores.low * 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300">Medium:</span>
                    <span className="text-slate-400 font-semibold">
                      {Math.round(visualTrust.trust_scores.medium * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-1000"
                      style={{ width: `${Math.round(visualTrust.trust_scores.medium * 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300">High:</span>
                    <span className="text-slate-400 font-semibold">
                      {Math.round(visualTrust.trust_scores.high * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                      style={{ width: `${Math.round(visualTrust.trust_scores.high * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 lg:p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                AI Copy Rewrite Suggestions
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Get multiple psychologically-optimized versions of your content.
              </p>
            </div>
            <button
              type="button"
              onClick={runRewrite}
              disabled={rewriteLoading || !formData.raw_text.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/30"
            >
              {rewriteLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Generate Better Copy
                </>
              )}
            </button>
          </div>

          {rewriteError && (
            <div className="mb-6 rounded-xl border-2 border-red-500/30 bg-red-900/10 px-5 py-4 text-sm text-red-200">
              {rewriteError}
            </div>
          )}

          {!rewriteResult && !rewriteLoading && !rewriteError && (
            <p className="text-xs sm:text-sm text-slate-400 text-center py-8 sm:py-12 px-4">
              Click <span className="font-bold text-purple-400">Generate Better Copy</span> to see suggested rewrites.
            </p>
          )}

          {rewriteResult && (
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <RewriteVariant label="Soft / Trust-Based" body={rewriteResult.soft_version} />
              <RewriteVariant label="Value-Driven" body={rewriteResult.value_version} />
              <RewriteVariant label="Proof-Focused" body={rewriteResult.proof_version} />
              <RewriteVariant label="Emotional" body={rewriteResult.emotional_version} />
              <RewriteVariant label="Direct Response" body={rewriteResult.direct_version} />

              <div className="pt-4 sm:pt-5 border-t border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Suggested CTA
                  </span>
                </div>
                <p className="text-sm sm:text-base text-white font-semibold">{rewriteResult.cta}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

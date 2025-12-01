'use client';

import { useState } from 'react';
import { postToBrain } from '@/lib/apiClient';
import { Brain, AlertTriangle, Sparkles, Rocket, Copy, TrendingUp, Zap, Shield, Target, Image as ImageIcon } from 'lucide-react';

interface CognitiveFrictionResult {
  frictionScore: number;
  trustScore: number;
  emotionalClarityScore: number;
  motivationMatchScore: number;
  decisionProbability: number;
  conversionLiftEstimate: number;
  keyDecisionBlockers: string[];
  emotionalResistanceFactors: string[];
  cognitiveOverloadFactors: string[];
  trustBreakpoints: string[];
  motivationMisalignments: string[];
  recommendedQuickWins: string[];
  recommendedDeepChanges: string[];
  explanationSummary: string;
}

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
  visualTrust: VisualTrustResult;
  isImageLoading: boolean;
}

function ScoreCard({ label, value, insights, icon: Icon }: { 
  label: string; 
  value: number; 
  insights?: string[];
  icon?: any;
}) {
  const getColorClass = (score: number) => {
    if (score <= 30) return 'from-green-500 to-emerald-500';
    if (score <= 60) return 'from-yellow-500 to-amber-500';
    return 'from-red-500 to-rose-500';
  };

  const getStatus = (score: number) => {
    if (score <= 30) return { text: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    if (score <= 60) return { text: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    return { text: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
  };

  const status = getStatus(value);

  return (
    <div className="group relative rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 backdrop-blur-xl hover:border-purple-500/30 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />}
            <span className="text-xs sm:text-sm font-bold text-slate-300">{label}</span>
          </div>
          <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${status.color} ${status.bg} ${status.border} border`}>
            {status.text}
          </span>
        </div>
        <div className="mb-3 sm:mb-4">
          <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
            <span className="text-3xl sm:text-4xl font-bold text-white">{value}</span>
            <span className="text-sm sm:text-lg text-slate-400">/ 100</span>
          </div>
          <div className="w-full h-2 sm:h-3 bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getColorClass(value)} transition-all duration-1000 shadow-lg`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
        {insights && insights.length > 0 && (
          <div className="space-y-1.5 sm:space-y-2">
            {insights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-400">
                <span className="text-purple-400 mt-0.5 sm:mt-1">▸</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
  const parts: string[] = [];
  
  // Friction and Trust analysis
  if (result.frictionScore >= 60 && result.trustScore <= 40) {
    parts.push('Your content currently creates high decision friction and relatively low trust. Users are likely to hesitate and postpone action rather than convert.');
  } else if (result.frictionScore >= 60) {
    parts.push('The content creates significant cognitive friction that may cause users to abandon the decision process, despite some trust signals.');
  } else if (result.trustScore <= 40) {
    parts.push('Trust levels are low, which creates hesitation even if the content is relatively clear.');
  }
  
  // Motivation analysis
  if (result.motivationMatchScore < 50) {
    parts.push('The message does not strongly connect with the audience\'s core motivations, which reduces the emotional drive to take action.');
  } else if (result.motivationMatchScore >= 70) {
    parts.push('The content aligns well with audience motivations, creating a strong emotional connection.');
  }
  
  // Decision probability analysis
  if (result.decisionProbability < 0.4) {
    parts.push('Overall, the current likelihood of conversion is low. The piece needs clearer value proposition, proof, and emotional resonance.');
  } else if (result.decisionProbability >= 0.6) {
    parts.push('The content shows strong conversion potential with good decision-making signals.');
  }
  
  // Emotional clarity
  if (result.emotionalClarityScore < 50) {
    parts.push('Emotional messaging could be clearer to better guide users toward confident decisions.');
  }
  
  // Default if no specific patterns
  if (parts.length === 0) {
    parts.push('The content shows a balanced psychological profile with moderate conversion potential.');
  }
  
  return parts.join(' ');
}

export default function ReportPanel({ result, loading, error, formData, visualTrust, isImageLoading }: ReportPanelProps) {
  const [rewriteResult, setRewriteResult] = useState<RewriteOutput | null>(null);
  const [rewriteLoading, setRewriteLoading] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  const getFrictionLevel = (score: number): { label: string; color: string; gradient: string } => {
    if (score <= 30) return { 
      label: 'Low Friction', 
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-500'
    };
    if (score <= 60) return { 
      label: 'Medium Friction', 
      color: 'text-yellow-400',
      gradient: 'from-yellow-500 to-amber-500'
    };
    return { 
      label: 'High Friction', 
      color: 'text-red-400',
      gradient: 'from-red-500 to-rose-500'
    };
  };

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
    const frictionLevel = getFrictionLevel(result.frictionScore);

    return (
      <div className="relative rounded-2xl sm:rounded-3xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-purple-900/10 to-slate-900/90 p-4 sm:p-6 lg:p-10 backdrop-blur-xl shadow-2xl space-y-6 sm:space-y-8 lg:space-y-10 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Decision Psychology Report
            </h2>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold text-purple-300">AI Analysis</span>
            </div>
          </div>

          {/* Overall Score Card */}
          <div className={`relative rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl mb-6 sm:mb-8 overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${frictionLevel.gradient} opacity-10`}></div>
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  Decision Friction Score
                </h3>
                <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 ${frictionLevel.color} ${frictionLevel.color.replace('text-', 'bg-')}/20 ${frictionLevel.color.replace('text-', 'border-')}/50`}>
                  {frictionLevel.label}
                </span>
              </div>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">{result.frictionScore} / 100</div>
              <div className="w-full h-3 sm:h-4 bg-slate-800/50 rounded-full overflow-hidden shadow-inner mb-4 sm:mb-6">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${frictionLevel.gradient} transition-all duration-1000 shadow-lg`}
                  style={{ width: `${result.frictionScore}%` }}
                />
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{result.explanationSummary}</p>
            </div>
          </div>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScoreCard 
              label="Cognitive Friction" 
              value={result.frictionScore}
              insights={result.keyDecisionBlockers}
              icon={Zap}
            />
            <ScoreCard 
              label="Emotional Resonance" 
              value={result.emotionalClarityScore}
              insights={result.emotionalResistanceFactors}
              icon={Sparkles}
            />
            <ScoreCard 
              label="Trust & Clarity" 
              value={result.trustScore}
              insights={result.trustBreakpoints}
              icon={Shield}
            />
            <div className="rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <span className="text-xs sm:text-sm font-bold text-slate-300">Action Triggers</span>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] sm:text-xs text-slate-400">Decision Likelihood</span>
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {Math.round(result.decisionProbability * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 sm:h-2.5 bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000 shadow-lg"
                      style={{ width: `${result.decisionProbability * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs text-slate-400">Conversion Impact</span>
                    <span
                      className={`text-lg sm:text-xl font-bold ${
                        result.conversionLiftEstimate >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {result.conversionLiftEstimate >= 0 ? '+' : ''}
                      {Math.round(result.conversionLiftEstimate)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Blockers & Psychological Factors */}
          <div className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              Decision Blockers & Psychological Factors
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Key Decision Blockers */}
              <div className="rounded-xl border-2 border-red-500/20 bg-red-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-3 text-red-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  Key Decision Blockers
                </h4>
                {result.keyDecisionBlockers && result.keyDecisionBlockers.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.keyDecisionBlockers.map((blocker, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">▸</span>
                        <span>{blocker}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">No major blockers detected.</p>
                )}
              </div>

              {/* Emotional Resistance Factors */}
              <div className="rounded-xl border-2 border-orange-500/20 bg-orange-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-3 text-orange-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Emotional Resistance
                </h4>
                {result.emotionalResistanceFactors && result.emotionalResistanceFactors.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.emotionalResistanceFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">▸</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">No major emotional resistance detected.</p>
                )}
              </div>

              {/* Cognitive Overload Factors */}
              <div className="rounded-xl border-2 border-yellow-500/20 bg-yellow-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-3 text-yellow-300 flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                  Cognitive Overload
                </h4>
                {result.cognitiveOverloadFactors && result.cognitiveOverloadFactors.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.cognitiveOverloadFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">▸</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">No cognitive overload detected.</p>
                )}
              </div>

              {/* Trust Breakpoints */}
              <div className="rounded-xl border-2 border-blue-500/20 bg-blue-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-3 text-blue-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  Trust Breakpoints
                </h4>
                {result.trustBreakpoints && result.trustBreakpoints.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.trustBreakpoints.map((breakpoint, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">▸</span>
                        <span>{breakpoint}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">No trust breakpoints detected.</p>
                )}
              </div>

              {/* Motivation Misalignments */}
              {result.motivationMisalignments && result.motivationMisalignments.length > 0 && (
                <div className="rounded-xl border-2 border-purple-500/20 bg-purple-900/10 p-4 sm:p-5 md:col-span-2">
                  <h4 className="text-sm sm:text-base font-semibold mb-3 text-purple-300 flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                    Motivation Misalignments
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.motivationMisalignments.map((misalignment, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">▸</span>
                        <span>{misalignment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              AI Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Quick Wins */}
              <div className="rounded-xl border-2 border-green-500/20 bg-green-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-2 text-green-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  Quick Wins
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 mb-3">Immediate changes to reduce friction fast.</p>
                {result.recommendedQuickWins && result.recommendedQuickWins.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.recommendedQuickWins.map((win, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">⚡</span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">No quick wins available.</p>
                )}
              </div>

              {/* Deep Changes */}
              <div className="rounded-xl border-2 border-indigo-500/20 bg-indigo-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-2 text-indigo-300 flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  Deep Changes
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 mb-3">Structural and strategic improvements for long-term impact.</p>
                {result.recommendedDeepChanges && result.recommendedDeepChanges.length > 0 ? (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {result.recommendedDeepChanges.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-1">🔧</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-400 italic">No deep changes available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Decision Psychology Summary */}
          <div className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              Decision Psychology Summary
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-xl border-2 border-purple-500/20 bg-purple-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-3 text-purple-300">Analysis Summary</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{result.explanationSummary}</p>
              </div>
              
              <div className="rounded-xl border-2 border-blue-500/20 bg-blue-900/10 p-4 sm:p-5">
                <h4 className="text-sm sm:text-base font-semibold mb-3 text-blue-300">AI Interpretation</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {buildAiInterpretation(result)}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Trust Analysis */}
          {(visualTrust || isImageLoading) && (
            <div className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                Visual Trust Analysis
              </h3>
              
              {isImageLoading ? (
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                  <span>Analyzing visual trust...</span>
                </div>
              ) : visualTrust ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="rounded-xl border-2 border-cyan-500/20 bg-cyan-900/10 p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm sm:text-base font-semibold text-cyan-300">
                        Visual Trust:
                      </span>
                      <span className={`text-sm sm:text-base font-bold px-3 py-1 rounded-full ${
                        visualTrust.trust_label === 'high' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : visualTrust.trust_label === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {visualTrust.trust_label.charAt(0).toUpperCase() + visualTrust.trust_label.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">Low:</span>
                      <span className="text-slate-400 font-semibold">{Math.round(visualTrust.trust_scores.low * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-1000"
                        style={{ width: `${Math.round(visualTrust.trust_scores.low * 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">Medium:</span>
                      <span className="text-slate-400 font-semibold">{Math.round(visualTrust.trust_scores.medium * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-1000"
                        style={{ width: `${Math.round(visualTrust.trust_scores.medium * 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">High:</span>
                      <span className="text-slate-400 font-semibold">{Math.round(visualTrust.trust_scores.high * 100)}%</span>
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

          {/* AI Copy Rewrite Suggestions */}
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
      </div>
    );
  }

  return null;
}

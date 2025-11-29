'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Behavioral DeepScan - AI Decision Psychology Analysis Page
 * 
 * This page is the main UI for the Behavioral DeepScan AI engine.
 * 
 * Key Components:
 * - CognitiveFrictionResult: TypeScript interface matching the response from POST /api/brain/cognitive-friction
 * - analyzeCognitiveFriction(): Function that calls POST /api/brain/cognitive-friction (via centralized API client)
 * - ScoreCard: Component for displaying individual scores with progress bars
 * 
 * The page includes:
 * - Hero section with H1 and intro
 * - "How it works" section
 * - Main analysis form (left) and results panel (right)
 * - SEO content sections
 * - CTA section
 * 
 * SEO metadata is defined in layout.tsx for this route.
 */

// CognitiveFrictionResult type definition
// This interface matches the response from POST /api/brain/cognitive-friction
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

import { postToBrain } from '@/lib/apiClient';

// Helper function to call the Cognitive Friction API
// Uses the centralized API client helper
async function analyzeCognitiveFriction(payload: {
  raw_text: string;
  platform: string;
  goal: string[];
  audience: string;
  language: string;
  audienceType?: string;
  tonePreference?: string;
  meta: null;
}): Promise<CognitiveFrictionResult> {
  return postToBrain<CognitiveFrictionResult>('/api/brain/cognitive-friction', payload);
}

// Score display component
function ScoreCard({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  const getColorClass = (score: number) => {
    if (score <= 30) return 'bg-green-500';
    if (score <= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="rounded-xl border border-gray-700 bg-slate-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">{label}</span>
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getColorClass(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Main page component
export default function BehavioralDeepScanPage() {
  const [formData, setFormData] = useState({
    raw_text: '',
    platform: 'landing_page',
    goal: [] as string[],
    audience: 'cold',
    language: 'en',
    audienceType: 'General',
    tonePreference: 'Direct',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CognitiveFrictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [metaJson, setMetaJson] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (goal: string) => {
    setFormData((prev) => {
      const goals = prev.goal.includes(goal)
        ? prev.goal.filter((g) => g !== goal)
        : [...prev.goal, goal];
      return { ...prev, goal: goals };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const goals = formData.goal.length > 0 ? formData.goal : ['leads'];
      let meta = null;
      
      if (showAdvanced && metaJson.trim()) {
        try {
          meta = JSON.parse(metaJson);
        } catch {
          throw new Error('Invalid JSON in meta field');
        }
      }

      const payload = {
        raw_text: formData.raw_text,
        platform: formData.platform,
        goal: goals,
        audience: formData.audience,
        language: formData.language,
        audienceType: formData.audienceType,
        tonePreference: formData.tonePreference,
        meta,
      };

      const data = await analyzeCognitiveFriction(payload);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <span className="text-xs font-semibold text-purple-300">AI Behavioral Engine</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Behavioral DeepScan — The AI Engine That Detects Hidden Psychological Friction in Your Content
          </h1>
          
          <p className="mb-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Understand how real users think, hesitate, and decide. DeepScan analyzes cognitive load, emotional signals, trust barriers, and decision patterns inside your text — then gives you actionable recommendations to improve clarity, persuasion, and conversion.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Run a Cognitive Friction Scan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
            <Link
              href="/ai-marketing"
              className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Learn how the AI Marketing Engine works
              <span className="text-purple-400">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="relative bg-black py-12 sm:py-16 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How Behavioral DeepScan Works
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📝', title: 'Paste your content', desc: 'DeepScan reads emotional tone, certainty, confidence, and hidden friction signals inside your text.' },
              { icon: '⚙️', title: 'Choose context', desc: "Tell the AI what you're trying to achieve so it can analyze intent and decision psychology accurately." },
              { icon: '🤖', title: 'Run AI analysis', desc: 'The engine models user psychology and predicts how readers will react to your content.' },
              { icon: '📊', title: 'Get insights', desc: 'Receive clear, actionable recommendations to reduce friction and increase clarity, trust, and conversion.' },
            ].map((step, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center backdrop-blur-sm"
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Analysis Section */}
      <section id="analysis-form" className="relative bg-black py-12 sm:py-16 md:py-20 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Run an AI Cognitive Friction Scan
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form - Left Side */}
            <div className="rounded-2xl border border-gray-700 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Raw Text */}
                <div>
                  <label htmlFor="raw_text" className="block text-sm font-semibold text-gray-200 mb-2">
                    Paste your content (at least 20–50 words) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="raw_text"
                    name="raw_text"
                    value={formData.raw_text}
                    onChange={handleInputChange}
                    placeholder="Example: landing page copy, ad script, email, product description…"
                    required
                    className="w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[150px] resize-y"
                  />
                </div>

                {/* Platform */}
                <div>
                  <label htmlFor="platform" className="block text-sm font-semibold text-gray-200 mb-2">
                    Content type (affects analysis)
                  </label>
                  <select
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="landing_page">Landing Page</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="email">Email</option>
                    <option value="ad">Ad</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    What are you trying to achieve?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['clicks', 'leads', 'sales', 'engagement'].map((goal) => (
                      <label
                        key={goal}
                        className="flex items-center gap-2 p-3 rounded-xl border-2 border-gray-600 bg-slate-800 hover:border-purple-500/50 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.goal.includes(goal)}
                          onChange={() => handleGoalChange(goal)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-200 capitalize">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Audience */}
                <div>
                  <label htmlFor="audience" className="block text-sm font-semibold text-gray-200 mb-2">
                    Audience stage
                  </label>
                  <select
                    id="audience"
                    name="audience"
                    value={formData.audience}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="cold">Cold</option>
                    <option value="warm">Warm</option>
                    <option value="retargeting">Retargeting</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label htmlFor="language" className="block text-sm font-semibold text-gray-200 mb-2">
                    Content language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                    <option value="fa">Persian</option>
                  </select>
                </div>

                {/* Audience Type */}
                <div>
                  <label htmlFor="audienceType" className="block text-sm font-semibold text-gray-200 mb-2">
                    Audience type
                  </label>
                  <select
                    id="audienceType"
                    name="audienceType"
                    value={formData.audienceType}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Professional">Professional</option>
                    <option value="Technical">Technical</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Cold audience">Cold audience</option>
                    <option value="Warm audience">Warm audience</option>
                  </select>
                </div>

                {/* Tone Preference */}
                <div>
                  <label htmlFor="tonePreference" className="block text-sm font-semibold text-gray-200 mb-2">
                    Preferred tone
                  </label>
                  <select
                    id="tonePreference"
                    name="tonePreference"
                    value={formData.tonePreference}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="Formal">Formal</option>
                    <option value="Confident">Confident</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Direct">Direct</option>
                    <option value="Conversational">Conversational</option>
                  </select>
                </div>

                {/* Advanced Section */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showAdvanced ? '▼' : '▶'} Advanced (meta JSON)
                  </button>
                  {showAdvanced && (
                    <textarea
                      value={metaJson}
                      onChange={(e) => setMetaJson(e.target.value)}
                      placeholder='{"key": "value"}'
                      className="mt-2 w-full rounded-xl border-2 border-gray-600 bg-slate-800 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[80px] resize-y font-mono"
                    />
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="rounded-xl border-2 border-red-500/20 bg-red-900/20 p-4">
                    <div className="text-sm text-red-200">{error}</div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.raw_text.trim()}
                  className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 animate-spin">⏳</span>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Run Cognitive Friction Analysis</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results - Right Side */}
            <div className="rounded-2xl border border-gray-700 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Decision Psychology Report
              </h2>

              {!result ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Your Decision Psychology Report</h3>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto">
                    No analysis yet. Paste your content on the left and run a Cognitive Friction Scan to see results here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary Section */}
                  <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-4 mb-4">
                    <p className="text-sm text-gray-300 leading-relaxed">{result.explanationSummary}</p>
                  </div>

                  {/* Key Scores Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Key Scores</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ScoreCard label="Friction Level" value={result.frictionScore} colorClass="red" />
                      <ScoreCard label="Trust Stability" value={result.trustScore} colorClass="green" />
                      <ScoreCard label="Clarity" value={result.emotionalClarityScore} colorClass="blue" />
                      <ScoreCard label="Emotional Tone" value={result.motivationMatchScore} colorClass="purple" />
                      <div className="sm:col-span-2">
                        <ScoreCard label="Momentum" value={Math.round(result.decisionProbability * 100)} colorClass="green" />
                      </div>
                    </div>
                  </div>

                  {/* Decision Metrics */}
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-gray-700 bg-slate-800 p-4">
                        <span className="text-sm font-semibold text-gray-300 block mb-1">Decision likelihood</span>
                        <span className="text-2xl font-bold text-white">
                          {Math.round(result.decisionProbability * 100)}%
                        </span>
                      </div>
                      <div className="rounded-xl border border-gray-700 bg-slate-800 p-4">
                        <span className="text-sm font-semibold text-gray-300 block mb-1">Conversion impact</span>
                        <span className={`text-2xl font-bold ${result.conversionLiftEstimate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {result.conversionLiftEstimate >= 0 ? '+' : ''}
                          {Math.round(result.conversionLiftEstimate)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Blockers & Factors */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Decision Blockers & Psychological Factors</h3>
                    <div className="space-y-4">
                      {result.keyDecisionBlockers.length > 0 && (
                        <div className="rounded-xl border border-red-500/20 bg-red-900/10 p-4">
                          <h4 className="text-sm font-semibold mb-2 text-red-300">Key Decision Blockers</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {result.keyDecisionBlockers.map((blocker, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-red-400 mt-1">•</span>
                                <span>{blocker}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.emotionalResistanceFactors.length > 0 && (
                        <div className="rounded-xl border border-orange-500/20 bg-orange-900/10 p-4">
                          <h4 className="text-sm font-semibold mb-2 text-orange-300">Emotional Resistance</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {result.emotionalResistanceFactors.map((factor, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-orange-400 mt-1">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.cognitiveOverloadFactors.length > 0 && (
                        <div className="rounded-xl border border-yellow-500/20 bg-yellow-900/10 p-4">
                          <h4 className="text-sm font-semibold mb-2 text-yellow-300">Cognitive Overload</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {result.cognitiveOverloadFactors.map((factor, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.trustBreakpoints.length > 0 && (
                        <div className="rounded-xl border border-blue-500/20 bg-blue-900/10 p-4">
                          <h4 className="text-sm font-semibold mb-2 text-blue-300">Trust Breakpoints</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {result.trustBreakpoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-400 mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.motivationMisalignments.length > 0 && (
                        <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-4">
                          <h4 className="text-sm font-semibold mb-2 text-purple-300">Motivation Misalignments</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {result.motivationMisalignments.map((misalignment, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>{misalignment}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">AI Recommendations</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-green-500/20 bg-green-900/10 p-4">
                        <h4 className="text-sm font-semibold mb-2 text-green-300">Quick Wins</h4>
                        <p className="text-xs text-gray-400 mb-3">Immediate changes you can make to reduce friction fast.</p>
                        <ul className="space-y-1 text-sm text-gray-300">
                          {result.recommendedQuickWins.map((win, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">⚡</span>
                              <span>{win}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/10 p-4">
                        <h4 className="text-sm font-semibold mb-2 text-indigo-300">Deep Changes</h4>
                        <p className="text-xs text-gray-400 mb-3">Structural or strategic changes for long-term impact.</p>
                        <ul className="space-y-1 text-sm text-gray-300">
                          {result.recommendedDeepChanges.map((change, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-indigo-400 mt-1">🔧</span>
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Decision Psychology Summary</h3>
                    <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-4">
                      <p className="text-sm text-gray-300 leading-relaxed">{result.explanationSummary}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative bg-black py-12 sm:py-16 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Where Behavioral DeepScan Makes the Biggest Impact
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            DeepScan is built for marketers, founders, and content teams who want to understand how their words actually land in the reader's mind — not just how they look on the page.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Landing pages and sales pages',
              'Ad copy and creative scripts',
              'Email campaigns and sequences',
              'Product descriptions',
              'Lead magnets and download pages',
              'Website copy and feature pages',
              'Social media captions',
              'Long-form articles and thought leadership content',
            ].map((useCase, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-700 bg-slate-900/50 hover:border-purple-500/50 transition-colors"
              >
                <span className="text-purple-400 mt-0.5 flex-shrink-0">•</span>
                <span className="text-gray-300">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explanation & Use Cases Section - Modern Card Layout */}
      <section className="relative bg-black py-12 sm:py-16 mt-16 lg:mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card 1: Why Cognitive Friction Kills Conversion */}
            <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-6 sm:p-8 shadow-lg shadow-black/40">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-purple-300">
                <span className="inline-block h-1 w-6 rounded-full bg-purple-400" />
                <span>Cognitive Friction</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Why Cognitive Friction Kills Conversion
              </h2>
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  Every moment of hesitation, doubt, or cognitive overload in your content creates friction that reduces conversion rates. Traditional analytics can tell you what users clicked, but they cannot detect the emotional and cognitive barriers that prevent decisions.
                </p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  Behavioral DeepScan goes beyond simple copy suggestions. It analyzes how your content triggers hesitation, builds or breaks trust, aligns with motivations, and guides decision-making. By understanding the psychological factors that influence behavior, you can create content that removes friction and guides users toward confident decisions.
                </p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  This AI engine uses cognitive friction models, trust psychology, and motivation alignment to identify specific blockers and provide actionable recommendations. The result is content that not only looks good but actually converts by addressing the real psychological barriers your audience faces.
                </p>
              </div>
            </div>

            {/* Card 2: Use Behavioral DeepScan in Your Marketing Workflow */}
            <div className="rounded-2xl border border-gray-700 bg-white/5 p-6 sm:p-8 shadow-lg shadow-black/40">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-teal-300">
                <span className="inline-block h-1 w-6 rounded-full bg-teal-400" />
                <span>Use Cases & Workflow</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Use Behavioral DeepScan in Your Marketing Workflow
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-200 mb-6">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Before launching a new landing page – identify friction points before they cost you conversions</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Testing different ad creatives – compare cognitive friction scores to choose the most effective variant</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Reviewing onboarding emails – ensure your welcome sequence builds trust and reduces hesitation</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Optimizing high-traffic pages with low conversion – find the psychological blockers that analytics can't detect</span>
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#analysis-form"
                  className="inline-flex items-center rounded-full border border-teal-400 px-4 py-2 text-xs sm:text-sm font-medium text-teal-100 hover:bg-teal-500 hover:border-teal-500 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Run a Cognitive Friction Scan →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Marketing Engine CTA Section */}
      <section className="relative bg-black py-12 sm:py-16 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 sm:p-12 backdrop-blur-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Want the full AI Marketing Engine behind DeepScan?
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Behavioral DeepScan is one layer of the NIMA AI Brain — a complete AI Marketing Engine that analyzes behavior, predicts outcomes, and generates high-conversion strategy and copy across your entire funnel.
            </p>
            <Link
              href="/ai-marketing"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Explore the AI Marketing Engine</span>
              <span className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

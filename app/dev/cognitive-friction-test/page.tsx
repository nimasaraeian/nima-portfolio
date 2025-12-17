'use client';

import { useState } from 'react';

interface CognitiveFrictionResult {
  frictionScore: number;
  trustScore: number;
  emotionalClarityScore: number;
  motivationMatchScore: number;
  decisionProbability: number;
  conversionLiftEstimate: number;
  [key: string]: any; // For any additional fields
}

export default function CognitiveFrictionTestPage() {
  const [formData, setFormData] = useState({
    raw_text: '',
    platform: 'landing_page',
    goal: [] as string[],
    audience: 'cold',
    language: 'en',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CognitiveFrictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        raw_text: formData.raw_text,
        platform: formData.platform,
        goal: formData.goal,
        audience: formData.audience,
        language: formData.language,
        meta: null,
      };

      const { postToBrain } = await import('@/lib/apiClient');
      const data = await postToBrain<CognitiveFrictionResult>('/api/brain/decision-diagnosis', payload);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
          Cognitive Friction Test
        </h1>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          Internal test page for Cognitive Friction API endpoint
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          {/* Raw Text Textarea */}
          <div>
            <label htmlFor="raw_text" className="block text-sm font-semibold text-gray-200 mb-2">
              Content to analyze <span className="text-red-400">*</span>
            </label>
            <textarea
              id="raw_text"
              name="raw_text"
              value={formData.raw_text}
              onChange={handleInputChange}
              placeholder="Paste your landing page, ad, or post text here..."
              required
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[150px] resize-y"
            />
          </div>

          {/* Platform Select */}
          <div>
            <label htmlFor="platform" className="block text-sm font-semibold text-gray-200 mb-2">
              Platform
            </label>
            <select
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="landing_page">Landing Page</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="email">Email</option>
              <option value="ad">Ad</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Goal Checkboxes */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Goal
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

          {/* Audience Select */}
          <div>
            <label htmlFor="audience" className="block text-sm font-semibold text-gray-200 mb-2">
              Audience
            </label>
            <select
              id="audience"
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="retargeting">Retargeting</option>
            </select>
          </div>

          {/* Language Select */}
          <div>
            <label htmlFor="language" className="block text-sm font-semibold text-gray-200 mb-2">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="en">English</option>
              <option value="tr">Turkish</option>
              <option value="fa">Persian</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.raw_text.trim()}
            className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="mr-2">⏳</span>
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

        {/* Error Display */}
        {error && (
          <div className="mb-8 rounded-2xl border-2 border-red-500/20 bg-red-900/20 p-5">
            <h3 className="text-lg font-semibold mb-3 text-red-300">Error</h3>
            <div className="text-sm text-red-200">{error}</div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="space-y-6">
            {/* Main Scores */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {result.frictionScore !== undefined && (
                <div className="rounded-2xl border-2 border-purple-500/20 bg-slate-800 p-5">
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">Friction Score</h4>
                  <div className="text-3xl font-bold text-white mb-2">{result.frictionScore}</div>
                </div>
              )}
              {result.trustScore !== undefined && (
                <div className="rounded-2xl border-2 border-blue-500/20 bg-slate-800 p-5">
                  <h4 className="text-lg font-semibold mb-3 text-blue-300">Trust Score</h4>
                  <div className="text-3xl font-bold text-white mb-2">{result.trustScore}</div>
                </div>
              )}
              {result.emotionalClarityScore !== undefined && (
                <div className="rounded-2xl border-2 border-green-500/20 bg-slate-800 p-5">
                  <h4 className="text-lg font-semibold mb-3 text-green-300">Emotional Clarity</h4>
                  <div className="text-3xl font-bold text-white mb-2">{result.emotionalClarityScore}</div>
                </div>
              )}
              {result.motivationMatchScore !== undefined && (
                <div className="rounded-2xl border-2 border-yellow-500/20 bg-slate-800 p-5">
                  <h4 className="text-lg font-semibold mb-3 text-yellow-300">Motivation Match</h4>
                  <div className="text-3xl font-bold text-white mb-2">{result.motivationMatchScore}</div>
                </div>
              )}
              {result.decisionProbability !== undefined && (
                <div className="rounded-2xl border-2 border-indigo-500/20 bg-slate-800 p-5">
                  <h4 className="text-lg font-semibold mb-3 text-indigo-300">Decision Probability</h4>
                  <div className="text-3xl font-bold text-white mb-2">{result.decisionProbability}</div>
                </div>
              )}
              {result.conversionLiftEstimate !== undefined && (
                <div className="rounded-2xl border-2 border-pink-500/20 bg-slate-800 p-5">
                  <h4 className="text-lg font-semibold mb-3 text-pink-300">Conversion Lift</h4>
                  <div className="text-3xl font-bold text-white mb-2">{result.conversionLiftEstimate}</div>
                </div>
              )}
            </div>

            {/* Raw JSON Display */}
            <div className="rounded-2xl border-2 border-gray-700 bg-slate-900 p-5">
              <h3 className="text-lg font-semibold mb-3 text-white">Raw JSON Response</h3>
              <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto bg-black/50 p-4 rounded-lg border border-gray-700">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


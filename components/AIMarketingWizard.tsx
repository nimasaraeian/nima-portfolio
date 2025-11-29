'use client'

import { useState } from 'react'
import { X, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'
import type { BrainAPIResponse } from '@/types/api'

interface AIMarketingWizardProps {
  onClose: () => void
}

export default function AIMarketingWizard({ onClose }: AIMarketingWizardProps) {
  const [step, setStep] = useState(1)
  const [channel, setChannel] = useState('')
  const [url, setUrl] = useState('')
  const [goal, setGoal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<BrainAPIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    // Validate inputs
    if (!url && !goal) {
      alert("Please provide at least a URL or a goal.")
      return
    }

    if (!channel) {
      alert("Please select a platform/channel.")
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      setResult(null)

      // Convert goal text to goals array (split by newlines or commas)
      const goals = goal
        ? goal
            .split(/[\n,]/)
            .map((g) => g.trim())
            .filter((g) => g.length > 0)
        : []

      // If no goals from text, use a default
      if (goals.length === 0 && goal) {
        goals.push(goal.trim())
      }

      const payload = {
        url: url || '',
        goals: goals.length > 0 ? goals : ['Improve marketing performance'],
        platform: channel,
      }

      const { postToBrain } = await import('@/lib/apiClient')
      const data = await postToBrain<BrainAPIResponse>('/api/brain', payload)
      setResult(data)
      setStep(3) // Move to results step on success
    } catch (err) {
      console.error("handleAnalyze error:", err)
      setError(err instanceof Error ? err.message : "Something went wrong while analyzing.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
      {/* Animated Background Lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900 to-black p-6 sm:p-8 md:p-10 text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full p-2 bg-slate-800 hover:bg-slate-700 border border-purple-500/30 transition-all hover:scale-110 z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            AI Marketing OS Analysis
          </h2>
          <p className="text-sm sm:text-base text-gray-400">Step {step} of 3</p>
        </div>

        {/* Step 1: Channel Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Select Channel</h3>
            <div className="grid gap-4">
              {['Instagram Ads', 'Facebook Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Website'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setChannel(c)
                    setStep(2)
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    channel === c
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 bg-slate-800 hover:border-purple-500/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <ChevronLeft size={20} />
              Back
            </button>
          </div>
        )}

        {/* Step 2: Input Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Provide Campaign Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Landing Page URL <span className="text-gray-400">(required if no goals)</span>
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/landing-page"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Goals / Objectives <span className="text-gray-400">(one per line or comma-separated)</span>
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Enter your marketing goals, one per line or separated by commas&#10;Example:&#10;Increase conversions&#10;Improve engagement&#10;Reduce cost per acquisition"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[120px] resize-y"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-600 bg-slate-800 hover:bg-slate-700 text-white"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  await handleAnalyze()
                  // Step will be updated in handleAnalyze if successful
                }}
                className="flex-1 group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>Analyzing…</span>
                  </>
                ) : (
                  <span className="relative z-10">Run Analysis</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Analysis Results</h3>
            
            {error ? (
              <div className="rounded-2xl border-2 border-red-500/20 bg-red-900/20 p-5">
                <h4 className="text-lg font-semibold mb-3 text-red-300">Error</h4>
                <div className="text-sm text-red-200">{error}</div>
              </div>
            ) : !result ? (
              <div className="text-center py-8 text-gray-400">
                No analysis received.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Score and Confidence */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border-2 border-purple-500/20 bg-slate-800 p-5">
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Score</h4>
                    <div className="text-3xl font-bold text-white mb-2">{result.score}</div>
                    <div className="text-xs text-gray-400">Overall performance score</div>
                  </div>
                  <div className="rounded-2xl border-2 border-blue-500/20 bg-slate-800 p-5">
                    <h4 className="text-lg font-semibold mb-3 text-blue-300">AI Confidence</h4>
                    <div className="text-3xl font-bold text-white mb-2">{result.aiConfidence}%</div>
                    <div className="text-xs text-gray-400">Confidence level</div>
                  </div>
                </div>

                {/* Main Issues */}
                {result.mainIssues && result.mainIssues.length > 0 && (
                  <div className="rounded-2xl border-2 border-red-500/20 bg-slate-800 p-5">
                    <h4 className="text-lg font-semibold mb-3 text-red-300">Main Issues</h4>
                    <ul className="space-y-2">
                      {result.mainIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="rounded-2xl border-2 border-blue-500/20 bg-slate-800 p-5">
                    <h4 className="text-lg font-semibold mb-3 text-blue-300">Suggestions</h4>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Wins */}
                {result.quickWins && result.quickWins.length > 0 && (
                  <div className="rounded-2xl border-2 border-green-500/20 bg-slate-800 p-5">
                    <h4 className="text-lg font-semibold mb-3 text-green-300">Quick Wins</h4>
                    <ul className="space-y-2">
                      {result.quickWins.map((win, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep(2)
                  setResult(null)
                  setError(null)
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-600 bg-slate-800 hover:bg-slate-700 text-white"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl border border-purple-500/40 bg-purple-600/20 hover:bg-purple-600/30 text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


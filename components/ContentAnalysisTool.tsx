'use client'

import { useState } from 'react'
import { Loader2, Zap, CheckCircle2, AlertCircle } from 'lucide-react'
import { mockBrainResponse, type BrainAnalysisResponse } from '@/lib/mockBrainResponse'

type AnalysisType = 'landing-page' | 'ad-post' | 'full-content'
type Goal = 'clicks' | 'saves-shares' | 'qualified-leads' | 'sales-bookings'
type Platform = 'Instagram' | 'TikTok' | 'LinkedIn' | 'Google Ads' | 'Landing Page' | 'Email'
type Audience = 'Cold' | 'Warm' | 'Retargeting'
type Language = 'English' | 'Turkish'

export default function ContentAnalysisTool() {
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null)
  const [url, setUrl] = useState('')
  const [adCaption, setAdCaption] = useState('')
  const [fullContent, setFullContent] = useState('')
  const [goals, setGoals] = useState<Goal[]>([])
  const [platform, setPlatform] = useState<Platform>('Instagram')
  const [audience, setAudience] = useState<Audience>('Cold')
  const [language, setLanguage] = useState<Language>('English')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<BrainAnalysisResponse | null>(null)
  const [activeTab, setActiveTab] = useState<'hooks' | 'body' | 'ctas'>('hooks')

  const toggleGoal = (goal: Goal) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    if (!analysisType) {
      alert('Please select what you want to analyze')
      return
    }

    if (analysisType === 'landing-page' && !url.trim()) {
      alert('Please enter a URL')
      return
    }

    if (analysisType === 'ad-post' && !adCaption.trim()) {
      alert('Please enter ad caption')
      return
    }

    if (analysisType === 'full-content' && !fullContent.trim()) {
      alert('Please enter content')
      return
    }

    if (goals.length === 0) {
      alert('Please select at least one goal')
      return
    }

    setIsLoading(true)
    setResults(null)

    // Simulate API call delay
    setTimeout(() => {
      const response = mockBrainResponse()
      setResults(response)
      setIsLoading(false)
    }, 1500)
  }

  const resetForm = () => {
    setAnalysisType(null)
    setUrl('')
    setAdCaption('')
    setFullContent('')
    setGoals([])
    setPlatform('Instagram')
    setAudience('Cold')
    setLanguage('English')
    setResults(null)
  }

  if (results) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
            >
              ← Back to Analysis
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Analysis Results
            </h1>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-purple-500/30 p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold">{results.score}</span>
                  <span className="text-gray-400">/ 100</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="text-sm text-gray-400 mb-1">AI Confidence</div>
                <div className="text-xl font-semibold text-blue-400">{results.aiConfidence}%</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${results.score}%` }}
              />
            </div>
            
            {/* Summary */}
            <p className="text-gray-300 leading-relaxed">{results.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Top Issues */}
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-red-500/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-semibold text-red-300">Top Issues</h3>
              </div>
              <ul className="space-y-3">
                {results.topIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Wins */}
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-green-500/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-semibold text-green-300">Quick Wins</h3>
              </div>
              <ul className="space-y-3">
                {results.quickWins.map((win, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copy Variants */}
          <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-purple-500/30 p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6">Copy Variants</h3>
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('hooks')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'hooks'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Hooks
              </button>
              <button
                onClick={() => setActiveTab('body')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'body'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Body
              </button>
              <button
                onClick={() => setActiveTab('ctas')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'ctas'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                CTAs
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {results.copyVariants[activeTab].map((variant, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-colors"
                >
                  <p className="text-gray-200 leading-relaxed">{variant}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
          AI Content & Landing Page Analysis
        </h1>
        <p className="text-gray-400 mb-8">Get instant AI-powered insights to improve your content performance</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: What to Analyze */}
          <div>
            <label className="block text-lg font-semibold mb-4">What do you want to analyze?</label>
            <div className="grid sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setAnalysisType('landing-page')}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  analysisType === 'landing-page'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 bg-slate-900 hover:border-purple-500/50'
                }`}
              >
                <div className="font-semibold mb-1">Landing page (URL)</div>
                <div className="text-sm text-gray-400">Analyze a web page</div>
              </button>
              <button
                type="button"
                onClick={() => setAnalysisType('ad-post')}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  analysisType === 'ad-post'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 bg-slate-900 hover:border-purple-500/50'
                }`}
              >
                <div className="font-semibold mb-1">Single ad / social post</div>
                <div className="text-sm text-gray-400">Analyze ad copy</div>
              </button>
              <button
                type="button"
                onClick={() => setAnalysisType('full-content')}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  analysisType === 'full-content'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 bg-slate-900 hover:border-purple-500/50'
                }`}
              >
                <div className="font-semibold mb-1">Full content piece</div>
                <div className="text-sm text-gray-400">Analyze long-form content</div>
              </button>
            </div>
          </div>

          {/* Step 2: Content Input */}
          {analysisType && (
            <div className="space-y-4">
              {analysisType === 'landing-page' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Landing Page URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/landing-page"
                    className="w-full rounded-xl border-2 border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              )}

              {analysisType === 'ad-post' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Ad Caption / Copy</label>
                    <textarea
                      value={adCaption}
                      onChange={(e) => setAdCaption(e.target.value)}
                      placeholder="Paste your ad copy or social post caption here..."
                      rows={6}
                      className="w-full rounded-xl border-2 border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-y"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Image / Video (Optional)</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                      <div className="text-gray-400">Click to upload or drag and drop</div>
                      <div className="text-xs text-gray-500 mt-2">PNG, JPG, MP4 up to 10MB</div>
                    </div>
                  </div>
                </div>
              )}

              {analysisType === 'full-content' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Content</label>
                  <textarea
                    value={fullContent}
                    onChange={(e) => setFullContent(e.target.value)}
                    placeholder="Paste your full content piece here..."
                    rows={12}
                    className="w-full rounded-xl border-2 border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-y"
                    required
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Context */}
          {analysisType && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Context</h3>

              {/* Goals */}
              <div>
                <label className="block text-sm font-semibold mb-3">Goals (select all that apply)</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: 'clicks' as Goal, label: 'Get more clicks' },
                    { id: 'saves-shares' as Goal, label: 'Get more saves / shares' },
                    { id: 'qualified-leads' as Goal, label: 'Get more qualified leads' },
                    { id: 'sales-bookings' as Goal, label: 'Get more sales / bookings' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        goals.includes(goal.id)
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-700 bg-slate-900 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {goals.includes(goal.id) && (
                          <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        )}
                        <span>{goal.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform, Audience, Language */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="w-full rounded-xl border-2 border-gray-700 bg-slate-900 px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as Audience)}
                    className="w-full rounded-xl border-2 border-gray-700 bg-slate-900 px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="Cold">Cold</option>
                    <option value="Warm">Warm</option>
                    <option value="Retargeting">Retargeting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full rounded-xl border-2 border-gray-700 bg-slate-900 px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="English">English</option>
                    <option value="Turkish">Turkish</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {analysisType && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Run AI Analysis</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </>
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}


























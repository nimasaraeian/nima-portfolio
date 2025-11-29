'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import type { BrainAPIRequest, BrainAPIResponse } from '@/types/api'

interface ModuleConfig {
  id: string
  title: string
  fields: {
    name: string
    label: string
    type: 'select' | 'text' | 'textarea'
    options?: string[]
    placeholder?: string
  }[]
}

const MODULE_CONFIGS: Record<string, ModuleConfig> = {
  deepscan: {
    id: 'deepscan',
    title: 'Behavioral DeepScan',
    fields: [
      { name: 'industry', label: 'Industry', type: 'select', options: ['Beauty Clinic', 'Restaurant', 'SaaS', 'Education', 'Real Estate', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g., Istanbul' },
      { name: 'target_audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Tourists, Locals, Young Professionals' },
      { name: 'query', label: 'What do you want to analyze?', type: 'textarea', placeholder: 'Describe your current marketing situation, challenges, or what you want to understand about your audience...' },
    ],
  },
  market: {
    id: 'market',
    title: 'Market & Trend Intelligence',
    fields: [
      { name: 'industry', label: 'Industry', type: 'select', options: ['Beauty Clinic', 'Restaurant', 'SaaS', 'Education', 'Real Estate', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g., Istanbul' },
      { name: 'channel', label: 'Primary Channel', type: 'select', options: ['Instagram Ads', 'Google Ads', 'Facebook Ads', 'TikTok Ads', 'LinkedIn Ads', 'Email', 'Other'] },
      { name: 'query', label: 'What market intelligence do you need?', type: 'textarea', placeholder: 'Describe competitors, trends, positioning gaps, or audience reactions you want to analyze...' },
    ],
  },
  content: {
    id: 'content',
    title: 'AI Content Engine',
    fields: [
      { name: 'industry', label: 'Industry', type: 'select', options: ['Beauty Clinic', 'Restaurant', 'SaaS', 'Education', 'Real Estate', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g., Istanbul' },
      { name: 'channel', label: 'Content Format', type: 'select', options: ['Instagram', 'YouTube', 'LinkedIn', 'Blog', 'Email', 'All'] },
      { name: 'query', label: 'What content do you need?', type: 'textarea', placeholder: 'Describe the type of content, topics, voice, tone, or specific campaign you want to create...' },
    ],
  },
  conversion: {
    id: 'conversion',
    title: 'Conversion & Funnel Architecture',
    fields: [
      { name: 'industry', label: 'Industry', type: 'select', options: ['Beauty Clinic', 'Restaurant', 'SaaS', 'Education', 'Real Estate', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g., Istanbul' },
      { name: 'channel', label: 'Channel', type: 'select', options: ['Instagram Ads', 'Google Ads', 'Facebook Ads', 'Website', 'Email', 'Other'] },
      { name: 'query', label: 'What funnel or conversion challenge do you have?', type: 'textarea', placeholder: 'Describe your current funnel, conversion issues, trust points, or decision journey challenges...' },
    ],
  },
  automation: {
    id: 'automation',
    title: 'AI Automation System',
    fields: [
      { name: 'industry', label: 'Industry', type: 'select', options: ['Beauty Clinic', 'Restaurant', 'SaaS', 'Education', 'Real Estate', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g., Istanbul' },
      { name: 'channel', label: 'Automation Channel', type: 'select', options: ['DM/WhatsApp', 'Email', 'SMS', 'All'] },
      { name: 'query', label: 'What automation do you need?', type: 'textarea', placeholder: 'Describe your lead qualification, routing, follow-up, or appointment automation needs...' },
    ],
  },
}

interface AIMarketingModuleProps {
  moduleId: string
  onClose: () => void
}

export default function AIMarketingModule({ moduleId, onClose }: AIMarketingModuleProps) {
  const config = MODULE_CONFIGS[moduleId]
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BrainAPIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!config) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Use backend API via centralized client
      const { postToBrain } = await import('@/lib/apiClient');
      
      // Build goals array from query
      const goals: string[] = []
      if (formData.query) {
        // Split query by newlines or periods to create multiple goals
        const queryParts = formData.query.split(/[.\n]/).map(p => p.trim()).filter(p => p.length > 0)
        goals.push(...queryParts)
      }
      
      // If no goals, add a default based on module
      if (goals.length === 0) {
        if (moduleId === 'deepscan') {
          goals.push('Behavioral DeepScan Analysis')
        } else if (moduleId === 'market') {
          goals.push('Market Intelligence Analysis')
        } else if (moduleId === 'content') {
          goals.push('AI Content Generation')
        } else if (moduleId === 'conversion') {
          goals.push('Conversion Funnel Optimization')
        } else if (moduleId === 'automation') {
          goals.push('Automation System Setup')
        } else {
          goals.push('Marketing Analysis')
        }
      }

      // Build URL - use a placeholder if no URL provided
      let url = formData.url || ''
      if (!url && formData.channel) {
        // Create a placeholder URL based on channel
        url = `https://example.com/${formData.channel.toLowerCase().replace(/\s+/g, '-')}`
      }

      const requestBody: BrainAPIRequest = {
        url: url || 'https://example.com',
        goals: goals,
        platform: formData.channel || 'Instagram Ads',
      }

      console.log('Sending request to Brain API')
      console.log('Request body:', requestBody)

      const data = await postToBrain<BrainAPIResponse>('/api/brain', requestBody)
      console.log('Success response:', data)
      setResult(data)
    } catch (err) {
      console.error('Error in handleSubmit:', err)
      let errorMessage = 'AI analysis failed. Please try again.'
      
      if (err instanceof Error) {
        const errorMsg = err.message.toLowerCase()
        if (errorMsg.includes('failed to fetch') || errorMsg.includes('networkerror') || errorMsg.includes('network request failed')) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection and ensure the Next.js development server is running. If you are in development, make sure to run `npm run dev`.'
        } else if (errorMsg.includes('timeout')) {
          errorMessage = err.message
        } else if (errorMsg.includes('cors')) {
          errorMessage = 'CORS error: The server is not allowing requests from this origin.'
        } else if (errorMsg.includes('api error')) {
          errorMessage = err.message
        } else {
          errorMessage = err.message || 'An unexpected error occurred. Please try again.'
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
        {/* Animated Background Lights */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900 to-black p-6 sm:p-8 md:p-10 text-white shadow-2xl">
          <button
            onClick={() => {
              setResult(null)
              onClose()
            }}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full p-2 hover:bg-white/10 transition-all hover:scale-110 z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              {config.title} - Results
            </h2>
            <div className="flex flex-wrap gap-3">
              {result.score !== undefined && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                  Score: {result.score}
                </div>
              )}
              {result.aiConfidence !== undefined && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  AI Confidence: {result.aiConfidence}%
                </div>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-4">
            {/* Display new response format */}
            {result.mainIssues && result.mainIssues.length > 0 ? (
              <div className="space-y-4">
                {/* Main Issues */}
                {result.mainIssues && result.mainIssues.length > 0 && (
                  <div className="rounded-2xl border-2 border-red-500/20 bg-slate-800 p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-red-300">Main Issues</h3>
                    <ul className="space-y-2">
                      {result.mainIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-200">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="rounded-2xl border-2 border-blue-500/20 bg-slate-800 p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-blue-300">Suggestions</h3>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-200">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Wins */}
                {result.quickWins && result.quickWins.length > 0 && (
                  <div className="rounded-2xl border-2 border-green-500/20 bg-slate-800 p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-green-300">Quick Wins</h3>
                    <ul className="space-y-2">
                      {result.quickWins.map((win, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-200">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-purple-500/20 bg-slate-800 p-5 sm:p-6">
                <div className="text-sm sm:text-base text-gray-200">
                  No detailed results available.
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                // Format result for download
                let content = `# ${config.title}\n\n`
                content += `Score: ${result.score}\n`
                content += `AI Confidence: ${result.aiConfidence}%\n\n`
                
                if (result.mainIssues && result.mainIssues.length > 0) {
                  content += `## Main Issues\n\n${result.mainIssues.join('\n')}\n\n`
                }
                if (result.suggestions && result.suggestions.length > 0) {
                  content += `## Suggestions\n\n${result.suggestions.join('\n')}\n\n`
                }
                if (result.quickWins && result.quickWins.length > 0) {
                  content += `## Quick Wins\n\n${result.quickWins.join('\n')}\n\n`
                }
                
                const blob = new Blob([content], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${config.title.toLowerCase().replace(/\s+/g, '-')}-results.md`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="group relative flex-1 inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Download Results</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
            <button
              onClick={() => {
                setResult(null)
                onClose()
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-2xl border-2 border-purple-500/40 bg-slate-800 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:border-purple-500/60 hover:bg-slate-700 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
      {/* Animated Background Lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-2xl rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900 to-black p-6 sm:p-8 md:p-10 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
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
            {config.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">Fill out the form below to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {config.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-200">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                >
                  <option value="" className="bg-white text-gray-900">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-gray-900">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[120px] sm:min-h-[140px] resize-y"
                  required
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex-1 inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Analyze with AI</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 hover:scale-105"
            >
              Cancel
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-xl bg-red-900/50 border-2 border-red-500 p-4 text-red-200 text-sm sm:text-base">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}


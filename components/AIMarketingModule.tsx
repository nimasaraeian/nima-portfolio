'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

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
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  if (!config) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // API base URL - use environment variable or default to FastAPI backend
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
      
      let requestBody: any
      let apiEndpoint: string

      // Special handling for Behavioral DeepScan - use FastAPI format
      if (moduleId === 'deepscan') {
        apiEndpoint = `${API_BASE_URL}/api/brain`
        requestBody = {
          mode: 'behavioral_deepscan',
          input: {
            industry: formData.industry || 'Other',
            city: formData.city || 'Istanbul',
            audience: formData.target_audience || '',
            analysis: formData.query || '',
          },
        }
      } else {
        // Other modules use the existing format
        apiEndpoint = process.env.NEXT_PUBLIC_API_URL || '/api/brain'
        
        // Build query based on module
        let query = formData.query
        if (moduleId === 'market') {
          query = `I need market intelligence for my ${formData.industry} in ${formData.city} using ${formData.channel}. ${formData.query}`
        } else if (moduleId === 'content') {
          query = `I need AI-generated content for my ${formData.industry} in ${formData.city} for ${formData.channel}. ${formData.query}`
        } else if (moduleId === 'conversion') {
          query = `I need conversion and funnel architecture help for my ${formData.industry} in ${formData.city} on ${formData.channel}. ${formData.query}`
        } else if (moduleId === 'automation') {
          query = `I need automation setup for my ${formData.industry} in ${formData.city} using ${formData.channel}. ${formData.query}`
        }

        requestBody = {
          role: 'ai_marketing_strategist',
          locale: 'tr-TR',
          city: formData.city || 'Istanbul',
          industry: formData.industry || 'Other',
          channel: formData.channel || 'Instagram Ads',
          query: query,
        }
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'AI analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-black/90 p-8 text-white">
          <button
            onClick={() => {
              setResult(null)
              onClose()
            }}
            className="absolute left-4 top-4 rounded-full p-2 hover:bg-white/10 transition"
          >
            <X size={24} />
          </button>

          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-2">{config.title} - Results</h2>
            {result.quality_score !== undefined && (
              <div className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold">
                Quality Score: {result.quality_score}/5
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            {/* Handle structured response from FastAPI (for deepscan) */}
            {result.summary ? (
              <div className="space-y-6 text-gray-200 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Summary</h3>
                  <p className="whitespace-pre-wrap">{result.summary}</p>
                </div>
                
                {result.segments && result.segments.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Segments</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.segments.map((segment: string, idx: number) => (
                        <li key={idx}>{segment}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.barriers && result.barriers.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Barriers</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.barriers.map((barrier: string, idx: number) => (
                        <li key={idx}>{barrier}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.triggers && result.triggers.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Triggers</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.triggers.map((trigger: string, idx: number) => (
                        <li key={idx}>{trigger}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Recommendations</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.recommendations.map((rec: string, idx: number) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              // Handle simple text response (for other modules or fallback)
              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                {result.result || result.content || result.response || 'No results available.'}
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                // Format result for download
                let content = `# ${config.title}\n\n`
                if (result.summary) {
                  content += `## Summary\n\n${result.summary}\n\n`
                  if (result.segments) content += `## Segments\n\n${result.segments.map((s: string) => `- ${s}`).join('\n')}\n\n`
                  if (result.barriers) content += `## Barriers\n\n${result.barriers.map((b: string) => `- ${b}`).join('\n')}\n\n`
                  if (result.triggers) content += `## Triggers\n\n${result.triggers.map((t: string) => `- ${t}`).join('\n')}\n\n`
                  if (result.recommendations) content += `## Recommendations\n\n${result.recommendations.map((r: string) => `- ${r}`).join('\n')}\n\n`
                } else {
                  content += result.result || result.content || result.response || ''
                }
                
                const blob = new Blob([content], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${config.title.toLowerCase().replace(/\s+/g, '-')}-results.md`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Download Results
            </button>
            <button
              onClick={() => {
                setResult(null)
                onClose()
              }}
              className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-black/90 p-8 text-white">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-full p-2 hover:bg-white/10 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-semibold mb-6">{config.title}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-sm font-semibold">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                  required
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="bg-black text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none min-h-[120px]"
                  required
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  required
                />
              )}
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                'Analyze with AI'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-500/20 border border-red-500/50 p-4 text-red-300 text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}


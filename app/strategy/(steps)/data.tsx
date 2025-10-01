'use client'

import React, { useState } from 'react'
import FormCard from '@/components/FormCard'
import { useStrategyStore } from '@/app/stores/strategy'

export default function DataStep() {
  const dataSources = useStrategyStore((s) => s.dataSources)
  const setDataSources = useStrategyStore((s) => s.setDataSources)
  const setInsightsReport = useStrategyStore((s) => s.setInsightsReport)
  const [loading, setLoading] = useState(false)

  const fetchAISuggestions = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/ai/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: useStrategyStore.getState().foundation.industry,
          geography: useStrategyStore.getState().foundation.geography,
          seedKeywords: dataSources.seedKeywords,
          competitors: dataSources.competitors,
        }),
      })
      const json = await res.json()
      setInsightsReport(json)
    } finally {
      setLoading(false)
    }
  }

  const updateList = (key: 'seedKeywords' | 'regions') => (val: string) => {
    const list = val.split(',').map((v) => v.trim()).filter(Boolean)
    setDataSources({ [key]: list } as any)
  }

  const updateCompetitors = (val: string) => {
    const list = val
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, url] = line.split(',').map((x) => x.trim())
        return { name, url }
      })
    setDataSources({ competitors: list })
  }

  return (
    <div className="space-y-6">
      <FormCard title="Data Sources & Market" helper="Add sources, competitors, keywords and regions.">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-sm text-gray-300">Website URL</span>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={dataSources.websiteUrl ?? ''}
              onChange={(e) => setDataSources({ websiteUrl: e.target.value })}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-gray-300">GA4 Enabled?</span>
            <select
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={dataSources.ga4 ? 'yes' : 'no'}
              onChange={(e) => setDataSources({ ga4: e.target.value === 'yes' })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-gray-300">Socials (Instagram, TikTok, LinkedIn)</span>
            <input
              placeholder="instagram.com/..., tiktok.com/@..., linkedin.com/company/..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={[dataSources.socials?.instagram, dataSources.socials?.tiktok, dataSources.socials?.linkedin].filter(Boolean).join(', ')}
              onChange={(e) => {
                const parts = e.target.value.split(',').map((v) => v.trim())
                setDataSources({ socials: { instagram: parts[0], tiktok: parts[1], linkedin: parts[2] } })
              }}
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-gray-300">Competitors (one per line: name, url)</span>
            <textarea
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              rows={4}
              value={dataSources.competitors.map((c) => `${c.name}${c.url ? `, ${c.url}` : ''}`).join('\n')}
              onChange={(e) => updateCompetitors(e.target.value)}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-gray-300">Seed Keywords (comma-separated)</span>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={dataSources.seedKeywords.join(', ')}
              onChange={(e) => updateList('seedKeywords')(e.target.value)}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-gray-300">Regions (comma-separated)</span>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={dataSources.regions.join(', ')}
              onChange={(e) => updateList('regions')(e.target.value)}
            />
          </label>
        </div>
      </FormCard>

      <FormCard
        title="AI Suggestions"
        helper="Generate initial personas & competitor notes."
        actions={
          <button
            onClick={fetchAISuggestions}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
          >
            {loading ? 'Generating…' : 'Fetch AI suggestions'}
          </button>
        }
      >
        <div className="text-sm text-gray-400">Results will populate in later steps (personas, insights).</div>
      </FormCard>
    </div>
  )
}



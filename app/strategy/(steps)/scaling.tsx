'use client'

import React from 'react'
import FormCard from '@/components/FormCard'
import { useStrategyStore } from '@/app/stores/strategy'

export default function ScalingStep() {
  const scale = useStrategyStore((s) => s.scalePlan)
  const setScale = useStrategyStore((s) => s.setScalePlan)

  const updateList = (key: 'newMarkets' | 'languages' | 'automationHooks') => (val: string) => {
    const list = val.split(',').map((v) => v.trim()).filter(Boolean)
    setScale({ [key]: list } as any)
  }

  return (
    <div className="space-y-6">
      <FormCard title="Scaling & Automation" helper="Plan new markets, languages and automation hooks.">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-sm text-gray-300">New Markets (comma-separated)</span>
            <input className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" value={scale.newMarkets.join(', ')} onChange={(e) => updateList('newMarkets')(e.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-gray-300">Languages (comma-separated)</span>
            <input className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" value={scale.languages.join(', ')} onChange={(e) => updateList('languages')(e.target.value)} />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-gray-300">Automation Hooks (comma-separated)</span>
            <input className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" value={scale.automationHooks.join(', ')} onChange={(e) => updateList('automationHooks')(e.target.value)} />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-gray-300">LTV Notes</span>
            <textarea className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" rows={3} value={scale.ltvNotes ?? ''} onChange={(e) => setScale({ ltvNotes: e.target.value })} />
          </label>
        </div>
      </FormCard>
    </div>
  )
}



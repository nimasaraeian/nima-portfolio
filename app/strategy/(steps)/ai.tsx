'use client'

import React from 'react'
import FormCard from '@/components/FormCard'
import { useStrategyStore } from '@/app/stores/strategy'

const MODULES = [
  { key: 'chatbot', title: 'Chatbot' },
  { key: 'predictive', title: 'Predictive Scoring' },
  { key: 'personalization', title: 'Personalization' },
  { key: 'programmatic', title: 'Programmatic Ads' },
  { key: 'aiContent', title: 'AI Content' },
] as const

export default function AIStep() {
  const aiPlan = useStrategyStore((s) => s.aiPlan)
  const setAIPlan = useStrategyStore((s) => s.setAIPlan)

  const toggle = (key: string) => {
    const exists = aiPlan.find((i) => i.key === key)
    if (exists) {
      const updated = aiPlan.map((i) => (i.key === key ? { ...i, enabled: !i.enabled } : i))
      setAIPlan(updated)
    } else {
      setAIPlan([
        ...aiPlan,
        { key: key as any, enabled: true, prerequisites: ['Tracking', 'CRM'], expectedImpactNote: 'Improves conversion rates', complexity: 'medium' },
      ])
    }
  }

  return (
    <div className="space-y-6">
      <FormCard title="AI Modules" helper="Toggle modules; each shows prerequisites and expected impact.">
        <div className="grid md:grid-cols-2 gap-4">
          {MODULES.map((m) => {
            const item = aiPlan.find((i) => i.key === m.key)
            const on = !!item?.enabled
            return (
              <div key={m.key} className={`p-4 rounded-xl border ${on ? 'border-teal-400 bg-teal-600/10' : 'border-white/10 bg-black/30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{m.title}</div>
                  <button onClick={() => toggle(m.key)} className={`px-3 py-1 rounded text-sm ${on ? 'bg-teal-600 text-white' : 'bg-white/10 text-gray-300'}`}>
                    {on ? 'Enabled' : 'Enable'}
                  </button>
                </div>
                <div className="text-sm text-gray-400">Prerequisites: {item?.prerequisites?.join(', ') ?? 'Tracking, CRM'}</div>
                <div className="text-sm text-gray-400">Impact: {item?.expectedImpactNote ?? 'Improves conversion rates'}</div>
                <div className="text-sm text-gray-400">Complexity: {item?.complexity ?? 'medium'}</div>
              </div>
            )
          })}
        </div>
      </FormCard>
    </div>
  )
}



'use client'

import React, { useMemo } from 'react'
import FormCard from '@/components/FormCard'
import { useStrategyStore } from '@/app/stores/strategy'
import type { Objective } from '@/app/types/strategyV2'

const ALL_OBJECTIVES: Objective[] = ['Awareness', 'Leads', 'Sales', 'Retention']

export default function FoundationStep() {
  const foundation = useStrategyStore((s) => s.foundation)
  const setFoundation = useStrategyStore((s) => s.setFoundation)

  const objectiveMap = useMemo(() => {
    const map = new Map<Objective, number>()
    foundation.objectives.forEach((o) => map.set(o.type, o.priority))
    return map
  }, [foundation.objectives])

  const updateObjective = (type: Objective, priority: number) => {
    const others = foundation.objectives.filter((o) => o.type !== type)
    setFoundation({ objectives: [...others, { type, priority: priority as 1 | 2 | 3 | 4 }] })
  }

  return (
    <div className="space-y-6">
      <FormCard title="Business Basics" helper="Enter core business details.">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-sm text-gray-300">Business Name</span>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={foundation.businessName}
              onChange={(e) => setFoundation({ businessName: e.target.value })}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-gray-300">Industry</span>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={foundation.industry}
              onChange={(e) => setFoundation({ industry: e.target.value })}
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-gray-300">Geography (comma-separated country codes)</span>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={foundation.geography.join(', ')}
              onChange={(e) => setFoundation({ geography: e.target.value.split(',').map((v) => v.trim()).filter(Boolean) })}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-gray-300">Monthly Budget (USD)</span>
            <input
              type="number"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              value={foundation.monthlyBudgetUSD}
              onChange={(e) => setFoundation({ monthlyBudgetUSD: Number(e.target.value || 0) })}
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-gray-300">Unique Value</span>
            <textarea
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              rows={3}
              value={foundation.uniqueValue}
              onChange={(e) => setFoundation({ uniqueValue: e.target.value })}
            />
          </label>
        </div>
      </FormCard>

      <FormCard title="Objectives" helper="Set priorities (1 highest → 4 lowest).">
        <div className="grid md:grid-cols-2 gap-4">
          {ALL_OBJECTIVES.map((obj) => {
            const p = objectiveMap.get(obj) ?? 3
            return (
              <div key={obj} className="flex items-center justify-between gap-4 bg-black/30 border border-white/10 rounded-lg px-4 py-3">
                <div className="text-sm">
                  <div className="font-medium">{obj}</div>
                  <div className="text-gray-400">Priority: {p}</div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={p}
                  onChange={(e) => updateObjective(obj, Number(e.target.value))}
                />
              </div>
            )
          })}
        </div>
      </FormCard>
    </div>
  )
}



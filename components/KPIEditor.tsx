'use client'

import React from 'react'
import { useStrategyStore } from '@/app/stores/strategy'

const METRICS = ['Reach', 'CTR', 'CPL', 'CVR', 'ROAS'] as const

export default function KPIEditor() {
  const optimization = useStrategyStore((s) => s.optimization)
  const setOptimization = useStrategyStore((s) => s.setOptimization)

  const setTarget = (metric: string, target: number) => {
    const others = optimization.kpis.filter((k) => k.metric !== metric)
    setOptimization({ kpis: [...others, { metric: metric as any, target }] })
  }

  const addRule = () => {
    setOptimization({ rules: [...optimization.rules, { condition: '', action: '' }] })
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {METRICS.map((m) => {
          const current = optimization.kpis.find((k) => k.metric === m)?.target ?? 0
          return (
            <div key={m} className="bg-black/30 border border-white/10 rounded-lg p-4">
              <div className="font-medium mb-2">{m}</div>
              <input
                type="number"
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2"
                value={current}
                onChange={(e) => setTarget(m, Number(e.target.value || 0))}
              />
            </div>
          )
        })}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Optimization Rules</div>
          <button onClick={addRule} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm">Add Rule</button>
        </div>
        <div className="space-y-3">
          {optimization.rules.map((r, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3">
              <input
                placeholder="Condition"
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2"
                value={r.condition}
                onChange={(e) => {
                  const list = [...optimization.rules]
                  list[i] = { ...list[i], condition: e.target.value }
                  setOptimization({ rules: list })
                }}
              />
              <input
                placeholder="Action"
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2"
                value={r.action}
                onChange={(e) => {
                  const list = [...optimization.rules]
                  list[i] = { ...list[i], action: e.target.value }
                  setOptimization({ rules: list })
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



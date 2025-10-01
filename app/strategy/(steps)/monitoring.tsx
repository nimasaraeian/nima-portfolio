'use client'

import React from 'react'
import FormCard from '@/components/FormCard'
import KPIEditor from '@/components/KPIEditor'
import { useStrategyStore } from '@/app/stores/strategy'

export default function MonitoringStep() {
  const setOptimization = useStrategyStore((s) => s.setOptimization)

  const autoRules = async () => {
    const res = await fetch('/api/ai/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kpis: useStrategyStore.getState().optimization.kpis }),
    })
    const json = await res.json()
    setOptimization(json)
  }

  return (
    <div className="space-y-6">
      <FormCard title="KPI Targets & Rules" helper="Set KPI targets and define automation rules."
        actions={
          <button onClick={autoRules} className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white">Auto-generate Rules</button>
        }
      >
        <KPIEditor />
      </FormCard>
    </div>
  )
}



'use client'

import React, { useMemo, useState } from 'react'
import { useStrategyStore } from '@/app/stores/strategy'

const ALL_CHANNELS = ['GoogleAds', 'Instagram', 'TikTok', 'LinkedIn', 'Email', 'SEO'] as const

export default function BudgetAllocator() {
  const playbook = useStrategyStore((s) => s.campaignPlaybook)
  const setPlaybook = useStrategyStore((s) => s.setCampaignPlaybook)
  const foundation = useStrategyStore((s) => s.foundation)

  const [selected, setSelected] = useState<string[]>(
    playbook.allocation.length ? playbook.allocation.map((a) => a.channel) : ['GoogleAds', 'Instagram', 'SEO']
  )

  const channelToBudget = useMemo(() => {
    const map = new Map<string, number>()
    playbook.allocation.forEach((a) => map.set(a.channel, a.budgetUSD))
    return map
  }, [playbook.allocation])

  const updateBudget = (channel: string, budgetUSD: number) => {
    const others = playbook.allocation.filter((a) => a.channel !== channel)
    setPlaybook({ allocation: [...others, { channel: channel as any, budgetUSD }] })
  }

  const toggleChannel = (c: string) => {
    const next = selected.includes(c) ? selected.filter((x) => x !== c) : [...selected, c]
    setSelected(next)
    const filtered = playbook.allocation.filter((a) => next.includes(a.channel))
    setPlaybook({ allocation: filtered })
  }

  const autoAllocate = async () => {
    const res = await fetch('/api/ai/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        monthlyBudgetUSD: foundation.monthlyBudgetUSD,
        objectives: foundation.objectives,
        channels: selected,
      }),
    })
    const json = await res.json()
    setPlaybook(json)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ALL_CHANNELS.map((c) => (
          <button
            key={c}
            onClick={() => toggleChannel(c)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selected.includes(c) ? 'bg-teal-600 text-white border-teal-400' : 'border-white/10 text-gray-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {selected.map((c) => (
          <div key={c} className="bg-black/30 border border-white/10 rounded-lg p-4">
            <div className="mb-2 font-medium">{c}</div>
            <input
              type="range"
              min={0}
              max={Math.max(10000, foundation.monthlyBudgetUSD || 1000)}
              step={50}
              value={channelToBudget.get(c) ?? 0}
              onChange={(e) => updateBudget(c, Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-400 mt-1">${channelToBudget.get(c) ?? 0} / month</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={autoAllocate} className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white">
          Auto-allocate budget
        </button>
      </div>
    </div>
  )
}



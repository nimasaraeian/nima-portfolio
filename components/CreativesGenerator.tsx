'use client'

import React, { useMemo, useState } from 'react'
import { useStrategyStore } from '@/app/stores/strategy'

export default function CreativesGenerator() {
  const playbook = useStrategyStore((s) => s.campaignPlaybook)
  const setPlaybook = useStrategyStore((s) => s.setCampaignPlaybook)
  const personas = useStrategyStore((s) => s.insightsReport.personas)

  const channels = useMemo(() => playbook.allocation.map((a) => a.channel), [playbook.allocation])
  const [channel, setChannel] = useState<string>(channels[0] ?? 'GoogleAds')
  const [persona, setPersona] = useState<string>(personas[0]?.name ?? '')
  const [offer, setOffer] = useState('Limited-time offer')
  const [tone, setTone] = useState('confident')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai/creatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, persona: persona || 'Generic', offer, tone }),
      })
      const drafts = await res.json()
      const nextAlloc = playbook.allocation.map((a) =>
        a.channel === channel
          ? { ...a, creatives: drafts }
          : a
      )
      setPlaybook({ allocation: nextAlloc })
    } finally {
      setLoading(false)
    }
  }

  if (!channels.length) {
    return <div className="text-sm text-gray-400">Select at least one channel above to generate creatives.</div>
  }

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-4 gap-3">
        <select className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" value={channel} onChange={(e) => setChannel(e.target.value)}>
          {channels.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" placeholder="Persona name" value={persona} onChange={(e) => setPersona(e.target.value)} />
        <input className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" placeholder="Offer" value={offer} onChange={(e) => setOffer(e.target.value)} />
        <input className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" placeholder="Tone" value={tone} onChange={(e) => setTone(e.target.value)} />
      </div>
      <div>
        <button onClick={generate} disabled={loading} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50">
          {loading ? 'Generating…' : 'Generate Creatives'}
        </button>
      </div>

      {playbook.allocation.find((a) => a.channel === channel)?.creatives?.length ? (
        <div className="grid md:grid-cols-2 gap-3">
          {playbook.allocation
            .find((a) => a.channel === channel)!
            .creatives!.map((c, i) => (
              <div key={i} className="bg-black/30 border border-white/10 rounded-lg p-3">
                <div className="font-medium mb-1">{c.headline}</div>
                <div className="text-sm text-gray-300 mb-2">{c.primaryText}</div>
                <div className="text-xs text-gray-400">CTA: {c.cta}</div>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  )
}



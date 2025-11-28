'use client'

import { useState } from 'react'
import AIMarketingModule from './AIMarketingModule'

interface ModuleInteractivityProps {
  moduleId: string
  icon: React.ReactNode
  title: string
  bullets: string[]
  footnote?: string
}

export default function ModuleInteractivity({ moduleId, icon, title, bullets, footnote }: ModuleInteractivityProps) {
  const [showModule, setShowModule] = useState(false)

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10 cursor-pointer" onClick={() => setShowModule(true)}>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/20 bg-black/40 p-2 text-white">{icon}</div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-gray-300">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
        {footnote ? <p className="mt-4 text-xs text-gray-400">{footnote}</p> : null}
        <button className="mt-6 w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          Start {title}
        </button>
      </div>

      {showModule && <AIMarketingModule moduleId={moduleId} onClose={() => setShowModule(false)} />}
    </>
  )
}


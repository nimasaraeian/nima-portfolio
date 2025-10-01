'use client'

import React from 'react'
import FormCard from '@/components/FormCard'
import { useStrategyStore } from '@/app/stores/strategy'
import { download, toMarkdown } from '@/lib/export'

export default function SummaryStep() {
  const state = useStrategyStore((s) => s)

  const exportJSON = () => {
    download('strategy.json', JSON.stringify(state, null, 2), 'application/json')
  }
  const exportMD = () => {
    download('strategy.md', toMarkdown(state), 'text/markdown')
  }

  return (
    <div className="space-y-6">
      <FormCard title="Export" helper="Download your strategy as JSON or Markdown."
        actions={
          <div className="flex gap-3">
            <button onClick={exportMD} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Export Markdown</button>
            <button onClick={exportJSON} className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white">Export JSON</button>
          </div>
        }
      >
        <div className="text-sm text-gray-400">PDF/Docx export can be added with a styled print view later.</div>
      </FormCard>
    </div>
  )
}



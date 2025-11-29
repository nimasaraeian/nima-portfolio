'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const AIMarketingWizard = dynamic(() => import('./AIMarketingWizard'), {
  ssr: false,
})

export default function AIMarketingWizardTrigger() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowWizard(true)}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
      >
        <span className="relative z-10">Try AI Marketing OS Analysis</span>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
      </button>

      {showWizard && <AIMarketingWizard onClose={() => setShowWizard(false)} />}
    </>
  )
}


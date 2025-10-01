'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Stepper from '@/components/Stepper'
import FoundationStep from './(steps)/foundation'
import DataStep from './(steps)/data'
import AIStep from './(steps)/ai'
import CampaignStep from './(steps)/campaign'
import MonitoringStep from './(steps)/monitoring'
import ScalingStep from './(steps)/scaling'
import SummaryStep from './(steps)/summary'
import { useStrategyStore } from '@/app/stores/strategy'

const STEPS = ['Foundation', 'Data', 'AI', 'Campaign', 'Monitoring', 'Scaling', 'Summary']

export default function StrategyPage() {
  const [current, setCurrent] = useState(0)
  const setFoundation = useStrategyStore((s) => s.setFoundation)
  const setData = useStrategyStore((s) => s.setDataSources)

  // Demo prefill: ?demo=sapanca
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('demo') === 'sapanca') {
      setFoundation({
        industry: 'Luxury Real Estate (Villas)',
        geography: ['TR', 'IR', 'QA', 'KW', 'AE'],
        objectives: [
          { type: 'Leads', priority: 1 },
          { type: 'Sales', priority: 2 },
          { type: 'Awareness', priority: 3 },
          { type: 'Retention', priority: 4 },
        ],
      })
      setData({ seedKeywords: ['buy villa in sapanca', 'خرید ویلا در ساپانجا', 'sapanca investment'] })
      }
    }
  }, [setFoundation, setData])

  const render = useMemo(() => {
    switch (current) {
      case 0:
        return <FoundationStep />
      case 1:
        return <DataStep />
      case 2:
        return <AIStep />
      case 3:
        return <CampaignStep />
      case 4:
        return <MonitoringStep />
      case 5:
        return <ScalingStep />
      default:
        return <SummaryStep />
    }
  }, [current])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-6">
          <div className="text-2xl font-bold mb-2">AI Marketing Strategy</div>
          <Stepper steps={STEPS} current={current} onSelect={setCurrent} />
        </div>
        {render}
      </div>
    </div>
  )
}

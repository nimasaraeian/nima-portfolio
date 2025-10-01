'use client'

import React from 'react'
import FormCard from '@/components/FormCard'
import BudgetAllocator from '@/components/BudgetAllocator'
import CreativesGenerator from '@/components/CreativesGenerator'
import { useStrategyStore } from '@/app/stores/strategy'

export default function CampaignStep() {
  const playbook = useStrategyStore((s) => s.campaignPlaybook)
  const setPlaybook = useStrategyStore((s) => s.setCampaignPlaybook)

  return (
    <div className="space-y-6">
      <FormCard title="Channels & Budget" helper="Pick channels and allocate monthly budget.">
        <BudgetAllocator />
      </FormCard>

      <FormCard title="Rationale" helper="Add notes explaining allocation choices.">
        <textarea
          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
          rows={3}
          value={playbook.rationale.join('\n')}
          onChange={(e) => setPlaybook({ rationale: e.target.value.split('\n').filter(Boolean) })}
        />
      </FormCard>

      <FormCard title="Creatives" helper="Generate creative drafts per channel & persona.">
        <CreativesGenerator />
      </FormCard>
    </div>
  )
}



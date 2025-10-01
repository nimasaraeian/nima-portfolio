'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultStrategyState, StrategyState } from '@/app/types/strategyV2'

type StrategyActions = {
  setFoundation: (update: Partial<StrategyState['foundation']>) => void
  setDataSources: (update: Partial<StrategyState['dataSources']>) => void
  setInsightsReport: (update: Partial<StrategyState['insightsReport']>) => void
  setAIPlan: (items: StrategyState['aiPlan']) => void
  setCampaignPlaybook: (update: Partial<StrategyState['campaignPlaybook']>) => void
  setOptimization: (update: Partial<StrategyState['optimization']>) => void
  setScalePlan: (update: Partial<StrategyState['scalePlan']>) => void
  reset: () => void
}

export const useStrategyStore = create<StrategyState & StrategyActions>()(
  persist(
    (set) => ({
      ...defaultStrategyState,
      setFoundation: (update) => set((s) => ({ foundation: { ...s.foundation, ...update } })),
      setDataSources: (update) => set((s) => ({ dataSources: { ...s.dataSources, ...update } })),
      setInsightsReport: (update) => set((s) => ({ insightsReport: { ...s.insightsReport, ...update } })),
      setAIPlan: (items) => set(() => ({ aiPlan: items })),
      setCampaignPlaybook: (update) => set((s) => ({ campaignPlaybook: { ...s.campaignPlaybook, ...update } })),
      setOptimization: (update) => set((s) => ({ optimization: { ...s.optimization, ...update } })),
      setScalePlan: (update) => set((s) => ({ scalePlan: { ...s.scalePlan, ...update } })),
      reset: () => set(() => ({ ...defaultStrategyState })),
    }),
    {
      name: 'strategy-state-v1',
      partialize: (state) => state,
      version: 1,
      skipHydration: false,
    }
  )
)



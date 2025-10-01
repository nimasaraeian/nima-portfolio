import { StrategyState } from '@/app/types/strategyV2'

export function toMarkdown(state: StrategyState): string {
  const lines: string[] = []
  lines.push(`# AI Marketing Strategy`)
  lines.push(`\n## Foundation`)
  lines.push(`- Business: ${state.foundation.businessName}`)
  lines.push(`- Industry: ${state.foundation.industry}`)
  lines.push(`- Geography: ${state.foundation.geography.join(', ')}`)
  lines.push(`- Budget (USD): ${state.foundation.monthlyBudgetUSD}`)
  lines.push(`- Unique Value: ${state.foundation.uniqueValue}`)
  lines.push(`- Objectives:`)
  state.foundation.objectives.forEach((o) => lines.push(`  - ${o.type} (p${o.priority})`))

  lines.push(`\n## Insights Report`)
  lines.push(`- Personas: ${state.insightsReport.personas.length}`)
  state.insightsReport.personas.forEach((p) => {
    lines.push(`  - ${p.name} (${p.ageRange}) → ${p.countries.join(', ')}`)
    lines.push(`    - Motivations: ${p.motivations.join(', ')}`)
    lines.push(`    - Pains: ${p.pains.join(', ')}`)
    lines.push(`    - Channels: ${p.preferredChannels.join(', ')}`)
  })
  lines.push(`- Competitor Notes:`)
  state.insightsReport.competitorNotes.forEach((n) => lines.push(`  - ${n}`))

  lines.push(`\n## AI Plan`)
  state.aiPlan.forEach((i) => lines.push(`- ${i.key}: ${i.enabled ? 'on' : 'off'} (${i.complexity}) → ${i.expectedImpactNote}`))

  lines.push(`\n## Campaign Playbook`)
  state.campaignPlaybook.allocation.forEach((a) => lines.push(`- ${a.channel}: $${a.budgetUSD}`))
  lines.push(`- Rationale:`)
  state.campaignPlaybook.rationale.forEach((r) => lines.push(`  - ${r}`))

  lines.push(`\n## Optimization`)
  lines.push(`- KPIs:`)
  state.optimization.kpis.forEach((k) => lines.push(`  - ${k.metric}: ${k.target}`))
  lines.push(`- Rules:`)
  state.optimization.rules.forEach((r) => lines.push(`  - IF ${r.condition} THEN ${r.action}`))

  lines.push(`\n## Scale Plan`)
  lines.push(`- New Markets: ${state.scalePlan.newMarkets.join(', ')}`)
  lines.push(`- Languages: ${state.scalePlan.languages.join(', ')}`)
  lines.push(`- Automation Hooks: ${state.scalePlan.automationHooks.join(', ')}`)

  return lines.join('\n')
}

export function download(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}



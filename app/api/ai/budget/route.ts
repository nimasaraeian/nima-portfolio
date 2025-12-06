import { mockBudgetAllocation } from '@/lib/ai'
import { jsonResponse } from '@/lib/jsonResponse'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json()
  const { monthlyBudgetUSD, objectives, channels } = body || {}
  const data = mockBudgetAllocation({ monthlyBudgetUSD, objectives, channels })
  return jsonResponse(data)
}



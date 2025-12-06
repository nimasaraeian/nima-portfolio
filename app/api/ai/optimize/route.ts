import { mockOptimize } from '@/lib/ai'
import { jsonResponse } from '@/lib/jsonResponse'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json()
  const { kpis, recentMetrics } = body || {}
  const data = mockOptimize({ kpis, recentMetrics })
  return jsonResponse(data)
}



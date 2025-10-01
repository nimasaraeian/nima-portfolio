import { NextResponse } from 'next/server'
import { mockOptimize } from '@/lib/ai'

export async function POST(req: Request) {
  const body = await req.json()
  const { kpis, recentMetrics } = body || {}
  const data = mockOptimize({ kpis, recentMetrics })
  return NextResponse.json(data)
}



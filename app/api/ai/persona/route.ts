import { NextResponse } from 'next/server'
import { mockPersonaInsights } from '@/lib/ai'

export async function POST(req: Request) {
  const body = await req.json()
  const { industry, geography, seedKeywords, competitors } = body || {}
  const data = mockPersonaInsights({ industry, geography, seedKeywords, competitors })
  return NextResponse.json(data)
}



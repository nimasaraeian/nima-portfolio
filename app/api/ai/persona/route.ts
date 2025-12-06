import { mockPersonaInsights } from '@/lib/ai'
import { jsonResponse } from '@/lib/jsonResponse'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json()
  const { industry, geography, seedKeywords, competitors } = body || {}
  const data = mockPersonaInsights({ industry, geography, seedKeywords, competitors })
  return jsonResponse(data)
}



import { mockCreatives } from '@/lib/ai'
import { jsonResponse } from '@/lib/jsonResponse'

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json()
  const { channel, persona, offer, tone } = body || {}
  const data = mockCreatives({ channel, persona, offer, tone })
  return jsonResponse(data)
}



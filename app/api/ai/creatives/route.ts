import { NextResponse } from 'next/server'
import { mockCreatives } from '@/lib/ai'

export async function POST(req: Request) {
  const body = await req.json()
  const { channel, persona, offer, tone } = body || {}
  const data = mockCreatives({ channel, persona, offer, tone })
  return NextResponse.json(data)
}



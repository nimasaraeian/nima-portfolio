import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'image-sitemap-seminars.xml')
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
    
    return new NextResponse(sitemapContent, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    return new NextResponse('Image sitemap not found', { status: 404 })
  }
}

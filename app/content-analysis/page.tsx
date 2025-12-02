import type { Metadata } from 'next'
import ContentAnalysisTool from '@/components/ContentAnalysisTool'

export const metadata: Metadata = {
  title: 'AI Content & Landing Page Analysis | Nima Saraeian',
  description: 'Get instant AI-powered insights to improve your content performance. Analyze landing pages, ads, and content pieces with actionable recommendations.',
  alternates: { canonical: 'https://nimasaraeian.com/content-analysis' },
}

export default function ContentAnalysisPage() {
  return <ContentAnalysisTool />
}











import type { Metadata } from 'next'
import { getCanonicalUrl } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'About Nima Saraeian | AI & Performance Marketing Strategist',
  description: 'AI & performance marketing strategist blending behavioral psychology, CRO, and human-centered design. Founder of Selphlyze & Contlyze.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
  openGraph: {
    title: 'About Nima Saraeian | AI & Performance Marketing Strategist',
    description: 'AI & performance marketing strategist blending behavioral psychology, CRO, and human-centered design. Founder of Selphlyze & Contlyze.',
    url: getCanonicalUrl('/about'),
    type: 'website',
    siteName: 'Nima Saraeian',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


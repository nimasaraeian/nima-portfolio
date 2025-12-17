import type { Metadata } from 'next'
import { getCanonicalUrl } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'Nima Saraeian | AI Marketing Background & Behavioral Marketing Experience',
  description: 'Learn about Nima Saraeian, AI Marketing Specialist with extensive background in behavioral marketing and strategic consulting. Founder of Selphlyze & Contlyze, combining AI, psychology, and marketing expertise.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
  openGraph: {
    title: 'About Nima Saraeian | AI Marketing Specialist & Behavioral Strategist',
    description: 'Learn about Nima Saraeian, AI Marketing Specialist and Behavioral Marketing Strategist. Founder of Selphlyze & Contlyze.',
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


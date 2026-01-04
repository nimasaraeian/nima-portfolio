import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Decision Brain Dashboard | Nima Saraeian',
  description: 'AI-powered decision diagnosis and recommendation tool',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nimasaraeian.com/ai-marketing/decision-brain',
  },
}

export default function DecisionBrainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}































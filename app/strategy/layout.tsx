import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Marketing Strategy Builder | Nima Saraeian',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StrategyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


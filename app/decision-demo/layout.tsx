import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Decision Demo | Nima Saraeian',
  description: 'Decision diagnosis tool demo',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nimasaraeian.com/decision-demo',
  },
}

export default function DecisionDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}



















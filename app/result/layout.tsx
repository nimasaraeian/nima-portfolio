import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strategy Result | Nima Saraeian',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nimasaraeian.com/result',
  },
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


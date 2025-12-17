import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit New Article | Nima Saraeian',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


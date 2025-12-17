import type { Metadata } from 'next'
import { getCanonicalUrl } from '@/app/lib/seo'

export const metadata: Metadata = {
  title: 'AI Marketing Projects | Case Studies, Dashboards & Marketing Experiments | Nima Saraeian',
  description: 'Explore AI Marketing Projects including case studies, marketing dashboards, and real-world experiments. See results from behavioral AI implementations, conversion optimization projects, and predictive marketing systems.',
  alternates: {
    canonical: getCanonicalUrl('/projects'),
  },
  openGraph: {
    title: 'AI Marketing Projects & Case Studies | Nima Saraeian',
    description: 'Explore AI marketing projects and case studies showcasing behavioral AI, conversion optimization, and predictive marketing systems.',
    url: getCanonicalUrl('/projects'),
    type: 'website',
    siteName: 'Nima Saraeian',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


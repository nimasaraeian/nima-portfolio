import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'AI Marketing Strategy | Hyper-Personalization & Behavioral AI Marketing Guide | Nima Saraeian',
  description:
    'AI Marketing Strategy guide covering hyper-personalization, behavioral AI marketing, and decision friction analysis. Learn how to build data-driven marketing systems that understand customer behavior.',
  alternates: {
    canonical: getCanonicalUrl('/ai-marketing'),
  },
  keywords: [
    'Behavioral DeepScan',
    'Cognitive Friction',
    'Decision Psychology',
    'AI Marketing',
    'Conversion Optimization',
    'Trust Score',
    'Emotional Clarity',
    'Behavioral Analytics',
    'Content Analysis',
    'AI Marketing Engine 2026',
    'NIMA AI Brain',
  ],
  openGraph: {
    title: 'AI Marketing Strategy | Hyper-Personalization & Behavioral AI Marketing Guide',
    description:
      'AI Marketing Strategy guide covering hyper-personalization, behavioral AI marketing, and decision friction analysis.',
    url: getCanonicalUrl('/ai-marketing'),
    siteName: 'Nima Saraeian',
    type: 'website',
    images: [
      {
        url: 'https://nimasaraeian.com/image/nima-bw.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Marketing Strategy Guide by Nima Saraeian',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Marketing Strategy | Hyper-Personalization & Behavioral AI Marketing Guide',
    description: 'AI Marketing Strategy guide covering hyper-personalization, behavioral AI marketing, and decision friction analysis.',
    images: ['https://nimasaraeian.com/image/nima-bw.jpg'],
  },
};

export default function AIMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Marketing Engine 2026 — Full Guide & NIMA AI Brain',
  description:
    'Discover how AI Marketing really works in 2026–2027. Explore behavioral data, conversion psychology, and the NIMA AI Brain — your own AI marketing engine.',
  alternates: {
    canonical: 'https://nimasaraeian.com/ai-marketing',
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
    title: 'AI Marketing Engine 2026 — Full Guide & NIMA AI Brain',
    description:
      'Discover how AI Marketing really works in 2026–2027. Explore behavioral data, conversion psychology, and the NIMA AI Brain — your own AI marketing engine.',
    url: 'https://nimasaraeian.com/ai-marketing',
    siteName: 'Nima Saraeian',
    type: 'website',
  },
};

export default function AIMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



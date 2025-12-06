import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Behavioral DeepScan – AI Cognitive Friction & Decision Psychology | Nima Saraeian',
  description:
    'Use Behavioral DeepScan, an AI-powered decision psychology engine, to analyze cognitive friction, trust, and emotional alignment in your landing pages, ads, and posts. Get scores, blockers, and actionable recommendations.',
  alternates: {
    canonical: 'https://nimasaraeian.com/ai-marketing/behavioral-deepscan',
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
  ],
  openGraph: {
    title: 'Behavioral DeepScan – AI Decision Psychology for Your Content',
    description:
      'Analyze cognitive friction, trust, and emotional alignment in your content. Get AI-powered scores, blockers, and actionable recommendations.',
    url: 'https://nimasaraeian.com/ai-marketing/behavioral-deepscan',
    siteName: 'Nima Saraeian',
    type: 'website',
  },
};

export default function BehavioralDeepScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


























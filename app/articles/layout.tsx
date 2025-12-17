import ArticleAIMarketingCTAWrapper from "@/components/ArticleAIMarketingCTAWrapper";
import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'AI Marketing Articles | Comprehensive Guides & Marketing Research | Nima Saraeian',
  description: 'Explore comprehensive AI Marketing Articles covering behavioral AI, conversion frameworks, predictive marketing strategies, and research-backed guides. In-depth marketing research and actionable frameworks for growth.',
  alternates: {
    canonical: getCanonicalUrl('/articles'),
  },
  openGraph: {
    title: 'AI Marketing Articles & Guides | Nima Saraeian',
    description: 'Deep guides on AI marketing, behavioral psychology, cognitive friction, and predictive analytics.',
    url: getCanonicalUrl('/articles'),
    type: 'website',
    siteName: 'Nima Saraeian',
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ArticleAIMarketingCTAWrapper />
    </>
  );
}

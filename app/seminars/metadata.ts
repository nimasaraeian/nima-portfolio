// app/seminars/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NIMA SARAEIAN International Seminars & Talks | AI Psychology Expert نیما سرائیان',
  description: 'View NIMA SARAEIAN (نیما سرائیان) international conference presentations on AI, Digital Psychology, Consumer Behavior, Psychometrics, and Innovation. Expert speaker in artificial intelligence, emotional intelligence, and behavioral analytics.',
  keywords: 'NIMA SARAEIAN, نیما سرائیان, AI psychology, digital psychology seminars, psychometric expert, consumer behavior speaker, artificial intelligence conference, emotional intelligence talks, behavioral analytics, neuromarketing, UX psychology, mental health technology, personality profiling, AI ethics, cognitive science',
  authors: [{ name: 'NIMA SARAEIAN نیما سرائیان' }],
  creator: 'NIMA SARAEIAN',
  publisher: 'NIMA SARAEIAN',
  openGraph: {
    title: 'NIMA SARAEIAN International Seminars & Conference Presentations',
    description: 'Dr. NIMA SARAEIAN (نیما سرائیان) presenting at international conferences on AI-powered psychology, digital consumer behavior, psychometric analysis, and innovation in mental health technology.',
    url: 'https://nimasaraeian.com/seminars',
    siteName: 'NIMA SARAEIAN نیما سرائیان',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    images: [
      {
        url: 'https://nimasaraeian.com/image/nimasaraeian2.jpg',
        width: 1200,
        height: 630,
        alt: 'NIMA SARAEIAN presenting at international AI psychology conference',
      },
      {
        url: 'https://nimasaraeian.com/image/nimasaraeian3.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. NIMA SARAEIAN seminar on consumer behavior and psychometrics',
      },
      {
        url: 'https://nimasaraeian.com/image/nimasaraeian4.jpg',
        width: 1200,
        height: 630,
        alt: 'NIMA SARAEIAN keynote speech on emotional intelligence and AI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIMA SARAEIAN International Seminars نیما سرائیان',
    description: 'AI Psychology Expert NIMA SARAEIAN speaking at international conferences',
    images: ['https://nimasaraeian.com/image/nimasaraeian2.jpg'],
    creator: '@nimasaraeian',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nimasaraeian.com/seminars',
  },
};

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import { FaCircleCheck } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Nima Saraeian | AI Marketing Strategist',
  description: 'Official website of Nima Saraeian — AI Marketing Strategist, researcher, and founder of Selfflyzer and Contlyze.',
  keywords: 'Nima Saraeian, AI Marketing, Marketing Strategy, Selflyzer, Consumer Behavior, AI-Driven Marketing, Digital Marketing',
  alternates: {
    canonical: 'https://www.nimasaraeian.com',
  },
  openGraph: {
    title: 'Nima Saraeian — AI Marketing Strategist',
    description: 'Explore research, AI marketing strategies, and digital projects by Nima Saraeian.',
    url: 'https://www.nimasaraeian.com',
    siteName: 'Nima Saraeian',
    type: 'website',
    images: [
      {
        url: 'https://www.nimasaraeian.com/image/nima-pic.png',
        type: 'image/png',
        width: 1200,
        height: 1200,
        alt: 'Nima Saraeian - AI Marketing Strategist',
      },
      {
        url: 'https://www.nimasaraeian.com/preview.jpg',
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: 'Nima Saraeian - AI Marketing Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Saraeian — AI Marketing Strategist',
    description: 'Explore research, AI products, and digital marketing strategies.',
    images: [
      'https://www.nimasaraeian.com/image/nima-pic.png',
      'https://www.nimasaraeian.com/preview.jpg'
    ],
    creator: '@nimasaraeian',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const impactStatements = [
  'I design high-impact, AI-powered marketing systems that help businesses grow faster, understand their customers deeply, and scale with intelligent automation.',
  'For more than a decade, I’ve worked at the intersection of AI, marketing strategy, consumer psychology, and data science — building frameworks that turn complex behavioral data into clear, actionable growth decisions.',
  'As the founder of Selflyzer, I’ve developed advanced psychometric and predictive engines that decode emotional, cognitive, and behavioral patterns to power next-generation marketing and customer experience solutions.',
];

const focusAreas = [
  'Build AI-powered content systems',
  'Predict consumer behavior with data-driven insights',
  'Create intelligent marketing funnels that adapt in real time',
  'Automate operations, customer communication & lead generation',
  'Improve decision-making using AI-enhanced analytics',
];

const offerings = [
  {
    title: 'AI Marketing Strategy',
    description: 'Designing complete AI-driven marketing ecosystems and funnels that deliver measurable growth.',
  },
  {
    title: 'AI Content Intelligence',
    description: 'Building systems for automated content creation, optimization, and audience analysis across channels.',
  },
  {
    title: 'AI Consumer Behavior Analytics',
    description: 'Predicting customer motivations, patterns, and decisions using advanced behavioral and psychometric models.',
  },
  {
    title: 'AI Automation for Business',
    description: 'Deploying intelligent automation for lead generation, customer engagement, and operational efficiency.',
  },
  {
    title: 'AI Marketing for Beauty, Clinics & Health Tourism',
    description: 'High-performance strategies tailored to clinics and service-based businesses in Istanbul and worldwide.',
  },
];

const differentiators = [
  '12+ years of leadership in marketing, strategy, and digital transformation',
  'Founder of an AI psychometric platform powered by scientific behavioral models',
  'Expert in AI-driven automation for Instagram, YouTube, LinkedIn, and paid funnels',
  'Background in behavioral psychology and consumer insights',
  'Proven track record with clinics, beauty centers, agencies, and global startups',
];

const exploreLinks = [
  { label: 'View AI Marketing Projects', href: '/projects', description: 'Real-world case studies, automation systems, and AI-powered campaign designs.' },
  { label: 'Explore Research', href: '/research', description: 'Academic work on AI, digital psychology, and predictive behavioral models.' },
  { label: 'Read Articles', href: '/articles', description: 'Insights on AI marketing, automation, and emerging digital strategy trends.' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-black/60 to-black/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-4 pb-16 pt-20 sm:px-6 md:flex-row md:px-10 lg:gap-16 lg:px-12 lg:pt-24">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200/80">AI Marketing Strategist & Growth Consultant</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Nima Saraeian
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl">
              I build AI-powered marketing systems that are intelligent, measurable, and human-centered — accelerating growth with automation, psychometrics, and predictive analytics.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
              >
                Work With Me
              </Link>
              <Link
                href="/ai-marketing"
                className="w-full rounded-full border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Discover AI Solutions
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto max-w-xs overflow-hidden rounded-[48%] border border-white/20 bg-white/5 p-4 shadow-2xl">
              <Image
                src="/image/nima-pic.png"
                alt="Portrait of Nima Saraeian"
                width={320}
                height={420}
                className="h-auto w-full grayscale"
                priority
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 360px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="space-y-8">
          {impactStatements.map((statement) => (
            <p key={statement} className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              {statement}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Today, I help brands, clinics, startups, and global businesses:
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {focusAreas.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/40 p-4 shadow-inner transition hover:border-white/20">
                  <span className="mt-[2px] text-blue-300">
                    <FaCircleCheck aria-hidden size={18} />
                  </span>
                <span className="text-sm text-gray-200 sm:text-base" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                What I Do
              </h2>
              <p className="text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                I partner with leadership teams to integrate AI into marketing, growth, and operations — combining strategy, creativity, and deep technical execution.
              </p>
            </div>
            <div className="grid gap-4">
              {offerings.map(({ title, description }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 transition hover:border-white/25 hover:bg-white/10">
                  <h3 className="text-lg font-semibold text-white sm:text-xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300 sm:text-base" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Why Companies Work With Me
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {differentiators.map((point) => (
            <li key={point} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200 sm:text-base" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-white/10 bg-gradient-to-b from-black/80 to-black">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2">
            {exploreLinks.map(({ label, href, description }) => (
              <Link
                key={label}
                href={href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="flex h-full flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white sm:text-xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                      {label}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                      {description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-200 transition group-hover:text-blue-100">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Let’s build your AI-powered growth system.
            </h2>
            <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              If you’re ready to elevate your marketing with automation, predictive analytics, and intelligent customer experiences, let’s talk.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Contact Nima
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
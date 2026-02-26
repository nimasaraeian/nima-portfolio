import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import { FaCircleCheck } from 'react-icons/fa6';
import { getCanonicalUrl } from '@/app/lib/seo';
import { generateWebPageSchema } from '@/app/lib/structured-data';

export const metadata: Metadata = {
  title: 'AI Marketing & Performance Marketing Strategist | Behavioral Conversion',
  description: 'AI Marketing strategist specializing in performance marketing, behavioral psychology, and decision-based CRO. I design AI-powered systems that diagnose conversion friction and optimize user decisions.',
  keywords: 'Nima Saraeian, AI Marketing, Marketing Strategy, Selflyzer, Consumer Behavior, AI-Driven Marketing, Digital Marketing',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Nima Saraeian | AI Marketing Specialist & Behavioral Marketing Strategist',
    description: 'Nima Saraeian is an AI Marketing Specialist who builds AI-powered marketing systems that combine consumer psychology, data, and automation to predict behavior and drive measurable growth.',
    url: 'https://nimasaraeian.com',
    siteName: 'Nima Saraeian',
    type: 'website',
    images: [
      {
        url: 'https://nimasaraeian.com/nima-pic.png',
        type: 'image/png',
        width: 512,
        height: 512,
        alt: 'Nima Saraeian - AI Marketing Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Saraeian | AI Marketing Specialist & Behavioral Marketing Strategist',
    description: 'Nima Saraeian is an AI Marketing Specialist who builds AI-powered marketing systems that combine consumer psychology, data, and automation to predict behavior and drive measurable growth.',
    images: [
      'https://nimasaraeian.com/nima-pic.png'
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
  'I am an AI Marketing Specialist who designs high-impact, AI-powered marketing systems that help businesses grow faster, understand their customers on a deeper behavioral level, and scale with intelligent automation.',
  'For more than a decade, I\'ve worked at the intersection of AI marketing strategy, consumer psychology, and data science — building frameworks that turn complex behavioral data into clear, actionable growth decisions for founders, CMOs, and marketing teams.',
  'As the founder of Selphlyze, I\'ve developed advanced psychometric and predictive engines that decode emotional, cognitive, and behavioral patterns to power next-generation marketing, customer experience, and product decisions.',
];

const focusAreas = [
  {
    title: 'Build AI-powered content systems',
    description: 'Design multi-platform content engines that use generative AI and behavioral psychology to produce consistent, on-brand content at scale.',
  },
  {
    title: 'Predict consumer behavior with data-driven insights',
    description: 'Use psychometrics, AI models, and customer data to forecast intent, next actions, and segments with the highest growth potential.',
  },
  {
    title: 'Create intelligent marketing funnels that adapt in real time',
    description: 'Connect your website, ads, and CRM so every journey automatically adapts to user behavior, intent, and engagement.',
  },
  {
    title: 'Automate operations, customer communication & lead generation',
    description: 'Replace manual workflows with automation that nurtures leads, qualifies them, and routes them to sales with minimal human effort.',
  },
  {
    title: 'Improve decision-making using AI-enhanced analytics',
    description: '',
  },
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
  { label: 'AI Marketing Services', href: '/services', description: 'Comprehensive AI marketing strategy and conversion optimization services.' },
];

export default function Home() {
  const webPageSchema = generateWebPageSchema({
    name: "AI Marketing Specialist | Nima Saraeian",
    description: "AI Marketing Specialist who builds AI-powered marketing systems combining behavioral psychology, decision analysis, and automation.",
    url: getCanonicalUrl('/'),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    <main className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-black/60 to-black/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-4 pb-16 pt-20 sm:px-6 md:flex-row md:px-10 lg:gap-16 lg:px-12 lg:pt-24">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200/80">AI Marketing Specialist · Behavioral Marketing Strategist · Growth Consultant</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              AI Marketing & Performance Marketing Strategist
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl">
              I am an AI Marketing Specialist who builds AI-powered marketing systems that understand customers deeply, predict behavior, and turn insight into measurable growth — combining automation, psychometrics, and data-driven strategy. My approach focuses on <Link href="/services" className="underline text-blue-300 hover:text-blue-200">conversion optimization</Link> and <Link href="/articles/ai/cognitive-friction-ai-cro" className="underline text-blue-300 hover:text-blue-200">behavioral AI frameworks</Link> that transform hesitation into decisions.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
              >
                Work With Me
              </Link>
              <Link
                href="/services"
                className="w-full rounded-full border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                View AI Marketing Services
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

      {/* SELPHLYZE Section - Prominent Feature */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
        <div className="rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20 p-8 sm:p-12 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Image
                src="/image/SELPHLYZE_LOGO_HIGH_RES.png"
                alt="Selphlyze Logo"
                width={120}
                height={120}
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
              />
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-blue-300/90 mb-4">
              Cognitive & Emotional AI Platform
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              SELPHLYZE
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              AI-powered psychometric engine that analyzes personality signals, cognitive styles, emotional patterns, and aesthetic preferences to decode what truly motivates people beneath their visible behavior.
            </p>
            <p className="text-base text-gray-400 max-w-2xl mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Validated with 500+ participants across diverse cultures, Selphlyze combines behavioral psychology, AI modeling, and predictive analytics to transform human complexity into actionable marketing intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="https://www.selphlyze.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-center text-sm font-semibold text-white transition shadow-lg hover:shadow-blue-500/50"
              >
                Explore Selphlyze Platform
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto rounded-full border-2 border-blue-500/50 hover:border-blue-400 px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-blue-500/10"
              >
                Learn More About the Ecosystem
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Decision-Driven Performance Marketing with AI
          </h2>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Performance marketing has evolved beyond clicks, impressions, and CPA.
            Today, AI marketing systems must understand <strong>why users hesitate</strong>,
            <strong>where decision friction occurs</strong>, and <strong>how behavioral signals shape conversion</strong>.
          </p>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            I specialize in <Link href="/ai-marketing" className="underline text-blue-300 hover:text-blue-200">AI-driven performance marketing</Link> that combines behavioral psychology,
            decision intelligence, and <Link href="/ai-marketing/decision-brain" className="underline text-blue-300 hover:text-blue-200">decision-based conversion optimization</Link> to diagnose
            hidden blockers in digital journeys.
          </p>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Instead of optimizing metrics alone, I analyze user decision patterns,
            cognitive friction, and trust signals to improve real business outcomes. Learn more about <Link href="/articles" className="underline text-blue-300 hover:text-blue-200">performance marketing strategies</Link> and behavioral AI marketing systems.
          </p>
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
            How I Help Businesses as an AI Marketing Specialist
          </h2>
          <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Every business faces unique conversion challenges. Whether you need <Link href="/services/behavioral-cro-strategy" className="underline text-blue-300 hover:text-blue-200">behavioral CRO strategy</Link>, <Link href="/services/decision-friction-diagnosis" className="underline text-blue-300 hover:text-blue-200">decision friction diagnosis</Link>, or complete <Link href="/services" className="underline text-blue-300 hover:text-blue-200">AI marketing transformation</Link>, I deliver measurable results through data-driven optimization.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {focusAreas.map((item) => (
                <li key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/40 p-4 shadow-inner transition hover:border-white/20">
                  <span className="mt-[2px] text-blue-300">
                    <FaCircleCheck aria-hidden size={18} />
                  </span>
                  <div className="flex-1">
                    <span className="text-sm text-gray-200 sm:text-base" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                      {item.title}
                    </span>
                    {item.description && (
                      <p className="mt-2 text-xs text-gray-400 sm:text-sm" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
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
                AI Marketing Services & Solutions
              </h2>
              <p className="text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                As an AI Marketing Specialist, I partner with leadership teams to integrate AI into marketing, growth, and operations — combining strategy, creativity, and deep technical execution.
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
          
          {/* Additional Internal Links */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Top AI Marketing Articles
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/articles/ai/ai-marketing-new-era-2026" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                Complete AI Marketing Guide 2026
              </Link>
              <Link href="/articles/ai/cognitive-friction-ai-cro" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                Cognitive Friction & Behavioral CRO Framework
              </Link>
              <Link href="/cro-copywriting" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                AI-First CRO Copywriting Services
              </Link>
              <Link href="/articles/marketing/ai-marketing-roles-2026" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                AI Marketing Roles & Skills 2026
              </Link>
            </div>
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
    </>
  );
}
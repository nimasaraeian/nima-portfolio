import type { Metadata } from 'next'
import Link from 'next/link'
import { FaCircleCheck } from 'react-icons/fa6'
import HeroDiagram from '@/components/graphics/HeroDiagram'
import DeepScanIcon from '@/components/icons/DeepScanIcon'
import MarketIcon from '@/components/icons/MarketIcon'
import ContentIcon from '@/components/icons/ContentIcon'
import FunnelIcon from '@/components/icons/FunnelIcon'
import AutomationIcon from '@/components/icons/AutomationIcon'
import PersonaPreview from '@/components/graphics/PersonaPreview'
import CalendarPreview from '@/components/graphics/CalendarPreview'
import FunnelPreview from '@/components/graphics/FunnelPreview'
import AutomationPreview from '@/components/graphics/AutomationPreview'
import ModuleInteractivity from '@/components/ModuleInteractivity'

export const metadata: Metadata = {
  title: 'AI Marketing Strategy & Operating System | Nima Saraeian',
  description:
    'AI Marketing page by Nima Saraeian: behavior-first strategy, Contlyze intelligence, Selphlyze psychometrics, adaptive content engine, conversion architecture, and automation. URL: /ai-marketing.',
  alternates: { canonical: 'https://nimasaraeian.com/ai-marketing' },
  keywords: [
    'AI Marketing',
    'AI Marketing Strategist',
    'Behavioral Marketing',
    'AI Content Intelligence',
    'Marketing Automation',
    'Psychometric Marketing',
    'Selphlyze',
    'Contlyze',
  ],
  openGraph: {
    title: 'AI Marketing — Behavior × AI × Strategy',
    description:
      'Build your AI-powered growth system: DeepScan, Market Intelligence, Content Engine, Conversion, Automation.',
    url: 'https://nimasaraeian.com/ai-marketing',
    siteName: 'Nima Saraeian',
    images: [{ url: '/images/ai-marketing/og-ai-marketing.jpg' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Marketing — Nima Saraeian',
    description: 'Behavior-first AI marketing system powered by Selphlyze & Contlyze.',
    images: ['/images/ai-marketing/og-ai-marketing.jpg'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Marketing Strategy & Operating System',
  serviceType: 'AI Marketing',
  url: 'https://nimasaraeian.com/ai-marketing',
  provider: {
    '@type': 'Person',
    name: 'Nima Saraeian',
    url: 'https://nimasaraeian.com',
  },
  areaServed: 'Global',
  hasPart: [
    { '@type': 'CreativeWork', name: 'Behavioral DeepScan' },
    { '@type': 'CreativeWork', name: 'Market & Trend Intelligence' },
    { '@type': 'CreativeWork', name: 'AI Content Engine' },
    { '@type': 'CreativeWork', name: 'Conversion & Funnel Architecture' },
    { '@type': 'CreativeWork', name: 'AI Automation System' },
  ],
  description:
    'Behavior-first AI marketing system powered by Selphlyze (psychometrics) and Contlyze (behavior & content intelligence).',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nimasaraeian.com/' },
    { '@type': 'ListItem', position: 2, name: 'AI Marketing', item: 'https://nimasaraeian.com/ai-marketing' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AI Marketing in this system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A behavior-first, system-driven approach using Selphlyze (psychometrics) + Contlyze (content & market intelligence) to build adaptive content, conversion architecture, and automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who benefits the most?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beauty & aesthetic clinics, hair transplant & dental, education, SaaS & tech startups, creators, real estate & hospitality.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I receive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '90-day roadmap, behavior-based personas, content calendar, conversion/funnel architecture, automation blueprint, KPI model.',
      },
    },
  ],
}

const deliverables = [
  '90-day growth roadmap (phased, with milestones)',
  'Behavior-based personas (motivations, barriers, triggers)',
  'AI-informed content calendar & creative directions',
  'Funnel & conversion architecture (with trust cues)',
  'Automation blueprint (DM/WhatsApp/Email)',
  'KPI model & measurement plan',
]

export default function AIMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                Behavior × AI × Strategy
              </span>
            </h1>
            <p className="mb-6 text-2xl font-semibold sm:text-3xl">AI Marketing Operating System</p>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed opacity-90">
              Not just tools. A complete, behavior-first AI marketing system powered by <strong>Selphlyze</strong> (psychometrics) and{' '}
              <strong>Contlyze</strong> (behavior & content intelligence).
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#modules"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-indigo-600 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Modules
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white hover:text-indigo-600"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Works Section */}
      <section className="bg-gray-50 py-16 text-gray-900 dark:bg-black dark:text-white">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Why this works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: '🧠', t: 'Behavior-first', d: 'Understands motivations, barriers, emotional triggers — not just clicks.' },
              { icon: '⚙️', t: 'Dual Engines', d: 'Selphlyze (psychometric) + Contlyze (market & content) for depth & breadth.' },
              { icon: '🚀', t: 'Operating System', d: 'One system for research, strategy, content, conversion & automation.' },
            ].map((b) => (
              <div
                key={b.t}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-4 text-5xl">{b.icon}</div>
                <h3 className="mb-3 text-xl font-semibold">{b.t}</h3>
                <p className="text-gray-600 dark:text-gray-300">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 5 Core Modules Section */}
      <section id="modules" className="bg-white py-16 text-gray-900 dark:bg-black dark:text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">The 5 Core Modules</h2>
          <div className="space-y-6">
            <ModuleInteractivity
              moduleId="deepscan"
              icon={<DeepScanIcon className="h-8 w-8" />}
              title="Behavioral DeepScan"
              bullets={[
                'Psychometric mapping (cognition, emotion, decision patterns)',
                'Audience motivations, barriers, triggers',
                'Cultural & aesthetic preferences (Aesthlyzer-ready)',
              ]}
              footnote="Powered by Selphlyze — proprietary AI psychometric layer."
            />
            <ModuleInteractivity
              moduleId="market"
              icon={<MarketIcon className="h-8 w-8" />}
              title="Market & Trend Intelligence"
              bullets={['Competitors & category mapping', 'Audience reaction signals & trend shifts', 'Content pattern & positioning gaps']}
              footnote="Powered by Contlyze — behavior & content intelligence."
            />
            <ModuleInteractivity
              moduleId="content"
              icon={<ContentIcon className="h-8 w-8" />}
              title="AI Content Engine"
              bullets={[
                '30-day adaptive calendar + 100 ideas',
                'Voice, tone, hooks and narrative arcs',
                'Format mapping (IG, YT, LinkedIn, blog, email)',
              ]}
            />
            <ModuleInteractivity
              moduleId="conversion"
              icon={<FunnelIcon className="h-8 w-8" />}
              title="Conversion & Funnel Architecture"
              bullets={['Decision journey & trust points', 'Layered funnels with behavioral cues', 'Retention boosters & relationship triggers']}
            />
            <ModuleInteractivity
              moduleId="automation"
              icon={<AutomationIcon className="h-8 w-8" />}
              title="AI Automation System"
              bullets={['Lead qualification & routing', 'DM/WhatsApp/Email automation', 'Appointment & follow-up with behavior triggers']}
            />
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 max-w-7xl mx-auto text-white">
        <div className="rounded-[40px] border border-white/12 bg-white/[0.04] p-8 md:p-12 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)]">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="flex h-full flex-col gap-10 rounded-[32px] border border-white/15 bg-white/[0.1] p-6 md:p-9">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.5em] text-blue-200/80">Deliverables</span>
                  <h2 className="mt-5 text-[2.4rem] font-semibold leading-tight sm:text-[2.6rem]" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    What you get
                  </h2>
                  <p className="mt-4 text-[0.95rem] text-gray-200/85 sm:text-base">
                    A consolidated operating system ready to deploy across marketing, content, funnel, and automation workflows.
                  </p>
                </div>

                <ul className="grid gap-4 text-[0.95rem] text-gray-50/90">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-4 rounded-3xl border border-white/15 bg-black/40 p-4 shadow-[0_12px_24px_-20px_rgba(0,0,0,0.7)]">
                      <span className="mt-[2px] inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-200/20 text-blue-200">
                        <FaCircleCheck aria-hidden size={16} />
                      </span>
                      <span className="leading-relaxed tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.08] px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    See Case Studies
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-7 auto-rows-fr">
                <PersonaPreview />
                <CalendarPreview />
                <FunnelPreview />
                <AutomationPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 text-white md:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Industries</h2>
        <p className="mt-4 text-sm text-gray-300">
          Especially effective for beauty & aesthetic clinics, hair transplant & dental, education & online courses, SaaS & tech startups,
          influencers & creators, real estate & hospitality.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Ready to build your AI Marketing system?</h2>
            <p className="mt-3 text-sm text-gray-300">Turn psychology, behavior, and AI into predictable growth.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
              Start Now
            </Link>
            <Link href="/about" className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Learn About Nima
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ModuleCard({
  icon,
  title,
  bullets,
  footnote,
}: {
  icon: React.ReactNode
  title: string
  bullets: string[]
  footnote?: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-white/20 bg-black/40 p-2 text-white">{icon}</div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      {footnote ? <p className="mt-4 text-xs text-gray-400">{footnote}</p> : null}
    </div>
  )
}


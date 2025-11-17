import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI-Powered Business Growth System™ | Nima Saraeian – AI Marketing Strategist',
  description:
    "Nima’s AI-Powered Business Growth System™ connects AI, psychology, behavior, and content intelligence to build an operating system for growth: DeepScan, Market Intelligence, AI Content Engine, Conversion Architecture, Automation.",
  alternates: { canonical: 'https://nimasaraeian.com/business' },
  keywords: [
    'AI Marketing',
    'AI Marketing Strategist',
    'AI Marketing Operating System',
    'Behavioral Marketing',
    'AI Content Intelligence',
    'Marketing Automation',
    'Psychometric Marketing',
    'Selphlyze',
    'Contlyze',
  ],
  openGraph: {
    title: 'Nima’s AI-Powered Business Growth System™',
    description:
      'A complete operating system for business growth using AI, behavior, and content intelligence.',
    url: 'https://nimasaraeian.com/business',
    siteName: 'Nima Saraeian',
    images: [{ url: '/images/business/og-business.jpg' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima’s AI-Powered Business Growth System™',
    description:
      'Operating system for growth: DeepScan, Market Intelligence, Content Engine, Conversion, Automation.',
    images: ['/images/business/og-business.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Nima’s AI-Powered Business Growth System™',
  serviceType: 'AI Marketing Strategy & Operating System',
  provider: {
    '@type': 'Person',
    name: 'Nima Saraeian',
    url: 'https://nimasaraeian.com',
  },
  areaServed: 'Global',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    // TODO: If pricing is defined, expose price here
    // price: '997',
  },
  hasPart: [
    { '@type': 'CreativeWork', name: 'Behavioral DeepScan' },
    { '@type': 'CreativeWork', name: 'Market & Trend Intelligence' },
    { '@type': 'CreativeWork', name: 'AI Content Engine' },
    { '@type': 'CreativeWork', name: 'Conversion & Funnel Architecture' },
    { '@type': 'CreativeWork', name: 'AI Automation System' },
  ],
  url: 'https://nimasaraeian.com/business',
  image: 'https://nimasaraeian.com/images/business/og-business.jpg',
  description:
    'A complete operating system for business growth using AI, behavioral psychology, and content intelligence.',
}

const whyBlocks = [
  {
    title: 'Behavior-first',
    description: 'Understands motivations, barriers, and emotional triggers — not just clicks.',
  },
  {
    title: 'Dual Engines',
    description: 'Selphlyze (psychometric) + Contlyze (market & content) provide depth and breadth.',
  },
  {
    title: 'Operating System',
    description: 'One system for research, strategy, content, conversion, and automation.',
  },
]

const whatYouGet = [
  '90-day growth roadmap (phased, with milestones)',
  'Behavior-based personas (motivations, barriers, triggers)',
  'AI-informed content calendar & creative directions',
  'Funnel & conversion architecture (with trust cues)',
  'Automation blueprint (DM/WhatsApp/Email)',
  'KPI model & measurement plan',
]

const industries = [
  'Beauty & aesthetic clinics',
  'Hair transplant & dental',
  'Education & online courses',
  'SaaS & tech startups',
  'Influencers & creators',
  'Real estate & hospitality',
]

const whyNima = [
  {
    title: '12+ years, real leadership',
    description: 'Strategy, branding, UX, and AI — integrated into one approach.',
  },
  {
    title: 'Founder of Selphlyze & Contlyze',
    description: 'Proprietary psychometric + market intelligence — unique edge.',
  },
  {
    title: 'Behavior × AI × Design',
    description: 'Systems that are intelligent, measurable, and human-centered.',
  },
]

export default function BusinessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-7xl px-6 py-16 text-white md:px-10 md:py-24 lg:px-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm uppercase tracking-[0.4em] text-blue-200">Signature System</span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Nima’s <span className="whitespace-nowrap">AI-Powered Business Growth System™</span>
            </h1>
            <p className="mt-5 text-base text-gray-300 sm:text-lg">
              A complete operating system that connects <strong>AI</strong>, <strong>behavioral psychology</strong>, and
              <strong> content intelligence</strong> to build sustainable growth. Not just tools — a system.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                aria-label="Work with Nima"
              >
                Work with Nima →
              </Link>
              <Link
                href="#modules"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                aria-label="Explore the system modules"
              >
                Explore Modules
              </Link>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-gray-400">
              <li>• Built on Selphlyze (psychometric) + Contlyze (behavior & content intelligence)</li>
              <li>• Strategy, design, analytics & automation — unified</li>
              <li>• Tailored to clinics, service businesses, SaaS, education, and creators</li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/images/business/hero-diagram.png"
                alt="AI-Powered Business Growth System – high-level diagram"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Diagram: Behavior → Intelligence → Content Engine → Conversion Architecture → Automation
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16 lg:px-16">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Why this system works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {whyBlocks.map((block) => (
            <div key={block.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{block.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{block.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-6 py-12 text-white md:px-10 md:py-20 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl">The 5 Core Modules</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ModuleCard
            index="01"
            title="Behavioral DeepScan"
            bullets={[
              'Psychometric mapping (cognition, emotion, decision patterns)',
              'Audience motivations, barriers, triggers',
              'Cultural & aesthetic preferences (Aesthlyzer-ready)',
            ]}
            footnote="Powered by Selphlyze — proprietary AI psychometric layer."
            image="/images/business/module-deepscan.jpg"
          />
          <ModuleCard
            index="02"
            title="Market & Trend Intelligence"
            bullets={[
              'Competitors & category mapping',
              'Audience reaction signals & trend shifts',
              'Content pattern & positioning gaps',
            ]}
            footnote="Powered by Contlyze — behavior & content intelligence."
            image="/images/business/module-market.jpg"
          />
          <ModuleCard
            index="03"
            title="AI Content Engine™"
            bullets={[
              '30-day adaptive calendar + 100 ideas',
              'Voice, tone, hooks and narrative arcs',
              'Format mapping (IG, YT, LinkedIn, blog, email)',
            ]}
            footnote="Data-informed content that adapts to user behavior."
            image="/images/business/module-content.jpg"
          />
          <ModuleCard
            index="04"
            title="Conversion & Funnel Architecture"
            bullets={[
              'Decision journey & trust points',
              'Layered funnels with behavioral cues',
              'Retention boosters & relationship triggers',
            ]}
            footnote="UX + psychology + data = measurable conversion."
            image="/images/business/module-funnel.jpg"
          />
          <ModuleCard
            index="05"
            title="AI Automation System"
            bullets={[
              'Lead qualification & routing',
              'DM/WhatsApp/Email automation',
              'Appointment & follow-up with behavior triggers',
            ]}
            footnote="From first touch to booked call — automated."
            image="/images/business/module-automation.jpg"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 text-white md:px-10 lg:px-16">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">What you get</h2>
            <ul className="mt-6 space-y-3 text-sm text-gray-300">
              {whatYouGet.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                See Case Studies
              </Link>
              <Link href="/contact" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                Book a Consultation
              </Link>
            </div>
            <p className="mt-3 text-xs text-gray-500">*Demo assets available on request. NDA-safe workflow supported.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <PreviewCard title="Persona – Behavior Map" img="/images/business/preview-persona.jpg" />
            <PreviewCard title="Content Calendar (30d)" img="/images/business/preview-calendar.jpg" />
            <PreviewCard title="Funnel – Trust Points" img="/images/business/preview-funnel.jpg" />
            <PreviewCard title="Automation Flow" img="/images/business/preview-automation.jpg" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 text-white md:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Industries</h2>
        <p className="mt-4 text-sm text-gray-300">
          Especially effective for {industries.join(', ')}.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 text-white md:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Why work with Nima</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {whyNima.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 text-white md:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Related Services</h2>
        <p className="mt-4 text-sm text-gray-300">
          Looking to go deeper into implementation and delivery? Explore the service offerings.
        </p>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Discover Services →
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-white md:px-10 md:py-20 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Ready to install your AI Marketing Operating System?</h2>
            <p className="mt-3 text-sm text-gray-300">Let’s turn psychology, behavior, and AI into predictable growth.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
              Start Your AI System
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
  index,
  title,
  bullets,
  footnote,
  image,
}: {
  index: string
  title: string
  bullets: string[]
  footnote?: string
  image: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative aspect-[16/8]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 text-white">
        <div className="text-sm text-gray-400">{index}</div>
        <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-300">
          {bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
        {footnote ? <p className="mt-4 text-xs text-gray-400">{footnote}</p> : null}
      </div>
    </div>
  )
}

function PreviewCard({ title, img }: { title: string; img: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative aspect-video">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3 text-white">
        <p className="text-sm text-gray-200">{title}</p>
      </div>
    </div>
  )
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import { FaCircleCheck } from 'react-icons/fa6';
import { getCanonicalUrl } from '@/app/lib/seo';
import { generateWebPageSchema } from '@/app/lib/structured-data';

export const metadata: Metadata = {
  title: 'Nima Saraeian | AI Systems Builder — Decision Intelligence, CRO & Automation',
  description: 'AI Systems Builder: decision intelligence, behavioral AI, CRO, and automation. I design and build systems that diagnose conversion friction and scale growth.',
  keywords: 'Nima Saraeian, AI Systems Builder, AI Decision Systems, Behavioral AI, CRO, Conversion Optimization, Automation, Selphlyze',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Nima Saraeian | AI Systems Builder — Decision Intelligence & CRO',
    description: 'AI Systems Builder: decision intelligence, behavioral AI, CRO, and automation. Systems that diagnose conversion friction and drive growth.',
    url: 'https://nimasaraeian.com',
    siteName: 'Nima Saraeian',
    type: 'website',
    images: [
      {
        url: 'https://nimasaraeian.com/nima-pic.png',
        type: 'image/png',
        width: 512,
        height: 512,
        alt: 'Nima Saraeian - AI Systems Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Saraeian | AI Systems Builder — Decision Intelligence & CRO',
    description: 'AI Systems Builder: decision intelligence, behavioral AI, CRO, and automation. Systems that diagnose conversion friction and drive growth.',
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
  'I design and build AI systems that diagnose conversion friction, analyze behavioral signals, and turn data into actionable business intelligence.',
  'For more than a decade I\'ve worked at the intersection of behavioral psychology, AI systems, and decision intelligence — building frameworks that turn complex behavioral data into clear growth decisions for founders, CMOs, and leadership teams.',
  'As the founder of Selphlyze and Contlyze, I\'ve built psychometric and behavioral intelligence systems that decode cognitive and emotional patterns to power decision diagnostics and growth automation.',
];

const focusAreas = [
  {
    title: 'Design AI decision systems',
    description: 'Systems that diagnose conversion friction and user hesitation — and surface actionable interventions.',
  },
  {
    title: 'Build workflow automation',
    description: 'Lead gen, content pipelines, and operations — built for clarity and scale.',
  },
  {
    title: 'Deliver CRO and behavioral analysis',
    description: 'Landing pages, funnels, and trust signals — using diagnostic frameworks.',
  },
  {
    title: 'Implement business intelligence',
    description: 'Structured insights from behavioral and content data to inform growth decisions.',
  },
  {
    title: 'Develop custom AI tools',
    description: 'Scheduling, recommendations, content analysis, and internal operations.',
  },
];

const offerings = [
  {
    title: 'AI Decision Systems',
    description: 'Systems that diagnose conversion friction, surface interventions, and connect behavioral data to outcomes.',
  },
  {
    title: 'Workflow Automation Systems',
    description: 'Lead handling, content pipelines, and operations — diagnosis first, then automation.',
  },
  {
    title: 'Behavioral CRO & Conversion Diagnostics',
    description: 'Landing pages, funnels, and trust signals — using behavioral analysis and structured experimentation.',
  },
  {
    title: 'AI-Powered Business Intelligence',
    description: 'Structured insights from behavioral, content, and market data to inform product, positioning, and growth.',
  },
  {
    title: 'Custom AI Systems & Tools',
    description: 'Bespoke systems for scheduling, recommendations, content analysis, and internal workflows.',
  },
];

const differentiators = [
  '12+ years in strategy, behavioral analysis, and digital systems',
  'Founder of Selphlyze and Contlyze — AI systems for behavioral and content intelligence',
  'Background in behavioral psychology, decision modeling, and automation',
  'Track record with clinics, service businesses, agencies, and global startups',
  'Diagnostic frameworks that connect behavior to measurable outcomes',
];

const exploreLinks = [
  { label: 'Systems Portfolio', href: '/projects', description: 'AI decision systems, behavioral analysis, and automation — case studies and builds.' },
  { label: 'Research', href: '/research', description: 'Academic work on AI, behavioral psychology, and predictive models.' },
  { label: 'Articles', href: '/articles', description: 'Insights on AI systems, decision intelligence, CRO, and automation.' },
  { label: 'Services', href: '/services', description: 'AI decision systems, workflow automation, CRO, and custom AI tools.' },
];

export default function Home() {
  const webPageSchema = generateWebPageSchema({
    name: "Nima Saraeian | AI Systems Builder",
    description: "AI Systems Builder: decision intelligence, behavioral AI, CRO, and automation. Systems that diagnose conversion friction and drive growth.",
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
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200/80">AI Systems Builder · Decision Intelligence · Behavioral Analytics</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              AI Decision Systems Builder
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl">
              I design and build AI systems that analyze user behavior, diagnose conversion friction, and automate growth decisions.
            </p>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Combining behavioral psychology, decision intelligence, and automation to turn hesitation into measurable growth.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
              >
                Discuss a Project
              </Link>
              <Link
                href="/services?utm_source=hero&utm_medium=cta&utm_campaign=diagnosis"
                className="w-full rounded-full border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Start with Diagnosis
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
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Decision Intelligence & Behavioral Analytics
          </h2>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Conversion and efficiency break when decisions and workflows aren't systematized.
            AI systems must understand <strong>why users hesitate</strong>, <strong>where decision friction occurs</strong>, and <strong>how behavioral signals shape conversion</strong>.
          </p>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            I design <Link href="/ai-marketing" className="underline text-blue-300 hover:text-blue-200">decision systems</Link> that combine behavioral psychology, decision intelligence, and <Link href="/ai-marketing/decision-brain" className="underline text-blue-300 hover:text-blue-200">conversion diagnostics</Link> to diagnose hidden blockers in digital journeys.
          </p>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            The work starts with diagnosis — not metrics alone. I analyze user decision patterns, cognitive friction, and trust signals to improve business outcomes. See <Link href="/articles" className="underline text-blue-300 hover:text-blue-200">decision frameworks</Link> and <Link href="/projects" className="underline text-blue-300 hover:text-blue-200">systems portfolio</Link>.
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
            What I Do
          </h2>
          <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Every business faces conversion and efficiency constraints. Whether you need <Link href="/services/behavioral-cro-strategy" className="underline text-blue-300 hover:text-blue-200">behavioral CRO</Link>, <Link href="/services/decision-friction-diagnosis" className="underline text-blue-300 hover:text-blue-200">decision friction diagnosis</Link>, or <Link href="/services" className="underline text-blue-300 hover:text-blue-200">custom AI systems</Link>, the work starts with diagnosis — then systems.
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
                Systems & Services
              </h2>
              <p className="text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                I partner with leadership teams on AI decision systems, workflow automation, CRO, and custom tools — strategy and execution.
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
              Featured Articles
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
              Let’s build systems that convert.
            </h2>
            <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              The work starts with diagnosis — then systems. Ready to discuss?
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Discuss a Project
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start with Diagnosis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
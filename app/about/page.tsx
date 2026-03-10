import Image from 'next/image';
import Link from 'next/link';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { getCanonicalUrl } from '@/app/lib/seo';

const journeyHighlights = [
  'cognitive psychology',
  'behavioral analysis',
  'UX research',
  'AI decision systems',
  'Selphlyze & Contlyze ecosystem',
];

const pillars = [
  {
    title: 'Decision Intelligence & Behavioral Analysis',
    description:
      'Systems that decode why users hesitate, where conversion friction occurs, and how behavioral signals map to decisions.',
  },
  {
    title: 'CRO & Growth Intelligence',
    description: 'Frameworks that diagnose conversion blockers, optimize funnel performance, and connect behavioral data to outcomes.',
  },
  {
    title: 'Automation & AI Product Architecture',
    description:
      'Systems that automate behavioral analysis, content intelligence, and decision diagnostics — built for scale.',
  },
];

const ecosystem = [
  {
    name: 'Selphlyze',
    tag: 'Cognitive & Emotional AI Layer',
    description: 'Psychometric engine that analyzes personality signals, cognitive styles, and emotional patterns to decode what motivates users beneath observable behavior.',
  },
  {
    name: 'Contlyze',
    tag: 'Content, Behavior & Market Intelligence',
    description:
      'Behavioral and content intelligence platform that maps engagement patterns, market trends, and competitive dynamics to growth and conversion opportunities.',
  },
];

const ecosystemBenefits = [
  'why users behave the way they do',
  'what content converts',
  'where markets and attention shift',
  'how to optimize decisions with data',
  'how to scale behavioral analysis through automation',
];

const capabilities = [
  'AI Decision Systems Design',
  'CRO & Conversion Intelligence',
  'Behavioral Analysis & Psychometrics',
  'AI Content & Funnel Systems',
  'Growth Automation',
  'Decision Friction Diagnosis',
  'Predictive Behavior Modeling',
  'Business-Focused AI Product Strategy',
];

const researchFocus = [
  'Cognitive psychology',
  'Behavioral data & decision modeling',
  'AI-driven conversion systems',
  'Aesthetic & perceptual signals',
];

const projects = [
  {
    name: 'Selphlyze',
    description: 'AI-powered cognitive & emotional psychometric engine for behavioral analysis.',
    href: 'https://www.selphlyze.com',
    logo: '/image/SELPHLYZE_LOGO_HIGH_RES.png',
  },
  {
    name: 'Contlyze',
    description: 'Behavioral, content & market intelligence platform for growth and CRO.',
    href: 'https://www.contlyze.com',
    logo: '/image/contlyze.png',
  },
  {
    name: 'Lotus Business School',
    description: 'Training in behavioral psychology, consumer decisions, and strategic systems.',
    href: 'https://lotusbusinessschool.com',
    logo: '/image/lotuslogo.png',
  },
];

export default function AboutPage() {
  const canonicalUrl = getCanonicalUrl('/about');
  
  const webPageSchema = generateWebPageSchema({
    name: "Nima Saraeian | AI Systems Builder",
    description: "Learn about Nima Saraeian, AI Systems Builder with expertise in decision systems, behavioral analysis, CRO, and growth automation. Founder of Selphlyze & Contlyze.",
    url: canonicalUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: getCanonicalUrl('/') },
    { name: "About", url: canonicalUrl },
  ]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nima Saraeian",
    "jobTitle": "AI Systems Builder",
    "image": "https://nimasaraeian.com/image/nima-bw.jpg",
    "url": "https://nimasaraeian.com/",
    "sameAs": [
      "https://www.linkedin.com/in/nimasaraian/",
      "https://x.com/NSaraeian",
      "https://www.instagram.com/nima.saraeian",
      "https://www.youtube.com/@nimasaraeian8664"
    ]
  };

  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black/80 to-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 pb-16 pt-24 sm:px-6 md:flex-row md:items-start md:px-10 lg:px-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200/80">About Nima Saraeian</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              AI Decision Systems Builder
            </h1>
            <p className="mt-4 text-lg text-gray-300 sm:text-xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              AI Systems Builder · Decision Intelligence & Behavioral Analytics
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
              >
                Discuss a Project
              </Link>
              <Link
                href="/services"
                className="w-full rounded-full border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Start with Diagnosis
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto w-64 sm:w-72 md:w-80 aspect-square overflow-hidden rounded-full border-2 border-white/20 shadow-2xl">
              <Image
                src="/image/nima-bw.jpg"
                alt="Nima Saraeian – AI Systems Builder"
                title="Nima Saraeian, AI Systems Builder"
                fill
                className="object-cover object-[50%_35%] grayscale"
                priority
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="space-y-4 text-lg leading-relaxed text-gray-300 mb-12" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          <p>
            I'm Nima Saraeian — an AI Systems Builder with a background in behavioral analysis, cognitive psychology, and business strategy.
          </p>
          <p>
            My work sits at the intersection of behavioral psychology, AI systems, and decision intelligence — building tools that explain why people act, not just what they do.
          </p>
          <p>
            I design and build systems for <Link href="/ai-marketing/decision-brain" className="underline text-blue-300 hover:text-blue-200">decision friction diagnosis</Link>, conversion optimization, and behavioral automation. This page outlines my background, approach, and the Selphlyze & Contlyze ecosystem I founded.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="space-y-6 text-lg leading-relaxed text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          <p>
            ✅ My Journey
          </p>
          <p>
            I started in marketing and business strategy, leading teams and observing how people respond to digital experiences and interfaces.
          </p>
          <p>
            Over time, I realized that most businesses optimize metrics but rarely understand the behavioral mechanisms behind decisions.
          </p>
          <p>
            A central question drove the work: "What actually shapes digital behavior beneath clicks and surface-level metrics?"
          </p>
          <p>
            That led into cognitive psychology, behavioral analysis, UX research, and AI-driven decision modeling — and into building Selphlyze & Contlyze, a dual AI ecosystem that connects psychometrics with market and content intelligence.
          </p>
          <p>
            ✅ My Approach: Three Pillars
          </p>
        </div>

        <div className="mt-6 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3 sm:p-8">
          {pillars.map(({ title, description }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-black/40 p-5 text-center shadow-inner">
              <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{title}</h3>
              <p className="mt-3 text-sm text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{description}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          This combination supports how I build AI decision systems — combining behavioral rigor with business outcomes.
        </p>
        <p className="mt-4 text-lg text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Together, these pillars inform how I approach <Link href="/ai-marketing" className="underline text-blue-300 hover:text-blue-200">AI systems</Link> for conversion optimization, growth intelligence, and automation.
        </p>
      </section>

      <section className="border-t border-white/10 bg-black/80">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
            <div>
              <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                ✅ What I Do
              </h2>
              <p className="mt-4 text-lg text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                I build <Link href="/ai-marketing" className="underline text-blue-300 hover:text-blue-200">AI systems</Link> for decision intelligence, conversion optimization, and behavioral automation — designed for measurable business impact.
              </p>
              <p className="mt-4 text-lg text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                See my <Link href="/research" className="underline text-blue-300 hover:text-blue-200">research</Link> and <Link href="/ai-marketing/decision-brain" className="underline text-blue-300 hover:text-blue-200">decision friction</Link> work.
              </p>
            </div>
            <ul className="grid gap-4">
              {capabilities.map((item) => (
                <li key={item} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            ✅ Selphlyze & Contlyze Ecosystem (Founder)
          </h2>
          <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Selphlyze and Contlyze form a dual AI ecosystem that merges psychometrics with market and content intelligence. Validated with 500+ participants across cultures, they underpin how I build decision systems and behavioral analytics at scale.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {ecosystem.map(({ name, tag, description }) => (
              <div key={name} className="rounded-3xl border border-white/10 bg-black/50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-200/80">{tag}</p>
                <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{name}</h3>
                <p className="mt-3 text-sm text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Together, these platforms give me the ability to understand:
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {ecosystemBenefits.map((item) => (
              <li key={item} className="rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                ✅ {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            This ecosystem is the backbone of how I design <Link href="/ai-marketing" className="underline text-blue-300 hover:text-blue-200">AI systems</Link> for decision intelligence, CRO, and behavioral automation — for businesses, clinics, and brands.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/85">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                ✅ Research Background
              </h2>
              <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                My <Link href="/research" className="underline text-blue-300 hover:text-blue-200">research</Link> connects cognitive psychology, behavioral data, and AI-driven decision modeling. I work on frameworks that explain and predict digital decisions using real-world datasets and long-term behavioral patterns — feeding directly into how I build systems.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-blue-200/80">Research Focus</h3>
              <ul className="mt-4 space-y-3">
                {researchFocus.map((topic) => (
                  <li key={topic} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          ✅ Selected Projects
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ name, description, href, logo }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
            >
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <Image src={logo} alt={`${name} logo`} width={56} height={56} className="h-14 w-14 object-contain" />
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-400 group-hover:text-gray-200">Visit</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{name}</h3>
                  <p className="mt-2 text-sm text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/80">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-12 lg:py-20">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            ✅ Mission
          </h2>
          <p className="mt-6 text-lg text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            To build AI systems that connect behavioral insight with business outcomes — decision intelligence, conversion optimization, and automation that scale.
          </p>
          <blockquote className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-lg italic text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            “Systems that understand both behavior and business.”
          </blockquote>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-12 lg:py-20">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          ✅ Let's Connect
        </h2>
        <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          If you're building or evaluating AI decision systems, CRO, or behavioral automation, I'd like to hear from you.
        </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="w-full rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
          >
            Discuss a Project
          </Link>
          <Link
            href="/services"
            className="w-full rounded-full border border-white/50 px-8 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Start with Diagnosis
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Explore more
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/projects" className="text-gray-300 hover:text-white underline">
              Projects
            </Link>
            <Link href="/research" className="text-gray-300 hover:text-white underline">
              Research
            </Link>
            <Link href="/articles" className="text-gray-300 hover:text-white underline">
              Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
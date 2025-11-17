import Image from 'next/image';
import Link from 'next/link';

const journeyHighlights = [
  'cognitive psychology',
  'neuromarketing',
  'UX research',
  'AI-driven behavior modeling',
  'Selphlyze & Contlyze ecosystem creation',
];

const pillars = [
  {
    title: 'Psychology & Behavior',
    description:
      'Understanding cognitive patterns, emotional responses, motivations, and decision-making in digital environments.',
  },
  {
    title: 'AI & Data Intelligence',
    description: 'Transforming raw cognitive and market signals into predictive insights using AI-powered analysis.',
  },
  {
    title: 'Human-Centered Design & Strategy',
    description:
      'Designing systems, journeys, and products that feel intuitive, culturally adaptive, and behaviorally effective.',
  },
];

const ecosystem = [
  {
    name: 'Selphlyze',
    tag: 'Cognitive & Emotional AI Layer',
    description: 'Analyzes personality signals, cognitive styles, and emotional patterns to decode human motivation.',
  },
  {
    name: 'Contlyze',
    tag: 'Content, Behavior & Market Intelligence',
    description:
      'Maps consumer behavior, social engagement, content performance, market trends, and competitive positioning.',
  },
];

const ecosystemBenefits = [
  'why users behave the way they do',
  'what content resonates',
  'how markets shift',
  'how to optimize decisions with data',
  'how to build intelligent growth systems',
];

const capabilities = [
  'AI Marketing Strategy',
  'Behavioral & Psychometric Analysis',
  'UX Research & Product Design',
  'AI-Driven Content Systems',
  'Social Media Behavior Mapping',
  'Automation Systems for Clinics & Service Businesses',
  'Predictive Consumer Modeling',
];

const researchFocus = [
  'Cognitive psychology',
  'Aesthetic perception',
  'Behavioral data',
  'AI-driven decision modeling',
];

const projects = [
  {
    name: 'Selphlyze',
    description: 'AI-powered cognitive & emotional psychometric engine.',
    href: 'https://www.selphlyze.com',
    logo: '/image/SELPHLYZE_LOGO_HIGH_RES.png',
  },
  {
    name: 'Contlyze',
    description: 'Behavioral, content & market intelligence platform for data-driven growth.',
    href: 'https://www.contlyze.com',
    logo: '/image/contlyze.png',
  },
  {
    name: 'Lotus Business School',
    description: 'Training in digital psychology, consumer behavior, and strategic decision-making.',
    href: 'https://lotusbusinessschool.com',
    logo: '/image/lotuslogo.png',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black/80 to-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 pb-16 pt-24 sm:px-6 md:flex-row md:items-start md:px-10 lg:px-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200/80">About Nima Saraeian</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              AI Marketing Strategist · UX Researcher · AI-Driven Behavior Analyst
            </h1>
            <p className="mt-3 text-base text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Founder of Selphlyze & Contlyze
            </p>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              I’m Nima Saraeian — a strategist, designer, and researcher working at the intersection of AI, behavioral psychology, UX, and digital marketing.
            </p>
            <p className="mt-4 text-lg text-gray-300 sm:text-xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              For more than 12 years, my work has focused on one goal: understanding why people think, feel, decide, and behave the way they do — and translating those insights into intelligent, human-centered digital systems.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
              >
                Get In Touch
              </Link>
              <a
                href="/cv-nima-saraeian.pdf"
                className="w-full rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto max-w-xs overflow-hidden rounded-[46%] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <Image
                src="/image/nima-bw.jpg"
                alt="Portrait of Nima Saraeian"
                width={360}
                height={360}
                className="h-auto w-full grayscale"
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="space-y-6 text-lg leading-relaxed text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          <p>
            ✅ My Journey
          </p>
          <p>
            I began my career in marketing and business strategy, leading teams, designing campaigns, and studying how people respond to brand experiences.
          </p>
          <p>
            But one question kept pushing me further: “What truly shapes digital behavior?”
          </p>
          <p>
            That question led me into {journeyHighlights.join(', ')} — ultimately shaping Selphlyze & Contlyze, the AI ecosystems I rely on today.
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
          This combination allows me to design AI-driven marketing strategies and UX frameworks that are both intelligent and emotionally aligned.
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
                I design AI-powered systems and strategies for companies that want to understand their users deeply, improve digital experiences, and grow with intelligent automation.
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
            Selphlyze and Contlyze operate together as a dual ecosystem that merges psychometric depth with market intelligence. Validated with 500+ participants across diverse cultures, they help me translate human complexity into measurable strategy.
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
            This ecosystem is the backbone of how I design AI-driven marketing strategies for businesses, clinics, creators, and global brands.
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
                My research integrates cognitive psychology, aesthetic perception, behavioral data, and AI-driven decision modeling. I’m designing a unified framework that explains and predicts digital consumer decisions across cultures using real-world datasets.
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
              <Link
                href="/research"
                className="mt-6 inline-flex items-center text-sm font-semibold text-blue-200 hover:text-blue-100"
              >
                Explore Research →
              </Link>
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
            To bridge human psychology, AI, and design — creating digital systems that are intelligent, emotionally aligned, and human-centered.
          </p>
          <blockquote className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-lg italic text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            “The future of digital strategy belongs to those who understand both behavior and AI.”
          </blockquote>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-12 lg:py-20">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          ✅ Let’s Connect
        </h2>
        <p className="mt-4 text-base text-gray-300 sm:text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          If you're exploring the future of AI-driven marketing, behavioral strategy, or human-centered design, I’d love to collaborate.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="w-full rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
          >
            Get In Touch →
          </Link>
          <a
            href="/cv-nima-saraeian.pdf"
            className="w-full rounded-full border border-white/40 px-8 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Download CV →
          </a>
        </div>
      </section>
    </main>
  );
}
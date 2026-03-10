import { Metadata } from "next";
import { SITE } from "../lib/site";
import Link from "next/link";
import Image from "next/image";
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { getCanonicalUrl } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: "AI Systems & Services | Decision Intelligence, Automation, CRO | Nima Saraeian",
  description:
    "AI Systems Builder: decision systems, workflow automation, CRO, behavioral analysis, and custom AI tools for operations and growth. Practical systems for companies.",
  keywords: [
    "AI Systems Builder",
    "AI Decision Systems",
    "Workflow Automation",
    "CRO",
    "Behavioral Analysis",
    "Business Intelligence",
    "Conversion Optimization",
    "AI Automation",
  ],
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
  openGraph: {
    type: "website",
    url: `${SITE.baseUrl}/services`,
    title: "AI Systems & Services | Decision Intelligence, Automation, CRO | Nima Saraeian",
    description:
      "AI Systems Builder: decision systems, workflow automation, CRO, behavioral analysis, and custom AI tools for operations and growth.",
    siteName: "Nima Saraeian",
  },
};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
  name: "AI Systems & Services (Decision Intelligence, Automation, CRO)",
    description:
    "AI Systems Builder offering decision systems design, workflow automation, CRO, behavioral analysis, and custom AI tools for operations and growth.",
    provider: {
      "@type": "Person",
      name: "Nima Saraeian",
    jobTitle: "AI Systems Builder",
    url: SITE.baseUrl,
    },
    areaServed: { "@type": "Place", name: "Global" },
    url: `${SITE.baseUrl}/services`,
};

export default function ServicesPage() {
  const canonicalUrl = getCanonicalUrl('/services');
  
  const webPageSchema = generateWebPageSchema({
    name: "AI Systems & Services",
    description: "AI Systems Builder: decision systems, workflow automation, CRO, behavioral analysis, and custom AI tools for operations and growth.",
    url: canonicalUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: getCanonicalUrl('/') },
    { name: "Services", url: canonicalUrl },
  ]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SECTION 1 — HERO */}
      <section className="relative border-b border-white/10 py-20 sm:py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl text-white tracking-tight" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI Systems & Services
      </h1>

              <p className="mb-6 text-lg sm:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                I build and consult on AI systems for decision intelligence, workflow automation, CRO, and business intelligence. Practical systems for companies that need clarity before scale.
              </p>

              <h2 className="mb-10 text-lg sm:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Decision systems, automation, behavioral analysis, and custom AI tools — designed for operations, conversion, and growth.
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/contact?utm_source=services&utm_medium=hero_cta&utm_campaign=systems"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black px-8 py-4 text-base font-medium hover:bg-gray-100 transition-colors"
                >
                  Discuss a Project
                </Link>
                <Link
                  href="/services/decision-friction-diagnosis"
                  className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-transparent text-white px-8 py-4 text-base font-medium hover:bg-white/10 transition-colors"
                >
                  Start with Diagnosis
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5 bg-black/40">
                <Image
                src="/image/nima-saraeian-ai-marketing-strategist.png"
                alt="Nima Saraeian - AI Systems Builder"
                title="Nima Saraeian - AI Systems Builder"
                  fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
                />
              </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5 — WHAT THIS MEANS IN PRACTICE (ATS BRIDGE) */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            What I Do — In Practical Terms
          </h2>

          <ul className="space-y-4 text-lg text-gray-300 leading-relaxed ml-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            <li>Design AI decision systems that diagnose conversion friction and user hesitation</li>
            <li>Build workflow automation for lead gen, content, and operations</li>
            <li>Deliver CRO and behavioral analysis for landing pages and funnels</li>
            <li>Implement AI-powered business intelligence from behavioral and content data</li>
            <li>Develop custom AI tools for operations and growth — see <Link href="/projects" className="underline text-emerald-300 hover:text-emerald-200">systems portfolio</Link> and <Link href="/articles/ai/cognitive-friction-ai-cro" className="underline text-emerald-300 hover:text-emerald-200">decision frameworks</Link></li>
          </ul>
        </div>
      </section>

      {/* SECTION 1.6 — WHO THIS IS FOR */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Who This Is For
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Typical clients include:
          </p>
          <ul className="space-y-3 text-lg text-gray-300 leading-relaxed ml-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            <li>Founders building AI-first products</li>
            <li>Clinics and service businesses scaling operations</li>
            <li>Marketing teams needing behavioral CRO insights</li>
            <li>Startups needing decision intelligence systems</li>
          </ul>
        </div>
      </section>

      {/* SECTION 2 — THE REAL PROBLEM */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Conversion and efficiency break when decisions and workflows aren't systematized.
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Users don't hesitate randomly — there are diagnosable patterns.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Operations scale poorly when they depend on manual workflows.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Data only becomes actionable when it's structured and modeled.
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-200 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            The work starts with diagnosis — then systems.
          </p>
        </div>
      </section>

      {/* SECTION 3 — WHAT I ACTUALLY DO */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Service Offerings
                </h2>

          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI Decision Systems
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Systems that diagnose where users hesitate, feel uncertainty, or abandon decisions — and surface actionable interventions.
                </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Workflow Automation Systems
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Lead handling, content pipelines, and operations — diagnosis first, then automation. Built for clarity and scale.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Behavioral CRO & Conversion Diagnostics
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Diagnose conversion blockers, then optimize. Landing pages, funnels, and trust signals using behavioral analysis.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-Powered Business Intelligence
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Structured insights from behavioral, content, and market data to inform product, positioning, and growth.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Custom AI Systems & Tools
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Bespoke systems for scheduling, recommendations, content analysis, or internal operations — built for specific business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3.5 — WAYS I SOLVE PROBLEMS */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Entry Points
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Projects rarely start with technology. They start with diagnosing constraints.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-12" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Different projects start at different points — depending on where the constraint or opportunity lies.
          </p>

          <div className="space-y-6">
            <Link
              href="/services/decision-friction-diagnosis"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI Decision Systems
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Diagnose why users hesitate or abandon decisions — and surface interventions.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Decision friction diagnosis
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              href="/services/behavioral-cro-strategy"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                CRO & Behavioral Analysis
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Redesign conversion paths using behavioral analysis and structured experimentation.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Behavioral CRO strategy
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              href="/services/trust-perception-optimization"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Trust & Perception Optimization
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Fix trust breakdowns from visual signals, language, and risk perception.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore trust optimization
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              href="/services/ai-driven-funnel-systems"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Workflow Automation
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-assisted content and funnel systems — built after behavioral clarity.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-driven funnel systems
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              href="/services/predictive-consumer-modeling"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-Powered Business Intelligence
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Consumer and market modeling for product, positioning, and growth.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Predictive modeling
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              href="/contact?utm_source=services&utm_medium=entry_points&utm_campaign=custom_tools"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Custom AI Tools
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Bespoke tools for scheduling, recommendations, content analysis, or internal operations.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Discuss custom build
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW THIS SHOWS UP */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            How this shows up
          </h2>

          <p className="text-sm uppercase tracking-wider text-gray-400 mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Execution layers — not separate services
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-assisted content and decision support
              </p>
            </div>

            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                CRO and behavioral analysis
              </p>
            </div>

            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Funnels and workflows aligned with behavior
              </p>
            </div>

            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Automation built after diagnosis and clarity
              </p>
            </div>
          </div>
      </div>
      </section>

      {/* SECTION 5 — PROOF OF DEPTH */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Grounded in systems, not hype.
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              I build on behavioral models, decision psychology, and diagnostic frameworks — detailed in my <Link href="/articles/ai/cognitive-friction-ai-cro" className="underline text-emerald-300 hover:text-emerald-200">cognitive friction guide</Link> and <Link href="/research" className="underline text-emerald-300 hover:text-emerald-200">research</Link>:
        </p>

            <ul className="space-y-3 text-lg text-gray-300 leading-relaxed ml-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              <li>Behavioral and decision models</li>
              <li>Cognitive friction and trust signals</li>
              <li>AI diagnostic systems</li>
              <li>Workflow and automation architecture</li>
            </ul>

            <p className="text-lg text-gray-300 leading-relaxed mt-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              No buzzwords — clarity first, then systems. Measurable outcomes.
        </p>
      </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="relative py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Start with diagnosis. Then build.
          </h2>

          <div className="text-center space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?utm_source=services&utm_medium=final_cta&utm_campaign=systems"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black px-8 py-4 text-base font-medium hover:bg-gray-100 transition-colors"
              >
                Discuss a Project
              </Link>
              <Link
                href="/services/decision-friction-diagnosis"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-transparent text-white px-8 py-4 text-base font-medium hover:bg-white/10 transition-colors"
              >
                Start with Diagnosis
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Diagnosis first. Systems after.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

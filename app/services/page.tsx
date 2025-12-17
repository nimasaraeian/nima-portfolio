import { Metadata } from "next";
import { SITE } from "../lib/site";
import Link from "next/link";
import Image from "next/image";
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { getCanonicalUrl } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: "AI Marketing Services | CRO & Performance Marketing Strategy Consulting | Nima Saraeian",
  description:
    "AI Marketing Services including CRO strategy, performance marketing consulting, and conversion optimization. Data-driven services that transform user hesitation into measurable growth through behavioral psychology and AI-driven optimization.",
  keywords: [
    "AI Marketing Strategist",
    "CRO Strategist",
    "Growth Marketing",
    "Conversion Optimization",
    "Behavioral AI",
    "Decision Psychology",
    "Cognitive Friction",
    "Trust Gap Analysis",
    "Hesitation Mapping",
    "AI Marketing",
  ],
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
  openGraph: {
    type: "website",
    url: `${SITE.baseUrl}/services`,
    title: "AI Marketing Strategist (CRO & Growth) | Behavioral AI, Decision Psychology & Conversion Optimization",
    description:
      "AI Marketing Strategist specializing in CRO, growth, behavioral psychology, decision friction analysis, and AI-driven optimization.",
    siteName: "Nima Saraeian",
  },
};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
  name: "AI Marketing Strategy (CRO & Growth)",
    description:
    "AI Marketing Strategist specializing in conversion optimization, growth marketing, behavioral psychology, decision friction analysis, and AI-driven marketing systems.",
    provider: {
      "@type": "Person",
      name: "Nima Saraeian",
    jobTitle: "AI Marketing Strategist",
    url: SITE.baseUrl,
    },
    areaServed: { "@type": "Place", name: "Global" },
    url: `${SITE.baseUrl}/services`,
};

export default function ServicesPage() {
  const canonicalUrl = getCanonicalUrl('/services');
  
  const webPageSchema = generateWebPageSchema({
    name: "AI Marketing Services",
    description: "AI Marketing Services including CRO strategy, performance marketing consulting, and conversion optimization.",
    url: canonicalUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: getCanonicalUrl('/') },
    { name: "AI Marketing Services", url: canonicalUrl },
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
                AI Marketing Services: CRO Strategy & Conversion Optimization
      </h1>

              <p className="mb-6 text-lg sm:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Our AI Marketing Services combine CRO strategy, performance marketing consulting, and conversion optimization to transform user hesitation into measurable growth. We deliver data-driven services that leverage behavioral psychology and AI-driven optimization. Learn more about our <Link href="/articles/ai/cognitive-friction-ai-cro" className="underline text-emerald-300 hover:text-emerald-200">cognitive friction framework</Link> and <Link href="/cro-copywriting" className="underline text-emerald-300 hover:text-emerald-200">AI-first CRO copywriting approach</Link>.
              </p>

              <h2 className="mb-10 text-lg sm:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Behavioral AI–driven strategy focused on conversion optimization, decision friction analysis, trust psychology, and AI-powered marketing systems.
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/contact?utm_source=services&utm_medium=hero_cta&utm_campaign=behavioral_diagnosis"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black px-8 py-4 text-base font-medium hover:bg-gray-100 transition-colors"
                >
                  Request a Behavioral Diagnosis
                </Link>
                <Link
                  href="/projects?utm_source=services&utm_medium=secondary_cta&utm_campaign=view_work"
                  className="inline-flex items-center justify-center text-gray-300 hover:text-white px-8 py-4 text-base font-medium transition-colors underline decoration-2 underline-offset-4"
                >
                  View Strategy & Optimization Work
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5 bg-black/40">
                <Image
                src="/image/nima-saraeian-ai-marketing-strategist.png"
                alt="Nima Saraeian - AI Marketing Strategist (CRO & Growth) | Behavioral AI, Decision Psychology & Cognitive Friction"
                title="Nima Saraeian - AI Marketing Strategist"
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
            <li>Lead AI marketing and CRO strategy for websites and funnels</li>
            <li>Analyze conversion drops, trust issues, and user hesitation</li>
            <li>Optimize landing pages, content, and funnels using behavioral psychology</li>
            <li>Apply AI to diagnose and improve marketing performance</li>
            <li>Support growth, revenue, and user decision KPIs</li>
            <li>Improve funnel performance, conversion rates, and revenue-related KPIs through behavioral analysis, testing, and iteration. See <Link href="/projects" className="underline text-emerald-300 hover:text-emerald-200">real case studies</Link> and <Link href="/articles/ai/cognitive-friction-ai-cro" className="underline text-emerald-300 hover:text-emerald-200">behavioral conversion frameworks</Link>.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 2 — THE REAL PROBLEM */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Most marketing fails before conversion — inside the mind.
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Users don't hesitate randomly.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Trust breaks for specific psychological reasons.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Decisions fail long before copy or design is blamed.
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-200 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            My work starts before tactics — with diagnosis.
          </p>
        </div>
      </section>

      {/* SECTION 3 — WHAT I ACTUALLY DO */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Behavioral AI–Driven Marketing Strategy (CRO & Growth Focus)
                </h2>

          <div className="space-y-12">
            {/* Block 1 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Decision Friction Analysis
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Identify where users feel uncertainty, overload, or risk.
                </p>
            </div>

            {/* Block 2 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Trust & Hesitation Mapping
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Psychological + visual + cognitive signals extracted with AI.
              </p>
            </div>

            {/* Block 3 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-Driven Intervention Design
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Clear actions to realign content, structure, and flow.
              </p>
                </div>
                </div>
              </div>
      </section>

      {/* SECTION 3.5 — WAYS I SOLVE DECISION PROBLEMS */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Ways I Solve Decision Problems
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-12" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Different projects require different entry points — depending on where the user decision breaks.
          </p>

          <div className="space-y-6">
            {/* Subsection 1 */}
            <Link
              href="/services/decision-friction-diagnosis"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Decision Friction Diagnosis
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Identify why users hesitate, delay, or abandon decisions despite strong offers or traffic.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore decision friction diagnosis
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* Subsection 2 */}
            <Link
              href="/services/behavioral-cro-strategy"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Behavioral Conversion & CRO Strategy
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Redesign conversion paths using behavioral psychology, decision logic, and structured experimentation.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore behavioral CRO strategy
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* Subsection 3 */}
            <Link
              href="/services/trust-perception-optimization"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Trust & Perception Optimization
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Analyze and correct trust breakdowns caused by visual signals, language, risk perception, and emotional cues.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore trust & perception work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* Subsection 4 */}
            <Link
              href="/services/ai-driven-funnel-systems"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI-Driven Funnel & Content Systems
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Build AI-assisted content and funnel systems only after behavioral clarity is established.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore AI-driven funnels
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* Subsection 5 */}
              <Link
              href="/services/predictive-consumer-modeling"
              className="block border-l-4 border-emerald-500/30 pl-6 py-6 hover:border-emerald-500/60 transition-colors group"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-3 group-hover:text-emerald-200 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Predictive Consumer & Market Modeling
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Model consumer behavior and market shifts to inform product, positioning, and growth strategy.
              </p>
              <span className="text-emerald-400 group-hover:text-emerald-300 font-medium inline-flex items-center gap-2 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore predictive modeling
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
            How strategy turns into action
          </h2>

          <p className="text-sm uppercase tracking-wider text-gray-400 mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Execution layers — not separate services
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Content that removes hesitation (AI-assisted)
              </p>
            </div>

            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                CRO copy guided by decision psychology
              </p>
            </div>

            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Funnels aligned with real human behavior
              </p>
            </div>

            <div className="border-l-4 border-emerald-500/30 pl-6">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Automation used only after clarity
              </p>
            </div>
          </div>
      </div>
      </section>

      {/* SECTION 5 — PROOF OF DEPTH */}
      <section className="relative border-b border-white/10 py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            This is not generic AI marketing.
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              As an AI Marketing Strategist, I specialize in behavioral psychology, decision friction analysis, and AI-driven optimization. This work is grounded in research-backed frameworks detailed in my <Link href="/articles/ai/cognitive-friction-ai-cro" className="underline text-emerald-300 hover:text-emerald-200">cognitive friction guide</Link> and <Link href="/research" className="underline text-emerald-300 hover:text-emerald-200">academic research</Link>:
        </p>

            <ul className="space-y-3 text-lg text-gray-300 leading-relaxed ml-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              <li>Behavioral models</li>
              <li>Cognitive friction</li>
              <li>Trust signals</li>
              <li>Decision psychology</li>
              <li>AI diagnostic systems</li>
            </ul>

            <p className="text-lg text-gray-300 leading-relaxed mt-8" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              No buzzwords or automation-first tactics — only diagnostic clarity that leads to measurable conversion and growth outcomes.
        </p>
      </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="relative py-16 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            If your users hesitate, the problem is not traffic.
          </h2>

          <div className="text-center space-y-6">
        <Link
              href="/contact?utm_source=services&utm_medium=final_cta&utm_campaign=behavioral_diagnosis"
              className="inline-flex items-center justify-center rounded-lg bg-white text-black px-8 py-4 text-base font-medium hover:bg-gray-100 transition-colors"
        >
              Start with a Behavioral Diagnosis
        </Link>

            <p className="text-sm text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Not a tool. Not automation. A decision analysis.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from "next";
import { SITE } from "@/app/lib/site";
import Link from "next/link";
import { getCanonicalUrl } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Decision Intelligence Framework | AI Systems Builder | Nima Saraeian",
  description:
    "A behavioral and analytical model for understanding why users decide — not just what they click. Decision friction, behavioral signals, and AI-powered diagnostic systems.",
  keywords: [
    "Decision Intelligence",
    "decision friction",
    "behavioral analytics",
    "AI decision systems",
    "behavioral signals",
    "CRO optimization",
    "Nima Saraeian",
  ],
  alternates: {
    canonical: getCanonicalUrl("/decision-intelligence"),
  },
  openGraph: {
    title: "Decision Intelligence Framework | Nima Saraeian",
    description:
      "Understanding why users decide — not just what they click. A framework for behavioral analytics and AI-powered decision systems.",
    url: `${SITE.baseUrl}/decision-intelligence`,
    type: "article",
  },
};

export default function DecisionIntelligencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <article
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        {/* Hero */}
        <header className="space-y-6 border-b border-white/10 pb-12">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Decision Intelligence Framework
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Understanding why users decide — not just what they click.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Introduction</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Traditional analytics measures behavior — clicks, scrolls,
            conversions, session length. It answers what users did. It rarely
            explains why they decided to act, hesitate, or abandon. Decision
            intelligence is the layer between raw behavior and actionable
            insight: it connects observable actions to the underlying cognitive,
            emotional, and contextual drivers of choice.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            This framework describes how I approach building AI systems that
            diagnose decision-making rather than merely report on it. The goal
            is to structure behavioral data so it supports CRO, product, and
            growth decisions — not just dashboards.
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            The Problem
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Behavioral decisions are difficult to understand with traditional
            metrics. Analytics tools aggregate events: page views, button
            clicks, form submissions. They segment by channel, device, and
            demographics. They do not, by default, surface the cognitive or
            emotional state behind a conversion or abandonment.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            As a result, teams optimize for engagement without knowing whether
            engagement correlates with intent. They A/B test elements without
            understanding which psychological levers are failing. They see drop-off
            at a step but not why users hesitate. The gap between "what happened"
            and "why it happened" limits the effectiveness of optimization and
            personalization.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Decision intelligence closes that gap by modeling the behavioral
            signals and friction points that precede action or inaction.
          </p>
        </section>

        {/* Decision Friction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Decision Friction
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Decision hesitation occurs when the perceived cost of acting
            outweighs the perceived benefit. Friction can come from several
            sources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-300 ml-4">
            <li>
              <strong className="text-white">Uncertainty</strong> — Users lack
              enough information or confidence to commit. Ambiguity in value
              proposition, pricing, or outcome increases hesitation.
            </li>
            <li>
              <strong className="text-white">Trust signals</strong> — Weak or
              inconsistent credibility cues (social proof, credentials,
              guarantees) amplify perceived risk and delay decisions.
            </li>
            <li>
              <strong className="text-white">Cognitive overload</strong> — Too
              many options, dense copy, or unclear hierarchy exhausts decision
              capacity. Users defer rather than choose.
            </li>
            <li>
              <strong className="text-white">Risk perception</strong> — Even when
              actual risk is low, perceived irreversibility, loss, or social
              cost can block commitment.
            </li>
          </ul>
          <p className="text-lg text-gray-300 leading-relaxed">
            Decision friction analysis identifies where these forces operate in
            a user journey and surfaces interventions that reduce hesitation
            without manipulation.
          </p>
        </section>

        {/* Behavioral Signals */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Behavioral Signals
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Digital behavior is shaped by emotional, cognitive, and perceptual
            signals. These signals are not always visible in aggregate metrics,
            but they manifest in patterns — time on element, scroll depth,
            click sequence, hesitation at specific steps, return visits without
            conversion.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Key signal categories:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-300 ml-4">
            <li>
              <strong className="text-white">Emotional</strong> — Engagement
              heat, bounce on sensitive sections, interaction with reassurance
              content.
            </li>
            <li>
              <strong className="text-white">Cognitive</strong> — Attention
              distribution, confusion indicators, drop-off at decision points.
            </li>
            <li>
              <strong className="text-white">Perceptual</strong> — Response to
              trust elements, pricing exposure, social proof placement, clarity
              of outcome.
            </li>
          </ul>
          <p className="text-lg text-gray-300 leading-relaxed">
            Systems built for decision intelligence extract and model these
            signals so they can inform diagnosis and optimization.
          </p>
        </section>

        {/* Decision Intelligence Model */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Decision Intelligence Model
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The framework follows a pipeline from raw behavior to actionable
            insights:
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre className="whitespace-pre">
{`[User Behavior]
       ↓
[Behavioral Signals]
       ↓
[Decision Friction Analysis]
       ↓
[AI Diagnostic Layer]
       ↓
[Actionable Insights]`}
            </pre>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            User behavior feeds into signal extraction. Those signals are
            analyzed for friction patterns. The AI diagnostic layer applies
            psychometric, behavioral, and domain logic to produce structured
            insights — segmentation, friction diagnosis, intervention
            recommendations — that downstream systems can use.
          </p>
        </section>

        {/* How AI Enables Decision Intelligence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            How AI Enables Decision Intelligence
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            AI can analyze patterns in behavioral data at scale. It detects
            friction signals that manual analysis would miss — subtle sequences,
            cross-session patterns, and correlations between content and
            outcome. Machine learning models can learn which combinations of
            signals predict conversion, hesitation, or churn.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The diagnostic layer uses AI to classify friction types, rank
            interventions by impact, and generate hypotheses for testing. It
            does not replace human judgment; it structures data so that
            judgment can be applied more efficiently. The output is actionable —
            recommendations, segment labels, and prioritized fixes — not just
            dashboards.
          </p>
        </section>

        {/* Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Applications
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            This framework applies where decisions drive outcomes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-300 ml-4">
            <li>
              <strong className="text-white">CRO optimization</strong> —
              Diagnose conversion friction, prioritize tests, and align content
              with behavioral signals.
            </li>
            <li>
              <strong className="text-white">Product UX decisions</strong> —
              Identify where flows break, which elements create overload, and
              how to reduce cognitive cost.
            </li>
            <li>
              <strong className="text-white">Behavioral marketing</strong> —
              Segment and target based on decision tendencies, not just
              demographics.
            </li>
            <li>
              <strong className="text-white">AI decision systems</strong> —
              Build systems that ingest behavior, diagnose friction, and output
              recommendations for operations, sales, or growth.
            </li>
            <li>
              <strong className="text-white">Growth analytics</strong> —
              Connect behavioral signals to funnel performance and strategic
              decisions.
            </li>
          </ul>
        </section>

        {/* Systems Built Using This Framework */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Systems Built Using This Framework
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I build AI systems that implement this model. Representative
            projects:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/systems/selphlyze"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/30 hover:bg-white/10 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-200">
                Selphlyze
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Psychometric and behavioral decision intelligence for
                personality signals, emotional patterns, and segmentation.
              </p>
              <span className="mt-4 inline-block text-sm text-blue-300 group-hover:text-blue-200">
                View Case Study →
              </span>
            </Link>
            <Link
              href="/projects"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/30 hover:bg-white/10 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-200">
                Contlyze
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Content and behavioral intelligence for CRO, growth, and market
                insights.
              </p>
              <span className="mt-4 inline-block text-sm text-blue-300 group-hover:text-blue-200">
                View Systems →
              </span>
            </Link>
            <Link
              href="/systems/dental-clinic-ai"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/30 hover:bg-white/10 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-200">
                Dental Clinic AI
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Clinic operations: scheduling, prioritization, and financial
                decision intelligence.
              </p>
              <span className="mt-4 inline-block text-sm text-blue-300 group-hover:text-blue-200">
                View Case Study →
              </span>
            </Link>
          </div>
          <p className="text-base text-gray-400">
            <Link href="/projects" className="text-blue-300 hover:text-blue-200 underline">
              See all systems
            </Link>
          </p>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 pt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Discuss Decision Intelligence
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            If you need systems that understand why users decide — not just what
            they click — we can discuss how this framework applies to your
            context.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-gray-200 transition-colors"
            >
              Discuss a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View Services
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

import { Metadata } from "next";
import { SITE } from "@/app/lib/site";
import Link from "next/link";
import { getCanonicalUrl } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Selphlyze | AI-Powered Psychometric & Behavioral Decision Intelligence | Nima Saraeian",
  description:
    "Behavioral AI system combining psychometrics, cognitive psychology, and AI to analyze personality signals, emotional patterns, and decision tendencies for marketing, product, and business intelligence.",
  keywords: [
    "Selphlyze",
    "behavioral AI",
    "psychometric analysis",
    "decision intelligence",
    "behavioral analytics",
    "AI decision systems",
    "personality analysis",
  ],
  alternates: {
    canonical: getCanonicalUrl("/systems/selphlyze"),
  },
  openGraph: {
    title: "Selphlyze | AI-Powered Behavioral Decision Intelligence | Nima Saraeian",
    description:
      "Behavioral AI system combining psychometrics and AI to decode personality signals, emotional patterns, and decision tendencies.",
    url: `${SITE.baseUrl}/systems/selphlyze`,
    type: "article",
  },
};

export default function SelphlyzePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <article
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        {/* Hero */}
        <header className="space-y-6 border-b border-white/10 pb-12">
          <Link
            href="/projects"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Systems
          </Link>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Selphlyze
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            AI-powered psychometric and behavioral decision intelligence system.
          </p>
          <p className="text-base text-gray-400">
            Understanding why people decide — not just what they click.
          </p>
        </header>

        {/* Project Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Project Overview</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Selphlyze is a behavioral AI system that combines psychometrics,
            behavioral analysis, and AI to decode hidden decision patterns
            behind user behavior. Instead of measuring surface metrics alone, it
            analyzes personality signals, emotional patterns, and cognitive
            tendencies to produce actionable behavioral intelligence.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The system feeds into decision modeling, segmentation, and strategy
            — supporting marketing, product, and business intelligence use
            cases where understanding why people act matters as much as what
            they do.
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            The Problem
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Most analytics tools measure surface metrics such as clicks,
            conversions, and engagement. They reveal what happened, but rarely
            explain why people behaved the way they did. Businesses lack tools
            to analyze emotional, cognitive, and personality-driven behavior
            patterns that drive decisions.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Without that layer, optimization remains tactical. Segmentation
            stays demographic. Personalization relies on inferred preferences
            rather than behavioral signals. Decision intelligence systems need
            a behavioral foundation — psychometric and emotional analysis —
            that most analytics stacks do not provide.
          </p>
        </section>

        {/* The System */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            The System
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Selphlyze is built as a layered system:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-300 ml-4">
            <li>
              <strong className="text-white">Psychometric analysis</strong> —
              Extracts personality, cognitive style, and decision-making
              tendencies from behavioral and response data.
            </li>
            <li>
              <strong className="text-white">Emotional signal modeling</strong> —
              Maps emotional patterns and affective states that influence
              choices and engagement.
            </li>
            <li>
              <strong className="text-white">Behavior pattern detection</strong> —
              Identifies recurring behavioral signatures, preferences, and
              response styles.
            </li>
            <li>
              <strong className="text-white">Decision intelligence layer</strong> —
              Structures outputs for use in CRO, segmentation, personalization,
              and product decisions.
            </li>
          </ul>
        </section>

        {/* Core Capabilities */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Core Capabilities
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Psychometric personality modeling — cognitive style and decision tendencies",
              "Emotional pattern detection — affective signals and response patterns",
              "Behavioral signal analysis — action and engagement signatures",
              "Decision tendency prediction — likelihood of specific behavioral responses",
              "Behavioral segmentation for marketing and UX — segments driven by psychometric and emotional data",
            ].map((cap, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-gray-200">{cap}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            System Architecture
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The system processes user and behavioral data through psychometric
            analysis and pattern modeling to produce decision intelligence
            outputs.
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre className="whitespace-pre">
{`[User Data]
       ↓
[Psychometric Analysis]
       ↓
[Behavior Pattern Modeling]
       ↓
[Decision Intelligence Layer]
       ↓
[Actionable Behavioral Insights]`}
            </pre>
          </div>
        </section>

        {/* Example Outputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Example Outputs
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Selphlyze produces structured insights such as:
          </p>
          <ul className="space-y-3 text-lg text-gray-300 list-disc list-inside ml-4">
            <li>
              <strong className="text-white">Personality profiles</strong> —
              Cognitive style, openness, conscientiousness, and decision-making
              traits (e.g., SelfCode representation).
            </li>
            <li>
              <strong className="text-white">Decision friction signals</strong> —
              Indicators of hesitation, overload, or misalignment between
              content and behavioral state.
            </li>
            <li>
              <strong className="text-white">Behavioral segmentation</strong> —
              Clusters based on psychometric and emotional patterns for
              targeting and personalization.
            </li>
            <li>
              <strong className="text-white">Psychometric insights</strong> —
              Scores and labels for downstream systems (CRO, content, product).
            </li>
          </ul>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono whitespace-pre">
{`{
  "self_code": "ABCD-1234",
  "cognitive_style": "analytical",
  "emotional_patterns": ["high_curiosity", "low_risk_aversion"],
  "decision_signals": { "clarity_needed": 0.8, "social_proof_weight": 0.6 },
  "segment": "growth-oriented, information-seeking"
}`}
            </pre>
          </div>
        </section>

        {/* Business Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Business Applications
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Selphlyze can be used in:
          </p>
          <ul className="space-y-2 text-lg text-gray-300 list-disc list-inside ml-4">
            <li>
              <strong className="text-white">CRO optimization</strong> —
              Diagnose decision friction and align content with behavioral
              signals.
            </li>
            <li>
              <strong className="text-white">Behavioral marketing</strong> —
              Segment and target based on psychometric and emotional patterns.
            </li>
            <li>
              <strong className="text-white">Product UX decisions</strong> —
              Inform flows, messaging, and features from behavioral and
              cognitive profiles.
            </li>
            <li>
              <strong className="text-white">Customer segmentation</strong> —
              Segments driven by personality, emotion, and decision tendencies
              rather than demographics alone.
            </li>
            <li>
              <strong className="text-white">Decision intelligence systems</strong> —
              Feed behavioral insights into conversion diagnostics, personalization,
              and growth automation.
            </li>
          </ul>
        </section>

        {/* Technology Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Technology
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Implementation elements include:
          </p>
          <ul className="space-y-2 text-lg text-gray-300 list-disc list-inside ml-4">
            <li>AI models for psychometric and behavioral inference</li>
            <li>Behavioral data analysis pipelines</li>
            <li>Psychometric frameworks (personality, cognitive style, emotional patterns)</li>
            <li>Decision modeling and scoring logic</li>
            <li>Structured output formats for integration (e.g., React, Node.js, MongoDB stack)</li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 pt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Interested in Behavioral AI Systems?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            If you need psychometric analysis, behavioral decision intelligence,
            or systems that understand why people decide — we can discuss how
            to integrate this approach into your marketing, product, or
            analytics stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-gray-200 transition-colors"
            >
              Discuss Behavioral AI Systems
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore More Systems
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

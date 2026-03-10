import { Metadata } from "next";
import { SITE } from "@/app/lib/site";
import Link from "next/link";
import { getCanonicalUrl } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "AI System Design Process | AI Systems Builder | Nima Saraeian",
  description:
    "How I design and build AI systems: diagnose behavioral signals, model the decision layer, architect pipelines, automate workflows, and deliver operational intelligence.",
  keywords: [
    "AI system design",
    "decision intelligence",
    "behavioral analytics",
    "operational AI systems",
    "AI systems architect",
    "Nima Saraeian",
  ],
  alternates: {
    canonical: getCanonicalUrl("/ai-system-design"),
  },
  openGraph: {
    title: "AI System Design Process | Nima Saraeian",
    description:
      "How behavioral insight becomes operational intelligence. A five-step methodology for building AI decision systems.",
    url: `${SITE.baseUrl}/ai-system-design`,
    type: "article",
  },
};

export default function AISystemDesignPage() {
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
            AI System Design Process
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            How behavioral insight becomes operational intelligence.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Introduction</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            AI systems should solve real decision problems rather than simply
            process data. Too many systems ingest information and produce reports
            without connecting analysis to operational outcomes. The value of
            behavioral analytics lies in turning insight into action: decisions
            that improve conversion, workflow, or strategy.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            This page describes the methodology I use to design and build AI
            systems — from diagnosing the problem space through to delivering
            operational intelligence. The process is iterative, but the sequence
            matters: diagnosis before modeling, modeling before architecture,
            architecture before automation.
          </p>
        </section>

        {/* Step 1 — Diagnose the System */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Step 1 — Diagnose the System
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The first step is to identify what the system must address. This
            includes mapping behavioral signals, conversion friction, workflow
            bottlenecks, and decision constraints.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Behavioral signals</strong> — What
            data is available? Clicks, scrolls, time on element, form fields,
            return visits, session sequences. Which signals correlate with
            outcomes? Which are noise?
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Conversion friction</strong> — Where
            do users hesitate or abandon? Which steps create uncertainty, trust
            gaps, or cognitive overload? Friction diagnosis guides where to
            intervene.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Workflow bottlenecks</strong> — For
            operational systems: where do processes stall? Manual handoffs, data
            gaps, or inconsistent decision rules?
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Decision constraints</strong> — What
            must the system output? Recommendations, scores, segment labels,
            prioritization lists? Constraints define success criteria.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Diagnosis produces a problem map. The next steps build the solution
            on top of that map.
          </p>
        </section>

        {/* Step 2 — Model the Decision Layer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Step 2 — Model the Decision Layer
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Once the problem space is understood, the decision logic is modeled.
            The decision layer translates behavioral data into structured outputs
            that support action.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Scoring systems</strong> — Numeric
            indices that rank users, content, or opportunities by propensity,
            value, or risk. Scores feed prioritization and segmentation.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Behavioral segmentation</strong> —
            Groups derived from decision tendencies, not just demographics.
            Segments inform messaging, product, and workflow.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Decision logic</strong> — Rules and
            conditions that map inputs to outputs. Rule-based logic, ML
            classifiers, or hybrid approaches depending on data quality and
            interpretability needs.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The model is validated against real outcomes. Iteration continues
            until it reliably supports the decisions it was designed to inform.
          </p>
        </section>

        {/* Step 3 — Design System Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Step 3 — Design System Architecture
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The decision model is implemented in a system architecture that can
            ingest data, run analysis, and produce outputs at scale.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Data pipelines</strong> — How raw
            behavioral or operational data flows into the system. ETL, APIs,
            event streams. Data quality, latency, and volume shape the design.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">AI modules</strong> — Where machine
            learning or psychometric models run. Feature extraction,
            classification, scoring. Modular design allows swapping or
            upgrading models without rewriting the pipeline.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Decision engine</strong> — The core
            logic that applies the model to incoming data and produces
            structured outputs. May combine rule-based and ML components.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-white">Analytics layer</strong> — Logging,
            evaluation, and monitoring. Tracks model performance, drift, and
            operational health so the system can be maintained and improved.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Architecture choices depend on constraints: budget, timeline, data
            availability, and integration points.
          </p>
        </section>

        {/* Step 4 — Build Automation Layer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Step 4 — Build Automation Layer
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Analysis alone does not change outcomes. The automation layer
            connects system outputs to operational workflows.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Automation may include scheduled batch jobs that refresh scores and
            segments, real-time APIs that return recommendations on request, or
            triggers that push insights into CRMs, marketing platforms, or
            internal tools.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The goal is to reduce the gap between insight and action. When the
            system identifies high-propensity users, automation ensures they
            reach the right campaign or workflow. When it flags friction points,
            automation surfaces them to the right team or tool. The automation
            layer is where decision intelligence becomes operational.
          </p>
        </section>

        {/* Step 5 — Deliver Operational Intelligence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Step 5 — Deliver Operational Intelligence
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Insights are delivered as actionable outputs. Format depends on use
            case:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-300 ml-4">
            <li>
              <strong className="text-white">Recommendations</strong> —
              Prioritized suggestions for messaging, content, or next actions.
              Delivered via API, UI, or report.
            </li>
            <li>
              <strong className="text-white">Dashboards</strong> — Visual
              summaries for monitoring and exploration. Useful when humans need
              to interpret trends or drill into segments.
            </li>
            <li>
              <strong className="text-white">Decision support</strong> —
              Real-time or near-real-time outputs that inform operational
              decisions. Scheduling, prioritization, routing.
            </li>
            <li>
              <strong className="text-white">Reports and exports</strong> —
              Structured data for downstream systems or periodic review.
            </li>
          </ul>
          <p className="text-lg text-gray-300 leading-relaxed">
            The delivery format should match how the audience will use the
            output. Technical teams may prefer APIs; product owners may prefer
            dashboards; operations may need feeds into existing tools.
          </p>
        </section>

        {/* Systems Built Using This Process */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Systems Built Using This Process
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I apply this process to the AI systems I build. Representative
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
                Psychometric and behavioral decision intelligence: personality
                signals, emotional patterns, segmentation for marketing and
                product.
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
                Scheduling, patient prioritization, financial intelligence for
                clinic operations.
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

        {/* Related: Framework */}
        <section className="border-t border-white/10 pt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Related: Decision Intelligence Framework
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The conceptual model behind this process — decision friction,
            behavioral signals, and the diagnostic pipeline — is described in the{" "}
            <Link
              href="/decision-intelligence"
              className="text-blue-300 hover:text-blue-200 underline"
            >
              Decision Intelligence Framework
            </Link>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 pt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Discuss a System Design
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            If you have a decision problem that could benefit from this
            methodology, we can discuss how it applies to your context.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-gray-200 transition-colors"
            >
              Contact
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

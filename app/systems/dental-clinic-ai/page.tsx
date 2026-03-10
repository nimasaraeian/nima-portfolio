import { Metadata } from "next";
import { SITE } from "@/app/lib/site";
import Link from "next/link";
import { getCanonicalUrl } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Dental Clinic AI | AI-Powered Clinic Operations System | Nima Saraeian",
  description:
    "AI-powered clinic operations system for scheduling optimization, financial intelligence, and patient prioritization. Decision systems that transform clinic data into operational intelligence.",
  keywords: [
    "Dental Clinic AI",
    "clinic operations",
    "scheduling optimization",
    "patient prioritization",
    "financial intelligence",
    "AI decision systems",
    "clinic workflow",
  ],
  alternates: {
    canonical: getCanonicalUrl("/systems/dental-clinic-ai"),
  },
  openGraph: {
    title: "Dental Clinic AI | AI-Powered Clinic Operations | Nima Saraeian",
    description:
      "AI-powered clinic operations system for scheduling optimization, financial intelligence, and patient prioritization.",
    url: `${SITE.baseUrl}/systems/dental-clinic-ai`,
    type: "article",
  },
};

export default function DentalClinicAIPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <article
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        {/* A. Hero */}
        <header className="space-y-6 border-b border-white/10 pb-12">
          <Link
            href="/projects"
            className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Systems
          </Link>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Dental Clinic AI
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            AI-powered clinic operations system for scheduling optimization,
            financial intelligence, and patient prioritization.
          </p>
          <p className="text-base text-gray-400">
            Built to transform raw clinic data into operational decisions.
          </p>
        </header>

        {/* B. Project Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Project Overview</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Dental Clinic AI is an operational decision system designed for
            clinics. It combines scheduling intelligence, patient
            prioritization, and financial analysis into a single system that
            supports day-to-day operations. Instead of merely recording
            appointments and revenue, the system helps teams make better
            decisions about scheduling, resource allocation, and patient
            prioritization.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The system sits at the intersection of clinic operations, decision
            intelligence, and workflow support — turning operational data into
            actionable outputs for scheduling, prioritization, and financial
            visibility.
          </p>
        </section>

        {/* C. The Problem */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            The Problem
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Many clinic systems only record data. They store appointments,
            patient information, and financial transactions — but they do not
            help teams make operational decisions. Scheduling remains manual
            and reactive. Prioritization is ad hoc. Financial and operational
            information often stay disconnected.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The result: scheduling inefficiencies, unclear patient
            prioritization, and underused data. Teams spend time on manual
            coordination instead of focusing on patient care and strategic
            decisions. Financial insights arrive too late to influence
            day-to-day operations.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The business need is clear: clinics need systems that diagnose
            operational constraints, surface higher-value opportunities, and
            structure data so it can drive decisions — not just record them.
          </p>
        </section>

        {/* D. The System */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            The System
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Dental Clinic AI is built around a decision engine that processes
            clinic data and produces structured recommendations. The system
            focuses on:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-300 ml-4">
            <li>
              <strong className="text-white">Decision engine</strong> — Core
              logic that evaluates scheduling, prioritization, and financial
              signals to produce actionable outputs.
            </li>
            <li>
              <strong className="text-white">Patient ranking and
              prioritization</strong> — Surfaces which patients or slots merit
              higher attention based on value, urgency, and operational
              constraints.
            </li>
            <li>
              <strong className="text-white">Scheduling recommendations</strong>{" "}
              — Suggests optimal slot allocation, capacity use, and timing based
              on available data.
            </li>
            <li>
              <strong className="text-white">Financial intelligence layer</strong>{" "}
              — Connects revenue, procedure mix, and patient value to
              operational visibility.
            </li>
            <li>
              <strong className="text-white">Workflow automation support</strong>{" "}
              — Structures outputs so they can feed into scheduling tools,
              dashboards, or internal workflows.
            </li>
            <li>
              <strong className="text-white">Structured outputs</strong> — JSON
              and other machine-readable formats for integration and downstream
              use.
            </li>
          </ul>
        </section>

        {/* E. Core Capabilities */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Core Capabilities
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Intelligent scheduling support — slot optimization and capacity awareness",
              "Patient prioritization — value and urgency-based ranking",
              "Financial-value-aware analysis — revenue and procedure mix visibility",
              "Workflow support for clinic teams — structured outputs for operations",
              "Actionable structured outputs — JSON responses for integration",
              "Decision support from operational data — diagnosis before action",
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

        {/* F. System Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            System Architecture
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The system follows a data-in, decision-out flow. Operational data
            (appointments, patients, procedures, financial records) is
            processed through scoring and ranking logic, then formatted into
            structured recommendations.
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre className="whitespace-pre">
{`[Operational Data] 
       ↓
[Scoring & Ranking Engine]
       ↓
[Decision Layer: Prioritization | Scheduling | Financial]
       ↓
[Structured Outputs: JSON | Recommendations]`}
            </pre>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            This architecture keeps logic centralized and outputs consistent,
            making it easier to integrate with existing clinic tools or
            dashboards.
          </p>
        </section>

        {/* G. Example Outputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Example Outputs
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The system returns structured data that downstream tools can consume.
            Example formats:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Prioritization Output
              </h3>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre">
{`{
  "patients": [
    { "id": "P001", "rank": 1, "urgency_score": 0.92, "value_tier": "high" },
    { "id": "P002", "rank": 2, "urgency_score": 0.78, "value_tier": "medium" }
  ],
  "recommendation": "Prioritize P001 for next available slot"
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Scheduling Recommendation
              </h3>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre">
{`{
  "suggested_slots": ["09:00", "14:00"],
  "reason": "Capacity optimization and patient mix balance",
  "confidence": 0.85
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* H. Business Impact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Business Impact
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The system is designed to deliver practical operational value:
          </p>
          <ul className="space-y-3 text-lg text-gray-300 list-disc list-inside ml-4">
            <li>Improve scheduling visibility — clearer view of capacity, slot usage, and bottlenecks</li>
            <li>Reduce manual operational decision-making — structured recommendations instead of guesswork</li>
            <li>Help clinics prioritize higher-value opportunities — value-aware ranking and prioritization</li>
            <li>Connect financial and operational data — revenue, procedures, and scheduling in one view</li>
            <li>Support more consistent workflow decisions — repeatable logic, not ad hoc judgments</li>
          </ul>
        </section>

        {/* I. Technology / Build Notes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-300">
            Technology / Build Notes
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Built with a focus on clarity, maintainability, and integration:
          </p>
          <ul className="space-y-2 text-lg text-gray-300 list-disc list-inside ml-4">
            <li>Python — core logic, scoring, and API layer</li>
            <li>SQLite — local storage for operational data and state</li>
            <li>REST APIs — structured input/output for external systems</li>
            <li>Scoring and ranking logic — configurable weights and thresholds</li>
            <li>Structured data pipeline — ingestion, processing, output formatting</li>
          </ul>
        </section>

        {/* J. Final CTA */}
        <section className="border-t border-white/10 pt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Interested in a Similar System?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            If you run a clinic or service business and need operational
            decision support — scheduling, prioritization, or financial
            intelligence — we can discuss how to adapt this approach to your
            context.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-gray-200 transition-colors"
            >
              Discuss a Similar System
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore More Systems
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Start with Diagnosis
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

// app/decision-diagnostic/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from '@/app/lib/seo';
import QuickDecisionCheckForm from "@/components/QuickDecisionCheckForm";

export const metadata: Metadata = {
  title: "Decision & Conversion Diagnostic | CRO & Growth Strategy | Nima Saraeian",
  description:
    "A decision-focused CRO audit to identify why users hesitate before converting. Get a concise report with top blockers, trust gaps, and prioritized fixes within 48 hours.",
  alternates: { canonical: getCanonicalUrl('/decision-diagnostic') },
  openGraph: {
    title: "Decision & Conversion Diagnostic",
    description:
      "Identify decision friction, trust gaps, and clarity issues that block conversion — before spending more on ads or redesign.",
    url: getCanonicalUrl('/decision-diagnostic'),
    type: "website",
  },
};

export default function DecisionDiagnosticPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <p className="text-sm tracking-wide text-gray-400 uppercase" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            CRO & Growth Strategy Service
          </p>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Decision &amp; Conversion Diagnostic
          </h1>

          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            If users hesitate, the problem is often not traffic — it's decision friction.
            I diagnose clarity, trust, risk, and effort issues that silently reduce conversion
            across your website, landing pages, or funnels.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors"
              href="#quick-decision-check"
            >
              Request a Diagnostic
            </a>

            <a
              className="rounded-full border border-white/50 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              href="#quick-decision-check"
            >
              Start with a Quick Decision Check
            </a>
          </div>

          <p className="text-sm text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Typical delivery: <strong className="text-gray-300">48 hours</strong> · Output: <strong className="text-gray-300">PDF report</strong> · Scope:{" "}
            <strong className="text-gray-300">diagnosis</strong> (no execution required)
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>What this is</h2>
            <p className="mt-3 text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              A structured decision audit based on behavioral conversion principles.
              I identify where users slow down or stop, and what to change first to
              increase decision momentum.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>What this is not</h2>
            <p className="mt-3 text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Not generic "tips", not a redesign pitch, and not clinical psychology.
              This is a practical CRO diagnostic focused on clarity, trust, perceived risk,
              and the next-step decision.
            </p>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Decision Checklist</h2>
        <p className="mt-3 text-gray-300 max-w-3xl leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Each category is scored as <strong className="text-white">OK</strong>, <strong className="text-white">Needs Attention</strong>, or{" "}
          <strong className="text-white">Unclear</strong> — with evidence and fixes.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Clarity",
              desc: "In 3–5 seconds: what is it, who is it for, and what happens next?",
            },
            {
              title: "Relevance",
              desc: "Does the target user see themselves here (level, context, pain, goals)?",
            },
            {
              title: "Trust",
              desc: "Do we see credible proof (signals, specifics, cases), not just claims?",
            },
            {
              title: "Risk",
              desc: "Is perceived risk reduced (guarantees, reversals, clarity, safe exits)?",
            },
            {
              title: "Effort",
              desc: "Is the first step easy? Are forms, steps, and choices simplified?",
            },
            {
              title: "Decision Momentum",
              desc: "Is there a reason to act now (without fake urgency)?",
            },
            {
              title: "CTA Quality",
              desc: "Is the CTA specific and aligned with the user's current confidence?",
            },
            {
              title: "Emotional Safety",
              desc: "Does the page reduce fear of judgment, failure, or commitment pressure?",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{item.title}</h3>
              <p className="mt-2 text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>What you get</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              <li>PDF report (3–6 pages) with decision blockers and evidence</li>
              <li>Top 3 priority fixes (quick wins)</li>
              <li>Copy + CTA improvement suggestions</li>
              <li>Trust &amp; risk reduction recommendations</li>
              <li>Optional: event tracking suggestions (GA4 / basic funnel)</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>How it works</h2>
            <ol className="mt-4 list-decimal pl-5 space-y-2 text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              <li>You send the URL (and goal: purchase / lead / booking / signup).</li>
              <li>I run a structured decision audit across your key pages.</li>
              <li>You receive a concise report with priorities and next actions.</li>
            </ol>
            <p className="mt-4 text-sm text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              If needed, we can add a short follow-up call (optional).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Request a Diagnostic</h2>
          <p className="mt-3 text-gray-300 max-w-3xl leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Send your URL and your main conversion goal. I'll reply with scope confirmation and the
            next steps.
          </p>

          <p className="text-sm text-gray-400 mt-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Prefer email? You can also send your material to{" "}
            <a href="mailto:nima@nimasaraeian.com" className="underline text-blue-300 hover:text-blue-200">
              nima@nimasaraeian.com
            </a>
          </p>
        </div>
      </section>

      {/* QUICK DECISION CHECK */}
      <section id="quick-decision-check" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Quick Decision Check</h2>
          <p className="mt-3 text-gray-300 max-w-3xl leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Send a short piece of copy or a visual (ad, hero section, landing screenshot).
            I'll review it personally using a decision-focused checklist to identify where
            users may hesitate before converting — and why.
          </p>
          <p className="mt-2 text-sm text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Scope: short content only · Output: brief written feedback ·
            Focus: clarity, trust, perceived risk · Not a full report
          </p>

          <ul className="mt-6 list-disc pl-5 space-y-2 text-gray-300 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            <li>2–3 decision friction points</li>
            <li>Why they may slow down user decisions</li>
            <li>One clear suggestion to improve clarity or trust</li>
          </ul>

          <QuickDecisionCheckForm />
        </div>
      </section>

      {/* FOOTNOTE */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Note: This diagnostic focuses on behavioral conversion and decision friction — it does not
          provide clinical psychological assessment.
        </p>
      </section>
    </main>
  );
}


import { Metadata } from "next";
import Image from "next/image";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "AI Business Automation Specialist | CRM, Lead & Ops Automation – Nima Saraeian",
  description:
    "Automate CRM, lead capture, onboarding, support, and reporting with AI. Streamline operations, cut costs, and scale with intelligent systems designed by Nima Saraeian.",
  alternates: {
    canonical: `${SITE.baseUrl}/ai-business-automation`,
  },
  openGraph: {
    title: "AI Business Automation Specialist | Streamlined, Intelligent Operations",
    description:
      "End-to-end AI business automation: CRM, lead qualification, support automation, analytics & forecasting.",
    url: `${SITE.baseUrl}/ai-business-automation`,
    type: "article",
    images: [{ url: `${SITE.baseUrl}/image/nima-saraeian-AI-Business-Automation-Specialist.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Business Automation Specialist – Nima Saraeian",
    description:
      "AI-driven workflow automation across CRM, support, analytics and operations.",
    images: [`${SITE.baseUrl}/image/nima-saraeian-AI-Business-Automation-Specialist.jpg`],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "AI Business Automation Specialist — Intelligent Systems for Scalable Operations",
    "description":
      "A complete guide by Nima Saraeian to automating CRM, lead capture, onboarding, support, analytics and reporting with AI — secure, compliant, and measurable.",
    "author": { "@type": "Person", "name": "Nima Saraeian", "url": SITE.baseUrl },
    "mainEntityOfPage": `${SITE.baseUrl}/ai-business-automation`,
    "datePublished": "2025-11-06",
    "image": `${SITE.baseUrl}/image/nima-saraeian-AI-Business-Automation-Specialist.jpg`
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* H1 */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        AI Business Automation Specialist — Streamlining Operations with Intelligent Systems
      </h1>

      {/* Intro */}
      <p className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        As an <strong className="text-white">AI Business Automation Specialist</strong>, I design and implement end-to-end systems that remove
        bottlenecks, reduce costs, and accelerate growth. From <em>lead capture and qualification</em> to
        <em> onboarding, support, analytics,</em> and <em>reporting</em>, your core processes become predictable,
        measurable, and scalable. This page outlines the strategy, architecture, and safeguards behind automation that
        actually delivers business value.
      </p>

      {/* Hero image */}
      <div className="my-8 flex justify-center">
        <Image
          src="/image/nima-saraeian-AI-Business-Automation-Specialist.jpg"
          alt="AI Business Automation Specialist – CRM, lead automation, support and analytics"
          width={600}
          height={400}
          className="rounded-xl w-1/2 h-auto"
          priority
        />
      </div>

      {/* Value */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Why AI Business Automation Now?</h2>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        In 2025, growth is gated by <strong className="text-white">operational friction</strong>, not just marketing reach. Teams are stuck in
        repetitive workflows: manual CRM updates, inconsistent lead follow-ups, fragmented onboarding, slow support,
        and scattered reporting. With intelligent automation, we turn these pain points into one connected system that
        <strong className="text-white"> qualifies faster</strong>, <strong className="text-white"> responds sooner</strong>, and <strong className="text-white"> learns over time</strong>.
      </p>
      <ul className="list-disc ml-8 leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <li><strong className="text-white">Lower CAC, higher velocity:</strong> auto-score and route leads, reduce delays and leakage.</li>
        <li><strong className="text-white">Consistent experience:</strong> scripted, brand-safe responses with escalation logic.</li>
        <li><strong className="text-white">Decision clarity:</strong> dashboards, anomaly alerts, and forecast models for planning.</li>
      </ul>

      {/* Capabilities */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Core Capabilities</h2>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>1) CRM & Pipeline Automation</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Capture leads from forms, chat, social DMs, and landing pages. Auto-enrich profiles, deduplicate contacts, score
        intent, and route to the right owner. Trigger sequences (email/SMS/chat) based on segment, stage, and priority.
        All interactions sync back to CRM with audit trails and GDPR/PII safeguards.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>2) Lead Qualification & Onboarding</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Conversational AI triages inquiries, asks clarifying questions, and books calls when qualified. For SaaS and
        clinics, we orchestrate onboarding steps, reminders, and educational content to increase activation and show-up
        rates — while capturing structured feedback for continuous improvement.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>3) Support Automation & Escalation</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        AI support agents handle FAQs, policies, appointment changes, and basic troubleshooting with tone control and
        brand voice. When signals indicate risk (anger, urgency, VIP), the system escalates to a human with full context,
        minimizing churn and improving CSAT.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>4) Analytics, Reporting & Forecasts</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Real-time dashboards aggregate conversion rates, time-to-first-response, pipeline health, and cohort retention.
        Forecasts predict capacity, demand spikes, and potential bottlenecks. Leaders decide based on signal, not guesswork.
      </p>

      {/* Implementation */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Implementation Roadmap</h2>
      <ol className="list-decimal ml-8 leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <li><strong className="text-white">Discovery & Diagnostics:</strong> map workflows, tools, handoffs, and failure points.</li>
        <li><strong className="text-white">Architecture:</strong> define data model, events, guardrails, and integrations.</li>
        <li><strong className="text-white">Pilot:</strong> automate one high-impact workflow (e.g., lead capture → qualification → booking).</li>
        <li><strong className="text-white">Rollout:</strong> expand to support, onboarding, and reporting; document SOPs and owner rules.</li>
        <li><strong className="text-white">Training:</strong> enable teams with playbooks and escalation guidelines.</li>
        <li><strong className="text-white">Monitoring:</strong> analytics, QA reviews, continuous improvement and cost controls.</li>
      </ol>

      {/* Guardrails */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Security, Privacy & Compliance</h2>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Automation must be <strong className="text-white">safe</strong>. We implement role-based access, data minimization, PII redaction, and
        event logging. Prompts and tools use <em>allow-lists</em>, responses are constrained to brand-approved knowledge,
        and sensitive flows require human-in-the-loop. Consent banners and preferences are respected across channels.
      </p>

      {/* Use-Cases */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>High-Impact Use-Cases</h2>
      <ul className="list-disc ml-8 leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <li><strong className="text-white">Clinics:</strong> lead intake, pre-qualification, scheduling, reminders, and post-visit NPS.</li>
        <li><strong className="text-white">SaaS & B2B:</strong> demo booking, PQL scoring, onboarding sequences, renewal nudges.</li>
        <li><strong className="text-white">Local services:</strong> instant quotes, appointment flows, review generation, and win-back loops.</li>
      </ul>

      {/* Turkish */}
      <h3 className="text-2xl font-semibold mt-10 mb-2 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Türkçe Açıklama</h3>
      <p lang="tr" className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <strong className="text-white">AI Business Automation</strong> ile CRM, lead yönetimi, randevu, destek ve raporlama tek bir akışta
        birleşir. Tekrarlayan işler otomatikleşir, yanıt süreleri kısalır ve süreçler ölçülebilir hâle gelir. Güvenlik,
        gizlilik ve uyumluluk (KVKK/GDPR) ilkeleri korunur.
      </p>

      {/* Persian */}
      <h3 className="text-2xl font-semibold mt-6 mb-2 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>پاراگراف فارسی</h3>
      <p lang="fa" dir="rtl" className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        در <strong>اتوماسیون کسب‌وکار با هوش مصنوعی</strong>، از جذب و امتیازدهی لید تا زمان‌بندی، پشتیبانی و گزارش‌گیری،
        همه‌چیز یکپارچه و خودکار می‌شود. نتیجه: سرعت بالاتر، هزینه کمتر، تجربه مشتری بهتر، و تصمیم‌گیری دقیق‌تر.
      </p>

      {/* FAQ */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>FAQ</h2>
      <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Will automation replace my team?</h3>
      <p className="text-lg leading-8 mb-3 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        No. It removes repetitive work so your team can focus on high-value conversations, complex cases, and strategy.
      </p>
      <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Which tools do you integrate?</h3>
      <p className="text-lg leading-8 mb-3 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        We work with your stack (CRM, calendar, email, helpdesk). If gaps exist, we suggest best-fit tools and implement
        minimal, secure bridges.
      </p>
      <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>How do you measure success?</h3>
      <p className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Time-to-first-response, qualified-lead rate, show-up rate, resolution time, CSAT, conversion, and cost per action —
        visible on dashboards from day one.
      </p>

      {/* CTA */}
      <div className="mt-8 text-center">
        <a
          href="/contact?utm_source=site&utm_medium=cta&utm_campaign=ai-business-automation"
          className="inline-block rounded-xl border-2 border-white px-5 py-3 hover:bg-white hover:text-black transition text-white font-semibold"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
        >
          Request an Automation Audit →
        </a>
      </div>

      {/* Internal links */}
      <p className="mt-6 text-sm text-gray-400 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Related:{" "}
        <a href="/ai-automation-consultant" className="text-blue-400 hover:text-blue-300 underline">AI Automation Specialist</a> ·{" "}
        <a href="/ai-marketing-specialist" className="text-blue-400 hover:text-blue-300 underline">AI Marketing Specialist</a> ·{" "}
        <a href="/consumer-behavior-analyst" className="text-blue-400 hover:text-blue-300 underline">Consumer Behavior Analyst</a>
      </p>
    </main>
  );
}

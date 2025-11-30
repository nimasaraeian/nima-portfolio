import { Metadata } from "next";
import Link from "next/link";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Performance Marketing Specialist | Nima Saraeian",
  description:
    "AI-led performance marketing systems that connect paid media, creative testing, and measurement loops to scale lead generation and revenue.",
  alternates: { canonical: `${SITE.baseUrl}/performance-marketing` },
  openGraph: {
    title: "Performance Marketing Specialist | Nima Saraeian",
    description:
      "Data-driven performance marketing built with AI intelligence, experimentation, and creative optimization for paid channels.",
    url: `${SITE.baseUrl}/performance-marketing`,
    type: "website",
    images: [{ url: `${SITE.baseUrl}${SITE.ogImage}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Marketing Specialist | Nima Saraeian",
    description:
      "AI-powered performance marketing: paid media, experimentation, and measurement loops for predictable ROI.",
    images: [`${SITE.baseUrl}${SITE.ogImage}`]
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Performance Marketing Specialist",
  serviceType: "Performance Marketing",
  description:
    "AI-powered media, measurement, and experimentation framework for Meta, TikTok, search, and LinkedIn paid channels.",
  provider: {
    "@type": "Person",
    name: "Nima Saraeian",
    url: SITE.baseUrl
  },
  areaServed: "Global",
  url: `${SITE.baseUrl}/performance-marketing`,
  hasPart: [
    { "@type": "CreativeWork", name: "Data-backed media planning" },
    { "@type": "CreativeWork", name: "Creative testing & hooks engine" },
    { "@type": "CreativeWork", name: "Measurement & attribution loop" }
  ]
};

export default function PerformanceMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-blue-200/80">Performance Marketing</p>
          <h1
            className="mt-3 text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Times New Roman, Times, serif" }}
          >
            AI-powered performance loops that keep CAC in check.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl" style={{ fontFamily: "Times New Roman, Times, serif" }}>
            I design paid media systems that connect experiments, creative intelligence, and attribution so every channel
            contributes to predictable pipeline growth while your brand stays human.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Channel Strategy",
                body: "Unified planning for Meta, TikTok, YouTube, LinkedIn, search, and affiliates with AI-informed budget pacing."
              },
              {
                title: "Creative + Experimentation",
                body: "Hook libraries, AI caption engines, and rapid multivariate testing that finds the signal in noisy feeds."
              },
              {
                title: "Measurement & Optimization",
                body: "Attribution models, KPI dashboards, and automation that routes learnings back into new creative + spend decisions."
              }
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_60px_-40px_rgba(0,0,0,0.9)]">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-gray-300">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact?utm_source=site&utm_medium=cta&utm_campaign=performance-marketing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Book a session
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Back to services
            </Link>
          </div>
        </section>
        <section className="mt-12 text-white">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "Times New Roman, Times, serif" }}>
            What you get
          </h2>
          <ul className="mt-6 space-y-3 text-gray-300">
            {[
              "Media + budget blueprint with AI-informed pacing across high-intent and discovery channels.",
              "Creative hypothesis bank + captioning engine aligned with behavioral storytelling.",
              "Experimentation calendar with guardrails, escalation, and rapid iteration.",
              "Attribution stack, dashboards, and AI observation loops that feed new creative briefs."
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
























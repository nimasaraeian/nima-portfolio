import { Metadata } from "next";
import Image from "next/image";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "AI Marketing Specialist | Predictive, Personalized, Performance-Oriented – Nima Saraeian",
  description:
    "AI Marketing Specialist designing predictive segmentation, creative intelligence, and multi-variant testing across Instagram, TikTok, LinkedIn, YouTube, Email, and SEO. Data-driven, psychology-backed growth systems.",
  alternates: {
    canonical: `${SITE.baseUrl}/ai-marketing-expert`,
  },
  openGraph: {
    title: "AI Marketing Specialist | Predictive Segmentation & Creative Intelligence",
    description:
      "Build AI-powered marketing systems: predictive audiences, message testing, creative intelligence, and performance loops.",
    url: `${SITE.baseUrl}/ai-marketing-expert`,
    type: "article",
    images: [{ url: `${SITE.baseUrl}/image/Nima-saraeian-AI-Marketing-Specialist-Predictive-Personalized-Performance.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Specialist – Nima Saraeian",
    description:
      "Predictive, personalized, performance-oriented AI marketing across channels.",
    images: [`${SITE.baseUrl}/image/Nima-saraeian-AI-Marketing-Specialist-Predictive-Personalized-Performance.jpg`],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "AI Marketing Specialist — Predictive, Personalized, Performance-Oriented",
    description:
      "A complete guide by Nima Saraeian on predictive segmentation, creative intelligence, message testing, and performance loops for AI-powered marketing.",
    author: { "@type": "Person", name: "Nima Saraeian", url: SITE.baseUrl },
    mainEntityOfPage: `${SITE.baseUrl}/ai-marketing-expert`,
    datePublished: "2025-11-06",
    image: `${SITE.baseUrl}/image/Nima-saraeian-AI-Marketing-Specialist-Predictive-Personalized-Performance.jpg`
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* H1 */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        AI Marketing Specialist — Predictive, Personalized, Performance-Oriented
      </h1>

      {/* Intro */}
      <p className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        As an <strong className="text-white">AI Marketing Specialist</strong>, I design growth systems that blend{" "}
        <em>predictive segmentation</em>, <em>creative intelligence</em>, and{" "}
        <em>multi-variant testing</em> across Instagram, TikTok, LinkedIn, YouTube, Email, and SEO.
        Marketing in 2025 isn't guesswork; it's a measurable, psychology-backed engine that learns
        weekly and compounds results. This page explains the approach, the playbooks, and the outcomes
        brands, clinics, and startups can expect from AI-powered marketing.
      </p>

      {/* Hero image */}
      <div className="my-8 flex justify-center">
        <Image
          src="/image/Nima-saraeian-AI-Marketing-Specialist-Predictive-Personalized-Performance.jpg"
          alt="AI Marketing Specialist — predictive segmentation, creative intelligence, multi-variant testing"
          width={600}
          height={400}
          className="rounded-xl w-1/2 h-auto"
          priority
        />
      </div>

      {/* Approach */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Approach: From Signals to Strategy</h2>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        The job is to transform noisy data into clear actions. I start by mapping the
        customer journey, identifying psychological triggers, and instrumenting each touchpoint
        so we can observe <strong className="text-white">what actually drives decisions</strong>. Then we deploy AI tools
        to scale research, generate creative variants, and prioritize the bets most likely to win.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Predictive Segmentation</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        We score audiences using behavioral and contextual signals: recency, engagement quality,
        content preferences, and time-of-day response patterns. The result is a living segmentation
        model that improves targeting and reduces wasted impressions.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Creative Intelligence</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Using multimodal AI, we generate hooks, structures, tones, and visual motifs aligned to
        brand positioning and platform physics. Creative variants are tested continuously to learn
        which narratives drive saves, shares, replies, and conversions.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Multi-Variant Message Testing</h3>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Every high-impact message is treated as a hypothesis. We run lightweight experiments on
        headlines, captions, CTAs, and visuals. Signals flow into a loop that prioritizes the next
        best variant, compounding performance without "starting over" each campaign.
      </p>

      {/* Channels */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Channel Playbooks (Instagram, TikTok, LinkedIn, YouTube, Email, SEO)</h2>
      <ul className="list-disc ml-8 leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <li>
          <strong className="text-white">Instagram:</strong> save/share optimization, carousel narrative rules, caption engine,
          story CTAs, highlight architecture, and aesthetic consistency.
        </li>
        <li>
          <strong className="text-white">TikTok:</strong> 3-second hook frameworks, pattern interrupts, creator-style
          synthesis, and retention windows measured against watch-time curves.
        </li>
        <li>
          <strong className="text-white">LinkedIn:</strong> authority-led narratives, POV frameworks, and comment-triggering
          prompts for B2B demand capture.
        </li>
        <li>
          <strong className="text-white">YouTube:</strong> meta-hook titles/thumbnails, chapterized scripting, and session-based
          retention for suggested traffic.
        </li>
        <li>
          <strong className="text-white">Email:</strong> behavior-triggered sequences, quick-win offers, and post-click
          continuity to align landing pages with message intent.
        </li>
        <li>
          <strong className="text-white">SEO:</strong> topic clusters, internal link graphs, and intent-matched long-form content
          that earns backlinks naturally.
        </li>
      </ul>

      {/* Measurement */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Measurement: Metrics That Actually Matter</h2>
      <p className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Vanity metrics are not strategy. We monitor leading indicators that predict outcomes:
      </p>
      <ul className="list-disc ml-8 leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <li><strong className="text-white">Save/Share rate</strong> as a proxy for relevance and referral.</li>
        <li><strong className="text-white">Time-to-first-response</strong> and reply quality for conversational channels.</li>
        <li><strong className="text-white">Assisted conversions</strong> and session stitching across ads, social, and SEO.</li>
        <li><strong className="text-white">Creative win rate</strong> by variant, topic, and audience segment.</li>
      </ul>
      <p className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Dashboards show what to amplify, what to pause, and where the next marginal gain lives.
        Leaders stop guessing and start compounding.
      </p>

      {/* Case studies */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Outcomes & Case Patterns</h2>
      <ul className="list-disc ml-8 leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        <li>
          <strong className="text-white">Clinics:</strong> inbound lead volume up, no-show rates down using reminder logic and
          message congruence between ads → DM → booking.
        </li>
        <li>
          <strong className="text-white">B2B/LinkedIn:</strong> authority positioning increases profile clicks, demo
          requests, and referral reach.
        </li>
        <li>
          <strong className="text-white">DTC/Instagram:</strong> save/share led growth, UGC remix frameworks, and offer
          sequences that convert cold attention into warm demand.
        </li>
      </ul>

      {/* Ethics */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Ethics & Guardrails</h2>
      <p className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Personalization must be beneficial and respectful. We default to consent-based data usage,
        transparent messaging, brand-safe creative constraints, and "human-in-the-loop" reviews for
        sensitive claims. Sustainable growth depends on trust.
      </p>

      {/* Turkish */}
      <h3 className="text-2xl font-semibold mt-10 mb-2 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Türkçe Açıklama</h3>
      <p lang="tr" className="text-lg leading-8 mb-4 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Bir <strong className="text-white">AI Marketing Specialist</strong> olarak hedef kitleyi davranışsal sinyallerle
        segmente eder, yaratıcı varyasyonları test eder ve kanallar arasında performansı sürekli
        artıran döngüler kurarım. Amaç: tahmine dayalı değil, ölçülebilir büyüme.
      </p>

      {/* Persian */}
      <h3 className="text-2xl font-semibold mt-6 mb-2 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>پاراگراف فارسی</h3>
      <p lang="fa" dir="rtl" className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        در نقش <strong>متخصص بازاریابی هوش مصنوعی</strong>، بخش‌بندی پیش‌بینانه، هوش خلاق،
        و تست چندمتغیره را اجرا می‌کنم تا رشد، قابل اندازه‌گیری و پایدار شود—نه شانسی.
      </p>

      {/* FAQ */}
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>FAQ</h2>
      <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Do you run ads or only organic?</h3>
      <p className="text-lg leading-8 mb-3 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Both. We design a balanced mix where organic builds authority and ads accelerate validated
        messages. The same testing loop informs both.
      </p>
      <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>How fast will results show?</h3>
      <p className="text-lg leading-8 mb-3 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        We typically see directional signals within weeks—save/share uplift, reply quality, and lower
        CPA on validated variants—then compound monthly.
      </p>
      <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" style={{ fontFamily: 'Times New Roman, Times, serif' }}>What tools do you use?</h3>
      <p className="text-lg leading-8 mb-6 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        We adapt to your stack. Where gaps exist, we recommend lean, secure tools and integrate them
        with minimal overhead.
      </p>

      {/* CTA */}
      <div className="mt-8 text-center">
        <a
          href="/contact?utm_source=site&utm_medium=cta&utm_campaign=ai-marketing-expert"
          className="inline-block rounded-xl border-2 border-white px-5 py-3 hover:bg-white hover:text-black transition text-white font-semibold"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
        >
          Book a Strategy Session →
        </a>
      </div>

      {/* Internal links */}
      <p className="mt-6 text-sm text-gray-400 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Related:{" "}
        <a href="/ai-content-creation-specialist" className="text-blue-400 hover:text-blue-300 underline">AI Content Creation Specialist</a>{" "}
        · <a href="/consumer-behavior-analyst" className="text-blue-400 hover:text-blue-300 underline">Consumer Behavior Analyst</a>{" "}
        · <a href="/ai-branding-specialist" className="text-blue-400 hover:text-blue-300 underline">AI Branding Specialist</a>
      </p>
    </main>
  );
}

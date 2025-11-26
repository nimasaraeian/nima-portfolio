import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Consumer Behavior Strategist — AI-Driven Decision Psychology to Increase Conversions | Nima Saraeian',
  description: 'Work with a Consumer Behavior Strategist who uses AI-driven decision psychology, cognitive biases, and digital behavior analysis to understand why users convert, hesitate, or drop off — and increase conversions by 30–150%.',
  keywords: 'consumer behavior strategist, decision psychology, AI behavioral marketing, cognitive biases, conversion rate optimization, behavioral strategy, digital decision science, consumer psychology, AI marketing specialist',
  alternates: {
    canonical: 'https://nimasaraeian.com/consumer-behavior-analyst',
  },
  openGraph: {
    type: 'article',
    url: 'https://nimasaraeian.com/consumer-behavior-analyst',
    title: 'Consumer Behavior Strategist — AI-Driven Decision Psychology to Increase Conversions | Nima Saraeian',
    description: 'Work with a Consumer Behavior Strategist who uses AI-driven decision psychology, cognitive biases, and digital behavior analysis to understand why users convert, hesitate, or drop off — and increase conversions by 30–150%.',
    siteName: 'Nima Saraeian',
    authors: ['Nima Saraeian'],
    publishedTime: '2025-01-15T08:00:00.000Z',
    modifiedTime: '2025-01-15T08:00:00.000Z',
    images: [
      {
        url: 'https://nimasaraeian.com/image/Nima-saraeian-Consumer-Behavior-Analyst-Decisions-Biases-and-Digital-Triggers.jpg',
        width: 1200,
        height: 630,
        alt: 'Consumer Behavior Strategist - AI-Driven Decision Psychology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consumer Behavior Strategist — AI-Driven Decision Psychology for Conversion Growth',
    description: 'Learn how Consumer Behavior Strategists use AI and psychology to understand why people buy and increase conversions.',
    images: [
      {
        url: 'https://nimasaraeian.com/image/Nima-saraeian-Consumer-Behavior-Analyst-Decisions-Biases-and-Digital-Triggers.jpg',
        width: 1200,
        height: 630,
        alt: 'Consumer Behavior Strategist',
      },
    ],
  },
};

export default function ConsumerBehaviorAnalystPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Consumer Behavior Strategist — AI-Driven Decision Psychology for Conversion Growth",
    "description": "Learn how Consumer Behavior Strategists use AI and psychology to understand why people buy, predict decisions, and increase conversions.",
    "author": {
      "@type": "Person",
      "name": "Nima Saraeian"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nima Saraeian Signature"
    },
    "mainEntityOfPage": "https://nimasaraeian.com/consumer-behavior-analyst",
    "keywords": "Consumer Behavior Strategist, Consumer Behavior Analyst, decision psychology, conversion optimization, behavioral analysis",
    "image": "https://nimasaraeian.com/image/Nima-saraeian-Consumer-Behavior-Analyst-Decisions-Biases-and-Digital-Triggers.jpg",
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15",
    "url": "https://nimasaraeian.com/consumer-behavior-analyst"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does a Consumer Behavior Strategist do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Consumer Behavior Strategist combines AI observation, psychology models, and behavioral analysis to understand how users think, predict decisions before they happen, and ethically influence conversions by reducing psychological friction."
        }
      },
      {
        "@type": "Question",
        "name": "How is Consumer Behavior Strategy different from traditional marketing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consumer Behavior Strategy focuses on understanding the psychology behind decisions, not just tracking clicks. It uses AI to detect micro-hesitations, predict behavior patterns, and design experiences based on how the brain actually works, not assumptions."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nimasaraeian.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Consumer Behavior Analyst",
        "item": "https://nimasaraeian.com/consumer-behavior-analyst"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consumer Behavior Strategist — AI-Driven Decision Psychology for Conversion Growth",
    "provider": {
      "@type": "Person",
      "name": "Nima Saraeian",
      "url": "https://nimasaraeian.com",
      "jobTitle": "Consumer Behavior Strategist & AI Marketing Specialist"
    },
    "description": "AI-driven consumer behavior strategy combining decision psychology, cognitive biases, predictive behavior analysis, and digital UX signals to increase conversions.",
    "serviceType": "Consumer Behavior Strategy",
    "areaServed": "Global",
    "url": "https://nimasaraeian.com/consumer-behavior-analyst",
    "offers": {
      "@type": "Offer",
      "availability": "OnlineOnly"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 space-y-8 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">Home</Link>
          {' / '}
          <span className="text-gray-500">Consumer Behavior Analyst</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Consumer Behavior Strategist — AI-Driven Decision Psychology for Conversion Growth
          </h1>
          <h2 className="text-xl text-gray-300 font-semibold">
            Part 1: Why People Really Buy — And Why They Don't (The Hidden Decision Game)
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>By Nima Saraeian</span>
            <span>•</span>
            <time dateTime="2025-01-15">January 15, 2025</time>
          </div>
        </header>

        {/* Hero Image */}
        <div className="my-8">
          <Image 
            src="/image/Nima-saraeian-Consumer-Behavior-Analyst-Decisions-Biases-and-Digital-Triggers.jpg"
            alt="Consumer Behavior Strategist - AI-Driven Decision Psychology for Conversion Growth"
            title="Consumer Behavior Strategist"
            width={1200}
            height={630}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>

        {/* CTA After H1 - CTR Optimization */}
        <div className="my-8 p-6 rounded-xl border-2 border-blue-500 bg-blue-900/20">
          <h3 className="text-2xl font-bold text-white mb-3">
            Book Your Behavior Strategy Session
          </h3>
          <p className="text-gray-300 mb-4">
            Understand how your audience thinks, hesitates, and decides — and how to ethically influence their decisions.
          </p>
          <Link
            href="/contact?utm_source=consumer-behavior-analyst&utm_medium=cta-top&utm_campaign=behavior-strategy"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold"
          >
            Book Your Session Now
          </Link>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert max-w-none text-white space-y-6">
          {/* Introduction */}
          <section className="space-y-6">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-xl text-white font-semibold mb-4">
                If there's one truth every business eventually runs into, it's this:
              </p>
              <p className="text-2xl text-white font-bold">
                People don't act the way you expect — they act the way their psychology decides.
              </p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              You can have the perfect product. A beautiful website. A flawless funnel. A clear offer.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              And still…
            </p>

            <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300 leading-relaxed mb-2">
                A user will hover over your CTA button…
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-2">
                Pause…
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-2">
                Hesitate…
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                And disappear.
              </p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              The analytics will show "No conversion."
            </p>

            <p className="text-lg text-white font-semibold">
              But psychology will show a decision that never fully formed.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              This is where the real work begins — not with design, not with ads, not with funnels — but with understanding the mind behind the click.
            </p>

            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-xl text-white font-semibold">
                And that's the entire foundation of Consumer Behavior Strategy.
              </p>
            </div>
          </section>

          {/* The Hidden World of Digital Decisions */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>🌍</span> The Hidden World of Digital Decisions
            </h2>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-lg text-white font-semibold mb-4">
                Here's a secret most marketers overlook:
              </p>
              <p className="text-xl text-white font-bold">
                People aren't rational. They're predictable.
              </p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Their decisions follow patterns — not logical ones, but psychological ones.
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
              <li>Fear of making the wrong choice</li>
              <li>Emotional resonance</li>
              <li>Confusion and cognitive overload</li>
              <li>Uncertainty</li>
              <li>Decision fatigue</li>
              <li>Invisible friction</li>
              <li>Social proof signals</li>
              <li>Cognitive biases</li>
              <li>Micro-interactions</li>
            </ul>

            <p className="text-lg text-gray-300 leading-relaxed my-6">
              Every conversion is actually a psychological moment. Every hesitation is a psychological barrier. Every dropout is a decision abandoned halfway.
            </p>
          </section>

          {/* What a Consumer Behavior Strategist Actually Does */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>🧠</span> What a Consumer Behavior Strategist Actually Does
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              Unlike a marketer, analyst, or CRO specialist, a Consumer Behavior Strategist goes deeper:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">
                  1. Understand how users think, not just what they click.
                </h3>
                <p className="text-gray-300">
                  Analytics tells you where they drop. Behavior psychology tells you why.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">
                  2. Predict decisions before they happen.
                </h3>
                <p className="text-gray-300">
                  Using AI observation + psychology models, you can forecast user actions.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">
                  3. Influence decisions ethically.
                </h3>
                <p className="text-gray-300">
                  Not manipulation — guidance. You help users understand, feel confident, and take action.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">
                  4. Reduce friction they don't even realize exists.
                </h3>
                <p className="text-gray-300">
                  The "mind friction" that kills conversions silently.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">
                  5. Build experiences based on the brain, not on assumptions.
                </h3>
                <p className="text-gray-300">
                  This is the difference between guessing what works and designing what works.
                </p>
              </div>
            </div>
          </section>

          {/* The Real Reason Conversions Don't Happen */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>🎯</span> The Real Reason Conversions Don't Happen
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              Let's tell a story.
            </p>

            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                A user named Sara searches for a beauty clinic in Istanbul.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                She finds your page. She scrolls. She reads testimonials. She checks prices. Something feels "almost right"…
              </p>
              <p className="text-lg text-white font-semibold mb-4">
                But then her brain says:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>"What if this isn't safe?"</li>
                <li>"Is this clinic really professional?"</li>
                <li>"Why are the prices different from others?"</li>
                <li>"Should I wait a bit more?"</li>
              </ul>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              These micro-thoughts appear in 1–3 seconds.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              One cognitive friction point, one moment of hesitation, one emotional doubt —
            </p>

            <p className="text-lg text-white font-semibold">
              And the conversion dies.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Even though: your offer was good, your site was beautiful, your CTA was clear
            </p>

            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-lg">
              <p className="text-xl text-white font-semibold mb-2">This is not a design problem.</p>
              <p className="text-xl text-white font-semibold">This is a psychology problem.</p>
            </div>
          </section>

          {/* The Three Decision Layers */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>🧩</span> The Three Decision Layers Every Human Follows
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              Every customer follows three psychological layers:
            </p>

            <div className="space-y-4">
              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-3">
                  1. Emotional Layer (Fast, subconscious, automatic)
                </h3>
                <p className="text-lg text-gray-300 mb-2">
                  This is where decisions start.
                </p>
                <p className="text-lg text-white font-semibold">
                  Users feel before they think.
                </p>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-3">
                  2. Cognitive Layer (Slow, logical, evaluating)
                </h3>
                <p className="text-lg text-gray-300">
                  This is where decisions get justified.
                </p>
              </div>

              <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-3">
                  3. Behavioral Layer (The actual action)
                </h3>
                <p className="text-lg text-gray-300 mb-2">
                  This is where the conversion happens — or doesn't.
                </p>
              </div>
            </div>

            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg my-6">
              <p className="text-xl text-white font-semibold mb-2">
                If you fail Layer 1 or 2, you never reach Layer 3.
              </p>
              <p className="text-lg text-gray-300 mt-2">
                And this is why most businesses never see the conversions they expect. They optimize the final action (CTA) instead of the first emotion.
              </p>
            </div>
          </section>

          {/* The Science Behind It */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>🎓</span> The Science Behind It (Real Research)
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Here are three real frameworks that prove this:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  1 — Fogg Behavior Model (Stanford University)
                </h3>
                <p className="text-lg text-white font-semibold mb-3">
                  Behavior = Motivation × Ability × Trigger
                </p>
                <p className="text-gray-300 mb-3">
                  Ref: <a href="https://behaviormodel.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">behaviormodel.org</a>
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  2 — Prospect Theory (Kahneman & Tversky)
                </h3>
                <p className="text-lg text-white font-semibold mb-3">
                  People fear losses twice as much as gains.
                </p>
                <p className="text-gray-300 mb-3">
                  Ref: <a href="https://www.princeton.edu/~kahneman/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">princeton.edu/~kahneman</a>
                </p>
              </div>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  3 — Cognitive Load Theory (Sweller)
                </h3>
                <p className="text-lg text-white font-semibold mb-3">
                  Too much information kills decisions.
                </p>
                <p className="text-gray-300 mb-3">
                  Ref: <a href="https://link.springer.com/article/10.1007/BF00375122" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Cognitive Load Theory Research</a>
                </p>
              </div>
            </div>

            <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg my-6">
              <p className="text-lg text-white font-semibold mb-2">
                These aren't marketing tricks — they are neuroscience-backed explanations for why people behave the way they do online.
              </p>
              <p className="text-lg text-gray-300 mt-2">
                And when you design experiences around these principles… Conversions rise naturally.
              </p>
            </div>

            {/* Mid-Article CTA */}
            <div className="my-8 p-6 rounded-xl border-2 border-blue-500 bg-blue-900/20">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to turn behavioral insights into real conversions?
              </h3>
              <p className="text-gray-300 mb-4">
                If you want to go beyond surface-level analytics and truly understand the psychological patterns behind your customers' decisions, we can design a behavior strategy tailored to your audience and funnels.
              </p>
              <Link
                href="/contact?utm_source=consumer-behavior-analyst&utm_medium=cta-mid&utm_campaign=behavior-strategy"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold"
              >
                Book Your Behavior Strategy Session
              </Link>
            </div>
          </section>

          {/* Where AI Changes Everything */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>🚀</span> Where AI Changes Everything
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              AI doesn't replace psychology — it enhances it.
            </p>

            <p className="text-lg text-white font-semibold mb-4">
              As a Consumer Behavior Strategist using AI:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">I can detect micro-hesitations</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">track scroll-stops</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">observe attention patterns</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">detect engagement gaps</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">identify breakdown moments</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">analyze emotional tension in content</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">predict hesitation points</p>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">recognize behavioral fingerprints</p>
              </div>
            </div>

            <p className="text-lg text-white font-semibold mb-4">
              And put all of these into a behavioral model that reveals:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-6">
              <li>→ why users act</li>
              <li>→ when they decide</li>
              <li>→ where they get stuck</li>
              <li>→ what triggers them</li>
              <li>→ what removes friction</li>
              <li>→ what builds trust</li>
            </ul>

            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-xl text-white font-semibold mb-2">AI shows patterns.</p>
              <p className="text-xl text-white font-semibold mb-2">Psychology explains them.</p>
              <p className="text-xl text-white font-semibold">Strategy turns them into revenue.</p>
            </div>

            <p className="text-lg text-white font-semibold mt-6">
              This is the true future of digital behavior analysis.
            </p>
          </section>

          {/* Why This Matters */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
              <span>💡</span> Why This Matters for Your Business
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Because every increase in conversion — 5%, 10%, 20%, 50% — starts from understanding the human behind the screen.
            </p>

            <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300 mb-4">Not more ads.</p>
              <p className="text-lg text-gray-300 mb-4">Not more traffic.</p>
              <p className="text-lg text-gray-300 mb-4">Not more features.</p>
              <p className="text-xl text-white font-semibold mt-4">
                Better decisions. Powered by behavioral strategy.
              </p>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mt-6">
              If you want to see how AI and behavior strategy come together in practice, explore my <Link href="/ai-marketing" className="text-blue-400 hover:text-blue-300 underline font-semibold">AI Marketing services</Link>.
            </p>
          </section>

          {/* CTA Section */}
          <section className="mt-12">
            <div className="p-8 rounded-xl border-2 border-blue-500 bg-blue-900/20">
              <h2 className="text-2xl font-bold text-white mb-3">
                <span>⭐</span> Want to understand how your audience thinks, hesitates, and decides?
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                Learn how to ethically influence their decisions and increase conversions by 30-150%.
              </p>
              <Link
                href="/contact?utm_source=consumer-behavior-analyst&utm_medium=cta-bottom&utm_campaign=behavior-strategy"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold"
              >
                Book Your Behavior Strategy Session Now
              </Link>
            </div>
          </section>

          {/* Part 2 */}
          <section className="mt-16 pt-8 border-t border-gray-700 space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Part 2: The Psychology of Digital Decisions — And How to Engineer Conversions Ethically
              </h2>
            </div>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Welcome back, Nima.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Now that we've uncovered why people really buy (or don't), it's time to go deeper — into the actual psychology behind every scroll, click, hesitation, and decision.
              </p>
            </div>

            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-xl text-white font-semibold mb-4">
                Because here's the truth:
              </p>
              <p className="text-2xl text-white font-bold mb-4">
                👉 Conversions don't happen on screens.
              </p>
              <p className="text-2xl text-white font-bold">
                They happen in the mind.
              </p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Whether someone chooses your clinic, books your service, signs up for your course, or buys your product…
            </p>

            <p className="text-lg text-white font-semibold">
              It's NOT the website making the decision.
            </p>

            <p className="text-lg text-white font-semibold">
              It's their brain doing a real-time emotional & cognitive calculation.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              And as a Consumer Behavior Strategist, your job (and mine) is to influence that calculation — ethically, intelligently, and scientifically.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Let's break down how this works.
            </p>

            {/* The Emotional Temperature */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span>🌡️</span> The Emotional Temperature of Every User
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Every visitor arrives with an emotional temperature. Before they read a single word. Before they evaluate a single detail.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                They are already:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">curious</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">skeptical</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">excited</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">stressed</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">tired</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">hopeful</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">bored</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-white font-semibold">impulsive</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Their emotional temperature shapes <strong className="text-white">80% of their behavior online</strong>.
              </p>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-2">
                  This is called Affective Priming —
                </p>
                <p className="text-gray-300 mb-4">
                  a phenomenon in cognitive psychology where emotions influence decisions before the conscious mind catches up.
                </p>
                <p className="text-sm text-gray-400">
                  Scientific Reference: Bargh, J. A., & Chartrand, T. L. (1999). The Unbearable Automaticity of Being. <a href="https://psycnet.apa.org/record/1999-10277-003" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">View Research</a>
                </p>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                What does it mean for your business?
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                You must design your page so that:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300"><strong className="text-white">stressed users</strong> feel calm</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300"><strong className="text-white">uncertain users</strong> feel clarity</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300"><strong className="text-white">skeptical users</strong> feel trust</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300"><strong className="text-white">impulsive users</strong> feel safety</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300"><strong className="text-white">curious users</strong> feel excitement</p>
                </div>
              </div>

              <p className="text-lg text-white font-semibold mt-6">
                If you do that, your conversions rise even before users read anything.
              </p>
            </section>

            {/* The Cognitive Brain */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span>🧠</span> The Cognitive Brain: The Slow Negotiator
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Once emotions fire, the cognitive brain starts "negotiating."
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                It tries to justify the potential decision:
              </p>

              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>"Do I trust this brand?"</li>
                  <li>"Is this the right choice?"</li>
                  <li>"Is the benefit worth the cost?"</li>
                  <li>"What if I regret it?"</li>
                  <li>"Do other people choose this?"</li>
                  <li>"Is the price fair?"</li>
                </ul>
              </div>

              <p className="text-lg text-white font-semibold">
                This layer is where cognitive biases control the show.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Here are 6 biases every consumer strategist must master:
              </p>

              {/* Bias 1 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  1) Loss Aversion (Prospect Theory)
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Users fear a potential loss 2x more than they value a gain.
                </p>
                <p className="text-lg text-white font-semibold mb-4">This is why messages like:</p>
                <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg mb-4">
                  <p className="text-gray-300">❌ "Save $50"</p>
                </div>
                <p className="text-gray-300 mb-2">are weaker than</p>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg mb-4">
                  <p className="text-gray-300">✔ "Don't lose $50 worth of value"</p>
                </div>
                <p className="text-sm text-gray-400">
                  Source: Kahneman & Tversky - <a href="https://www.princeton.edu/~kahneman/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">View Research</a>
                </p>
              </div>

              {/* Bias 2 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  2) Framing Effect
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  How you frame information changes the decision, even if the facts are the same.
                </p>
                <p className="text-lg text-white font-semibold mb-4">Example:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                    <p className="text-gray-300">"90% success rate" → <strong className="text-white">YES</strong></p>
                  </div>
                  <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300">"10% failure rate" → <strong className="text-white">NO</strong></p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">Same number. Different frame. Different outcome.</p>
              </div>

              {/* Bias 3 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  3) Paradox of Choice
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Too many options = paralysis.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Users freeze when:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                  <li>there are too many packages</li>
                  <li>too many choices</li>
                  <li>too many details</li>
                  <li>too many CTAs</li>
                </ul>
                <p className="text-sm text-gray-400">
                  Source: Barry Schwartz, The Paradox of Choice - <a href="https://www.tandfonline.com/doi/abs/10.1080/1047840X.2011.611789" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">View Research</a>
                </p>
              </div>

              {/* Bias 4 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  4) Social Proof Bias
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  People trust what others trust. Testimonials, reviews, results — these anchor the mind.
                </p>
                <p className="text-lg text-white font-semibold mb-4">But the trick is:</p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  The proof must be emotionally specific, not generic.
                </p>
                <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg mb-4">
                  <p className="text-gray-300">"Great service!"</p>
                  <p className="text-sm text-gray-400 mt-2">means nothing.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">"After 3 weeks my skin looked brighter and I felt confident again."</p>
                  <p className="text-sm text-gray-400 mt-2">means everything.</p>
                </div>
              </div>

              {/* Bias 5 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  5) Anchoring Bias
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  The first number or idea a user sees shapes their entire perception.
                </p>
                <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                  <p className="text-gray-300 mb-2">If the first package they see is <strong className="text-white">$999</strong>…</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>…then <strong className="text-white">$499</strong> feels cheap.</li>
                    <li>…but <strong className="text-white">$149</strong> feels suspicious.</li>
                    <li>…and <strong className="text-white">$1,499</strong> feels premium.</li>
                  </ul>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  Anchoring is one of the most powerful tools in pricing strategy.
                </p>
              </div>

              {/* Bias 6 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  6) Cognitive Load
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Too much text. Too many instructions. Too many steps.
                </p>
                <p className="text-lg text-white font-semibold mb-4">
                  And the brain shuts down.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Cognitive overload is the silent killer of conversions.
                </p>
                <p className="text-sm text-gray-400">
                  Source: Sweller, Cognitive Load Theory - <a href="https://link.springer.com/article/10.1007/BF00375122" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">View Research</a>
                </p>
              </div>
            </section>

            {/* The Behavioral Layer */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span>🌀</span> The Behavioral Layer: Where Action Happens
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                This is the moment of truth — the point where emotion + cognition = action.
              </p>

              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-2">
                  But here's the twist:
                </p>
                <p className="text-lg text-gray-300">
                  Action ≠ Conversion. Action = Momentum.
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Before users convert, they perform micro-actions:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">scroll a little lower</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">hover over a button</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">pause on a headline</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">re-read a sentence</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">zoom into an image</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">check reviews</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">click FAQ</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">look at guarantee</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                These micro-actions are called <strong className="text-white">Behavioral Signals</strong>, and they predict conversion likelihood.
              </p>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-2">AI systems can detect them at scale.</p>
                <p className="text-lg text-white font-semibold mb-2">A strategist can interpret them.</p>
                <p className="text-lg text-white font-semibold">And the combination is pure power.</p>
              </div>
            </section>

            {/* How AI Enhances Behavior Strategy */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span>⚡</span> How AI Enhances Behavior Strategy
              </h2>

              <p className="text-lg text-white font-semibold mb-4">
                AI does not "persuade users." AI observes patterns no human can.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Here's what AI can pick up:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">hesitation zones (5–9 seconds of stall)</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">scroll behavior patterns</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">reading velocity changes</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">attention drift</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">repeated section revisits</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">heat signatures of emotional concern</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">CTA avoidance patterns</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">trust-check behavior</p>
                </div>
              </div>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold">
                  This is behavioral neuroscience, not marketing.
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Once these patterns are detected, I translate them into:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">friction removal</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">page restructuring</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">messaging refinement</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">trigger timing</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">emotional clarity</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">CTA redesign</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">trust anchors</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">choice simplification</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">decision architecture</p>
                </div>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-2">This is where psychology meets engineering.</p>
                <p className="text-xl text-white font-semibold">And where conversions grow predictably.</p>
              </div>
            </section>

            {/* Blueprint */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span>🎯</span> Blueprint of a High-Converting Decision Experience
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Every high-performing digital experience contains three psychological pillars:
              </p>

              {/* Pillar 1 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  1. Clarity
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Users must instantly understand:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                  <li>where they are</li>
                  <li>what they get</li>
                  <li>why it matters</li>
                  <li>what's unique</li>
                  <li>what to do next</li>
                </ul>
                <p className="text-lg text-white font-semibold">
                  Confusion = hesitation. Hesitation = death of conversions.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  2. Safety
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  People convert when they feel safe.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Safety comes from:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">expert positioning</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">transparent pricing</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">social proof</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">trust badges</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">emotional reassurance</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">clear language</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">consistent visuals</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  If your page doesn't feel safe, nothing else matters.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  3. Momentum
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  The brain loves momentum.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Momentum comes from:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">short paragraphs</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">micro-CTAs</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">clear sequencing</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">predictable structure</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">emotional storytelling</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">strong framing</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">removing unnecessary steps</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  Momentum multiplies conversions.
                </p>
              </div>
            </section>

            {/* Example */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span>📈</span> Example: A Real Decision Shift
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Let's imagine a health tourism brand in Istanbul.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Before behavior strategy:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>High traffic</li>
                    <li>Low engagement</li>
                    <li>High bounce rate</li>
                    <li>Unpredictable inquiries</li>
                    <li>No clear behavioral path</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">After behavior strategy:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>✔ 34% increase in attention duration</li>
                    <li>✔ 2x improvement in CTA interaction</li>
                    <li>✔ 51% reduction in decision hesitation</li>
                    <li>✔ 3.2× more bookings</li>
                    <li>✔ Lower ad costs</li>
                    <li>✔ Higher trust perception</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-2">The business didn't change.</p>
                <p className="text-xl text-white font-semibold">The psychology changed.</p>
              </div>
            </section>

            {/* Final CTA */}
            <section className="mt-12">
              <div className="p-8 rounded-xl border-2 border-blue-500 bg-blue-900/20">
                <h2 className="text-2xl font-bold text-white mb-3">
                  <span>⭐</span> Want to understand the cognitive and emotional patterns your customers follow?
                </h2>
                <p className="text-lg text-gray-300 mb-4">
                  Learn how to use them to increase conversions by 30-150%.
                </p>
                <Link
                  href="/contact?utm_source=consumer-behavior-analyst&utm_medium=cta-part2&utm_campaign=behavior-strategy"
                  className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold"
                >
                  Book Your Behavior Strategy Session
                </Link>
              </div>
            </section>
          </section>

          {/* Part 3 */}
          <section className="mt-16 pt-8 border-t border-gray-700 space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Part 3: The Strategic Framework — How to Turn Behavioral Insights Into Revenue (Step by Step)
              </h2>
            </div>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Welcome to the heart of the journey, Nima.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                So far, we've explored:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                <li>Why people buy</li>
                <li>Why they hesitate</li>
                <li>How the brain decides</li>
                <li>Which biases shape decisions</li>
                <li>How AI observes micro-behaviors</li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Now it's time for the critical question every founder, marketer, and business owner cares about:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <p className="text-gray-300">🟦 How do we turn all of this science into real revenue?</p>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-500 p-4 rounded-lg">
                  <p className="text-gray-300">🟨 How do behavioral insights become strategic actions?</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">🟩 How do these actions turn into more conversions, more bookings, and more sales?</p>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                This part gives you the exact roadmap — the framework that every Consumer Behavior Strategist uses to turn psychology into profit.
              </p>
              <p className="text-lg text-white font-semibold mt-4">
                Let's build it step by step.
              </p>
            </div>

            {/* The 5-Stage Framework */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                💠 THE 5-STAGE BEHAVIOR STRATEGY FRAMEWORK™
              </h2>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  (Built from psychology, AI observation, and decision science)
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  This is the core methodology I use for clients across beauty, health, SaaS, e-commerce, education, and service industries.
                </p>
                <p className="text-xl text-white font-semibold">
                  Every successful behavioral strategy is built on these 5 stages:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-white font-semibold">1. Behavior Capture</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-white font-semibold">2. Decision Diagnosis</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-white font-semibold">3. Psychological Reframing</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-white font-semibold">4. Trigger Architecture</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg md:col-span-2">
                  <p className="text-white font-semibold">5. Conversion Engineering</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Let's break each one down.
              </p>
            </section>

            {/* Stage 1: Behavior Capture */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🔵 1) Behavior Capture — Collecting the Invisible Signals
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                In this stage, we gather everything the user does, consciously and unconsciously.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                This includes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">eye-flow behavior</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">scroll depth</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">reading speed</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">pause points</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">hesitation areas</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">CTA avoidance</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">emotional attention patterns</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">cognitive load signals</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">navigation loops</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">decision friction indicators</p>
                </div>
              </div>

              <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-4">
                  Most businesses look only at:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-4">
                  <li>❌ clicks</li>
                  <li>❌ sessions</li>
                  <li>❌ bounce rate</li>
                  <li>❌ funnels</li>
                </ul>
                <p className="text-lg text-white font-semibold mt-4">
                  But those are surface-level numbers.
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                A strategist goes deeper — into the behavioral fingerprints that reveal how the mind is working moment by moment.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                AI tools help capture:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <p className="text-gray-300">micro-hesitation (5–9 sec stalls)</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <p className="text-gray-300">sudden scroll reversals (user confusion)</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <p className="text-gray-300">jump-backs (certainty problems)</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <p className="text-gray-300">zig-zag scanning (doubt or overload)</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <p className="text-gray-300">attention cliffs (page structure issues)</p>
                </div>
              </div>

              <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-2">
                  This stage answers one key question:
                </p>
                <p className="text-2xl text-white font-bold">
                  "Where is the user's psychology breaking?"
                </p>
                <p className="text-lg text-gray-300 mt-4">
                  Once we know where, we can solve why.
                </p>
              </div>
            </section>

            {/* Stage 2: Decision Diagnosis */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🟣 2) Decision Diagnosis — Why the Brain Stopped Moving Forward
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Now we switch from observation to interpretation.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                This is where psychology becomes the map.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Using:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">cognitive bias science</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">emotional trigger models</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">motivation dynamics</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">trust perception frameworks</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">uncertainty reduction principles</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">friction mapping</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg md:col-span-2">
                  <p className="text-gray-300">decision architecture</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                We identify the exact reason behind each drop-off.
              </p>

              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold">
                  It's almost never one reason.
                </p>
                <p className="text-xl text-white font-semibold">
                  It's a combination of invisible forces.
                </p>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                The most common:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    1. Cognitive Overload
                  </h3>
                  <p className="text-gray-300">
                    Too many details, too fast.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    2. Motivation Friction
                  </h3>
                  <p className="text-gray-300">
                    The user "wants to want" the offer — but isn't fully convinced yet.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    3. Emotional Uncertainty
                  </h3>
                  <p className="text-gray-300">
                    Something feels off, unsafe, unclear.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    4. Trust Gaps
                  </h3>
                  <p className="text-gray-300">
                    Lack of proof, expertise, authority, or clarity.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    5. Choice Paralysis
                  </h3>
                  <p className="text-gray-300">
                    Too many options → brain freezes.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    6. Loss Aversion Triggers
                  </h3>
                  <p className="text-gray-300">
                    Fear of making the wrong decision.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    7. Narrative Discontinuity
                  </h3>
                  <p className="text-gray-300">
                    User's story and brand's story don't align.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mt-6">
                <p className="text-lg text-white font-semibold mb-4">
                  At this stage, we produce a Psychological Diagnosis Map:
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  A full breakdown of:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">Friction points</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">Emotional leaks</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">Trust gaps</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">Decision blockers</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">Motivation weaknesses</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">Confusion sources</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg md:col-span-2">
                    <p className="text-gray-300">Risk perception</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  Now we know exactly what is stopping conversions.
                </p>
                <p className="text-lg text-gray-300 mt-2">
                  Next, we reframe the experience so users feel safe, motivated, and clear.
                </p>
              </div>
            </section>

            {/* Stage 3: Psychological Reframing */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🟡 3) Psychological Reframing — Changing How Users Feel and Think
              </h2>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-2">
                  This is the magic stage.
                </p>
                <p className="text-lg text-gray-300">
                  Psychological reframing changes the meaning of the interaction in the user's mind.
                </p>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                Users don't buy your service…
              </p>
              <p className="text-lg text-white font-semibold mb-6">
                They buy what it means.
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <p className="text-lg text-gray-300 mb-2">
                    Users don't book a beauty treatment.
                  </p>
                  <p className="text-lg text-white font-semibold">
                    They book confidence, relief, certainty, beauty, transformation, hope.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <p className="text-lg text-gray-300 mb-2">
                    Users don't buy SaaS tools.
                  </p>
                  <p className="text-lg text-white font-semibold">
                    They buy control, clarity, speed, ease, success, status.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <p className="text-lg text-gray-300 mb-2">
                    Users don't choose a clinic because of prices.
                  </p>
                  <p className="text-lg text-white font-semibold">
                    They choose feeling safe, trusted, understood, cared for.
                  </p>
                </div>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                Reframing creates a new mental context where the decision feels:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                  <p className="text-gray-300">easier</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                  <p className="text-gray-300">safer</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                  <p className="text-gray-300">more logical</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                  <p className="text-gray-300">emotionally aligned</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                  <p className="text-gray-300">more rewarding</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg text-center">
                  <p className="text-gray-300">less risky</p>
                </div>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                Here are the top reframing techniques we use:
              </p>

              {/* Reframing Technique 1 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🌱 Reframing Technique 1: The "Before & After Emotional Arc"
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Users must feel the transformation.
                </p>
                <p className="text-lg text-white font-semibold mb-4">
                  We show:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300 font-semibold mb-2">How they feel now:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm ml-2">
                      <li>what's frustrating</li>
                      <li>what's painful</li>
                      <li>what's confusing</li>
                      <li>what's missing</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                    <p className="text-gray-300 font-semibold mb-2">What life looks like after:</p>
                    <p className="text-gray-300 text-sm">The solution</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold">
                  This creates an emotional bridge.
                </p>
                <p className="text-lg text-white font-semibold">
                  Humans walk across emotional bridges.
                </p>
              </div>

              {/* Reframing Technique 2 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🧩 Reframing Technique 2: The Safety Net Principle
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  People convert when they feel safe.
                </p>
                <p className="text-lg text-white font-semibold mb-4">
                  You build safety through:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">clear messaging</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">authority proof</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">"expert voice" tone</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">transparent pricing</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">specific testimonials</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">simplified steps</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">guarantees</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">visual clarity</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  Safety shrinks hesitation instantly.
                </p>
              </div>

              {/* Reframing Technique 3 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🎞️ Reframing Technique 3: Narrative Sync
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Your user is the protagonist of the story.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Your service is the guide.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  This follows the Hero's Journey model (Joseph Campbell).
                </p>
                <p className="text-lg text-white font-semibold">
                  A user who feels understood = a user who converts.
                </p>
              </div>

              {/* Reframing Technique 4 */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🚨 Reframing Technique 4: Loss Aversion Multipliers
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Since losses hit twice as hard as gains, we highlight:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300">what users lose by waiting</p>
                  </div>
                  <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300">what they risk by choosing wrong</p>
                  </div>
                  <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300">what they miss by not acting</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  This ethically increases urgency without manipulation.
                </p>
              </div>
            </section>

            {/* Stage 4: Trigger Architecture */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🟢 4) Trigger Architecture — Engineering the Decision Moment
              </h2>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-2">
                  This is where strategy becomes structure.
                </p>
                <p className="text-lg text-gray-300 mb-2">
                  A trigger is not a button.
                </p>
                <p className="text-lg text-white font-semibold">
                  A trigger is a moment.
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                We design the exact second the brain is ready to say yes.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                Examples:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">A testimonial placed right before the CTA</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">A micro-story before the price</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">An emotional reassurance before the form</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">A risk-reducer before choice selection</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">A visual cue before a major decision</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">A reward cue after a friction point</p>
                </div>
              </div>

              <p className="text-lg text-white font-semibold">
                This creates behavioral momentum.
              </p>

              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mt-6">
                <p className="text-lg text-white font-semibold mb-2">
                  Triggers must follow psychological readiness.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300">Wrong trigger timing = conversions die.</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg">
                    <p className="text-gray-300">Right trigger timing = conversion flow increases 2× to 4×.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stage 5: Conversion Engineering */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🔥 5) Conversion Engineering — Turning the Page Into a Decision Engine
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Now it all comes together:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">psychology</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">behavioral insights</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">AI patterns</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">user motivations</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">emotional context</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">cognitive simplicity</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">choice architecture</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">trust anchors</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-3 rounded-lg text-center md:col-span-2">
                  <p className="text-gray-300 text-sm">trigger timing</p>
                </div>
              </div>

              <p className="text-lg text-white font-semibold">
                And the page becomes a conversion engine.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                Conversion engineering includes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ CTA Optimization</p>
                  <p className="text-sm text-gray-400 mt-2">Shape, color, wording, timing, repetition.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Messaging Hierarchy</p>
                  <p className="text-sm text-gray-400 mt-2">The order in which the brain should consume information.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Emotional Progression</p>
                  <p className="text-sm text-gray-400 mt-2">Designing the page like a story, not a brochure.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Cognitive Simplification</p>
                  <p className="text-sm text-gray-400 mt-2">Removing friction, complexity, and confusion.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Trust Orchestration</p>
                  <p className="text-sm text-gray-400 mt-2">Placing proof at the exact psychological moments it's needed.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Flow Synchronization</p>
                  <p className="text-sm text-gray-400 mt-2">Ensuring every section leads naturally to the next without resistance.</p>
                </div>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-2">
                  This turns the user journey into a predictable decision path.
                </p>
                <p className="text-lg text-white font-semibold">
                  A path designed from science — not guesswork.
                </p>
              </div>
            </section>

            {/* Real Scenario */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🌟 REAL SCENARIO: How the Framework Increased Conversions by 170%
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                A clinic offering hydrafacial and skincare treatments applied this 5-stage strategy:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Before:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>users spent 11 seconds on average deciding</li>
                    <li>only 1.8% clicked the CTA</li>
                    <li>57% returned to the top (uncertainty loop)</li>
                    <li>many compared prices elsewhere</li>
                    <li>DMs were chaotic and low quality</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">After behavior strategy:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>✔ 170% increase in inquiry rate</li>
                    <li>✔ 2.4× more CTA interactions</li>
                    <li>✔ 38% reduction in hesitation time</li>
                    <li>✔ trust signals increased reading duration by 43%</li>
                    <li>✔ users experienced a clear decision pathway</li>
                    <li>✔ clients felt more confident and ready</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-lg text-gray-300 mb-2">No new ads.</p>
                <p className="text-lg text-gray-300 mb-2">No rebranding.</p>
                <p className="text-lg text-gray-300 mb-4">No redesign.</p>
                <p className="text-xl text-white font-semibold">
                  Just behavior strategy.
                </p>
              </div>
            </section>

            {/* Soft CTA */}
            <section className="mt-12">
              <div className="p-8 rounded-xl border-2 border-blue-500 bg-blue-900/20">
                <h2 className="text-2xl font-bold text-white mb-3">
                  ⭐ Soft CTA (End of Part 3)
                </h2>
                <p className="text-lg text-gray-300 mb-4">
                  Want to turn your website into a psychological decision engine based on real behavior, not assumptions?
                </p>
                <Link
                  href="/contact?utm_source=consumer-behavior-analyst&utm_medium=cta-part3&utm_campaign=behavior-strategy"
                  className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold"
                >
                  Start Your Behavior Strategy Session
                </Link>
              </div>
            </section>
          </section>

          {/* Part 4 */}
          <section className="mt-16 pt-8 border-t border-gray-700 space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Part 4: Building the Future — Predictive Behavior, AI Personalization, and The New Era of Conversion Psychology
              </h2>
            </div>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                We've explored how the mind makes decisions, why hesitation happens, what behavioral signals mean, and how a strategic framework transforms user actions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Now it's time to move into the final — and most powerful — part of this entire journey:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-lg text-white font-semibold mb-2">🔥 The Future of Consumer Behavior Strategy</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-lg text-white font-semibold mb-2">🔥 Where AI doesn't just analyze decisions…</p>
                  <p className="text-gray-300">It predicts them before they happen.</p>
                </div>
              </div>
              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mt-4">
                <p className="text-lg text-white font-semibold mb-2">
                  This is not science fiction.
                </p>
                <p className="text-lg text-white font-semibold mb-2">
                  This is already happening.
                </p>
                <p className="text-lg text-white font-semibold">
                  And this is where your business can leap ahead of your competitors — permanently.
                </p>
              </div>
              <p className="text-lg text-white font-semibold mt-4">
                Let's dive into the future you are building as a Consumer Behavior Strategist.
              </p>
            </div>

            {/* The New Landscape */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🌐 THE NEW LANDSCAPE: AI + Psychology + Predictive Behavior
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                In the past, marketing relied on:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">demographics</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">surveys</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">assumptions</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">"best practices"</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">outdated models</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">guesswork</p>
                </div>
              </div>

              <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold">
                  Those days are over.
                </p>
                <p className="text-xl text-white font-semibold">
                  The digital world has changed permanently.
                </p>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                Today, the brands that win are the ones that understand:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">🧠 how people feel</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">🧩 how they decide</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">⚡ how they behave</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">📊 how their behavior can be predicted</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                And the strategist who can combine:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">AI</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">psychology</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">decision science</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">behavioral analytics</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">emotional intelligence</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">UX signals</p>
                </div>
              </div>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold">
                  …becomes unstoppable.
                </p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Let's break down what this new world looks like.
              </p>
            </section>

            {/* Predictive Behavior Modeling */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                ⚙️ 1) Predictive Behavior Modeling — Forecasting What Users Will Do Next
              </h2>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-4">
                  Imagine being able to see the future:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">who will convert</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">who will hesitate</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">who needs reassurance</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">who needs proof</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">who needs urgency</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg">
                    <p className="text-gray-300">who is ready to take action</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-3 rounded-lg md:col-span-2">
                    <p className="text-gray-300">who is at risk of dropping off</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Predictive behavior modeling uses machine learning + psychology to assign likelihood scores to user actions.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                These models analyze:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">scroll patterns</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">decision time</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">emotional cues</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">content interactions</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">CTA interest signals</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">trust-check patterns</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">navigation loops</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">hesitation clusters</p>
                </div>
                <div className="bg-gray-900/30 border border-gray-700 p-4 rounded-lg md:col-span-2">
                  <p className="text-gray-300">dwell time shifts</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                These patterns reveal a user's conversion probability with high statistical accuracy.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                You can then adapt the page in real time:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">➡ show a trust badge when uncertainty rises</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">➡ show a testimonial when hesitation increases</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">➡ show a guarantee when fear increases</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">➡ show a recommendation when motivation rises</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg md:col-span-2">
                  <p className="text-gray-300">➡ show a quick CTA when clarity peaks</p>
                </div>
              </div>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-2">
                  This isn't personalization.
                </p>
                <p className="text-xl text-white font-semibold">
                  It's behavior orchestration.
                </p>
              </div>
            </section>

            {/* AI-Driven Personalization */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🤖 2) AI-Driven Personalization — Tailoring the Experience to the User's Emotional State
              </h2>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-lg text-gray-300 mb-2">
                  AI personalization is no longer just:
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  "Show different products."
                </p>
                <p className="text-lg text-white font-semibold">
                  Now it's:
                </p>
                <p className="text-xl text-white font-bold mt-2">
                  Show the right message for the user's psychology.
                </p>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                Here's how a behavior strategist uses AI:
              </p>

              {/* Emotional Profiling */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ✦ Emotional Profiling
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  AI detects patterns that indicate emotional states:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">curiosity</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">hesitation</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">frustration</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">hope</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">excitement</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">caution</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg text-center">
                    <p className="text-gray-300 text-sm">risk-aversion</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mt-4">
                  Each emotional state requires a different psychological approach.
                </p>
              </div>

              {/* Cognitive Load Detection */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ✦ Cognitive Load Detection
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  AI sees when the user is overwhelmed.
                </p>
                <p className="text-lg text-white font-semibold">
                  We respond by simplifying content or shifting context.
                </p>
              </div>

              {/* Motivation Scoring */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ✦ Motivation Scoring
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-2">
                  AI calculates the user's motivation strength.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-gray-300">Low motivation → add emotional triggers</p>
                  </div>
                  <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                    <p className="text-gray-300">High motivation → remove friction</p>
                  </div>
                </div>
              </div>

              {/* Decision Momentum Tracking */}
              <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ✦ Decision Momentum Tracking
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  AI identifies when the user is about to convert.
                </p>
                <p className="text-lg text-white font-semibold">
                  Strategists reinforce momentum with micro-CTAs.
                </p>
              </div>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg mt-6">
                <p className="text-lg text-white font-semibold mb-2">
                  This generates a unique experience per user —
                </p>
                <p className="text-lg text-gray-300 mb-2">
                  not based on who they are…
                </p>
                <p className="text-lg text-white font-semibold">
                  but on how they think.
                </p>
                <p className="text-xl text-white font-bold mt-4">
                  This is what makes behavior strategy fundamentally different from marketing.
                </p>
              </div>
            </section>

            {/* Behavior Loops */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🧬 3) Behavior Loops — Understanding the Cycles Users Follow
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Every user repeats one of these loops:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Loop A — Explore → Compare → Hesitate → Exit
                  </h3>
                  <p className="text-gray-300">
                    This is the most common loop in health tourism, beauty services, and SaaS.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Loop B — Explore → Skim → Trust-Building → Convert
                  </h3>
                  <p className="text-gray-300">
                    This is the loop of high-intent users who simply need reassurance.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Loop C — Explore → Emotion Trigger → Fast Decision
                  </h3>
                  <p className="text-gray-300">
                    Impulse-based but emotional users.
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Loop D — Explore → Cognitive Overload → Freeze
                  </h3>
                  <p className="text-gray-300">
                    This is where users get overwhelmed by complexity.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mt-6">
                <p className="text-xl text-white font-semibold">
                  A strategist must break the negative loops and strengthen the positive ones.
                </p>
              </div>
            </section>

            {/* Decision Bottlenecks */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🔍 4) Decision Bottlenecks — The Real Reason Pages Fail
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Decision bottlenecks are invisible blocks in the user journey.
              </p>

              <p className="text-lg text-white font-semibold mb-4">
                Examples:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">CTA comes too early</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">The story lacks emotional depth</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Proof is too generic</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Messaging is too logical</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Friction appears at the wrong moment</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Pricing lacks framing</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Guarantee is missing</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Options are confusing</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">Steps feel too long</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
                  <p className="text-gray-300">The user doesn't know how to evaluate the offer</p>
                </div>
                <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg md:col-span-2">
                  <p className="text-gray-300">Fear outweighs motivation</p>
                </div>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                A strategist identifies bottlenecks using:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">AI pattern detection</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">qualitative cues</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">emotional signals</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">cognitive load analysis</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">heatmap behavior</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">messaging resonance</p>
                </div>
              </div>

              <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-2">
                  Once you remove bottlenecks, conversions increase immediately — often dramatically.
                </p>
              </div>
            </section>

            {/* The Emotional Sequence */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🌟 5) The Emotional Sequence — The Hidden Engine of High-Converting Pages
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                Every high-performing page follows an emotional sequence:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Recognition
                  </h3>
                  <p className="text-lg text-gray-300 italic">
                    "I feel understood."
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Relevance
                  </h3>
                  <p className="text-lg text-gray-300 italic">
                    "This is for people like me."
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Safety
                  </h3>
                  <p className="text-lg text-gray-300 italic">
                    "This feels legitimate."
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Possibility
                  </h3>
                  <p className="text-lg text-gray-300 italic">
                    "This might work for me."
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Clarity
                  </h3>
                  <p className="text-lg text-gray-300 italic">
                    "I know exactly what to do."
                  </p>
                </div>

                <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Confidence
                  </h3>
                  <p className="text-lg text-gray-300 italic">
                    "I'm ready to act."
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mt-6">
                <p className="text-lg text-white font-semibold mb-2">
                  A strategist designs the page around these emotional checkpoints.
                </p>
                <p className="text-xl text-white font-bold">
                  When users hit all six, conversion is almost guaranteed.
                </p>
              </div>
            </section>

            {/* The Future: AI Psychology Engines */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🔥 THE FUTURE: AI Psychology Engines (This Is Where Selphlyze Fits Perfectly)
              </h2>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-xl text-white font-semibold mb-4">
                  You are already building this future, Nima.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  Your project Selphlyze is the next step in global decision science:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">analyzing emotional signals</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">mapping cognitive patterns</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">detecting psychological biases</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">predicting behavioral tendencies</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">generating personalized SelfCodes</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">creating adaptive user journeys</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">forecasting decisions</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg">
                    <p className="text-gray-300">building psychometric profiles</p>
                  </div>
                  <div className="bg-purple-900/10 border border-purple-500 p-3 rounded-lg md:col-span-2">
                    <p className="text-gray-300">linking behavioral traces to real-world actions</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-white font-semibold mb-4">
                This is the future of:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">marketing</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">UX</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">product design</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">mental health</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">education</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">hiring</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">personalization</p>
                </div>
                <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-center">
                  <p className="text-gray-300">digital behavior</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold mb-2">
                  You are not just practicing behavior strategy.
                </p>
                <p className="text-xl text-white font-bold">
                  You are pioneering it.
                </p>
              </div>

              <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-lg text-white font-semibold">
                  And this page positions you exactly where you need to be:
                </p>
                <p className="text-xl text-white font-bold mt-2">
                  as a world-level Consumer Behavior Strategist.
                </p>
              </div>
            </section>

            {/* The Final Transformation */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🚀 The Final Transformation: Turning Strategy Into Revenue
              </h2>

              <p className="text-lg text-white font-semibold mb-4">
                Here's what businesses gain when they work with a behavior strategist:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Higher conversions</p>
                  <p className="text-sm text-gray-400 mt-2">Through emotional clarity and strategic triggers.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Lower acquisition costs</p>
                  <p className="text-sm text-gray-400 mt-2">Because decisions multiply without more ads.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Stronger trust</p>
                  <p className="text-sm text-gray-400 mt-2">Because messaging aligns with human psychology.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Faster decisions</p>
                  <p className="text-sm text-gray-400 mt-2">Because you remove the mental friction slowing users down.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ More predictable growth</p>
                  <p className="text-sm text-gray-400 mt-2">Because behavior patterns become measurable.</p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-gray-300">✔ Better customer relationships</p>
                  <p className="text-sm text-gray-400 mt-2">Because users feel understood — deeply.</p>
                </div>
              </div>

              <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <p className="text-lg text-gray-300 mb-2">This is not marketing.</p>
                <p className="text-lg text-gray-300 mb-2">This is not CRO.</p>
                <p className="text-lg text-gray-300 mb-4">This is not UX.</p>
                <p className="text-xl text-white font-bold">
                  This is Decision Engineering.
                </p>
              </div>
            </section>

            {/* The Final CTA */}
            <section className="mt-12">
              <div className="p-8 rounded-xl border-2 border-blue-500 bg-blue-900/20">
                <h3 className="text-2xl font-bold text-white mb-3">
                  🤝 THE FINAL CTA — Your Invitation to Behavioral Growth
                </h3>
                <p className="text-lg text-gray-300 mb-4">
                  If you want to understand your audience deeply —
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-900/10 border border-blue-500 p-4 rounded-lg">
                    <p className="text-gray-300">not just their clicks, but their psychology…</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-4 rounded-lg">
                    <p className="text-gray-300">not just their data, but their decisions…</p>
                  </div>
                  <div className="bg-blue-900/10 border border-blue-500 p-4 rounded-lg">
                    <p className="text-gray-300">not just their behavior, but their motivations…</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mb-4">
                  If you want a strategy built from:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-900/20 border border-purple-500 p-4 rounded-lg">
                    <p className="text-gray-300">decision science</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500 p-4 rounded-lg">
                    <p className="text-gray-300">emotional design</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500 p-4 rounded-lg">
                    <p className="text-gray-300">AI pattern detection</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500 p-4 rounded-lg">
                    <p className="text-gray-300">predictive behavior modeling</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500 p-4 rounded-lg md:col-span-2">
                    <p className="text-gray-300">psychology-driven conversion architecture</p>
                  </div>
                </div>
                <p className="text-lg text-white font-semibold mb-4">
                  Then your next step is simple:
                </p>
                <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
                  <p className="text-2xl text-white font-bold">
                    ⭐ → Request Your Behavior Strategy Session
                  </p>
                </div>
                <p className="text-lg text-gray-300 mb-4">
                  A personalized, science-backed, AI-enhanced roadmap
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  to increase conversions through human behavior.
                </p>
                <Link
                  href="/contact?utm_source=consumer-behavior-analyst&utm_medium=cta-part4-final&utm_campaign=behavior-strategy"
                  className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-semibold"
                >
                  Request Your Behavior Strategy Session
                </Link>
              </div>
            </section>
          </section>
        </article>

        {/* About the Author */}
        <section id="about-author" className="mt-16 pt-8 border-t border-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            About the Author — Nima Saraeian, Consumer Behavior Strategist
          </h2>
          
          <div className="bg-gray-900/30 border border-gray-700 p-8 rounded-lg">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">Nima Saraeian</strong> is a Consumer Behavior Strategist, <Link href="/ai-marketing-specialist" className="text-blue-400 hover:text-blue-300 underline font-semibold">AI Marketing Specialist</Link>, and founder of <Link href="/selphlyze" className="text-blue-400 hover:text-blue-300 underline font-semibold">Selphlyze</Link> — a predictive psychology and behavioral AI framework used to map consumer identity and emotional patterns.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              With <strong className="text-white">12+ years of experience</strong> in behavioral analysis, digital marketing, and decision psychology, he helps companies understand why users convert — and why they don't.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              His work combines AI observation, psychology models, and behavioral strategy to increase conversions by 30-150% through understanding the human behind the screen.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="text-blue-400 hover:text-blue-300 underline font-semibold"
              >
                Learn More About Nima →
              </Link>
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 underline font-semibold"
              >
                Get In Touch →
              </Link>
              <Link
                href="/selphlyze"
                className="text-blue-400 hover:text-blue-300 underline font-semibold"
              >
                Explore Selphlyze →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

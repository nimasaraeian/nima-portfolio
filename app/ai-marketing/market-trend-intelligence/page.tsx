import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Market & Trend Intelligence – AI Market Analysis | Nima Saraeian',
  description: 'Real-time market intelligence powered by Contlyze. Track competitors, identify trend shifts, discover content gaps, and understand audience reactions to stay ahead of the market.',
  alternates: { canonical: 'https://nimasaraeian.com/ai-marketing/market-trend-intelligence' },
}

export default function MarketTrendIntelligencePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Market & Trend Intelligence
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Real-time market analysis that tracks competitors, identifies trends, and reveals opportunities to outmaneuver the competition.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative bg-black py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10 space-y-12">
          
          {/* What this AI module analyzes */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What this AI module analyzes
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Competitors and category mapping across platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Audience reaction signals and emerging trend shifts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Content pattern analysis and positioning gaps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Market sentiment and brand perception tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Opportunity identification in underserved niches</span>
              </li>
            </ul>
          </div>

          {/* Best use cases */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Best use cases
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Entering new markets or launching competitive products</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Staying ahead of industry trends and consumer shifts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Identifying content gaps where competitors are weak</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Repositioning your brand to capture market share</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Monitoring brand perception and reputation signals</span>
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How it works in the AI Marketing system
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Market & Trend Intelligence, powered by Contlyze, continuously monitors the competitive landscape and market dynamics. It analyzes competitor strategies, tracks audience reactions, and identifies emerging trends before they become mainstream. This intelligence layer informs your content strategy, helps you discover positioning opportunities, and ensures your messaging stays relevant and differentiated. Combined with Behavioral DeepScan, it creates a complete picture of both your audience and your competitive environment.
            </p>
          </div>

          {/* CTA Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to gain competitive advantage?</h3>
                <p className="text-gray-400 text-sm">Stay ahead with real-time market intelligence.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                >
                  <span className="relative z-10">Book an AI Strategy Call</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Link>
                <Link
                  href="/ai-marketing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
                >
                  Back to AI Marketing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}









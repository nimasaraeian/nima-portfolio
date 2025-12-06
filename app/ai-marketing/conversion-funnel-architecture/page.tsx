import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conversion & Funnel Architecture – AI Funnel Optimization | Nima Saraeian',
  description: 'Design behavior-driven conversion funnels with layered trust points, decision journey mapping, and retention boosters. Optimize every step of the customer journey.',
  alternates: { canonical: 'https://nimasaraeian.com/ai-marketing/conversion-funnel-architecture' },
}

export default function ConversionFunnelArchitecturePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
            Conversion & Funnel Architecture
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Design behavior-driven conversion funnels that guide customers through decision journeys with precision and trust-building at every step.
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
                <span className="text-orange-400 mt-1">•</span>
                <span>Decision journey mapping with behavioral cues and trust points</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Layered funnels optimized for different audience segments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Retention boosters and relationship triggers at each stage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Conversion bottlenecks and friction point identification</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Multi-touchpoint orchestration for complex sales cycles</span>
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
                <span className="text-yellow-400 mt-1">•</span>
                <span>Optimizing low-converting landing pages and sales funnels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Designing multi-step customer journeys for high-value products</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Reducing drop-off rates at critical decision points</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Building trust and credibility throughout the customer journey</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Creating personalized paths for different audience segments</span>
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How it works in the AI Marketing system
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Conversion & Funnel Architecture takes the behavioral insights from DeepScan and translates them into actionable funnel designs. It identifies where customers hesitate, what triggers decisions, and how to build trust at each stage. The architecture doesn't just map a linear path—it creates layered experiences that adapt to different psychological profiles. By understanding the decision journey from a behavioral perspective, every element of your funnel—from headlines to CTAs to social proof—is strategically placed to maximize conversion while maintaining customer trust and satisfaction.
            </p>
          </div>

          {/* CTA Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to optimize your conversion funnels?</h3>
                <p className="text-gray-400 text-sm">Turn more visitors into customers with behavior-driven design.</p>
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


























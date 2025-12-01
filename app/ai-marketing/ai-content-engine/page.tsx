import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Content Engine – AI-Powered Content Creation | Nima Saraeian',
  description: 'Generate adaptive content calendars, hooks, narratives, and multi-format content powered by AI. Create content that resonates across Instagram, YouTube, LinkedIn, blogs, and email.',
  alternates: { canonical: 'https://nimasaraeian.com/ai-marketing/ai-content-engine' },
}

export default function AIContentEnginePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            AI Content Engine
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Generate adaptive content calendars, compelling hooks, and multi-format content that speaks directly to your audience's motivations.
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
                <span className="text-indigo-400 mt-1">•</span>
                <span>30-day adaptive content calendar with 100+ content ideas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Voice, tone, hooks, and narrative arcs tailored to your audience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Format mapping across Instagram, YouTube, LinkedIn, blog, and email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Content performance prediction based on behavioral insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">•</span>
                <span>Multi-variant copy generation for A/B testing</span>
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
                <span className="text-green-400 mt-1">•</span>
                <span>Scaling content production without losing quality or brand voice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Maintaining consistent messaging across multiple platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Overcoming content creator's block with data-driven ideas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Adapting content strategy based on audience behavior changes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Creating content that converts by aligning with decision triggers</span>
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How it works in the AI Marketing system
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              The AI Content Engine synthesizes insights from Behavioral DeepScan and Market Intelligence to generate content that resonates. It doesn't just create generic posts—it produces content calibrated to your audience's psychological triggers, cultural preferences, and decision patterns. The engine adapts to performance data, continuously refining its output to match what works. Whether you need a month of Instagram posts, YouTube scripts, or email sequences, the AI Content Engine ensures every piece serves your strategic goals while maintaining your unique brand voice.
            </p>
          </div>

          {/* CTA Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to scale your content production?</h3>
                <p className="text-gray-400 text-sm">Generate content that converts, not just creates.</p>
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









import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Automation System – Marketing Automation with AI | Nima Saraeian',
  description: 'Intelligent automation for lead qualification, routing, follow-ups, and appointments. Automate customer interactions with behavior-triggered workflows across DM, WhatsApp, and email.',
  alternates: { canonical: 'https://nimasaraeian.com/ai-marketing/ai-automation-system' },
}

export default function AIAutomationSystemPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
            AI Automation System
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Intelligent automation that qualifies leads, routes conversations, and follows up with behavior-triggered workflows across all channels.
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
                <span className="text-green-400 mt-1">•</span>
                <span>Lead qualification and intelligent routing based on behavioral signals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>DM, WhatsApp, and email automation with personalized messaging</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Appointment scheduling and follow-up sequences with behavior triggers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Customer journey automation that adapts to engagement patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Multi-channel orchestration for seamless customer experiences</span>
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
                <span className="text-emerald-400 mt-1">•</span>
                <span>Scaling customer support and lead nurturing without adding staff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Ensuring no lead falls through the cracks with intelligent follow-ups</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Personalizing customer interactions at scale across channels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Automating appointment booking and confirmation workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Triggering actions based on customer behavior and engagement signals</span>
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How it works in the AI Marketing system
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              The AI Automation System connects all the insights from Behavioral DeepScan, Market Intelligence, Content Engine, and Funnel Architecture into automated workflows. It doesn't just send generic messages—it uses behavioral triggers to determine when to reach out, what to say, and which channel to use. The system learns from customer interactions, continuously optimizing its responses and timing. By automating the repetitive tasks while maintaining personalization, you can scale your marketing operations without sacrificing the human touch that builds relationships and drives conversions.
            </p>
          </div>

          {/* CTA Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to automate your marketing operations?</h3>
                <p className="text-gray-400 text-sm">Scale your business with intelligent automation.</p>
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








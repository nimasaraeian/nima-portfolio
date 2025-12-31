'use client';

import Link from 'next/link';

const modules = [
  {
    title: 'Decision Brain',
    description: 'AI-powered decision psychology analysis for landing pages. Understand why users hesitate and get actionable fixes.',
    href: '/ai-marketing/decision-brain',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
    badge: 'New'
  },
  {
    title: 'AI Automation System',
    description: 'Intelligent automation for lead qualification, routing, and follow-ups across DM, WhatsApp, and email.',
    href: '/ai-marketing/ai-automation-system',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'AI Content Engine',
    description: 'Generate high-converting content with AI-powered copywriting that understands decision psychology.',
    href: '/ai-marketing/ai-content-engine',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Conversion Funnel Architecture',
    description: 'Design and optimize conversion funnels with behavioral psychology principles and data-driven insights.',
    href: '/ai-marketing/conversion-funnel-architecture',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Market Trend Intelligence',
    description: 'Stay ahead with AI-powered market analysis and trend prediction for strategic decision-making.',
    href: '/ai-marketing/market-trend-intelligence',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'from-indigo-500 to-blue-500',
  },
];

const features = [
  {
    title: 'Decision Psychology',
    description: 'Understand user behavior through cognitive friction analysis and decision psychology principles.',
  },
  {
    title: 'AI-Powered Insights',
    description: 'Get actionable recommendations backed by AI analysis of your content and user interactions.',
  },
  {
    title: 'Conversion Optimization',
    description: 'Optimize every touchpoint in your funnel with data-driven insights and behavioral science.',
  },
  {
    title: 'Automated Workflows',
    description: 'Streamline your marketing operations with intelligent automation and smart routing.',
  },
];

export default function ModernLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8">
              <span className="text-sm font-medium text-blue-400">AI Marketing Platform</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Marketing Intelligence
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Transform your marketing with AI-driven decision psychology, conversion optimization, and intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ai-marketing/decision-brain"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="#modules"
                className="px-8 py-4 rounded-xl border-2 border-white/20 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              AI Marketing Tools
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed to optimize every aspect of your marketing funnel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <Link
                key={idx}
                href={module.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      <div className="text-white">
                        {module.icon}
                      </div>
                    </div>
                    {module.badge && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {module.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {module.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">
                    <span>Explore tool</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose AI Marketing?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built on decision psychology and behavioral science principles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-slate-800/50 p-6 hover:border-white/20 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Marketing?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start analyzing your landing pages and optimizing conversions with AI-powered decision psychology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/ai-marketing/decision-brain"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  Analyze Your Page
                </Link>
                <Link
                  href="/articles"
                  className="px-8 py-4 rounded-xl border-2 border-white/20 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  Read Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


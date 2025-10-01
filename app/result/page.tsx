'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StrategyDoc } from '@/app/types/strategy';
import { ArrowLeft, Download, Copy, Target, Users, Calendar, Lightbulb, BarChart, Shield, CheckSquare } from 'lucide-react';

export default function ResultPage() {
  const [strategy, setStrategy] = useState<StrategyDoc | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedStrategy = sessionStorage.getItem('strategy-result');
      if (storedStrategy) {
        try {
          const parsedStrategy = JSON.parse(storedStrategy);
          setStrategy(parsedStrategy);
        } catch (error) {
          console.error('Error parsing strategy:', error);
          router.push('/strategy');
        }
      } else {
        router.push('/strategy');
      }
      setLoading(false);
    }
  }, [router]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here if needed
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500/30 border-t-teal-500 rounded-full"></div>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Strategy Found</h1>
          <button
            onClick={() => router.push('/strategy')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Generate New Strategy
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
    { id: 'personas', label: 'Personas', icon: <Users className="w-4 h-4" /> },
    { id: 'content', label: 'Content Plan', icon: <Calendar className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart className="w-4 h-4" /> },
    { id: 'ethics', label: 'Ethics & Data', icon: <Shield className="w-4 h-4" /> },
    { id: '90day', label: '90-Day Plan', icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/strategy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">{strategy.meta.businessName}</h1>
                <p className="text-sm text-gray-400">{strategy.meta.industry} • {strategy.meta.geo}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <div className="text-gray-400">Budget: ${strategy.meta.budgetMonthly}/month</div>
                <div className="text-gray-400">Timeframe: {strategy.meta.timeframeWeeks} weeks</div>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white border-b-2 border-teal-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-teal-900/20 to-purple-900/20 border border-teal-500/30 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Executive Summary
                </h2>
                <p className="text-gray-300 leading-relaxed">{strategy.overview.executiveSummary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Key Insights</h3>
                  <ul className="space-y-2">
                    {strategy.overview.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-green-400 mt-1">✓</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400">Risk Notes</h3>
                  <ul className="space-y-2">
                    {strategy.overview.riskNotes.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-yellow-400 mt-1">⚠</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personas' && (
            <div className="grid gap-6">
              {strategy.personas.map((persona, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-teal-400">{persona.name}</h3>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(persona, null, 2))}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{persona.summary}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">Pain Points</h4>
                      <ul className="space-y-1">
                        {persona.pains.map((pain, i) => (
                          <li key={i} className="text-sm text-gray-300">• {pain}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Gains</h4>
                      <ul className="space-y-1">
                        {persona.gains.map((gain, i) => (
                          <li key={i} className="text-sm text-gray-300">• {gain}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">Channels</h4>
                      <div className="flex flex-wrap gap-1">
                        {persona.channels.map((channel, i) => (
                          <span key={i} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Sample Messages</h4>
                    <div className="space-y-1">
                      {persona.sampleMessages.map((message, i) => (
                        <div key={i} className="bg-purple-500/10 border border-purple-500/20 rounded p-2 text-sm text-gray-300">
                          "{message}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Content Themes */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">Content Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {strategy.contentPlan.themes.map((theme, index) => (
                    <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Target Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {strategy.contentPlan.keywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Calendar */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Weekly Content Calendar</h3>
                <div className="grid gap-4">
                  {strategy.contentPlan.calendar.map((item, index) => (
                    <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm font-medium">
                            Week {item.week}
                          </span>
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm capitalize">
                            {item.channel}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm">{item.metric}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{item.idea}</p>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2 text-sm">
                        <span className="text-orange-400 font-medium">CTA: </span>
                        <span className="text-orange-300">"{item.CTA}"</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {strategy.campaigns.map((campaign, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">{campaign.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.objective === 'awareness' ? 'bg-blue-500/20 text-blue-300' :
                      campaign.objective === 'traffic' ? 'bg-green-500/20 text-green-300' :
                      campaign.objective === 'lead' ? 'bg-purple-500/20 text-purple-300' :
                      campaign.objective === 'sales' ? 'bg-red-500/20 text-red-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {campaign.objective}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">Target Audience</h4>
                      <p className="text-gray-300 text-sm mb-4">{campaign.audience}</p>

                      <h4 className="font-semibold text-green-400 mb-2">Channels</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {campaign.channels.map((channel, i) => (
                          <span key={i} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                            {channel}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-semibold text-purple-400 mb-2">Offers</h4>
                      <ul className="space-y-1">
                        {campaign.offers.map((offer, i) => (
                          <li key={i} className="text-sm text-gray-300">• {offer}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-400 mb-2">Creative Brief</h4>
                      <p className="text-gray-300 text-sm mb-4">{campaign.creativeBrief}</p>

                      <h4 className="font-semibold text-teal-400 mb-2">A/B Tests</h4>
                      <ul className="space-y-1">
                        {campaign.abTests.map((test, i) => (
                          <li key={i} className="text-sm text-gray-300">• {test}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Key Performance Indicators</h3>
                <div className="grid gap-4">
                  {strategy.analytics.kpis.map((kpi, index) => (
                    <div key={index} className="border border-white/10 rounded-lg p-4 bg-black/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{kpi.name}</h4>
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">
                          {kpi.target}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{kpi.howToMeasure}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forecast */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">Forecast & Projections</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Assumptions:</h4>
                  <ul className="space-y-1">
                    {strategy.analytics.forecast.assumptions.map((assumption, index) => (
                      <li key={index} className="text-sm text-gray-400">• {assumption}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Projection:</h4>
                  <p className="text-gray-300">{strategy.analytics.forecast.simpleProjection}</p>
                </div>
              </div>

              {/* Dashboard Specs */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-teal-400">Recommended Dashboard Cards</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {strategy.analytics.dashboardSpec.map((spec, index) => (
                    <div key={index} className="bg-teal-500/10 border border-teal-500/20 rounded p-3">
                      <p className="text-teal-300 text-sm">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ethics' && (
            <div className="space-y-8">
              <div className="grid gap-6">
                {/* Privacy Notes */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Privacy & Compliance</h3>
                  <ul className="space-y-2">
                    {strategy.ethicsAndData.privacyNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-blue-400 mt-1">🔒</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bias Risks */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400">Bias Risks & Mitigation</h3>
                  <ul className="space-y-2">
                    {strategy.ethicsAndData.biasRisks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-yellow-400 mt-1">⚠️</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Governance Checklist */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Governance Checklist</h3>
                  <ul className="space-y-2">
                    {strategy.ethicsAndData.governanceChecklist.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-green-400 mt-1">✅</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === '90day' && (
            <div className="space-y-6">
              {strategy['90dayPlan'].map((phase, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-teal-400">
                      Weeks {phase.week}-{phase.week + 3}
                    </h3>
                    <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm">
                      {phase.ownerHint}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-start gap-3 p-3 bg-black/20 rounded border border-white/10">
                        <div className="w-5 h-5 border-2 border-teal-500 rounded mt-0.5"></div>
                        <p className="text-gray-300 text-sm flex-1">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



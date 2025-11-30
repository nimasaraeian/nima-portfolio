'use client';

import { useState } from 'react';
import Link from 'next/link';
import MultiStepInputPanel from './components/MultiStepInputPanel';
import ReportPanel from './components/ReportPanel';

/**
 * Behavioral DeepScan - AI Decision Psychology Analysis Page
 * 
 * This page is the main UI for the Behavioral DeepScan AI engine.
 * 
 * Key Components:
 * - MultiStepInputPanel: Multi-step form with progress indicator
 * - ReportPanel: AI analysis report with empty, loading, success, and error states
 * - analyzeCognitiveFriction(): Function that calls POST /api/brain/cognitive-friction (via centralized API client)
 * 
 * The page includes:
 * - Hero section with H1 and intro
 * - "How it works" section
 * - Main analysis form (left 40%) and results panel (right 60%)
 * - SEO content sections
 * - CTA section
 * 
 * SEO metadata is defined in layout.tsx for this route.
 */

// CognitiveFrictionResult type definition
// This interface matches the response from POST /api/brain/cognitive-friction
interface CognitiveFrictionResult {
  frictionScore: number;
  trustScore: number;
  emotionalClarityScore: number;
  motivationMatchScore: number;
  decisionProbability: number;
  conversionLiftEstimate: number;
  keyDecisionBlockers: string[];
  emotionalResistanceFactors: string[];
  cognitiveOverloadFactors: string[];
  trustBreakpoints: string[];
  motivationMisalignments: string[];
  recommendedQuickWins: string[];
  recommendedDeepChanges: string[];
  explanationSummary: string;
}

import { postToBrain } from '@/lib/apiClient';

// Helper function to call the Cognitive Friction API
// Uses the centralized API client helper
async function analyzeCognitiveFriction(payload: {
  raw_text: string;
  platform: string;
  goal: string[];
  audience: string;
  language: string;
  audienceType?: string;
  tonePreference?: string;
  meta: null;
}): Promise<CognitiveFrictionResult> {
  return postToBrain<CognitiveFrictionResult>('/api/brain/cognitive-friction', payload);
}

// Main page component
export default function BehavioralDeepScanPage() {
  const [formData, setFormData] = useState({
    raw_text: '',
    platform: 'landing_page',
    goal: [] as string[],
    audience: 'cold',
    language: 'en',
    audienceType: 'General',
    tonePreference: 'Direct',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CognitiveFrictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [metaJson, setMetaJson] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (goal: string) => {
    setFormData((prev) => {
      const goals = prev.goal.includes(goal)
        ? prev.goal.filter((g) => g !== goal)
        : [...prev.goal, goal];
      return { ...prev, goal: goals };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const goals = formData.goal.length > 0 ? formData.goal : ['leads'];
      let meta = null;
      
      if (showAdvanced && metaJson.trim()) {
        try {
          meta = JSON.parse(metaJson);
        } catch {
          throw new Error('Invalid JSON in meta field');
        }
      }

      const payload = {
        raw_text: formData.raw_text,
        platform: formData.platform,
        goal: goals,
        audience: formData.audience,
        language: formData.language,
        audienceType: formData.audienceType,
        tonePreference: formData.tonePreference,
        meta,
      };

      const data = await analyzeCognitiveFriction(payload);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <span className="text-xs font-semibold text-purple-300">AI Behavioral Engine</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Behavioral DeepScan — The AI Engine That Detects Hidden Psychological Friction in Your Content
          </h1>
          
          <p className="mb-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Understand how real users think, hesitate, and decide. DeepScan analyzes cognitive load, emotional signals, trust barriers, and decision patterns inside your text — then gives you actionable recommendations to improve clarity, persuasion, and conversion.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Run a Cognitive Friction Scan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
            <Link
              href="/ai-marketing"
              className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Learn how the AI Marketing Engine works
              <span className="text-purple-400">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works section */}
      {/* Main Analysis Section */}
      <section id="analysis-form" className="relative bg-black py-12 sm:py-16 md:py-20 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Run an AI Cognitive Friction Scan
          </h2>

          {/* New Layout: Vertical - Form on top, Results below */}
          <div className="space-y-6 sm:space-y-8">
            {/* Input Panel - Top */}
            <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/30 p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <MultiStepInputPanel
                formData={formData}
                showAdvanced={showAdvanced}
                metaJson={metaJson}
                loading={loading}
                error={error}
                onInputChange={handleInputChange}
                onGoalChange={handleGoalChange}
                onAdvancedToggle={() => setShowAdvanced(!showAdvanced)}
                onMetaJsonChange={setMetaJson}
                onSubmit={handleSubmit}
              />
            </div>

            {/* Report Panel - Bottom */}
            <div>
              <ReportPanel
                result={result}
                loading={loading}
                error={error}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative bg-black py-12 sm:py-16 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Where Behavioral DeepScan Makes the Biggest Impact
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            DeepScan is built for marketers, founders, and content teams who want to understand how their words actually land in the reader's mind — not just how they look on the page.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Landing pages and sales pages',
              'Ad copy and creative scripts',
              'Email campaigns and sequences',
              'Product descriptions',
              'Lead magnets and download pages',
              'Website copy and feature pages',
              'Social media captions',
              'Long-form articles and thought leadership content',
            ].map((useCase, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-700 bg-slate-900/50 hover:border-purple-500/50 transition-colors"
              >
                <span className="text-purple-400 mt-0.5 flex-shrink-0">•</span>
                <span className="text-gray-300">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explanation & Use Cases Section - Modern Card Layout */}
      <section className="relative bg-black py-12 sm:py-16 mt-16 lg:mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card 1: Why Cognitive Friction Kills Conversion */}
            <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-6 sm:p-8 shadow-lg shadow-black/40">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-purple-300">
                <span className="inline-block h-1 w-6 rounded-full bg-purple-400" />
                <span>Cognitive Friction</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Why Cognitive Friction Kills Conversion
              </h2>
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  Every moment of hesitation, doubt, or cognitive overload in your content creates friction that reduces conversion rates. Traditional analytics can tell you what users clicked, but they cannot detect the emotional and cognitive barriers that prevent decisions.
                </p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  Behavioral DeepScan goes beyond simple copy suggestions. It analyzes how your content triggers hesitation, builds or breaks trust, aligns with motivations, and guides decision-making. By understanding the psychological factors that influence behavior, you can create content that removes friction and guides users toward confident decisions.
                </p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  This AI engine uses cognitive friction models, trust psychology, and motivation alignment to identify specific blockers and provide actionable recommendations. The result is content that not only looks good but actually converts by addressing the real psychological barriers your audience faces.
                </p>
              </div>
            </div>

            {/* Card 2: Use Behavioral DeepScan in Your Marketing Workflow */}
            <div className="rounded-2xl border border-gray-700 bg-white/5 p-6 sm:p-8 shadow-lg shadow-black/40">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-teal-300">
                <span className="inline-block h-1 w-6 rounded-full bg-teal-400" />
                <span>Use Cases & Workflow</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Use Behavioral DeepScan in Your Marketing Workflow
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-200 mb-6">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Before launching a new landing page – identify friction points before they cost you conversions</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Testing different ad creatives – compare cognitive friction scores to choose the most effective variant</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Reviewing onboarding emails – ensure your welcome sequence builds trust and reduces hesitation</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  <span>Optimizing high-traffic pages with low conversion – find the psychological blockers that analytics can't detect</span>
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#analysis-form"
                  className="inline-flex items-center rounded-full border border-teal-400 px-4 py-2 text-xs sm:text-sm font-medium text-teal-100 hover:bg-teal-500 hover:border-teal-500 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Run a Cognitive Friction Scan →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Marketing Engine CTA Section */}
      <section className="relative bg-black py-12 sm:py-16 mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 sm:p-12 backdrop-blur-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Want the full AI Marketing Engine behind DeepScan?
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Behavioral DeepScan is one layer of the NIMA AI Brain — a complete AI Marketing Engine that analyzes behavior, predicts outcomes, and generates high-conversion strategy and copy across your entire funnel.
            </p>
            <Link
              href="/ai-marketing"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Explore the AI Marketing Engine</span>
              <span className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

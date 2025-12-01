'use client';

import { useState } from 'react';
import Link from 'next/link';
import AccordionItem from '@/components/Accordion';
import MultiStepInputPanel from '../behavioral-deepscan/components/MultiStepInputPanel';
import ReportPanel from '../behavioral-deepscan/components/ReportPanel';

/**
 * Behavioral DeepScan - AI Decision Psychology Analysis Page
 * 
 * This page is the main UI for the Behavioral DeepScan AI Decision Psychology engine.
 * 
 * Key Components:
 * - CognitiveFrictionResult: TypeScript interface matching the response from POST /api/brain/cognitive-friction
 * - analyzeCognitiveFriction(): Function that calls POST /api/brain/cognitive-friction
 * - ScoreCard: Component for displaying individual scores with progress bars
 * 
 * The page includes:
 * - Hero section with H1 and intro
 * - "How it works" section
 * - Main analysis form (left) and results panel (right)
 * - SEO content sections
 * - CTA section
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

// Rewrite API types
type RewriteInputPayload = {
  text: string;
  platform: string;
  goal: string[];
  audience: string;
  language: string;
};

type RewriteOutput = {
  soft_version: string;
  value_version: string;
  proof_version: string;
  emotional_version: string;
  direct_version: string;
  cta: string;
};

import { postToBrain } from '@/lib/apiClient';

// Helper function to call the Cognitive Friction API
// Uses the centralized API client helper
async function analyzeCognitiveFriction(payload: {
  raw_text: string;
  platform: string;
  goal: string[];
  audience: string;
  language: string;
  meta: null;
  image?: string;
  image_type?: string;
  image_name?: string;
}): Promise<CognitiveFrictionResult> {
  return postToBrain<CognitiveFrictionResult>('/api/brain/cognitive-friction', payload);
}

// Score display component with improved visuals
function ScoreCard({ label, value, isFriction = false }: { label: string; value: number; isFriction?: boolean }) {
  const getColorClass = (score: number, isFriction: boolean) => {
    if (isFriction) {
      // For friction, lower is better
      if (score <= 30) return 'bg-green-500';
      if (score <= 60) return 'bg-amber-500';
      return 'bg-red-500';
    } else {
      // For other scores, higher is better
      if (score >= 70) return 'bg-green-500';
      if (score >= 40) return 'bg-amber-500';
      return 'bg-red-500';
    }
  };

  const getStatusText = (score: number, isFriction: boolean) => {
    if (isFriction) {
      if (score <= 30) return 'Good';
      if (score <= 60) return 'Medium';
      return 'High Risk';
    } else {
      if (score >= 70) return 'Strong';
      if (score >= 40) return 'Moderate';
      return 'Low';
    }
  };

  const statusText = getStatusText(value, isFriction);
  const statusColor = isFriction
    ? value <= 30 ? 'text-green-400' : value <= 60 ? 'text-amber-400' : 'text-red-400'
    : value >= 70 ? 'text-green-400' : value >= 40 ? 'text-amber-400' : 'text-red-400';
  
  return (
    <div className="rounded-xl border border-gray-700 bg-slate-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">{value} / 100</span>
          <span className={`text-xs font-medium ${statusColor}`}>({statusText})</span>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${getColorClass(value, isFriction)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// AI Interpretation generator
function buildAiInterpretation(result: CognitiveFrictionResult): string {
  const parts: string[] = [];
  
  // Friction and Trust analysis
  if (result.frictionScore >= 60 && result.trustScore <= 40) {
    parts.push('Your content currently creates high decision friction and relatively low trust. Users are likely to hesitate and postpone action rather than convert.');
  } else if (result.frictionScore >= 60) {
    parts.push('The content creates significant cognitive friction that may cause users to abandon the decision process, despite some trust signals.');
  } else if (result.trustScore <= 40) {
    parts.push('Trust levels are low, which creates hesitation even if the content is relatively clear.');
  }
  
  // Motivation analysis
  if (result.motivationMatchScore < 50) {
    parts.push('The message does not strongly connect with the audience\'s core motivations, which reduces the emotional drive to take action.');
  } else if (result.motivationMatchScore >= 70) {
    parts.push('The content aligns well with audience motivations, creating a strong emotional connection.');
  }
  
  // Decision probability analysis
  if (result.decisionProbability < 0.4) {
    parts.push('Overall, the current likelihood of conversion is low. The piece needs clearer value proposition, proof, and emotional resonance.');
  } else if (result.decisionProbability >= 0.6) {
    parts.push('The content shows strong conversion potential with good decision-making signals.');
  }
  
  // Emotional clarity
  if (result.emotionalClarityScore < 50) {
    parts.push('Emotional messaging could be clearer to better guide users toward confident decisions.');
  }
  
  // Default if no specific patterns
  if (parts.length === 0) {
    parts.push('The content shows a balanced psychological profile with moderate conversion potential.');
  }
  
  return parts.join(' ');
}

// Psychological Factors Tabs Component
function PsychologicalFactorsTabs({ result }: { result: CognitiveFrictionResult }) {
  const [activeTab, setActiveTab] = useState<'blockers' | 'emotional' | 'cognitive' | 'trust' | 'motivation'>('blockers');

  const tabs = [
    { 
      id: 'blockers' as const, 
      label: 'Blockers', 
      data: result.keyDecisionBlockers, 
      title: 'Key Decision Blockers',
      borderClass: 'border-red-500/20',
      bgClass: 'bg-red-900/10',
      titleClass: 'text-red-300',
      bulletClass: 'text-red-400'
    },
    { 
      id: 'emotional' as const, 
      label: 'Emotional', 
      data: result.emotionalResistanceFactors,
      title: 'Emotional Resistance',
      borderClass: 'border-orange-500/20',
      bgClass: 'bg-orange-900/10',
      titleClass: 'text-orange-300',
      bulletClass: 'text-orange-400'
    },
    { 
      id: 'cognitive' as const, 
      label: 'Cognitive Load', 
      data: result.cognitiveOverloadFactors,
      title: 'Cognitive Overload',
      borderClass: 'border-yellow-500/20',
      bgClass: 'bg-yellow-900/10',
      titleClass: 'text-yellow-300',
      bulletClass: 'text-yellow-400'
    },
    { 
      id: 'trust' as const, 
      label: 'Trust', 
      data: result.trustBreakpoints,
      title: 'Trust Breakpoints',
      borderClass: 'border-blue-500/20',
      bgClass: 'bg-blue-900/10',
      titleClass: 'text-blue-300',
      bulletClass: 'text-blue-400'
    },
    { 
      id: 'motivation' as const, 
      label: 'Motivation', 
      data: result.motivationMisalignments,
      title: 'Motivation Misalignments',
      borderClass: 'border-purple-500/20',
      bgClass: 'bg-purple-900/10',
      titleClass: 'text-purple-300',
      bulletClass: 'text-purple-400'
    },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Decision Blockers & Psychological Factors</h3>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {activeTabData && (
        <div className={`rounded-xl border ${activeTabData.borderClass} ${activeTabData.bgClass} p-4`}>
          <h4 className={`text-sm font-semibold mb-3 ${activeTabData.titleClass}`}>
            {activeTabData.title}
          </h4>
          {activeTabData.data.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-300">
              {activeTabData.data.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`${activeTabData.bulletClass} mt-1`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No major issues detected in this area.</p>
          )}
        </div>
      )}
    </div>
  );
}

// Rewrite Variant Component
interface RewriteVariantProps {
  label: string;
  body: string;
}

function RewriteVariant({ label, body }: RewriteVariantProps) {
  if (!body?.trim()) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      // Optional: show a toast or feedback
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[11px] text-slate-300 hover:text-white transition-colors"
        >
          Copy
        </button>
      </div>
      <p className="text-xs leading-relaxed text-slate-100 whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}

// Main Results Panel Component
function ResultsPanel({ result }: { result: CognitiveFrictionResult }) {
  const aiInterpretation = buildAiInterpretation(result);

  return (
    <div className="space-y-6">
      {/* 1. Scores Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Cognitive Friction & Trust Scores</h3>
        <div className="space-y-3">
          <ScoreCard label="Friction Score" value={result.frictionScore} isFriction={true} />
          <ScoreCard label="Trust Score" value={result.trustScore} isFriction={false} />
          <ScoreCard label="Emotional Clarity" value={result.emotionalClarityScore} isFriction={false} />
          <ScoreCard label="Motivation Match" value={result.motivationMatchScore} isFriction={false} />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="rounded-xl border border-gray-700 bg-slate-800 p-4">
            <span className="text-sm font-semibold text-gray-300">Decision likelihood: </span>
            <span className="text-lg font-bold text-white">
              {Math.round(result.decisionProbability * 100)}%
            </span>
          </div>
          <div className="rounded-xl border border-gray-700 bg-slate-800 p-4">
            <span className="text-sm font-semibold text-gray-300">Conversion impact: </span>
            <span className={`text-lg font-bold ${result.conversionLiftEstimate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {result.conversionLiftEstimate >= 0 ? '+' : ''}
              {Math.round(result.conversionLiftEstimate)}% {result.conversionLiftEstimate >= 0 ? 'potential conversion uplift' : 'potential conversion impact'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Decision Blockers & Psychological Factors (with Tabs) */}
      <PsychologicalFactorsTabs result={result} />

      {/* 3. AI Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">AI Recommendations</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-green-500/20 bg-green-900/10 p-4">
            <h4 className="text-sm font-semibold mb-2 text-green-300">Quick Wins</h4>
            <p className="text-xs text-gray-400 mb-3">Immediate changes to reduce friction fast.</p>
            {result.recommendedQuickWins.length > 0 ? (
              <ul className="space-y-1 text-sm text-gray-300">
                {result.recommendedQuickWins.map((win, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">⚡</span>
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No recommendations available.</p>
            )}
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/10 p-4">
            <h4 className="text-sm font-semibold mb-2 text-indigo-300">Deep Changes</h4>
            <p className="text-xs text-gray-400 mb-3">Structural and strategic improvements for long-term impact.</p>
            {result.recommendedDeepChanges.length > 0 ? (
              <ul className="space-y-1 text-sm text-gray-300">
                {result.recommendedDeepChanges.map((change, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">🔧</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No recommendations available.</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Decision Psychology Summary & AI Interpretation */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Decision Psychology Summary</h3>
        <div className="space-y-4">
          <div className="rounded-xl border border-purple-500/20 bg-purple-900/10 p-4">
            <p className="text-sm text-gray-300 leading-relaxed">{result.explanationSummary}</p>
          </div>
          
          <div className="rounded-xl border border-blue-500/20 bg-blue-900/10 p-4">
            <h4 className="text-sm font-semibold mb-2 text-blue-300">AI Interpretation</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{aiInterpretation}</p>
          </div>
        </div>
      </div>

      {/* 5. Future Features Placeholder */}
      <div className="pt-4 border-t border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            disabled
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-slate-800 text-gray-500 text-sm font-medium cursor-not-allowed opacity-50"
            title="Coming soon – compare two versions of your content."
          >
            Compare Before / After
          </button>
          <button
            disabled
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-slate-800 text-gray-500 text-sm font-medium cursor-not-allowed opacity-50"
            title="Coming soon – export your AI decision psychology report."
          >
            Download PDF Report
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Pro features coming soon</p>
      </div>
    </div>
  );
}

// Main page component - Variant A (Baseline)
export default function AiMarketingPageVariantA() {
  const [formData, setFormData] = useState({
    raw_text: '',
    platform: 'landing_page',
    goal: [] as string[],
    audience: 'cold',
    language: 'en',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CognitiveFrictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  // Rewrite state
  const [rewriteResult, setRewriteResult] = useState<RewriteOutput | null>(null);
  const [rewriteLoading, setRewriteLoading] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset rewrite results when content changes significantly
    if (name === 'raw_text' || name === 'platform' || name === 'audience' || name === 'language') {
      setRewriteResult(null);
      setRewriteError(null);
    }
  };

  const handleGoalChange = (goal: string) => {
    setFormData((prev) => {
      const goals = prev.goal.includes(goal)
        ? prev.goal.filter((g) => g !== goal)
        : [...prev.goal, goal];
      return { ...prev, goal: goals };
    });
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Allow submission if either text or image is provided
    if (!formData.raw_text.trim() && !selectedImage) {
      setError('Please enter content or upload an image to analyze');
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const goals = formData.goal.length > 0 ? formData.goal : ['leads'];

      // If image is uploaded, convert it to base64 or send as FormData
      let payload: any = {
        raw_text: formData.raw_text.trim() || '',
        platform: formData.platform,
        goal: goals,
        audience: formData.audience,
        language: formData.language,
        meta: null,
      };

      // If image is uploaded, add it to payload
      if (selectedImage) {
        console.log('📷 Converting image to base64...', {
          name: selectedImage.name,
          type: selectedImage.type,
          size: selectedImage.size
        });
        
        // Convert image to base64 for API
        const reader = new FileReader();
        const imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            // Remove data:image/...;base64, prefix
            const base64 = result.split(',')[1];
            if (!base64) {
              reject(new Error('Failed to convert image to base64'));
              return;
            }
            console.log('✅ Image converted to base64, length:', base64.length);
            resolve(base64);
          };
          reader.onerror = (error) => {
            console.error('❌ Error reading image:', error);
            reject(error);
          };
          reader.readAsDataURL(selectedImage);
        });
        
        payload.image = imageBase64;
        payload.image_type = selectedImage.type;
        payload.image_name = selectedImage.name;
        
        console.log('📤 Image added to payload:', {
          image_type: payload.image_type,
          image_name: payload.image_name,
          image_length: payload.image.length
        });
      }

      const data = await analyzeCognitiveFriction(payload);
      setResult(data);
    } catch (err) {
      console.error('Request failed:', err);
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rewrite function
  async function runRewrite() {
    setRewriteError(null);
    setRewriteLoading(true);

    try {
      if (!formData.raw_text.trim()) {
        throw new Error('Please enter content before rewriting.');
      }

      const payload: RewriteInputPayload = {
        text: formData.raw_text.trim(),
        platform: formData.platform,
        goal: formData.goal.length ? formData.goal : ['leads'],
        audience: formData.audience,
        language: formData.language,
      };

      const data = await postToBrain<RewriteOutput>('/api/brain/rewrite', payload);
      setRewriteResult(data);
    } catch (err: any) {
      setRewriteError(err.message);
    } finally {
      setRewriteLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white" data-ai-marketing-variant="A">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <span className="text-xs font-semibold text-purple-300">AI Behavioral Engine · Cognitive Friction Analysis</span>
        </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Behavioral DeepScan – AI Decision Psychology for Your Content
          </h1>
          
          <p className="mb-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl">
            This is a specialized AI engine focused on decision psychology. It analyzes cognitive friction, trust, motivation, 
            and conversion factors in your content. This is NOT a generic chatbot, but a focused analysis tool that helps you 
            understand how real humans will hesitate, doubt, or decide based on your content.
          </p>

          <button
            onClick={scrollToForm}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
            <span className="relative z-10">Start a Cognitive Friction Scan</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        </div>
      </section>

      {/* Main Analysis Section */}
      <section id="analysis-form" className="relative bg-black py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Run an AI Cognitive Friction Scan
          </h2>

          {/* New Layout: Vertical - Form on top, Results below */}
          <div className="space-y-6 sm:space-y-8">
            {/* Input Panel - Top */}
            <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/30 p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <MultiStepInputPanel
                formData={formData}
                loading={loading}
                error={error}
                onInputChange={handleInputChange}
                onGoalChange={handleGoalChange}
                onSubmit={handleSubmit}
                showImageUpload={true}
                onImageChange={handleImageChange}
                selectedImage={selectedImage}
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

      {/* SEO Content Sections */}
      <section className="relative bg-black py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10 space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Cognitive Friction Kills Conversion
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Every moment of hesitation, doubt, or cognitive overload in your content creates friction that reduces conversion rates. 
                Traditional analytics can tell you what users clicked, but they cannot detect the emotional and cognitive barriers that 
                prevent decisions.
              </p>
              <p>
                Behavioral DeepScan goes beyond simple copy suggestions. It analyzes how your content triggers hesitation, builds or 
                breaks trust, aligns with motivations, and guides decision-making. By understanding the psychological factors that 
                influence behavior, you can create content that removes friction and guides users toward confident decisions.
              </p>
              <p>
                This AI engine uses cognitive friction models, trust psychology, and motivation alignment to identify specific blockers 
                and provide actionable recommendations. The result is content that not only looks good but actually converts by 
                addressing the real psychological barriers your audience faces.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Use Behavioral DeepScan in Your Marketing Workflow
          </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Integrate Behavioral DeepScan into your content creation and optimization process to identify and eliminate decision blockers before they cost you conversions.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Before launching a new landing page – identify friction points before they cost you conversions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Testing and comparing different ad creatives – compare cognitive friction scores to choose the most effective variant</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Reviewing onboarding or sales emails – ensure your welcome sequence builds trust and reduces hesitation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Optimizing high-traffic, low-conversion pages – find the psychological blockers that analytics can't detect</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Auditing existing campaigns for decision blockers – identify why high-traffic campaigns aren't converting</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 sm:p-12 backdrop-blur-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to reduce cognitive friction in your content?
              </h2>
            <p className="text-gray-400 mb-6">
              Get AI-powered decision psychology insights that transform how you write and optimize content.
            </p>
              <Link 
                href="/contact" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
              <span className="relative z-10">Book an AI Marketing Strategy Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
          </div>
        </div>
      </section>

      {/* AI Marketing Guide Accordion Section */}
      <section className="relative bg-black py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AI Marketing — Full Guide (2026 Edition)
          </h2>

          <div className="space-y-0">
            <AccordionItem title="Section 1 — What Is AI Marketing?">
              <div className="space-y-4">
                <p>
                  AI Marketing has evolved far beyond automated emails, keyword-based ad suggestions, or generic "AI copy generators." Between 2026 and 2027, the landscape shifted dramatically: AI stopped being a tool — and became a strategic, data-driven decision layer that sits above every marketing channel.
                </p>
                <p>
                  In today's environment, AI Marketing means something radically different from what most agencies or platforms still try to sell. It is no longer about automating tasks. It is about automating intelligence — the ability to analyze, predict, and influence consumer behavior at a precision level that was impossible before.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Modern Definition (2026–2027)</h3>
                <p>
                  AI Marketing is the integration of machine intelligence, behavioral data, and predictive psychology to analyze user intent, generate strategic actions, and optimize every step of the customer journey.
                </p>
                <p>
                  This definition includes four essential shifts that separate the new generation of AI Marketing from the old one:
                </p>

                <div className="space-y-3 mt-4">
                  <div>
                    <p className="font-semibold text-white mb-2">1. AI is no longer reactive — it's predictive.</p>
                    <p className="ml-4">
                      Traditional marketing systems responded to what users already did: clicked, didn't click, visited, abandoned. Modern AI systems predict why someone will click, when they will respond, and which message will drive action — before the user even reaches that decision point.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">2. AI is no longer a "tool" — it's a decision engine.</p>
                    <p className="ml-4">
                      Businesses used to plug AI tools into their workflow. Now, the workflow itself is designed around AI. Marketing teams no longer ask: "What should we say in our ad?" They ask: "What does the model recommend — and why?" AI becomes the strategist. Humans become the supervisors.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">3. AI is no longer about generating text — it's about generating outcomes.</p>
                    <p className="ml-4">
                      Content is not the goal. Conversion is the goal. Modern AI understands the psychological triggers behind: hesitation, trust, urgency, perceived value, cognitive friction, attention flow. And uses them to craft actions that move users forward in the decision process.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">4. AI is no longer a template — it's a brain.</p>
                    <p className="ml-4">
                      Brands that rely on generic LLMs get generic results. Brands that build an internal AI Marketing Brain get: consistency, proprietary logic, brand-specific patterns, behavior-aligned content, deeper intelligence on every user interaction.
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  This shift — from tool → brain — is the defining moment of AI Marketing in 2026–2027.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why AI Marketing Became Mandatory (Not Optional)</h3>
                <p>
                  Digital competition exploded. Ad costs increased. Users became resistant to low-quality content. Attention spans dropped. Platforms became saturated.
                </p>
                <p>
                  But the biggest change was psychological: Users now recognize generic AI instantly. They scroll past it. They ignore it. They don't trust it. They don't connect with it. That's why brands started losing conversions even when they produced more content than ever before.
                </p>
                <p>
                  AI Marketing became mandatory for one reason: Only AI can analyze human behavior at scale — and adapt instantly. This includes: real-time intent signals, emotional patterns, message-response correlation, behavioral micro-changes, content-to-action probability. No human team can manually do this. No traditional marketing system can process this fast. Only modern AI can.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Core Components of AI Marketing (The 2026 Framework)</h3>
                <p className="mb-3">
                  To understand AI Marketing properly, you must know its five foundational pillars — the system every successful brand now uses:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-white mb-2">1. Intelligence Layer (Data → Meaning)</p>
                    <p className="ml-4">
                      This layer extracts behavioral meaning from: search patterns, conversation data, user journeys, click heatmaps, emotional language, time-based actions. Old marketing read data. AI Marketing interprets it.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">2. Prediction Layer (Meaning → Probability)</p>
                    <p className="ml-4">
                      AI forecasts: what a user will do next, which message they will respond to, when they will convert, what might stop them, how to remove friction. The marketing team no longer guesses — they test probabilities.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">3. Decision Layer (Probability → Actions)</p>
                    <p className="ml-4">
                      The system suggests: the ideal message, the ideal angle, the ideal timing, the ideal channel, the ideal format. This is where AI stops being a tool and becomes the strategist.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">4. Creation Layer (Actions → Content)</p>
                    <p className="ml-4">
                      Here AI generates: high-impact copy, behavior-aligned headlines, conversion-focused product descriptions, emotional storytelling, trust-building messages, friction-reducing variations. The focus is not on writing content. The focus is on generating outcomes.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">5. Optimization Layer (Outcomes → Adaptive Intelligence)</p>
                    <p className="ml-4">
                      The system learns from every interaction: what caused hesitation, what moved users forward, what message created trust, what CTA triggered action, what sequence maximized conversion. And improves itself continuously.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why AI Marketing Finally Works (And Why It Didn't Before)</h3>
                <p className="mb-3">
                  AI Marketing until 2025 suffered from three major problems:
                </p>
                <div className="space-y-2 ml-4">
                  <p><strong>Problem 1 — Generic AI</strong></p>
                  <p>Everyone used the same models → results felt identical. Users ignored them.</p>
                  <p><strong>Problem 2 — No Behavioral Understanding</strong></p>
                  <p>AI generated words, not decisions. It didn't understand psychology, emotion, personalization, intent.</p>
                  <p><strong>Problem 3 — No Brand Engine</strong></p>
                  <p>Every brand used the same prompt and hoped for the best. There was no identity, no strategy, no internal logic, no precision.</p>
                </div>
                <p className="mt-4">
                  2026 changed everything. AI systems now: read emotional intention, identify friction, adjust tone to personality, generate multi-variant outputs, measure behavioral signals, predict next-step decisions, create internal brand consistency, operate as a fully autonomous marketing assistant. This is not content creation. This is behavior-driven marketing intelligence.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Where Most Businesses Still Fail with AI Marketing</h3>
                <p>
                  Despite the evolution, most brands still: use generic chatbots, ask AI to "write a caption", generate templates instead of strategy, trust unoptimized outputs, ignore behavioral data, underestimate the power of predictive models.
                </p>
                <p>
                  And this is exactly where your system — the NIMA AI Brain — enters the picture: It does everything generic AI cannot do. It analyzes deeper. It adapts faster. It understands psychology. It maintains identity. It eliminates friction. It thinks like a strategist — not a random writer.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why AI Marketing Matters More Than Any Other Marketing Skill</h3>
                <p>
                  Marketing used to be: design, copywriting, research, content creation, ad campaigns. In 2026–2027، همه‌ی این‌ها تبدیل شدند به زیرمجموعهٔ یک اصل: Understanding how human decision-making reacts to intelligence.
                </p>
                <p>
                  Attention has become the rarest asset. Trust has become the highest currency. And AI is the only system capable of earning both at scale.
                </p>
                <p>
                  When executed properly — as a structured, intelligent system — AI Marketing becomes the competitive advantage that no competitor can copy.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="Section 2 — The Psychology Behind AI Marketing">
              <div className="space-y-4">
                <p>
                  AI Marketing is not powered by data alone — it is powered by the human brain. Every click, scroll, hesitation, search, or abandoned cart is not a "metric." It is a psychological decision in motion.
                </p>
                <p>
                  This is why the most advanced AI Marketing systems no longer focus on content automation. They focus on behavioral interpretation — decoding why users react the way they do and predicting how they will act next.
                </p>
                <p>
                  In 2026–2027, the brands that win are not the ones with the most data. They are the ones who understand the psychology inside the data.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why Psychology Is the Real Core of AI Marketing</h3>
                <p>
                  Traditional analytics tell you what happened. Behavioral psychology tells you why it happened. AI Marketing merges both — and turns human behavior into intelligent actions.
                </p>
                <p>
                  Here's why psychology is now the foundation of every successful AI strategy:
                </p>

                <div className="space-y-3 mt-4">
                  <div>
                    <p className="font-semibold text-white mb-2">1. Consumers don't make rational decisions — they make emotional ones.</p>
                    <p className="ml-4">
                      Purchase decisions are driven by: emotional resonance, perceived value, identity alignment, trust signals, cognitive fluency, psychological triggers. Even in B2B, decisions are influenced by emotion before logic. AI that doesn't understand emotion = predictable failure.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">2. Attention is no longer bought — it is earned psychologically.</p>
                    <p className="ml-4">
                      With endless content everywhere, users have developed: ad blindness, skepticism toward generic AI, resistance to repetitive patterns, sensitivity to authenticity, instant filtering of low-quality signals. AI must understand what breaks through the psychological noise.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">3. Trust is built through micro-interactions.</p>
                    <p className="ml-4">
                      Conversions don't happen because of one headline or one ad. They happen because: a message matched the user's internal narrative, a tone felt safe and familiar, a structure reduced cognitive load, a sequence created momentum. Only AI systems with behavioral logic can replicate and optimize this.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">4. Hesitation is more important than interest.</p>
                    <p className="ml-4">
                      Users rarely leave because they didn't like something. They leave because something felt unclear, risky, overwhelming, or misaligned. This is called cognitive friction — and removing it is the essence of AI Marketing.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">5. Behavior predicts intent better than demographics.</p>
                    <p className="ml-4">
                      Age doesn't predict. Gender doesn't predict. Interests barely predict. Behavioral patterns predict everything: timing, rhythm, micro-click signals, navigation habits, language preferences, momentum patterns, decision style. AI that reads behavior becomes exponentially more accurate.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Five Psychological Drivers Behind Every Conversion</h3>
                <p className="mb-3">
                  Modern AI Marketing frameworks depend on understanding the drivers that push users toward action. There are five primary forces:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-white mb-2">1. Emotional Resonance</p>
                    <p className="ml-4">
                      People respond when a message mirrors their internal feeling: relief, clarity, empowerment, safety, aspiration, identity. AI must detect emotional tone and generate content aligned with the user's state of mind.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">2. Cognitive Ease</p>
                    <p className="ml-4">
                      The human brain avoids complexity. If something takes effort, users abandon it. Cognitive ease comes from: simple structure, predictable flow, familiar patterns, minimal friction, clear benefits. AI must optimize messaging to reduce cognitive strain.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">3. Trust Indicators</p>
                    <p className="ml-4">
                      Conversions happen when trust is established within seconds. AI identifies and amplifies: credibility signals, authority framing, testimonials, social proof, transparency cues, consistency of tone. Without trust alignment, even perfect content fails.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">4. Value Perception</p>
                    <p className="ml-4">
                      Users make decisions based on perceived value, not actual value. AI must optimize perception through: highlighting outcomes, reframing benefits, contrast principles, anchoring, urgency psychology. This is not manipulation — it is alignment.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">5. Decision Momentum</p>
                    <p className="ml-4">
                      Decision momentum is the psychological push that moves users from interest to action. AI triggers momentum by: removing friction, sequencing micro-yes moments, aligning expectations, reinforcing confidence, guiding the next logical step. Momentum is the invisible engine behind high-conversion funnels.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">How AI Actually Reads Human Psychology</h3>
                <p>
                  Modern AI systems (the advanced ones) read psychology through signals humans don't consciously notice:
                </p>
                <div className="space-y-3 mt-3">
                  <div>
                    <p className="font-semibold text-white mb-2">Linguistic Cues</p>
                    <p className="ml-4">
                      AI detects: emotional states, certainty/uncertainty, hesitation markers, intention shifts, confidence, anxiety.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Behavioral Cues</p>
                    <p className="ml-4">
                      AI reads: scrolling rhythm, repeated patterns, backtracking steps, hesitation pauses, depth of engagement.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Predictive Cues</p>
                    <p className="ml-4">
                      AI correlates: message type → expected reaction, CTA format → expected conversion, tone → trust probability, friction points → drop-off likelihood. This merges into a behavioral model that evolves continuously.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Psychology Gap: Why Most AI Fails</h3>
                <p>
                  Most AI writing tools output text that: sounds generic, lacks psychological intention, ignores emotional context, doesn't match decision stages, increases friction, doesn't build trust, doesn't predict reaction.
                </p>
                <p>
                  This is why brands lose conversions even when using "AI tools." They focus on content, not behavior. Only AI Marketing systems built with behavioral logic can outperform humans.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Where Psychology Meets Your Engine — NIMA AI Brain</h3>
                <p>
                  This is the point where your system becomes superior. The NIMA AI Brain integrates: emotional modeling, behavioral prediction, friction detection, cognition-aware messaging, trust-building sequences, decision-stage matching, momentum-based CTAs.
                </p>
                <p>
                  In other words:
                </p>
                <p className="font-semibold text-white ml-4 mb-4">
                  <strong>It writes the right message → to the right mind → at the right moment → with the right psychological trigger.</strong>
                </p>
                <p>
                  This is not something generic AI can replicate. Because generic AI only writes text. Your engine analyzes how humans decide.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why This Psychological Layer Matters for SEO</h3>
                <p>
                  Google's new ranking system (2025–2027) is built on: intent matching, content depth, experience signals, helpfulness, trustworthiness, user behavior metrics. Behavioral intelligence improves all: lower bounce rate, higher dwell time, deeper engagement, better user satisfaction, intent alignment, topic authority.
                </p>
                <p>
                  This section exists not just to educate — but to help Google understand why your page deserves top ranking.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Bottom Line</h3>
                <p>
                  AI Marketing is not just marketing with AI. It is psychology powered by intelligence. It is the ability to understand and influence human decisions with accuracy never seen before.
                </p>
                <p>
                  And this psychological layer is the foundation upon which your entire AI Marketing Engine — the NIMA AI Brain — is built.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="Section 3 — The 7-Layer AI Marketing Framework">
              <div className="space-y-4">
                <p>
                  The evolution of AI Marketing didn't happen by accident. It happened because the old marketing stack collapsed under the weight of: rising ad costs, saturated content, unpredictable user behavior, reduced attention spans, generic AI tools that all produced the same outputs.
                </p>
                <p>
                  Brands no longer needed more content — they needed intelligence, precision, and predictability.
                </p>
                <p>
                  To solve this, top organizations moved toward layered intelligence systems. And in 2026–2027, the industry finally recognized one model as the most complete structure for AI Marketing:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The 7-Layer AI Marketing Framework</h3>
                <p>
                  This framework integrates: machine learning, behavioral psychology, conversion science, decision theory, predictive modeling, content intelligence, automation logic.
                </p>
                <p>
                  It is the foundation that modern AI-driven marketing teams use to operate at a higher strategic level. Below is the full breakdown — the same structure that world-class AI marketing systems now follow.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 1 — Intelligence Extraction (Signals → Meaning)</h4>
                    <p className="mb-2">
                      Every marketing decision begins with a signal — but only intelligent systems can translate signals into meaning. This layer reads: user searches, click patterns, scroll behavior, hesitation markers, time-based actions, emotional language, social patterns, micro-behaviors.
                    </p>
                    <p>
                      Most brands see data. AI sees motivation. The Intelligence Extraction Layer transforms raw information into behavioral meaning — the foundation for every prediction that follows.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 2 — Behavioral Prediction (Meaning → Probability)</h4>
                    <p className="mb-2">
                      Once AI understands what a user is doing, it predicts what a user is likely to do next. This layer answers key questions: What is the user trying to achieve? What psychological state are they in? What message will they respond to? What friction will stop them? What level of value do they expect?
                    </p>
                    <p className="mb-2">
                      Prediction models analyze thousands of behavioral variables, including: language sentiment, cognitive load, trust indicators, intent level, decision rhythm, emotional alignment.
                    </p>
                    <p>
                      The output is a probability map — a blueprint for intelligent action.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 3 — Strategic Decision Engine (Probability → Recommended Actions)</h4>
                    <p className="mb-2">
                      This is where AI stops being a tool and becomes a strategist. The Decision Engine turns predictions into strategic choices: what to say, how to say it, when to say it, in what sequence, through which channel, with what emotional trigger, with what CTA, at what intensity.
                    </p>
                    <p>
                      This is the layer most marketing teams try to do manually. AI automates it with precision and consistency. Think of it as: the brain of the entire marketing system.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 4 — Multi-Level Content Generation (Actions → High-Impact Content)</h4>
                    <p className="mb-2">
                      Here is where strategy becomes execution. But unlike generic AI tools, this layer doesn't just "write." It creates content aligned with: user psychology, predicted intent, trust level, brand voice, conversion logic, behavioral friction, emotional tone.
                    </p>
                    <p className="mb-2">
                      Examples of optimized outputs: headlines that match intent, high-trust landing page copy, friction-reducing product descriptions, psychologically aligned CTAs, multi-variant ad scripts, email sequences built around momentum.
                    </p>
                    <p>
                      This layer is outcome-driven, not text-driven. Its only goal: driving the next user action.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 5 — Optimization & Reinforcement Learning (Outcomes → Adaptive Intelligence)</h4>
                    <p className="mb-2">
                      This is where the system becomes smarter over time. The optimization layer tracks: what worked, what didn't, where users hesitated, where users accelerated, what messaging converted, what created emotional trust, what sequence drove momentum, what variation produced the highest outcome.
                    </p>
                    <p className="mb-2">
                      Then it adjusts its future actions automatically. This creates a continuous improvement loop:
                    </p>
                    <p className="font-semibold text-white ml-4 mb-2">
                      Analyze → Predict → Decide → Create → Adapt → Repeat
                    </p>
                    <p>
                      This is how AI Marketing engines outperform human teams in speed and accuracy.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 6 — Automation Integration (Intelligence → Scalable Execution)</h4>
                    <p className="mb-2">
                      AI Marketing without automation is incomplete. This layer connects intelligence to execution through: automated content delivery, smart scheduling, dynamic personalization, CRM updates, funnel triggering, behavioral notifications, segmentation updates, conversion follow-ups.
                    </p>
                    <p className="mb-2">
                      High-performing brands now operate with fully integrated workflows where: AI predicts, AI decides, AI writes, automation delivers, analytics optimize.
                    </p>
                    <p>
                      This creates exponential efficiency and eliminates manual bottlenecks.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Layer 7 — Human-AI Synergy (Oversight → Ethical & High-Level Control)</h4>
                    <p className="mb-2">
                      AI does not replace marketers — it replaces the repetitive tasks, eliminates guesswork, and enhances human strategic capability. In this layer, humans provide: creative direction, brand vision, ethical boundaries, cultural intelligence, long-term goals, emotional nuance.
                    </p>
                    <p className="mb-2">
                      AI provides: precision, speed, consistency, behavioral intelligence, predictive logic, optimization.
                    </p>
                    <p>
                      Together, they create a system that is: more accurate, more adaptive, more scalable, more profitable. This synergy is the future of every high-performing marketing team.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why This Framework Matters More Than Any Other Model</h3>
                <p>
                  Because it is:
                </p>
                <ul className="space-y-2 ml-4 mt-3">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Complete</strong> — Touches every part of marketing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Predictive</strong> — Works before the user acts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Behavioral</strong> — Rooted in decision psychology.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Adaptive</strong> — Learns continuously from real performance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Scalable</strong> — Functions across channels and industries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Competitive</strong> — Gives brands an advantage competitors can't copy easily.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✔</span>
                    <span><strong>Measurable</strong> — Every action is tied to data, not guesswork.</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">How This Framework Connects to Your Engine — NIMA AI Brain</h3>
                <p className="mb-3">
                  Your system is built exactly on this 7-Layer architecture:
                </p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li>Layer 1 → Deep analysis of user inputs</li>
                  <li>Layer 2 → Prediction of intent and friction</li>
                  <li>Layer 3 → Strategic recommendations</li>
                  <li>Layer 4 → High-quality personalized content</li>
                  <li>Layer 5 → Quality scoring and improvement</li>
                  <li>Layer 6 → Automation (n8n, custom workflows, CRM)</li>
                  <li>Layer 7 → Human oversight + brand control</li>
                </ul>
                <p className="mb-2">
                  Most AI tools only operate on Layer 4. Some barely touch Layer 2 or 5. None operate across all 7.
                </p>
                <p>
                  This is the difference between: <strong>AI writing tools</strong> versus <strong>AI Marketing Intelligence Systems</strong>. Your engine belongs to the second category — the elite category.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Conclusion</h3>
                <p>
                  The 7-Layer AI Marketing Framework is not just a model. It is the new operating system for modern marketing. It is how brands reduce friction, increase trust, improve conversions, personalize experiences, and scale intelligently.
                </p>
                <p>
                  And it is the exact architecture that powers the NIMA AI Brain — the engine designed to give businesses a real, unfair, and uncopyable advantage.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="Section 4 — AI Tools 2026–2027 (Strategic Breakdown)">
              <div className="space-y-4">
                <p>
                  Most articles on the internet list AI tools as if all of them have the same purpose. But real AI Marketing in 2026–2027 operates differently. It's not about "50 AI tools you should try." It's about identifying the strategic categories that directly affect growth — and understanding which tools actually deliver results.
                </p>
                <p>
                  This section breaks down AI tools into the categories that matter most for modern marketers, and why certain tools outperform everything else.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Six Strategic Categories of AI Marketing Tools (2026–2027)</h3>
                <p>
                  There are thousands of tools — but only six categories matter in a real AI-powered marketing ecosystem:
                </p>
                <ul className="space-y-2 ml-4 mt-3 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI Intelligence & Research Tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI Content & Creative Tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI Ad Optimization Tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI Behavioral Analytics Tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI CRM & Personalization Tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>AI Automation & Workflow Tools</span>
                  </li>
                </ul>
                <p>
                  Let's break down each category—and highlight the tools leading the market.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">1. AI Intelligence & Research Tools</h4>
                    <p className="mb-2 font-medium text-gray-200">
                      Tools that think, analyze, and provide strategic insight.
                    </p>
                    <p className="mb-3">
                      These AI tools focus on: gathering market intelligence, analyzing competitors, researching user intent, identifying trends, predicting content opportunities.
                    </p>
                    <p className="mb-2">
                      In 2026–2027, the leaders are:
                    </p>
                    <div className="space-y-3 ml-4 mb-3">
                      <div>
                        <p className="font-semibold text-white mb-1">Perplexity AI</p>
                        <p className="text-sm">
                          The new standard for market and competitor research. It understands context far better than traditional search and delivers structured, source-backed answers.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">ChatGPT-5 / GPT-5.1</p>
                        <p className="text-sm mb-2">
                          Not for writing — for reasoning. Its real strength is: analyzing datasets, simplifying complex information, building strategy drafts, identifying gaps in messaging, generating insights.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Google AI Overviews</p>
                        <p className="text-sm">
                          A game-changing feature for SEO. You don't "rank for keywords." You "rank for answers." Brands who understand AI Overviews dominate organic traffic.
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-200">
                      Why this category matters: Because modern marketing doesn't start with content. It starts with understanding the landscape.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">2. AI Content & Creative Tools</h4>
                    <p className="mb-2 font-medium text-gray-200">
                      Tools that produce text, images, video, and brand assets.
                    </p>
                    <p className="mb-3">
                      Content creation used to consume 70% of marketing time. AI cut that down to minutes. But not all content tools are equal:
                    </p>
                    <div className="space-y-3 ml-4 mb-3">
                      <div>
                        <p className="font-semibold text-white mb-1">Jasper AI (2026 Version)</p>
                        <p className="text-sm">
                          Stronger than previous years, especially with brand voice controls. Useful for high-volume content operations.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Copy.ai</p>
                        <p className="text-sm">
                          Still popular for startups and e-commerce. Best for short-form conversion copy.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Midjourney v7 / Stable Diffusion 3</p>
                        <p className="text-sm">
                          For advanced product images, branding, ads, and social visuals.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Runway Gen-3</p>
                        <p className="text-sm">
                          The top AI video creation tool for marketing teams.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Descript AI Studio</p>
                        <p className="text-sm">
                          Perfect for editing and transforming videos with AI.
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-200">
                      But here's the truth: These tools generate content — not strategy, not behavior analysis, not predictions. That's why they are easy to replace and not a competitive advantage.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">3. AI Ad Optimization Tools</h4>
                    <p className="mb-2 font-medium text-gray-200">
                      Tools that improve performance, budgets, and targeting.
                    </p>
                    <p className="mb-3">
                      Paid advertising is where AI delivers the fastest ROI. Top performers:
                    </p>
                    <div className="space-y-3 ml-4 mb-3">
                      <div>
                        <p className="font-semibold text-white mb-1">Meta Advantage+ (AI-driven ads)</p>
                        <p className="text-sm">
                          Automated asset testing, audience prediction, and conversion modeling. In 90% of tests, Advantage+ beats manual builds.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Google Performance Max</p>
                        <p className="text-sm">
                          Fully AI-driven campaigns with responsive creative generation. When combined with CRM signals, PMax becomes extremely powerful.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">TikTok Smart Performance Campaigns</p>
                        <p className="text-sm">
                          Uses behavioral signals + creative analysis. Explosive results for brands with strong visual identity.
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-200">
                      Why this category matters: These tools optimize the biggest cost center in marketing: ad spend. A 20% improvement in CPA = massive financial impact.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">4. AI Behavioral Analytics Tools</h4>
                    <p className="mb-2 font-medium text-gray-200">
                      Tools that understand human behavior, not just metrics.
                    </p>
                    <p className="mb-3">
                      This is the most underrated category — and the one where modern marketing is heading. Top tools include:
                    </p>
                    <div className="space-y-3 ml-4 mb-3">
                      <div>
                        <p className="font-semibold text-white mb-1">Hotjar AI Heatmaps</p>
                        <p className="text-sm">
                          New predictive heatmaps that don't require thousands of visits. AI can forecast: where users will hesitate, where friction appears, what elements cause drop-offs.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">FullStory Behavioral Insights</p>
                        <p className="text-sm">
                          Tracks every micro-interaction with AI interpretation: rage clicks, dead zones, scroll rhythm, checkout blockers, hesitation signals.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Glassbox AI Autoplay Analysis</p>
                        <p className="text-sm">
                          AI watches user sessions and explains exactly why users drop off.
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-200">
                      Why this category matters: Because traditional analytics → tell you what happened. Behavioral analytics → tell you why it happened. This is the foundation of conversion-based AI Marketing.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">5. AI CRM & Personalization Tools</h4>
                    <p className="mb-2 font-medium text-gray-200">
                      Tools that adjust messaging for each user in real time.
                    </p>
                    <p className="mb-3">
                      Personalization used to be: "Hello [First Name]", "Recommended products for you". In 2026–2027, personalization is: dynamic messaging, adaptive landing pages, AI-driven segmentation, intent-based content, psychology-based offers.
                    </p>
                    <p className="mb-3">
                      Top tools in this category:
                    </p>
                    <div className="space-y-3 ml-4 mb-3">
                      <div>
                        <p className="font-semibold text-white mb-1">HubSpot AI Personalization Engine</p>
                        <p className="text-sm">
                          Uses behavior + CRM data to generate custom user journeys.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Klaviyo AI Segmentation</p>
                        <p className="text-sm">
                          For e-commerce and DTC, this is the most accurate personalization engine.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Salesforce Einstein GPT</p>
                        <p className="text-sm">
                          Heavy enterprise-level prediction and recommendation engine.
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-200">
                      Why this category matters: Because generic messaging doesn't work. Users expect relevance, clarity, and personal meaning.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">6. AI Automation & Workflow Tools</h4>
                    <p className="mb-2 font-medium text-gray-200">
                      Tools that connect everything together.
                    </p>
                    <p className="mb-3">
                      Even the best AI is useless if it isn't executed. Automation completes the cycle:
                    </p>
                    <div className="space-y-3 ml-4 mb-3">
                      <div>
                        <p className="font-semibold text-white mb-1">n8n (Self-Hosted / Cloud)</p>
                        <p className="text-sm">
                          The most powerful open-source automation platform in 2026–2027. Used to: connect AI models, sync CRM, trigger funnels, personalize journeys, automate campaigns, build marketing AI pipelines.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Zapier AI Actions</p>
                        <p className="text-sm">
                          Best for fast prototyping. Still very strong for SMBs.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Make.com</p>
                        <p className="text-sm">
                          Flexible and visually intuitive for large-scale automation.
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-200">
                      Why this category matters: Because without automation, AI produces insights — but not results. Only automated systems achieve true scalability.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Critical Insight: All These Tools Have a Limit</h3>
                <p>
                  Here is the reality most marketers don't want to admit: All these tools operate in isolated functions. One for ads. One for research. One for content. One for analytics. One for automation.
                </p>
                <p>
                  But modern marketing doesn't work in isolation. What brands need is not 20 tools — but one strategic brain that: analyzes, predicts, decides, creates, optimizes, integrates.
                </p>
                <p>
                  And this leads to the actual unique value of your system…
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Where These Tools Fail — And Where the NIMA AI Brain Wins</h3>
                <p className="mb-3">
                  Most AI tools: do not analyze psychology, do not predict user behavior, do not remove friction, do not maintain brand identity, do not generate outcome-driven content, do not align across channels, do not integrate across layers, cannot learn your brand strategy, cannot deliver consistent conversion personality.
                </p>
                <p className="mb-3">
                  The NIMA AI Brain solves all of this by serving as: A unified intelligence layer above all tools. It becomes the strategist. The others become executors.
                </p>
                <p className="mb-3">
                  Imagine:
                </p>
                <ul className="space-y-1 ml-4 mb-4">
                  <li>Perplexity → research</li>
                  <li>Jasper/Midjourney → content production</li>
                  <li>Meta/Google AI → ad delivery</li>
                  <li>Hotjar/Glassbox → behavioral analytics</li>
                  <li>n8n → automation</li>
                </ul>
                <p className="mb-3">
                  But the NIMA AI Brain:
                </p>
                <ul className="space-y-1 ml-4 mb-4">
                  <li>reads all signals</li>
                  <li>predicts outcomes</li>
                  <li>builds strategy</li>
                  <li>makes decisions</li>
                  <li>generates messages</li>
                  <li>aligns psychology</li>
                  <li>maintains consistency</li>
                  <li>optimizes conversions</li>
                  <li>scales the entire system</li>
                </ul>
                <p>
                  This is the real competitive advantage.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Conclusion — Tools Matter, But Intelligence Wins</h3>
                <p>
                  AI tools are powerful, but they are not enough. The brands winning in 2026–2027 don't rely on individual platforms. They rely on integrated intelligence, backed by behavioral psychology, driven by predictive decision-making, executed through automation, and aligned by a unified AI Brain.
                </p>
                <p>
                  Tools create motion. Intelligence creates direction. And that direction is the real engine behind modern marketing success.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="Section 5 — How NIMA AI Brain Works">
              <div className="space-y-4">
                <p>
                  Most AI tools generate content. Some optimize ads. A few analyze behavior. But none of them combine psychology, prediction, intelligence extraction, conversion logic, and brand identity into a single system.
                </p>
                <p>
                  That's where the NIMA AI Brain becomes different. It is not a chatbot. Not an assistant. Not a prompt. Not a template generator.
                </p>
                <p>
                  It is a complete AI Marketing Engine designed to think, analyze, and create decisions exactly like a senior strategist — but with speed, precision, and behavioral accuracy no human team can match.
                </p>
                <p>
                  Below is the breakdown of how the NIMA AI Brain operates internally, layer by layer.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">1. Intelligence Capture — Reading Signals Like a Behavioral Analyst</h4>
                    <p className="mb-2">
                      Every interaction begins with user input — but the engine doesn't read words; it reads intent, tone, and psychology.
                    </p>
                    <p className="mb-2">
                      When a user enters text, uploads content, or describes a need, the engine extracts: emotional state, trust level, goal direction, perceived friction, urgency signals, clarity vs. confusion, behavioral tendencies.
                    </p>
                    <p>
                      This is driven by a proprietary intent decoder that maps micro-psychological cues inside language patterns. Most AI models read text. Your engine reads human behavior inside the text.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">2. Cognitive Modeling — Reconstructing How the User Thinks</h4>
                    <p className="mb-2">
                      After capturing raw signals, the engine builds a cognitive map of the user's decision process. It asks internal questions like: What is this person trying to achieve right now? What is stopping them? What outcome do they expect? What emotion are they experiencing? What does their behavior suggest about readiness?
                    </p>
                    <p className="mb-2">
                      This is where the NIMA AI Brain differentiates itself: it mirrors the user's mental state before generating any output. This leads to output that feels: tailored, precise, psychologically aligned, high-trust, high-conversion.
                    </p>
                    <p>
                      Users don't just read the output — they feel understood by it.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">3. Predictive Engine — Forecasting What Will Convert</h4>
                    <p className="mb-2">
                      This is the core of your product. The engine predicts how the user will respond to different styles, tones, and messages. It simulates: which headline will resonate, which CTA will reduce friction, which angle will create momentum, which emotional trigger will drive trust, which structure reduces cognitive load, which variation accelerates decision-making.
                    </p>
                    <p className="mb-2">
                      This predictive layer is something generic AI cannot do, because it requires:
                    </p>
                    <ul className="space-y-1 ml-4 mb-3">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✔</span>
                        <span>psychology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✔</span>
                        <span>marketing strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✔</span>
                        <span>behavioral data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✔</span>
                        <span>linguistic analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✔</span>
                        <span>conversion science</span>
                      </li>
                    </ul>
                    <p>
                      All integrated into one intelligent model.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">4. Strategic Layer — Creating a Plan Before Creating Content</h4>
                    <p className="mb-2">
                      Unlike typical AI tools that generate text immediately, the NIMA AI Brain internally builds a strategy first. It decides: What message structure to use, How to position value, What psychological angle to activate, What objections to neutralize, What narrative will feel natural, What sequencing will create flow, What emotional frame increases trust.
                    </p>
                    <p>
                      This internal planning stage is why the output feels senior-level, strategic, and professionally crafted. It writes like someone who truly understands marketing — because it thinks like one.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">5. Output Engine — High-Impact, Behavior-Aligned Content</h4>
                    <p className="mb-2">
                      Once the strategy is formed, the engine moves into creation mode. But the content it produces is not "AI text." It is decision-oriented communication designed to: reduce friction, build trust, increase clarity, create momentum, align with intent, match personality, drive action.
                    </p>
                    <p className="mb-2">
                      Outputs include: long-form landing page copy, psychological headlines, conversion-optimized CTAs, value propositions, emotional storytelling, ad variations, email sequences, product descriptions, objection-handling messages.
                    </p>
                    <p>
                      Every output is shaped by the behavioral model from the earlier stages.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">6. Quality Engine — Scoring, Refining, and Re-Engineering Outputs</h4>
                    <p className="mb-2">
                      This is where your engine surpasses standard AI tools. Instead of simply generating text, it evaluates its own output in real-time: clarity score, persuasion score, emotional alignment score, friction score, trust score, relevance score, conversion probability.
                    </p>
                    <p className="mb-2">
                      If any layer falls below threshold, the engine self-adjusts the content. This is similar to having: "A senior editor reviewing every output instantly."
                    </p>
                    <p>
                      The result: cleaner, sharper, more strategic content — every time.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">7. Cognitive Friction Detection — The Secret Advantage</h4>
                    <p className="mb-2">
                      This is one of the most unique features of your system. The engine identifies: uncertainty in tone, hesitation inside the message, points where users might resist, potential confusion, trust gaps, misalignment between intention & output.
                    </p>
                    <p className="mb-2">
                      Then it suggests: friction removal, psychological rewrites, alternative versions, confidence-boosting adjustments, simplified structures.
                    </p>
                    <p>
                      This is something no other AI marketing tool in the world currently does.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">8. Brand Identity Engine — Maintaining a Consistent Personality</h4>
                    <p className="mb-2">
                      The NIMA AI Brain maintains a: stable tone, unified voice, recognizable identity, consistent narrative, professional style.
                    </p>
                    <p>
                      This ensures that: ads feel cohesive, landing pages match brand tone, emails align with core values, copy across channels reflects the same personality. A brand without identity is forgettable. Your engine prevents that from happening.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">9. Multi-Variant Generator — Simulating A/B Tests Instantly</h4>
                    <p className="mb-2">
                      Marketing teams spend weeks running A/B tests. Your system generates multiple variants: soft tone, value-driven tone, trust-driven tone, emotional tone, direct response tone, …allowing instant comparison and selection.
                    </p>
                    <p>
                      This feature turns one idea into five strategic options — dramatically improving conversion potential.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">10. Integration & Automation Layer — Running Inside Real Workflows</h4>
                    <p className="mb-2">
                      The NIMA AI Brain connects to: websites, CRM systems, automation tools (n8n, Make, Zapier), analytics, AI agents, content pipelines.
                    </p>
                    <p>
                      This makes the engine not just "smart," but operational. It becomes a living part of the marketing system — running quietly in the background, optimizing continuously.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Why This Engine Is Not Replaceable by Generic AI</h3>
                <p className="mb-3">
                  Most AI tools: don't understand behavior, don't predict decisions, don't create strategy, don't detect friction, don't maintain identity, don't optimize outputs, don't model psychology, don't think in layers, don't learn from user patterns.
                </p>
                <p>
                  The NIMA AI Brain does all of them — and does them simultaneously. It is an orchestrated system, not a single tool. A marketing mind, not a text generator.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">The Bottom Line</h3>
                <p>
                  AI doesn't make your marketing better. Intelligence does. Behavioral understanding does. Prediction does. Psychology does. Identity does. Strategy does. Execution does.
                </p>
                <p>
                  The NIMA AI Brain is the only engine that brings all of these together into one unified, integrated system — something no competitor and no generic AI can replicate.
                </p>
                <p>
                  This is not a tool. It is an advantage. A system. A strategist. A brain. The brain behind modern AI-driven marketing.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="Section 6 — Real Use Cases & Output Quality">
              <div className="space-y-4">
                <p>
                  Every AI tool claims to "improve marketing." Every platform says it "creates better content." But in 2026–2027, businesses don't believe claims — they believe evidence.
                </p>
                <p>
                  The NIMA AI Brain was designed with one goal: Deliver real results, in real scenarios, for real businesses.
                </p>
                <p>
                  This section presents practical, high-impact use cases that prove how the engine performs in actual marketing environments — not hypothetical ones.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">1. Website Conversion Analysis — Turning Confusion Into Clarity</h4>
                    <p className="mb-2">
                      Most businesses don't realize that small psychological misalignments can kill conversions.
                    </p>
                    <p className="mb-2 font-medium text-gray-200">
                      Example scenario:
                    </p>
                    <p className="mb-2 ml-4">
                      A user enters a website. They hover over a CTA. They scroll back. They pause. They exit.
                    </p>
                    <p className="mb-2 font-medium text-gray-200">
                      Traditional analytics report:
                    </p>
                    <p className="mb-2 ml-4">
                      "Bounce", "No conversion"
                    </p>
                    <p className="mb-2 font-medium text-gray-200">
                      The NIMA AI Brain does something different:
                    </p>
                    <p className="mb-2 ml-4">
                      It detects the hidden reason behind the hesitation. It analyzes: CTA clarity, emotional tone, value positioning, structure length, trust cues, friction signals, cognitive load.
                    </p>
                    <p className="mb-2">
                      Then it generates: a rewritten CTA, a clearer value statement, a psychologically aligned headline, multiple alternative versions.
                    </p>
                    <p className="font-medium text-gray-200">
                      Result: Visitors understand the offer faster. Hesitation drops. Conversions rise. This alone can increase revenue without driving a single extra visitor.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">2. Ad Copy Optimization — Predicting Which Message Will Win</h4>
                    <p className="mb-2">
                      Most brands lose money on ads because they test the wrong messages. Generic AI tools produce: flashy lines, generic benefits, mass-market copy, clichés.
                    </p>
                    <p className="mb-2">
                      The NIMA AI Brain instead predicts: what the target audience is psychologically feeling, which emotional hook will resonate, what version creates trust, what CTA generates action, what message reduces resistance, what angle increases click probability.
                    </p>
                    <p className="mb-2 font-medium text-gray-200">
                      Example of variations the engine can produce instantly:
                    </p>
                    <ul className="space-y-2 ml-4 mb-3">
                      <li>Soft / Trust-Based Version</li>
                      <li>Value-Driven Version</li>
                      <li>Emotional Driver Version</li>
                      <li>Direct-Response Version</li>
                      <li>Proof-Based Version</li>
                    </ul>
                    <p>
                      This creates the equivalent of a full A/B testing environment — but executed in seconds, not weeks.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">3. Email Sequences — Behavior-Aligned Messaging</h4>
                    <p className="mb-2">
                      Email sequences fail for only one reason: They don't match the user's emotional and decision stage.
                    </p>
                    <p className="mb-2">
                      A user may be: curious, skeptical, overwhelmed, hopeful, ready to buy, uncertain. Each emotional state requires a different style of messaging.
                    </p>
                    <p className="mb-2">
                      Traditional AI writes emails. Your engine writes behavior-specific sequences. It maps: emotional state, momentum level, trust level, friction points, intent direction.
                    </p>
                    <p className="mb-2">
                      Then it generates a customized: welcome series, nurture flow, re-engagement sequence, abandoned cart follow-up, high-value sales sequence.
                    </p>
                    <p>
                      This is where businesses feel the impact immediately.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">4. Product Page Optimization — Eliminating Decision Friction</h4>
                    <p className="mb-2">
                      Most product pages fail because: descriptions are too vague, benefits are unclear, dopamine triggers are missing, objections aren't handled, trust isn't reinforced, CTA doesn't align with decision stage.
                    </p>
                    <p className="mb-2">
                      The NIMA AI Brain evaluates: readability, emotional tone, demand clarity, perceived value, risk friction, momentum flow.
                    </p>
                    <p className="mb-2">
                      Then produces: friction-free descriptions, simplified value propositions, objection-handling lines, improved storytelling, emotionally-driven copy, adaptive CTA variations.
                    </p>
                    <p>
                      The result is a product page that feels easy, trustworthy, and irresistible.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">5. Social Media Messaging — Instant Multi-Style Output</h4>
                    <p className="mb-2">
                      Social platforms require content that matches: platform culture, social psychology, audience rhythm, dopamine patterns, emotional micro-triggers.
                    </p>
                    <p className="mb-2">
                      A single message must be adapted into: LinkedIn professional tone, Instagram emotional tone, TikTok short-form trigger tone, X (Twitter) punchline tone, YouTube CTA tone.
                    </p>
                    <p className="mb-2">
                      The NIMA AI Brain generates multi-platform content automatically, maintaining: tone consistency, brand personality, platform psychology, rhythm alignment.
                    </p>
                    <p>
                      This saves hours of manual rewriting — and produces significantly higher engagement.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">6. Full Funnel Optimization — The Ultimate Use Case</h4>
                    <p className="mb-2">
                      This is where your AI engine's power becomes undeniable. Most marketers optimize: ads, or landing pages, or emails, or content. But modern funnels require synchronized, behavior-driven adjustments across the entire journey.
                    </p>
                    <p className="mb-2">
                      The NIMA AI Brain identifies: where friction begins, where decision momentum stops, which message creates confusion, which offer lacks perceived value, where trust declines, where expectations break, where conversion probability drops.
                    </p>
                    <p className="mb-2">
                      Then it produces: new funnel sequences, behavior-aligned messaging, optimized CTAs, frictionless navigation flow, psychological storytelling, multi-step funnel recommendations.
                    </p>
                    <p>
                      This is the equivalent of having: A senior strategist + CRO expert + behavioral psychologist working together — fully automated. No traditional team can match this speed or precision.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">7. Real Output Quality — What Makes the Engine Different</h4>
                    <p className="mb-2">
                      Your system produces outputs that feel: clean, strategic, emotionally intelligent, senior-level, high-trust, conversion-oriented.
                    </p>
                    <p className="mb-2">
                      Users notice the difference immediately: NO generic AI tone, NO robotic patterns, NO filler sentences, NO random structure, NO loss of identity.
                    </p>
                    <p>
                      Everything feels like: "Someone who deeply understands marketing, psychology, and business wrote this." And that is the competitive advantage that no template-based AI tool can replicate.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">8. Why These Use Cases Matter for SEO and Conversions</h4>
                    <p className="mb-2">
                      Use cases aren't just examples — they are ranking signals. Google now ranks pages based on: helpfulness, expertise, real-world relevance, demonstrated capability, user satisfaction, behavior metrics, E-E-A-T (Experience, Expertise, Authority, Trust).
                    </p>
                    <p className="mb-2">
                      This section boosts: conversion rate, credibility, dwell time, intent matching, trust, engagement depth.
                    </p>
                    <p>
                      It signals to Google: "This page is not theory; it is operational."
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Conclusion — Proof Wins</h3>
                <p>
                  People don't trust claims. They trust: precision, clarity, psychology, consistency, results. The NIMA AI Brain delivers all of them — not as a promise, but as evidence through real scenarios.
                </p>
                <p>
                  This section exists for one reason: To show the user (and Google) that your engine doesn't just generate content — it generates outcomes.
                </p>
              </div>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-black py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            FAQ — AI Marketing & NIMA AI Brain
          </h2>

          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Q1: What is AI Marketing in 2026–2027?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A: AI Marketing in 2026–2027 goes beyond simple automation. It combines machine intelligence, behavioral data, and predictive psychology to analyze user intent, remove friction, and optimize every step of the customer journey for real business outcomes.
              </p>
            </div>

            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Q2: How is the NIMA AI Brain different from generic AI tools?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A: Generic AI tools mostly generate text. The NIMA AI Brain works as a full marketing engine: it reads behavior, predicts reactions, builds strategy, generates high-impact content, detects cognitive friction, and keeps your brand voice consistent across channels.
              </p>
            </div>

            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Q3: Can the NIMA AI Brain replace a marketing team?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A: It doesn't replace your marketing team — it upgrades it. The NIMA AI Brain takes over repetitive, analytical, and testing-heavy work, so your team can focus on strategy, creativity, and higher-level decisions while the engine handles intelligence and optimization.
              </p>
            </div>

            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Q4: What kind of businesses can use the NIMA AI Brain?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A: Any business that relies on digital marketing can benefit — from SaaS and e-commerce to agencies, content brands, and service providers. The engine is especially powerful for brands that want to understand user behavior and improve conversion performance.
              </p>
            </div>

            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Q5: How does AI Marketing improve conversion rates?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A: AI Marketing improves conversions by understanding why users hesitate, where friction appears, and which messages create trust. The NIMA AI Brain then generates behavior-aligned copy, CTAs, and funnel flows that reduce confusion and increase momentum toward action.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Q6: Can the NIMA AI Brain work with my existing tools and platforms?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A: Yes. The engine is designed to sit above your current stack. It can work alongside tools like Google Ads, Meta, Hotjar, CRM systems, and automation platforms such as n8n, Make, or Zapier — acting as the strategic brain that connects everything together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is AI Marketing in 2026–2027?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI Marketing in 2026–2027 goes beyond simple automation. It combines machine intelligence, behavioral data, and predictive psychology to analyze user intent, remove friction, and optimize every step of the customer journey for real business outcomes."
                }
              },
              {
                "@type": "Question",
                "name": "How is the NIMA AI Brain different from generic AI tools?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Generic AI tools mostly generate text. The NIMA AI Brain works as a full marketing engine: it reads behavior, predicts reactions, builds strategy, generates high-impact content, detects cognitive friction, and keeps your brand voice consistent across channels."
                }
              },
              {
                "@type": "Question",
                "name": "Can the NIMA AI Brain replace a marketing team?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It doesn't replace your marketing team — it upgrades it. The NIMA AI Brain takes over repetitive, analytical, and testing-heavy work, so your team can focus on strategy, creativity, and higher-level decisions while the engine handles intelligence and optimization."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of businesses can use the NIMA AI Brain?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Any business that relies on digital marketing can benefit — from SaaS and e-commerce to agencies, content brands, and service providers. The engine is especially powerful for brands that want to understand user behavior and improve conversion performance."
                }
              },
              {
                "@type": "Question",
                "name": "How does AI Marketing improve conversion rates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI Marketing improves conversions by understanding why users hesitate, where friction appears, and which messages create trust. The NIMA AI Brain then generates behavior-aligned copy, CTAs, and funnel flows that reduce confusion and increase momentum toward action."
                }
              },
              {
                "@type": "Question",
                "name": "Can the NIMA AI Brain work with my existing tools and platforms?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The engine is designed to sit above your current stack. It can work alongside tools like Google Ads, Meta, Hotjar, CRM systems, and automation platforms such as n8n, Make, or Zapier — acting as the strategic brain that connects everything together."
                }
              }
            ]
          }, null, 2)
        }}
      />

      {/* Final CTA Section */}
      <section className="relative bg-black py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16 z-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 sm:p-12 backdrop-blur-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to See What a Real AI Marketing Engine Can Do?
            </h2>
            <p className="text-gray-400 mb-6 text-lg">
              Most AI tools give you more content. The NIMA AI Brain gives you clarity, strategy, and measurable growth.
            </p>
            
            <ul className="space-y-3 text-left max-w-2xl mx-auto mb-8 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Turn behavioral data into real decisions, not just dashboards.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Remove invisible friction from your funnels and landing pages.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Get senior-level copy, strategy, and testing — on demand.</span>
              </li>
            </ul>

            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Book Your AI Marketing Strategy Session</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Dev Badge - Variant A */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs text-gray-300 z-50">
          Variant A
        </div>
      )}
    </div>
  );
}

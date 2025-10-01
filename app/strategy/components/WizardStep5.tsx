'use client';

import { UseFormReturn } from 'react-hook-form';
import { WizardInput } from '@/app/types/strategy';
import { CheckCircle, Edit, Rocket } from 'lucide-react';

interface WizardStep5Props {
  form: UseFormReturn<WizardInput>;
  onBack: (step?: number) => void;
  isGenerating: boolean;
  generationStatus?: string;
}

export default function WizardStep5({ form, onBack, isGenerating, generationStatus }: WizardStep5Props) {
  const formData = form.watch();

  const sections = [
    {
      title: 'Business Basics',
      step: 1,
      data: {
        'Business Name': formData.businessName,
        'Industry': formData.industry,
        'Geography': formData.geo,
        'Monthly Budget': formData.budgetMonthly ? `$${formData.budgetMonthly}` : '',
        'Objectives': formData.objectives?.join(', '),
        'Value Proposition': formData.valueProposition,
      }
    },
    {
      title: 'Channels & Assets',
      step: 2,
      data: {
        'Website': formData.websiteUrl,
        'Email List Size': formData.emailListSize?.toString(),
        'Social Platforms': formData.activeSocials?.join(', '),
        'Ad Platforms': formData.adPlatforms?.join(', '),
        'Analytics Tools': formData.analyticsTools?.join(', '),
      }
    },
    {
      title: 'Audience & Competitors',
      step: 3,
      data: {
        'Primary Audience': formData.primaryAudience,
        'Secondary Audience': formData.secondaryAudience,
        'Competitors': formData.competitors,
        'Pricing Tier': formData.pricingTier,
        'Brand Tone': formData.brandTone,
      }
    },
    {
      title: 'Constraints & Timeframe',
      step: 4,
      data: {
        'Team Size': formData.teamSize,
        'Data Maturity': formData.dataMaturity,
        'Timeframe': formData.timeframeWeeks ? `${formData.timeframeWeeks} weeks` : '',
        'Creative Limitations': formData.creativeLimitations,
        'Content Types': formData.contentTypes?.join(', '),
      }
    }
  ];

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Review & Generate</h2>
        <p className="text-gray-400">Review your inputs and generate your AI marketing strategy</p>
      </div>

      {!isGenerating && (
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-black/20 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <button
                  type="button"
                  onClick={() => onBack(section.step - 1)}
                  className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(section.data).map(([key, value]) => (
                  value && (
                    <div key={key} className="space-y-1">
                      <div className="text-sm font-medium text-gray-400">{key}</div>
                      <div className="text-sm text-white">{value}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isGenerating && (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full mx-auto mb-6 animate-spin" />
          
          <h3 className="text-xl font-semibold text-white mb-4">
            🤖 Generating Your AI Marketing Strategy
          </h3>
          
          <div className="space-y-2 mb-8">
            <div className="text-teal-400 font-medium">{generationStatus || 'Analyzing your business...'}</div>
            <div className="text-gray-400 text-sm">This may take 30-60 seconds</div>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            {['Analyzing', 'Researching', 'Planning', 'Optimizing'].map((step, index) => (
              <div
                key={step}
                className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"
                style={{ animationDelay: `${index * 300}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {!isGenerating && (
        <div className="text-center">
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-gradient-to-r from-teal-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-teal-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Rocket className="w-5 h-5" />
            Generate My AI Marketing Strategy
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            This will create a comprehensive strategy with personas, content plan, campaigns, and 90-day roadmap
          </p>
        </div>
      )}
    </div>
  );
}

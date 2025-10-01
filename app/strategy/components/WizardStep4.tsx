'use client';

import { UseFormReturn } from 'react-hook-form';
import { WizardInput, CONTENT_TYPES } from '@/app/types/strategy';
import { Clock, Users, Brain, FileText } from 'lucide-react';

interface WizardStep4Props {
  form: UseFormReturn<WizardInput>;
}

export default function WizardStep4({ form }: WizardStep4Props) {
  const { register, formState: { errors }, watch, setValue } = form;
  const contentTypes = watch('contentTypes') || [];

  const toggleContentType = (contentType: string) => {
    const updated = contentTypes.includes(contentType)
      ? contentTypes.filter(c => c !== contentType)
      : [...contentTypes, contentType];
    setValue('contentTypes', updated);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <Clock className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Constraints & Timeframe</h2>
        <p className="text-gray-400">Let us know about your team, resources, and timeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Team Size & Roles *
          </label>
          <input
            {...register('teamSize')}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="e.g., 1 marketing person, or 5-person team with designer"
          />
          {errors.teamSize && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.teamSize.message}
            </p>
          )}
        </div>

        {/* Data Maturity */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Brain className="w-4 h-4 inline mr-1" />
            Data/AI Maturity Level *
          </label>
          <select
            {...register('dataMaturity')}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
          >
            <option value="">Select maturity level</option>
            <option value="low" className="bg-black">Low - Basic analytics, manual processes</option>
            <option value="mid" className="bg-black">Mid - Some automation, decent data collection</option>
            <option value="high" className="bg-black">High - Advanced analytics, AI tools, data-driven</option>
          </select>
          {errors.dataMaturity && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.dataMaturity.message}
            </p>
          )}
        </div>

        {/* Timeframe */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Strategy Timeframe (weeks) *
          </label>
          <input
            {...register('timeframeWeeks', { valueAsNumber: true })}
            type="number"
            min="1"
            max="52"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="e.g., 12"
          />
          {errors.timeframeWeeks && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.timeframeWeeks.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">How many weeks should this strategy cover?</p>
        </div>

        {/* Creative Limitations */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Creative Limitations (Optional)
          </label>
          <textarea
            {...register('creativeLimitations')}
            rows={3}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all resize-none"
            placeholder="Any constraints on content creation, brand guidelines, legal restrictions..."
          />
        </div>
      </div>

      {/* Content Types */}
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          <FileText className="w-4 h-4 inline mr-1" />
          Available Content Types
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CONTENT_TYPES.map((contentType) => (
            <button
              key={contentType}
              type="button"
              onClick={() => toggleContentType(contentType)}
              className={`p-3 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                contentTypes.includes(contentType)
                  ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                  : 'border-white/10 bg-black/20 text-gray-300 hover:border-white/20'
              }`}
            >
              <div className="text-sm font-medium">{contentType}</div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">What types of content can your team produce?</p>
      </div>
    </div>
  );
}

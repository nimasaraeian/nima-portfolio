'use client';

import { UseFormReturn } from 'react-hook-form';
import { WizardInput, BRAND_TONES } from '@/app/types/strategy';
import { Users, Zap, DollarSign } from 'lucide-react';

interface WizardStep3Props {
  form: UseFormReturn<WizardInput>;
}

export default function WizardStep3({ form }: WizardStep3Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Audience & Competitors</h2>
        <p className="text-gray-400">Help us understand your target market and competitive landscape</p>
      </div>

      {/* Persona Hint Card */}
      <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-6">
        <h3 className="text-teal-300 font-medium mb-2">💡 Persona Examples</h3>
        <p className="text-sm text-gray-300">
          "Young adults 20-35; minimal style; urban lifestyle" or 
          "Small business owners 30-50; efficiency-focused; tech-savvy"
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary Audience */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Primary Target Audience *
          </label>
          <textarea
            {...register('primaryAudience')}
            rows={3}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all resize-none"
            placeholder="Describe your ideal customers: demographics, interests, behaviors, pain points..."
          />
          {errors.primaryAudience && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.primaryAudience.message}
            </p>
          )}
        </div>

        {/* Secondary Audience */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Secondary Target Audience (Optional)
          </label>
          <textarea
            {...register('secondaryAudience')}
            rows={2}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all resize-none"
            placeholder="Any secondary audience segments worth targeting..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Competitors */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Zap className="w-4 h-4 inline mr-1" />
              Main Competitors *
            </label>
            <textarea
              {...register('competitors')}
              rows={3}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all resize-none"
              placeholder="List your main competitors (comma-separated) e.g., Nike, Adidas, Puma"
            />
            {errors.competitors && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.competitors.message}
              </p>
            )}
          </div>

          {/* Pricing Tier */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Pricing Tier *
            </label>
            <select
              {...register('pricingTier')}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            >
              <option value="">Select pricing tier</option>
              <option value="low" className="bg-black">Low-cost / Budget</option>
              <option value="mid" className="bg-black">Mid-range / Competitive</option>
              <option value="high" className="bg-black">Premium / Luxury</option>
            </select>
            {errors.pricingTier && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {errors.pricingTier.message}
              </p>
            )}
          </div>
        </div>

        {/* Brand Tone */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Brand Tone & Voice *
          </label>
          <select
            {...register('brandTone')}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
          >
            <option value="">Select your brand tone</option>
            {BRAND_TONES.map((tone) => (
              <option key={tone} value={tone} className="bg-black">
                {tone}
              </option>
            ))}
          </select>
          {errors.brandTone && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.brandTone.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">How your brand communicates with customers</p>
        </div>
      </div>
    </div>
  );
}

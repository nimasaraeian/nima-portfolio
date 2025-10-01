'use client';

import { UseFormReturn } from 'react-hook-form';
import { WizardInput, SOCIAL_PLATFORMS, AD_PLATFORMS, ANALYTICS_TOOLS } from '@/app/types/strategy';
import { Globe, Mail, Share2, Target, BarChart } from 'lucide-react';

interface WizardStep2Props {
  form: UseFormReturn<WizardInput>;
}

export default function WizardStep2({ form }: WizardStep2Props) {
  const { register, formState: { errors }, watch, setValue } = form;
  const activeSocials = watch('activeSocials') || [];
  const adPlatforms = watch('adPlatforms') || [];
  const analyticsTools = watch('analyticsTools') || [];

  const toggleArrayItem = (array: string[], item: string, fieldName: keyof WizardInput) => {
    const updated = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    setValue(fieldName, updated);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <Share2 className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Channels & Assets</h2>
        <p className="text-gray-400">What marketing channels and tools do you currently use?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website URL */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Website/Store URL
          </label>
          <input
            {...register('websiteUrl')}
            type="url"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="https://yourwebsite.com"
          />
          {errors.websiteUrl && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.websiteUrl.message}
            </p>
          )}
        </div>

        {/* Email List Size */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email List Size
          </label>
          <input
            {...register('emailListSize', { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="e.g., 5000"
          />
          <p className="mt-1 text-xs text-gray-500">Number of email subscribers</p>
        </div>
      </div>

      {/* Active Social Platforms */}
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          <Share2 className="w-4 h-4 inline mr-1" />
          Active Social Media Platforms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SOCIAL_PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => toggleArrayItem(activeSocials, platform, 'activeSocials')}
              className={`p-3 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                activeSocials.includes(platform)
                  ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                  : 'border-white/10 bg-black/20 text-gray-300 hover:border-white/20'
              }`}
            >
              <div className="text-sm font-medium">{platform}</div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">Select platforms where you have an active presence</p>
      </div>

      {/* Ad Platforms */}
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          <Target className="w-4 h-4 inline mr-1" />
          Advertising Platforms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AD_PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => toggleArrayItem(adPlatforms, platform, 'adPlatforms')}
              className={`p-3 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                adPlatforms.includes(platform)
                  ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                  : 'border-white/10 bg-black/20 text-gray-300 hover:border-white/20'
              }`}
            >
              <div className="text-sm font-medium">{platform}</div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">Platforms you currently use or plan to use for advertising</p>
      </div>

      {/* Analytics Tools */}
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          <BarChart className="w-4 h-4 inline mr-1" />
          Analytics & CRM Tools
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ANALYTICS_TOOLS.map((tool) => (
            <button
              key={tool}
              type="button"
              onClick={() => toggleArrayItem(analyticsTools, tool, 'analyticsTools')}
              className={`p-3 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                analyticsTools.includes(tool)
                  ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                  : 'border-white/10 bg-black/20 text-gray-300 hover:border-white/20'
              }`}
            >
              <div className="text-sm font-medium">{tool}</div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">Tools you use for tracking and customer relationship management</p>
      </div>
    </div>
  );
}

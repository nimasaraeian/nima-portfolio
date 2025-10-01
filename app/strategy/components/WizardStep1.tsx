'use client';

import { UseFormReturn } from 'react-hook-form';
import { WizardInput, INDUSTRIES, OBJECTIVES } from '@/app/types/strategy';
import { Target, Building, Globe, DollarSign } from 'lucide-react';

interface WizardStep1Props {
  form: UseFormReturn<WizardInput>;
}

export default function WizardStep1({ form }: WizardStep1Props) {
  const { register, formState: { errors }, watch, setValue } = form;
  const selectedObjectives = watch('objectives') || [];

  const toggleObjective = (objective: string) => {
    const current = selectedObjectives || [];
    const updated = current.includes(objective as any)
      ? current.filter(o => o !== objective)
      : [...current, objective as any];
    setValue('objectives', updated);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <Building className="w-12 h-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Business Basics</h2>
        <p className="text-gray-400">Tell us about your business fundamentals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Business Name *
          </label>
          <input
            {...register('businessName')}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="Enter your business name"
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Industry *
          </label>
          <select
            {...register('industry')}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
          >
            <option value="">Select your industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry} className="bg-black">
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.industry.message}
            </p>
          )}
        </div>

        {/* Geography */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Geography/Market *
          </label>
          <input
            {...register('geo')}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="e.g., Turkey/Istanbul, USA/California"
          />
          {errors.geo && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.geo.message}
            </p>
          )}
        </div>

        {/* Monthly Budget */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Monthly Marketing Budget (USD) *
          </label>
          <input
            {...register('budgetMonthly', { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
            placeholder="e.g., 1500"
          />
          {errors.budgetMonthly && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.budgetMonthly.message}
            </p>
          )}
        </div>

        {/* Value Proposition */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Unique Value Proposition *
          </label>
          <textarea
            {...register('valueProposition')}
            rows={3}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all resize-none"
            placeholder="What makes your business unique? How do you solve customer problems differently?"
          />
          {errors.valueProposition && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.valueProposition.message}
            </p>
          )}
        </div>
      </div>

      {/* Objectives */}
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          <Target className="w-4 h-4 inline mr-1" />
          Primary Objectives * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OBJECTIVES.map((objective) => (
            <button
              key={objective}
              type="button"
              onClick={() => toggleObjective(objective)}
              className={`p-4 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                selectedObjectives.includes(objective)
                  ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                  : 'border-white/10 bg-black/20 text-gray-300 hover:border-white/20'
              }`}
            >
              <div className="text-sm font-medium capitalize">{objective}</div>
            </button>
          ))}
        </div>
        {errors.objectives && (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {errors.objectives.message}
          </p>
        )}
      </div>
    </div>
  );
}

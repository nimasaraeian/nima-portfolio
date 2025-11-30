'use client';

import { useState } from 'react';
import { FileText, Target, Settings, Home, Megaphone, Mail, Smartphone, Briefcase, File, MousePointerClick, DollarSign, MessageSquare, Brain, AlertTriangle, Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface MultiStepInputPanelProps {
  formData: {
    raw_text: string;
    platform: string;
    goal: string[];
    audience: string;
    language: string;
    audienceType?: string;
    tonePreference?: string;
  };
  showAdvanced: boolean;
  metaJson: string;
  loading: boolean;
  error: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
  onGoalChange: (goal: string) => void;
  onAdvancedToggle: () => void;
  onMetaJsonChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PLATFORM_OPTIONS = [
  { value: 'landing_page', label: 'Landing Page', Icon: Home, color: 'blue' },
  { value: 'ad', label: 'Ad', Icon: Megaphone, color: 'purple' },
  { value: 'email', label: 'Email', Icon: Mail, color: 'green' },
  { value: 'instagram', label: 'Social', Icon: Smartphone, color: 'pink' },
  { value: 'linkedin', label: 'LinkedIn', Icon: Briefcase, color: 'indigo' },
  { value: 'other', label: 'Other', Icon: File, color: 'gray' },
];

const GOAL_OPTIONS = [
  { value: 'clicks', label: 'Clicks', Icon: MousePointerClick, color: 'purple' },
  { value: 'leads', label: 'Leads', Icon: Target, color: 'blue' },
  { value: 'sales', label: 'Sales', Icon: DollarSign, color: 'green' },
  { value: 'engagement', label: 'Engagement', Icon: MessageSquare, color: 'pink' },
];

const AUDIENCE_OPTIONS = [
  { value: 'cold', label: 'Cold', description: 'New visitors', gradient: 'from-slate-600 to-slate-700' },
  { value: 'warm', label: 'Warm', description: 'Returning users', gradient: 'from-blue-600 to-indigo-600' },
  { value: 'retargeting', label: 'Hot', description: 'Ready to convert', gradient: 'from-purple-600 to-pink-600' },
];

export default function MultiStepInputPanel({
  formData,
  showAdvanced,
  metaJson,
  loading,
  error,
  onInputChange,
  onGoalChange,
  onAdvancedToggle,
  onMetaJsonChange,
  onSubmit,
}: MultiStepInputPanelProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, label: 'Content & Platform', Icon: FileText },
    { number: 2, label: 'Goals & Audience', Icon: Target },
    { number: 3, label: 'Advanced', Icon: Settings },
  ];

  const getCharacterCount = () => formData.raw_text.length;
  const getWordCount = () => formData.raw_text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 rounded-2xl sm:rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="relative z-10">
        {/* Progress Indicator - Modern AI Style - Left, Center, Right */}
        <div className="mb-6 sm:mb-10">
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <div className="relative mb-2 sm:mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.number)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 transform ${
                      currentStep === step.number
                        ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50 scale-110'
                        : currentStep > step.number
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md scale-100'
                        : 'bg-slate-800/50 text-slate-500 border-2 border-slate-700/50 scale-100'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <step.Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    {currentStep === step.number && (
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                    )}
                  </button>
                  {currentStep === step.number && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg sm:rounded-xl blur opacity-75 animate-pulse"></div>
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-semibold transition-colors text-center px-1 ${
                    currentStep === step.number
                      ? 'text-white'
                      : currentStep > step.number
                      ? 'text-green-400'
                      : 'text-slate-500'
                  }`}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.number}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
          {/* Step 1: Content & Platform */}
          {currentStep === 1 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              {/* Content Textarea */}
              <div className="relative group">
                <label htmlFor="raw_text" className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4">
                  Content to Analyze <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="raw_text"
                    name="raw_text"
                    value={formData.raw_text}
                    onChange={onInputChange}
                    placeholder="Paste your marketing copy here..."
                    required
                    className="w-full rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 text-sm text-white placeholder-slate-500/70 focus:border-purple-500/50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/20 transition-all min-h-[140px] sm:min-h-[160px] resize-y shadow-xl group-hover:border-purple-500/30"
                  />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-2 sm:mt-3 px-2">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs">
                    <span className="text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      {getWordCount()} words
                    </span>
                    <span className="text-slate-400">{getCharacterCount()} chars</span>
                  </div>
                  {getWordCount() < 20 && (
                    <span className="text-xs text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="hidden sm:inline">Minimum 20 words recommended</span>
                      <span className="sm:hidden">Min 20 words</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 text-center">
                  Platform Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 max-w-4xl mx-auto">
                  {PLATFORM_OPTIONS.map((platform) => {
                    const IconComponent = platform.Icon;
                    const isSelected = formData.platform === platform.value;
                    const colorClasses = {
                      blue: isSelected ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-xl shadow-blue-500/30' : '',
                      purple: isSelected ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-xl shadow-purple-500/30' : '',
                      green: isSelected ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-600/10 shadow-xl shadow-green-500/30' : '',
                      pink: isSelected ? 'border-pink-500/50 bg-gradient-to-br from-pink-500/20 to-pink-600/10 shadow-xl shadow-pink-500/30' : '',
                      indigo: isSelected ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 shadow-xl shadow-indigo-500/30' : '',
                      gray: isSelected ? 'border-gray-500/50 bg-gradient-to-br from-gray-500/20 to-gray-600/10 shadow-xl shadow-gray-500/30' : '',
                    };
                    const glowClasses = {
                      blue: 'from-blue-600 to-blue-500',
                      purple: 'from-purple-600 to-purple-500',
                      green: 'from-green-600 to-green-500',
                      pink: 'from-pink-600 to-pink-500',
                      indigo: 'from-indigo-600 to-indigo-500',
                      gray: 'from-gray-600 to-gray-500',
                    };
                    return (
                      <label
                        key={platform.value}
                        className={`group relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-300 transform ${
                          isSelected
                            ? `${colorClasses[platform.color as keyof typeof colorClasses]} scale-105`
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-purple-500/30 hover:bg-slate-800/50 hover:scale-102'
                        }`}
                      >
                        <input
                          type="radio"
                          name="platform"
                          value={platform.value}
                          checked={isSelected}
                          onChange={(e) => {
                            const event = {
                              target: { name: 'platform', value: e.target.value },
                            } as React.ChangeEvent<HTMLSelectElement>;
                            onInputChange(event);
                          }}
                          className="sr-only"
                        />
                        <div className={`transform transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                          }`} />
                        </div>
                        <span className={`text-[10px] sm:text-xs font-semibold text-center transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                          {platform.label}
                        </span>
                        {isSelected && (
                          <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowClasses[platform.color as keyof typeof glowClasses]} rounded-xl sm:rounded-2xl blur opacity-50 animate-pulse`}></div>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-3 sm:gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Goals & Audience */}
          {currentStep === 2 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              {/* Goals */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 text-center">
                  Primary Goals
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
                  {GOAL_OPTIONS.map((goal) => {
                    const IconComponent = goal.Icon;
                    const isSelected = formData.goal.includes(goal.value);
                    const colorClasses = {
                      purple: isSelected ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-xl shadow-purple-500/30' : '',
                      blue: isSelected ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-xl shadow-blue-500/30' : '',
                      green: isSelected ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-600/10 shadow-xl shadow-green-500/30' : '',
                      pink: isSelected ? 'border-pink-500/50 bg-gradient-to-br from-pink-500/20 to-pink-600/10 shadow-xl shadow-pink-500/30' : '',
                    };
                    const glowClasses = {
                      purple: 'from-purple-600 to-purple-500',
                      blue: 'from-blue-600 to-blue-500',
                      green: 'from-green-600 to-green-500',
                      pink: 'from-pink-600 to-pink-500',
                    };
                    return (
                      <button
                        key={goal.value}
                        type="button"
                        onClick={() => onGoalChange(goal.value)}
                        className={`group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                          isSelected
                            ? `${colorClasses[goal.color as keyof typeof colorClasses]} scale-105`
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-purple-500/30 hover:bg-slate-800/50 hover:scale-102'
                        }`}
                      >
                        <div className={`transform transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                          }`} />
                        </div>
                        <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                          {goal.label}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </div>
                          </div>
                        )}
                        {isSelected && (
                          <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowClasses[goal.color as keyof typeof glowClasses]} rounded-xl sm:rounded-2xl blur opacity-50 animate-pulse`}></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Audience */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 text-center">
                  Audience Stage
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                  {AUDIENCE_OPTIONS.map((audience) => {
                    const isSelected = formData.audience === audience.value;
                    return (
                      <button
                        key={audience.value}
                        type="button"
                        onClick={() => {
                          const event = {
                            target: { name: 'audience', value: audience.value },
                          } as React.ChangeEvent<HTMLSelectElement>;
                          onInputChange(event);
                        }}
                        className={`flex-1 relative px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 text-sm font-semibold transition-all transform ${
                          isSelected
                            ? `bg-gradient-to-br ${audience.gradient} text-white shadow-xl scale-105 border-transparent`
                            : 'border-slate-700/50 bg-slate-800/30 text-slate-400 hover:border-purple-500/30 hover:bg-slate-800/50 hover:text-slate-300 hover:scale-102'
                        }`}
                      >
                        <div className="font-bold mb-1">{audience.label}</div>
                        <div className="text-xs font-normal opacity-80">{audience.description}</div>
                        {isSelected && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl blur opacity-50 animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-3 sm:gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 sm:px-6 py-3 rounded-xl border-2 border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 text-sm font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Advanced Settings */}
          {currentStep === 3 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
                <div>
                  <label htmlFor="language" className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 text-center md:text-left">
                    Content Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={onInputChange}
                    className="w-full rounded-xl border-2 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-5 py-3 sm:py-3.5 text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/20 transition-all shadow-lg"
                  >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                    <option value="fa">Persian</option>
                  </select>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={onAdvancedToggle}
                    className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 hover:from-purple-300 hover:to-cyan-300 transition-all text-center md:text-left"
                  >
                    Advanced Settings
                  </button>
                  {showAdvanced && (
                    <div className="space-y-3 p-4 sm:p-5 rounded-xl border-2 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
                      <p className="text-xs text-slate-400 mb-2">
                        Add custom metadata as JSON for advanced analysis parameters.
                      </p>
                      <textarea
                        value={metaJson}
                        onChange={(e) => onMetaJsonChange(e.target.value)}
                        placeholder='{"key": "value"}'
                        className="w-full rounded-lg border-2 border-slate-700/50 bg-slate-800/80 px-3 sm:px-4 py-2 sm:py-3 text-xs text-white placeholder-slate-500/70 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[100px] sm:min-h-[120px] resize-y font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-3 sm:gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 sm:px-6 py-3 rounded-xl border-2 border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 text-sm font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="rounded-xl border-2 border-red-500/30 bg-red-900/20 backdrop-blur-xl p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div className="text-sm text-red-200 font-medium">{error}</div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6 sm:pt-8 border-t border-slate-800/50">
            <button
              type="submit"
              disabled={loading || !formData.raw_text.trim()}
              className="w-full group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:via-purple-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all transform hover:scale-[1.02] active:scale-100 shadow-2xl shadow-purple-500/50 flex items-center justify-center gap-2 sm:gap-3"
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                  <span className="relative z-10 text-xs sm:text-sm">Analyzing Cognitive Friction...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10 text-xs sm:text-sm">Run Cognitive Friction Analysis</span>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 opacity-70 hidden sm:block" />
                </>
              )}
            </button>
            <p className="mt-3 sm:mt-4 text-xs text-center text-slate-400 leading-relaxed px-2">
              The AI will scan your content for <span className="text-purple-400 font-semibold">psychological friction</span> and <span className="text-cyan-400 font-semibold">decision barriers</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

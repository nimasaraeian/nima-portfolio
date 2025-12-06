'use client';

import { Target, Home, Megaphone, Mail, FileText, Gift, MessageSquare, MousePointerClick, DollarSign, Brain, AlertTriangle, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

type ContentType = 'landing' | 'social' | 'ads' | 'sales' | 'email' | 'lead_magnet' | 'engagement';

interface MultiStepInputPanelProps {
  formData: {
    raw_text: string;
    platform: string; // Keep for backward compatibility, but we'll use content_type
    goal: string[];
    audience: string;
    language: string;
    audienceType?: string;
    tonePreference?: string;
  };
  loading: boolean;
  error: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
  onGoalChange: (goal: string) => void;
  onImageChange?: (file: File | null) => void;
  selectedImage?: File | null;
  showImageUpload?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const CONTENT_TYPE_OPTIONS: Array<{ value: ContentType; label: string; Icon: any; color: string }> = [
  { value: 'landing', label: 'Landing', Icon: Home, color: 'blue' },
  { value: 'social', label: 'Social', Icon: MessageSquare, color: 'pink' },
  { value: 'ads', label: 'Ads', Icon: Megaphone, color: 'purple' },
  { value: 'sales', label: 'Sales Page', Icon: FileText, color: 'indigo' },
  { value: 'email', label: 'Email', Icon: Mail, color: 'green' },
  { value: 'lead_magnet', label: 'Lead Magnet', Icon: Gift, color: 'green' },
  { value: 'engagement', label: 'Engagement', Icon: MessageSquare, color: 'orange' },
];

// Goals based on content type
const getGoalsForContentType = (contentType: ContentType) => {
  const allGoals = [
    { value: 'clicks', label: 'Clicks', Icon: MousePointerClick, color: 'purple' },
    { value: 'leads', label: 'Leads', Icon: Target, color: 'blue' },
    { value: 'sales', label: 'Sales', Icon: DollarSign, color: 'green' },
    { value: 'engagement', label: 'Engagement', Icon: MessageSquare, color: 'pink' },
  ];

  // Customize goals based on content type
  switch (contentType) {
    case 'landing':
    case 'sales':
      return allGoals.filter(g => ['leads', 'sales', 'clicks'].includes(g.value));
    case 'ads':
      return allGoals.filter(g => ['clicks', 'leads', 'sales'].includes(g.value));
    case 'social':
    case 'engagement':
      return allGoals.filter(g => ['engagement', 'clicks', 'leads'].includes(g.value));
    case 'email':
      return allGoals.filter(g => ['leads', 'sales', 'engagement'].includes(g.value));
    case 'lead_magnet':
      return allGoals.filter(g => ['leads', 'engagement'].includes(g.value));
    default:
      return allGoals;
  }
};

const AUDIENCE_OPTIONS = [
  { value: 'cold', label: 'Cold', description: 'New visitors', gradient: 'from-slate-600 to-slate-700' },
  { value: 'warm', label: 'Warm', description: 'Returning users', gradient: 'from-blue-600 to-indigo-600' },
  { value: 'retargeting', label: 'Hot', description: 'Ready to convert', gradient: 'from-purple-600 to-pink-600' },
];

export default function MultiStepInputPanel({
  formData,
  loading,
  error,
  onInputChange,
  onGoalChange,
  onImageChange,
  selectedImage,
  showImageUpload = false,
  onSubmit,
}: MultiStepInputPanelProps) {
  const getCharacterCount = () => formData.raw_text.length;
  const getWordCount = () => formData.raw_text.trim().split(/\s+/).filter(Boolean).length;

  // Determine content type from platform (backward compatibility) or use a default
  const getContentType = (): ContentType => {
    const platformMap: Record<string, ContentType> = {
      'landing_page': 'landing',
      'social_media': 'social',
      'social_post': 'social',
      'ad': 'ads',
      'ads': 'ads',
      'sales_page': 'sales',
      'email': 'email',
      'lead_magnet': 'lead_magnet',
      'engagement': 'engagement',
    };
    return platformMap[formData.platform] || 'landing';
  };

  const currentContentType = getContentType();

  // Show audience stage only for Landing, Ads, Sales Page
  const showAudienceStage = ['landing', 'ads', 'sales'].includes(currentContentType);

  // Show image upload only for Landing, Social, Ads
  // Hide for Email, Sales Page, Lead Magnet, Engagement
  const showImageUploadField = ['landing', 'social', 'ads'].includes(currentContentType) && showImageUpload && onImageChange;

  // Get goals for current content type
  const availableGoals = getGoalsForContentType(currentContentType);

  const handleContentTypeChange = (contentType: ContentType) => {
    // Map content type to platform value for backward compatibility
    const platformMap: Record<ContentType, string> = {
      'landing': 'landing_page',
      'social': 'social_post',
      'ads': 'ad',
      'sales': 'sales_page',
      'email': 'email',
      'lead_magnet': 'lead_magnet',
      'engagement': 'engagement',
    };

    const event = {
      target: { name: 'platform', value: platformMap[contentType] },
    } as React.ChangeEvent<HTMLSelectElement>;
    onInputChange(event);
  };

  return (
    <div className="w-full relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 rounded-2xl sm:rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="relative z-10">
        <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8" noValidate>
          {/* (A) Content Type Tabs */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 text-center">
              Content Type
            </label>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {CONTENT_TYPE_OPTIONS.map((contentType) => {
                const IconComponent = contentType.Icon;
                const isSelected = currentContentType === contentType.value;
                const colorClasses = {
                  blue: isSelected ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-xl shadow-blue-500/30' : '',
                  purple: isSelected ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-xl shadow-purple-500/30' : '',
                  green: isSelected ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-600/10 shadow-xl shadow-green-500/30' : '',
                  pink: isSelected ? 'border-pink-500/50 bg-gradient-to-br from-pink-500/20 to-pink-600/10 shadow-xl shadow-pink-500/30' : '',
                  indigo: isSelected ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 shadow-xl shadow-indigo-500/30' : '',
                  orange: isSelected ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-orange-600/10 shadow-xl shadow-orange-500/30' : '',
                };
                const glowClasses = {
                  blue: 'from-blue-600 to-blue-500',
                  purple: 'from-purple-600 to-purple-500',
                  green: 'from-green-600 to-green-500',
                  pink: 'from-pink-600 to-pink-500',
                  indigo: 'from-indigo-600 to-indigo-500',
                  orange: 'from-orange-600 to-orange-500',
                };
                return (
                  <button
                    key={contentType.value}
                    type="button"
                    onClick={() => handleContentTypeChange(contentType.value)}
                    className={`group relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform ${
                      isSelected
                        ? `${colorClasses[contentType.color as keyof typeof colorClasses]} scale-105`
                        : 'border-slate-700/50 bg-slate-800/30 hover:border-purple-500/30 hover:bg-slate-800/50 hover:scale-102'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`} />
                    <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {contentType.label}
                    </span>
                    {isSelected && (
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowClasses[contentType.color as keyof typeof glowClasses]} rounded-xl sm:rounded-2xl blur opacity-50 animate-pulse`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* (B) Audience Stage (conditional) */}
          {showAudienceStage && (
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
          )}

          {/* (C) Goal Selection (dependent on content type) */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4 text-center">
              Primary Goals
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {availableGoals.map((goal) => {
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

          {/* (D) Input Content (text/image) */}
          <div className="relative group">
            <label htmlFor="raw_text" className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4">
              Content to Analyze {!selectedImage && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <textarea
                id="raw_text"
                name="raw_text"
                value={formData.raw_text}
                onChange={onInputChange}
                placeholder="Paste your marketing copy here... (or upload an image)"
                required={!selectedImage}
                className="w-full rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 text-sm text-white placeholder-slate-500/70 focus:border-purple-500/50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/20 transition-all min-h-[140px] sm:min-h-[160px] resize-y shadow-xl group-hover:border-purple-500/30 relative"
                style={{
                  backgroundImage: formData.raw_text.trim() === '' 
                    ? `radial-gradient(circle, rgba(148, 163, 184, 0.08) 1.2px, transparent 1.2px)`
                    : 'none',
                  backgroundSize: '24px 28px',
                  backgroundPosition: '12px 12px',
                }}
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

          {/* Image Upload Field - Conditional */}
          {showImageUploadField && (
            <div className="relative group">
              <label htmlFor="image_upload" className="block text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 sm:mb-4">
                {!formData.raw_text.trim() ? (
                  <>Upload Screenshot or Image <span className="text-red-400">*</span></>
                ) : (
                  <>Optional: Upload Screenshot or Image</>
                )}
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image_upload"
                  name="image_upload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onImageChange(file);
                  }}
                  className="w-full rounded-xl sm:rounded-2xl border-2 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/20 transition-all shadow-xl group-hover:border-purple-500/30"
                />
                {selectedImage && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                    <span>{selectedImage.name}</span>
                    <button
                      type="button"
                      onClick={() => onImageChange(null)}
                      className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Video support note for Engagement */}
          {currentContentType === 'engagement' && (
            <div className="rounded-xl border-2 border-orange-500/30 bg-orange-900/20 backdrop-blur-xl p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <div className="text-sm text-orange-200 font-medium">Video support coming soon</div>
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

          {/* (E) Analyze Button */}
          <div className="pt-6 sm:pt-8 border-t border-slate-800/50">
            <button
              type="submit"
              disabled={loading || (!formData.raw_text.trim() && !selectedImage)}
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

"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle, 
  TrendingDown, 
  ZapOff,
  CheckCircle2,
  Shield,
  Eye,
  Target,
  Zap,
  MessageSquare,
  Layout,
  Clock,
  type LucideIcon 
} from "lucide-react";

// Mapping config for primary_outcome constants
type OutcomeConfig = {
  icon: LucideIcon;
  color: {
    border: string;
    bg: string;
    text: string;
    gradient: string;
  };
  message: string;
  relatedScore?: 'trust' | 'clarity' | 'value' | 'relevance' | 'cognitive_load' | 'motivation' | 'risk_perception' | null;
};

const OUTCOME_CONFIG: Record<string, OutcomeConfig> = {
  TRUST_DEBT: {
    icon: ShieldAlert,
    color: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      text: "text-red-300",
      gradient: "from-red-500/20 to-red-600/10",
    },
    message: "Safety First",
    relatedScore: "trust",
  },
  RISK_DOMINANT: {
    icon: AlertTriangle,
    color: {
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
      text: "text-orange-300",
      gradient: "from-orange-500/20 to-orange-600/10",
    },
    message: "Reduce Anxiety",
    relatedScore: "risk_perception",
  },
  OUTCOME_UNCLEAR: {
    icon: HelpCircle,
    color: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      text: "text-yellow-300",
      gradient: "from-yellow-500/20 to-yellow-600/10",
    },
    message: "Clarify Value",
    relatedScore: "clarity",
  },
  VALUE_GAP: {
    icon: TrendingDown,
    color: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      text: "text-blue-300",
      gradient: "from-blue-500/20 to-blue-600/10",
    },
    message: "Boost Desire",
    relatedScore: "value",
  },
  COGNITIVE_OVERLOAD: {
    icon: ZapOff,
    color: {
      border: "border-purple-500/30",
      bg: "bg-purple-500/10",
      text: "text-purple-300",
      gradient: "from-purple-500/20 to-purple-600/10",
    },
    message: "Simplify UX",
    relatedScore: "cognitive_load",
  },
  FRICTION_FREE: {
    icon: CheckCircle2,
    color: {
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      text: "text-green-300",
      gradient: "from-green-500/20 to-emerald-600/10",
    },
    message: "Excellent Performance",
    relatedScore: undefined, // No specific score to highlight for success
  },
};

// Types for the API response
type DecisionDiagnosisResponse = {
  primary_outcome?: string;
  primary_confidence?: number;
  secondary_outcome?: string;
  secondary_confidence?: number;
  decision_stage?: string;
  context?: {
    business_type?: string;
    price_level?: string;
    decision_depth?: string;
    user_intent?: string;
    memory_summary?: string;
  };
  summary?: string;
  journey_insight?: string;
  what_to_fix_first?: string[];
  recommendations?: {
    message?: string[];
    structure?: string[];
    timing?: string[];
  } | string[] | Array<{
    action?: string;
    text?: string;
    impact?: string;
    category?: string;
    priority?: string;
    icon?: string;
  }>; // Support structured, simple array, and recommendation_engine format
  next_step?: string;
  // New fields
  page_type?: string;
  friction_scores?: {
    trust: number;
    clarity: number;
    value: number;
    relevance: number;
    cognitive_load: number;
    motivation: number;
    risk_perception: number;
  } | null;
  executive_summary?: string | null;
  visual_analysis?: {
    mood?: string;
    theme?: string;
    description?: string;
  } | null;
};

// Input form state
type FormData = {
  url: string;
  pageType: string;
  decisionQuestion: string;
  businessType: string;
  priceLevel: string;
  decisionDepth: string;
  userIntent: string;
  pageCopy: string;
  screenshot: File | null;
};

export default function DecisionBrainDashboard() {
  const [formData, setFormData] = useState<FormData>({
    url: "",
    pageType: "",
    decisionQuestion: "",
    businessType: "",
    priceLevel: "",
    decisionDepth: "",
    userIntent: "",
    pageCopy: "",
    screenshot: null,
  });

  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DecisionDiagnosisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, screenshot: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleRemoveScreenshot = () => {
    setFormData((prev) => ({ ...prev, screenshot: null }));
    setScreenshotPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDiagnosis(null);

    // این‌ها را با stateهای واقعی خودت replace کن:
    // screenshotFile: فایل اسکرین‌شات -> formData.screenshot
    // pageText: متن کپی‌شده از صفحه -> formData.pageCopy
    if (!formData.screenshot && !formData.pageCopy.trim()) {
      console.warn("No screenshot or text provided");
      setError("Please provide either page copy text or a screenshot for analysis.");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // 👇 اسم فیلد باید EXACTLY "image" باشد
      if (formData.screenshot) {
        formDataToSend.append("image", formData.screenshot);
      }

      // 👇 متن با نام "raw_text" ارسال شود
      if (formData.pageCopy && formData.pageCopy.trim().length > 0) {
        formDataToSend.append("raw_text", formData.pageCopy.trim());
      }

      const res = await fetch("/api/brain/decision-diagnosis", {
        method: "POST",
        body: formDataToSend, // ❗ هیچ headers: { "Content-Type": ... } نگذار
      });

      if (!res.ok) {
        let errorMessage = "Request failed";
        try {
          const text = await res.text();
          try {
            const errorData = JSON.parse(text);
            if (errorData.detail) {
              if (Array.isArray(errorData.detail)) {
                errorMessage = errorData.detail
                  .map((err: any) => {
                    if (typeof err === 'string') return err;
                    if (err.msg) return err.msg;
                    return String(err);
                  })
                  .join(', ');
              } else if (typeof errorData.detail === 'string') {
                errorMessage = errorData.detail;
              } else {
                errorMessage = String(errorData.detail);
              }
            } else if (errorData.error) {
              errorMessage = typeof errorData.error === 'string' 
                ? errorData.error 
                : String(errorData.error);
            } else {
              errorMessage = text || "Request failed";
            }
          } catch {
            errorMessage = text || "Request failed";
          }
        } catch {
          errorMessage = "Failed to analyze decision. Please try again.";
        }
        
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      const responseText = await res.text();
      console.log("DEBUG raw response text:", responseText.substring(0, 500));
      
      let data: DecisionDiagnosisResponse;
      try {
        data = JSON.parse(responseText) as DecisionDiagnosisResponse;
      } catch (parseError) {
        console.error("DEBUG Failed to parse JSON:", parseError);
        console.error("DEBUG Full response text:", responseText);
        setError(`Invalid response from server: ${responseText.substring(0, 200)}`);
        setIsLoading(false);
        return;
      }
      
      console.log("DEBUG decision-diagnosis response:", data);
      console.log("DEBUG response keys:", data ? Object.keys(data) : []);
      console.log("DEBUG primary_outcome:", data?.primary_outcome);
      console.log("DEBUG executive_decision_summary:", data?.executive_decision_summary);
      console.log("DEBUG executive_summary:", data?.executive_summary);
      console.log("DEBUG full response structure:", JSON.stringify(data, null, 2).substring(0, 1000));

      // اینجا همان state قبلیت که نتیجه را نگه می‌دارد آپدیت کن:
      setDiagnosis(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Decision diagnosis request failed:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze decision. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Decision Brain Dashboard</h1>
          <p className="text-gray-400">
            Analyze decision psychology and get actionable recommendations for your pages
          </p>
        </div>

        {/* Two-column layout: desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: InputPanel */}
          <div className="lg:w-96 lg:flex-shrink-0">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/pricing"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                  />
                </div>

                {/* Page Copy Input */}
                <div className="space-y-4">

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Paste Page Copy
                    </label>
                    <textarea
                      name="pageCopy"
                      value={formData.pageCopy}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Paste relevant page content here..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical text-white placeholder-gray-500"
                    />
                    {formData.url.trim() && !formData.pageCopy.trim() && (
                      <p className="text-xs text-yellow-400/80 mt-1">
                        💡 Tip: If URL scraping fails, paste the page content here manually for better results.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Upload Screenshot
                    </label>
                    {screenshotPreview ? (
                      <div className="relative">
                        <img
                          src={screenshotPreview}
                          alt="Screenshot preview"
                          className="w-full rounded-lg border border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg bg-slate-800/40 hover:border-indigo-500 cursor-pointer transition">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <svg
                            className="w-8 h-8 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm">Click to upload screenshot</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {isLoading ? "Analyzing decision..." : "Run Decision Diagnosis"}
                </button>

                {/* Error Display */}
                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="text-sm font-medium text-red-400 mb-2">Error</p>
                    <div className="text-sm text-red-300 whitespace-pre-wrap break-words">
                      {error.split('\n').map((line, index) => (
                        <p key={index} className={index > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right: DiagnosisPanel */}
          <div className="flex-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
              {isLoading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
                  <p className="text-gray-400">Analyzing decision...</p>
                </div>
              )}

              {!isLoading && !diagnosis && (
                <div className="text-center py-12 text-gray-400">
                  <p>Submit the form to see the decision diagnosis</p>
                </div>
              )}

              {!isLoading && diagnosis && (() => {
                const outcomeConfig = diagnosis.primary_outcome 
                  ? OUTCOME_CONFIG[diagnosis.primary_outcome] 
                  : null;
                const OutcomeIcon = outcomeConfig?.icon || HelpCircle;
                const defaultColors = {
                  border: "border-slate-800",
                  bg: "bg-slate-800/70",
                  text: "text-white",
                  gradient: "from-slate-800/70 to-slate-800/70",
                };
                const colors = outcomeConfig?.color || defaultColors;
                
                return (
                <div className="space-y-6">
                  {/* Executive Decision Summary */}
                  <div className={`border ${colors.border} rounded-xl bg-gradient-to-br ${colors.gradient} p-6 space-y-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {outcomeConfig && (
                          <OutcomeIcon className={`w-6 h-6 ${colors.text}`} />
                        )}
                        <h2 className={`text-xl font-semibold ${colors.text}`}>
                          {diagnosis.primary_outcome === "IDENTITY_MISMATCH" 
                            ? "Role ambiguity in the hero section" 
                            : diagnosis.primary_outcome === "FRICTION_FREE"
                            ? "✅ Success: Low Decision Friction"
                            : "Executive Decision Summary"}
                        </h2>
                      </div>
                      {outcomeConfig && (
                        <span className={`inline-flex items-center rounded-full border ${colors.border} ${colors.bg} px-3 py-1 text-xs font-medium ${colors.text}`}>
                          {outcomeConfig.message}
                        </span>
                      )}
                    </div>
                    
                    {/* Visual Analysis Badge */}
                    {diagnosis.visual_analysis && (
                      <div className="inline-flex items-center rounded-md border border-slate-700 bg-slate-700/50 px-3 py-1.5 text-xs text-gray-300">
                        <span className="font-medium mr-1">Visual Mood:</span>
                        {diagnosis.visual_analysis.mood && (
                          <span className="capitalize">{diagnosis.visual_analysis.mood}</span>
                        )}
                        {diagnosis.visual_analysis.theme && (
                          <span className="ml-1 text-gray-400">
                            ({diagnosis.visual_analysis.theme})
                          </span>
                        )}
                        {diagnosis.visual_analysis.description && (
                          <span className="ml-2 text-gray-400 italic">
                            {diagnosis.visual_analysis.description}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                            Primary Outcome
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {diagnosis.primary_outcome || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                            Confidence
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {diagnosis.primary_confidence != null && typeof diagnosis.primary_confidence === 'number'
                              ? `${(diagnosis.primary_confidence * 100).toFixed(0)}%`
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                            Decision Stage
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {diagnosis.decision_stage || "N/A"}
                          </p>
                        </div>
                      </div>
                      {/* Executive Summary - prioritize executive_summary from API */}
                      {diagnosis.executive_summary ? (
                        <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed bg-slate-700/40 rounded-md p-3 mt-2">
                          {diagnosis.executive_summary}
                        </pre>
                      ) : diagnosis.summary ? (
                        <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                          {diagnosis.summary}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No explanation provided by the model.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Behavioral Friction Scores */}
                  {diagnosis.friction_scores && (() => {
                    const outcomeConfig = diagnosis.primary_outcome 
                      ? OUTCOME_CONFIG[diagnosis.primary_outcome] 
                      : null;
                    const highlightedScore = outcomeConfig?.relatedScore;
                    
                    return (
                      <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-white">Behavioral Friction Scores</h2>
                        <p className="text-sm text-gray-400 mb-4">7 core friction dimensions (0-100 scale)</p>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(diagnosis.friction_scores).map(([key, value]) => {
                            const isHighlighted = highlightedScore === key;
                            const scoreValue = typeof value === 'number' ? value : 0;
                            const isHighScore = scoreValue >= 70; // Highlight if score is high (bad)
                            
                            // Determine styling based on outcome type
                            let borderClass = "border-slate-700";
                            let bgClass = "bg-slate-700/50";
                            let textClass = "text-gray-300";
                            let pulseClass = "";
                            
                            if (isHighlighted && outcomeConfig) {
                              if (isHighScore) {
                                // High score (bad) - use outcome color with pulse
                                if (diagnosis.primary_outcome === "TRUST_DEBT") {
                                  borderClass = "border-red-500/50";
                                  bgClass = "bg-red-500/20";
                                  textClass = "text-red-300";
                                  pulseClass = "animate-pulse";
                                } else if (diagnosis.primary_outcome === "RISK_DOMINANT") {
                                  borderClass = "border-orange-500/50";
                                  bgClass = "bg-orange-500/20";
                                  textClass = "text-orange-300";
                                  pulseClass = "animate-pulse";
                                } else if (diagnosis.primary_outcome === "OUTCOME_UNCLEAR") {
                                  borderClass = "border-yellow-500/50";
                                  bgClass = "bg-yellow-500/20";
                                  textClass = "text-yellow-300";
                                  pulseClass = "animate-pulse";
                                } else if (diagnosis.primary_outcome === "VALUE_GAP") {
                                  borderClass = "border-blue-500/50";
                                  bgClass = "bg-blue-500/20";
                                  textClass = "text-blue-300";
                                  pulseClass = "animate-pulse";
                                } else if (diagnosis.primary_outcome === "COGNITIVE_OVERLOAD") {
                                  borderClass = "border-purple-500/50";
                                  bgClass = "bg-purple-500/20";
                                  textClass = "text-purple-300";
                                  pulseClass = "animate-pulse";
                                }
                              } else {
                                // Low score (good) - just highlight with border
                                if (diagnosis.primary_outcome === "TRUST_DEBT") {
                                  borderClass = "border-red-500/30 border-2";
                                  bgClass = "bg-red-500/10";
                                  textClass = "text-red-300";
                                } else if (diagnosis.primary_outcome === "RISK_DOMINANT") {
                                  borderClass = "border-orange-500/30 border-2";
                                  bgClass = "bg-orange-500/10";
                                  textClass = "text-orange-300";
                                } else if (diagnosis.primary_outcome === "OUTCOME_UNCLEAR") {
                                  borderClass = "border-yellow-500/30 border-2";
                                  bgClass = "bg-yellow-500/10";
                                  textClass = "text-yellow-300";
                                } else if (diagnosis.primary_outcome === "VALUE_GAP") {
                                  borderClass = "border-blue-500/30 border-2";
                                  bgClass = "bg-blue-500/10";
                                  textClass = "text-blue-300";
                                } else if (diagnosis.primary_outcome === "COGNITIVE_OVERLOAD") {
                                  borderClass = "border-purple-500/30 border-2";
                                  bgClass = "bg-purple-500/10";
                                  textClass = "text-purple-300";
                                }
                              }
                            }
                            
                            return (
                              <div 
                                key={key} 
                                className={`flex items-center justify-between rounded-md border px-3 py-2 transition-all ${borderClass} ${bgClass} ${pulseClass}`}
                              >
                                <span className={`text-sm capitalize ${textClass} ${isHighlighted ? "font-semibold" : ""}`}>
                                  {key.replace(/_/g, " ")}
                                  {isHighlighted && (
                                    <span className="ml-2 text-xs">⚠️</span>
                                  )}
                                </span>
                                <span className={`text-sm font-semibold ${textClass}`}>
                                  {typeof value === 'number' ? value : 'N/A'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Context Snapshot */}
                  {diagnosis.context && (
                    <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                      <h2 className="text-xl font-semibold text-white">Context Snapshot</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 mb-1">Business Type</p>
                          <p className="text-white font-medium">{diagnosis.context.business_type || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Price Level</p>
                          <p className="text-white font-medium">{diagnosis.context.price_level || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Decision Depth</p>
                          <p className="text-white font-medium">{diagnosis.context.decision_depth || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">User Intent</p>
                          <p className="text-white font-medium">{diagnosis.context.user_intent || "N/A"}</p>
                        </div>
                      </div>
                      {diagnosis.context.memory_summary && (
                        <div className="pt-2 border-t border-slate-700">
                          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                            Memory Summary
                          </p>
                          <p className="text-sm text-gray-200">{diagnosis.context.memory_summary}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decision Failure Breakdown / Success Metrics */}
                  {(() => {
                    const isSuccess = diagnosis.primary_outcome === "FRICTION_FREE";
                    const successConfig = OUTCOME_CONFIG.FRICTION_FREE;
                    
                    return (
                      <div className={`border rounded-xl p-6 space-y-4 ${
                        isSuccess
                          ? `${successConfig.color.border} bg-gradient-to-br ${successConfig.color.gradient}`
                          : "border-slate-800 bg-slate-800/70"
                      }`}>
                        <div className="flex items-center gap-3">
                          {isSuccess && (
                            <successConfig.icon className={`w-6 h-6 ${successConfig.color.text}`} />
                          )}
                          <h2 className={`text-xl font-semibold ${
                            isSuccess ? successConfig.color.text : "text-white"
                          }`}>
                            {isSuccess ? "Success Metrics" : "Decision Failure Breakdown"}
                          </h2>
                        </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider text-gray-400">Primary Outcome</p>
                        <div className="bg-slate-700/80 rounded-lg px-4 py-3">
                          <p className="text-sm font-semibold text-white mb-1">
                            {diagnosis.primary_outcome || "N/A"}
                          </p>
                          <p className="text-xs text-gray-300">
                            Confidence: {diagnosis.primary_confidence != null && typeof diagnosis.primary_confidence === 'number'
                              ? `${(diagnosis.primary_confidence * 100).toFixed(0)}%`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      {diagnosis.secondary_outcome && (
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-wider text-gray-400">
                            Secondary Outcome
                          </p>
                          <div className="bg-slate-700/80 rounded-lg px-4 py-3">
                            <p className="text-sm font-semibold text-white mb-1">
                              {diagnosis.secondary_outcome}
                            </p>
                            <p className="text-xs text-gray-300">
                              Confidence:{" "}
                              {diagnosis.secondary_confidence
                                ? (diagnosis.secondary_confidence * 100).toFixed(0)
                                : "N/A"}
                              %
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                      </div>
                    );
                  })()}

                  {/* Decision Journey Insight */}
                  {diagnosis.journey_insight && (
                    <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                      <h2 className="text-xl font-semibold text-white">Decision Journey Insight</h2>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {diagnosis.journey_insight}
                      </p>
                      {diagnosis.primary_outcome === "IDENTITY_MISMATCH" && (
                        <p className="text-xs text-gray-400 italic mt-3 pt-3 border-t border-slate-700">
                          At the awareness stage, visitors don't judge your full CV. They only ask one question: 'Is this for someone like me?'. If the hero tries to serve too many roles at once, they hesitate instead of exploring further.
                        </p>
                      )}
                    </div>
                  )}

                  {/* What To Fix First / Growth Opportunities */}
                  {diagnosis.what_to_fix_first && diagnosis.what_to_fix_first.length > 0 && (() => {
                    const isSuccess = diagnosis.primary_outcome === "FRICTION_FREE";
                    const successConfig = OUTCOME_CONFIG.FRICTION_FREE;
                    
                    return (
                      <div className={`border rounded-xl p-6 space-y-4 ${
                        isSuccess
                          ? `${successConfig.color.border} bg-gradient-to-br ${successConfig.color.gradient}`
                          : diagnosis.primary_outcome === "IDENTITY_MISMATCH" 
                          ? "border-yellow-500/30 bg-yellow-500/5" 
                          : "border-slate-800 bg-slate-800/70"
                      }`}>
                        <div className="flex items-center gap-3">
                          {isSuccess && (
                            <successConfig.icon className={`w-5 h-5 ${successConfig.color.text}`} />
                          )}
                          <h2 className={`text-xl font-semibold ${
                            isSuccess ? successConfig.color.text : "text-white"
                          }`}>
                            {isSuccess ? "Growth Opportunities" : "What To Fix First"}
                          </h2>
                        </div>
                        <ul className="space-y-2">
                          {diagnosis.what_to_fix_first.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className={`mt-0.5 ${
                                isSuccess
                                  ? successConfig.color.text
                                  : diagnosis.primary_outcome === "IDENTITY_MISMATCH" 
                                  ? "text-yellow-400" 
                                  : "text-indigo-400"
                              }`}>
                                {isSuccess ? "✓" : "•"}
                              </span>
                              <p className={`text-sm flex-1 ${
                                isSuccess ? successConfig.color.text : "text-gray-200"
                              }`}>
                                {item}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}

                  {/* 🚀 Action Plan: Fix These First */}
                  {diagnosis.recommendations && (() => {
                    // Helper function to extract action verb and rest of text
                    const extractAction = (text: string): { verb: string; rest: string } => {
                      const actionVerbs = ['add', 'remove', 'change', 'update', 'improve', 'enhance', 'fix', 'replace', 'simplify', 'clarify', 'show', 'hide', 'highlight', 'emphasize', 'reduce', 'increase'];
                      const lowerText = text.toLowerCase();
                      for (const verb of actionVerbs) {
                        if (lowerText.startsWith(verb)) {
                          const verbLength = verb.length;
                          return {
                            verb: text.substring(0, verbLength),
                            rest: text.substring(verbLength).trim()
                          };
                        }
                      }
                      // If no action verb found, try to find first word
                      const firstSpace = text.indexOf(' ');
                      if (firstSpace > 0) {
                        return {
                          verb: text.substring(0, firstSpace),
                          rest: text.substring(firstSpace).trim()
                        };
                      }
                      return { verb: '', rest: text };
                    };

                    // Helper function to get icon based on category or text content
                    const getIcon = (rec: any): LucideIcon => {
                      const category = rec.category?.toLowerCase() || '';
                      const text = (rec.text || rec.action || '').toLowerCase();
                      
                      if (category.includes('trust') || text.includes('trust') || text.includes('guarantee') || text.includes('badge')) {
                        return Shield;
                      }
                      if (category.includes('clarity') || text.includes('clarity') || text.includes('clear') || text.includes('explain')) {
                        return Eye;
                      }
                      if (category.includes('value') || text.includes('value') || text.includes('benefit')) {
                        return Target;
                      }
                      if (category.includes('message') || text.includes('message') || text.includes('copy')) {
                        return MessageSquare;
                      }
                      if (category.includes('structure') || text.includes('layout') || text.includes('structure')) {
                        return Layout;
                      }
                      if (category.includes('timing') || text.includes('timing') || text.includes('flow')) {
                        return Clock;
                      }
                      if (text.includes('speed') || text.includes('fast') || text.includes('quick')) {
                        return Zap;
                      }
                      // Default icon
                      return Target;
                    };

                    // Helper function to get impact label
                    const getImpactLabel = (rec: any): string => {
                      if (rec.impact) return rec.impact;
                      
                      const text = (rec.text || rec.action || '').toLowerCase();
                      if (text.includes('trust')) return 'Trust ↑';
                      if (text.includes('clarity')) return 'Clarity ↑';
                      if (text.includes('value')) return 'Value ↑';
                      if (text.includes('conversion')) return 'Conversion ↑';
                      if (text.includes('engagement')) return 'Engagement ↑';
                      
                      return 'Impact: High';
                    };

                    // Normalize recommendations to a flat array
                    const normalizeRecommendations = (): Array<{ text: string; category?: string; impact?: string; priority?: string; icon?: string }> => {
                      const items: Array<{ text: string; category?: string; impact?: string; priority?: string; icon?: string }> = [];
                      
                      const recs = diagnosis.recommendations;
                      if (!recs) return items;
                      
                      if (Array.isArray(recs)) {
                        // Check if it's the new recommendation_engine format (object array)
                        if (recs.length > 0 && typeof recs[0] === 'object' && recs[0] !== null && ('action' in recs[0] || 'text' in recs[0])) {
                          return recs.map((rec: any) => ({
                            text: rec.action || rec.text || '',
                            category: rec.category,
                            impact: rec.impact,
                            priority: rec.priority,
                            icon: rec.icon
                          }));
                        }
                        // Simple string array
                        return recs.map((rec: any) => {
                          if (typeof rec === 'string') {
                            return { text: rec };
                          }
                          return { text: rec.action || rec.text || '' };
                        });
                      }
                      
                      // Structured format (object with message/structure/timing)
                      if (typeof recs === 'object' && 'message' in recs) {
                        const structured = recs as { message?: string[]; structure?: string[]; timing?: string[] };
                        if (structured.message) {
                          structured.message.forEach((rec: string) => {
                            items.push({ text: rec, category: 'message' });
                          });
                        }
                        if (structured.structure) {
                          structured.structure.forEach((rec: string) => {
                            items.push({ text: rec, category: 'structure' });
                          });
                        }
                        if (structured.timing) {
                          structured.timing.forEach((rec: string) => {
                            items.push({ text: rec, category: 'timing' });
                          });
                        }
                      }
                      
                      return items;
                    };

                    const normalizedRecs = normalizeRecommendations();
                    
                    if (normalizedRecs.length === 0) return null;

                    return (
                      <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-white">🚀 Action Plan: Fix These First</h2>
                        
                        <div className="space-y-3">
                          {normalizedRecs.map((rec, index) => {
                            const isFirst = index === 0;
                            const { verb, rest } = extractAction(rec.text);
                            const Icon = getIcon(rec);
                            const impactLabel = getImpactLabel(rec);
                            
                            return (
                              <div
                                key={index}
                                className={`rounded-lg border p-4 transition-all ${
                                  isFirst
                                    ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-2'
                                    : 'border-slate-700 bg-slate-700/30'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 ${isFirst ? 'text-orange-400' : 'text-slate-400'}`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        {isFirst && (
                                          <span className="inline-flex items-center rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 text-xs font-semibold text-orange-300 mb-2">
                                            🔥 High Priority
                                          </span>
                                        )}
                                        <p className="text-sm text-gray-200 leading-relaxed">
                                          {verb ? (
                                            <>
                                              <span className="font-bold text-white">{verb}</span>
                                              {rest && ` ${rest}`}
                                            </>
                                          ) : (
                                            rec.text
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-400 font-medium">
                                        {impactLabel}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Next Diagnostic Step */}
                  {diagnosis.next_step && (
                    <div className="border border-indigo-500/30 rounded-xl bg-indigo-500/10 p-6">
                      <h2 className="text-lg font-semibold text-indigo-300 mb-2">
                        Next Diagnostic Step
                      </h2>
                      <p className="text-sm text-gray-200">{diagnosis.next_step}</p>
                    </div>
                  )}
                </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


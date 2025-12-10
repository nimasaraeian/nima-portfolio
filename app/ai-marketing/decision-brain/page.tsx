"use client";

import React, { useState } from "react";
import { normalizePriceLevel, normalizeDecisionDepth, normalizeBusinessType } from "@/lib/decisionNormalizers";

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
  };
  next_step?: string;
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setDiagnosis(null);

    // Basic validation
    if (!formData.url.trim() && !formData.pageCopy.trim() && !formData.screenshot) {
      setError("Please provide either page copy text or a screenshot for analysis.");
      return;
    }

    if (!formData.pageType || !formData.decisionQuestion.trim()) {
      setError("Please fill in the page type and decision question.");
      return;
    }

    setIsLoading(true);

    try {
      // Normalize price_level, decision_depth, and business_type before sending
      const normalizedPriceLevel = normalizePriceLevel(formData.priceLevel);
      const normalizedDecisionDepth = normalizeDecisionDepth(formData.decisionDepth);
      const normalizedBusinessType = normalizeBusinessType(formData.businessType);
      
      // Prepare form data
      const payload = new FormData();
      payload.append("url", formData.url);
      payload.append("page_type", formData.pageType);
      payload.append("decision_question", formData.decisionQuestion);
      payload.append("business_type", normalizedBusinessType || "");
      payload.append("price_level", normalizedPriceLevel || "");
      payload.append("decision_depth", normalizedDecisionDepth || "");
      payload.append("user_intent", formData.userIntent || "");
      payload.append("page_copy", formData.pageCopy.trim() || "");

      if (formData.screenshot) {
        payload.append("screenshot", formData.screenshot);
      }

      // Log payload before sending
      const payloadForLog = {
        url: formData.url,
        pageType: formData.pageType,
        businessType: formData.businessType,
        priceLevel: formData.priceLevel,
        decisionDepth: formData.decisionDepth,
        userIntent: formData.userIntent,
        pageCopy: formData.pageCopy?.substring(0, 50) + '...',
        screenshotUrl: formData.screenshot ? '[file provided]' : null,
      };
      console.log("[CF FRONTEND] Payload sent to backend:", payloadForLog);

      const response = await fetch("/api/brain/decision-diagnosis", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        let errorMessage = "Request failed";
        try {
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            // Handle different error formats
            if (errorData.detail) {
              // If detail is an array (validation errors), format it
              if (Array.isArray(errorData.detail)) {
                errorMessage = errorData.detail
                  .map((err: any) => {
                    if (typeof err === 'string') return err;
                    if (err.msg) return err.msg;
                    return JSON.stringify(err);
                  })
                  .join(', ');
              } else if (typeof errorData.detail === 'string') {
                errorMessage = errorData.detail;
              } else {
                errorMessage = JSON.stringify(errorData.detail);
              }
            } else if (errorData.error) {
              errorMessage = typeof errorData.error === 'string' 
                ? errorData.error 
                : JSON.stringify(errorData.error);
            } else {
              errorMessage = text || "Request failed";
            }
          } catch {
            errorMessage = text || "Request failed";
          }
        } catch {
          errorMessage = "Failed to analyze decision. Please try again.";
        }
        
        // If it's a URL scraping error and pageCopy is empty, suggest adding pageCopy
        if (
          response.status === 400 && 
          (errorMessage.includes('Failed to scrape') || 
           errorMessage.includes('Failed to render URL') ||
           errorMessage.includes('Playwright')) &&
          !formData.pageCopy.trim()
        ) {
          errorMessage = `⚠️ Unable to automatically scrape the URL.\n\n${errorMessage}\n\n💡 Tip: Copy and paste the page content manually in the "Page Copy" field below for better results.`;
        }
        
        setError(errorMessage);
        return;
      }

      const data = (await response.json()) as DecisionDiagnosisResponse;
      console.log('[DecisionBrainDashboard] Received diagnosis data:', data);
      console.log('[DecisionBrainDashboard] Data structure:', {
        hasPrimaryOutcome: !!data.primary_outcome,
        hasPrimaryConfidence: data.primary_confidence != null,
        hasDecisionStage: !!data.decision_stage,
        hasContext: !!data.context,
        hasSummary: !!data.summary,
      });
      setDiagnosis(data);
    } catch (err: any) {
      console.error("[DecisionBrainDashboard] error:", err);
      // Ensure error is always a string
      const errorMsg = err?.message || err?.toString() || "Failed to analyze decision. Please try again.";
      setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    } finally {
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
                {/* Section A: Target Decision */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
                    Target Decision
                  </h2>

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

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Page Type
                    </label>
                    <select
                      name="pageType"
                      value={formData.pageType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="">Select page type</option>
                      <option value="Landing">Landing</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Product">Product</option>
                      <option value="Checkout">Checkout</option>
                      <option value="Info">Info</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      What decision should the user make on this page?
                    </label>
                    <textarea
                      name="decisionQuestion"
                      value={formData.decisionQuestion}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="e.g., Subscribe to premium plan, Book consultation, Purchase product..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Section B: Context */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
                    Context
                  </h2>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="">Select business type</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Ecommerce">Ecommerce</option>
                      <option value="Clinic">Clinic</option>
                      <option value="Service">Service</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Price Level
                    </label>
                    <select
                      name="priceLevel"
                      value={formData.priceLevel}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="">Select price level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Decision Depth
                    </label>
                    <select
                      name="decisionDepth"
                      value={formData.decisionDepth}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="">Select decision depth</option>
                      <option value="Impulse">Impulse</option>
                      <option value="Considered">Considered</option>
                      <option value="High-commitment">High-commitment</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      User Intent
                    </label>
                    <select
                      name="userIntent"
                      value={formData.userIntent}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="">Select user intent</option>
                      <option value="Learn">Learn</option>
                      <option value="Compare">Compare</option>
                      <option value="Validate">Validate</option>
                      <option value="Buy">Buy</option>
                    </select>
                  </div>
                </div>

                {/* Section C: Optional Input */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
                    Optional Input
                  </h2>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Paste Page Copy (optional)
                    </label>
                    <textarea
                      name="pageCopy"
                      value={formData.pageCopy}
                      onChange={handleInputChange}
                      rows={4}
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
                      Upload Screenshot (optional)
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

              {!isLoading && diagnosis && (
                <div className="space-y-6">
                  {/* Executive Decision Summary */}
                  <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-white">Executive Decision Summary</h2>
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
                      <p className="text-sm text-gray-200 leading-relaxed">{diagnosis.summary || "No summary available."}</p>
                    </div>
                  </div>

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

                  {/* Decision Failure Breakdown */}
                  <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-white">Decision Failure Breakdown</h2>
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

                  {/* Decision Journey Insight */}
                  {diagnosis.journey_insight && (
                    <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                      <h2 className="text-xl font-semibold text-white">Decision Journey Insight</h2>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {diagnosis.journey_insight}
                      </p>
                    </div>
                  )}

                  {/* What To Fix First */}
                  {diagnosis.what_to_fix_first && diagnosis.what_to_fix_first.length > 0 && (
                    <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-4">
                      <h2 className="text-xl font-semibold text-white">What To Fix First</h2>
                      <ul className="space-y-2">
                        {diagnosis.what_to_fix_first.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <p className="text-sm text-gray-200 flex-1">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actionable Recommendations */}
                  {diagnosis.recommendations && (
                    <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-6 space-y-6">
                      <h2 className="text-xl font-semibold text-white">Actionable Recommendations</h2>

                      {/* Message-level */}
                      {diagnosis.recommendations.message && diagnosis.recommendations.message.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                            Message-level
                          </h3>
                          <ul className="space-y-2">
                            {diagnosis.recommendations.message.map((rec, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-indigo-400 mt-0.5">•</span>
                                <p className="text-sm text-gray-200 flex-1">{rec}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Structure-level */}
                      {diagnosis.recommendations.structure && diagnosis.recommendations.structure.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                            Structure-level
                          </h3>
                          <ul className="space-y-2">
                            {diagnosis.recommendations.structure.map((rec, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-indigo-400 mt-0.5">•</span>
                                <p className="text-sm text-gray-200 flex-1">{rec}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Timing & flow */}
                      {diagnosis.recommendations.timing && diagnosis.recommendations.timing.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                            Timing & Flow
                          </h3>
                          <ul className="space-y-2">
                            {diagnosis.recommendations.timing.map((rec, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-indigo-400 mt-0.5">•</span>
                                <p className="text-sm text-gray-200 flex-1">{rec}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


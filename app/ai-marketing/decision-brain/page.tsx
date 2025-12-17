"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DecisionReport from "./DecisionReport";

// Normalized decision data structure
type NormalizedDecision = {
  // Decision Diagnosis
  primaryBlocker: {
    name: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  };
  primaryBlockerName: string;
  primaryBlockerSeverity: string;
  primaryBlockerFix: string;
  primaryBlockerEvidence: string;
  hesitationExplanation: string;
  decisionProbability: number; // 0-1
  modelConfidence: number; // 0-1
  visualTrustConfidence: number; // 0-1
  
  // Quick Wins
  quickWins: Array<{
    action: string;
    effort: string;
    liftRange: string;
    exampleCopy?: string;
  }>;
  
  // Evidence
  visualTrust: {
    label: string;
    confidence: number;
    narrative: string[];
  };
  notedElements: string[];
  keyLines: string[];
  
  // Trust & Risk Gaps
  missingTrustSignals: Array<{
    signal: string;
    suggestion: string;
  }>;
  
  // Legacy fields for backward compatibility
  primary_outcome?: string;
  executive_summary?: string;
  friction_scores?: Record<string, number>;
};

// Normalize decision data from backend response
// This function converts the backend API response into a normalized format for UI rendering
function normalizeDecision(data: DecisionDiagnosisResponse): NormalizedDecision {
  // Extract primary blocker from objects array
  const blockers = Array.isArray(data.brain?.keyDecisionBlockers) 
    ? data.brain.keyDecisionBlockers 
    : [];
  const primary = blockers[0] || data.brain?.primaryBlocker || null;
  
  // Extract string fields from blocker object
  const primaryBlockerName = (primary && typeof primary === "object" && "name" in primary && typeof primary.name === "string")
    ? primary.name 
    : (typeof primary === "string" 
        ? primary 
        : (data.primary_outcome || "unknown_blocker"));
  
  const primaryBlockerSeverity = (primary && typeof primary === "object" && "severity" in primary && typeof primary.severity === "string")
    ? primary.severity 
    : (data.primary_outcome === "TRUST_DEBT" || data.primary_outcome === "RISK_DOMINANT" 
        ? "high" 
        : data.primary_outcome === "FRICTION_FREE" 
        ? "low" 
        : "medium");
  
  const primaryBlockerFix = (primary && typeof primary === "object" && "fix" in primary && typeof primary.fix === "string")
    ? primary.fix 
    : "";
  
  const primaryBlockerEvidence = (primary && typeof primary === "object" && "evidence" in primary && Array.isArray(primary.evidence))
    ? primary.evidence.join(" | ") 
    : (primary && typeof primary === "object" && "evidence" in primary && typeof primary.evidence === "string" ? primary.evidence : "");
  
  // Generate hesitation explanation using name + evidence
  const hesitationExplanation = data.brain?.hesitationExplanation || 
                                data.executive_summary || 
                                data.summary || 
                                (primaryBlockerEvidence
                                  ? `Users are hesitating because: ${primaryBlockerEvidence}.`
                                  : `Users are hesitating due to: ${primaryBlockerName}.`);
  
  // Extract decision probability and confidence
  const decisionProbability = data.brain?.decisionProbability ?? 
                             (data.primary_confidence != null ? data.primary_confidence : 0.5);
  const modelConfidence = data.brain?.modelConfidence ?? 
                          (data.primary_confidence != null ? data.primary_confidence : 0.7);
  
  // Extract visual trust confidence separately
  const visualTrustConfidence = data.visualTrust?.confidence ?? 0.7;
  
  // Extract quick wins
  const quickWins: NormalizedDecision['quickWins'] = [];
  if (data.recommendedQuickWins && Array.isArray(data.recommendedQuickWins)) {
    data.recommendedQuickWins.slice(0, 3).forEach((win, index) => {
      if (typeof win === 'string') {
        // Heuristic: estimate effort and lift based on action type
        const lowerWin = win.toLowerCase();
        let effort = "30 min";
        let liftRange = "5-10%";
        
        if (lowerWin.includes('add') || lowerWin.includes('include')) {
          effort = "10 min";
          liftRange = "3-7%";
        } else if (lowerWin.includes('change') || lowerWin.includes('update')) {
          effort = "20 min";
          liftRange = "5-12%";
        } else if (lowerWin.includes('remove') || lowerWin.includes('simplify')) {
          effort = "15 min";
          liftRange = "4-9%";
        }
        
        quickWins.push({
          action: win,
          effort,
          liftRange,
        });
      } else if (typeof win === 'object' && win !== null) {
        quickWins.push({
          action: win.action || win.text || "Improve element",
          effort: win.effort || "20 min",
          liftRange: win.liftRange || "5-10%",
          exampleCopy: win.exampleCopy,
        });
      }
    });
  } else if (data.what_to_fix_first && Array.isArray(data.what_to_fix_first)) {
    data.what_to_fix_first.slice(0, 3).forEach((fix) => {
      if (typeof fix === 'string') {
        const lowerFix = fix.toLowerCase();
        let effort = "30 min";
        let liftRange = "5-10%";
        
        if (lowerFix.includes('add') || lowerFix.includes('include')) {
          effort = "10 min";
          liftRange = "3-7%";
        } else if (lowerFix.includes('change') || lowerFix.includes('update')) {
          effort = "20 min";
          liftRange = "5-12%";
        }
        
        quickWins.push({
          action: fix,
          effort,
          liftRange,
        });
      }
    });
  }
  
  // Extract visual trust
  const visualTrust = {
    label: data.visualTrust?.label || 
           (data.visual_analysis?.mood ? `${data.visual_analysis.mood} trust` : "Medium trust"),
    confidence: data.visualTrust?.confidence ?? 0.7,
    narrative: data.visualTrust?.narrative || 
               (data.visual_analysis?.description ? [data.visual_analysis.description] : []),
  };
  
  // Extract noted elements and key lines
  const notedElements = data.features?.visual?.noted_elements || [];
  const keyLines = data.features?.text?.key_lines || [];
  
  // Infer missing trust signals
  const missingTrustSignals: NormalizedDecision['missingTrustSignals'] = [];
  // Convert blockers to strings for trust signal checking
  const blockerStrings: string[] = Array.isArray(blockers) 
    ? blockers
        .map(b => {
          if (typeof b === 'string') return b;
          if (typeof b === 'object' && b !== null && 'name' in b) {
            // If it's a blocker object, use the name
            return typeof b.name === 'string' ? b.name : String(b.name || '');
          }
          if (b == null || b === undefined) return '';
          try {
            return String(b);
          } catch {
            return '';
          }
        })
        .filter((b): b is string => typeof b === 'string' && b.length > 0)
    : [];
  const hasPricing = data.features?.visual?.has_pricing ?? false;
  const hasTestimonials = data.features?.visual?.has_testimonials ?? false;
  const hasLogos = data.features?.visual?.has_logos ?? false;
  
  // Check if any blocker mentions trust or credibility (all blockers are now guaranteed to be strings)
  const hasTrustIssue = blockerStrings.length > 0 && blockerStrings.some(b => {
    try {
      const lower = b.toLowerCase();
      return lower.includes('trust') || lower.includes('credibility');
    } catch {
      return false;
    }
  });
  
  if (hasTrustIssue) {
    if (!hasPricing) {
      missingTrustSignals.push({
        signal: "Pricing transparency",
        suggestion: "Add clear pricing information to reduce uncertainty and build trust",
      });
    }
    if (!hasTestimonials) {
      missingTrustSignals.push({
        signal: "Social proof",
        suggestion: "Include customer testimonials or case studies to demonstrate credibility",
      });
    }
    if (!hasLogos) {
      missingTrustSignals.push({
        signal: "Brand recognition",
        suggestion: "Display partner logos, certifications, or trust badges",
      });
    }
  }
  
  return {
    primaryBlocker: {
      name: primaryBlockerName,
      severity: primaryBlockerSeverity as 'low' | 'medium' | 'high' | 'critical',
    },
    primaryBlockerName,
    primaryBlockerSeverity,
    primaryBlockerFix,
    primaryBlockerEvidence,
    hesitationExplanation,
    decisionProbability,
    modelConfidence,
    visualTrustConfidence,
    quickWins,
    visualTrust,
    notedElements,
    keyLines,
    missingTrustSignals,
    // Preserve legacy fields
    primary_outcome: data.primary_outcome,
    executive_summary: data.executive_summary || data.executive_decision_summary || undefined,
    friction_scores: data.friction_scores || undefined,
  };
}

// Types for the API response - supports both old and new formats
type DecisionDiagnosisResponse = {
  // Legacy fields (for backward compatibility)
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
  }>;
  next_step?: string;
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
  executive_decision_summary?: string | null;
  visual_analysis?: {
    mood?: string;
    theme?: string;
    description?: string;
  } | null;
  
  // New structured format
  brain?: {
    keyDecisionBlockers?: Array<{
      name?: string;
      severity?: string;
      evidence?: string[] | string;
      fix?: string;
    }> | string[];
    decisionProbability?: number;
    modelConfidence?: number;
    confidence?: number;
    primaryBlocker?: {
      name?: string;
      severity?: 'low' | 'medium' | 'high' | 'critical';
      evidence?: string[] | string;
      fix?: string;
    };
    hesitationExplanation?: string;
  };
  visualTrust?: {
    label?: string;
    confidence?: number;
    narrative?: string[];
  };
  features?: {
    visual?: {
      noted_elements?: string[];
      has_pricing?: boolean;
      has_testimonials?: boolean;
      has_logos?: boolean;
    };
    text?: {
      key_lines?: string[];
    };
  };
  recommendedQuickWins?: Array<{
    action?: string;
    text?: string;
    effort?: string;
    liftRange?: string;
    exampleCopy?: string;
  }> | string[];
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
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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

  const handleSubmit = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setError(null);
    setDiagnosis(null);

    // Validation: Allow submit if URL is provided OR pageCopy is provided
    if (!formData.url.trim() && !formData.pageCopy.trim()) {
      setError("Please provide a URL or paste page copy.");
      return;
    }

    setIsLoading(true);

    try {
      // Get FastAPI base URL from environment variable or use default
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
      
      // Build JSON payload - convert FormData to JSON
      const payload: Record<string, any> = {};

      // Add URL if provided
      if (formData.url.trim()) {
        payload.url = formData.url.trim();
      }

      // Add raw_text if provided
      if (formData.pageCopy.trim()) {
        payload.raw_text = formData.pageCopy.trim();
      }

      // Convert image to base64 if present
      if (formData.screenshot) {
        const imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            // Remove data URL prefix (e.g., "data:image/png;base64,")
            const base64String = result.split(',')[1] || result;
            resolve(base64String);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.screenshot!);
        });
        payload.image = imageBase64;
        payload.image_type = formData.screenshot.type || 'image/png';
      }

      // Call FastAPI directly - bypass Next.js API route
      let res: Response;
      try {
        res = await fetch(`${API_BASE}/analyze-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (fetchError) {
        // Handle network errors (server not running, CORS, etc.)
        console.error("Fetch error:", fetchError);
        const errorMsg = fetchError instanceof TypeError && fetchError.message.includes('fetch')
          ? `Cannot connect to API server at ${API_BASE}. Please make sure the FastAPI server is running on port 8000.`
          : `Network error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`;
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

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
            errorMessage = text || `Request failed with status ${res.status}`;
          }
        } catch {
          errorMessage = `Request failed with status ${res.status}. Please check if the API server is running and accessible.`;
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
              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
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

                {/* Run Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {isLoading ? "Analyzing decision..." : "Run"}
                </button>

                {/* Advanced inputs (optional) - Collapsible section */}
                <div className="border-t border-slate-700 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="w-full flex items-center justify-between text-sm font-medium text-gray-200 hover:text-white transition"
                  >
                    <span>Advanced inputs (optional)</span>
                    {isAdvancedOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {isAdvancedOpen && (
                    <div className="mt-4 space-y-4">
                      {/* Paste Page Copy */}
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
                      </div>

                      {/* Upload Screenshot */}
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
                  )}
                </div>

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
                  <p>Enter a URL and click Run to see the decision diagnosis</p>
                </div>
              )}

              {!isLoading && diagnosis && (() => {
                const normalized = normalizeDecision(diagnosis);
                return <DecisionReport normalized={normalized} raw={diagnosis} />;
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


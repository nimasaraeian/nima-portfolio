"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import DecisionVisualEvidence from "./DecisionVisualEvidence";
import { ScreenshotPreviewSectionWrapper, screenshotSrc } from "@/components/ScreenshotPreviewSection";

// Type definitions
type ScreenshotSet = {
  desktop_fold?: string;  // desktop above-the-fold (NOT full page)
  mobile_fold?: string;   // mobile above-the-fold
  desktop_full?: string;  // optional (only if available)
  mobile_full?: string;   // optional
};

type UXMetrics = {
  fcp_ms?: number;
  lcp_ms?: number;
  tti_ms?: number;
  tbt_ms?: number;
  cls?: number;
  speed_index?: number;
};

type DecisionSignals = {
  clarity?: "Low" | "Medium" | "High";
  trust?: "Low" | "Medium" | "High";
  friction?: "Low" | "Medium" | "High";
};

type HDRResponse = {
  report?: string;
  screenshots?: ScreenshotSet;
  uxMetrics?: UXMetrics;
  decisionSignals?: DecisionSignals;
  score?: number; // Only if real data from backend
};

// Helper functions
const hasAny = (obj?: Record<string, any>) =>
  !!obj && Object.values(obj).some((v) => v !== null && v !== undefined && v !== "");

// Metric formatters
const ms = (v?: number) => (typeof v === "number" ? `${(v / 1000).toFixed(1)}s` : "—");
const num = (v?: number) => (typeof v === "number" ? v.toString() : "—");
const cls = (v?: number) => (typeof v === "number" ? v.toFixed(2) : "—");

type FormData = {
  url: string;
};

// Evidence types (must match ScreenshotPreviewSection)
type DetectedElementType =
  | "cta"
  | "headline"
  | "pricing"
  | "testimonial"
  | "badge"
  | "logo"
  | "nav"
  | "form"
  | "input";

type DetectedElement = {
  id: string;
  type: DetectedElementType;
  text?: string | null;
  bbox: [number, number, number, number]; // x,y,w,h (image pixels)
  confidence: number; // 0..1
};

type EvidencePayload = {
  viewport: "desktop" | "mobile";
  image_size: [number, number]; // w,h of the screenshot image used for bbox
  detected_elements: DetectedElement[];
};

type Result = HDRResponse & {
  human_report?: string;
  analysis_json?: any;
  screenshot?: {
    url?: string;
    desktop?: string;
    mobile?: string;
  };
  screenshots?: ScreenshotSet & {
    hero?: string;
    full?: string;
    desktop?: string;
    mobile?: string;
  };
  evidence?: EvidencePayload | {
    desktop?: EvidencePayload;
    mobile?: EvidencePayload;
  };
  decisionSignals?: DecisionSignals & {
    clarity?: number;
    trust?: number;
    friction?: number;
  };
  uxMetrics?: UXMetrics;
  categories?: {
    social?: number;
    mobile?: number;
    onPage?: number;
    desktop?: number;
    backlinks?: number;
  };
  issues?: {
    ok?: number;
    warnings?: number;
    errors?: number;
  };
};

function formatReport(text?: string): string {
  if (!text) return "";
  return text.trim();
}

// Helper to convert relative URLs to absolute
const toAbsolute = (u: string | undefined): string => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
  return `${base}${u}`;
};

// Helper to extract screenshot URL from new schema (object) or old schema (string)
const getScreenshotUrl = (screenshot: any): string => {
  if (!screenshot) return "";
  // New schema: object with .url property
  if (typeof screenshot === "object" && screenshot !== null && screenshot.url) {
    return screenshot.url;
  }
  // Old schema: direct string (backward compatibility)
  if (typeof screenshot === "string") {
    return screenshot;
  }
  return "";
};

// Screenshot Tabs Component with Device Frames
function ScreenshotTabs({ screenshot }: { screenshot: { desktop?: string; mobile?: string; url?: string } }) {
  console.log("📥 ScreenshotTabs received:", screenshot);
  
  const desktopUrl = screenshot.desktop || screenshot.url;
  const mobileUrl = screenshot.mobile;
  
  const getScreenshotUrl = (url: string | undefined) => {
    if (!url) return "";
    return url.startsWith('data:') ? url : toAbsolute(url);
  };
  
  const desktopShotUrl = getScreenshotUrl(desktopUrl);
  const mobileShotUrl = getScreenshotUrl(mobileUrl);
  const hasDesktop = !!desktopShotUrl;
  const hasMobile = !!mobileShotUrl;
  
  console.log("📥 Screenshot URLs:", { 
    hasDesktop, 
    hasMobile,
    desktopUrl: desktopUrl?.substring(0, 50),
    mobileUrl: mobileUrl?.substring(0, 50),
    desktopShotUrl: desktopShotUrl?.substring(0, 50),
    mobileShotUrl: mobileShotUrl?.substring(0, 50)
  });
  
  if (!hasDesktop && !hasMobile) {
    console.log("⚠️ No screenshots available");
    return null;
  }
  
  return (
    <div className="mt-4 space-y-6">
      {/* Desktop Screenshot */}
      {hasDesktop && (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-3 text-sm font-medium opacity-90">Desktop View</span>
            </div>
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-4">
            {/* Monitor Frame */}
            <div className="mx-auto max-w-6xl">
              {/* Monitor Bezel */}
              <div className="bg-gray-700 rounded-t-lg p-2 shadow-2xl">
                {/* Screen */}
                <div className="bg-black rounded overflow-hidden shadow-inner">
                  <div className="bg-gray-900 h-8 flex items-center px-4 border-b border-gray-800">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-xs text-gray-500">https://example.com</div>
                    </div>
                  </div>
                  <img
                    src={desktopShotUrl}
                    alt="Desktop screenshot"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Monitor Stand */}
              <div className="flex justify-center">
                <div className="w-32 h-4 bg-gray-700 rounded-b-lg"></div>
              </div>
              <div className="flex justify-center -mt-1">
                <div className="w-48 h-2 bg-gray-600 rounded-b-lg"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Screenshot */}
      {hasMobile && (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium opacity-90">Mobile View</span>
            </div>
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex justify-center">
            {/* Phone Frame */}
            <div className="relative">
              {/* Phone Bezel */}
              <div className="bg-gray-800 rounded-[3rem] p-2 shadow-2xl">
                {/* Screen */}
                <div className="bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                  {/* Status Bar */}
                  <div className="bg-gray-900 h-8 flex items-center justify-between px-4 pt-1">
                    <div className="text-white text-xs font-medium">9:41</div>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 border border-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  <img
                    src={mobileShotUrl}
                    alt="Mobile screenshot"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DecisionBrainHumanUI() {
  const [formData, setFormData] = useState<FormData>({
    url: "",
  });

  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ url: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setCopySuccess(false);

    if (!formData.url.trim()) {
      setError("Please provide a URL.");
      return;
    }

    setIsLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
      
      let res: Response;
      try {
        res = await fetch(`${API_BASE}/api/analyze/url-human`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            url: formData.url.trim(), 
            goal: "leads", 
            locale: "en" 
          }),
        });
      } catch (fetchError) {
        // Handle network errors (server not running, CORS, etc.)
        console.error("Fetch error:", fetchError);
        let errorMsg = "Failed to connect to the API server.";
        
        if (fetchError instanceof TypeError) {
          if (fetchError.message.includes('fetch') || fetchError.message.includes('Failed to fetch')) {
            errorMsg = `Cannot connect to API server at ${API_BASE}.\n\nPossible causes:\n• The FastAPI server is not running\n• The server is running on a different port\n• CORS is blocking the request\n• Network connectivity issues\n\nPlease make sure the FastAPI server is running on port 8000.`;
          } else if (fetchError.message.includes('CORS')) {
            errorMsg = `CORS error: The API server at ${API_BASE} is blocking cross-origin requests. Please check the server's CORS configuration.`;
          } else {
            errorMsg = `Network error: ${fetchError.message}`;
          }
        } else if (fetchError instanceof Error) {
          errorMsg = `Network error: ${fetchError.message}`;
        } else {
          errorMsg = `Network error: ${String(fetchError)}`;
        }
        
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
            errorMessage = String(errorData.detail || errorData.error || text || "Request failed");
          } catch {
            errorMessage = String(text || `Request failed with status ${res.status}`);
          }
        } catch {
          errorMessage = `Request failed with status ${res.status}. Please check if the API server is running.`;
        }
        setError(String(errorMessage));
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      console.log("📥 API Response:", data);
      console.log("📥 Response keys:", Object.keys(data || {}));
      console.log("📥 human_report exists:", !!data?.human_report);
      console.log("📥 human_report length:", data?.human_report?.length || 0);
      console.log("📥 human_report preview:", data?.human_report?.substring(0, 100) || "NOT FOUND");
      console.log("📥 Screenshot data:", data?.screenshot);
      console.log("📥 Screenshots data:", data?.screenshots);
      console.log("📥 Screenshot keys:", data?.screenshot ? Object.keys(data.screenshot) : "no screenshot");
      console.log("📥 Screenshots keys:", data?.screenshots ? Object.keys(data.screenshots) : "no screenshots");
      console.log("📥 Desktop screenshot raw:", data?.screenshots?.desktop, data?.screenshots?.desktop_fold, data?.screenshots?.desktop_full, data?.screenshot?.desktop);
      console.log("📥 Mobile screenshot raw:", data?.screenshots?.mobile, data?.screenshots?.mobile_fold, data?.screenshots?.mobile_full, data?.screenshot?.mobile);
      
      // Extract screenshot URLs (supports new schema: object with .url property)
      const getScreenshotUrl = (screenshot: any): string => {
        if (!screenshot) return "";
        // New schema: object with .url property
        if (typeof screenshot === "object" && screenshot !== null && screenshot.url) {
          return screenshot.url;
        }
        // Old schema: direct string (backward compatibility)
        if (typeof screenshot === "string") {
          return screenshot;
        }
        return "";
      };
      
      // Check all possible screenshot paths (new schema first, then fallback to old)
      const desktopSrc = getScreenshotUrl(
        data?.screenshots?.desktop ||
        data?.screenshots?.desktop_fold ||
        data?.screenshots?.desktop_full ||
        data?.screenshot?.desktop ||
        ""
      );
      const mobileSrc = getScreenshotUrl(
        data?.screenshots?.mobile ||
        data?.screenshots?.mobile_fold ||
        data?.screenshots?.mobile_full ||
        data?.screenshot?.mobile ||
        ""
      );
      
      console.log("📥 Desktop source:", desktopSrc ? `${desktopSrc.substring(0, 50)}...` : "NOT FOUND");
      console.log("📥 Mobile source:", mobileSrc ? `${mobileSrc.substring(0, 50)}...` : "NOT FOUND");
      console.log("📥 Desktop length:", desktopSrc?.length || 0);
      console.log("📥 Mobile length:", mobileSrc?.length || 0);
      
      // Validate that we have a report
      if (!data?.human_report) {
        console.error("❌ No human_report in response!");
        console.error("❌ Full response:", JSON.stringify(data, null, 2));
        setError("The API response is missing the report. Please check the backend logs.");
        setIsLoading(false);
        return;
      }
      
      setResult(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Request failed:", err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'string'
        ? err
        : "Failed to analyze URL. Please try again.";
      setError(String(errorMessage));
      setIsLoading(false);
    }
  };

  const handleCopyReport = async () => {
    const report = formatReport(result?.human_report);
    if (report) {
      await navigator.clipboard.writeText(report);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const report = formatReport(result?.human_report);
  
  // Type for detected element types (must match ScreenshotPreviewSection)
  type DetectedElementType =
    | "cta"
    | "headline"
    | "pricing"
    | "testimonial"
    | "badge"
    | "logo"
    | "nav"
    | "form"
    | "input";
  
  // Extract active element types from report text based on keywords
  const getActiveTypes = (reportText: string): DetectedElementType[] => {
    if (!reportText) return [];
    const text = reportText.toLowerCase();
    const active: DetectedElementType[] = [];
    
    // Keyword mapping
    if (text.includes("cta") || text.includes("call to action") || text.includes("button")) {
      active.push("cta");
    }
    if (text.includes("headline") || text.includes("title") || text.includes("hero")) {
      active.push("headline");
    }
    if (text.includes("pricing") || text.includes("price") || text.includes("cost")) {
      active.push("pricing");
    }
    if (text.includes("testimonial") || text.includes("social proof") || text.includes("review") || text.includes("customer")) {
      active.push("testimonial");
      active.push("badge");
      active.push("logo");
    }
    if (text.includes("navigation") || text.includes("menu") || text.includes("nav") || text.includes("header")) {
      active.push("nav");
    }
    
    return active;
  };
  
  const activeTypes = useMemo(() => {
    return report ? getActiveTypes(report) : [];
  }, [report]);
  
  // Debug logging
  useEffect(() => {
    if (result) {
      console.log("📥 Result state updated:", {
        hasResult: !!result,
        hasHumanReport: !!result.human_report,
        reportLength: report.length,
        reportPreview: report.substring(0, 100),
        activeTypes
      });
    }
  }, [result, report, activeTypes]);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Human Decision Review
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Paste a URL. You'll get a human-readable conversion report — no scores, no dashboards.
          </p>
        </header>

        {/* INPUT */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                placeholder="Paste a page URL (homepage / landing page)"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
              {isLoading ? "Generating report..." : "Generate report"}
                  </button>

                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="text-sm font-medium text-red-400 mb-2">Error</p>
                    <div className="text-sm text-red-300 whitespace-pre-wrap break-words">
                  {typeof error === 'string' 
                    ? error.split('\n').map((line, index) => (
                        <p key={index} className={index > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))
                    : <p>{String(error)}</p>
                  }
                    </div>
                  </div>
                )}
              </form>
            </div>

        {/* OUTPUT */}
        <div className="mt-8">
          {isLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
              <p className="text-sm text-white/70">Reviewing your page...</p>
            </div>
          ) : !result ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              Run an analysis to get a readable report here.
          </div>
          ) : (
            <>
              {/* Decision Visual Evidence Dashboard */}
              <DecisionVisualEvidence
                screenshots={{
                  hero: result?.screenshots?.hero,
                  full: result?.screenshots?.full,
                  desktop: result?.screenshot?.desktop || result?.screenshots?.desktop || result?.screenshot?.url,
                  mobile: result?.screenshot?.mobile || result?.screenshots?.mobile || result?.screenshot?.url,
                  desktop_fold: result?.screenshots?.desktop_fold,
                  mobile_fold: result?.screenshots?.mobile_fold,
                  desktop_full: result?.screenshots?.desktop_full,
                  mobile_full: result?.screenshots?.mobile_full,
                }}
                signals={{
                  clarity: result?.decisionSignals?.clarity,
                  trust: result?.decisionSignals?.trust,
                  friction: result?.decisionSignals?.friction,
                }}
                categories={result?.categories}
                score={result?.score}
                issues={result?.issues}
                uxMetrics={result?.uxMetrics}
              />

              {/* Screenshot Preview Section - Desktop + Mobile (MANDATORY) */}
              {(() => {
                // Extract screenshot data - ensure desktop gets desktop, mobile gets mobile (no mixing)
                // Priority: screenshots.desktop/mobile > screenshots.desktop_fold/mobile_fold > screenshots.desktop_full/mobile_full > screenshot.desktop/mobile (legacy)
                const desktopShot = result?.screenshots?.desktop ||
                                  result?.screenshots?.desktop_fold ||
                                  result?.screenshots?.desktop_full ||
                                  result?.screenshot?.desktop;
                
                const mobileShot = result?.screenshots?.mobile ||
                                 result?.screenshots?.mobile_fold ||
                                 result?.screenshots?.mobile_full ||
                                 result?.screenshot?.mobile;
                
                // Debug logging
                console.log("[screenshots-extract]", {
                  "result.screenshots": result?.screenshots,
                  "result.screenshot": result?.screenshot,
                  desktopShot,
                  mobileShot,
                  "desktop-src": desktopShot ? screenshotSrc(desktopShot) : "MISSING",
                  "mobile-src": mobileShot ? screenshotSrc(mobileShot) : "MISSING"
                });
                
                // Extract evidence payloads (support both single evidence and separate desktop/mobile)
                const desktopEvidence = result?.evidence?.desktop || 
                                      (result?.evidence?.viewport === "desktop" ? result?.evidence : undefined);
                const mobileEvidence = result?.evidence?.mobile || 
                                     (result?.evidence?.viewport === "mobile" ? result?.evidence : undefined);
                
                // Get status and error from new schema
                const desktopStatus = typeof desktopShot === "object" && desktopShot?.status 
                  ? desktopShot.status 
                  : (desktopShot ? "ok" : "error");
                const mobileStatus = typeof mobileShot === "object" && mobileShot?.status 
                  ? mobileShot.status 
                  : (mobileShot ? "ok" : "error");
                const desktopError = typeof desktopShot === "object" && desktopShot?.error 
                  ? desktopShot.error 
                  : undefined;
                
                return (
                  <ScreenshotPreviewSectionWrapper
                    desktop={desktopShot}
                    mobile={mobileShot}
                    desktopEvidence={desktopEvidence}
                    mobileEvidence={mobileEvidence}
                    desktopStatus={desktopStatus as "ok" | "error"}
                    mobileStatus={mobileStatus as "ok" | "error"}
                    desktopError={desktopError}
                  />
                );
              })()}

              {/* Report */}
              {report ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="text-lg font-semibold text-white">Report</h2>
                    <button
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
                      onClick={handleCopyReport}
                    >
                      {copySuccess ? "Copied!" : "Copy report"}
                    </button>
                  </div>
                  <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/90">
                    {report}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
                  <p className="text-sm font-medium text-yellow-400 mb-2">⚠️ Report not available</p>
                  <p className="text-xs text-yellow-300">
                    The API response did not include a human-readable report. 
                    {result && (
                      <details className="mt-2">
                        <summary className="cursor-pointer">Show response data</summary>
                        <pre className="mt-2 text-xs overflow-auto">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </details>
                    )}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Optional: Debug toggle (hidden by default) */}
          {result?.analysis_json && (
            <details className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-sm text-white/80">
                Show technical details (JSON)
              </summary>
              <pre className="mt-3 overflow-auto text-xs text-white/70">
                {JSON.stringify(result.analysis_json, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

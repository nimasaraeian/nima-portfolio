"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DecisionEvidenceForm from "@/components/DecisionEvidenceForm";
import DecisionReportDashboard from "@/components/decision/DecisionReportDashboard";
import { NormalizedDecisionReport, normalizeDecisionReport } from "@/lib/normalizeDecisionReport";
import { analyzeHumanNewWithRaw } from "@/lib/decisionApi";

// Backend API base URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://nima-ai-marketing-production-57b4.up.railway.app";

// Type definitions
type ScreenshotSet = {
  desktop_fold?: string;
  mobile_fold?: string;
  desktop_full?: string;
  mobile_full?: string;
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
  score?: number;
};

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
  bbox: [number, number, number, number];
  confidence: number;
};

type EvidencePayload = {
  viewport: "desktop" | "mobile";
  image_size: [number, number];
  detected_elements: DetectedElement[];
};

type SignatureLayers = {
  decision_psychology_insight?: {
    headline?: string;
    insight?: string;
    why_now?: string;
    micro_risk_reducer?: string;
  };
  cta_recommendations?: {
    primary?: { label?: string; reason?: string };
    secondary?: { label?: string; reason?: string }[];
    do_not_use?: { label?: string; reason?: string }[];
  };
  cost_of_inaction?: {
    headline?: string;
    bullets?: string[];
    metric_hint?: string;
  };
  mindset_personas?: {
    id: "hesitant" | "curious" | "ready" | string;
    title?: string;
    signal?: string;
    goal?: string;
    best_cta?: string;
    next_step?: string;
  }[];
};

type Result = HDRResponse & {
  human_report?: string;
  analysis_json?: any;
  analysis_id?: number;
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
} & SignatureLayers;

export default function DecisionBrainClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Evidence form state
  const [evidenceResult, setEvidenceResult] = useState<NormalizedDecisionReport | null>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [evidenceError, setEvidenceError] = useState<string | null>(null);
  const [evidenceInputMode, setEvidenceInputMode] = useState<"url" | "image" | "text">("url");
  const [isMounted, setIsMounted] = useState(false);
  const [expertMode, setExpertMode] = useState(false);
  const [lastAnalysisData, setLastAnalysisData] = useState<{
    mode: "url" | "image" | "text";
    url?: string;
    image?: File;
    text?: string;
    goal: string;
    expertMode?: boolean;
  } | null>(null);
  // Raw backend response for debugging
  const [rawResponse, setRawResponse] = useState<any>(null);
  
  // Report loading by rid state
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [ridLoaded, setRidLoaded] = useState(false);
  const [currentRid, setCurrentRid] = useState<string | null>(null);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load report by rid query parameter
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const rid = searchParams?.get("rid");
    
    if (!rid) {
      return;
    }

    // Prevent loading if already loaded
    if (ridLoaded) {
      return;
    }

    console.log("[rid] detected:", rid);

    const fetchReport = async () => {
      setLoadingReport(true);
      setReportError(null);
      setEvidenceError(null);
      
      // Validate BASE_URL is configured
      if (!BASE_URL || BASE_URL.trim() === "") {
        const errorMsg = "Backend URL not configured.";
        console.error("[fetch] error:", errorMsg);
        setReportError(errorMsg);
        setEvidenceError(errorMsg);
        setLoadingReport(false);
        setRidLoaded(true);
        return;
      }
      
      const reportsUrl = `${BASE_URL}/api/reports/${rid}`;
      console.log("[fetch] reports url:", reportsUrl);
      
      try {
        const response = await fetch(
          reportsUrl,
          { 
            method: "GET",
            cache: "no-store"
          }
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Report not found or expired");
          }
          throw new Error(`Failed to load report: ${response.statusText}`);
        }
        
        const reportData = await response.json();
        console.log("[rid] fetched ok", reportData);
        
        // Normalize the report data (assuming it has the same shape as analysis result)
        // Try to infer mode from the data, default to "url"
        const mode: "url" | "image" | "text" = 
          reportData.url ? "url" :
          reportData.image || reportData.screenshots ? "image" :
          reportData.text ? "text" : "url";
        
        const normalizedReport = normalizeDecisionReport(reportData, mode);
        
        setEvidenceResult(normalizedReport);
        setRawResponse(reportData);
        setEvidenceInputMode(mode);
        setRidLoaded(true);
        setCurrentRid(rid);
        
        // Auto-scroll to report section after a short delay
        setTimeout(() => {
          const reportElement = document.getElementById("report-section");
          if (reportElement) {
            reportElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } catch (err: any) {
        console.error("[rid] fetch error:", err);
        const errorMessage = err?.message || "Report not found or expired";
        setReportError(errorMessage);
        setEvidenceError(errorMessage);
        setRidLoaded(true); // Mark as loaded even on error to prevent retry loops
        setCurrentRid(null); // Clear rid on error
      } finally {
        setLoadingReport(false);
      }
    };

    fetchReport();
  }, [searchParams, isMounted, ridLoaded]);

  // Handle evidence form submission
  const handleEvidenceSubmit = async (data: {
    mode: "url" | "image" | "text";
    url?: string;
    image?: File;
    text?: string;
    goal: string;
    rawResponse?: any;
    expertMode?: boolean;
  }): Promise<void> => {
    setEvidenceLoading(true);
    setEvidenceError(null);
    setEvidenceResult(null);

    try {
      // Save expert mode state
      if (data.expertMode !== undefined) {
        setExpertMode(data.expertMode);
      }
      
      // Save analysis data for retry
      const analysisData = {
        mode: data.mode,
        goal: data.goal,
        url: data.mode === "url" ? data.url : undefined,
        image: data.image,
        text: data.text,
        expertMode: data.expertMode,
      };
      setLastAnalysisData(analysisData);
      
      let resultData: NormalizedDecisionReport;
      let rawApiResponse: any;

      // If rawResponse is provided (from handleAnalyze), use it directly to avoid duplicate API calls
      if (data.rawResponse) {
        console.log("[handleEvidenceSubmit] Using pre-fetched response, skipping API call");
        rawApiResponse = data.rawResponse;
        // Normalize the pre-fetched response
        resultData = normalizeDecisionReport(rawApiResponse, data.mode);
      } else {
        // Fallback: call API if rawResponse not provided (shouldn't happen with new flow)
        console.log("[handleEvidenceSubmit] No pre-fetched response, calling API (this should not happen)");
        const result = await analyzeHumanNewWithRaw({
          goal: data.goal,
          url: data.mode === "url" ? data.url : undefined,
          image: data.image,
          text: data.text,
        });
        resultData = result.normalized;
        rawApiResponse = result.raw;
      }

      console.log("ANALYZE RESULT", resultData);
      
      // Store raw backend response for debugging
      setRawResponse(rawApiResponse);

      setEvidenceResult(resultData);
      setCurrentRid(null); // Clear rid when new analysis is submitted
    } catch (err: any) {
      console.error("ANALYZE ERROR", err);
      const errorMessage = err?.message || "Analyze failed";
      setEvidenceError(errorMessage);
      throw err;
    } finally {
      setEvidenceLoading(false);
    }
  };

  // Handler to clear rid and show intake form
  const handleRunNewAnalysis = () => {
    setCurrentRid(null);
    setRidLoaded(false);
    setEvidenceResult(null);
    setRawResponse(null);
    setReportError(null);
    setEvidenceError(null);
    // Clear the rid from URL without page reload
    router.replace("/ai-marketing/decision-brain");
  };

  const rid = searchParams?.get("rid") || null;

  // Prevent hydration mismatch by only rendering form on client
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-100">
        {/* Debug line */}
        <div className="fixed top-3 right-3 z-50 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white">
          DecisionBrainClient mounted ✅ rid: {rid || "none"}
        </div>
        <div className="mx-auto max-w-3xl px-4 py-10">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Human Decision Review
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Paste a URL. You'll get a human-readable conversion report with visual evidence.
            </p>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* Debug line */}
      <div className="fixed top-3 right-3 z-50 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white">
        DecisionBrainClient mounted ✅ rid: {rid || "none"}
      </div>
      
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Landing Hero - Show when no report is loaded */}
        {!evidenceResult && !loadingReport && !reportError && (
          <div className="mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-4">
              Decision Psychology Report for Your Landing Page
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Find why users hesitate — not just what they click.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-white/40 mt-1">•</span>
                <span className="text-white/80">Detect decision blocks</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white/40 mt-1">•</span>
                <span className="text-white/80">Explain user hesitation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white/40 mt-1">•</span>
                <span className="text-white/80">Get actionable fixes</span>
              </div>
            </div>
            
            <p className="text-sm text-white/50 mb-8">
              Built for marketers, founders, and CRO specialists.
            </p>
          </div>
        )}

        {/* Standard Header - Show when report is loaded */}
        {evidenceResult && !loadingReport && !reportError && (
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Human Decision Review
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Paste a URL. You'll get a human-readable conversion report with visual evidence.
            </p>
          </header>
        )}

        {/* Banner: Loaded shared report */}
        {currentRid && evidenceResult && !loadingReport && !reportError && (
          <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <p className="text-sm text-green-300">Loaded shared report</p>
            </div>
            <button
              onClick={handleRunNewAnalysis}
              className="text-xs px-3 py-1.5 rounded-md border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              Run a new analysis
            </button>
          </div>
        )}

        {/* Loading state for report by rid */}
        {loadingReport && (
          <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg text-white/80">Loading report...</p>
          </div>
        )}

        {/* Error state for report by rid */}
        {reportError && !loadingReport && (
          <div className="mb-8 rounded-lg border border-red-500/30 bg-red-500/10 p-8 text-center">
            <p className="text-lg text-red-300">{reportError}</p>
            <p className="mt-2 text-sm text-white/60">
              The report may have expired or the ID is invalid.
            </p>
          </div>
        )}

        {/* NEW EVIDENCE INTAKE FORM - Hide when report is loaded from rid */}
        {!currentRid && !loadingReport && (
          <div className="mb-8">
            <DecisionEvidenceForm
              onSubmit={handleEvidenceSubmit}
              isLoading={evidenceLoading}
              error={evidenceError}
              expertMode={expertMode}
            />
          </div>
        )}

        {/* EVIDENCE REPORT VIEW */}
        {evidenceResult && !loadingReport && (
          <div id="report-section">
            <DecisionReportDashboard 
              report={evidenceResult}
              rawBackendResponse={rawResponse}
              expertMode={expertMode}
              onRetryCapture={lastAnalysisData ? async () => {
                setEvidenceLoading(true);
                setEvidenceError(null);
                setEvidenceResult(null);
                setRawResponse(null);
                try {
                  // Retry with recapture=true parameter
                  const mode = lastAnalysisData.mode;
                  let endpoint: string;
                  let requestBody: any;
                  let headers: HeadersInit = {};

                  if (mode === "url") {
                    endpoint = `/api/analyze/url-human-advanced?expert=true&verbosity=full&recapture=true`;
                    requestBody = {
                      url: lastAnalysisData.url,
                      goal: lastAnalysisData.goal,
                      locale: "en",
                    };
                    headers["Content-Type"] = "application/json";
                  } else if (mode === "image") {
                    endpoint = `${BASE_URL}/api/analyze/human?recapture=true`; // unchanged for image/text
                    const formData = new FormData();
                    formData.append("goal", lastAnalysisData.goal);
                    if (lastAnalysisData.image) {
                      formData.append("image", lastAnalysisData.image);
                    }
                    requestBody = formData;
                  } else {
                    // text mode
                    endpoint = `${BASE_URL}/api/analyze/human?recapture=true`;
                    const formData = new FormData();
                    formData.append("goal", lastAnalysisData.goal);
                    if (lastAnalysisData.text) {
                      formData.append("text", lastAnalysisData.text);
                    }
                    requestBody = formData;
                  }

                  const res = await fetch(endpoint, {
                    method: "POST",
                    headers,
                    body: mode === "url" ? JSON.stringify(requestBody) : requestBody,
                  });

                  if (!res.ok) {
                    throw new Error(`Retry failed: ${res.status} ${res.statusText}`);
                  }

                  const responseData = await res.json();
                  const normalizedReport = normalizeDecisionReport(responseData, mode);
                  
                  setEvidenceResult(normalizedReport);
                  setRawResponse(responseData);
                } catch (err: any) {
                  setEvidenceError(err?.message || "Retry failed");
                } finally {
                  setEvidenceLoading(false);
                }
              } : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}


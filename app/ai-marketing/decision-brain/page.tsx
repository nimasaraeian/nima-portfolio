"use client";

import React, { useState, useEffect } from "react";
import DecisionEvidenceForm from "@/components/DecisionEvidenceForm";
import DecisionReportView from "@/components/DecisionReportView";

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
  analysis_id?: number; // For feedback loop
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


export default function DecisionBrainHumanUI() {
  // Evidence form state
  const [evidenceResult, setEvidenceResult] = useState<any>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [evidenceError, setEvidenceError] = useState<string | null>(null);
  const [evidenceInputMode, setEvidenceInputMode] = useState<"url" | "image" | "text">("url");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function for safe error message extraction
  function safeErrorMessage(err: unknown): string {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    try {
      return JSON.stringify(err);
    } catch {
      return "Unknown error";
    }
  }

  // Handle evidence form submission
  const handleEvidenceSubmit = async (data: {
    mode: "url" | "image" | "text";
    url?: string;
    image?: File;
    text?: string;
    goal: string;
  }) => {
    setEvidenceError(null);
    setEvidenceResult(null);
    setEvidenceInputMode(data.mode);
    setEvidenceLoading(true);

    console.log("[DecisionBrain] POST ->", "/api/proxy/analyze-human");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout

      // Build FormData for all modes
      const fd = new FormData();
      fd.append("goal", data.goal);

      if (data.mode === "url" && data.url) {
        fd.append("url", data.url);
      } else if (data.mode === "text" && data.text) {
        fd.append("text", data.text);
      } else if (data.mode === "image" && data.image) {
        fd.append("image", data.image);
      }

      const response = await fetch("/api/proxy/analyze-human", {
        method: "POST",
        body: fd,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      let resultData: any;

      try {
        resultData = JSON.parse(responseText);
      } catch {
        const preview = typeof responseText === "string" ? responseText.slice(0, 200) : String(responseText).slice(0, 200);
        throw new Error(`Invalid JSON response: ${preview}`);
      }

      // Check for API-level error status
      if (!response.ok || resultData?.status === "error") {
        const errorMsg = resultData?.message || resultData?.detail || resultData?.error || `API ${response.status} error`;
        throw new Error(errorMsg);
      }

      setEvidenceResult(resultData);
      setEvidenceLoading(false);
    } catch (err) {
      console.error("Evidence submission failed:", err);
      let errorMessage = "Failed to analyze evidence. Please try again.";
      
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else if (err.message.includes("Failed to fetch") || err.message.includes("fetch")) {
          errorMessage = "Network error: Could not connect to the server. Please check your connection and try again.";
        } else {
          errorMessage = safeErrorMessage(err);
        }
      } else {
        errorMessage = safeErrorMessage(err);
      }
      
      setEvidenceError(errorMessage);
      setEvidenceLoading(false);
    }
  };


  // Prevent hydration mismatch by only rendering form on client
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-100">
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
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Human Decision Review
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Paste a URL. You'll get a human-readable conversion report with visual evidence.
          </p>
        </header>

        {/* NEW EVIDENCE INTAKE FORM */}
        <div className="mb-8">
          <DecisionEvidenceForm
            onSubmit={handleEvidenceSubmit}
            isLoading={evidenceLoading}
            error={evidenceError}
                  />
                </div>

        {/* EVIDENCE REPORT VIEW */}
        {evidenceResult && (
          <DecisionReportView result={evidenceResult} inputMode={evidenceInputMode} />
        )}
      </div>
    </div>
  );
}

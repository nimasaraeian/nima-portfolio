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

  // Handle evidence form submission
  const handleEvidenceSubmit = async (data: {
    mode: "url" | "image" | "text";
    url?: string;
    image?: File;
    text?: string;
    goal: string;
  }) => {
    setEvidenceLoading(true);
    setEvidenceError(null);
    setEvidenceResult(null);
    setEvidenceInputMode(data.mode);

    try {
      // Build FormData
      const formData = new FormData();
      formData.append("goal", data.goal);

      if (data.mode === "url" && data.url) {
        formData.append("url", data.url);
      }
      if (data.image) {
        formData.append("image", data.image);
      }
      if (data.text) {
        formData.append("text", data.text);
      }

      // Call proxy endpoint - do NOT set Content-Type header
      const res = await fetch("/api/proxy/analyze-human", {
        method: "POST",
        body: formData,
      });

      // Read response as text first
      const raw = await res.text();

      // Handle errors
      if (!res.ok) {
        let msg = raw || `Request failed (${res.status})`;
        try {
          const j = JSON.parse(raw);
          msg = j?.message || j?.detail?.message || msg;
        } catch {
          // If JSON parse fails, use raw text or default message
        }
        throw new Error(msg);
      }

      // Parse JSON response
      const resultData = JSON.parse(raw);
      console.log("ANALYZE RESULT", resultData);

      setEvidenceResult(resultData);
      return resultData;
    } catch (err: any) {
      console.error("ANALYZE ERROR", err);
      const errorMessage = err?.message || "Analyze failed";
      setEvidenceError(errorMessage);
      throw err;
    } finally {
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

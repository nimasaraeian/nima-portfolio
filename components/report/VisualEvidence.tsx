"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";
import { getApiBase } from '@/src/lib/apiBase';

// Helper to convert relative URLs to absolute backend URLs
const toAbsoluteUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // Ensure url is a string
  const urlString = String(url);
  if (!urlString || urlString.trim() === "") return null;
  
  // If already absolute (http/https/data), return as-is
  if (urlString.startsWith("data:image/") || urlString.startsWith("http://") || urlString.startsWith("https://")) {
    return urlString;
  }
  
  // For relative paths, convert to absolute using backend base URL
  let base: string;
  if (typeof window !== 'undefined') {
    base = process.env.NEXT_PUBLIC_BACKEND_URL || 
           process.env.NEXT_PUBLIC_BRAIN_API_URL || 
           'https://nima-ai-marketing-production-57b4.up.railway.app';
  } else {
    base = getApiBase();
  }
  
  if (!base) {
    console.warn("⚠️ No backend URL configured for screenshot. Set NEXT_PUBLIC_BACKEND_URL");
    return urlString.startsWith('/') ? urlString : `/${urlString}`;
  }
  
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = urlString.startsWith('/') ? urlString : `/${urlString}`;
  return `${normalizedBase}${normalizedPath}`;
};

type VisualEvidenceProps = {
  report?: UiReport;
  data?: any; // Legacy prop for backward compatibility
};

export default function VisualEvidence({ report, data }: VisualEvidenceProps) {
  // Handle both new (report) and old (data) prop formats
  let evidence: { desktopAtf?: string | null; mobileAtf?: string | null } | null = null;
  
  if (report?.evidence) {
    evidence = report.evidence;
  } else if (data) {
    // Legacy format: extract from data.capture.artifacts.above_the_fold
    const desktopArtifact = data?.capture?.artifacts?.above_the_fold?.desktop;
    const mobileArtifact = data?.capture?.artifacts?.above_the_fold?.mobile;
    
    evidence = {
      desktopAtf: desktopArtifact?.data_uri || desktopArtifact?.url || null,
      mobileAtf: mobileArtifact?.data_uri || mobileArtifact?.url || null,
    };
  }

  if (!evidence) {
    return null;
  }

  // Ensure values are strings before passing to toAbsoluteUrl
  const desktopAtfValue = evidence.desktopAtf;
  const mobileAtfValue = evidence.mobileAtf;
  
  const desktopAtf = (desktopAtfValue && typeof desktopAtfValue === 'string') 
    ? toAbsoluteUrl(desktopAtfValue) 
    : null;
  const mobileAtf = (mobileAtfValue && typeof mobileAtfValue === 'string')
    ? toAbsoluteUrl(mobileAtfValue)
    : null;

  if (!desktopAtf && !mobileAtf) {
    return null;
  }

  // Determine problem areas to label
  const primaryBlocker = report?.summary?.primaryProblemTitle?.toLowerCase() || "";
  const showHeroLabel = primaryBlocker.includes("cta") || primaryBlocker.includes("call-to-action") || primaryBlocker.includes("clarity");
  const showTrustLabel = primaryBlocker.includes("trust") || primaryBlocker.includes("credibility");
  const showCTALabel = primaryBlocker.includes("cta") || primaryBlocker.includes("call-to-action");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Visual Evidence</h2>
      <p className="text-sm text-white/60 mb-6">
        What visitors see when they first arrive
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Desktop */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-sm text-white/70 font-medium">Desktop</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
            <div className="aspect-[16/9] w-full relative">
              {desktopAtf ? (
                <>
                  <img
                    src={desktopAtf}
                    alt="Desktop above-the-fold"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      console.error("❌ Failed to load desktop screenshot:", desktopAtf);
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Subtle annotations */}
                  {showHeroLabel && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-500/80 text-white text-xs font-medium rounded">
                      Hero Zone
                    </div>
                  )}
                  {showCTALabel && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-yellow-500/80 text-white text-xs font-medium rounded">
                      CTA Area
                    </div>
                  )}
                  {showTrustLabel && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500/80 text-white text-xs font-medium rounded">
                      Trust Zone
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-60 text-sm text-white/70">
                  Desktop screenshot not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start">
          <div className="w-full max-w-[140px] space-y-4">
            <div className="text-sm text-white/70 font-medium">Mobile</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden relative">
              <div className="aspect-[9/19] w-full relative">
                {mobileAtf ? (
                  <>
                    <img
                      src={mobileAtf}
                      alt="Mobile above-the-fold"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={(e) => {
                        console.error("❌ Failed to load mobile screenshot:", mobileAtf);
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    {/* Subtle annotations */}
                    {showHeroLabel && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-red-500/80 text-white text-[10px] font-medium rounded">
                        Hero
                      </div>
                    )}
                    {showCTALabel && (
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-yellow-500/80 text-white text-[10px] font-medium rounded">
                        CTA
                      </div>
                    )}
                    {showTrustLabel && (
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-blue-500/80 text-white text-[10px] font-medium rounded">
                        Trust
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 text-xs text-white/70 px-2 text-center">
                    Mobile screenshot not available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
        <p className="text-base text-white/80 leading-relaxed">
          These screenshots show what visitors see when they first arrive. The labeled areas indicate where the primary problem appears—this visual evidence supports the insights above and shows why visitors hesitate.
        </p>
      </div>
    </div>
  );
}

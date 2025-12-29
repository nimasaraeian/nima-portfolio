"use client";

import React, { useState } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";

type VisualEvidenceProps = {
  report: NormalizedDecisionReport;
  onRetry?: () => void;
};

function toAbsoluteUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith("data:image/") || url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return url;
}

export default function VisualEvidence({ report, onRetry }: VisualEvidenceProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  
  if (!report) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Visual Evidence</h2>
        <div className="text-center py-12 text-white/60">
          <p>Report data is missing</p>
        </div>
      </div>
    );
  }
  
  const screenshots = report.screenshots || { available: false, reason_if_missing: "Report data incomplete." };
  const mode = report.mode || "unknown";

  // Get image URLs
  const desktopUrl = screenshots.desktop?.data_url || screenshots.desktop?.url || null;
  const mobileUrl = screenshots.mobile?.data_url || screenshots.mobile?.url || null;
  const desktopAtf = toAbsoluteUrl(desktopUrl);
  const mobileAtf = toAbsoluteUrl(mobileUrl);

  // Check if we actually have screenshots (prioritize actual data over flag)
  const hasActualScreenshots = !!(desktopAtf || mobileAtf);
  
  // STEP 6: For image mode, if visual.mode === "screenshot", don't show "Inferred"
  const isImageModeScreenshot = mode === "image" && report.raw?.visual?.mode === "screenshot";

  // If no actual screenshots exist, show smart fallback card
  // BUT: Don't show "Inferred" for uploaded images in screenshot mode
  if (!hasActualScreenshots && !isImageModeScreenshot) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Visual Evidence</h2>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Inferred Visual Signals</h3>
              <p className="text-base text-white/80 leading-relaxed mb-3">
                Visual cues were inferred from layout structure, copy density, and CTA hierarchy. Screenshot capture was unavailable.
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 whitespace-nowrap ml-4">
              AI-Inferred
            </span>
          </div>
          <p className="text-sm text-white/70 mb-4">
            {screenshots.reason_if_missing || "Insights were generated from behavioral patterns and structural analysis of the page content."}
          </p>
          {mode === "url" && onRetry && (
            <button
              onClick={onRetry}
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Retry capture
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Visual Evidence</h2>
        <p className="text-sm text-white/60 mb-6">
          What visitors see when they first arrive
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Desktop */}
          {desktopAtf && (
            <div className="space-y-3">
              <div className="text-sm text-white/70 font-medium">Desktop</div>
              <div 
                className="rounded-lg border border-white/10 bg-white/5 overflow-hidden cursor-pointer hover:opacity-90 transition"
                onClick={() => setEnlargedImage(desktopAtf)}
              >
                <div className="aspect-[16/9] w-full relative">
                  <img
                    src={desktopAtf}
                    alt="Desktop above-the-fold"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mobile */}
          {mobileAtf && (
            <div className="space-y-3">
              <div className="text-sm text-white/70 font-medium">Mobile</div>
              <div 
                className="rounded-lg border border-white/10 bg-white/5 overflow-hidden cursor-pointer hover:opacity-90 transition max-w-[200px] mx-auto lg:mx-0"
                onClick={() => setEnlargedImage(mobileAtf)}
              >
                <div className="aspect-[9/19] w-full relative">
                  <img
                    src={mobileAtf}
                    alt="Mobile above-the-fold"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enlarge Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="max-w-7xl max-h-[90vh] relative">
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged screenshot"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

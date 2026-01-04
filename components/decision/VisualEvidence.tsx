"use client";

import React, { useState } from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import { filterEvidenceBullets } from "@/lib/evidenceFilter";

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
  const visual = report.raw?.visual || {};

  // Debug logging
  if (process.env.NODE_ENV !== "production") {
    console.log("[VISUAL] capture_status", visual?.capture_status);
    console.log("[VISUAL] screenshot keys", Object.keys(screenshots || {}));
    console.log("[VISUAL] desktop keys", screenshots?.desktop && typeof screenshots.desktop === "object" 
      ? Object.keys(screenshots.desktop) : "N/A");
    console.log("[VISUAL] mobile keys", screenshots?.mobile && typeof screenshots.mobile === "object"
      ? Object.keys(screenshots.mobile) : "N/A");
    console.log("[VISUAL] hasDesktop", !!screenshots?.desktop);
    console.log("[VISUAL] hasMobile", !!screenshots?.mobile);
  }

  // Get image URLs
  const desktopUrl = screenshots.desktop?.data_url || screenshots.desktop?.url || null;
  const mobileUrl = screenshots.mobile?.data_url || screenshots.mobile?.url || null;
  const desktopAtf = toAbsoluteUrl(desktopUrl);
  const mobileAtf = toAbsoluteUrl(mobileUrl);

  // Check if we actually have screenshots (prioritize actual data over flag)
  const hasActualScreenshots = !!(desktopAtf || mobileAtf);
  
  // Check capture status - consider "captured" if:
  // 1. visual.capture_status === "ok", OR
  // 2. visual.mode === "screenshot", OR
  // 3. We have actual screenshot data URLs
  const captureStatus = visual?.capture_status;
  const isCaptured = captureStatus === "ok" || visual?.mode === "screenshot" || hasActualScreenshots;

  // Generate concrete inferred signals bullets
  const generateInferredSignals = (): string[] => {
    const bullets: string[] = [];
    const pageMap = report.raw?.page_map || report.page_map || {};
    const decision = report.raw?.decision || {};
    const visualHierarchy = pageMap.visual_hierarchy || {};
    const copySnippets = pageMap.copy_snippets || [];
    const scores = decision.scores || {};

    // From visual_hierarchy
    if (visualHierarchy.focus) {
      bullets.push(`Headline dominates early attention (focus: ${visualHierarchy.focus}).`);
    }
    if (visualHierarchy.cta_visibility !== undefined) {
      const ctaCount = visualHierarchy.cta_visibility > 0.5 ? "prominent" : visualHierarchy.cta_visibility > 0.2 ? "present but generic" : "minimal";
      bullets.push(`CTA is ${ctaCount} (${visualHierarchy.cta_visibility > 0 ? "1" : "0"} CTA detected).`);
    }
    if (visualHierarchy.noise !== undefined) {
      const noiseLevel = visualHierarchy.noise < 0.3 ? "Low" : visualHierarchy.noise < 0.6 ? "Moderate" : "High";
      bullets.push(`${noiseLevel} visual noise (noise ~${visualHierarchy.noise.toFixed(1)}) ${visualHierarchy.noise < 0.3 ? "supports clarity" : "may distract"}.`);
    }

    // From copy_snippets
    if (copySnippets.length > 0 && bullets.length < 5) {
      const snippet = copySnippets[0];
      if (typeof snippet === 'string') {
        bullets.push(`Copy snippet: "${snippet.substring(0, 50)}${snippet.length > 50 ? '...' : ''}"`);
      }
    }

    // From decision scores
    if (scores.visual !== undefined && bullets.length < 5) {
      const visualScore = typeof scores.visual === 'number' ? scores.visual : 0;
      bullets.push(`Visual clarity score: ${Math.round(visualScore * 100)}%`);
    }
    if (scores.trust !== undefined && bullets.length < 5) {
      const trustScore = typeof scores.trust === 'number' ? scores.trust : 0;
      if (trustScore < 0.5) {
        bullets.push(`Trust signals are lighter (trust score: ${Math.round(trustScore * 100)}%).`);
      }
    }

    // Fallback if no specific data
    if (bullets.length === 0) {
      if (pageMap.headline) {
        bullets.push(`Headline: "${pageMap.headline.substring(0, 60)}${pageMap.headline.length > 60 ? '...' : ''}"`);
      }
      if (pageMap.primary_cta) {
        const ctaText = typeof pageMap.primary_cta === 'string' ? pageMap.primary_cta : pageMap.primary_cta?.text;
        if (ctaText) {
          bullets.push(`Primary CTA: "${ctaText}"`);
        }
      }
      if (pageMap.offer) {
        const offerValue = typeof pageMap.offer === 'string' ? pageMap.offer : pageMap.offer?.value;
        if (offerValue) {
          bullets.push(`Offer/price appears prominently: "${offerValue}"`);
        }
      }
    }

    // Filter to keep only concrete evidence
    return filterEvidenceBullets(bullets);
  };

  // Check screenshot status from raw response
  const screenshotsStatus = report.raw?.screenshots?.status;
  const screenshotsFailed = screenshotsStatus && screenshotsStatus !== "ok";
  
  // If no actual screenshots exist and not captured, show smart fallback card
  if (!hasActualScreenshots && !isCaptured) {
    const inferredSignals = generateInferredSignals();
    const captureFailed = captureStatus === "failed" || screenshotsFailed;
    
    // Show clear banner if screenshot capture failed
    if (captureFailed || screenshotsFailed) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Visual Evidence</h2>
          
          {/* Clear banner for screenshot capture failure */}
          <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-orange-300 mb-1">Visual capture failed</h3>
                <p className="text-sm text-orange-200/90 leading-relaxed">
                  Retry capture or use Text mode for detailed analysis. The full text analysis is still available based on page content.
                </p>
              </div>
            </div>
            {mode === "url" && onRetry && (
              <div className="mt-4">
                <button
                  onClick={onRetry}
                  className="rounded-lg border border-orange-500/30 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-200 hover:bg-orange-500/30 transition"
                >
                  Retry capture
                </button>
              </div>
            )}
          </div>
          
          {/* Show inferred signals if available */}
          {inferredSignals.length > 0 && (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Inferred Visual Signals</h3>
                  <ul className="space-y-2 mb-3">
                    {inferredSignals.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-white/40 mt-1.5">•</span>
                        <p className="text-sm text-white/80 flex-1">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 whitespace-nowrap ml-4">
                  AI-Inferred
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Only show if we have at least 1 bullet after filtering
    if (inferredSignals.length === 0) {
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
            {captureFailed && (
              <p className="text-xs text-white/50 mb-4">
                Some visual signals are inferred due to limited screenshot capture.
              </p>
            )}
            {mode === "url" && onRetry && captureStatus !== "ok" && (
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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Visual Evidence</h2>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Inferred Visual Signals</h3>
              {inferredSignals.length > 0 ? (
                <ul className="space-y-2 mb-3">
                  {inferredSignals.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white/40 mt-1.5">•</span>
                      <p className="text-sm text-white/80 flex-1">
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-white/80 leading-relaxed mb-3">
                  Visual cues were inferred from layout structure, copy density, and CTA hierarchy.
                </p>
              )}
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 whitespace-nowrap ml-4">
              AI-Inferred
            </span>
          </div>
          {captureFailed && (
            <p className="text-xs text-white/50 mb-4">
              Some visual signals are inferred due to limited screenshot capture.
            </p>
          )}
          {mode === "url" && onRetry && captureStatus !== "ok" && (
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
        <h2 className="text-2xl font-semibold text-white mb-6">
          {isCaptured ? "Captured Visual Evidence" : "Visual Evidence"}
        </h2>
        
        {/* Concrete inferred signals if capture failed */}
        {captureStatus === "failed" && (() => {
          const inferredSignals = generateInferredSignals();
          if (inferredSignals.length === 0) return null;
          
          return (
            <div className="mb-6 space-y-2">
              {inferredSignals.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-white/40 mt-1.5">•</span>
                  <p className="text-sm text-white/70 flex-1">
                    {bullet}
                  </p>
                </div>
              ))}
              <p className="text-xs text-white/50 mt-3">
                Some visual signals are inferred due to limited screenshot capture.
              </p>
            </div>
          );
        })()}

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

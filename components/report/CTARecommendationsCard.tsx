"use client";

import React, { useState } from "react";

type CTARecommendationsData = {
  primary?: { label?: string; reason?: string };
  secondary?: { label?: string; reason?: string }[];
  do_not_use?: { label?: string; reason?: string }[];
};

export default function CTARecommendationsCard({ data }: { data?: CTARecommendationsData }) {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!data || (!data.primary && !data.secondary?.length && !data.do_not_use?.length)) {
    return null;
  }

  const handleCopyPrimary = async () => {
    if (data.primary?.label) {
      await navigator.clipboard.writeText(data.primary.label);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
      <h3 className="text-lg font-semibold text-white">CTA Recommendations</h3>

      {/* Primary CTA */}
      {data.primary && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-white/70 uppercase tracking-wide">Primary</p>
            {data.primary.label && (
              <button
                onClick={handleCopyPrimary}
                className="text-xs text-white/60 hover:text-white/80 transition px-2 py-1 rounded border border-white/10 hover:bg-white/5"
              >
                {copySuccess ? "Copied!" : "Copy CTA"}
              </button>
            )}
          </div>
          {data.primary.label && (
            <div className="rounded-lg border-2 border-blue-500/30 bg-blue-500/10 p-4">
              <p className="text-base font-semibold text-blue-200 mb-2">{data.primary.label}</p>
              {data.primary.reason && (
                <p className="text-sm text-white/70">{data.primary.reason}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Secondary CTAs */}
      {data.secondary && data.secondary.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-white/70 uppercase tracking-wide">Secondary</p>
          <div className="space-y-3">
            {data.secondary.slice(0, 2).map((cta, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-sm font-medium text-white/90 mb-1">{cta.label}</p>
                {cta.reason && (
                  <p className="text-xs text-white/60">{cta.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Do Not Use */}
      {data.do_not_use && data.do_not_use.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Do Not Use</p>
          <div className="space-y-2">
            {data.do_not_use.map((cta, idx) => (
              <div key={idx} className="rounded border border-white/5 bg-white/5 p-2 opacity-60">
                <p className="text-xs text-white/70 line-through">{cta.label}</p>
                {cta.reason && (
                  <p className="text-xs text-white/50 mt-1">{cta.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import React from "react";
import { AttentionPath } from "@/lib/typesDecisionReport";

type AttentionPathCardProps = {
  attentionPath?: AttentionPath;
  fallbackFromPageMap?: {
    headline?: string;
    primary_cta?: { text?: string } | string;
    offer?: { value?: string } | string;
  };
};

export default function AttentionPathCard({ attentionPath, fallbackFromPageMap }: AttentionPathCardProps) {
  // Build items list: use attention_path if available, otherwise fallback to page_map
  let items: Array<{ label: string; why_first?: string; evidence?: any }> = [];
  let useFallback = false;

  if (attentionPath?.first_3s && attentionPath.first_3s.length > 0) {
    items = attentionPath.first_3s.slice(0, 3);
  } else if (fallbackFromPageMap) {
    // Fallback list from page_map
    useFallback = true;
    const headline = fallbackFromPageMap.headline;
    const ctaText = typeof fallbackFromPageMap.primary_cta === 'string' 
      ? fallbackFromPageMap.primary_cta 
      : fallbackFromPageMap.primary_cta?.text;
    const offerValue = typeof fallbackFromPageMap.offer === 'string'
      ? fallbackFromPageMap.offer
      : fallbackFromPageMap.offer?.value;
    
    if (headline) items.push({ label: headline });
    if (offerValue && items.length < 3) items.push({ label: offerValue });
    if (ctaText && items.length < 3) items.push({ label: ctaText });
  }

  // If no items at all, don't render
  if (items.length === 0) {
    return null;
  }

  const limitations = attentionPath?.limitations || [];
  const confidence = attentionPath?.confidence;

  // Generate insight line from first_3s labels
  const generateInsight = (): string => {
    if (items.length >= 2) {
      const first = items[0]?.label || "elements";
      const second = items[1]?.label || "proof";
      return `Users see ${first} before ${second} — proof appears later, so hesitation increases.`;
    } else if (items.length === 1) {
      const first = items[0]?.label || "elements";
      return `Users see ${first} first — proof appears later, so hesitation increases.`;
    }
    return "Visual order influences early hesitation.";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <h2 className="text-2xl font-bold text-white mb-2">
        How users likely see this page
      </h2>
      <p className="text-sm text-white/60 mb-6">
        First impression
      </p>

      {/* First 3 seconds */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white/90 mb-4">
          First 3 seconds
        </h3>
        <ol className="space-y-3">
          {items.map((item, index) => {
            const reason = item.why_first || 
              item.evidence?.quote || 
              item.evidence?.observation || 
              null;
            
            return (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-semibold text-blue-300">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium mb-1">
                    {item.label}
                  </p>
                  {reason && (
                    <p className="text-sm text-white/60">
                      {reason}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Insight line */}
      <div className="mb-6 pt-6 border-t border-white/10">
        <p className="text-sm text-white/70 italic">
          {generateInsight()}
        </p>
      </div>

      {/* Limitations - muted line if present */}
      {limitations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50">
            Note: Visual order is inferred (limited screenshot signals).
          </p>
        </div>
      )}

      {/* Confidence indicator if present and low */}
      {confidence !== undefined && confidence < 0.5 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50">
            Lower confidence in attention path analysis
          </p>
        </div>
      )}
    </div>
  );
}


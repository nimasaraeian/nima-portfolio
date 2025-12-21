"use client";

import React from "react";
import { getApiBase } from '@/src/lib/apiBase';

type Props = {
  desktop?: string;
  mobile?: string;
};

// Helper to convert relative URLs to absolute
const toAbsolute = (u: string | undefined): string => {
  if (!u) return "";
  if (u.startsWith("http") || u.startsWith("data:")) return u;
  
  const base = getApiBase();
  if (!base) {
    // If no base URL, assume relative path works
    return u.startsWith('/') ? u : `/${u}`;
  }
  
  return `${base}${u}`;
};

export default function DualScreenshotView({ desktop, mobile }: Props) {
  const desktopSrc = desktop ? toAbsolute(desktop) : "";
  const mobileSrc = mobile ? toAbsolute(mobile) : "";

  // If both are missing, don't render
  if (!desktopSrc && !mobileSrc) {
    return null;
  }

  return (
    <div className="mt-6 flex gap-4 items-start">
      {/* Desktop Screenshot - max 60% width, max 720px */}
      {desktopSrc && (
        <div 
          className="flex-1"
          style={{ 
            maxWidth: "min(60%, 720px)"
          }}
        >
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden shadow-lg">
            <div className="px-4 py-2 text-sm border-b border-white/10 flex justify-between">
              <span>Desktop preview</span>
              <span className="text-xs opacity-60">Above the fold</span>
            </div>
            <div 
              style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#111827"
              }}
              className="aspect-[1440/900]"
            >
              <img
                src={desktopSrc}
                alt="Desktop screenshot"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block"
                }}
                onError={(e) => {
                  console.error("❌ Desktop image failed to load");
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Screenshot - fixed 240px width */}
      {mobileSrc && (
        <div 
          style={{ 
            width: "240px",
            flexShrink: 0
          }}
        >
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden shadow-lg">
            <div className="px-3 py-2 text-xs border-b border-white/10 flex justify-between">
              <span>Mobile</span>
              <span className="text-xs opacity-60">Above fold</span>
            </div>
            <div 
              style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#111827"
              }}
              className="aspect-[390/844]"
            >
              <img
                src={mobileSrc}
                alt="Mobile screenshot"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block"
                }}
                onError={(e) => {
                  console.error("❌ Mobile image failed to load");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


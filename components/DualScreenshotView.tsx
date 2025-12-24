"use client";

import React from "react";
import { getApiBase } from '@/src/lib/apiBase';

type Props = {
  desktop?: string;
  mobile?: string;
  title?: string;
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

export default function DualScreenshotView({ desktop, mobile, title }: Props) {
  const desktopSrc = desktop ? toAbsolute(desktop) : "";
  const mobileSrc = mobile ? toAbsolute(mobile) : "";

  // If both are missing, don't render
  if (!desktopSrc && !mobileSrc) {
    return null;
  }

  return (
    <div className="mt-6 w-full">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      )}
      
      {/* Container: Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-start">
        {/* Desktop Screenshot */}
        {desktopSrc && (
          <div className="w-full lg:flex-1 lg:max-w-[60%] xl:max-w-[720px]">
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden shadow-lg">
              <div className="px-4 py-2.5 text-sm border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">دسکتاپ</span>
                </div>
                <span className="text-xs opacity-60">Above the fold</span>
              </div>
              <div 
                className="w-full overflow-hidden relative bg-gray-900"
                style={{
                  aspectRatio: "1440/900"
                }}
              >
                <img
                  src={desktopSrc}
                  alt="Desktop screenshot"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    console.error("❌ Desktop image failed to load:", desktopSrc);
                  }}
                  onLoad={() => {
                    console.log("✅ Desktop screenshot loaded");
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Screenshot */}
        {mobileSrc && (
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden shadow-lg lg:min-w-[240px] lg:max-w-[280px] mx-auto lg:mx-0">
              <div className="px-3 py-2 text-xs border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">موبایل</span>
                </div>
                <span className="text-xs opacity-60">Above fold</span>
              </div>
              <div 
                className="w-full overflow-hidden relative bg-gray-900 mx-auto"
                style={{
                  aspectRatio: "390/844",
                  maxWidth: "280px"
                }}
              >
                <img
                  src={mobileSrc}
                  alt="Mobile screenshot"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    console.error("❌ Mobile image failed to load:", mobileSrc);
                  }}
                  onLoad={() => {
                    console.log("✅ Mobile screenshot loaded");
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


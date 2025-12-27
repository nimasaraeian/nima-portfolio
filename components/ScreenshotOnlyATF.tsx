"use client";

import React from "react";
import { getApiBase } from '@/src/lib/apiBase';

// Helper to convert relative URLs to absolute backend URLs
const toAbsoluteUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // If already absolute (http/https/data), return as-is
  // Data URLs (base64 images) should be used directly
  if (url.startsWith("data:image/") || url.startsWith("data:image/png") || url.startsWith("data:image/jpeg")) {
    return url;
  }
  
  // If already absolute HTTP/HTTPS URL, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // For relative paths, convert to absolute using backend base URL
  // In client-side, we need to use the environment variable directly
  let base: string;
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable (available via NEXT_PUBLIC_ prefix)
    base = process.env.NEXT_PUBLIC_BACKEND_URL || 
           process.env.NEXT_PUBLIC_BRAIN_API_URL || 
           'https://nima-ai-marketing-production-57b4.up.railway.app'; // Fallback to Railway backend
  } else {
    // Server-side: use getApiBase()
    base = getApiBase();
  }
  
  if (!base) {
    // If no base URL configured, log warning and return relative path
    console.warn("⚠️ No backend URL configured for screenshot. Set NEXT_PUBLIC_BACKEND_URL");
    return url.startsWith('/') ? url : `/${url}`;
  }
  
  // Ensure single slash between base and path
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  const absoluteUrl = `${normalizedBase}${normalizedPath}`;
  
  // Debug log in development
  if (process.env.NODE_ENV !== "production") {
    console.log("📸 Converting screenshot URL:", { original: url, absolute: absoluteUrl });
  }
  
  return absoluteUrl;
};

export function ScreenshotOnlyATF({ data }: { data: any }) {
  // Extract ATF URLs ONLY from: capture.artifacts.above_the_fold.desktop/mobile
  // Priority: data_uri first, then url
  const desktopArtifact = data?.capture?.artifacts?.above_the_fold?.desktop;
  const mobileArtifact = data?.capture?.artifacts?.above_the_fold?.mobile;

  const desktopATFRaw = desktopArtifact?.data_uri ?? desktopArtifact?.url ?? null;
  const mobileATFRaw = mobileArtifact?.data_uri ?? mobileArtifact?.url ?? null;

  // Convert to absolute URLs (for url type, data_uri is already absolute)
  const desktopATF = desktopATFRaw ? (desktopATFRaw.startsWith('data:') ? desktopATFRaw : toAbsoluteUrl(desktopATFRaw)) : null;
  const mobileATF = mobileATFRaw ? (mobileATFRaw.startsWith('data:') ? mobileATFRaw : toAbsoluteUrl(mobileATFRaw)) : null;

  // Debug logs
  console.debug("📸 ScreenshotOnlyATF artifacts:", {
    "capture.artifacts.above_the_fold.desktop": desktopArtifact ? "✅" : "❌",
    "capture.artifacts.above_the_fold.mobile": mobileArtifact ? "✅" : "❌",
    "desktop.data_uri": desktopArtifact?.data_uri ? "✅" : "❌",
    "desktop.url": desktopArtifact?.url ? "✅" : "❌",
    "mobile.data_uri": mobileArtifact?.data_uri ? "✅" : "❌",
    "mobile.url": mobileArtifact?.url ? "✅" : "❌",
    "Final desktopATF": desktopATF ? (desktopATF.startsWith("data:") ? "data URI" : `${desktopATF.substring(0, 50)}...`) : "null",
    "Final mobileATF": mobileATF ? (mobileATF.startsWith("data:") ? "data URI" : `${mobileATF.substring(0, 50)}...`) : "null",
  });

  // Show component even if only one screenshot is available
  if (!desktopATF && !mobileATF) return null;

  return (
    <section className="mt-6">
      <div className="mb-3">
        <div className="text-sm opacity-70">Visual Evidence</div>
        <h3 className="text-lg font-semibold">Above-the-fold Screenshots</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Desktop */}
        <div className="lg:col-span-2">
          <div className="text-sm opacity-70 mb-2">Desktop</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="aspect-[16/9] w-full relative">
              {desktopATF ? (
                <img
                  src={desktopATF}
                  alt="Desktop above-the-fold"
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                  onError={(e) => {
                    console.error("❌ Failed to load desktop screenshot:", desktopATF);
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-60 text-sm">
                  Desktop screenshot not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start">
          <div className="w-full max-w-[140px]">
            <div className="text-sm opacity-70 mb-2">Mobile</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="aspect-[9/19] w-full relative">
                {mobileATF ? (
                  <img
                    src={mobileATF}
                    alt="Mobile above-the-fold"
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                    onError={(e) => {
                      console.error("❌ Failed to load mobile screenshot:", mobileATF);
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 text-sm">
                    Mobile screenshot not available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



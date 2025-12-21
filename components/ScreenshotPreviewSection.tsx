"use client";

import React from "react";

type ScreenshotStatus = "ok" | "error";

type ScreenshotObj = {
  url?: string;
  path?: string;
  status?: string;
  error?: string | null;
  viewport?: [number, number];
  mode?: string;
};

type ScreenshotAny = string | ScreenshotObj | null | undefined;

type EvidencePayload = {
  viewport: "desktop" | "mobile";
  image_size: [number, number]; // w,h of the screenshot image
};

type Props = {
  title: string;
  src: string; // Enforce string at boundary - NO objects
  evidence?: EvidencePayload;
  status?: ScreenshotStatus;
  error?: string;
};

// Unified helper to extract path or URL from screenshot
const getScreenshotPathOrUrl = (s: ScreenshotAny): string => {
  if (!s) return "";
  if (typeof s === "string") return s;
  if (typeof s === "object") return s.url || s.path || "";
  return "";
};

import { getApiBase } from '@/src/lib/apiBase';

// Helper to build absolute URL from relative path
const buildAbsoluteUrl = (u: string): string => {
  if (!u) return "";
  if (u.startsWith("http") || u.startsWith("data:")) return u;
  
  // For client-side, use relative URLs (Next.js API routes)
  const base = getApiBase();
  if (!base) {
    // If no base URL, assume relative path works
    return u.startsWith('/') ? u : `/${u}`;
  }
  
  // Ensure single slash between base and path
  return `${base}/${u.replace(/^\//, "")}`;
};

// Main helper to get screenshot src URL
export const screenshotSrc = (s: ScreenshotAny): string => {
  return buildAbsoluteUrl(getScreenshotPathOrUrl(s));
};


export default function ScreenshotPreviewSection({ 
  title,
  src,
  evidence,
  status = "ok",
  error
}: Props) {
  // Guard: enforce string src
  if (!src || typeof src !== "string") {
    console.warn(`[shots] ${title} invalid src:`, { src, type: typeof src });
    return null;
  }
  
  // Normalize status to ensure it's "ok" or "error"
  const normalizedStatus = (status === "ok" || status === "error") ? status : (src ? "ok" : "error");
  const showImage = normalizedStatus === "ok" && src && src.length > 0;
  
  // Runtime debug logging
  React.useEffect(() => {
    console.log("[shots]", title, { 
      src, 
      status, 
      normalizedStatus,
      showImage,
      srcLength: src?.length || 0
    });
  }, [src, status, normalizedStatus, showImage, title]);


  // Determine aspect ratio and container classes based on viewport
  const isMobile = evidence?.viewport === "mobile" || title.toLowerCase().includes("mobile");
  const aspectClass = isMobile ? "aspect-[9/16]" : "aspect-[16/9]";
  const containerClass = isMobile ? "w-full max-w-[180px] mx-auto lg:mx-0" : "w-full";

  if (!showImage) {
    // Show placeholder if no valid src
    return (
      <div className={`relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 ${containerClass}`}>
        <div className={`relative w-full ${aspectClass} flex items-center justify-center p-8`}>
          <div className="text-center text-white/50">
            <p className="text-sm mb-2">📸 Screenshot not available</p>
            <p className="text-xs text-white/40">
              {status === "error" ? "Error loading screenshot" : "Screenshot URL missing"}
            </p>
            {error && (
              <p className="text-xs text-red-400/60 mt-2">{error}</p>
            )}
            <p className="text-xs text-yellow-400/60 mt-2">src: {src || "empty"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 ${containerClass}`}>
      <div className={`relative w-full ${aspectClass}`}>
        <img
          src={src}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
          onLoad={() => {
            console.log("✅ loaded", title, src);
          }}
          onError={(e) => {
            console.log("❌ error", title, src, e);
          }}
        />
      </div>
    </div>
  );
}

// Wrapper component for both desktop and mobile screenshots
export function ScreenshotPreviewSectionWrapper({
  desktop,
  mobile,
  desktopEvidence,
  mobileEvidence,
  desktopStatus = "ok",
  mobileStatus = "ok",
  desktopError
}: {
  desktop?: ScreenshotAny;
  mobile?: ScreenshotAny;
  desktopEvidence?: EvidencePayload;
  mobileEvidence?: EvidencePayload;
  desktopStatus?: ScreenshotStatus;
  mobileStatus?: ScreenshotStatus;
  desktopError?: string;
}) {
  // Compute src strings at boundary - NO objects passed
  const desktopSrc = screenshotSrc(desktop);
  const mobileSrc = screenshotSrc(mobile);
  
  return (
    <div className="mt-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-center lg:justify-start">
        {desktopSrc && (
          <ScreenshotPreviewSection
            title="Desktop – Above the fold"
            src={desktopSrc}
            evidence={desktopEvidence}
            status={desktopStatus}
            error={desktopError}
          />
        )}
        {mobileSrc && (
          <ScreenshotPreviewSection
            title="Mobile – Above the fold"
            src={mobileSrc}
            evidence={mobileEvidence}
            status={mobileStatus}
          />
        )}
      </div>
    </div>
  );
}


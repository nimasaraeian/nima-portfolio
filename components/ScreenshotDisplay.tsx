"use client";

import React, { useState, useEffect } from "react";
import DualScreenshotView from "./DualScreenshotView";
import { postJSON } from "@/lib/api";

type ScreenshotResponse = {
  screenshots?: {
    desktop?: {
      aboveFold?: string;
      url?: string;
    } | string;
    mobile?: {
      aboveFold?: string;
      url?: string;
    } | string;
  };
  screenshot?: {
    desktop?: string;
    mobile?: string;
    url?: string;
  };
};

type ScreenshotDisplayProps = {
  url?: string;
  desktop?: string;
  mobile?: string;
  title?: string;
  onScreenshotsFetched?: (screenshots: { desktop?: string; mobile?: string }) => void;
  autoFetch?: boolean;
  apiEndpoint?: string;
};

/**
 * کامپوننت نمایش اسکرین‌شات‌ها
 * می‌تواند اسکرین‌شات‌ها را از بک‌اند دریافت کند یا مستقیماً نمایش دهد
 */
export default function ScreenshotDisplay({
  url,
  desktop,
  mobile,
  title = "اسکرین‌شات‌ها",
  onScreenshotsFetched,
  autoFetch = false,
  apiEndpoint = "/api/brain/decision-engine/report-from-url"
}: ScreenshotDisplayProps) {
  const [screenshots, setScreenshots] = useState<{
    desktop?: string;
    mobile?: string;
  }>({
    desktop,
    mobile
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract screenshot URL from different response formats
  const extractScreenshotUrl = (screenshot: any): string => {
    if (!screenshot) return "";
    
    // Base64 data URL
    if (typeof screenshot === "string" && screenshot.startsWith("data:")) {
      return screenshot;
    }
    
    // Object with aboveFold property (new backend format)
    if (typeof screenshot === "object" && screenshot !== null) {
      return screenshot.aboveFold || screenshot.url || "";
    }
    
    // Direct string URL
    if (typeof screenshot === "string") {
      return screenshot;
    }
    
    return "";
  };

  // Fetch screenshots from backend
  const fetchScreenshots = async (targetUrl: string) => {
    if (!targetUrl) {
      setError("URL is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("📥 Fetching screenshots for URL:", targetUrl);
      
      const response = await postJSON<ScreenshotResponse>(
        apiEndpoint,
        {
          url: targetUrl.trim(),
          goal: "leads",
          locale: "fa"
        },
        180000 // 3 minutes timeout
      );

      console.log("✅ Screenshots response received:", response);

      // Extract screenshots from response
      const extractedScreenshots: { desktop?: string; mobile?: string } = {};

      // Try new format first (screenshots.desktop.aboveFold)
      if (response?.screenshots) {
        extractedScreenshots.desktop = extractScreenshotUrl(
          response.screenshots.desktop
        );
        extractedScreenshots.mobile = extractScreenshotUrl(
          response.screenshots.mobile
        );
      }

      // Fallback to old format (screenshot.desktop)
      if (!extractedScreenshots.desktop && response?.screenshot) {
        extractedScreenshots.desktop = extractScreenshotUrl(
          response.screenshot.desktop || response.screenshot.url
        );
        extractedScreenshots.mobile = extractScreenshotUrl(
          response.screenshot.mobile
        );
      }

      console.log("📥 Extracted screenshots:", {
        desktop: extractedScreenshots.desktop ? `${extractedScreenshots.desktop.substring(0, 50)}...` : "NOT FOUND",
        mobile: extractedScreenshots.mobile ? `${extractedScreenshots.mobile.substring(0, 50)}...` : "NOT FOUND"
      });

      if (!extractedScreenshots.desktop && !extractedScreenshots.mobile) {
        throw new Error("هیچ اسکرین‌شاتی در پاسخ دریافت نشد");
      }

      setScreenshots(extractedScreenshots);

      // Notify parent component
      if (onScreenshotsFetched) {
        onScreenshotsFetched(extractedScreenshots);
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "خطا در دریافت اسکرین‌شات‌ها";
      console.error("❌ Error fetching screenshots:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch if URL is provided and autoFetch is enabled
  useEffect(() => {
    if (autoFetch && url && !desktop && !mobile && !isLoading) {
      // Reset previous screenshots and errors when URL changes
      setScreenshots({});
      setError(null);
      fetchScreenshots(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, autoFetch]);

  // Update screenshots when props change
  useEffect(() => {
    if (desktop || mobile) {
      setScreenshots({ desktop, mobile });
    }
  }, [desktop, mobile]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p className="text-sm text-white/70">در حال دریافت اسکرین‌شات‌ها...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mt-6 w-full rounded-xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm font-medium text-red-400 mb-2">خطا</p>
        <p className="text-sm text-red-300">{error}</p>
        {url && (
          <button
            onClick={() => fetchScreenshots(url)}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition text-sm"
          >
            تلاش مجدد
          </button>
        )}
      </div>
    );
  }

  // Show screenshots
  return (
    <div className="w-full">
      <DualScreenshotView
        desktop={screenshots.desktop}
        mobile={screenshots.mobile}
        title={title}
      />
    </div>
  );
}


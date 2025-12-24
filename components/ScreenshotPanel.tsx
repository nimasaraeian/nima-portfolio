"use client";

import React from "react";

type ScreenshotPanelProps = {
  data?: any;
};

/**
 * ScreenshotPanel - Displays desktop and mobile above-the-fold screenshots
 * Hard-enforces ATF URLs ONLY (never uses full_page)
 * Forces top anchoring with inline styles
 */
export default function ScreenshotPanel({ data }: ScreenshotPanelProps) {
  // Extract ATF URLs - check both snake_case and camelCase, NEVER use full_page
  const desktopATF =
    data?.capture?.screenshots?.desktop?.above_the_fold ??
    data?.capture?.screenshots?.desktop?.aboveFold ??
    (typeof data?.screenshots?.desktop === 'object' && data?.screenshots?.desktop !== null
      ? (data.screenshots.desktop as any).above_the_fold ?? (data.screenshots.desktop as any).aboveFold
      : undefined) ??
    (typeof data?.screenshots?.desktop === 'string' ? data.screenshots.desktop : undefined) ??
    null;

  const mobileATF =
    data?.capture?.screenshots?.mobile?.above_the_fold ??
    data?.capture?.screenshots?.mobile?.aboveFold ??
    (typeof data?.screenshots?.mobile === 'object' && data?.screenshots?.mobile !== null
      ? (data.screenshots.mobile as any).above_the_fold ?? (data.screenshots.mobile as any).aboveFold
      : undefined) ??
    (typeof data?.screenshots?.mobile === 'string' ? data.screenshots.mobile : undefined) ??
    null;

  if (!desktopATF && !mobileATF) return null;

  const dev = process.env.NODE_ENV !== "production";

  return (
    <section className="mt-6">
      <div className="mb-3">
        <div className="text-sm opacity-70">Visual Evidence</div>
        <h3 className="text-lg font-semibold">Above-the-fold Screenshots</h3>

        {dev && (
          <div className="mt-2 text-xs opacity-60 break-all">
            <div>desktopATF: {String(desktopATF)}</div>
            <div>mobileATF: {String(mobileATF)}</div>
            <div className="mt-1 text-red-400">
              {desktopATF?.includes('full') || mobileATF?.includes('full') 
                ? '⚠️ WARNING: Using full_page URL instead of ATF!' 
                : '✅ Using ATF URLs'}
            </div>
          </div>
        )}
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
                  alt="Desktop above-the-fold screenshot"
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    top: 0,
                    left: 0,
                  }}
                  onError={(e) => {
                    console.error("❌ Failed to load desktop screenshot:", desktopATF);
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".screenshot-error")) {
                      const errorDiv = document.createElement("div");
                      errorDiv.className = "screenshot-error absolute inset-0 flex items-center justify-center opacity-60 text-sm";
                      errorDiv.textContent = "Desktop screenshot not available";
                      parent.appendChild(errorDiv);
                    }
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
                  alt="Mobile above-the-fold screenshot"
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    top: 0,
                    left: 0,
                  }}
                  onError={(e) => {
                    console.error("❌ Failed to load mobile screenshot:", mobileATF);
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".screenshot-error")) {
                      const errorDiv = document.createElement("div");
                      errorDiv.className = "screenshot-error absolute inset-0 flex items-center justify-center opacity-60 text-sm";
                      errorDiv.textContent = "Mobile screenshot not available";
                      parent.appendChild(errorDiv);
                    }
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

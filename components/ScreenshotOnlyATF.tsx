"use client";

import React from "react";

export function ScreenshotOnlyATF({ data }: { data: any }) {
  // Extract ATF URLs from multiple possible paths (NEVER use full_page)
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

  // Debug in development
  if (process.env.NODE_ENV !== "production") {
    console.log("📸 ScreenshotOnlyATF data paths:", {
      "capture.desktop.above_the_fold": data?.capture?.screenshots?.desktop?.above_the_fold ? "✅" : "❌",
      "capture.desktop.aboveFold": data?.capture?.screenshots?.desktop?.aboveFold ? "✅" : "❌",
      "screenshots.desktop": typeof data?.screenshots?.desktop,
      "capture.mobile.above_the_fold": data?.capture?.screenshots?.mobile?.above_the_fold ? "✅" : "❌",
      "capture.mobile.aboveFold": data?.capture?.screenshots?.mobile?.aboveFold ? "✅" : "❌",
      "screenshots.mobile": typeof data?.screenshots?.mobile,
      "Final desktopATF": desktopATF ? `${desktopATF.substring(0, 50)}...` : "null",
      "Final mobileATF": mobileATF ? `${mobileATF.substring(0, 50)}...` : "null",
    });
  }

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



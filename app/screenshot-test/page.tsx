"use client";

import { useState } from "react";
import ScreenshotDisplay from "@/components/ScreenshotDisplay";

/**
 * صفحه تست برای نمایش اسکرین‌شات‌ها
 * این صفحه نشان می‌دهد که چگونه می‌توان اسکرین‌شات‌ها را از بک‌اند دریافت کرد
 */
export default function ScreenshotTestPage() {
  const [url, setUrl] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setShouldFetch(true);
    }
  };

  const handleReset = () => {
    setUrl("");
    setShouldFetch(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
            تست نمایش اسکرین‌شات‌ها
          </h1>
          <p className="text-sm text-white/70">
            یک URL وارد کنید تا اسکرین‌شات‌های دسکتاپ و موبایل از بک‌اند دریافت و نمایش داده شوند
          </p>
        </header>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                آدرس صفحه
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setShouldFetch(false);
                }}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
                disabled={shouldFetch}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!url.trim() || shouldFetch}
                className="flex-1 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                دریافت اسکرین‌شات
              </button>
              
              {shouldFetch && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition text-sm"
                >
                  بازنشانی
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Screenshot Display */}
        {shouldFetch && url && (
          <div className="mt-6" key={url}>
            <ScreenshotDisplay
              url={url}
              autoFetch={true}
              title="اسکرین‌شات‌های صفحه"
              onScreenshotsFetched={(screenshots) => {
                console.log("✅ اسکرین‌شات‌ها دریافت شدند:", {
                  desktop: screenshots.desktop ? "موجود" : "ندارد",
                  mobile: screenshots.mobile ? "موجود" : "ندارد"
                });
              }}
            />
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">
            📖 نحوه استفاده
          </h3>
          <div className="space-y-2 text-sm text-blue-200/90">
            <p>
              • کامپوننت <code className="bg-blue-500/20 px-2 py-1 rounded">ScreenshotDisplay</code> به طور خودکار اسکرین‌شات‌ها را از بک‌اند دریافت می‌کند
            </p>
            <p>
              • اسکرین‌شات‌های دسکتاپ و موبایل به صورت جداگانه نمایش داده می‌شوند
            </p>
            <p>
              • در موبایل، اسکرین‌شات‌ها به صورت عمودی (روی هم) نمایش داده می‌شوند
            </p>
            <p>
              • در دسکتاپ، اسکرین‌شات‌ها کنار هم نمایش داده می‌شوند
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


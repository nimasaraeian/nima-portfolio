'use client';

import { useState } from "react";

export interface AudioSummaryProps {
  /**
   * خلاصه مقاله برای حالت تولید خودکار با OpenAI TTS
   * اگر این مقدار را بدهی و src ندهی، دکمه "Generate & Listen" نمایش داده می‌شود.
   */
  summaryText?: string;
  /**
   * مسیر یک فایل صوتی آماده (مثلاً /audio/slug-summary.mp3)
   * اگر این مقدار را بدهی، کامپوننت فقط پلیر را نمایش می‌دهد و هیچ هزینه API ندارد.
   */
  src?: string;
  /**
   * متن تیتر اختیاری بالای پلیر
   */
  title?: string;
}

export default function AudioSummary({ summaryText, src, title }: AudioSummaryProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heading = title ?? "🎧 Audio Summary of this article";

  const handleGenerate = async () => {
    if (!summaryText || !summaryText.trim()) {
      setError("خلاصه‌ای برای تولید صوتی تعریف نشده است.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/article-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summaryText }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (e: any) {
      console.error(e);
      setError("مشکلی در تولید فایل صوتی پیش آمد.");
    } finally {
      setLoading(false);
    }
  };

  const finalSrc = src ?? audioUrl ?? undefined;

  return (
    <div className="mt-12 border-t border-slate-800 pt-6">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        {heading}
      </h3>

      {/* حالت استاتیک: اگر src داده شده باشد، فقط پلیر (بدون دکمه دانلود برای کاربر نهایی) */}
      {src && (
        <div className="space-y-3">
          <audio controls src={src} className="w-full" controlsList="nodownload">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* حالت داینامیک: اگر src نداریم و summaryText داریم */}
      {!src && summaryText && !finalSrc && (
        <>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Generating audio..." : "Generate & Listen"}
          </button>

          {error && (
            <p className="text-xs text-red-400 mt-2">
              {error}
            </p>
          )}
        </>
      )}

      {/* پلیر برای حالت داینامیک بعد از تولید (بدون دکمه دانلود برای کاربر) */}
      {!src && finalSrc && (
        <div className="mt-4">
          <audio controls src={finalSrc} className="w-full" controlsList="nodownload">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}


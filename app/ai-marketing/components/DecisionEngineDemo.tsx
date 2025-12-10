"use client";

import React, { useState } from "react";

type DecisionResult = {
  decision_blocker: string;
  why: string;
  where: string;
  what_to_change_first: string;
  expected_decision_lift: string;
};

export default function DecisionEngineDemo() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setContent("");
      setUrl("");
      setError(null);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setResult(null);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl) {
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setError(null);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);

    if (url.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/brain/decision-engine-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url.trim() }),
        });

        if (!response.ok) {
          let errorMessage = "Request failed";
          try {
            const text = await response.text();
            try {
              const errorData = JSON.parse(text);
              errorMessage = errorData.detail || errorData.error || text;
            } catch {
              errorMessage = text || "Request failed";
            }
          } catch {
            errorMessage = "Failed to analyze URL. Please try again.";
          }
          setError(errorMessage);
          return;
        }

        const data = (await response.json()) as DecisionResult;
        setResult(data);
      } catch (err: any) {
        console.error("[DecisionDemo] error:", err);
        setError(err.message || "Failed to analyze URL. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (imageFile) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch("/api/brain/decision-engine-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let errorMessage = "Request failed";
          try {
            const text = await response.text();
            try {
              const errorData = JSON.parse(text);
              errorMessage = errorData.detail || errorData.error || text;
            } catch {
              errorMessage = text || "Request failed";
            }
          } catch {
            errorMessage = "Failed to analyze image. Please try again.";
          }
          setError(errorMessage);
          return;
        }

        const data = (await response.json()) as DecisionResult;
        setResult(data);
      } catch (err: any) {
        console.error("[DecisionDemo] error:", err);
        setError(err.message || "Failed to analyze image. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!content.trim()) {
      setError("Please paste the decision part of your page, upload an image, or enter a URL.");
      return;
    }

    if (content.trim().length < 20) {
      setError("Please provide more content. Include pricing, CTAs, guarantees, or other decision-critical elements.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/brain/decision-engine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        let errorMessage = "Request failed";
        try {
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.detail || errorData.error || text;
          } catch {
            errorMessage = text || "Request failed";
          }
        } catch {
          errorMessage = "Failed to analyze decision. Please try again.";
        }
        setError(errorMessage);
        return;
      }

      const data = (await response.json()) as DecisionResult;
      setResult(data);
    } catch (err: any) {
      console.error("[DecisionDemo] error:", err);
      setError(err.message || "Failed to analyze decision. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Decision section
              {imageFile && <span className="text-gray-400 text-xs ml-2">(Image mode)</span>}
              {url && !imageFile && <span className="text-gray-400 text-xs ml-2">(URL mode)</span>}
            </label>
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com/pricing"
              className={`w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                imageFile || content ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!!imageFile || !!content || isLoading}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-slate-800/40 transition ${
              url || content 
                ? "border-slate-700 opacity-50 cursor-not-allowed" 
                : "border-slate-700 hover:border-indigo-500 cursor-pointer"
            }`}>
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 text-xs"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading || !!url || !!content}
              />
            </label>
          </div>

          {/* Text Input */}
          <div className="relative">
            <textarea
              className={`w-full h-40 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical ${
                imageFile || url ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="Example: 'Premium Plan - $99/month. 30-day money-back guarantee. No credit card required. Cancel anytime. Start your free trial today!'"
              value={content}
              onChange={(e) => {
                const newContent = e.target.value;
                setContent(newContent);
                if (newContent) {
                  setUrl("");
                  setImageFile(null);
                  setImagePreview(null);
                  setError(null);
                  setResult(null);
                }
              }}
              disabled={!!imageFile || !!url || isLoading}
            />
            {(imageFile || url) && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 rounded-lg">
                <p className="text-sm text-gray-400">
                  {imageFile ? "Text input disabled when image is uploaded" : "Text input disabled when URL is entered"}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Analyzing…" : "Run Decision Friction Analysis"}
            </button>
            <button
              type="button"
              onClick={() => {
                setContent("Premium Plan - $99/month\n\n✅ 30-day money-back guarantee\n✅ No credit card required for trial\n✅ Cancel anytime, no questions asked\n✅ Full access to all features\n\nStart your free 14-day trial today!\n\n[Sign Up Now]");
                setImageFile(null);
                setImagePreview(null);
                setUrl("");
                setError(null);
              }}
              disabled={isLoading || !!imageFile || !!url}
              className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              Try Example
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 space-y-2">
              <p className="text-sm font-medium text-red-400">Analysis Error</p>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="border border-slate-800 rounded-xl bg-slate-800/70 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Decision Blocker</p>
                  <p className="mt-1 text-lg font-semibold text-white">{result.decision_blocker}</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs text-gray-300">
                  Location: <span className="ml-1 font-medium">{result.where}</span>
                </span>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Why users hesitate</p>
                <p className="text-sm text-gray-200 leading-relaxed">{result.why}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">What to change first</p>
                <div className="mt-1 rounded-lg bg-slate-700/80 px-4 py-3 text-sm text-white">
                  {result.what_to_change_first}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Expected decision lift</p>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-3 py-1 text-xs">
                    {result.expected_decision_lift}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 max-w-[220px] text-right">
                  Not a guarantee. This is a directional estimate based on psychological friction, not analytics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}


"use client";

import React, { useState, useRef } from "react";

type EvidenceMode = "url" | "image" | "text";

type DecisionEvidenceFormProps = {
  onSubmit: (data: {
    mode: EvidenceMode;
    url?: string;
    image?: File;
    text?: string;
    goal: string;
    rawResponse?: any; // Optional: pre-fetched response to avoid duplicate calls
    expertMode?: boolean;
  }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onRequestSent?: () => void; // Callback when request is sent
  expertMode?: boolean;
};

const GOAL_OPTIONS = [
  { value: "leads", label: "Leads" },
  { value: "signup", label: "Signup" },
  { value: "purchase", label: "Purchase" },
  { value: "demo", label: "Demo" },
];

export default function DecisionEvidenceForm({
  onSubmit,
  isLoading,
  error,
  onRequestSent,
  expertMode = false,
}: DecisionEvidenceFormProps) {
  const [mode, setMode] = useState<EvidenceMode>("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("leads");
  const [customGoal, setCustomGoal] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
        alert("Please select a valid image file (PNG, JPEG, or WebP)");
        return;
      }
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Direct analyze handler with explicit fetch calls and logging
  const handleAnalyze = async () => {
    setLocalError(null);
    setIsRequestSent(false);

    const finalGoal = customGoal.trim() || goal;
    const trimmedUrl = url.trim();
    const trimmedText = text.trim();

    // Log start
    console.log("[ANALYZE] start", {
      mode,
      url: mode === "url" ? trimmedUrl : undefined,
      goal: finalGoal,
      hasImage: mode === "image" ? !!imageFile : false,
      hasText: mode === "text" ? trimmedText.length : 0,
      urlLength: trimmedUrl.length,
      textLength: trimmedText.length,
    });

    // Validate inputs
    if (mode === "url") {
      if (!trimmedUrl || trimmedUrl.length <= 5) {
        const errorMsg = "URL must be at least 5 characters long";
        console.log("[ANALYZE] invalid state - URL too short", { urlLength: trimmedUrl.length });
        setLocalError(errorMsg);
        return;
      }
    } else if (mode === "image") {
      if (!imageFile) {
        const errorMsg = "Please select an image file";
        console.log("[ANALYZE] invalid state - no image file");
        setLocalError(errorMsg);
        return;
      }
    } else if (mode === "text") {
      if (!trimmedText || trimmedText.length <= 10) {
        const errorMsg = "Text must be at least 10 characters long";
        console.log("[ANALYZE] invalid state - text too short", { textLength: trimmedText.length });
        setLocalError(errorMsg);
        return;
      }
    }

    // Set request sent state
    setIsRequestSent(true);
    if (onRequestSent) {
      onRequestSent();
    }

    try {
      let endpoint: string;
      let requestBody: any;
      let headers: HeadersInit = {};

      // Determine endpoint and prepare request
      if (mode === "url") {
        // Force the stable proxy endpoint (avoids older decision-scan path)
        endpoint = `/api/analyze/url-human-advanced?expert=true&verbosity=full`;
        requestBody = {
          url: trimmedUrl,
          goal: finalGoal,
          locale: "en",
          custom_goal: customGoal.trim(),
        };
        headers["Content-Type"] = "application/json";
        console.log("[ANALYZE] request", { endpoint, body: { url: trimmedUrl, goal: finalGoal, locale: "en" } });
      } else if (mode === "image") {
        endpoint = "/api/proxy/analyze-human";
        const formData = new FormData();
        formData.append("goal", finalGoal);
        formData.append("image", imageFile!);
        requestBody = formData;
        // Don't set Content-Type header for FormData - browser sets it with boundary
        console.log("[ANALYZE] request", { endpoint, body: { goal: finalGoal, imageFileName: imageFile!.name, imageSize: imageFile!.size } });
      } else {
        // text mode
        endpoint = "/api/proxy/analyze-human";
        const formData = new FormData();
        formData.append("goal", finalGoal);
        formData.append("text", trimmedText);
        requestBody = formData;
        console.log("[ANALYZE] request", { endpoint, body: { goal: finalGoal, textLength: trimmedText.length } });
      }

      // Make the fetch request
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: mode === "url" ? JSON.stringify(requestBody) : requestBody,
      });

      console.log("[ANALYZE] response status", res.status, res.statusText);

      if (!res.ok) {
        const errorText = await res.text();
        let errorDetail: string;
        try {
          const errorJson = JSON.parse(errorText);
          errorDetail = errorJson.detail || errorJson.error || errorText;
        } catch {
          errorDetail = errorText || `HTTP ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorDetail);
      }

      const responseText = await res.text();
      let responseData: any;
      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseData = responseText;
      }

      if (res.status !== 200) {
        const errorPayload =
          typeof responseData === "object" && responseData !== null
            ? responseData.detail || responseData.error
            : responseData;
        const errorMessage =
          errorPayload || `HTTP ${res.status}: ${res.statusText}`;
        throw new Error(errorMessage);
      }

      // Dev-only diagnostics for endpoint + payload size
      if (process.env.NODE_ENV !== "production") {
        const responseString = responseText;
        console.log("[ANALYZE] response success", { 
          status: res.status, 
          hasData: !!responseData,
          keys: responseData && typeof responseData === "object" ? Object.keys(responseData) : [],
          endpoint,
          responseBytes: responseString ? responseString.length : 0,
        });
      }

      // Call the parent onSubmit handler with the data and pre-fetched response
      // This avoids duplicate API calls since we've already fetched the data
      await onSubmit({
        mode,
        url: mode === "url" ? trimmedUrl : undefined,
        text: mode === "text" ? trimmedText : undefined,
        image: mode === "image" ? imageFile || undefined : undefined,
        goal: finalGoal,
        rawResponse: responseData, // Pass the response to avoid duplicate fetch
        expertMode: true,
      });

    } catch (err: any) {
      console.error("[ANALYZE] failed", err);
      const errorMessage = err?.message || String(err) || "Analyze failed";
      setLocalError(errorMessage);
      setIsRequestSent(false);
      // Re-throw so parent can handle it too
      throw err;
    } finally {
      setIsRequestSent(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await handleAnalyze();
    } catch (err) {
      // Error already handled in handleAnalyze (localError set)
      // Re-throw so parent can also handle it
      throw err;
    }
  };

  const handleModeChange = (newMode: EvidenceMode) => {
    setMode(newMode);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Evidence Intake
        </h2>
        <p className="text-sm text-white/70">
          Submit a URL, image, or text for decision analysis
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {(["url", "image", "text"] as EvidenceMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleModeChange(m)}
            className={`px-4 py-2 text-sm font-medium transition ${
              mode === m
                ? "text-white border-b-2 border-white"
                : "text-white/60 hover:text-white/80"
            }`}
            disabled={isLoading}
          >
            {m === "url" ? "URL" : m === "image" ? "Image" : "Text"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Mode */}
        {mode === "url" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
              disabled={isLoading}
              required
            />
          </div>
        )}

        {/* Image Mode */}
        {mode === "image" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Image Upload
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
              disabled={isLoading}
              required
            />
            {imagePreview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-white/10 max-w-md">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        )}

        {/* Text Mode */}
        {mode === "text" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Text Message
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              rows={6}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 resize-y"
              disabled={isLoading}
              required
            />
          </div>
        )}

        {/* Goal Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Goal
          </label>
          <div className="flex gap-2">
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              disabled={isLoading}
            >
              {GOAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Custom goal (optional)"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isLoading || isRequestSent}
          className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isRequestSent ? "Request sent…" : isLoading ? "Analyzing…" : "Analyze"}
        </button>

        {/* Request Sent Indicator */}
        {isRequestSent && !isLoading && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3">
            <p className="text-sm text-blue-300">Request sent to server. Waiting for response...</p>
          </div>
        )}

        {/* Error Message */}
        {(error || localError) && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm font-medium text-red-400 mb-2">Error</p>
            <div className="text-sm text-red-300 whitespace-pre-wrap break-words">
              {typeof (error || localError) === "string"
                ? (error || localError || "").split("\n").map((line, index) => (
                    <p key={index} className={index > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))
                : String(error || localError)}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}




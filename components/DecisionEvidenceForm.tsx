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
  }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
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
}: DecisionEvidenceFormProps) {
  const [mode, setMode] = useState<EvidenceMode>("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("leads");
  const [customGoal, setCustomGoal] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate based on mode
    if (mode === "url" && !url.trim()) {
      return;
    }
    if (mode === "text" && !text.trim()) {
      return;
    }
    if (mode === "image" && !imageFile) {
      return;
    }

    const finalGoal = customGoal.trim() || goal;

    await onSubmit({
      mode,
      url: mode === "url" ? url.trim() : undefined,
      text: mode === "text" ? text.trim() : undefined,
      image: mode === "image" ? imageFile || undefined : undefined,
      goal: finalGoal,
    });
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
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Analyzing…" : "Analyze"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm font-medium text-red-400 mb-2">Error</p>
            <div className="text-sm text-red-300 whitespace-pre-wrap break-words">
              {typeof error === "string"
                ? error.split("\n").map((line, index) => (
                    <p key={index} className={index > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))
                : String(error)}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}




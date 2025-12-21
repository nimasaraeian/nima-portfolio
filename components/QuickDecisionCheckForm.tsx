"use client";

import { useState } from "react";

export default function QuickDecisionCheckForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasFile, setHasFile] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setOk(null);
    setError(null);

    try {
      const fd = new FormData(e.currentTarget);

      const res = await fetch("/api/quick-check", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setOk(false);
        setError(data?.error || "Something went wrong.");
      } else {
        setOk(true);
        setHasFile(false);
        e.currentTarget.reset();
      }
    } catch {
      setOk(false);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Paste text / describe the issue {hasFile ? "(optional)" : "(required)"}
        </label>
        <textarea
          name="message"
          required={!hasFile}
          minLength={hasFile ? 0 : 10}
          className="min-h-[140px] rounded-xl border border-white/20 bg-black/40 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
          placeholder="Paste your headline/CTA or describe what you want reviewed..."
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Upload image or PDF (optional) — PNG/JPG/WEBP/PDF (max 5MB)
        </label>
        <input
          name="file"
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          onChange={(e) => setHasFile(!!(e.target.files && e.target.files.length > 0))}
          className="rounded-xl border border-white/20 bg-black/40 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full border border-white/50 bg-white/10 text-white px-6 py-3 text-sm font-semibold hover:bg-white/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
      >
        {isSubmitting ? "Sending..." : "Send for Quick Check"}
      </button>

      {ok === true && (
        <p className="text-sm text-green-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Sent ✅ I'll review it and reply.
        </p>
      )}
      {ok === false && (
        <p className="text-sm text-red-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Failed ❌ {error}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-400" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        This is a high-level decision review, not a full CRO audit or psychological assessment.
      </p>
    </form>
  );
}


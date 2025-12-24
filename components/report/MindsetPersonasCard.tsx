"use client";

import React, { useState } from "react";

type MindsetPersona = {
  id: "hesitant" | "curious" | "ready" | string;
  title?: string;
  signal?: string;
  goal?: string;
  best_cta?: string;
  next_step?: string;
};

type MindsetPersonasData = MindsetPersona[];

export default function MindsetPersonasCard({ data }: { data?: MindsetPersonasData }) {
  const [activeTab, setActiveTab] = useState<"hesitant" | "curious" | "ready">("hesitant");
  const [copySuccess, setCopySuccess] = useState(false);

  if (!data || data.length < 1) return null;

  // Find personas by ID
  const hesitant = data.find((p) => p.id === "hesitant");
  const curious = data.find((p) => p.id === "curious");
  const ready = data.find((p) => p.id === "ready");

  // Determine available tabs
  const availableTabs = [
    hesitant && "hesitant",
    curious && "curious",
    ready && "ready",
  ].filter(Boolean) as ("hesitant" | "curious" | "ready")[];

  if (availableTabs.length === 0) return null;

  // Set default tab to first available
  const currentPersona = data.find((p) => p.id === activeTab) || data.find((p) => availableTabs.includes(p.id as any)) || data[0];

  const handleCopyCTA = async () => {
    if (currentPersona?.best_cta) {
      await navigator.clipboard.writeText(currentPersona.best_cta);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Mindset Personas</h3>

      {/* Tabs */}
      {availableTabs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {hesitant && (
            <button
              onClick={() => setActiveTab("hesitant")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "hesitant"
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/5"
              }`}
            >
              {hesitant.title || "Hesitant"}
            </button>
          )}
          {curious && (
            <button
              onClick={() => setActiveTab("curious")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "curious"
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/5"
              }`}
            >
              {curious.title || "Curious"}
            </button>
          )}
          {ready && (
            <button
              onClick={() => setActiveTab("ready")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "ready"
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/5"
              }`}
            >
              {ready.title || "Ready"}
            </button>
          )}
        </div>
      )}

      {/* Persona Content */}
      {currentPersona && (
        <div className="space-y-4">
          {currentPersona.signal && (
            <div>
              <p className="text-xs font-medium text-white/70 mb-1">Signal</p>
              <p className="text-sm text-white/90">{currentPersona.signal}</p>
            </div>
          )}

          {currentPersona.goal && (
            <div>
              <p className="text-xs font-medium text-white/70 mb-1">Goal</p>
              <p className="text-sm text-white/90">{currentPersona.goal}</p>
            </div>
          )}

          {currentPersona.best_cta && (
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-xs font-medium text-white/70">Best CTA</p>
                <button
                  onClick={handleCopyCTA}
                  className="text-xs text-white/60 hover:text-white/80 transition px-2 py-1 rounded border border-white/10 hover:bg-white/5"
                >
                  {copySuccess ? "Copied!" : "Copy best CTA"}
                </button>
              </div>
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                <p className="text-sm font-medium text-blue-200">{currentPersona.best_cta}</p>
              </div>
            </div>
          )}

          {currentPersona.next_step && (
            <div>
              <p className="text-xs font-medium text-white/70 mb-1">Next Step</p>
              <p className="text-sm text-white/90">{currentPersona.next_step}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


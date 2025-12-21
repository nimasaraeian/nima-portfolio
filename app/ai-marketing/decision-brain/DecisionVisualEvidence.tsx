"use client";

import React, { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

type ScreenshotData = {
  hero?: string;
  full?: string;
  desktop?: string;
  mobile?: string;
  desktop_fold?: string;
  mobile_fold?: string;
  desktop_full?: string;
  mobile_full?: string;
};

type DecisionSignals = {
  clarity?: "Low" | "Medium" | "High" | number;
  trust?: "Low" | "Medium" | "High" | number;
  friction?: "Low" | "Medium" | "High" | number;
};

type UXMetrics = {
  fcp_ms?: number;
  lcp_ms?: number;
  tti_ms?: number;
  tbt_ms?: number;
  cls?: number;
  speed_index?: number;
};

type CategoryAnalysis = {
  social?: number;
  mobile?: number;
  onPage?: number;
  desktop?: number;
  backlinks?: number;
};

type Props = {
  screenshots?: ScreenshotData;
  signals?: DecisionSignals;
  categories?: CategoryAnalysis;
  score?: number;
  issues?: {
    ok?: number;
    warnings?: number;
    errors?: number;
  };
  uxMetrics?: UXMetrics;
};

import { getApiBase } from '@/src/lib/apiBase';

// Helper to convert relative URLs to absolute
const toAbsolute = (u: string | undefined): string => {
  if (!u) return "";
  if (u.startsWith("http") || u.startsWith("data:")) return u;
  
  const base = getApiBase();
  if (!base) {
    // If no base URL, assume relative path works
    return u.startsWith('/') ? u : `/${u}`;
  }
  
  return `${base}${u}`;
};

// Helper functions
const hasAny = (obj?: Record<string, any>) =>
  !!obj && Object.values(obj).some((v) => v !== null && v !== undefined && v !== "");

// Metric formatters
const ms = (v?: number) => (typeof v === "number" ? `${(v / 1000).toFixed(1)}s` : "—");
const num = (v?: number) => (typeof v === "number" ? v.toString() : "—");
const cls = (v?: number) => (typeof v === "number" ? v.toFixed(2) : "—");

export default function DecisionVisualEvidence({ 
  screenshots, 
  signals, 
  categories,
  score,
  issues,
  uxMetrics
}: Props) {
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('mobile');

  // Prepare radar chart data
  const radarData = categories ? [
    { category: 'Social', value: categories.social || 0 },
    { category: 'Mobile', value: categories.mobile || 0 },
    { category: 'On-page', value: categories.onPage || 0 },
    { category: 'Desktop', value: categories.desktop || 0 },
    { category: 'Backlinks', value: categories.backlinks || 0 },
  ] : [];


  return (
    <div className="mt-6 space-y-6">
      {/* Categories Analysis - Only show if has data */}
      {hasAny(categories) && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm opacity-80 mb-4">Decision Categories Analysis</div>
          
          {radarData.length > 0 && (
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <Radar
                    name="Value"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {issues && (
            <div className="flex gap-2 mt-4">
              <div className="flex-1 bg-green-500/20 border border-green-500/30 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-green-400">{issues.ok || 0}</div>
                <div className="text-xs text-green-300">Ok</div>
              </div>
              <div className="flex-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-yellow-400">{issues.warnings || 0}</div>
                <div className="text-xs text-yellow-300">Warnings</div>
              </div>
              <div className="flex-1 bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-red-400">{issues.errors || 0}</div>
                <div className="text-xs text-red-300">Errors</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* UX & Performance Metrics - Only show if has real data */}
      {hasAny(uxMetrics) && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm font-medium opacity-90">UX & Performance Metrics</div>
            </div>
            <div className="flex gap-2 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1 text-xs rounded transition ${
                  deviceView === 'mobile'
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1 text-xs rounded transition ${
                  deviceView === 'desktop'
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="text-green-400">✓</div>
              <div>
                <div className="text-xs opacity-60">First Contentful Paint</div>
                <div className="text-sm font-semibold">{ms(uxMetrics?.fcp_ms)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-green-400">✓</div>
              <div>
                <div className="text-xs opacity-60">Speed Index</div>
                <div className="text-sm font-semibold">{num(uxMetrics?.speed_index)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-green-400">✓</div>
              <div>
                <div className="text-xs opacity-60">Largest Contentful Paint</div>
                <div className="text-sm font-semibold">{ms(uxMetrics?.lcp_ms)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-green-400">✓</div>
              <div>
                <div className="text-xs opacity-60">Time to Interactive</div>
                <div className="text-sm font-semibold">{ms(uxMetrics?.tti_ms)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-green-400">✓</div>
              <div>
                <div className="text-xs opacity-60">Total Blocking Time</div>
                <div className="text-sm font-semibold">{ms(uxMetrics?.tbt_ms)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-green-400">✓</div>
              <div>
                <div className="text-xs opacity-60">Cumulative Layout Shift</div>
                <div className="text-sm font-semibold">{cls(uxMetrics?.cls)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

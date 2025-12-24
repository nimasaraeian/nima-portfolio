"use client";

import React from "react";

type CostOfInactionData = {
  headline?: string;
  bullets?: string[];
  metric_hint?: string;
};

export default function CostOfInactionCard({ data }: { data?: CostOfInactionData }) {
  if (!data || (!data.headline && !data.bullets?.length)) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      {data.headline && (
        <h3 className="text-lg font-semibold text-white">{data.headline}</h3>
      )}

      {data.bullets && data.bullets.length > 0 && (
        <ul className="space-y-2">
          {data.bullets.slice(0, 3).map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
              <span className="text-red-400 mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {data.metric_hint && (
        <p className="text-xs text-white/50 italic">{data.metric_hint}</p>
      )}
    </div>
  );
}


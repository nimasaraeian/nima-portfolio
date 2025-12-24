"use client";

import React from "react";

type SignatureInsightData = {
  headline?: string;
  insight?: string;
  why_now?: string;
  micro_risk_reducer?: string;
};

export default function SignatureInsightCard({ data }: { data?: SignatureInsightData }) {
  if (!data || (!data.headline && !data.insight)) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      {data.headline && (
        <h3 className="text-xl font-semibold text-white">{data.headline}</h3>
      )}
      
      {data.insight && (
        <p className="text-sm leading-relaxed text-white/90">{data.insight}</p>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {data.why_now && (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium text-white/70 mb-1">Why Now</p>
            <p className="text-sm text-white/90">{data.why_now}</p>
          </div>
        )}

        {data.micro_risk_reducer && (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium text-white/70 mb-1">Risk Reducer</p>
            <p className="text-sm text-white/90">{data.micro_risk_reducer}</p>
          </div>
        )}
      </div>
    </div>
  );
}


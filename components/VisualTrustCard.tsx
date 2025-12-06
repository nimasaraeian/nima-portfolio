import { Shield } from "lucide-react";
import type { VisualTrustAnalysis } from "@/app/ai-marketing/brain-types";

type Props = {
  data?: VisualTrustAnalysis | null;
};

const toPercent = (value?: number | null) => {
  if (typeof value !== "number" || isNaN(value)) {
    return 0;
  }
  if (value > 1 && value <= 100) return Math.round(value);
  return Math.round(value * 100);
};

export default function VisualTrustCard({ data }: Props) {
  if (!data) return null;

  const low = toPercent(data.low_percent);
  const medium = toPercent(data.medium_percent);
  const high = toPercent(data.high_percent);

  const hasAny = low + medium + high > 0 || data.overall_label || data.explanation;
  if (!hasAny) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-emerald-300" />
        <div>
          <h3 className="text-lg font-semibold text-white">Visual Trust Analysis</h3>
          <p className="text-xs text-slate-400">
            Trust signals inferred directly from the backend&apos;s screenshot scan.
          </p>
        </div>
      </div>

      {data.overall_label && (
        <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200 capitalize">
          {data.overall_label}
        </span>
      )}

      <div className="space-y-3">
        {[
          { label: "Low Trust", value: low, gradient: "from-red-500 to-rose-500" },
          { label: "Medium Trust", value: medium, gradient: "from-amber-400 to-yellow-500" },
          { label: "High Trust", value: high, gradient: "from-emerald-400 to-cyan-400" },
        ].map((bucket) => (
          <div key={bucket.label}>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{bucket.label}</span>
              <span className="font-semibold text-white">{bucket.value}%</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-slate-800/60">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${bucket.gradient}`}
                style={{ width: `${bucket.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data.explanation && (
        <p className="text-sm text-slate-300 leading-relaxed">{data.explanation}</p>
      )}
    </div>
  );
}




import type { CognitiveFrictionResult } from "@/app/ai-marketing/brain-types";

type Props = {
  result: CognitiveFrictionResult;
  onViewFull?: () => void;
};

const cardClass =
  "rounded-2xl border border-white/10 bg-slate-900/50 p-4 flex flex-col gap-2";

export function CognitiveSummaryView({ result, onViewFull }: Props) {
  const frictionScore =
    typeof result.decision_friction_score === "number"
      ? result.decision_friction_score
      : result.frictionScore ?? 0;
  const primaryDiagnosis =
    result.primary_diagnosis ||
    result.psychology_narrative?.analysis_summary ||
    result.explanationSummary ||
    "";

  const blockers = result.keyDecisionBlockers?.slice(0, 3) ?? [];
  const quickWins = result.recommendedQuickWins?.slice(0, 3) ?? [];
  const decisionLikelihood = Math.round((result.decisionProbability ?? 0) * 100);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className={cardClass}>
          <div className="text-sm font-medium text-slate-300">Decision Friction</div>
          <div className="text-4xl font-bold text-white">
            {Number.isFinite(frictionScore) ? Math.round(frictionScore) : "—"} / 100
          </div>
          {primaryDiagnosis && (
            <p className="text-sm text-slate-400 mt-1">{primaryDiagnosis}</p>
          )}
        </div>

        <div className={cardClass}>
          <div className="text-sm font-medium text-slate-200 mb-2">Top 3 Decision Blockers</div>
          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
            {blockers.length === 0 && <li>No blockers detected in this run.</li>}
            {blockers.map((blocker, idx) => (
              <li key={`${blocker}-${idx}`}>{blocker}</li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <div className="text-sm font-medium text-slate-200 mb-2">Top 3 Quick Wins</div>
          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
            {quickWins.length === 0 && <li>No quick wins returned in this run.</li>}
            {quickWins.map((win, idx) => (
              <li key={`${win}-${idx}`}>{win}</li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-300">Decision Likelihood</div>
              <div className="text-2xl font-semibold text-white">{decisionLikelihood}%</div>
            </div>
            <div className="text-xs text-slate-500 max-w-[180px] text-right">
              Derived from current friction, trust, and motivation signals. Review the full analysis
              to see where hesitation is created.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-400">
          Ready for more? Dive into the full analysis to see page structure, visual trust, detailed
          blockers, and AI recommendations.
        </p>
        <button
          type="button"
          onClick={onViewFull}
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
        >
          View Full Analysis →
        </button>
      </div>
    </div>
  );
}





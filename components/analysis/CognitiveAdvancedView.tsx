import { useState } from "react";
import type {
  CognitiveFrictionResult,
  PsychologyAnalysisResult,
} from "@/app/ai-marketing/brain-types";
import PsychologySummary from "@/components/PsychologySummary";
import PsychologyDashboardAdvanced from "@/components/PsychologyDashboardAdvanced";

type Props = {
  result: CognitiveFrictionResult;
  psychologyAnalysis?: PsychologyAnalysisResult | null;
  brainResponse?: string | null;
};

export function CognitiveAdvancedView({ result, psychologyAnalysis, brainResponse }: Props) {
  const [showDashboard, setShowDashboard] = useState(true);
  const narrative =
    psychologyAnalysis?.human_readable_report ??
    brainResponse ??
    result.psychology_narrative?.analysis_summary ??
    result.psychology_narrative?.ai_interpretation ??
    "";

  const hasDashboard = !!result.psychology_dashboard;

  return (
    <div className="space-y-6">
      {hasDashboard ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Advanced Psychological View</div>
              <p className="text-xs text-slate-400">
                13-dimension decision psychology dashboard with personality, trust, motivation, and
                behavioral predictors.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDashboard((prev) => !prev)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {showDashboard ? "Hide Advanced View" : "Show Advanced View"}
            </button>
          </div>

          <PsychologySummary result={result} />
          {showDashboard && <PsychologyDashboardAdvanced dashboard={result.psychology_dashboard} />}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-400">
          Advanced psychological metrics were not returned for this analysis run.
        </div>
      )}

      {narrative && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-2">
          <div className="text-sm font-semibold text-white">Full Psychology Narrative</div>
          <p className="text-sm text-slate-300 whitespace-pre-wrap">{narrative}</p>
        </div>
      )}
    </div>
  );
}


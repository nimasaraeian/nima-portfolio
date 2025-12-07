import type { CognitiveFrictionResult } from "@/app/ai-marketing/brain-types";
import PageStructureCard from "./PageStructureCard";
import DecisionBlockersCard from "./DecisionBlockersCard";
import AIRecommendationsCard from "./AIRecommendationsCard";
import VisualTrustCard from "./VisualTrustCard";

type Props = {
  result: CognitiveFrictionResult;
};

const hasPageStructureData = (data: CognitiveFrictionResult["page_structure"]) =>
  !!data &&
  Object.values(data).some(
    (value) => typeof value === "string" && value.trim().length > 0
  );

export default function CognitiveFrictionDashboard({ result }: Props) {
  const legacyBlockers = {
    keyDecisionBlockers: result.keyDecisionBlockers,
    emotionalResistanceFactors: result.emotionalResistanceFactors,
    cognitiveOverloadFactors: result.cognitiveOverloadFactors,
    trustBreakpoints: result.trustBreakpoints,
    motivationMisalignments: result.motivationMisalignments,
  };

  const legacyRecommendations = {
    quickWins: result.recommendedQuickWins,
    deepChanges: result.recommendedDeepChanges,
  };

  const shouldRender =
    hasPageStructureData(result.page_structure) ||
    !!result.decision_blockers ||
    !!result.ai_recommendations ||
    !!result.visual_trust_analysis ||
    (legacyBlockers.keyDecisionBlockers?.length ?? 0) > 0 ||
    (legacyRecommendations.quickWins?.length ?? 0) > 0 ||
    (legacyRecommendations.deepChanges?.length ?? 0) > 0;

  if (!shouldRender) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 space-y-6">
      {hasPageStructureData(result.page_structure) && (
        <PageStructureCard data={result.page_structure} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <DecisionBlockersCard structured={result.decision_blockers} legacy={legacyBlockers} />
        <AIRecommendationsCard
          structured={result.ai_recommendations}
          quickWins={legacyRecommendations.quickWins}
          deepChanges={legacyRecommendations.deepChanges}
        />
      </div>

      {result.visual_trust_analysis && (
        <VisualTrustCard data={result.visual_trust_analysis} />
      )}
    </section>
  );
}





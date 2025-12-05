import type {
  AIRecommendationItem,
  CognitiveFrictionResult,
  DecisionBlockerItem,
  PageStructure,
} from "@/app/ai-marketing/brain-types";

type Props = {
  result: CognitiveFrictionResult;
  onViewAdvanced?: () => void;
};

const sectionClass = "rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-3";

const structuredLabels: Array<{ key: keyof Omit<PageStructure, "extra_sections">; label: string }> = [
  { key: "hero_title", label: "Hero Title" },
  { key: "hero_subtitle", label: "Hero Subtitle" },
  { key: "primary_cta", label: "Primary CTA" },
  { key: "secondary_cta", label: "Secondary CTA" },
  { key: "hero_image", label: "Hero Image" },
  { key: "footer_legal", label: "Footer / Legal" },
];

const ensureArray = <T,>(value?: T | T[] | null): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const formatNarrative = (result: CognitiveFrictionResult) => {
  if (!result.psychology_narrative) return "";
  return (
    result.psychology_narrative.analysis_summary ||
    result.psychology_narrative.ai_interpretation ||
    ""
  );
};

const flattenRecommendations = (result: CognitiveFrictionResult) => {
  const structured = Object.entries(result.ai_recommendations ?? {}).flatMap(
    ([group, items]) =>
      ensureArray(items).map((item) => ({
        ...item,
        group,
      })),
  );

  const quick = structured.filter(
    (item) => item.priority?.toLowerCase().includes("quick") ?? false,
  );
  const deep = structured.filter(
    (item) => item.priority?.toLowerCase().includes("deep") ?? false,
  );

  return {
    quick: quick.length ? quick : (result.recommendedQuickWins ?? []).map((text, idx) => ({
      element: `Quick Win ${idx + 1}`,
      change: text,
      psychological_effect: "",
    })),
    deep: deep.length ? deep : (result.recommendedDeepChanges ?? []).map((text, idx) => ({
      element: `Deep Change ${idx + 1}`,
      change: text,
      psychological_effect: "",
    })),
  };
};

export function CognitiveFullView({ result, onViewAdvanced }: Props) {
  const page = result.page_structure;
  const blockerEntries = Object.entries(result.decision_blockers ?? {});
  const { quick, deep } = flattenRecommendations(result);
  const narrative = formatNarrative(result);
  const visual = result.visual_trust_analysis;

  return (
    <div className="space-y-6">
      {page && (
        <div className={sectionClass}>
          <div>
            <div className="text-sm font-semibold text-white">Page Structure Map</div>
            <p className="text-xs text-slate-400">
              How the AI reconstructed the hero and key conversion sections.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 text-sm">
            {structuredLabels.map(({ key, label }) => {
              const value = page[key];
              if (typeof value !== "string" || value.trim().length === 0) return null;
              return (
                <div key={key}>
                  <div className="font-semibold text-white">{label}</div>
                  <div className="text-slate-400">{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {visual && (
        <div className={sectionClass}>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Visual Trust Analysis</div>
              <p className="text-xs text-slate-400">
                Split of users falling into low / medium / high trust zones.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              Low: {visual.low_percent ?? 0}% · Medium: {visual.medium_percent ?? 0}% · High:{" "}
              {visual.high_percent ?? 0}%
            </div>
          </div>
          <div className="text-sm">
            Overall: <span className="font-semibold">{visual.overall_label ?? "Unknown"}</span>
          </div>
          {visual.explanation && (
            <p className="text-sm text-slate-400">{visual.explanation}</p>
          )}
        </div>
      )}

      <div className={sectionClass}>
        <div>
          <div className="text-sm font-semibold text-white">Decision Blockers</div>
          <p className="text-xs text-slate-400">
            Structured blockers grouped by page section or UI element.
          </p>
        </div>
        {blockerEntries.length === 0 ? (
          <p className="text-sm text-slate-400">No structured blockers returned.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {blockerEntries.map(([label, items]) =>
              ensureArray<DecisionBlockerItem>(items).map((item, idx) => (
                <div key={`${label}-${idx}`} className="border border-white/10 rounded-xl p-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                    {label}
                  </div>
                  {item.element && (
                    <div className="text-xs text-slate-400 mb-1">
                      Element: <span className="font-medium text-white">{item.element}</span>
                    </div>
                  )}
                  {item.issue && <p className="text-sm text-white">{item.issue}</p>}
                  {item.psychological_impact && (
                    <p className="text-xs text-slate-400 mt-1">{item.psychological_impact}</p>
                  )}
                  {item.evidence && (
                    <p className="text-xs text-slate-500 mt-1">Evidence: {item.evidence}</p>
                  )}
                </div>
              )),
            )}
          </div>
        )}
      </div>

      <div className={sectionClass}>
        <div className="text-sm font-semibold text-white">AI Recommendations</div>
        <p className="text-xs text-slate-400">
          Quick wins and deep changes grounded in psychology signals.
        </p>

        <RecommendationGrid title="Quick Wins" items={quick} />
        <RecommendationGrid title="Deep Changes" items={deep} />
      </div>

      {narrative && (
        <div className={sectionClass}>
          <div className="text-sm font-semibold text-white">Psychology Narrative</div>
          <p className="text-sm text-slate-400 whitespace-pre-wrap">{narrative}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-400">
          Need the 13-dimension psychological interpretation? Switch to the advanced view for the
          full dashboard.
        </p>
        <button
          type="button"
          onClick={onViewAdvanced}
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
        >
          Advanced Psychological View →
        </button>
      </div>
    </div>
  );
}

function RecommendationGrid({ title, items }: { title: string; items: Partial<AIRecommendationItem>[] }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">{title}</div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No {title.toLowerCase()} available.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          {items.map((rec, idx) => (
            <div key={`${title}-${idx}`} className="border border-white/10 rounded-xl p-3">
              {rec.element && (
                <div className="text-xs text-slate-400 mb-1">
                  Element: <span className="font-medium text-white">{rec.element}</span>
                </div>
              )}
              {rec.change && <p className="text-sm text-white">{rec.change}</p>}
              {rec.psychological_effect && (
                <p className="text-xs text-slate-400 mt-1">{rec.psychological_effect}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


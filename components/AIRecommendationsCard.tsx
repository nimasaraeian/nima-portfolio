import { Rocket } from "lucide-react";
import type { CognitiveFrictionResult, AIRecommendationItem } from "@/app/ai-marketing/brain-types";

type StructuredRecommendations = CognitiveFrictionResult["ai_recommendations"];

type Props = {
  structured?: StructuredRecommendations | null;
  quickWins?: string[];
  deepChanges?: string[];
};

const matchKey = (key: string, needle: string) => key.toLowerCase().includes(needle);

const deriveItems = (
  structured?: StructuredRecommendations | null,
  matcher?: (key: string) => boolean
): AIRecommendationItem[] => {
  if (!structured || !matcher) return [];
  return Object.entries(structured).flatMap(([key, items]) =>
    matcher(key) && Array.isArray(items) ? items : []
  );
};

const RecommendationCard = ({
  title,
  description,
  accent,
  items,
}: {
  title: string;
  description: string;
  accent: { bg: string; border: string; title: string };
  items: AIRecommendationItem[];
}) => (
  <div className={`rounded-xl border ${accent.border} ${accent.bg} p-4 space-y-3`}>
    <div>
      <p className={`text-sm font-semibold ${accent.title}`}>{title}</p>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={`${title}-${idx}`} className="rounded-lg border border-white/5 bg-black/30 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">{item.element ?? title}</p>
            {item.priority && (
              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                {item.priority}
              </span>
            )}
          </div>
          {item.change && <p className="text-sm text-slate-200 mt-1">{item.change}</p>}
          {item.psychological_effect && (
            <p className="text-xs text-slate-400 mt-1">{item.psychological_effect}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

const LegacyList = ({
  title,
  entries,
  accent,
}: {
  title: string;
  entries: string[];
  accent: string;
}) => (
  <div className={`rounded-xl border border-white/5 ${accent} p-4`}>
    <p className="text-sm font-semibold text-white">{title}</p>
    {entries.length ? (
      <ul className="mt-2 space-y-1 text-xs text-slate-200">
        {entries.map((entry, idx) => (
          <li key={`${title}-${idx}`} className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 text-xs text-slate-500">No recommendations available.</p>
    )}
  </div>
);

export default function AIRecommendationsCard({ structured, quickWins, deepChanges }: Props) {
  const structuredQuickWins = deriveItems(structured, (key) =>
    matchKey(key, "quick") || matchKey(key, "win")
  );
  const structuredDeepChanges = deriveItems(structured, (key) =>
    matchKey(key, "deep") || matchKey(key, "structural")
  );

  const hasStructured =
    structuredQuickWins.length > 0 || structuredDeepChanges.length > 0;

  if (!hasStructured && !((quickWins?.length ?? 0) || (deepChanges?.length ?? 0))) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Rocket className="w-5 h-5 text-cyan-300" />
        <div>
          <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
          <p className="text-xs text-slate-400">
            Quick wins and deep changes grounded in psychology signals.
          </p>
        </div>
      </div>

      {hasStructured ? (
        <div className="space-y-4">
          {structuredQuickWins.length > 0 && (
            <RecommendationCard
              title="Quick Wins"
              description="Fast tweaks to reduce hesitation."
              accent={{ bg: "bg-green-500/10", border: "border-green-500/30", title: "text-green-200" }}
              items={structuredQuickWins}
            />
          )}
          {structuredDeepChanges.length > 0 && (
            <RecommendationCard
              title="Deep Changes"
              description="Structural shifts for long-term gains."
              accent={{ bg: "bg-indigo-500/10", border: "border-indigo-500/30", title: "text-indigo-200" }}
              items={structuredDeepChanges}
            />
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <LegacyList
            title="Quick Wins"
            entries={quickWins ?? []}
            accent="bg-green-500/5"
          />
          <LegacyList
            title="Deep Changes"
            entries={deepChanges ?? []}
            accent="bg-indigo-500/5"
          />
        </div>
      )}
    </div>
  );
}




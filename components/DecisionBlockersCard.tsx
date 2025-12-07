import { Brain } from "lucide-react";
import type { CognitiveFrictionResult, DecisionBlockerItem } from "@/app/ai-marketing/brain-types";

type StructuredBlockers = CognitiveFrictionResult["decision_blockers"];

type LegacyBlockerLists = {
  keyDecisionBlockers?: string[];
  emotionalResistanceFactors?: string[];
  cognitiveOverloadFactors?: string[];
  trustBreakpoints?: string[];
  motivationMisalignments?: string[];
};

type Props = {
  structured?: StructuredBlockers | null;
  legacy?: LegacyBlockerLists;
};

const fallbackSections: Array<{
  title: string;
  color: string;
  items?: keyof LegacyBlockerLists;
}> = [
  { title: "Key Blockers", color: "text-red-300", items: "keyDecisionBlockers" },
  { title: "Emotional Resistance", color: "text-orange-300", items: "emotionalResistanceFactors" },
  { title: "Cognitive Overload", color: "text-yellow-200", items: "cognitiveOverloadFactors" },
  { title: "Trust Breakpoints", color: "text-sky-300", items: "trustBreakpoints" },
];

const hasStructuredEntries = (structured?: StructuredBlockers | null) =>
  !!structured &&
  Object.values(structured).some((items) => Array.isArray(items) && items.length > 0);

const formatLabel = (label: string) =>
  label.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const BlockerItemCard = ({ item }: { item: DecisionBlockerItem }) => {
  if (!item.element && !item.issue && !item.psychological_impact) return null;

  return (
    <div className="rounded-xl border border-white/5 bg-black/30 p-3">
      <p className="text-sm font-semibold text-white">
        {item.element ?? "Unknown Element"}
      </p>
      {item.issue && <p className="text-sm text-slate-200 mt-1">{item.issue}</p>}
      {item.psychological_impact && (
        <p className="text-xs text-slate-400 mt-1">{item.psychological_impact}</p>
      )}
      {item.evidence && (
        <p className="text-[11px] text-slate-500 mt-2">Evidence: {item.evidence}</p>
      )}
    </div>
  );
};

export default function DecisionBlockersCard({ structured, legacy }: Props) {
  if (hasStructuredEntries(structured)) {
    const entries = Object.entries(structured ?? {}).filter(
      ([, items]) => Array.isArray(items) && items.length > 0
    );

    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-purple-300" />
          <div>
            <h3 className="text-lg font-semibold text-white">Decision Blockers</h3>
            <p className="text-xs text-slate-400">
              Structured blockers grouped by page section or UI element.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {entries.map(([label, items]) => (
            <div key={label} className="space-y-3">
              <p className="text-sm font-semibold text-slate-200">{formatLabel(label)}</p>
              <div className="grid gap-3 lg:grid-cols-2">
                {(items ?? []).map((item, idx) => (
                  <BlockerItemCard key={`${label}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!legacy) return null;

  const hasLegacyData = fallbackSections.some((section) => {
    const list = legacy[section.items ?? "keyDecisionBlockers"];
    return Array.isArray(list) && list.length > 0;
  });

  if (!hasLegacyData) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Brain className="w-5 h-5 text-purple-300" />
        <div>
          <h3 className="text-lg font-semibold text-white">Decision Blockers</h3>
          <p className="text-xs text-slate-400">
            Legacy blocker lists (showing first four items per category).
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {fallbackSections.map((section) => {
          const items = legacy[section.items ?? "keyDecisionBlockers"] ?? [];
          return (
            <div key={section.title} className="rounded-xl border border-white/5 bg-black/20 p-4">
              <p className={`text-xs font-semibold ${section.color}`}>{section.title}</p>
              {items.length > 0 ? (
                <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                  {items.slice(0, 4).map((item, idx) => (
                    <li key={`${section.title}-${idx}`} className="flex gap-2">
                      <span className="text-slate-500">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[11px] text-slate-500">No critical risks.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}





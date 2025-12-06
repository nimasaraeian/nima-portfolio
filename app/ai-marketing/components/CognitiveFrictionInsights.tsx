import type {
  AIRecommendationItem,
  CognitiveFrictionResult,
  DecisionBlockerItem,
  PageStructure,
  VisualTrustAnalysis,
} from '@/app/ai-marketing/brain-types';

const PAGE_STRUCTURE_FIELDS: Array<{ key: keyof Omit<PageStructure, 'extra_sections'>; label: string }> = [
  { key: 'hero_title', label: 'Hero Title' },
  { key: 'hero_subtitle', label: 'Hero Subtitle' },
  { key: 'primary_cta', label: 'Primary CTA' },
  { key: 'secondary_cta', label: 'Secondary CTA' },
  { key: 'hero_image', label: 'Hero Image' },
  { key: 'trust_badges', label: 'Trust Badges' },
  { key: 'social_proof_section', label: 'Social Proof' },
  { key: 'benefits_section', label: 'Benefits Section' },
  { key: 'pricing_section', label: 'Pricing Section' },
  { key: 'form_area', label: 'Form Area' },
  { key: 'footer_legal', label: 'Footer / Legal' },
];

export function PageStructureCard({ page }: { page?: PageStructure | null }) {
  if (!page) {
    return null;
  }

  const entries = PAGE_STRUCTURE_FIELDS.filter(({ key }) => {
    const value = page[key];
    return typeof value === 'string' && value.trim().length > 0;
  });
  const extraEntries = Object.entries(page.extra_sections ?? {}).filter(
    ([, value]) => typeof value === 'string' && value.trim().length > 0,
  );

  if (entries.length === 0 && extraEntries.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 space-y-3">
      <div>
        <h3 className="text-xl font-semibold text-white">Page Structure Map</h3>
        <p className="text-sm text-gray-400">How the AI reconstructed the hero layout.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {entries.map(({ key, label }) => {
          const value = page[key];
          if (typeof value !== 'string') return null;
          return (
            <div key={key as string} className="rounded-lg border border-slate-700/80 bg-slate-950/50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
              <p className="text-sm text-white mt-1">{value}</p>
            </div>
          );
        })}
        {extraEntries.length > 0 && (
          <div className="rounded-lg border border-slate-700/80 bg-slate-950/50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Additional Sections</p>
            <ul className="mt-1 space-y-1 text-sm text-white">
              {extraEntries.map(([sectionKey, description]) => (
                <li key={sectionKey} className="text-gray-300">
                  <span className="text-gray-400">{sectionKey}:</span> {description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function VisualTrustCard({
  analysis,
  score,
}: {
  analysis?: VisualTrustAnalysis | null;
  score?: number | null;
}) {
  if (!analysis && (score === undefined || score === null)) {
    return null;
  }

  const labelColor =
    analysis?.overall_label === 'High'
      ? 'text-green-400'
      : analysis?.overall_label === 'Low'
      ? 'text-red-400'
      : 'text-amber-300';

  const trustScore =
    typeof score === 'number' && !isNaN(score) ? `${Math.round(score)} / 100` : null;

  const breakdown = [
    { label: 'Low', value: analysis?.low_percent },
    { label: 'Medium', value: analysis?.medium_percent },
    { label: 'High', value: analysis?.high_percent },
  ].filter(({ value }) => typeof value === 'number' && !isNaN(value as number));

  return (
    <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/5 p-4 space-y-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 className="text-xl font-semibold text-white">Visual Trust Analysis</h3>
          <p className="text-sm text-gray-400">
            Alignment between hero imagery and psychological trust cues.
          </p>
        </div>
        {(analysis?.overall_label || trustScore) && (
          <div className="text-right">
            {analysis?.overall_label && (
              <p className={`text-sm font-semibold ${labelColor}`}>Overall: {analysis.overall_label}</p>
            )}
            {trustScore && <p className="text-xs text-gray-400">Visual trust score: {trustScore}</p>}
          </div>
        )}
      </div>
      {breakdown.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {breakdown.map(({ label, value }) => (
            <div
              key={label}
              className="flex-1 min-w-[120px] rounded-lg border border-indigo-500/20 bg-indigo-900/20 p-3"
            >
              <p className="text-xs uppercase tracking-wide text-indigo-200">{label}</p>
              <p className="text-lg font-semibold text-white">{Math.round(value as number)}%</p>
            </div>
          ))}
        </div>
      )}
      {analysis?.explanation && (
        <p className="text-sm text-gray-300 leading-relaxed">{analysis.explanation}</p>
      )}
    </div>
  );
}

export function StructuredBlockerList({ items }: { items: DecisionBlockerItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={`${item.element}-${idx}`} className="rounded-lg border border-slate-700 bg-slate-900/40 p-3">
          <p className="text-sm font-semibold text-white">{item.element || 'Page Element'}</p>
          {item.issue && <p className="text-sm text-gray-200 mt-1">{item.issue}</p>}
          {item.psychological_impact && (
            <p className="text-xs text-gray-400 mt-1">{item.psychological_impact}</p>
          )}
          {item.evidence && (
            <p className="text-xs text-gray-500 mt-1 italic">Evidence: {item.evidence}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function collectRecommendationItems(
  result: CognitiveFrictionResult,
  predicate: (category: string) => boolean,
): AIRecommendationItem[] {
  if (!result.ai_recommendations) {
    return [];
  }

  const matches: AIRecommendationItem[] = [];
  Object.entries(result.ai_recommendations).forEach(([category, items]) => {
    if (!Array.isArray(items)) {
      return;
    }
    if (predicate(category.toLowerCase())) {
      matches.push(...items);
    }
  });
  return matches;
}

export type RecommendationAccent = {
  border: string;
  bg: string;
  title: string;
  icon: string;
};

type RecommendationSectionProps = {
  title: string;
  description: string;
  structuredItems: AIRecommendationItem[];
  fallbackItems: string[];
  accent: RecommendationAccent;
};

export function RecommendationSection({
  title,
  description,
  structuredItems,
  fallbackItems,
  accent,
}: RecommendationSectionProps) {
  const hasStructured = structuredItems.length > 0;

  return (
    <div className={`rounded-xl border ${accent.border} ${accent.bg} p-4`}>
      <h4 className={`text-sm font-semibold mb-2 ${accent.title}`}>{title}</h4>
      <p className="text-xs text-gray-400 mb-3">{description}</p>
      {hasStructured ? (
        <div className="space-y-3">
          {structuredItems.map((item, idx) => (
            <div key={`${item.element}-${idx}`} className="rounded-lg border border-slate-700/60 bg-slate-950/60 p-3">
              <div className="text-sm font-semibold text-white">{item.element || title}</div>
              {item.change && <p className="text-sm text-gray-200 mt-1">{item.change}</p>}
              {item.psychological_effect && (
                <p className="text-xs text-gray-400 mt-1">{item.psychological_effect}</p>
              )}
            </div>
          ))}
        </div>
      ) : fallbackItems.length > 0 ? (
        <ul className="space-y-1 text-sm text-gray-300">
          {fallbackItems.map((text, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className={`${accent.title} mt-1`}>{accent.icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 italic">No recommendations available.</p>
      )}
    </div>
  );
}

export function getStructuredBlockers(
  result: CognitiveFrictionResult,
  categoryLabel?: string | string[],
): DecisionBlockerItem[] {
  if (!categoryLabel || !result.decision_blockers) {
    return [];
  }

  const labels = Array.isArray(categoryLabel) ? categoryLabel : [categoryLabel];
  for (const label of labels) {
    const items = result.decision_blockers[label];
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  }

  return [];
}

export function buildAiInterpretation(result: CognitiveFrictionResult): string {
  if (result.psychology_narrative?.ai_interpretation) {
    return result.psychology_narrative.ai_interpretation;
  }

  const parts: string[] = [];

  const frictionScore =
    typeof result.frictionScore === 'number' && !isNaN(result.frictionScore)
      ? result.frictionScore
      : 0;
  const trustScore =
    typeof result.trustScore === 'number' && !isNaN(result.trustScore) ? result.trustScore : 0;
  const motivationMatchScore =
    typeof result.motivationMatchScore === 'number' && !isNaN(result.motivationMatchScore)
      ? result.motivationMatchScore
      : 0;
  const decisionProbability =
    typeof result.decisionProbability === 'number' && !isNaN(result.decisionProbability)
      ? result.decisionProbability
      : 0;
  const emotionalClarityScore =
    typeof result.emotionalClarityScore === 'number' && !isNaN(result.emotionalClarityScore)
      ? result.emotionalClarityScore
      : 0;

  if (frictionScore >= 60 && trustScore <= 40) {
    parts.push(
      'Your content currently creates high decision friction and relatively low trust. Users are likely to hesitate and postpone action rather than convert.',
    );
  } else if (frictionScore >= 60) {
    parts.push(
      'The content creates significant cognitive friction that may cause users to abandon the decision process, despite some trust signals.',
    );
  } else if (trustScore <= 40) {
    parts.push('Trust levels are low, which creates hesitation even if the content is relatively clear.');
  }

  if (motivationMatchScore < 50 && motivationMatchScore > 0) {
    parts.push(
      "The message does not strongly connect with the audience's core motivations, which reduces the emotional drive to take action.",
    );
  } else if (motivationMatchScore >= 70) {
    parts.push('The content aligns well with audience motivations, creating a strong emotional connection.');
  }

  if (decisionProbability > 0 && decisionProbability < 0.4) {
    parts.push(
      'Overall, the current likelihood of conversion is low. The piece needs clearer value proposition, proof, and emotional resonance.',
    );
  } else if (decisionProbability >= 0.6) {
    parts.push('The content shows strong conversion potential with good decision-making signals.');
  }

  if (emotionalClarityScore < 50 && emotionalClarityScore > 0) {
    parts.push('Emotional messaging could be clearer to better guide users toward confident decisions.');
  }

  if (parts.length === 0) {
    parts.push('The content shows a balanced psychological profile with moderate conversion potential.');
  }

  return parts.join(' ');
}




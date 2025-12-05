import { LayoutGrid } from "lucide-react";
import type { PageStructure } from "@/app/ai-marketing/brain-types";

type Props = {
  data?: PageStructure | null;
};

const STRUCTURE_FIELDS: Array<{ key: keyof Omit<PageStructure, "extra_sections">; label: string }> = [
  { key: "hero_title", label: "Hero Title" },
  { key: "hero_subtitle", label: "Hero Subtitle" },
  { key: "primary_cta", label: "Primary CTA" },
  { key: "secondary_cta", label: "Secondary CTA" },
  { key: "hero_image", label: "Hero Image" },
  { key: "pricing_section", label: "Pricing" },
  { key: "form_area", label: "Form Area" },
  { key: "footer_legal", label: "Footer / Legal" },
  { key: "nav_bar", label: "Navigation" },
];

const hasValue = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export default function PageStructureCard({ data }: Props) {
  if (!data) return null;

  const coreEntries = STRUCTURE_FIELDS.filter(({ key }) => hasValue(data[key]));
  const extraEntries = Object.entries(data.extra_sections ?? {})
    .filter(([, value]) => hasValue(value))
    .map(([key, value]) => ({
      label: key.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      value,
    }));

  if (coreEntries.length === 0 && extraEntries.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <LayoutGrid className="w-5 h-5 text-cyan-300" />
        <div>
          <h3 className="text-lg font-semibold text-white">Page Structure</h3>
          <p className="text-xs text-slate-400">
            How the AI parsed the hero and key conversion sections.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {coreEntries.map(({ key, label }) => {
          const value = data[key];
          if (!hasValue(value)) return null;
          return (
            <div
              key={key}
              className="rounded-xl border border-white/5 bg-black/20 p-3 text-sm text-slate-200"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{label}</p>
              <p className="mt-1 leading-relaxed">{value}</p>
            </div>
          );
        })}
        {extraEntries.map((entry) => (
          <div
            key={entry.label}
            className="rounded-xl border border-white/5 bg-black/20 p-3 text-sm text-slate-200"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
              {entry.label}
            </p>
            <p className="mt-1 leading-relaxed">{entry.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


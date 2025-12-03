import React from "react";
import type { CognitiveFrictionResult, PsychologyDashboard } from "@/app/ai-marketing/brain-types";
import { computeCognitiveFit, computeEmotionalFit } from "@/lib/psychologyMetrics";

type Props = {
  result: CognitiveFrictionResult;
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const formatText = (value?: string | null) => value?.replace(/_/g, " ") ?? "—";

type Dashboard = NonNullable<CognitiveFrictionResult["psychology_dashboard"]>;

function deriveDecisionSpeed(dash: Dashboard): string {
  const tendency = dash.decision_frame?.decision_tendency;
  if (tendency === "move_forward") return "Fast";
  if (tendency === "hesitate") return "Moderate";
  if (tendency === "postpone" || tendency === "bounce") return "Slow";
  return "Moderate";
}

function deriveTrustStyle(dash: Dashboard): string {
  const td = dash.trust_dynamics;
  if (!td) return "Mixed / Unclear";
  const entries: [string, number][] = [
    ["Visual", td.visual_trust ?? 0],
    ["Authority / Brand", td.institutional_trust ?? 0],
    ["Social Proof", td.social_trust ?? 0],
  ];
  const top = entries.sort((a, b) => b[1] - a[1])[0];
  if (!top || top[1] < 30) return "Mixed / Unclear";
  return top[0];
}

function deriveMotivationType(dash: Dashboard): string {
  const primary = dash.motivation_style?.primary?.toLowerCase() ?? "";
  const frame = dash.decision_frame?.mode;
  if (primary.includes("efficiency") || primary.includes("productivity")) return "Efficiency";
  if (primary.includes("status") || primary.includes("identity")) return "Identity";
  if (frame === "gain_seeking") return "Gain-Oriented";
  if (frame === "loss_avoidance") return "Loss Avoidance";
  return "General Achievement";
}

function deriveAttentionPattern(dash: Dashboard): string {
  const clarity = dash.cognitive_load?.clarity_score ?? 0;
  const overload = dash.cognitive_load?.overload_score ?? 0;
  if (overload > 65) return "Overloaded";
  if (clarity > 65 && overload < 40) return "Focused";
  if (clarity < 40 && overload < 40) return "Scanning";
  return "Distracted";
}

const Meter = ({ value, color }: { value: number; color: string }) => (
  <div className="mt-1 h-2 w-full rounded-full bg-slate-800">
    <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
  </div>
);

export default function PsychologySummary({ result }: Props) {
  const dash = result.psychology_dashboard;

  if (!dash) return null;

  const cognitiveFit = computeCognitiveFit(dash);
  const emotionalFit = computeEmotionalFit(dash);
  const decisionSpeed = deriveDecisionSpeed(dash);
  const trustStyle = deriveTrustStyle(dash);
  const motivationType = deriveMotivationType(dash);
  const attentionPattern = deriveAttentionPattern(dash);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.35fr,1fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="text-sm font-semibold text-slate-200">Ideal Audience Persona</h2>
          <p className="mt-1 text-xs text-slate-400">
            Who is most likely to respond positively to this landing page?
          </p>
          <div className="mt-4 grid gap-3 text-xs text-slate-200 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Personality Profile
              </div>
              <div className="mt-1 text-sm font-medium">
                {dash.personality_activation?.dominant_profile ?? "—"}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">Cognitive Style</div>
              <div className="mt-1 text-sm font-medium capitalize">
                {dash.cognitive_style?.type ?? "—"}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Risk / Decision Style
              </div>
              <div className="mt-1 text-sm font-medium capitalize">
                {formatText(dash.decision_frame?.risk_style)}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Primary Motivation
              </div>
              <div className="mt-1 text-sm font-medium">
                {dash.motivation_style?.primary ?? "—"}
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-xs text-slate-200 md:grid-cols-2 lg:grid-cols-4">
            <Indicator label="Decision Speed" value={decisionSpeed} />
            <Indicator label="Trust Formation" value={trustStyle} />
            <Indicator label="Motivation Type" value={motivationType} />
            <Indicator label="Attention Pattern" value={attentionPattern} />
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-sm font-semibold text-slate-200">Emotional &amp; Cognitive Fit</h2>
            <p className="mt-1 text-xs text-slate-400">
              How well does this page match how your audience thinks and feels?
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Cognitive Fit</span>
                  <span className="font-semibold">{cognitiveFit}%</span>
                </div>
                <Meter value={cognitiveFit} color="bg-emerald-500" />
                <p className="mt-1 text-[11px] text-slate-500">
                  Based on clarity vs overload and ambiguity.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Emotional Fit</span>
                  <span className="font-semibold">{emotionalFit}%</span>
                </div>
                <Meter value={emotionalFit} color="bg-indigo-500" />
                <p className="mt-1 text-[11px] text-slate-500">
                  Based on curiosity, motivation, trust vs anxiety and confusion.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-sm font-semibold text-slate-200">Behavioral Prediction</h2>
            <p className="mt-1 text-xs text-slate-400">Likely outcomes for a first-time visitor.</p>
            <div className="mt-4 grid gap-3 text-xs text-slate-200 md:grid-cols-2">
              <SummaryStat label="Likely to Convert" value={dash.behavioral_prediction?.convert} />
              <SummaryStat label="Likely to Hesitate" value={dash.behavioral_prediction?.hesitate} />
              <SummaryStat label="Likely to Bounce" value={dash.behavioral_prediction?.bounce} />
              <SummaryStat label="Likely to Postpone" value={dash.behavioral_prediction?.postpone} />
            </div>
            {dash.behavioral_prediction?.summary && (
              <p className="mt-3 text-[11px] text-slate-400">{dash.behavioral_prediction.summary}</p>
            )}
          </section>
        </div>
      </div>

      <WhoNotConvert dash={dash} />
    </div>
  );
}

function Indicator({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value?: number }) {
  const display = typeof value === "number" ? `${value}%` : "—";
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold">{display}</div>
    </div>
  );
}

const WhoNotConvert: React.FC<{ dash: Dashboard }> = ({ dash }) => {
  const reasons: string[] = [];

  const socialTrust = dash.trust_dynamics?.social_trust ?? 0;
  if (socialTrust < 40) {
    reasons.push("Visitors who rely heavily on social proof and testimonials.");
  }

  const anxiety = dash.emotional_response?.anxiety ?? 0;
  const confusion = dash.emotional_response?.confusion ?? 0;
  if (anxiety > 60 || confusion > 60) {
    reasons.push("People who need high emotional safety and very clear explanations before taking action.");
  }

  const overload = dash.cognitive_load?.overload_score ?? 0;
  if (overload > 60) {
    reasons.push("Busy, low-patience users who scan quickly and avoid dense layouts.");
  }

  const primaryMotivation = dash.motivation_style?.primary?.toLowerCase() ?? "";
  const frameMode = dash.decision_frame?.mode;
  if (!primaryMotivation.includes("efficiency") && frameMode === "gain_seeking") {
    reasons.push("Highly ROI-driven users looking for strong, measurable outcomes.");
  }

  if (reasons.length === 0) {
    reasons.push("Highly skeptical or misaligned audiences that are not a natural fit for this offer.");
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 className="text-sm font-semibold text-slate-200">Who This Page Will NOT Convert</h2>
      <p className="mt-1 text-xs text-slate-400">
        Audience profiles that are likely to drop off or delay their decision.
      </p>
      <ul className="mt-3 space-y-2 text-[11px] text-slate-300">
        {reasons.map((reason, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};





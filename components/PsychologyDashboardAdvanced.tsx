import React from "react";
import type { CognitiveFrictionResult } from "@/app/ai-marketing/brain-types";

type Props = {
  dashboard: CognitiveFrictionResult["psychology_dashboard"];
};

const clamp = (value?: number | null) => {
  if (typeof value !== "number" || isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (value === null || value === undefined) {
    return [];
  }
  return [String(value)];
};

const Pill = ({ label }: { label: string }) => (
  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">{label}</span>
);

const ScoreBar = ({ value, color }: { value?: number | null; color: string }) => (
  <div className="mt-1 h-2 w-full rounded-full bg-slate-800">
    <div className={`h-2 rounded-full ${color}`} style={{ width: `${clamp(value)}%` }} />
  </div>
);

const cardBase =
  "rounded-xl border border-slate-800 bg-slate-900/70 p-3 flex flex-col gap-1";

export default function PsychologyDashboardAdvanced({ dashboard }: Props) {
  if (!dashboard) return null;

  const pa = dashboard.personality_activation;
  const cs = dashboard.cognitive_style;
  const er = dashboard.emotional_response;
  const df = dashboard.decision_frame;
  const td = dashboard.trust_dynamics;
  const ms = dashboard.motivation_style;
  const cl = dashboard.cognitive_load;
  const bp = dashboard.behavioral_prediction;
  const am = dashboard.attention_map;
  const et = dashboard.emotional_triggers;
  const ma = dashboard.memory_activation;
  const rp = dashboard.risk_perception;
  const cta = dashboard.cta_match;

  const emotionMetrics = [
    { label: "Trust", value: er?.trust },
    { label: "Curiosity", value: er?.curiosity },
    { label: "Motivation", value: er?.motivation },
    { label: "Confusion", value: er?.confusion },
    { label: "Anxiety", value: er?.anxiety },
  ];

  const loadMetrics = [
    { label: "Clarity", value: cl?.clarity_score, color: "bg-emerald-500" },
    { label: "Overload", value: cl?.overload_score, color: "bg-amber-500" },
    { label: "Ambiguity", value: cl?.ambiguity_score, color: "bg-rose-500" },
  ];

  const trustMetrics = [
    { label: "Visual", value: td?.visual_trust },
    { label: "Authority", value: td?.institutional_trust },
    { label: "Social Proof", value: td?.social_trust },
    { label: "Skepticism", value: td?.skepticism },
  ];

  const attentionHotspots = am?.hotspots ?? am?.hot_zones;
  const attentionFriction = am?.friction_points ?? am?.dropoff_points;

  const triggerActivated = et?.activated ?? et?.positive;
  const triggerMissing = et?.missing ?? et?.negative;

  const memorySemantic = toStringArray(ma?.semantic);
  const memoryEmotional = toStringArray(ma?.emotional);
  const memoryPattern = toStringArray(ma?.pattern);

  const riskLevel = rp?.risk_level ?? rp?.level;
  const uncertainty = rp?.uncertainty_points ?? rp?.triggers;

  const ctaMetrics = [
    { label: "Fit Score", value: cta?.fit_score },
    { label: "Clarity", value: cta?.clarity },
    { label: "Motivation Alignment", value: cta?.motivation_alignment },
    { label: "Action Probability", value: cta?.action_probability },
  ];

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <h3 className="text-sm font-semibold text-slate-200">Advanced Psychological View</h3>
      <p className="mt-1 text-[11px] text-slate-500">
        Detailed 13-dimension psychological interpretation of this landing page.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className={cardBase}>
          <CardTitle title="Personality Activation" />
          {pa ? (
            <>
              <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-slate-200">
                {["O", "C", "E", "A", "N"].map((trait) => {
                  const value = pa[trait as keyof typeof pa];
                  if (typeof value !== "number") return null;
                  return (
                    <span key={trait} className="rounded-full bg-slate-800 px-2 py-0.5">
                      {trait}: {value}
                    </span>
                  );
                })}
              </div>
              <div className="text-xs font-semibold text-emerald-300">
                {pa.dominant_profile ?? "—"}
              </div>
              <p className="text-[11px] text-slate-500">
                {pa.explanation ?? "How this personality wiring responds to the page."}
              </p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Cognitive Style" />
          {cs ? (
            <>
              <p className="text-xs font-semibold text-slate-200 capitalize">{cs.type ?? "—"}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <span>Overload Risk: {cs.overload_risk ?? "—"}</span>
                <span>Ambiguity Aversion: {cs.ambiguity_aversion ?? "—"}</span>
                {cs.processing_speed && <span>Speed: {cs.processing_speed}</span>}
                {cs.reasoning_bias && <span>Bias: {cs.reasoning_bias}</span>}
              </div>
              <p className="text-[11px] text-slate-500">
                {cs.explanation ?? "How this persona processes information."}
              </p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Emotional Response" />
          <div className="mt-1 space-y-2">
            {emotionMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{metric.label}</span>
                  <span className="font-semibold text-slate-200">
                    {typeof metric.value === "number" ? `${metric.value}%` : "—"}
                  </span>
                </div>
                <ScoreBar value={metric.value} color="bg-indigo-500" />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">Immediate emotions triggered as users scan.</p>
        </div>

        <div className={cardBase}>
          <CardTitle title="Decision Frame" />
          {df ? (
            <>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <span>Mode: {df.mode ? df.mode.replace(/_/g, " ") : "—"}</span>
                <span>Risk Style: {df.risk_style ?? "—"}</span>
                <span className="col-span-2">
                  Decision Tendency: {df.decision_tendency ?? "—"}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {df.summary ?? df.framing ?? "How users frame this offer mentally."}
              </p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Trust Dynamics" />
          {td ? (
            <>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                {trustMetrics.map((metric) => (
                  <span key={metric.label}>
                    {metric.label}: {typeof metric.value === "number" ? `${metric.value}%` : "—"}
                  </span>
                ))}
              </div>
              {td.primary_trust_cue && (
                <p className="text-xs font-semibold text-slate-200">{td.primary_trust_cue}</p>
              )}
              <p className="text-[11px] text-slate-500">
                {td.recommendation ?? "Where trust is earned or lost."}
              </p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Motivation Style" />
          {ms ? (
            <>
              <div className="text-xs font-semibold text-slate-200">{ms.primary ?? "—"}</div>
              {ms.secondary && <div className="text-[11px] text-slate-400">{ms.secondary}</div>}
              <div className="flex flex-wrap gap-2">
                {ms.drivers?.map((driver) => (
                  <Pill key={driver} label={driver} />
                ))}
              </div>
              {ms.explanation && <p className="text-[11px] text-slate-500">{ms.explanation}</p>}
              {ms.blockers && ms.blockers.length > 0 && (
                <p className="text-[11px] text-rose-400">
                  Blockers: {ms.blockers.join(", ")}
                </p>
              )}
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Cognitive Load" />
          <div className="mt-1 space-y-2">
            {loadMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{metric.label}</span>
                  <span className="font-semibold text-slate-200">
                    {typeof metric.value === "number" ? `${metric.value}%` : "—"}
                  </span>
                </div>
                <ScoreBar value={metric.value} color={metric.color} />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">{cl?.summary ?? "Balance of clarity vs overload."}</p>
        </div>

        <div className={cardBase}>
          <CardTitle title="Behavioral Prediction" />
          {bp ? (
            <>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <Stat label="Convert" value={bp.convert} />
                <Stat label="Hesitate" value={bp.hesitate} />
                <Stat label="Bounce" value={bp.bounce} />
                <Stat label="Postpone" value={bp.postpone} />
              </div>
              <p className="text-[11px] text-slate-500">
                {bp.summary ?? "Likely actions for first-time visitors."}
              </p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Attention Map" />
          {am ? (
            <>
              {attentionHotspots && attentionHotspots.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Hotspots</span>
                  <ul className="mt-1 list-disc pl-4">
                    {attentionHotspots.map((zone) => (
                      <li key={zone}>{zone}</li>
                    ))}
                  </ul>
                </div>
              )}
              {attentionFriction && attentionFriction.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Friction Points</span>
                  <ul className="mt-1 list-disc pl-4">
                    {attentionFriction.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-[11px] text-slate-500">{am.notes ?? "Where attention lands first."}</p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Emotional Triggers" />
          {et ? (
            <>
              {triggerActivated && triggerActivated.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Activated</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {triggerActivated.map((item) => (
                      <Pill key={`activated-${item}`} label={item} />
                    ))}
                  </div>
                </div>
              )}
              {triggerMissing && triggerMissing.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Missing</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {triggerMissing.map((item) => (
                      <Pill key={`missing-${item}`} label={item} />
                    ))}
                  </div>
                </div>
              )}
              <p className="text-[11px] text-slate-500">{et.description ?? "Emotional levers in play."}</p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Memory Activation" />
          {ma ? (
            <>
              {typeof ma.retention_score === "number" && (
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Retention Score</span>
                    <span className="font-semibold text-slate-200">{ma.retention_score}%</span>
                  </div>
                  <ScoreBar value={ma.retention_score} color="bg-cyan-500" />
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {memorySemantic.map((item) => (
                  <Pill key={`semantic-${item}`} label={`Semantic: ${item}`} />
                ))}
                {memoryEmotional.map((item) => (
                  <Pill key={`emotional-${item}`} label={`Emotional: ${item}`} />
                ))}
                {memoryPattern.map((item) => (
                  <Pill key={`pattern-${item}`} label={`Pattern: ${item}`} />
                ))}
                {toStringArray(ma.hooks).map((hook) => (
                  <Pill key={`hook-${hook}`} label={`Hook: ${hook}`} />
                ))}
              </div>
              <p className="text-[11px] text-slate-500">{ma.summary ?? "What visitors remember."}</p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="Risk Perception" />
          {rp ? (
            <>
              <div className="text-xs font-semibold text-slate-200">{riskLevel ?? "—"}</div>
              {uncertainty && uncertainty.length > 0 && (
                <ul className="list-disc pl-4 text-[11px] text-slate-400">
                  {uncertainty.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {rp.safety_requests && rp.safety_requests.length > 0 && (
                <p className="text-[11px] text-slate-500">
                  Users look for: {rp.safety_requests.join(", ")}
                </p>
              )}
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>

        <div className={cardBase}>
          <CardTitle title="CTA Match" />
          {cta ? (
            <>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                {ctaMetrics.map((metric) => (
                  <span key={metric.label}>
                    {metric.label}: {typeof metric.value === "number" ? `${metric.value}%` : "—"}
                  </span>
                ))}
              </div>
              {cta.strength && (
                <p className="text-xs font-semibold text-slate-200">{cta.strength}</p>
              )}
              {cta.friction_points && cta.friction_points.length > 0 && (
                <ul className="list-disc pl-4 text-[11px] text-slate-400">
                  {cta.friction_points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              <p className="text-[11px] text-slate-500">
                {cta.recommendation ?? "Alignment between CTA and motivation."}
              </p>
            </>
          ) : (
            <EmptyLabel />
          )}
        </div>
      </div>
    </section>
  );
}

function CardTitle({ title }: { title: string }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{title}</div>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-200">
        {typeof value === "number" ? `${value}%` : "—"}
      </div>
    </div>
  );
}

function EmptyLabel() {
  return <p className="mt-2 text-[11px] text-slate-500">No data available yet.</p>;
}





"use client";

import { useState } from "react";
import {
  Shield,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Rocket,
  Eye,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react";
import type { VisualTrustResult, VisualTrustAnalysis } from "@/app/ai-marketing/brain-types";

type Props = {
  visualTrust?: VisualTrustResult | null;
  analysis?: VisualTrustResult | VisualTrustAnalysis | null;
  data?: VisualTrustResult | VisualTrustAnalysis | null;
};

// Helper to format role name for display
function formatRoleName(role: string): string {
  const roleMap: Record<string, string> = {
    headline: "Hero Title",
    subheadline: "Subheadline",
    primary_cta: "Primary CTA",
    secondary_cta: "Secondary CTA",
    benefit_card: "Benefit Card",
    trust_badge: "Trust Badge",
    pricing_block: "Pricing Block",
    hero_image: "Hero Image",
  };
  return roleMap[role] || role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Extract key insights from elements - decision-focused
function extractKeyInsights(analysis: VisualTrustResult) {
  const insights: Array<{
    type: "strength" | "weakness" | "risk" | "quickWin";
    element: string;
    reason: string;
    priority: number; // 1 = highest priority
    elementData?: any;
  }> = [];

  const elements = analysis.elements || [];
  const score = analysis.overall_score || 0;

  // STRONGEST SIGNAL - Find element with highest trust impact
  const strongest = elements
    .filter((el) => el.analysis?.trust_impact === "High")
    .sort((a, b) => {
      if (!a.text && b.text) return 1;
      if (a.text && !b.text) return -1;
      return 0;
    })[0];

  if (strongest) {
    const reasonText = strongest.analysis?.notes || strongest.analysis?.clarity || "";
    // Extract first actionable sentence (max 12 words)
    const reason = reasonText
      .split(/[.!?]/)
      .find((s) => s.trim().split(/\s+/).length <= 12 && s.trim().length > 0) || 
      "Strong visual signal builds trust";
    
    insights.push({
      type: "strength",
      element: formatRoleName(strongest.role),
      reason: reason.trim().substring(0, 70),
      priority: 5,
      elementData: strongest,
    });
  }

  // WEAKEST SIGNAL - Find critical weakness
  const weakest = elements
    .filter((el) => el.analysis?.trust_impact === "Low" || !el.text)
    .sort((a, b) => {
      // Prioritize critical elements (CTA, headline)
      const criticalRoles = ["primary_cta", "headline"];
      const aCritical = criticalRoles.includes(a.role);
      const bCritical = criticalRoles.includes(b.role);
      if (aCritical && !bCritical) return -1;
      if (!aCritical && bCritical) return 1;
      if (a.analysis?.trust_impact === "Low" && b.analysis?.trust_impact !== "Low") return -1;
      return 0;
    })[0];

  if (weakest) {
    const reasonText = weakest.analysis?.notes || "";
    const reason = reasonText
      .split(/[.!?]/)
      .find((s) => s.trim().split(/\s+/).length <= 12 && s.trim().length > 0) ||
      "Needs improvement for trust";
    
    insights.push({
      type: "weakness",
      element: formatRoleName(weakest.role),
      reason: reason.trim().substring(0, 70),
      priority: 1, // Highest priority to fix
      elementData: weakest,
    });
  }

  // RISKY ASSUMPTION - Missing trust signals
  const hasTrustBadge = elements.some((el) => el.role === "trust_badge");
  const hasTestimonial = elements.some((el) => el.role === "testimonial");
  const hasNumericProof = elements.some((el) => 
    el.text && /\d+/.test(el.text) && (el.role === "testimonial" || el.role === "trust_badge")
  );

  if (!hasTrustBadge && !hasTestimonial && !hasNumericProof && score < 80) {
    insights.push({
      type: "risk",
      element: "Trust Signals",
      reason: "No human or numeric proof detected",
      priority: 2,
    });
  }

  // QUICK WIN - CTA improvements
  const cta = elements.find((el) => el.role === "primary_cta" || el.role === "secondary_cta");
  if (cta) {
    const hasUrgency = cta.text?.toLowerCase().includes("now") || 
                       cta.text?.toLowerCase().includes("today") ||
                       cta.text?.toLowerCase().includes("time");
    const hasOutcome = cta.text?.toLowerCase().includes("get") || 
                       cta.text?.toLowerCase().includes("start");
    
    if (!hasUrgency && hasOutcome) {
      insights.push({
        type: "quickWin",
        element: "CTA Copy",
        reason: "Add urgency or time constraint",
        priority: 3,
      });
    }
  }

  // Sort by priority (lowest number = highest priority)
  return insights.sort((a, b) => a.priority - b.priority).slice(0, 5);
}

// Get diagnostic sentence - one sentence, includes weakness if score < 90
function getDiagnosticSentence(analysis: VisualTrustResult): string {
  const score = analysis.overall_score || 0;
  
  // If score < 90, must include weakness
  if (score < 90) {
    // Try narrative first
    if (analysis.narrative && analysis.narrative.length > 0) {
      const weaknessLine = analysis.narrative.find(
        (line) =>
          line.toLowerCase().includes("missing") ||
          line.toLowerCase().includes("lack") ||
          line.toLowerCase().includes("weak") ||
          line.toLowerCase().includes("no ") ||
          line.toLowerCase().includes("without")
      );
      if (weaknessLine) {
        // Clean and shorten
        let cleaned = weaknessLine
          .replace(/^The (landing page|page|site) /i, "")
          .replace(/^This (landing page|page|site) /i, "")
          .replace(/\.$/, "");
        // Ensure it's one sentence
        cleaned = cleaned.split(/[.!?]/)[0];
        return cleaned.substring(0, 120);
      }
    }
    
    // Fallback based on score
    if (score >= 70) {
      return "Strong clarity and structure, but trust relies more on design than proof.";
    } else if (score >= 50) {
      return "Basic trust elements present, but missing critical signals like testimonials or social proof.";
    } else {
      return "Trust signals are weak. Missing key elements like trust badges, testimonials, or clear value proposition.";
    }
  }

  // Score >= 90
  if (analysis.narrative && analysis.narrative.length > 0) {
    const firstLine = analysis.narrative[0].split(/[.!?]/)[0];
    return firstLine.substring(0, 120);
  }

  return "Strong visual trust signals throughout the page.";
}

export default function VisualTrustCard({ visualTrust, analysis, data }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const currentAnalysis = visualTrust || analysis || data;

  if (!currentAnalysis) return null;

  // Reject old format
  if (
    "trust_label" in currentAnalysis ||
    "trust_scores" in currentAnalysis ||
    "low_percent" in currentAnalysis ||
    "medium_percent" in currentAnalysis ||
    "high_percent" in currentAnalysis
  ) {
    return (
      <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4">
        <p className="text-xs text-amber-300">
          ⚠️ Legacy format detected. Please update backend.
        </p>
      </div>
    );
  }

  // Verify structure
  if (
    !("status" in currentAnalysis) ||
    !("elements" in currentAnalysis) ||
    !Array.isArray(currentAnalysis.elements) ||
    !("narrative" in currentAnalysis) ||
    !Array.isArray(currentAnalysis.narrative)
  ) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
        <p className="text-xs text-red-300">Invalid response structure.</p>
      </div>
    );
  }

  // Handle unavailable status
  if (currentAnalysis.status === "unavailable") {
    return (
      <div className="rounded-lg border border-slate-800/50 bg-slate-950/30 p-4">
        <p className="text-sm text-slate-400">
          Visual trust analysis was not performed for this image.
        </p>
      </div>
    );
  }

  const isFallback = currentAnalysis.status === "fallback";
  const label = currentAnalysis.label || null;
  const score = currentAnalysis.overall_score ?? null;
  const diagnosticSentence = getDiagnosticSentence(currentAnalysis);
  const keyInsights = extractKeyInsights(currentAnalysis);

  // Score color gradient
  const getScoreColor = () => {
    if (!score) return "from-slate-500 to-slate-600";
    if (score >= 80) return "from-emerald-500 to-cyan-500";
    if (score >= 60) return "from-amber-500 to-yellow-500";
    return "from-red-500 to-rose-500";
  };

  // Label color
  const labelColor =
    label === "High"
      ? "text-emerald-400"
      : label === "Low"
      ? "text-red-400"
      : "text-amber-400";

  // Insight configuration
  const getInsightConfig = (type: string) => {
    switch (type) {
      case "strength":
        return {
          icon: TrendingUp,
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          textColor: "text-emerald-300",
          label: "Strength",
        };
      case "weakness":
        return {
          icon: TrendingDown,
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          textColor: "text-red-300",
          label: "Weakness",
        };
      case "risk":
        return {
          icon: AlertCircle,
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/30",
          textColor: "text-amber-300",
          label: "Risk",
        };
      case "quickWin":
        return {
          icon: Zap,
          bgColor: "bg-cyan-500/10",
          borderColor: "border-cyan-500/30",
          textColor: "text-cyan-300",
          label: "Quick Win",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-slate-500/10",
          borderColor: "border-slate-500/30",
          textColor: "text-slate-300",
          label: "Insight",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* LAYER 1: Visual Trust Snapshot */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6">
        {/* Background gradient accent */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getScoreColor()} opacity-5 pointer-events-none`} />
        
        <div className="relative space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getScoreColor()} bg-opacity-10 border border-slate-700/50`}>
                <Shield className={`w-5 h-5 ${labelColor}`} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Visual Trust</h3>
                {isFallback && (
                  <p className="text-xs text-amber-400/80">Heuristic mode</p>
                )}
              </div>
            </div>
            
            {/* Score badge */}
            {label && score !== null && (
              <div className="flex flex-col items-end gap-1">
                <div className={`text-2xl font-bold ${labelColor}`}>
                  {Math.round(score)}
                  <span className="text-sm text-slate-400 font-normal">/100</span>
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}>
                  {label}
                </div>
              </div>
            )}
          </div>

          {/* Diagnostic sentence */}
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            {diagnosticSentence}
          </p>
        </div>
      </div>

      {/* LAYER 2: Key Visual Signals */}
      {keyInsights.length > 0 && (
        <div className="space-y-2.5">
          {keyInsights.map((insight, idx) => {
            const config = getInsightConfig(insight.type);
            const Icon = config.icon;
            const isPriority = insight.priority <= 2;

            return (
              <div
                key={idx}
                className={`relative rounded-lg border ${config.borderColor} ${config.bgColor} p-3.5 transition-all hover:border-opacity-60 ${
                  isPriority ? "ring-1 ring-offset-1 ring-offset-slate-900 ring-slate-600/50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md ${config.bgColor} border ${config.borderColor}`}>
                    <Icon className={`w-4 h-4 ${config.textColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wide ${config.textColor}`}>
                        {config.label}
                      </span>
                      {isPriority && (
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                          Priority
                        </span>
                      )}
                      <span className="text-slate-500">•</span>
                      <span className="text-sm font-semibold text-white">{insight.element}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{insight.reason}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LAYER 3: Advanced View (Collapsible) */}
      {currentAnalysis.elements.length > 0 && (
        <div className="rounded-lg border border-slate-800/50 bg-slate-950/30 overflow-hidden">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-900/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Visual map</span>
              <span className="text-xs text-slate-500">
                ({currentAnalysis.elements.length} elements)
              </span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="border-t border-slate-800/50 p-4 space-y-4 bg-slate-950/50">
              {/* Elements Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {currentAnalysis.elements.map((el) => (
                  <div
                    key={el.id}
                    className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm text-white">
                        {formatRoleName(el.role)}
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                        {el.approx_position.replace(/-/g, " ")}
                      </span>
                    </div>
                    
                    {el.text && (
                      <p className="text-xs text-slate-300 line-clamp-2">{el.text}</p>
                    )}
                    
                    {el.visual_cues && el.visual_cues.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {el.visual_cues.slice(0, 3).map((cue, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                          >
                            {cue}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {el.analysis?.notes && (
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {el.analysis.notes}
                      </p>
                    )}
                    
                    {el.analysis?.trust_impact && (
                      <div className="pt-1 border-t border-slate-800/50">
                        <span
                          className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium ${
                            el.analysis.trust_impact === "High"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                              : el.analysis.trust_impact === "Low"
                              ? "bg-red-500/10 text-red-300 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          }`}
                        >
                          Impact: {el.analysis.trust_impact}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Narrative */}
              {currentAnalysis.narrative && currentAnalysis.narrative.length > 0 && (
                <div className="pt-3 border-t border-slate-800/50">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                    Analysis Summary
                  </h4>
                  <ul className="space-y-1.5">
                    {currentAnalysis.narrative.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Raw JSON */}
              <div className="pt-3 border-t border-slate-800/50">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Raw Response
                </h4>
                <pre className="text-[10px] text-slate-500 p-3 bg-black/40 rounded border border-slate-800/50 overflow-auto max-h-64 font-mono">
                  {JSON.stringify(currentAnalysis, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

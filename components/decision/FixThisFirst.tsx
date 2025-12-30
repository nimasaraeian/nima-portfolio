"use client";

import React from "react";
import { NormalizedDecisionReport } from "@/lib/normalizeDecisionReport";
import { 
  resolveTrustSignals, 
  getContextRecommendation, 
  isLandingPage, 
  getLandingPageBlocker 
} from "@/lib/trustSignalResolver";
import { filterEvidenceBullets } from "@/lib/evidenceFilter";

type FixThisFirstProps = {
  report: NormalizedDecisionReport;
  fixFactor?: {
    title: string;
    what: string;
    why: string;
    where: string;
    impact: "High" | "Medium" | "Low";
    effort: "Low" | "Medium" | "High";
    examples: string[];
    leverage: "highest" | "secondary";
    cause_id: string;
  };
};

export default function FixThisFirst({ report, fixFactor }: FixThisFirstProps) {
  // Defensive check first
  if (!report) {
    return null;
  }
  
  // Use fixFactor if provided, otherwise fall back to fix_first
  const fix = fixFactor || report.fix_first;
  
  if (!fix || !fix.title) {
    return null;
  }
  
  // Initialize all variables at the top to avoid scope issues
  const isMultiple = !!fixFactor;
  const leverage = (fixFactor?.leverage || "highest") as "highest" | "secondary";
  const isSecondary = leverage === "secondary";
  
  // Defensive checks with fallbacks - remove generic text
  const title = typeof fix.title === 'string' ? fix.title : String(fix.title || "Add visible trust signals before the primary CTA");
  const what = typeof fix.what === 'string' ? fix.what : (fix.what ? String(fix.what) : title);
  
  // Get driver info for Highest card - always initialize at function scope
  let driverTitle: string = "";
  if (leverage === "highest") {
    try {
      const drivers = report?.decision?.drivers || 
        report?.decision_model?.drivers || 
        report?.raw?.decision?.drivers || 
        report?.raw?.decision_model?.drivers || 
        [];
      
      if (drivers && Array.isArray(drivers) && drivers.length > 0) {
        const primaryDriver = drivers.find((d: any) => d?.role === "primary") || 
          drivers.sort((a: any, b: any) => (b?.score || 0) - (a?.score || 0))[0];
        
        if (primaryDriver) {
          const driverId = primaryDriver.id || primaryDriver.factor || "";
          if (driverId && typeof driverId === 'string') {
            driverTitle = driverId.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
          }
        }
      }
    } catch (e) {
      // Silently fail - driverTitle remains empty string
      driverTitle = "";
    }
  }
  
  // Behavioral rewrite for "why" - make it psychology-focused
  let why: string;
  if (fix.why && !fix.why.includes("This change will help") && !fix.why.includes("Recommended improvement")) {
    why = fix.why;
  } else {
    // Generate behavioral explanation based on cause ID
    const causeIdRaw = fixFactor?.cause_id || report.primary_blocker?.id || "";
    const causeId = typeof causeIdRaw === 'string' ? causeIdRaw : String(causeIdRaw || "");
    if (causeId.includes("trust")) {
      why = "Users seek validation before committing cognitive effort. Lack of early trust delays action.";
    } else if (causeId.includes("cta")) {
      why = "Users need a clear, single path forward. Multiple competing actions create decision paralysis.";
    } else if (causeId.includes("value")) {
      why = "Users can't understand what you offer. Clear value reduces confusion and accelerates decisions.";
    } else if (causeId.includes("friction")) {
      why = "Complex processes create hesitation. Simpler paths reduce cognitive load and increase action.";
    } else {
      why = "This addresses the primary decision friction preventing users from taking action.";
    }
  }
  
  const where = typeof fix.where === 'string' ? fix.where : String(fix.where || "Page");
  const impact = (fix.impact || "Medium") as "High" | "Medium" | "Low";
  const effort = (fix.effort || "Medium") as "Low" | "Medium" | "High";
  
  // For Highest: get single action recommendation
  // For Secondary: get trade-off explanation
  let singleAction = "";
  let tradeOffLine = "";
  
  if (leverage === "highest") {
    // Get single top action
    const causeIdRaw = fixFactor?.cause_id || report.primary_blocker?.id || "";
    const causeId = typeof causeIdRaw === 'string' ? causeIdRaw : String(causeIdRaw || "");
    const isLanding = isLandingPage(report);
    const isTrustPrimary = causeId.toLowerCase().includes("trust");
    
    if (isLanding) {
      const landingBlocker = getLandingPageBlocker(report);
      if (landingBlocker && landingBlocker.fixes.length > 0) {
        singleAction = landingBlocker.fixes[0].action;
      }
    } else if (isTrustPrimary) {
      const trustSignals = resolveTrustSignals(report);
      if (trustSignals.length > 0) {
        singleAction = trustSignals[0].action;
      }
    } else {
      const contextRec = getContextRecommendation(report);
      if (contextRec && contextRec.signals.length > 0) {
        singleAction = contextRec.signals[0].action;
      }
    }
    
    // Fallback to fix title if no action found
    if (!singleAction) {
      singleAction = title;
    }
  } else {
    // Secondary: generate trade-off line
    const causeIdRaw = fixFactor?.cause_id || "";
    const causeId = typeof causeIdRaw === 'string' ? causeIdRaw : String(causeIdRaw || "");
    if (causeId.includes("trust")) {
      tradeOffLine = "Supports the primary fix by improving trust signals before users see the offer.";
    } else if (causeId.includes("cta")) {
      tradeOffLine = "Supports the primary fix by clarifying the next step after initial engagement.";
    } else if (causeId.includes("value") || causeId.includes("offer")) {
      tradeOffLine = "Supports the primary fix by making the value proposition clearer.";
    } else if (causeId.includes("visual")) {
      tradeOffLine = "Supports the primary fix by improving visual hierarchy and reducing distraction.";
    } else {
      tradeOffLine = "Supports the primary fix by addressing a secondary decision factor.";
    }
  }
  
  // Generate expected behavioral shift
  const getBehavioralShift = (): string => {
    const causeIdRaw = fixFactor?.cause_id || report.primary_blocker?.id || "";
    const causeId = typeof causeIdRaw === 'string' ? causeIdRaw : String(causeIdRaw || "");
    if (causeId.includes("trust")) {
      return "Hesitation → Validation → Action";
    } else if (causeId.includes("cta")) {
      return "Confusion → Clarity → Action";
    } else if (causeId.includes("value")) {
      return "Uncertainty → Understanding → Action";
    } else if (causeId.includes("friction")) {
      return "Resistance → Ease → Action";
    }
    return "Hesitation → Clarity → Action";
  };

  return (
    <div className={`rounded-2xl border-2 ${leverage === "highest" ? "border-green-500/50 bg-green-500/10" : "border-blue-500/50 bg-blue-500/10"} p-8`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">
          {leverage === "highest" ? "Highest Leverage Fix" : "Secondary Leverage Fix"}
        </h2>
        {isMultiple && (
          <span className={`text-xs px-3 py-1 rounded-full ${leverage === "highest" ? "bg-green-500/30 text-green-200 border border-green-400/30" : "bg-blue-500/30 text-blue-200 border border-blue-400/30"}`}>
            {leverage === "highest" ? "Highest Impact" : "Secondary Impact"}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* What to Fix */}
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
            What to Fix
          </h3>
          <p className="text-2xl font-semibold text-white leading-relaxed">
            {title}
          </p>
        </div>

        {/* Driver Title (Highest only) */}
        {leverage === "highest" && driverTitle && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              Primary Driver
            </h3>
            <p className="text-xl font-medium text-white">
              {driverTitle}
            </p>
          </div>
        )}

        {/* Single Action (Highest only) */}
        {leverage === "highest" && singleAction && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              Action
            </h3>
            <p className="text-xl text-white/90 leading-relaxed">
              {singleAction}
            </p>
          </div>
        )}

        {/* Trade-off Line (Secondary only) */}
        {isSecondary && tradeOffLine && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              How This Supports Primary Fix
            </h3>
            <p className="text-xl text-white/90 leading-relaxed italic">
              {tradeOffLine}
            </p>
          </div>
        )}

        {/* What (detailed) - Show for Secondary or if no single action */}
        {(!singleAction || isSecondary) && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              What
            </h3>
            <p className="text-xl text-white/90 leading-relaxed">
              {what}
            </p>
          </div>
        )}

        {/* Why This Matters - Show for Secondary */}
        {isSecondary && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              Why This Matters
            </h3>
            <p className="text-xl text-white/90 leading-relaxed">
              {why}
            </p>
          </div>
        )}

        {/* Where - Show for Secondary */}
        {isSecondary && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              Where
            </h3>
            <p className="text-xl text-white">
              {where === "Page" ? "Hero section (before scroll)" : where}
            </p>
          </div>
        )}

        {/* Expected Behavioral Shift - Highest only */}
        {leverage === "highest" && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide">
              Expected Behavioral Shift
            </h3>
            <p className="text-xl text-white/90 leading-relaxed font-medium">
              {getBehavioralShift()}
            </p>
          </div>
        )}

        {/* Impact vs Effort */}
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/70">Impact</span>
              <span className="text-lg font-bold text-white capitalize">{impact}</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  impact === "High" ? "bg-green-500" :
                  impact === "Medium" ? "bg-yellow-500" :
                  "bg-blue-500"
                }`}
                style={{ width: impact === "High" ? "100%" : impact === "Medium" ? "66%" : "33%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/70">Effort</span>
              <span className="text-lg font-bold text-white capitalize">{effort}</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  effort === "Low" ? "bg-green-500" :
                  effort === "Medium" ? "bg-yellow-500" :
                  "bg-red-500"
                }`}
                style={{ width: effort === "Low" ? "33%" : effort === "Medium" ? "66%" : "100%" }}
              ></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

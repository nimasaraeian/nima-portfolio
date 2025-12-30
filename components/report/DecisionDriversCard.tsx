"use client";

import React from "react";
import { Driver, Report } from "@/lib/typesDecisionReport";

type DecisionDriversCardProps = {
  report: Report | any; // Allow any to work with normalized report
  pageMap?: {
    headline?: string;
    primary_cta?: string;
    offer?: string;
    trust_signals?: string[];
  };
};

export default function DecisionDriversCard({ report, pageMap }: DecisionDriversCardProps) {
  // Determine drivers list from multiple possible sources
  let drivers: Driver[] = [];
  
  if (report?.decision?.drivers && Array.isArray(report.decision.drivers)) {
    drivers = report.decision.drivers;
  } else if (report?.decision_model?.drivers && Array.isArray(report.decision_model.drivers)) {
    drivers = report.decision_model.drivers;
  } else if (report?.raw?.decision?.drivers && Array.isArray(report.raw.decision.drivers)) {
    drivers = report.raw.decision.drivers;
  } else if (report?.raw?.decision_model?.drivers && Array.isArray(report.raw.decision_model.drivers)) {
    drivers = report.raw.decision_model.drivers;
  }

  // If no drivers found, don't render the card (fallback to existing UI)
  if (!drivers || drivers.length === 0) {
    return null;
  }

  // Normalize driver structure - ensure they have id, score, role
  const normalizedDrivers: Driver[] = drivers.map((driver: any, index: number) => {
    const id = driver.id || driver.factor || driver.name || `driver_${index}`;
    const score = typeof driver.score === 'number' ? driver.score : (driver.weight || 0);
    const role = driver.role || (index === 0 ? "primary" : "secondary");
    
    return {
      id,
      score,
      role,
      evidence: driver.evidence || [],
      actions: driver.actions || [],
    };
  });

  // Identify primary driver
  const primaryDriver = normalizedDrivers.find(d => d.role === "primary") || 
    normalizedDrivers.sort((a, b) => b.score - a.score)[0];

  // Identify supporting drivers (not primary, score >= 0.30, max 2)
  const supportingDrivers = normalizedDrivers
    .filter(d => d.id !== primaryDriver.id && d.score >= 0.30)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  // Helper to get evidence bullets for a driver
  // Prefer: report.decision.drivers[].evidence OR report.supporting_evidence OR page_map fields
  const getEvidenceBullets = (driver: Driver): string[] => {
    // Priority 1: Driver's own evidence
    if (driver.evidence && driver.evidence.length > 0) {
      const evidence = driver.evidence
        .slice(0, 2)
        .map(ev => ev.quote_or_observation)
        .filter(ev => ev && 
          ev.trim() !== "" && 
          !ev.toLowerCase().includes("analysis completed") &&
          !ev.toLowerCase().includes("analysis complete"));
      if (evidence.length > 0) {
        return evidence;
      }
    }

    // Priority 2: supporting_evidence from report
    const supportingEvidence = report?.supporting_evidence || report?.raw?.supporting_evidence || [];
    if (supportingEvidence.length > 0) {
      const evidence = supportingEvidence
        .slice(0, 2)
        .map((item: any) => item.quote_or_observation || item.summary || item.why)
        .filter((ev: string) => ev && 
          ev.trim() !== "" && 
          !ev.toLowerCase().includes("analysis completed") &&
          !ev.toLowerCase().includes("analysis complete"));
      if (evidence.length > 0) {
        return evidence.slice(0, 2);
      }
    }
    
    // Priority 3: Fallback to page_map data
    const fallback: string[] = [];
    if (pageMap?.headline) {
      fallback.push(`Headline: ${pageMap.headline}`);
    }
    const ctaText = typeof pageMap?.primary_cta === 'string' 
      ? pageMap.primary_cta 
      : pageMap?.primary_cta?.text;
    if (ctaText) {
      fallback.push(`Primary CTA: ${ctaText}`);
    }
    const offerValue = typeof pageMap?.offer === 'string'
      ? pageMap.offer
      : pageMap?.offer?.value;
    if (offerValue && fallback.length < 2) {
      fallback.push(`Offer: ${offerValue}`);
    }
    if (pageMap?.trust_signals && pageMap.trust_signals.length > 0 && fallback.length < 2) {
      fallback.push(`Trust signals: ${pageMap.trust_signals.join(", ")}`);
    }
    
    return fallback.slice(0, 2);
  };

  const primaryEvidence = getEvidenceBullets(primaryDriver);
  const primaryScorePercent = Math.round(primaryDriver.score * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <h2 className="text-2xl font-bold text-white mb-2">
        Decision drivers
      </h2>
      <p className="text-sm text-white/60 mb-6">
        Dominant driver is shown first — supporting drivers also influence the decision.
      </p>

      {/* Primary driver */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white/90">
            Primary driver
          </h3>
          <span className="text-sm text-white/60">
            {primaryScorePercent}%
          </span>
        </div>
        <div className="mb-4">
          <p className="text-xl font-medium text-white mb-2">
            {primaryDriver.id.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
          </p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${primaryScorePercent}%` }}
            ></div>
          </div>
        </div>
        
        {/* Evidence bullets for primary driver */}
        {primaryEvidence.length > 0 && (
          <div className="mt-4 space-y-2">
            {primaryEvidence.map((evidence, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-white/40 mt-1.5">•</span>
                <p className="text-sm text-white/70 flex-1">
                  {evidence}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Supporting drivers */}
      {supportingDrivers.length > 0 && (
        <div className="pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white/90 mb-4">
            Supporting drivers
          </h3>
          <div className="space-y-4">
            {supportingDrivers.map((driver) => {
              const driverScorePercent = Math.round(driver.score * 100);
              const driverEvidence = getEvidenceBullets(driver);
              const driverLabel = driver.id.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <div key={driver.id} className="p-4 rounded-lg border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-medium text-white">
                      {driverLabel}
                    </p>
                    <span className="text-xs text-white/60">
                      {driverScorePercent}%
                    </span>
                  </div>
                  
                  {/* Evidence bullets for supporting driver */}
                  {driverEvidence.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {driverEvidence.map((evidence, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-white/40 mt-1">•</span>
                          <p className="text-xs text-white/60 flex-1">
                            {evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


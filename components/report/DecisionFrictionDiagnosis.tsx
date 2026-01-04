"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type DecisionFrictionDiagnosisProps = {
  report: UiReport;
};

export default function DecisionFrictionDiagnosis({ report }: DecisionFrictionDiagnosisProps) {
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const primaryBlocker = report.summary?.primaryProblemTitle || "Unclear value proposition";
  
  // Determine decision speed
  const getDecisionSpeed = () => {
    if (decisionStyleLabel === "Fast & intuitive decision") {
      return "fast, intuitive decisions";
    } else if (decisionStyleLabel === "Slow & deliberate decision") {
      return "slow, deliberate decisions";
    } else {
      return "mixed decision patterns";
    }
  };
  
  // Determine page signals
  const getPageSignals = () => {
    const blockerLower = primaryBlocker.toLowerCase();
    
    if (blockerLower.includes("trust")) {
      return "lacks trust signals (testimonials, credentials, social proof)";
    } else if (blockerLower.includes("cta") || blockerLower.includes("call-to-action")) {
      return "lacks clear next steps or has competing actions";
    } else if (blockerLower.includes("value") || blockerLower.includes("proposition")) {
      return "doesn't clearly communicate value or benefits";
    } else if (blockerLower.includes("friction")) {
      return "has too much friction in the conversion path";
    } else {
      return "lacks clarity and direction";
    }
  };
  
  // Explain the mismatch
  const getMismatchExplanation = () => {
    if (decisionStyleLabel === "Fast & intuitive decision") {
      return "Users want to act quickly, but the page doesn't provide immediate clarity or clear next steps. This creates friction because users can't make a fast decision when they're uncertain.";
    } else if (decisionStyleLabel === "Slow & deliberate decision") {
      return "Users need time to evaluate, but the page doesn't provide enough information, proof, or trust signals. This creates friction because users can't make a confident decision without sufficient evidence.";
    } else {
      return "Users have mixed decision patterns, but the page doesn't support either style effectively. Some users need immediate clarity while others need detailed information—the page fails to provide both.";
    }
  };

  const decisionSpeed = getDecisionSpeed();
  const pageSignals = getPageSignals();
  const mismatchExplanation = getMismatchExplanation();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Decision Friction Diagnosis</h2>
      
      <div className="space-y-6 text-lg text-white/90 leading-relaxed">
        <div>
          <p className="mb-2">
            <strong className="text-white">Users on this page make:</strong> {decisionSpeed}
          </p>
          <p>
            <strong className="text-white">However, this page:</strong> {pageSignals}
          </p>
        </div>
        
        <div className="pt-4 border-t border-white/10">
          <p className="text-xl text-white mb-2">The Mismatch</p>
          <p className="text-white/80">
            {mismatchExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}










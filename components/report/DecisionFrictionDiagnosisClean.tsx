"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type DecisionFrictionDiagnosisCleanProps = {
  report: UiReport;
};

export default function DecisionFrictionDiagnosisClean({ report }: DecisionFrictionDiagnosisCleanProps) {
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const primaryBlocker = report.summary?.primaryProblemTitle || "Unclear value proposition";
  
  // Explain user's decision style
  const getDecisionStyleExplanation = () => {
    if (decisionStyleLabel === "Fast & intuitive decision") {
      return "Users make quick, instinctive decisions. They scan for immediate clarity and want to act fast.";
    } else if (decisionStyleLabel === "Slow & deliberate decision") {
      return "Users take time to evaluate. They need detailed information, proof, and trust signals before acting.";
    } else {
      return "Users have mixed decision patterns. Some act quickly while others need more information.";
    }
  };
  
  // Explain the mismatch
  const getMismatchExplanation = () => {
    const blockerLower = primaryBlocker.toLowerCase();
    
    if (blockerLower.includes("trust")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "Users want to act quickly but can't find proof to feel safe. The page lacks trust signals (testimonials, credentials, social proof) that fast decision-makers need."
        : "Users need time to evaluate but can't find trust signals. The page doesn't provide the evidence deliberate decision-makers require.";
    } else if (blockerLower.includes("cta") || blockerLower.includes("call-to-action")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "Users want to act immediately but can't see where to go. The page lacks a clear, prominent call-to-action."
        : "Users need a clear path forward but see competing actions. The page creates confusion instead of direction.";
    } else if (blockerLower.includes("value") || blockerLower.includes("proposition")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "Users want to understand value quickly but it's not obvious. The page doesn't communicate benefits clearly."
        : "Users need detailed value information but it's missing. The page doesn't provide enough information to evaluate.";
    } else if (blockerLower.includes("friction")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "Users want to move quickly but the process is too complex. The page creates unnecessary barriers."
        : "Users need a smooth process but encounter friction. The page makes evaluation difficult.";
    } else {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "Users want immediate clarity but the page lacks direction. Fast decision-makers can't find what they need."
        : "Users need clear information but the page is unclear. Deliberate decision-makers can't evaluate effectively.";
    }
  };
  
  // Why users hesitate (clear answer)
  const getHesitationReason = () => {
    const blockerLower = primaryBlocker.toLowerCase();
    const styleLower = decisionStyleLabel.toLowerCase();
    
    if (styleLower.includes("fast")) {
      if (blockerLower.includes("trust")) {
        return "Fast decision-makers hesitate because they can't quickly verify trustworthiness. Without visible proof, they pause and often leave.";
      } else if (blockerLower.includes("cta")) {
        return "Fast decision-makers hesitate because the next step isn't clear. They want to act immediately but can't see how.";
      } else {
        return "Fast decision-makers hesitate because they can't quickly understand what to do. The page doesn't support their need for immediate clarity.";
      }
    } else if (styleLower.includes("slow")) {
      if (blockerLower.includes("trust")) {
        return "Deliberate decision-makers hesitate because they can't find enough proof to build confidence. Without trust signals, they can't evaluate safely.";
      } else if (blockerLower.includes("cta")) {
        return "Deliberate decision-makers hesitate because multiple competing actions create confusion. They need one clear path forward.";
      } else {
        return "Deliberate decision-makers hesitate because they lack the information needed to evaluate. The page doesn't support their need for detailed assessment.";
      }
    } else {
      return "Users hesitate because the page doesn't support either decision style effectively. Fast decision-makers lack clarity, while deliberate decision-makers lack information.";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Decision Friction Diagnosis</h2>
      
      <div className="space-y-6 text-lg text-white/90 leading-relaxed">
        {/* User's Decision Style */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">User's Decision Style</h3>
          <p>{getDecisionStyleExplanation()}</p>
        </div>
        
        {/* The Mismatch */}
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-3">The Mismatch</h3>
          <p>{getMismatchExplanation()}</p>
        </div>
        
        {/* Why Users Hesitate */}
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-3">Why Users Hesitate</h3>
          <p className="text-xl text-white font-medium">
            {getHesitationReason()}
          </p>
        </div>
      </div>
    </div>
  );
}







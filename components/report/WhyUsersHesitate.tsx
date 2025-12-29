"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type WhyUsersHesitateProps = {
  report: UiReport;
};

export default function WhyUsersHesitate({ report }: WhyUsersHesitateProps) {
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const primaryBlocker = report.summary?.primaryProblemTitle || "Unclear value proposition";
  
  // Determine decision pattern
  const getDecisionPattern = () => {
    if (decisionStyleLabel === "Fast & intuitive decision") {
      return "quickly and intuitively, scanning for immediate clarity and a clear next step";
    } else if (decisionStyleLabel === "Slow & deliberate decision") {
      return "carefully, needing time to evaluate options, compare details, and build confidence";
    } else {
      return "with mixed patterns—some want immediate clarity, others need detailed information";
    }
  };
  
  // Determine the conflict
  const getConflict = () => {
    const blockerLower = primaryBlocker.toLowerCase();
    
    if (blockerLower.includes("trust")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "act quickly without seeing proof they can trust the offer"
        : "build confidence when trust signals are missing or hard to find";
    } else if (blockerLower.includes("cta") || blockerLower.includes("call-to-action")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "move forward immediately when the next step isn't clear"
        : "find a clear path when multiple competing actions create confusion";
    } else if (blockerLower.includes("value") || blockerLower.includes("proposition")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "understand the value quickly when it's not immediately obvious"
        : "evaluate the offer when the value proposition is unclear or buried";
    } else if (blockerLower.includes("friction")) {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "move quickly through a process that feels too complex"
        : "feel confident proceeding when the process has unnecessary barriers";
    } else {
      return decisionStyleLabel === "Fast & intuitive decision"
        ? "act quickly when clarity is missing"
        : "make informed decisions when information is unclear";
    }
  };
  
  // Name the cognitive conflict explicitly
  const getCognitiveConflict = () => {
    if (decisionStyleLabel === "Fast & intuitive decision") {
      const blockerLower = primaryBlocker.toLowerCase();
      if (blockerLower.includes("trust")) {
        return "Speed vs. Safety: Users want to act fast but need proof to feel safe.";
      } else if (blockerLower.includes("cta")) {
        return "Speed vs. Clarity: Users want to move quickly but can't see where to go.";
      } else if (blockerLower.includes("value")) {
        return "Speed vs. Understanding: Users want to act immediately but can't quickly grasp the value.";
      } else {
        return "Speed vs. Certainty: Users want to act fast but lack the clarity to feel certain.";
      }
    } else {
      const blockerLower = primaryBlocker.toLowerCase();
      if (blockerLower.includes("trust")) {
        return "Evaluation vs. Trust: Users need time to evaluate but can't find trust signals to build confidence.";
      } else if (blockerLower.includes("cta")) {
        return "Deliberation vs. Direction: Users want to consider options but can't find a clear path forward.";
      } else if (blockerLower.includes("value")) {
        return "Deliberation vs. Information: Users need details to decide but the value isn't clearly communicated.";
      } else {
        return "Deliberation vs. Clarity: Users need time to decide but lack clear information to do so.";
      }
    }
  };

  const decisionPattern = getDecisionPattern();
  const conflict = getConflict();
  const cognitiveConflict = getCognitiveConflict();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Why Users Hesitate</h2>
      
      <div className="space-y-4 text-lg text-white/90 leading-relaxed">
        <p>
          Users on this page make decisions <strong>{decisionPattern}</strong>. However, this page forces them to <strong>{conflict}</strong>.
        </p>
        
        <div className="pt-4 border-t border-white/10">
          <p className="font-semibold text-white mb-2">The internal conflict:</p>
          <p className="text-xl text-white">
            {cognitiveConflict}
          </p>
        </div>
        
        <p className="text-white/80 pt-2">
          This mismatch between how users want to decide and what the page provides creates hesitation. Visitors pause, reconsider, and often leave without acting because the page doesn't support their decision-making style.
        </p>
      </div>
    </div>
  );
}

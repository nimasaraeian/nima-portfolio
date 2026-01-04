"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type WhatThisMeansProps = {
  report: UiReport;
};

export default function WhatThisMeans({ report }: WhatThisMeansProps) {
  const decisionStyleLabel = report.summary?.decisionStyleLabel || "Mixed decision style";
  const problemTitle = report.summary?.primaryProblemTitle || "Unclear value proposition";
  const whyUsersHesitate = report.narrative?.whyUsersHesitate || 
    "Users hesitate due to unclear messaging and lack of clear next steps.";

  // Generate human explanation based on decision style
  const getDecisionExplanation = () => {
    if (decisionStyleLabel === "Fast & intuitive decision") {
      return "Users make quick decisions here. They scan the page in seconds and either act or leave. They're looking for immediate clarity and a clear next step.";
    } else if (decisionStyleLabel === "Slow & deliberate decision") {
      return "Users take time to evaluate here. They need more information, proof, and reassurance before acting. They're looking for details, credentials, and trust signals.";
    } else {
      return "Users have mixed decision patterns on this page. Some need immediate clarity while others want detailed information. The page must support both.";
    }
  };

  const getHesitationExplanation = () => {
    const problemLower = problemTitle.toLowerCase();
    if (problemLower.includes("trust")) {
      return "They hesitate because they don't see enough proof that you're credible. Without testimonials, credentials, or social proof, they can't feel confident about taking action.";
    } else if (problemLower.includes("cta") || problemLower.includes("call-to-action")) {
      return "They hesitate because the next step isn't clear. When visitors can't instantly see what to do, they leave before engaging.";
    } else if (problemLower.includes("friction")) {
      return "They hesitate because the path to conversion has too many steps or barriers. Each extra click or form field reduces the chance they'll complete the action.";
    } else {
      return whyUsersHesitate;
    }
  };

  const getSubconsciousLookFor = () => {
    const problemLower = problemTitle.toLowerCase();
    if (problemLower.includes("trust")) {
      return "Subconsciously, they're looking for social proof—testimonials, reviews, logos of companies you've worked with, or certifications that validate your credibility.";
    } else if (problemLower.includes("cta") || problemLower.includes("call-to-action")) {
      return "Subconsciously, they're looking for a clear button or link that tells them exactly what happens next. The action should be obvious and feel safe to click.";
    } else {
      return "Subconsciously, they're looking for signals that this is the right choice—clear value, low risk, and an easy path forward.";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">What This Means</h2>
      
      <div className="space-y-6">
        {/* How users decide */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">How users decide on this page</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {getDecisionExplanation()}
          </p>
        </div>

        {/* Why they hesitate */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Why they hesitate</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {getHesitationExplanation()}
          </p>
        </div>

        {/* What they subconsciously look for */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">What they subconsciously look for</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {getSubconsciousLookFor()}
          </p>
        </div>
      </div>
    </div>
  );
}










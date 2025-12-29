"use client";

import React from "react";
import { UiReport } from "@/lib/reportTypes";

type FixThisFirstProps = {
  report: UiReport;
};

// Get the single best fix
function getBestFix(actions: Array<{ title: string; why: string; whereLabel: string; priority: "high" | "medium" | "low" }>) {
  if (actions.length === 0) return null;
  
  const scored = actions.map((action, index) => {
    let impactScore = action.priority === "high" ? 3 : action.priority === "medium" ? 2 : 1;
    
    let effortScore = 2;
    const where = action.whereLabel.toLowerCase();
    if (where.includes("hero") || where.includes("cta")) {
      effortScore = 1;
    } else if (where.includes("form") || where.includes("checkout")) {
      effortScore = 3;
    }
    
    const score = impactScore * 2 - effortScore;
    
    return { 
      action, 
      score, 
      impact: impactScore === 3 ? "High" : impactScore === 2 ? "Medium" : "Low",
      effort: effortScore === 1 ? "Low" : effortScore === 2 ? "Medium" : "High"
    };
  });
  
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

// Generate concrete examples based on the fix
function getConcreteExamples(action: { title: string; why: string; whereLabel: string }) {
  const titleLower = action.title.toLowerCase();
  const where = action.whereLabel.toLowerCase();
  
  if (titleLower.includes("trust") || titleLower.includes("proof") || titleLower.includes("credibility")) {
    return {
      copyExamples: [
        "Customer testimonials with photos",
        "Trust badges (SSL, certifications, awards)",
        "Social proof numbers ('Join 10,000+ customers')",
      ],
      uiElements: [
        "Star ratings display",
        "Customer logo wall",
        "Security badges near CTA",
      ],
      placement: where.includes("hero") 
        ? "Place trust signals immediately visible in the hero section, above the fold"
        : where.includes("cta")
        ? "Place trust signals directly next to or above the main call-to-action button"
        : "Place trust signals near the primary action area",
    };
  } else if (titleLower.includes("cta") || titleLower.includes("call-to-action") || titleLower.includes("button")) {
    return {
      copyExamples: [
        "Clear action verb: 'Get Started', 'Start Free Trial', 'Book a Demo'",
        "Specific benefit: 'See Results in 30 Days'",
        "Risk reduction: 'No Credit Card Required'",
      ],
      uiElements: [
        "Large, contrasting button (minimum 44x44px)",
        "Single primary CTA (remove competing actions)",
        "Visual arrow or pointer directing attention",
      ],
      placement: where.includes("hero")
        ? "Place the CTA in the hero section, immediately after the headline"
        : "Place the CTA in a prominent, uncluttered area above the fold",
    };
  } else if (titleLower.includes("value") || titleLower.includes("proposition") || titleLower.includes("benefit")) {
    return {
      copyExamples: [
        "Clear headline: 'The fastest way to [achieve goal]'",
        "Specific numbers: 'Save 10 hours per week'",
        "Unique differentiator: 'The only tool that [unique feature]'",
      ],
      uiElements: [
        "Benefit-focused headline (not feature-focused)",
        "Visual comparison or before/after",
        "Clear value statement near the top",
      ],
      placement: "Place the value proposition in the hero section, as the first thing visitors see",
    };
  } else if (titleLower.includes("friction") || titleLower.includes("form") || titleLower.includes("step")) {
    return {
      copyExamples: [
        "Reduce form fields to only essential information",
        "Add progress indicator: 'Step 1 of 2'",
        "Show what happens next: 'We'll send you a link to get started'",
      ],
      uiElements: [
        "Multi-step form with progress bar",
        "Auto-fill where possible",
        "Clear exit option ('Skip for now')",
      ],
      placement: "Simplify the form flow and reduce the number of required fields",
    };
  }
  
  // Default examples
  return {
    copyExamples: [
      "Clear, benefit-focused messaging",
      "Specific, actionable language",
    ],
    uiElements: [
      "Improved visual hierarchy",
      "Clear next steps",
    ],
    placement: `Focus improvements in the ${where} area`,
  };
}

export default function FixThisFirst({ report }: FixThisFirstProps) {
  const actions = report.actions || [];
  const bestFix = getBestFix(actions);
  
  if (!bestFix) {
    return null;
  }

  const { action, impact, effort } = bestFix;
  const examples = getConcreteExamples(action);

  return (
    <div className="rounded-2xl border-2 border-green-500/50 bg-green-500/10 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Fix This First</h2>

      <div className="space-y-6">
        {/* What to Change */}
        <div>
          <h3 className="text-xl font-semibold text-white/70 mb-2">What to change</h3>
          <p className="text-2xl font-semibold text-white leading-relaxed">
            {action.title}
          </p>
        </div>

        {/* Impact, Effort, Where Grid */}
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {/* Impact */}
          <div>
            <div className="text-sm text-white/70 mb-2">Impact</div>
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-3 rounded-full ${
                impact === "High" ? "bg-green-500" : 
                impact === "Medium" ? "bg-yellow-500" : 
                "bg-blue-500"
              }`} style={{ width: impact === "High" ? "100%" : impact === "Medium" ? "66%" : "33%" }}></div>
              <span className="text-base font-semibold text-white min-w-[60px]">{impact}</span>
            </div>
          </div>
          
          {/* Effort */}
          <div>
            <div className="text-sm text-white/70 mb-2">Effort</div>
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-3 rounded-full ${
                effort === "Low" ? "bg-green-500" : 
                effort === "Medium" ? "bg-yellow-500" : 
                "bg-red-500"
              }`} style={{ width: effort === "Low" ? "33%" : effort === "Medium" ? "66%" : "100%" }}></div>
              <span className="text-base font-semibold text-white min-w-[60px]">{effort}</span>
            </div>
          </div>

          {/* Where */}
          <div>
            <div className="text-sm text-white/70 mb-2">Where</div>
            <div className="text-base font-semibold text-white">
              {action.whereLabel}
            </div>
          </div>
        </div>

        {/* Example Fix Section */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <h3 className="text-xl font-semibold text-white">Example Fix</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Suggested Copy Examples */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white/70 mb-2">Suggested Copy</h4>
              <ul className="space-y-1 text-sm text-white/80">
                {examples.copyExamples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested UI Elements */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white/70 mb-2">UI Elements</h4>
              <ul className="space-y-1 text-sm text-white/80">
                {examples.uiElements.map((element, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{element}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Placement */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white/70 mb-2">Placement</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {examples.placement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

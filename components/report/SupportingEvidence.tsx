"use client";

import React, { useState } from "react";
import { UiReport } from "@/lib/reportTypes";

type SupportingEvidenceProps = {
  report: UiReport;
};

// Group insights by category
function groupInsights(report: UiReport) {
  const secondaryActions = (report.actions || []).slice(1);
  const issues = report.issues || [];
  
  const groups: {
    category: string;
    icon: string;
    items: Array<{ title: string; explanation: string; where?: string }>;
  }[] = [];
  
  // Trust gaps
  const trustItems = [
    ...secondaryActions.filter(a => a.title.toLowerCase().includes("trust") || a.title.toLowerCase().includes("proof")),
    ...issues.filter(i => i.title.toLowerCase().includes("trust") || i.explanation.toLowerCase().includes("trust")),
  ];
  if (trustItems.length > 0) {
    groups.push({
      category: "Trust Gaps",
      icon: "🛡️",
      items: trustItems.map(item => ({
        title: item.title || item.explanation.split(".")[0],
        explanation: item.explanation || item.why || "",
        where: "whereLabel" in item ? item.whereLabel : undefined,
      })),
    });
  }
  
  // CTA clarity issues
  const ctaItems = [
    ...secondaryActions.filter(a => a.title.toLowerCase().includes("cta") || a.title.toLowerCase().includes("button") || a.title.toLowerCase().includes("action")),
    ...issues.filter(i => i.title.toLowerCase().includes("cta") || i.explanation.toLowerCase().includes("action")),
  ];
  if (ctaItems.length > 0) {
    groups.push({
      category: "CTA Clarity Issues",
      icon: "🎯",
      items: ctaItems.map(item => ({
        title: item.title || item.explanation.split(".")[0],
        explanation: item.explanation || item.why || "",
        where: "whereLabel" in item ? item.whereLabel : undefined,
      })),
    });
  }
  
  // Cognitive overload
  const overloadItems = [
    ...secondaryActions.filter(a => a.title.toLowerCase().includes("clarity") || a.title.toLowerCase().includes("message") || a.title.toLowerCase().includes("overload")),
    ...issues.filter(i => i.title.toLowerCase().includes("clarity") || i.explanation.toLowerCase().includes("confusion") || i.explanation.toLowerCase().includes("overload")),
  ];
  if (overloadItems.length > 0) {
    groups.push({
      category: "Cognitive Overload",
      icon: "🧠",
      items: overloadItems.map(item => ({
        title: item.title || item.explanation.split(".")[0],
        explanation: item.explanation || item.why || "",
        where: "whereLabel" in item ? item.whereLabel : undefined,
      })),
    });
  }
  
  // Other insights
  const otherItems = [
    ...secondaryActions.filter(a => 
      !a.title.toLowerCase().includes("trust") && 
      !a.title.toLowerCase().includes("cta") && 
      !a.title.toLowerCase().includes("clarity")
    ),
    ...issues.filter(i => 
      !i.title.toLowerCase().includes("trust") && 
      !i.title.toLowerCase().includes("cta") && 
      !i.title.toLowerCase().includes("clarity")
    ),
  ];
  if (otherItems.length > 0) {
    groups.push({
      category: "Other Insights",
      icon: "💡",
      items: otherItems.map(item => ({
        title: item.title || item.explanation.split(".")[0],
        explanation: item.explanation || item.why || "",
        where: "whereLabel" in item ? item.whereLabel : undefined,
      })),
    });
  }
  
  return groups;
}

export default function SupportingEvidence({ report }: SupportingEvidenceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const groups = groupInsights(report);
  
  if (groups.length === 0) {
    return null;
  }

  const totalInsights = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Supporting Evidence</h2>
          <p className="text-sm text-white/60">
            {totalInsights} additional insight{totalInsights !== 1 ? "s" : ""} that increase hesitation
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-white/70 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="text-xl font-semibold text-white">{group.category}</h3>
              </div>
              
              <div className="space-y-4">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="pl-8 border-l-2 border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    {item.where && (
                      <p className="text-sm text-white/60 mb-3">
                        <span className="font-medium">Location:</span> {item.where}
                      </p>
                    )}
                    <div className="mt-2">
                      <p className="text-sm font-medium text-white/70 mb-1">How this increases hesitation:</p>
                      <p className="text-base text-white/80 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

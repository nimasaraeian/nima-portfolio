"use client";

import React from "react";
import { BLOCKER_MAP } from "@/lib/decisionCopy";

type DecisionSummaryProps = {
  primaryBlocker: string;
};

export default function DecisionSummary({ primaryBlocker }: DecisionSummaryProps) {
  const blockerInfo = BLOCKER_MAP[primaryBlocker] || {
    title: primaryBlocker,
    explain: "Users hesitate due to this issue.",
  };

  return (
    <div className="rounded-2xl border border-blue-400/30 bg-blue-400/10 p-6">
      <p className="text-xl font-semibold text-white leading-relaxed">
        Users hesitate because {blockerInfo.explain.toLowerCase()}
      </p>
    </div>
  );
}








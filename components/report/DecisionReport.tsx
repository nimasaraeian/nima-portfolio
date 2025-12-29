"use client";

import React from "react";
import DecisionSummary from "./DecisionSummary";
import WhyUsersHesitate from "./WhyUsersHesitate";
import PrimaryActions from "./PrimaryActions";
import VisualEvidence from "./VisualEvidence";
import DetailsAccordion from "./DetailsAccordion";

type DecisionReportProps = {
  result: any;
};

export default function DecisionReport({ result }: DecisionReportProps) {
  if (!result) {
    return null;
  }

  // Defensive guard: check response status
  if (result.status && result.status !== "ok") {
    return (
      <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm font-medium text-red-400 mb-2">⚠️ Error</p>
        <p className="text-xs text-red-300">
          {result.message || result.error || "An error occurred while processing your request."}
        </p>
      </div>
    );
  }

  // Extract v2 fields
  const decisionModel = result.decision_model;
  const verdict = result.verdict;
  const actions = Array.isArray(result.actions) ? result.actions : [];

  // Get Decision Mode (v2) - NEVER use as blocker, only for context
  const decisionMode = decisionModel?.decision_mode || result.summary?.decision_mode || null;

  // Get Confidence (v2) - check root level analysis_confidence first, then decisionModel
  const confidenceRaw =
    typeof result.analysis_confidence === "number"
      ? result.analysis_confidence
      : typeof decisionModel?.confidence === "number"
        ? decisionModel.confidence
        : null;

  // Convert 0..1 to percent (or keep as-is if already > 1)
  const confidence =
    confidenceRaw !== null
      ? confidenceRaw <= 1
        ? Math.round(confidenceRaw * 100)
        : Math.round(confidenceRaw)
      : null;

  // Determine Primary Blocker - NEVER use decision_mode
  const primaryBlocker =
    verdict?.primary_blocker ||
    result.issues?.[0]?.type ||
    actions?.[0]?.where?.section ||
    "unclear_value";

  return (
    <div className="mt-8 space-y-6">
      {/* A. Decision Summary */}
      <DecisionSummary primaryBlocker={primaryBlocker} />

      {/* B. Why Users Hesitate */}
      <WhyUsersHesitate decisionMode={decisionMode} primaryBlocker={primaryBlocker} />

      {/* C. Primary Actions */}
      <PrimaryActions actions={actions} />

      {/* D. Visual Evidence */}
      <VisualEvidence data={result} />

      {/* E. Details Accordion */}
      <DetailsAccordion result={result} confidence={confidence} />
    </div>
  );
}



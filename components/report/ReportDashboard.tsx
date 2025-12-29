"use client";

import React, { useState, useEffect } from "react";
import { UiReport } from "@/lib/reportTypes";
import { formatPct } from "@/lib/normalizeReport";
import { saveReport } from "@/lib/reportStorage";
import ExecutiveSnapshot from "./ExecutiveSnapshot";
import VisualEvidence from "./VisualEvidence";
import FixThisFirstClean from "./FixThisFirstClean";
import DecisionFrictionDiagnosisClean from "./DecisionFrictionDiagnosisClean";
import SupportingEvidenceMerged from "./SupportingEvidenceMerged";
import AdvancedDetails from "./AdvancedDetails";
import WhyAI from "./WhyAI";
import PreviousReports from "./PreviousReports";
import ReportFooter from "./ReportFooter";

// Force rebuild - ensure ExecutiveSnapshot is used, not ExecutiveSummary

type ReportDashboardProps = {
  report: UiReport;
};

function generateMarkdownReport(report: UiReport): string {
  const lines: string[] = [];
  const goal = report.goal || "leads";
  const problemTitle = report.summary?.primaryProblemTitle || "Unclear value proposition";
  const headline = `This page is losing ${goal} because ${problemTitle.toLowerCase()}.`;
  const explanation = report.summary?.primaryProblemExplanation || 
    "This creates hesitation that prevents visitors from taking action.";

  lines.push("# Decision Intelligence Report");
  lines.push("");
  lines.push("## Executive Summary");
  lines.push(headline);
  lines.push(explanation);
  lines.push("");
  lines.push("This decision intelligence assessment identifies decision friction and unlocks conversion opportunities.");
  lines.push("");

  // Fix This First
  const actions = report.actions || [];
  if (actions.length > 0) {
    const topFix = actions[0];
    lines.push("## Fix This First");
    lines.push(`**${topFix.title}**`);
    lines.push("");
    lines.push(`**Where:** ${topFix.whereLabel}`);
    lines.push(`**Why it matters:** ${topFix.why}`);
    lines.push("");
  }

  // Why Users Hesitate
  const decisionStyle = report.summary?.decisionStyleLabel || "Mixed decision style";
  lines.push("## Why Users Hesitate");
  lines.push(`Users on this page make decisions ${decisionStyle.toLowerCase()}. However, this page forces them to act in a way that conflicts with their decision-making style, creating hesitation.`);
  lines.push("");

  if (report.evidence?.desktopAtf || report.evidence?.mobileAtf) {
    lines.push("## Visual Evidence");
    lines.push("These screenshots show what visitors see when they first arrive. The labeled areas indicate where the primary problem appears.");
    if (report.evidence.desktopAtf) {
      lines.push(`- Desktop: ${report.evidence.desktopAtf}`);
    }
    if (report.evidence.mobileAtf) {
      lines.push(`- Mobile: ${report.evidence.mobileAtf}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export default function ReportDashboard({ report }: ReportDashboardProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentReport, setCurrentReport] = useState<UiReport>(report);

  // Auto-save report on mount
  useEffect(() => {
    if (report && report.raw) {
      try {
        const url = report.raw?.url || report.raw?.request?.url || undefined;
        saveReport(report, url);
      } catch (error: any) {
        // Silently handle storage errors - don't break the UI
        if (error?.name !== 'QuotaExceededError' && error?.code !== 22) {
          console.error("Failed to auto-save report:", error);
        }
      }
    }
  }, [report]);

  if (!report) {
    return (
      <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm font-medium text-red-400">Error: No report data available</p>
      </div>
    );
  }

  const handleCopyReport = async () => {
    const markdown = generateMarkdownReport(currentReport);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy report:", err);
    }
  };

  const handleSelectReport = (selectedReport: UiReport) => {
    setCurrentReport(selectedReport);
  };

  return (
    <div className="mt-8 space-y-10">
      {/* Copy Report Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCopyReport}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          {copySuccess ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Report
            </>
          )}
        </button>
      </div>

      {/* Executive Snapshot */}
      <ExecutiveSnapshot report={currentReport} />

      {/* Visual Evidence */}
      <VisualEvidence report={currentReport} />

      {/* Fix This First */}
      <FixThisFirstClean report={currentReport} />

      {/* Decision Friction Diagnosis */}
      <DecisionFrictionDiagnosisClean report={currentReport} />

      {/* Supporting Evidence */}
      <SupportingEvidenceMerged report={currentReport} />

      {/* Previous Reports */}
      <PreviousReports 
        currentReport={currentReport} 
        onSelectReport={handleSelectReport}
      />

      {/* Why AI */}
      <WhyAI />

      {/* Advanced */}
      <AdvancedDetails report={currentReport} />

      {/* Footer */}
      <ReportFooter />
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { getStoredReports, formatReportDate, type StoredReport } from "@/lib/reportStorage";
import { UiReport } from "@/lib/reportTypes";

type PreviousReportsProps = {
  currentReport: UiReport;
  onSelectReport: (report: UiReport) => void;
};

export default function PreviousReports({ currentReport, onSelectReport }: PreviousReportsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [storedReports, setStoredReports] = useState<StoredReport[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  useEffect(() => {
    setStoredReports(getStoredReports());
  }, []);

  if (storedReports.length === 0) {
    return null;
  }

  const selectedReport = selectedReportId 
    ? storedReports.find(r => r.id === selectedReportId)
    : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Previous Reports</h2>
          <p className="text-sm text-white/60">
            Compare with {storedReports.length} previous report{storedReports.length !== 1 ? "s" : ""}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      {isOpen && (
        <div className="mt-6 space-y-4">
          {/* Report Selector */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Select report to compare
            </label>
            <select
              value={selectedReportId || ""}
              onChange={(e) => setSelectedReportId(e.target.value || null)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">-- Select a report --</option>
              {storedReports.map((report) => (
                <option key={report.id} value={report.id}>
                  {formatReportDate(report.timestamp)} - {report.url || report.goal}
                </option>
              ))}
            </select>
          </div>

          {/* Comparison */}
          {selectedReport && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Comparison</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Primary Blocker */}
                <div>
                  <div className="text-sm text-white/70 mb-2">Primary Blocker</div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-white/60">Before:</span>
                      <span className="text-white ml-2">{selectedReport.primaryBlocker}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-white/60">After:</span>
                      <span className="text-white ml-2">{currentReport.summary?.primaryProblemTitle || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Expected Lift */}
                <div>
                  <div className="text-sm text-white/70 mb-2">Expected Lift</div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-white/60">Before:</span>
                      <span className="text-green-400 ml-2">+{selectedReport.expectedLift.min}% to +{selectedReport.expectedLift.max}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-white/60">After:</span>
                      <span className="text-green-400 ml-2">
                        +{Math.round(selectedReport.expectedLift.min * 0.8)}% to +{Math.round(selectedReport.expectedLift.max * 0.8)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Issues Count */}
                <div>
                  <div className="text-sm text-white/70 mb-2">Issues Count</div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-white/60">Before:</span>
                      <span className="text-white ml-2">{selectedReport.issuesCount}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-white/60">After:</span>
                      <span className="text-white ml-2">{currentReport.issues?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectReport(selectedReport.report)}
                className="mt-4 w-full rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-white hover:bg-green-500/20 transition"
              >
                View Full Report
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


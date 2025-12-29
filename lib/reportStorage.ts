/**
 * Report Storage Utilities
 * Handles saving and retrieving reports for comparison
 */

import { UiReport } from "./reportTypes";

const STORAGE_KEY = "decision_intelligence_reports";
const MAX_STORED_REPORTS = 3; // Reduced to prevent quota issues (screenshots are large)

export interface StoredReport {
  id: string;
  timestamp: number;
  url?: string;
  goal: string;
  primaryBlocker: string;
  expectedLift: { min: number; max: number };
  issuesCount: number;
  report: UiReport;
}

/**
 * Create a lightweight version of the report for storage (excludes large screenshots)
 */
function createLightweightReport(report: UiReport): UiReport {
  // Helper to check if value is a data URI string
  const isDataUri = (value: any): boolean => {
    return typeof value === 'string' && value.startsWith('data:');
  };
  
  return {
    ...report,
    evidence: {
      // Store only URLs, not base64 data URIs
      desktopAtf: isDataUri(report.evidence?.desktopAtf) ? null : report.evidence?.desktopAtf || null,
      mobileAtf: isDataUri(report.evidence?.mobileAtf) ? null : report.evidence?.mobileAtf || null,
    },
    raw: undefined, // Don't store raw API response to save space
  };
}

/**
 * Save a report to localStorage
 */
export function saveReport(report: UiReport, url?: string): string {
  const reports = getStoredReports();
  
  // Calculate expected lift
  const primaryBlocker = report.summary?.primaryProblemTitle?.toLowerCase() || "";
  const confidencePct = report.summary?.confidencePct ?? 50;
  let baseMin = 5;
  let baseMax = 15;
  
  if (primaryBlocker.includes("trust")) {
    baseMin = 10;
    baseMax = 25;
  } else if (primaryBlocker.includes("cta")) {
    baseMin = 15;
    baseMax = 35;
  } else if (primaryBlocker.includes("value")) {
    baseMin = 8;
    baseMax = 20;
  } else if (primaryBlocker.includes("friction")) {
    baseMin = 12;
    baseMax = 30;
  }
  
  const confidenceMultiplier = confidencePct / 100;
  const expectedLift = {
    min: Math.max(5, Math.round(baseMin * confidenceMultiplier)),
    max: Math.max(10, Math.round(baseMax * confidenceMultiplier)),
  };
  
  // Create lightweight report (excludes large screenshots and raw data)
  const lightweightReport = createLightweightReport(report);
  
  const storedReport: StoredReport = {
    id: `report_${Date.now()}`,
    timestamp: Date.now(),
    url,
    goal: report.goal || "leads",
    primaryBlocker: report.summary?.primaryProblemTitle || "Unknown",
    expectedLift,
    issuesCount: report.issues?.length || 0,
    report: lightweightReport,
  };
  
  // Add to beginning and limit to MAX_STORED_REPORTS
  reports.unshift(storedReport);
  const limitedReports = reports.slice(0, MAX_STORED_REPORTS);
  
  try {
    const serialized = JSON.stringify(limitedReports);
    // Check size before storing (localStorage limit is typically 5-10MB)
    if (serialized.length > 4 * 1024 * 1024) { // 4MB threshold
      // If too large, remove oldest reports
      const reducedReports = limitedReports.slice(0, Math.max(1, Math.floor(MAX_STORED_REPORTS / 2)));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedReports));
      console.warn("Report storage quota warning: Reduced stored reports to prevent quota issues");
    } else {
      localStorage.setItem(STORAGE_KEY, serialized);
    }
    return storedReport.id;
  } catch (error: any) {
    // If quota exceeded, try to clear old reports and save just this one
    if (error?.name === 'QuotaExceededError' || error?.code === 22) {
      try {
        // Clear all and save only the most recent report
        const singleReport = [storedReport];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(singleReport));
        console.warn("Report storage quota exceeded: Cleared old reports and saved only the most recent");
        return storedReport.id;
      } catch (retryError) {
        console.error("Failed to save report even after clearing:", retryError);
        // If still failing, don't save but don't crash
        return storedReport.id;
      }
    }
    console.error("Failed to save report:", error);
    return storedReport.id;
  }
}

/**
 * Get all stored reports
 */
export function getStoredReports(): StoredReport[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load reports:", error);
    return [];
  }
}

/**
 * Get a specific report by ID
 */
export function getReportById(id: string): StoredReport | null {
  const reports = getStoredReports();
  return reports.find(r => r.id === id) || null;
}

/**
 * Delete a report
 */
export function deleteReport(id: string): void {
  const reports = getStoredReports();
  const filtered = reports.filter(r => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete report:", error);
  }
}

/**
 * Format timestamp for display
 */
export function formatReportDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Clear all stored reports (useful when quota is exceeded)
 */
export function clearAllReports(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear reports:", error);
  }
}


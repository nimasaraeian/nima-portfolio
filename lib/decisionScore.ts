/**
 * Decision Friction Score Calculator
 * Computes a 0-10 friction score from report data with graceful fallbacks
 */

type ScoreResult = {
  score: number;
  label: string;
  confidence: "High" | "Medium" | "Low";
  primaryBlock?: string;
  topDrivers: string[];
};

/**
 * Clamp a number between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map severity to weight
 */
function getSeverityWeight(severity: string | undefined | null): number {
  if (!severity) return 0;
  const sev = String(severity).toLowerCase();
  if (sev === "high") return 1.5;
  if (sev === "medium") return 1.0;
  if (sev === "low") return 0.5;
  return 0.5; // Default to low weight
}

/**
 * Map primary block to fallback drivers
 */
function getFallbackDrivers(primaryBlock: string | null | undefined): string[] {
  if (!primaryBlock) return [];
  
  const block = String(primaryBlock).toLowerCase();
  
  if (block.includes("trust") || block.includes("credibility")) {
    return [
      "Missing credibility signals",
      "Ambiguous authority",
      "Risk not reduced"
    ];
  }
  
  if (block.includes("cta") || block.includes("call-to-action") || block.includes("action")) {
    return [
      "Competing CTAs",
      "Unclear next step",
      "Weak action framing"
    ];
  }
  
  if (block.includes("clarity") || block.includes("value") || block.includes("proposition")) {
    return [
      "Unclear value proposition",
      "High cognitive load",
      "Messaging mismatch"
    ];
  }
  
  if (block.includes("friction")) {
    return [
      "High friction in conversion path",
      "Unnecessary steps",
      "Complex user flow"
    ];
  }
  
  if (block.includes("pricing")) {
    return [
      "Pricing confusion",
      "Unclear pricing structure",
      "Missing value justification"
    ];
  }
  
  // Default fallback
  return [
    "Unclear value proposition",
    "High cognitive load",
    "Messaging mismatch"
  ];
}

/**
 * Determine confidence level from report data
 */
function determineConfidence(report: any): "High" | "Medium" | "Low" {
  // High confidence: has screenshot signal OR >= 3 issues with location OR debug.capture ok
  const hasScreenshot = 
    report?.screenshots?.desktop?.data_url ||
    report?.screenshots?.mobile?.data_url ||
    report?.screenshots?.desktop?.url ||
    report?.screenshots?.mobile?.url ||
    report?.raw?.screenshots?.desktop ||
    report?.raw?.screenshots?.mobile ||
    report?.raw?.capture?.artifacts?.above_the_fold;
  
  const issuesWithLocation = Array.isArray(report?.issues) 
    ? report.issues.filter((issue: any) => issue?.where || issue?.location).length
    : 0;
  
  const hasDebugCapture = report?.raw?.debug?.capture === true || 
                         report?.raw?.capture?.ok === true;
  
  if (hasScreenshot || issuesWithLocation >= 3 || hasDebugCapture) {
    return "High";
  }
  
  // Medium confidence: only issues_count exists
  if (report?.issues_count !== undefined || 
      report?.summary?.issues_count !== undefined ||
      (Array.isArray(report?.issues) && report.issues.length > 0)) {
    return "Medium";
  }
  
  // Low confidence: only URL/hypothetical
  return "Low";
}

/**
 * Extract primary block from report
 */
function extractPrimaryBlock(report: any): string | undefined {
  // Try normalized report structure first
  if (report?.primary_blocker) {
    if (typeof report.primary_blocker === "string") {
      return report.primary_blocker;
    }
    if (report.primary_blocker.id) {
      return report.primary_blocker.id;
    }
    if (report.primary_blocker.label) {
      return report.primary_blocker.label;
    }
  }
  
  // Try raw backend response structure
  return (
    report?.verdict?.primary_blocker ||
    report?.decision?.primary_blocker ||
    report?.decision_machine?.primary_blocker ||
    report?.summary?.primary_blocker ||
    report?.raw?.verdict?.primary_blocker ||
    report?.raw?.decision?.primary_blocker ||
    report?.raw?.primary_blocker ||
    undefined
  );
}

/**
 * Extract top drivers from report
 */
function extractTopDrivers(report: any, primaryBlock?: string): string[] {
  const drivers: string[] = [];
  
  // Try to get from issues array (top 3)
  if (Array.isArray(report?.issues) && report.issues.length > 0) {
    const topIssues = report.issues
      .slice(0, 3)
      .map((issue: any) => issue?.title || issue?.name || issue?.type)
      .filter((title: any) => title && typeof title === "string");
    
    if (topIssues.length > 0) {
      return topIssues;
    }
  }
  
  // Try to get from supporting evidence
  if (Array.isArray(report?.supporting) && report.supporting.length > 0) {
    const topSupporting = report.supporting
      .slice(0, 3)
      .map((item: any) => item?.title)
      .filter((title: any) => title && typeof title === "string");
    
    if (topSupporting.length > 0) {
      return topSupporting;
    }
  }
  
  // Try to get from raw issues
  if (Array.isArray(report?.raw?.issues) && report.raw.issues.length > 0) {
    const topRawIssues = report.raw.issues
      .slice(0, 3)
      .map((issue: any) => issue?.title || issue?.name)
      .filter((title: any) => title && typeof title === "string");
    
    if (topRawIssues.length > 0) {
      return topRawIssues;
    }
  }
  
  // Fallback to primary block mapping
  if (primaryBlock) {
    return getFallbackDrivers(primaryBlock);
  }
  
  // Ultimate fallback
  return [
    "Unclear value proposition",
    "High cognitive load",
    "Messaging mismatch"
  ];
}

/**
 * Compute Decision Friction Score from report data
 * 
 * Score calculation:
 * - Start at 0 (no friction)
 * - Add friction based on issues_count
 * - Add friction based on issue severity (high +1.5, med +1, low +0.5, capped)
 * - Final score is 0-10 where higher = more friction
 */
export function computeDecisionFrictionScore(report: any): ScoreResult {
  if (!report) {
    return {
      score: 5,
      label: "Moderate friction",
      confidence: "Low",
      topDrivers: ["Insufficient data", "Analysis incomplete", "Report unavailable"]
    };
  }
  
  let score = 0;
  
  // Base friction from issues_count
  const issuesCount = 
    report?.issues_count ||
    report?.summary?.issues_count ||
    (Array.isArray(report?.issues) ? report.issues.length : 0) ||
    (Array.isArray(report?.supporting) ? report.supporting.length : 0) ||
    0;
  
  // Add base friction: 0.5 per issue (capped at 3.0)
  score += Math.min(issuesCount * 0.5, 3.0);
  
  // Add friction from issue severity
  if (Array.isArray(report?.issues)) {
    let severityFriction = 0;
    for (const issue of report.issues) {
      const weight = getSeverityWeight(issue?.severity || issue?.priority);
      severityFriction += weight;
    }
    // Cap severity friction at 5.0
    score += Math.min(severityFriction, 5.0);
  }
  
  // Add friction from supporting evidence priority
  if (Array.isArray(report?.supporting)) {
    let supportingFriction = 0;
    for (const item of report.supporting) {
      const priority = String(item?.priority || "medium").toLowerCase();
      if (priority === "high") supportingFriction += 0.5;
      else if (priority === "medium") supportingFriction += 0.3;
      else supportingFriction += 0.1;
    }
    // Cap supporting friction at 2.0
    score += Math.min(supportingFriction, 2.0);
  }
  
  // Clamp final score to 0-10
  score = clamp(score, 0, 10);
  
  // Determine label
  let label: string;
  if (score >= 7.5) {
    label = "High friction";
  } else if (score >= 4.5) {
    label = "Moderate friction";
  } else {
    label = "Low friction";
  }
  
  // Determine confidence
  const confidence = determineConfidence(report);
  
  // Extract primary block
  const primaryBlock = extractPrimaryBlock(report);
  
  // Extract top drivers
  const topDrivers = extractTopDrivers(report, primaryBlock);
  
  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal
    label,
    confidence,
    primaryBlock: primaryBlock ? String(primaryBlock) : undefined,
    topDrivers: topDrivers.slice(0, 3) // Ensure max 3
  };
}


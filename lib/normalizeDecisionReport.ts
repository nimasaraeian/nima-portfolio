/**
 * Decision Report Normalizer
 * Converts FastAPI response to normalized UI format
 * BULLETPROOF: Always returns complete, safe data structures
 */

import { DecisionReportResponse } from "@/lib/decisionClient";

/**
 * Safe string helper - always returns a string
 */
function safeString(value: any, fallback: string = ""): string {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  return String(value);
}

/**
 * Safe number helper - always returns a number within bounds
 */
function safeNumber(value: any, min: number, max: number, fallback: number): number {
  if (value === null || value === undefined || isNaN(value)) return fallback;
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return fallback;
  return Math.max(min, Math.min(max, num));
}

/**
 * Percentage formatter - always returns valid percentage string
 */
export function formatPct(n: number | null | undefined): string {
  if (n === null || n === undefined || isNaN(n)) {
    return "35%"; // Default fallback
  }
  const rounded = Math.max(0, Math.min(100, Math.round(n)));
  return `${rounded}%`;
}

/**
 * Humanize decision style
 */
function humanizeDecisionStyle(style: string | null | undefined): { id: string; label: string } {
  if (!style) return { id: "unknown", label: "Unknown" };
  
  const styleLower = safeString(style).toLowerCase();
  if (styleLower.includes("fast") || styleLower.includes("intuitive")) {
    return { id: "fast_intuitive", label: "Fast & Intuitive" };
  }
  if (styleLower.includes("slow") || styleLower.includes("deliberate")) {
    return { id: "slow_deliberate", label: "Slow & Deliberate" };
  }
  if (styleLower.includes("mixed")) {
    return { id: "mixed", label: "Mixed" };
  }
  return { id: "unknown", label: "Unknown" };
}

/**
 * Humanize primary blocker
 */
function humanizePrimaryBlocker(blocker: string | null | undefined): { id: string; label: string } {
  const blockerStr = safeString(blocker, "unclear_value_proposition");
  const blockerLower = blockerStr.toLowerCase();
  
  if (blockerLower.includes("trust") || blockerLower.includes("credibility")) {
    return { id: "low_trust_signals", label: "Low trust signals" };
  }
  if (blockerLower.includes("cta") || blockerLower.includes("call-to-action")) {
    return { id: "unclear_cta", label: "Unclear call-to-action" };
  }
  if (blockerLower.includes("value") || blockerLower.includes("proposition")) {
    return { id: "unclear_value_proposition", label: "Unclear value proposition" };
  }
  if (blockerLower.includes("friction")) {
    return { id: "high_friction", label: "High friction in conversion path" };
  }
  if (blockerLower.includes("pricing")) {
    return { id: "pricing_confusion", label: "Pricing confusion" };
  }
  if (blockerLower.includes("clarity")) {
    return { id: "lack_of_clarity", label: "Lack of clarity" };
  }
  
  // Capitalize first letter
  const label = blockerStr.charAt(0).toUpperCase() + blockerStr.slice(1);
  return { id: blockerStr, label };
}

/**
 * Get decision style from response
 */
function extractDecisionStyle(response: DecisionReportResponse): { id: string; label: string } {
  const style = 
    response.decision?.decision_mode ||
    response.decision_machine?.decision_mode ||
    response.decision_model?.decision_mode ||
    null;
  
  return humanizeDecisionStyle(style);
}

/**
 * Get confidence from response with fallbacks
 */
function extractConfidence(response: DecisionReportResponse): {
  score: number;
  percent: number;
  label: "Low" | "Medium" | "High";
  explanation: string;
} {
  // Try multiple sources
  let confidenceScore = 
    response.analysis_confidence ||
    response.decision_machine?.confidence ||
    response.decision?.confidence ||
    response.decision_model?.confidence ||
    null;
  
  // Convert 0-1 to 0-100 if needed, or use as-is if already 0-100
  if (confidenceScore !== null && confidenceScore !== undefined) {
    if (confidenceScore <= 1) {
      confidenceScore = confidenceScore * 100;
    }
  } else {
    // Default fallback: 35% (moderate confidence)
    confidenceScore = 35;
  }
  
  // Ensure within bounds
  const score = safeNumber(confidenceScore, 0, 100, 35);
  const percent = Math.round(score);
  
  // Determine label
  let label: "Low" | "Medium" | "High";
  let explanation: string;
  
  if (score < 45) {
    label = "Low";
    explanation = "Lower confidence. Treat these as hypotheses to test rather than definitive answers. User testing is essential.";
  } else if (score < 75) {
    label = "Medium";
    explanation = "Moderately confident. Use this as directional guidance, but prioritize validating these findings with user research.";
  } else {
    label = "High";
    explanation = "Very confident. This decision intelligence assessment is highly certain about these findings. You can proceed with confidence, but still validate with real user testing.";
  }
  
  return {
    score: score / 100, // Normalize to 0-1 for consistency
    percent,
    label,
    explanation,
  };
}

/**
 * Get expected impact with fallbacks
 */
function extractExpectedImpact(
  response: DecisionReportResponse,
  primaryBlockerId: string,
  confidencePercent: number
): {
  min: number;
  max: number;
  label: string;
  note: string;
} {
  // Try to get from backend
  const impact = response.expected_impact;
  
  if (impact?.range && Array.isArray(impact.range) && impact.range.length === 2) {
    return {
      min: Math.round(impact.range[0]),
      max: Math.round(impact.range[1]),
      label: `+${Math.round(impact.range[0])}% to +${Math.round(impact.range[1])}%`,
      note: "Directional estimate",
    };
  }
  
  if (impact?.min !== undefined && impact?.max !== undefined) {
    return {
      min: Math.round(impact.min),
      max: Math.round(impact.max),
      label: `+${Math.round(impact.min)}% to +${Math.round(impact.max)}%`,
      note: "Directional estimate",
    };
  }
  
  // Derive from blocker type + confidence
  let baseMin = 3;
  let baseMax = 8;
  
  const blockerLower = primaryBlockerId.toLowerCase();
  if (blockerLower.includes("trust")) {
    baseMin = 5;
    baseMax = 13;
  } else if (blockerLower.includes("cta")) {
    baseMin = 4;
    baseMax = 10;
  } else if (blockerLower.includes("pricing")) {
    baseMin = 3;
    baseMax = 9;
  }
  
  // Adjust based on confidence (higher confidence = slightly higher range)
  const confidenceMultiplier = confidencePercent / 100;
  const min = Math.max(3, Math.round(baseMin * confidenceMultiplier));
  const max = Math.max(min + 2, Math.round(baseMax * confidenceMultiplier));
  
  return {
    min,
    max,
    label: `+${min}% to +${max}%`,
    note: "Directional estimate",
  };
}

/**
 * Get primary blocker from response
 */
function extractPrimaryBlocker(response: DecisionReportResponse): { id: string; label: string } {
  const blocker = 
    response.verdict?.primary_blocker ||
    response.summary?.primary_blocker ||
    response.decision_machine?.primary_blocker ||
    response.decision?.primary_blocker ||
    "unclear_value_proposition";
  
  return humanizePrimaryBlocker(blocker);
}

/**
 * Safe action normalizer - always returns complete action object
 */
function normalizeAction(action: any): {
  title: string;
  why: string;
  where: string;
  priority: "high" | "medium" | "low";
} {
  const title = safeString(action?.title, "Recommended improvement");
  const why = safeString(action?.why, "This change will help visitors understand what to do next.");
  const whereRaw = action?.where?.section || action?.where || "";
  const where = safeString(whereRaw, "Page");
  const priorityRaw = safeString(action?.priority || "medium", "medium").toLowerCase();
  const priority = (priorityRaw === "high" || priorityRaw === "low") ? priorityRaw : "medium";
  
  return { title, why, where, priority: priority as "high" | "medium" | "low" };
}

/**
 * Improve action copy using page context - SAFE VERSION
 */
function improveActionCopy(
  action: any,
  pageMap: DecisionReportResponse['page_map'],
  primaryBlockerId: string
): {
  title: string;
  what: string;
  why: string;
} {
  const normalized = normalizeAction(action);
  let title = normalized.title;
  let why = normalized.why;
  
  // Remove generic phrases (only if title is a valid string)
  if (title && title.length > 0) {
    title = title
      .replace(/Analysis (of|completed|identified)/gi, "")
      .replace(/requiring attention/gi, "")
      .replace(/Add '([^']+)'/gi, "Add $1")
      .trim();
  }
  
  // If title is still generic or empty, improve it based on blocker
  const blockerLower = primaryBlockerId.toLowerCase();
  let what = title;
  
  if (!title || title.length < 20 || title.includes("Analysis") || title.includes("requiring")) {
    if (blockerLower.includes("trust")) {
      title = "Add testimonials + credentials near CTA to reduce doubt";
      what = "Add visible trust signals (testimonials, credentials, social proof) near the main call-to-action";
      why = why || "Users need proof to feel safe acting. Trust signals reduce hesitation.";
    } else if (blockerLower.includes("cta")) {
      title = "Make one primary CTA above the fold; remove competing links";
      what = "Create a single, prominent call-to-action button above the fold and remove competing actions";
      why = why || "Multiple competing actions confuse users. One clear path increases conversions.";
    } else if (blockerLower.includes("value")) {
      title = "Clarify value proposition in headline and hero section";
      what = "Rewrite the headline and hero section to clearly communicate the unique value and benefits";
      why = why || "Users can't understand what you offer. Clear value reduces confusion.";
    } else if (blockerLower.includes("friction")) {
      title = "Simplify conversion path and reduce required steps";
      what = "Reduce the number of steps and fields required to complete the conversion";
      why = why || "Complex processes create hesitation. Simpler paths increase action.";
    } else if (blockerLower.includes("pricing")) {
      title = "Clarify pricing structure and make it easy to compare";
      what = "Show clear pricing tiers with benefits and make comparison easy";
      why = why || "Unclear pricing creates hesitation. Transparent pricing builds trust.";
    } else {
      title = title || "Improve clarity and reduce hesitation";
      what = title;
      why = why || "This change will help visitors understand what to do next.";
    }
  } else {
    what = title;
  }
  
  return { title, what, why };
}

/**
 * Extract where label from action
 */
function extractWhereLabel(action: any): string {
  const where = action?.where?.section || action?.where || "";
  const whereLower = safeString(where).toLowerCase();
  
  if (whereLower.includes("hero")) return "Hero";
  if (whereLower.includes("cta")) return "CTA";
  if (whereLower.includes("form")) return "Form";
  if (whereLower.includes("checkout")) return "Checkout";
  if (whereLower.includes("footer")) return "Footer";
  if (whereLower.includes("header")) return "Header";
  
  return where ? where.charAt(0).toUpperCase() + where.slice(1) : "Page";
}

/**
 * Calculate impact and effort for a fix
 */
function calculateImpactEffort(
  action: any,
  primaryBlockerId: string
): { impact: "High" | "Medium" | "Low"; effort: "Low" | "Medium" | "High" } {
  const normalized = normalizeAction(action);
  const priority = normalized.priority;
  const where = extractWhereLabel(action).toLowerCase();
  
  // Impact based on priority
  const impact: "High" | "Medium" | "Low" = 
    priority === "high" ? "High" :
    priority === "low" ? "Low" :
    "Medium";
  
  // Effort based on location (hero/cta = low effort, form/checkout = high)
  const effort: "Low" | "Medium" | "High" = 
    where.includes("hero") || where.includes("cta") ? "Low" :
    where.includes("form") || where.includes("checkout") ? "High" :
    "Medium";
  
  return { impact, effort };
}

/**
 * Get example fixes based on primary blocker
 */
function getExampleFixes(primaryBlockerId: string, where: string): string[] {
  const blockerLower = primaryBlockerId.toLowerCase();
  const whereLower = where.toLowerCase();

  if (blockerLower.includes("trust")) {
    return [
      "Customer testimonials with photos",
      "Trust badges (SSL, certifications, awards)",
      "Social proof numbers ('Join 10,000+ customers')",
    ];
  } else if (blockerLower.includes("cta")) {
    return [
      "Clear action verb: 'Get Started', 'Start Free Trial', 'Book a Demo'",
      "Specific benefit: 'See Results in 30 Days'",
      "Risk reduction: 'No Credit Card Required'",
    ];
  } else if (blockerLower.includes("value")) {
    return [
      "Clear headline: 'The fastest way to [achieve goal]'",
      "Specific numbers: 'Save 10 hours per week'",
      "Unique differentiator: 'The only tool that [unique feature]'",
    ];
  } else if (blockerLower.includes("friction")) {
    return [
      "Reduce form fields to only essential information",
      "Add progress indicator: 'Step 1 of 2'",
      "Show what happens next: 'We'll send you a link to get started'",
    ];
  }

  return [
    "Clear, benefit-focused messaging",
    "Specific, actionable language",
  ];
}

/**
 * Extract screenshots with fallback logic
 */
function extractScreenshots(
  response: DecisionReportResponse,
  mode: "url" | "image" | "text"
): {
  desktop?: { url?: string; data_url?: string };
  mobile?: { url?: string; data_url?: string };
  available: boolean;
  reason_if_missing?: string;
} {
  // Try desktop screenshot - check multiple possible paths
  const desktopAtf = 
    response.screenshots?.desktop?.above_the_fold ||
    response.screenshots?.desktop?.aboveFold ||
    response.screenshots?.desktop || // Direct string
    response.screenshot?.desktop || // Old format
    (typeof response.screenshot === 'object' && response.screenshot?.desktop) ||
    null;
  
  // Try mobile screenshot - check multiple possible paths
  const mobileAtf =
    response.screenshots?.mobile?.above_the_fold ||
    response.screenshots?.mobile?.aboveFold ||
    response.screenshots?.mobile || // Direct string
    response.screenshot?.mobile || // Old format
    (typeof response.screenshot === 'object' && response.screenshot?.mobile) ||
    null;
  
  // For image mode, try to use uploaded image
  // STEP 6: If response.visual indicates screenshot mode, use uploaded image as screenshot
  let desktopData = desktopAtf;
  let mobileData = mobileAtf;
  
  if (mode === "image") {
    // If visual.mode === "screenshot", treat uploaded image as screenshot (not inferred)
    if (response.visual?.mode === "screenshot" || response.visual?.capture_status === "ok") {
      const uploadedImage = 
        response.image ||
        response.uploaded_image ||
        response.screenshot ||
        response.image_url ||
        null;
      
      if (uploadedImage) {
        desktopData = uploadedImage;
        mobileData = uploadedImage;
      }
    } else if (!desktopAtf && !mobileAtf) {
      // Fallback: try to use uploaded image even if visual not set
      const uploadedImage = 
        response.image ||
        response.uploaded_image ||
        response.screenshot ||
        response.image_url ||
        null;
      
      if (uploadedImage) {
        desktopData = uploadedImage;
        mobileData = uploadedImage;
      }
    }
  }
  
  const hasDesktop = !!desktopData;
  const hasMobile = !!mobileData;
  const available = hasDesktop || hasMobile;
  
  let reason_if_missing: string | undefined;
  if (!available) {
    if (mode === "image") {
      reason_if_missing = "Image analysis mode does not provide screenshots. Insights were generated from the uploaded image content.";
    } else if (mode === "text") {
      reason_if_missing = "Text analysis mode does not provide screenshots. Insights were generated from the provided text content.";
    } else {
      reason_if_missing = "Screenshots were not captured. This may happen if the page failed to load or capture was interrupted.";
    }
  }
  
  const result: {
    desktop?: { url?: string; data_url?: string };
    mobile?: { url?: string; data_url?: string };
    available: boolean;
    reason_if_missing?: string;
  } = {
    available,
    reason_if_missing,
  };
  
  if (hasDesktop) {
    const isDataUrl = safeString(desktopData).startsWith("data:image/");
    result.desktop = isDataUrl
      ? { data_url: desktopData }
      : { url: desktopData };
  }
  
  if (hasMobile) {
    const isDataUrl = safeString(mobileData).startsWith("data:image/");
    result.mobile = isDataUrl
      ? { data_url: mobileData }
      : { url: mobileData };
  }
  
  return result;
}

/**
 * Normalize decision report - BULLETPROOF VERSION
 * Always returns complete, safe data structure
 * PREFERS REAL BACKEND DATA over fallbacks
 */
export function normalizeDecisionReport(
  response: DecisionReportResponse,
  mode: "url" | "image" | "text"
): NormalizedDecisionReport {
  // Check if backend explicitly says status is limited
  const isLimited = response.status === "limited";
  
  // Extract core data
  const decisionStyle = response.decision_style || extractDecisionStyle(response);
  const primaryBlocker = extractPrimaryBlocker(response);
  
  // STEP 3: Map confidence from real backend data
  let confidence = extractConfidence(response);
  if (response.confidence !== undefined) {
    // Use direct confidence value (0-100 or 0-1)
    const confValue = typeof response.confidence === 'number' ? response.confidence : 35;
    const confPercent = confValue <= 1 ? Math.round(confValue * 100) : Math.round(confValue);
    confidence = {
      score: confPercent / 100,
      percent: confPercent,
      label: confPercent < 45 ? "Low" as const : confPercent < 75 ? "Medium" as const : "High" as const,
      explanation: confidence.explanation, // Keep existing explanation
    };
  } else if (response.decision_model?.confidence !== undefined) {
    // Use decision_model.confidence * 100
    const confValue = response.decision_model.confidence;
    const confPercent = confValue <= 1 ? Math.round(confValue * 100) : Math.round(confValue);
    confidence = {
      score: confPercent / 100,
      percent: confPercent,
      label: confPercent < 45 ? "Low" as const : confPercent < 75 ? "Medium" as const : "High" as const,
      explanation: confidence.explanation,
    };
  }
  
  const expectedImpact = extractExpectedImpact(response, primaryBlocker.id, confidence.percent);
  const goal = safeString(response.goal, "leads");
  const screenshots = extractScreenshots(response, mode);
  
  // STEP 2: Map headline from real backend data
  // Priority: 1) human_report.headline, 2) verdict.summary, 3) fallback (only if limited)
  let executiveTitle: string;
  if (!isLimited && response.human_report?.headline) {
    executiveTitle = response.human_report.headline;
  } else if (!isLimited && response.verdict?.summary) {
    executiveTitle = response.verdict.summary;
  } else if (isLimited) {
    // Only use fallback if status is limited
    executiveTitle = `This page is losing ${goal} because ${primaryBlocker.label.toLowerCase()}.`;
  } else {
    // Try to construct from available data
    executiveTitle = response.verdict?.reason || 
      response.summary?.message || 
      `This page is losing ${goal} because ${primaryBlocker.label.toLowerCase()}.`;
  }
  
  const executiveSubtitle = 
    safeString(
      response.verdict?.reason ||
      response.summary?.message ||
      response.summary?.verdict,
      "This creates hesitation that prevents visitors from taking action."
    );
  
  // STEP 4: Map Fix This First from real backend data
  // Priority: 1) response.fix_first, 2) human_report.fix_first, 3) actions[0] (mapped), 4) fallback (only if limited)
  let fixFirst = null;
  
  if (!isLimited && response.fix_first) {
    // Use direct fix_first from backend
    fixFirst = {
      title: safeString(response.fix_first.title, "Recommended improvement"),
      what: safeString(response.fix_first.what, response.fix_first.title || "Recommended improvement"),
      why: safeString(response.fix_first.why, "This addresses the primary decision friction."),
      where: safeString(response.fix_first.where, "Page"),
      impact: response.fix_first.impact || "Medium" as const,
      effort: response.fix_first.effort || "Medium" as const,
      examples: response.fix_first.examples || [],
    };
  } else if (!isLimited && response.human_report?.fix_first) {
    // Use fix_first from human_report
    const hf = response.human_report.fix_first;
    fixFirst = {
      title: safeString(hf.title, "Recommended improvement"),
      what: safeString(hf.what, hf.title || "Recommended improvement"),
      why: safeString(hf.why, "This addresses the primary decision friction."),
      where: safeString(hf.where, "Page"),
      impact: hf.impact || "Medium" as const,
      effort: hf.effort || "Medium" as const,
      examples: hf.examples || [],
    };
  } else if (!isLimited) {
    // Map from actions[0]
    const allActions = response.actions || response.quick_wins || [];
    const primaryAction = allActions[0];
    
    if (primaryAction) {
      const improved = improveActionCopy(primaryAction, response.page_map, primaryBlocker.id);
      const { impact, effort } = calculateImpactEffort(primaryAction, primaryBlocker.id);
      const examples = getExampleFixes(primaryBlocker.id, extractWhereLabel(primaryAction));
      
      fixFirst = {
        title: improved.title,
        what: improved.what,
        why: improved.why,
        where: extractWhereLabel(primaryAction),
        impact,
        effort,
        examples,
      };
    }
  }
  
  // Only use fallback if limited or no fix found
  if (!fixFirst) {
    if (isLimited) {
      // Fallback fix only if status is limited
      const improved = improveActionCopy(null, response.page_map, primaryBlocker.id);
      const examples = getExampleFixes(primaryBlocker.id, "Page");
      
      fixFirst = {
        title: improved.title,
        what: improved.what,
        why: improved.why,
        where: "Page",
        impact: "Medium" as const,
        effort: "Medium" as const,
        examples,
      };
    } else {
      // Try to create minimal fix from available data
      const allActions = response.actions || response.quick_wins || [];
      if (allActions.length > 0) {
        const primaryAction = allActions[0];
        const improved = improveActionCopy(primaryAction, response.page_map, primaryBlocker.id);
        const { impact, effort } = calculateImpactEffort(primaryAction, primaryBlocker.id);
        const examples = getExampleFixes(primaryBlocker.id, extractWhereLabel(primaryAction));
        
        fixFirst = {
          title: improved.title,
          what: improved.what,
          why: improved.why,
          where: extractWhereLabel(primaryAction),
          impact,
          effort,
          examples,
        };
      }
    }
  }
  
  // STEP 5: Map Supporting Evidence from real backend data
  // Priority: 1) response.supporting_evidence, 2) map from actions[1:] and checks[], 3) empty (only show "Insufficient signals" if limited)
  const supporting: Array<{
    title: string;
    summary: string;
    where: string;
    priority: "high" | "medium" | "low";
  }> = [];
  
  if (!isLimited && response.supporting_evidence && Array.isArray(response.supporting_evidence)) {
    // Use direct supporting_evidence from backend
    response.supporting_evidence.forEach(item => {
      if (item && item.title) {
        supporting.push({
          title: item.title,
          summary: item.summary || item.why || "",
          where: item.where || "Page",
          priority: item.priority || "medium",
        });
      }
    });
  } else if (!isLimited) {
    // Map from actions[1:] and checks[]
    const allActions = response.actions || response.quick_wins || [];
    
    // Add remaining actions (skip first one which is primary fix)
    allActions.slice(1).forEach(action => {
      const normalized = normalizeAction(action);
      const improved = improveActionCopy(action, response.page_map, primaryBlocker.id);
      
      // Skip if this is the same as primary fix
      if (fixFirst && improved.title === fixFirst.title) {
        return;
      }
      
      supporting.push({
        title: improved.title,
        summary: improved.why,
        where: normalized.where,
        priority: normalized.priority,
      });
    });
    
    // Add checks if available
    if (response.checks && Array.isArray(response.checks)) {
      response.checks.forEach(check => {
        const title = safeString(check.title || check.name, "Check");
        const summary = safeString(check.description, "");
        const severity = safeString(check.severity || check.status || "medium", "medium").toLowerCase();
        const priority = (severity === "high" || severity === "low") 
          ? severity as "high" | "low"
          : "medium";
        
        supporting.push({
          title,
          summary,
          where: "Page",
          priority,
        });
      });
    }
    
    // Add issues
    (response.issues || []).forEach(issue => {
      const title = safeString(issue.title || issue.explanation, "Issue identified");
      const summary = safeString(issue.explanation || issue.why, "");
      const severity = safeString(issue.severity || "medium", "medium").toLowerCase();
      const priority = (severity === "high" || severity === "low") 
        ? severity as "high" | "low"
        : "medium";
      
      supporting.push({
        title,
        summary,
        where: "Page",
        priority,
      });
    });
  }
  // If limited and empty, will show "Insufficient signals" in UI component
  
  // Ensure mode is valid
  const validMode: "url" | "image" | "text" | "unknown" = 
    (mode === "url" || mode === "image" || mode === "text") ? mode : "unknown";
  
  return {
    mode: validMode,
    goal,
    primary_blocker: primaryBlocker,
    decision_style: decisionStyle,
    confidence,
    expected_impact: expectedImpact,
    screenshots,
    fix_first: fixFirst!,
    supporting,
    raw: response,
  };
}

/**
 * Type definition for normalized report
 */
export interface NormalizedDecisionReport {
  mode: "url" | "image" | "text" | "unknown";
  goal: string;
  primary_blocker: { id: string; label: string };
  decision_style: { id: string; label: string };
  confidence: {
    score: number;
    percent: number;
    label: "Low" | "Medium" | "High";
    explanation: string;
  };
  expected_impact: {
    min: number;
    max: number;
    label: string;
    note: string;
  };
  screenshots: {
    desktop?: { url?: string; data_url?: string };
    mobile?: { url?: string; data_url?: string };
    available: boolean;
    reason_if_missing?: string;
  };
  fix_first: {
    title: string;
    what: string;
    why: string;
    where: string;
    impact: "High" | "Medium" | "Low";
    effort: "Low" | "Medium" | "High";
    examples: string[];
  };
  supporting: Array<{
    title: string;
    summary: string;
    where: string;
    priority: "high" | "medium" | "low";
  }>;
  raw: any;
}

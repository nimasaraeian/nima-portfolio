/**
 * Decision Friction Score Data Extractor
 * FRONTEND ONLY - Extracts and displays backend decision intelligence data
 * NO CLIENT-SIDE COMPUTATION OR INFERENCE
 */

type ScoreResult = {
  score: number; // friction_score from backend (0-10)
  label: string; // friction_label from backend or derived from score thresholds
  confidence: string; // confidence_label from backend (High/Medium/Low)
  primaryBlock?: string; // primary_blocker from backend
  topDrivers: string[]; // from decision.factors or issues
  hesitationDetected?: boolean; // hesitation_detected from backend
  isFriction?: boolean; // is_friction from backend
};

/**
 * Extract Decision Friction Score data from backend response
 * NO COMPUTATION - Only extracts and passes through backend values
 */
export function extractDecisionFrictionScore(report: any): ScoreResult {
  if (!report) {
    return {
      score: 0,
      label: "No data",
      confidence: "Low",
      topDrivers: [],
    };
  }

  // Extract friction_score directly from backend (0-10 scale)
  const frictionScore = 
    report?.friction_score ?? 
    report?.raw?.friction_score ?? 
    report?.decision?.friction_score ?? 
    report?.decision_model?.friction_score ?? 
    null;

  // Extract confidence_label directly from backend (NO computation)
  const confidenceLabel = 
    report?.confidence_label ?? 
    report?.raw?.confidence_label ?? 
    report?.decision?.confidence_label ?? 
    report?.decision_model?.confidence_label ?? 
    report?.analysis_confidence_label ?? 
    null;

  // Extract hesitation_detected as separate signal
  const hesitationDetected = 
    report?.hesitation_detected ?? 
    report?.raw?.hesitation_detected ?? 
    report?.decision?.hesitation_detected ?? 
    undefined;

  // Extract is_friction as separate signal
  const isFriction = 
    report?.is_friction ?? 
    report?.raw?.is_friction ?? 
    report?.decision?.is_friction ?? 
    undefined;

  // Extract primary_blocker
  const primaryBlock = 
    report?.primary_blocker?.id ?? 
    report?.primary_blocker?.label ?? 
    report?.verdict?.primary_blocker ?? 
    report?.decision?.primary_blocker ?? 
    report?.raw?.verdict?.primary_blocker ?? 
    report?.raw?.decision?.primary_blocker ?? 
    report?.raw?.primary_blocker ?? 
    undefined;

  // Extract top drivers from decision.factors (normalized values)
  const topDrivers: string[] = [];
  
  // Try decision.factors first (normalized backend data)
  if (report?.decision?.factors && Array.isArray(report.decision.factors)) {
    const factors = report.decision.factors
      .sort((a: any, b: any) => {
        const scoreA = typeof a.score === 'number' ? a.score : 0;
        const scoreB = typeof b.score === 'number' ? b.score : 0;
        return scoreB - scoreA; // Sort descending
      })
      .slice(0, 3)
      .map((factor: any) => factor.name || factor.factor || factor.title)
      .filter((name: any) => name && typeof name === "string");
    
    if (factors.length > 0) {
      topDrivers.push(...factors);
    }
  }

  // Fallback to decision_model.drivers
  if (topDrivers.length === 0 && report?.decision_model?.drivers && Array.isArray(report.decision_model.drivers)) {
    const drivers = report.decision_model.drivers
      .sort((a: any, b: any) => {
        const scoreA = typeof a.score === 'number' ? a.score : 0;
        const scoreB = typeof b.score === 'number' ? b.score : 0;
        return scoreB - scoreA;
      })
      .slice(0, 3)
      .map((driver: any) => driver.name || driver.factor || driver.title)
      .filter((name: any) => name && typeof name === "string");
    
    if (drivers.length > 0) {
      topDrivers.push(...drivers);
    }
  }

  // Fallback to issues (only if no factors available)
  if (topDrivers.length === 0 && Array.isArray(report?.issues)) {
    const issues = report.issues
      .slice(0, 3)
      .map((issue: any) => issue?.title || issue?.name || issue?.type)
      .filter((title: any) => title && typeof title === "string");
    
    if (issues.length > 0) {
      topDrivers.push(...issues);
    }
  }

  // Extract friction_label from backend if available
  const frictionLabel = 
    report?.friction_label ?? 
    report?.raw?.friction_label ?? 
    report?.decision?.friction_label ?? 
    null;

  // If no label from backend, derive from score thresholds (presentation only)
  let label: string;
  if (frictionLabel) {
    label = frictionLabel;
  } else if (frictionScore !== null && typeof frictionScore === 'number') {
    // Presentation layer: derive label from score for display
    if (frictionScore >= 7.5) {
      label = "High friction";
    } else if (frictionScore >= 4.5) {
      label = "Moderate friction";
    } else {
      label = "Low friction";
    }
  } else {
    label = "Unknown";
  }

  // Use confidence_label from backend, or fallback to "Low" if not available
  const confidence = confidenceLabel || "Low";

  // Normalize friction score (ensure 0-10 range, backend should provide this)
  const score = frictionScore !== null && typeof frictionScore === 'number' 
    ? Math.max(0, Math.min(10, frictionScore))
    : 0;

  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal for display
    label,
    confidence: String(confidence), // Ensure string type
    primaryBlock: primaryBlock ? String(primaryBlock) : undefined,
    topDrivers: topDrivers.slice(0, 3), // Ensure max 3
    hesitationDetected: hesitationDetected !== undefined ? Boolean(hesitationDetected) : undefined,
    isFriction: isFriction !== undefined ? Boolean(isFriction) : undefined,
  };
}

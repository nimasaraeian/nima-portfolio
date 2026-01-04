/**
 * Single Source of Truth for Confidence
 * 
 * Priority: Brain v2 (decision_diagnostics) > Legacy fields
 * When v2 exists, use it exclusively. Do NOT compute labels client-side.
 */

type ConfidenceResult = {
  value: number; // 0-1 range
  percent: number; // 0-100 range
  label: "Low" | "Medium" | "High";
  isV2: boolean; // Whether this came from v2 or legacy
};

/**
 * Maps legacy confidence value to label (only used when v2 is not available)
 */
function mapLegacyConfidenceToLabel(confidenceValue: number | null | undefined): "Low" | "Medium" | "High" {
  if (confidenceValue === null || confidenceValue === undefined) {
    return "Medium";
  }
  
  // Normalize to 0-1 range if needed
  const normalized = confidenceValue <= 1 ? confidenceValue : confidenceValue / 100;
  
  if (normalized < 0.45) {
    return "Low";
  } else if (normalized < 0.75) {
    return "Medium";
  } else {
    return "High";
  }
}

/**
 * Single source of truth selector for confidence
 * 
 * @param rawBackendResponse - Raw API response
 * @returns Confidence result with value, percent, label, and source flag
 */
export function getConfidenceSourceOfTruth(rawBackendResponse?: any): ConfidenceResult {
  // Priority 1: Brain v2 (decision_diagnostics)
  const v2 = rawBackendResponse?.decision_diagnostics;
  
  if (v2 && v2.confidence !== undefined && v2.confidence !== null) {
    // Use v2 confidence value (0-1 range)
    const confidenceValue = typeof v2.confidence === "number" ? v2.confidence : parseFloat(v2.confidence) || 0;
    const normalizedValue = confidenceValue <= 1 ? confidenceValue : confidenceValue / 100;
    const percent = Math.round(normalizedValue * 100);
    
    // Use v2 confidence_label directly (NO client-side computation)
    const label = v2.confidence_label 
      ? (v2.confidence_label.toLowerCase() === "high" ? "High" as const
         : v2.confidence_label.toLowerCase() === "medium" ? "Medium" as const
         : "Low" as const)
      : mapLegacyConfidenceToLabel(normalizedValue); // Fallback only if label missing
    
    return {
      value: normalizedValue,
      percent,
      label,
      isV2: true,
    };
  }
  
  // Priority 2: Legacy fields (fallback)
  const legacyConfidence = 
    rawBackendResponse?.analysis_confidence ||
    rawBackendResponse?.decision?.confidence ||
    rawBackendResponse?.decision_model?.confidence ||
    rawBackendResponse?.decision_machine?.confidence ||
    rawBackendResponse?.confidence ||
    null;
  
  if (legacyConfidence !== null && legacyConfidence !== undefined) {
    const confidenceValue = typeof legacyConfidence === "number" ? legacyConfidence : parseFloat(legacyConfidence) || 0;
    const normalizedValue = confidenceValue <= 1 ? confidenceValue : confidenceValue / 100;
    const percent = Math.round(normalizedValue * 100);
    
    // Check for legacy confidence_label
    const legacyLabel = 
      rawBackendResponse?.confidence_label ||
      rawBackendResponse?.decision?.confidence_label ||
      rawBackendResponse?.decision_model?.confidence_label ||
      null;
    
    const label = legacyLabel
      ? (legacyLabel.toLowerCase() === "high" ? "High" as const
         : legacyLabel.toLowerCase() === "medium" ? "Medium" as const
         : "Low" as const)
      : mapLegacyConfidenceToLabel(normalizedValue);
    
    return {
      value: normalizedValue,
      percent,
      label,
      isV2: false,
    };
  }
  
  // Default fallback
  return {
    value: 0.35,
    percent: 35,
    label: "Medium" as const,
    isV2: false,
  };
}



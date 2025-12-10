/**
 * Normalization functions for decision diagnosis API inputs
 * These functions ensure frontend values match backend expectations
 */

/**
 * Normalizes price_level from UI values to backend-expected format
 * 
 * @param uiValue - Value from UI dropdown (e.g., "Low", "Medium", "High")
 * @returns Backend-expected format (e.g., "Low (Impulse)", "Medium (Considered)", "High (High-risk)")
 */
export function normalizePriceLevel(uiValue: string | null | undefined): string | null {
  if (!uiValue || !uiValue.trim()) {
    return null;
  }

  switch (uiValue.trim()) {
    case "Low":
      return "Low (Impulse)";
    case "Medium":
      return "Medium (Considered)";
    case "High":
      return "High (High-risk)";
    // Handle already normalized values
    case "Low (Impulse)":
    case "Medium (Considered)":
    case "High (High-risk)":
      return uiValue.trim();
    default:
      // Default to Medium for safety
      return "Medium (Considered)";
  }
}

/**
 * Normalizes decision_depth from UI values to backend-expected format
 * 
 * @param uiValue - Value from UI dropdown (e.g., "Impulse", "Considered", "High-commitment")
 * @returns Backend-expected format (e.g., "Impulse", "Considered", "High-Commitment")
 */
export function normalizeDecisionDepth(uiValue: string | null | undefined): string | null {
  if (!uiValue || !uiValue.trim()) {
    return null;
  }

  const normalized = uiValue.trim();
  
  switch (normalized) {
    case "Impulse":
      return "Impulse";
    case "Considered":
      return "Considered";
    case "High-commitment":
    case "High Commitment":
    case "High-Commitment":
    case "High-commitment":
      return "High-Commitment";
    default:
      // Default to Considered for safety
      return "Considered";
  }
}

/**
 * Normalizes business_type from UI values to backend-expected format
 * 
 * @param uiValue - Value from UI dropdown (e.g., "SaaS", "Ecommerce", "Service")
 * @returns Backend-expected format (e.g., "SaaS", "Ecommerce", "Service Business")
 */
export function normalizeBusinessType(uiValue: string | null | undefined): string | null {
  if (!uiValue || !uiValue.trim()) {
    return null;
  }

  const normalized = uiValue.trim();
  
  switch (normalized) {
    case "SaaS":
      return "SaaS";
    case "Ecommerce":
    case "E-commerce":
      return "Ecommerce";
    case "Clinic":
    case "Healthcare":
    case "Clinic / Healthcare":
      return "Clinic / Healthcare";
    case "Service":
    case "Services":
    case "Service-Based":
      return "Service Business";
    case "Education":
    case "Course":
    case "Info Product":
      return "Info Product / Education";
    case "Marketplace":
      return "Marketplace";
    case "Other":
      return "Other";
    default:
      // Default to Other for safety
      return "Other";
  }
}


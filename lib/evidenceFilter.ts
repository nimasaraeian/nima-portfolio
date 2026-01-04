/**
 * Evidence Filter
 * Filters out generic bullets and keeps only concrete, evidence-based items
 */

const CONCRETE_KEYWORDS = [
  "headline",
  "cta",
  "button",
  "price",
  "$",
  "form",
  "testimonial",
  "reviews",
  "badge",
  "logo",
  "guarantee",
  "security",
  "certification",
  "time",
  "date",
  "steps",
  "fields",
  "offer",
  "value",
  "proof",
  "credential",
  "authority",
  "social proof",
  "number",
  "percent",
  "%",
  "count",
  "rating",
  "star",
  "photo",
  "image",
  "video",
  "link",
  "url",
  "section",
  "hero",
  "fold",
  "above",
  "below",
  "first",
  "second",
  "third",
  "position",
  "order",
  "appears",
  "visible",
  "hidden",
  "missing",
  "present",
  "shows",
  "displays",
  "contains",
  "includes",
];

const GENERIC_PATTERNS = [
  /lack of clarity/i,
  /weak signals/i,
  /needs improvement/i,
  /optimization required/i,
  /users hesitate/i,
  /improve/i,
  /better/i,
  /enhance/i,
  /optimize/i,
  /should/i,
  /could/i,
  /might/i,
  /consider/i,
  /recommend/i,
  /suggest/i,
  /analysis completed/i,
  /analysis complete/i,
];

/**
 * Check if a bullet contains concrete evidence
 */
function hasConcreteEvidence(bullet: string): boolean {
  const bulletLower = bullet.toLowerCase();
  
  // Check for quoted snippets (concrete text)
  if (bullet.match(/["'].*["']/)) {
    return true;
  }
  
  // Check for concrete keywords
  const hasKeyword = CONCRETE_KEYWORDS.some(keyword => bulletLower.includes(keyword));
  if (hasKeyword) {
    return true;
  }
  
  // Check if it's generic
  const isGeneric = GENERIC_PATTERNS.some(pattern => pattern.test(bullet));
  if (isGeneric) {
    return false;
  }
  
  // If it has specific numbers, percentages, or quoted text, it's concrete
  if (bullet.match(/\d+/) || bullet.match(/%/) || bullet.match(/["']/)) {
    return true;
  }
  
  // Default: if it's short and doesn't match generic patterns, keep it
  // If it's long and vague, drop it
  if (bullet.length < 30) {
    return true; // Short bullets are usually specific
  }
  
  return false; // Long vague bullets are likely generic
}

/**
 * Filter evidence bullets to keep only concrete, evidence-based items
 * @param items Array of bullet strings
 * @returns Filtered array (max 3 items)
 */
export function filterEvidenceBullets(items: string[]): string[] {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }
  
  // Filter to keep only concrete evidence
  const filtered = items.filter(item => {
    if (!item || typeof item !== 'string' || item.trim() === '') {
      return false;
    }
    
    return hasConcreteEvidence(item);
  });
  
  // Return max 3 items
  return filtered.slice(0, 3);
}

/**
 * Check if two action texts are too similar (for de-duplication)
 */
export function areActionsSimilar(action1: string, action2: string): boolean {
  if (!action1 || !action2) return false;
  
  const a1 = action1.toLowerCase().trim();
  const a2 = action2.toLowerCase().trim();
  
  // Exact match
  if (a1 === a2) return true;
  
  // One contains the other (and length difference is small)
  if (a1.includes(a2) || a2.includes(a1)) {
    const lenDiff = Math.abs(a1.length - a2.length);
    if (lenDiff < 20) return true; // Similar if difference is small
  }
  
  // Same prefix (first 10 chars)
  if (a1.substring(0, 10) === a2.substring(0, 10) && a1.length > 10 && a2.length > 10) {
    return true;
  }
  
  return false;
}






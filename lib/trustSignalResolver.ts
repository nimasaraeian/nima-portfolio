/**
 * TrustSignalResolver
 * Derives trust signals and context-specific recommendations from evidence
 */

export type TrustSignal = {
  action: string;
  evidence?: string; // Reference to evidence that supports this
};

export type ContextRecommendation = {
  title: string;
  signals: TrustSignal[];
};

export type LandingPageBlocker = {
  observation: string;
  evidence: string; // Reference to specific evidence
};

export type LandingPageFix = {
  action: string;
  mapsToObservation: string; // Which observation this fix addresses
};

/**
 * Resolve trust signals from evidence
 */
export function resolveTrustSignals(report: any): TrustSignal[] {
  const signals: TrustSignal[] = [];
  
  // Collect trust-related evidence
  const trustEvidence: string[] = [];
  
  // From decision drivers evidence
  const drivers = report?.decision?.drivers || 
    report?.decision_model?.drivers || 
    report?.raw?.decision?.drivers || 
    report?.raw?.decision_model?.drivers || 
    [];
  
  drivers.forEach((driver: any) => {
    if (driver.evidence && Array.isArray(driver.evidence)) {
      driver.evidence.forEach((ev: any) => {
        const text = ev.quote_or_observation || ev.quote || ev.observation || "";
        if (text && (
          text.toLowerCase().includes("trust") ||
          text.toLowerCase().includes("credential") ||
          text.toLowerCase().includes("testimonial") ||
          text.toLowerCase().includes("proof") ||
          text.toLowerCase().includes("certification") ||
          text.toLowerCase().includes("authority") ||
          text.toLowerCase().includes("social proof")
        )) {
          trustEvidence.push(text);
        }
      });
    }
  });
  
  // From supporting_evidence
  const supportingEvidence = report?.supporting_evidence || report?.raw?.supporting_evidence || [];
  supportingEvidence.forEach((item: any) => {
    const text = item.quote_or_observation || item.summary || item.why || "";
    if (text && (
      text.toLowerCase().includes("trust") ||
      text.toLowerCase().includes("credential") ||
      text.toLowerCase().includes("testimonial") ||
      text.toLowerCase().includes("proof")
    )) {
      trustEvidence.push(text);
    }
  });
  
  // From page_map.trust_signals
  const pageMapTrustSignals = report?.page_map?.trust_signals || report?.raw?.page_map?.trust_signals || [];
  if (pageMapTrustSignals.length > 0) {
    trustEvidence.push(`Trust signals detected: ${pageMapTrustSignals.join(", ")}`);
  }
  
  // From attention_path (if proof appears late)
  const attentionPath = report?.attention_path || report?.raw?.attention_path;
  if (attentionPath?.first_3s) {
    const first3s = attentionPath.first_3s;
    const hasProof = first3s.some((item: any) => {
      const label = (item.label || "").toLowerCase();
      return label.includes("proof") || 
             label.includes("testimonial") || 
             label.includes("credential") ||
             label.includes("certification");
    });
    
    if (!hasProof && first3s.length > 0) {
      const firstItem = first3s[0]?.label || "";
      if (firstItem) {
        trustEvidence.push(`Proof appears after ${firstItem} in attention path`);
      }
    }
  }
  
  // If no trust evidence collected, return empty (don't make up signals)
  if (trustEvidence.length === 0 && !attentionPath) {
    return [];
  }
  
  // Analyze evidence and generate context-specific signals
  const evidenceText = trustEvidence.join(" ").toLowerCase();
  
  // a) Missing authority / credentials
  if (evidenceText.includes("authority") || 
      evidenceText.includes("credential") || 
      evidenceText.includes("certification") ||
      (evidenceText.includes("missing") && (evidenceText.includes("credential") || evidenceText.includes("authority")))) {
    const evidence = trustEvidence.find(e => {
      const lower = e.toLowerCase();
      return lower.includes("authority") || lower.includes("credential") || lower.includes("certification");
    });
    if (evidence) {
      signals.push({
        action: "Add authority credentials above the fold",
        evidence: evidence.length > 100 ? evidence.substring(0, 100) + "..." : evidence
      });
    }
  }
  
  // b) Missing social proof
  if (evidenceText.includes("social proof") || 
      evidenceText.includes("testimonial") ||
      (evidenceText.includes("missing") && evidenceText.includes("testimonial"))) {
    const evidence = trustEvidence.find(e => {
      const lower = e.toLowerCase();
      return lower.includes("testimonial") || lower.includes("social proof");
    });
    if (evidence) {
      signals.push({
        action: "Add 1–2 testimonials near the primary CTA",
        evidence: evidence.length > 100 ? evidence.substring(0, 100) + "..." : evidence
      });
    }
  }
  
  // c) Price shown before proof (only if we have attention path data)
  if (attentionPath?.first_3s && attentionPath.first_3s.length > 0) {
    const attentionFirst3s = attentionPath.first_3s;
    const priceIndex = attentionFirst3s.findIndex((item: any) => {
      const label = (item.label || "").toLowerCase();
      return label.includes("price") || label.includes("$") || label.includes("cost") || label.includes("offer");
    });
    const proofIndex = attentionFirst3s.findIndex((item: any) => {
      const label = (item.label || "").toLowerCase();
      return label.includes("proof") || label.includes("testimonial") || label.includes("credential") || label.includes("certification");
    });
    
    if (priceIndex >= 0 && (proofIndex < 0 || proofIndex > priceIndex)) {
      const priceLabel = attentionFirst3s[priceIndex]?.label || "price";
      signals.push({
        action: "Move proof before or adjacent to price",
        evidence: `${priceLabel} appears first, proof appears ${proofIndex < 0 ? "later in attention path" : `after ${attentionFirst3s[proofIndex]?.label || "other elements"}`}`
      });
    }
  }
  
  // d) Medical / financial context (only if we have context evidence)
  const pageMap = report?.page_map || report?.raw?.page_map || {};
  const headline = pageMap.headline || "";
  const goal = report?.goal || "";
  const headlineLower = headline.toLowerCase();
  const goalLower = goal.toLowerCase();
  
  if ((headlineLower.includes("medical") || 
      headlineLower.includes("health") || 
      headlineLower.includes("doctor") ||
      headlineLower.includes("financial") ||
      headlineLower.includes("investment") ||
      headlineLower.includes("loan") ||
      goalLower.includes("medical") ||
      goalLower.includes("financial")) && (headline || goal)) {
    signals.push({
      action: "Add certifications / compliance badges",
      evidence: `Context: ${headline || goal}`
    });
  }
  
  // e) Event / course context (only if we have context evidence)
  if ((headlineLower.includes("event") || 
      headlineLower.includes("course") || 
      headlineLower.includes("workshop") ||
      headlineLower.includes("training") ||
      headlineLower.includes("conference")) && (headline || goal)) {
    signals.push({
      action: "Show speaker credentials and past attendee count",
      evidence: `Context: ${headline || goal}`
    });
  }
  
  // Only return signals that have evidence references
  // If no signals with evidence, return empty (better nothing than fake specificity)
  return signals.filter(s => s.evidence).slice(0, 3);
}

/**
 * Get context-based recommendation when trust is not primary
 * Only returns recommendations if we have evidence for the primary driver
 */
export function getContextRecommendation(report: any): ContextRecommendation | null {
  // Determine primary driver
  const drivers = report?.decision?.drivers || 
    report?.decision_model?.drivers || 
    report?.raw?.decision?.drivers || 
    report?.raw?.decision_model?.drivers || 
    [];
  
  let primaryDriver: any = null;
  let primaryBlocker = "";
  
  if (drivers.length > 0) {
    primaryDriver = drivers.find((d: any) => d.role === "primary") || 
      drivers.sort((a: any, b: any) => (b.score || 0) - (a.score || 0))[0];
  } else {
    // Fallback to primary_blocker
    primaryBlocker = report?.primary_blocker?.id || report?.raw?.verdict?.primary_blocker || "";
  }
  
  const driverId = primaryDriver 
    ? (primaryDriver.id || primaryDriver.factor || "").toLowerCase()
    : primaryBlocker.toLowerCase();
  
  const isTrust = driverId.includes("trust") || driverId.includes("credibility");
  
  // If trust is primary, return null (use trust signals instead)
  if (isTrust) return null;
  
  // Check if we have evidence for this driver
  let hasEvidence = false;
  if (primaryDriver) {
    hasEvidence = !!(primaryDriver.evidence && primaryDriver.evidence.length > 0) ||
                  !!(report?.supporting_evidence && report.supporting_evidence.length > 0);
  } else {
    // For primary_blocker fallback, check if we have any supporting evidence
    hasEvidence = !!(report?.supporting_evidence && report.supporting_evidence.length > 0) ||
                  !!(report?.raw?.supporting_evidence && report.raw.supporting_evidence.length > 0);
  }
  
  // Only return recommendation if we have evidence
  if (!hasEvidence) return null;
  
  // Generate context-specific recommendation based on driver
  if (driverId.includes("cta") || driverId.includes("call-to-action")) {
    return {
      title: "Best next-step clarity improvement",
      signals: [
        { action: "Use clear action verb in primary CTA" },
        { action: "Remove competing CTAs above the fold" },
        { action: "Add single, unambiguous next step" }
      ]
    };
  } else if (driverId.includes("value") || driverId.includes("offer") || driverId.includes("proposition")) {
    return {
      title: "Best offer clarification",
      signals: [
        { action: "Clarify what the offer includes" },
        { action: "Show specific value or benefit" },
        { action: "Make offer terms explicit" }
      ]
    };
  } else if (driverId.includes("visual") || driverId.includes("hierarchy") || driverId.includes("clarity")) {
    return {
      title: "Best visual clarity improvement",
      signals: [
        { action: "Reduce visual noise in hero section" },
        { action: "Improve headline prominence" },
        { action: "Clarify visual hierarchy" }
      ]
    };
  }
  
  return null;
}

/**
 * Detect if this is a landing page context
 */
export function isLandingPage(report: any): boolean {
  // Safely extract and convert to string - handle all edge cases
  let pageTypeStr = "";
  try {
    const pageTypeRaw = report?.raw?.page_type || report?.page_type;
    if (pageTypeRaw != null) {
      if (typeof pageTypeRaw === 'string') {
        pageTypeStr = pageTypeRaw;
      } else {
        pageTypeStr = String(pageTypeRaw);
      }
    }
  } catch (e) {
    pageTypeStr = "";
  }
  const pageTypeLower = pageTypeStr.toLowerCase();
  
  let goalStr = "";
  try {
    const goalRaw = report?.goal || report?.raw?.goal;
    if (goalRaw != null) {
      if (typeof goalRaw === 'string') {
        goalStr = goalRaw;
      } else {
        goalStr = String(goalRaw);
      }
    }
  } catch (e) {
    goalStr = "";
  }
  const goalLower = goalStr.toLowerCase();
  
  const pageMap = report?.page_map || report?.raw?.page_map || {};
  let pageMapGoal = "";
  try {
    const pageMapGoalRaw = pageMap?.goal;
    if (pageMapGoalRaw != null) {
      if (typeof pageMapGoalRaw === 'string') {
        pageMapGoal = pageMapGoalRaw;
      } else {
        pageMapGoal = String(pageMapGoalRaw);
      }
    }
  } catch (e) {
    pageMapGoal = "";
  }
  
  // Check page_type
  if (pageTypeLower.includes("landing") || 
      pageTypeLower.includes("lead_gen") || 
      pageTypeLower.includes("event_registration") || 
      pageTypeLower.includes("signup")) {
    return true;
  }
  
  // Check goal
  if (goalLower === "leads" || pageMapGoal === "leads") {
    return true;
  }
  
  return false;
}

/**
 * Get landing page-specific primary decision blocker analysis
 * Returns observations (2-3) and fixes (exactly 2) derived from evidence
 */
export function getLandingPageBlocker(report: any): {
  title: string;
  observations: LandingPageBlocker[];
  fixes: LandingPageFix[];
} | null {
  if (!isLandingPage(report)) {
    return null;
  }
  
  // Determine primary driver
  const drivers = report?.decision?.drivers || 
    report?.decision_model?.drivers || 
    report?.raw?.decision?.drivers || 
    report?.raw?.decision_model?.drivers || 
    [];
  
  let primaryDriver: any = null;
  let primaryBlocker = "";
  
  if (drivers.length > 0) {
    primaryDriver = drivers.find((d: any) => d.role === "primary") || 
      drivers.sort((a: any, b: any) => (b.score || 0) - (a.score || 0))[0];
  } else {
    primaryBlocker = report?.primary_blocker?.id || report?.raw?.verdict?.primary_blocker || "";
  }
  
  const driverId = primaryDriver 
    ? (primaryDriver.id || primaryDriver.factor || "").toLowerCase()
    : primaryBlocker.toLowerCase();
  
  // Determine title based on primary driver
  let title = "";
  if (driverId.includes("trust") || driverId.includes("credibility")) {
    title = "What breaks trust early on this landing page";
  } else if (driverId.includes("cta") || driverId.includes("call-to-action")) {
    title = "Why users hesitate at the next step";
  } else if (driverId.includes("offer") || driverId.includes("value") || driverId.includes("proposition")) {
    title = "What users don't understand fast enough";
  } else if (driverId.includes("visual") || driverId.includes("hierarchy") || driverId.includes("clarity")) {
    title = "What distracts attention in the first screen";
  } else {
    title = "What breaks the decision early on this landing page";
  }
  
  // Collect evidence from multiple sources
  const observations: LandingPageBlocker[] = [];
  const pageMap = report?.page_map || report?.raw?.page_map || {};
  const attentionPath = report?.attention_path || report?.raw?.attention_path;
  
  // From primary driver evidence
  if (primaryDriver?.evidence && Array.isArray(primaryDriver.evidence)) {
    primaryDriver.evidence.slice(0, 2).forEach((ev: any) => {
      const text = ev.quote_or_observation || ev.quote || ev.observation || "";
      if (text && text.trim() !== "" && 
          !text.toLowerCase().includes("analysis completed") &&
          !text.toLowerCase().includes("analysis complete")) {
        observations.push({
          observation: text.length > 150 ? text.substring(0, 150) + "..." : text,
          evidence: `From primary driver: ${primaryDriver.id || primaryDriver.factor || "driver"}`
        });
      }
    });
  }
  
  // From attention_path.first_3s
  if (attentionPath?.first_3s && attentionPath.first_3s.length > 0) {
    const first3s = attentionPath.first_3s;
    first3s.slice(0, 2).forEach((item: any, idx: number) => {
      const label = item.label || "";
      const whyFirst = item.why_first || "";
      if (label && observations.length < 3) {
        const observationText = whyFirst 
          ? `${label} appears first (${whyFirst})`
          : `${label} appears first in attention path`;
        observations.push({
          observation: observationText,
          evidence: `Attention path position ${idx + 1}`
        });
      }
    });
  }
  
  // From page_map fields (headline, CTA, offer)
  if (observations.length < 3) {
    const headline = pageMap.headline || "";
    const ctaText = typeof pageMap.primary_cta === 'string' 
      ? pageMap.primary_cta 
      : pageMap.primary_cta?.text || "";
    const offerValue = typeof pageMap.offer === 'string'
      ? pageMap.offer
      : pageMap.offer?.value || "";
    
    if (headline && observations.length < 3) {
      observations.push({
        observation: `Headline: "${headline.substring(0, 80)}${headline.length > 80 ? '...' : ''}"`,
        evidence: "Page structure analysis"
      });
    }
    if (ctaText && observations.length < 3) {
      observations.push({
        observation: `Primary CTA: "${ctaText}"`,
        evidence: "Page structure analysis"
      });
    }
    if (offerValue && observations.length < 3) {
      observations.push({
        observation: `Offer/price: "${offerValue}"`,
        evidence: "Page structure analysis"
      });
    }
  }
  
  // Need at least 2 observations to show this section
  if (observations.length < 2) {
    return null;
  }
  
  // Generate exactly 2 fixes that map to observations
  const fixes: LandingPageFix[] = [];
  
  // Fix 1: Map to first observation
  if (observations.length > 0) {
    const firstObs = observations[0];
    const obsText = firstObs.observation.toLowerCase();
    
    if (obsText.includes("headline") || obsText.includes("headline:")) {
      fixes.push({
        action: "Rewrite headline to be more specific and benefit-focused",
        mapsToObservation: firstObs.observation
      });
    } else if (obsText.includes("cta") || obsText.includes("call-to-action")) {
      fixes.push({
        action: "Make CTA text more specific and action-oriented",
        mapsToObservation: firstObs.observation
      });
    } else if (obsText.includes("offer") || obsText.includes("price") || obsText.includes("$")) {
      fixes.push({
        action: "Clarify offer terms and value proposition",
        mapsToObservation: firstObs.observation
      });
    } else if (obsText.includes("trust") || obsText.includes("proof") || obsText.includes("credential")) {
      fixes.push({
        action: "Add trust signals before or adjacent to primary CTA",
        mapsToObservation: firstObs.observation
      });
    } else if (obsText.includes("appears first") || obsText.includes("attention")) {
      // Generic fix for attention path observations
      fixes.push({
        action: "Reposition key elements to improve first-impression clarity",
        mapsToObservation: firstObs.observation
      });
    } else {
      // Fallback: generic fix based on driver
      if (driverId.includes("trust")) {
        fixes.push({
          action: "Add authority credentials or social proof above the fold",
          mapsToObservation: firstObs.observation
        });
      } else if (driverId.includes("cta")) {
        fixes.push({
          action: "Clarify the single next step users should take",
          mapsToObservation: firstObs.observation
        });
      } else {
        fixes.push({
          action: "Improve clarity of the primary message",
          mapsToObservation: firstObs.observation
        });
      }
    }
  }
  
  // Fix 2: Map to second observation or driver-specific
  if (observations.length > 1 && fixes.length < 2) {
    const secondObs = observations[1];
    const obsText = secondObs.observation.toLowerCase();
    
    if (obsText.includes("headline") || obsText.includes("headline:")) {
      fixes.push({
        action: "Make headline more specific about the outcome",
        mapsToObservation: secondObs.observation
      });
    } else if (obsText.includes("cta") || obsText.includes("call-to-action")) {
      fixes.push({
        action: "Remove competing CTAs and focus on one clear action",
        mapsToObservation: secondObs.observation
      });
    } else if (obsText.includes("offer") || obsText.includes("price")) {
      fixes.push({
        action: "Show offer value more prominently in hero section",
        mapsToObservation: secondObs.observation
      });
    } else {
      // Driver-specific fallback
      if (driverId.includes("trust")) {
        fixes.push({
          action: "Add 1–2 testimonials or credentials near the CTA",
          mapsToObservation: secondObs.observation
        });
      } else if (driverId.includes("cta")) {
        fixes.push({
          action: "Use a clear action verb in the primary CTA",
          mapsToObservation: secondObs.observation
        });
      } else {
        fixes.push({
          action: "Reduce visual noise and improve hierarchy",
          mapsToObservation: secondObs.observation
        });
      }
    }
  } else if (fixes.length < 2) {
    // If we only have one observation, generate second fix based on driver
    if (driverId.includes("trust")) {
      fixes.push({
        action: "Add trust signals before users see the price or offer",
        mapsToObservation: observations[0]?.observation || ""
      });
    } else if (driverId.includes("cta")) {
      fixes.push({
        action: "Make the next step unambiguous and visible above the fold",
        mapsToObservation: observations[0]?.observation || ""
      });
    } else if (driverId.includes("offer") || driverId.includes("value")) {
      fixes.push({
        action: "Clarify what the offer includes and its value",
        mapsToObservation: observations[0]?.observation || ""
      });
    } else {
      fixes.push({
        action: "Improve visual hierarchy to guide attention",
        mapsToObservation: observations[0]?.observation || ""
      });
    }
  }
  
  // Ensure exactly 2 fixes
  return {
    title,
    observations: observations.slice(0, 3),
    fixes: fixes.slice(0, 2)
  };
}


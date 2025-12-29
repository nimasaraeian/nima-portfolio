import { UiReport } from "./reportTypes";

/**
 * Normalize API response (schema v2) into a single UI model
 */
export function normalizeReport(apiJson: any, mode: "url" | "image" | "text" = "url"): UiReport {
  // Defensive: ensure apiJson is an object
  if (!apiJson || typeof apiJson !== "object") {
    apiJson = {};
  }
  // Extract decision style
  const decisionMode = 
    apiJson.decision_model?.decision_mode || 
    apiJson.decision_machine?.selected_mode || 
    apiJson.summary?.decision_mode || 
    null;

  // Map to human labels
  const decisionStyleLabel = 
    decisionMode === "fast_intuitive" ? "Fast & intuitive decision" :
    decisionMode === "slow_deliberate" ? "Slow & deliberate decision" :
    "Mixed decision style";

  // Extract confidence
  const confidenceRaw = 
    apiJson.decision_machine?.confidence ?? 
    apiJson.decision_model?.confidence ?? 
    apiJson.analysis_confidence ?? 
    null;

  // Convert confidence to percentage
  let confidencePct: number | null = null;
  if (confidenceRaw !== null && confidenceRaw !== undefined) {
    if (typeof confidenceRaw === "number") {
      if (confidenceRaw <= 1 && confidenceRaw >= 0) {
        confidencePct = Math.round(confidenceRaw * 100);
      } else if (confidenceRaw > 1 && confidenceRaw <= 100) {
        confidencePct = Math.round(confidenceRaw);
      }
    } else if (typeof confidenceRaw === "string") {
      const lower = confidenceRaw.toLowerCase();
      if (lower === "high") confidencePct = 85;
      else if (lower === "medium") confidencePct = 60;
      else if (lower === "low") confidencePct = 35;
    }
  }

  // Extract primary problem
  const primaryBlockerRaw = apiJson.verdict?.primary_blocker || 
    apiJson.issues?.[0]?.type || 
    apiJson.issues?.[0]?.title || 
    null;

  // Humanize primary problem
  let primaryProblemTitle = "No clear next step above the fold";
  let primaryProblemExplanation = "Visitors can't instantly see what to do next, so they hesitate and leave.";

  if (primaryBlockerRaw) {
    const blockerStr = String(primaryBlockerRaw).toLowerCase();
    if (blockerStr.includes("cta") || blockerStr.includes("call to action")) {
      primaryProblemTitle = "Missing or unclear call-to-action";
      primaryProblemExplanation = "Visitors don't see a clear next step, so they leave without taking action.";
    } else if (blockerStr.includes("value") || blockerStr.includes("proposition")) {
      primaryProblemTitle = "Unclear value proposition";
      primaryProblemExplanation = "Visitors can't quickly understand what you offer and why it matters to them.";
    } else if (blockerStr.includes("trust") || blockerStr.includes("credibility")) {
      primaryProblemTitle = "Low trust signals";
      primaryProblemExplanation = "Visitors don't see enough proof or credibility markers to feel confident.";
    } else if (blockerStr.includes("friction") || blockerStr.includes("form")) {
      primaryProblemTitle = "Too much friction in the flow";
      primaryProblemExplanation = "The path to conversion has unnecessary steps or barriers that cause hesitation.";
    } else if (blockerStr.includes("clarity") || blockerStr.includes("confusion")) {
      primaryProblemTitle = "Unclear messaging";
      primaryProblemExplanation = "Visitors can't quickly understand what you do or what they should do next.";
    } else if (!blockerStr.includes("fast_intuitive") && !blockerStr.includes("slow_deliberate")) {
      // Only use raw if it's not a decision mode enum
      primaryProblemTitle = String(primaryBlockerRaw).replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      primaryProblemExplanation = "This issue is causing visitors to hesitate and leave without converting.";
    }
  }

  // Extract actions and clean up language
  const actionsRaw = apiJson.actions || apiJson.quick_wins || [];
  const actions = actionsRaw.slice(0, 3).map((action: any) => {
    let title = action.action || action.title || action.description || "Add clarity";
    let why = action.reason || action.why || "reduce hesitation and increase action";
    
    // Remove generic phrases
    title = title
      .replace(/analysis of /gi, "")
      .replace(/identified /gi, "")
      .replace(/detected /gi, "")
      .replace(/conversion barriers?/gi, "")
      .replace(/issues? requiring attention/gi, "")
      .trim();
    
    why = why
      .replace(/analysis /gi, "")
      .replace(/identified /gi, "")
      .replace(/detected /gi, "")
      .replace(/^to /, "")
      .trim();
    
    // Ensure consultant tone verbs
    if (!/^(add|remove|show|clarify|improve|reduce|enhance|make|create)/i.test(title)) {
      title = `Add ${title.toLowerCase()}`;
    }
    
    const whereSection = action.where?.section || action.where?.selector || "page";
    const whereLabel = whereSection
      .split("_")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    
    const priority = 
      (title.toLowerCase().includes("cta") || title.toLowerCase().includes("hero") || whereSection === "hero") 
        ? "high" as const
        : "medium" as const;

    return { title, why, whereLabel, priority };
  });

  // Extract issues and clean up language
  let issues = [];
  if (Array.isArray(apiJson.issues) && apiJson.issues.length > 0) {
    issues = apiJson.issues.map((issue: any) => {
      let title = issue.title || issue.type || issue.name || "Optimization needed";
      let explanation = issue.why || issue.explanation || issue.preliminary_insight || issue.description || "This impacts conversion.";
      
      // Remove generic phrases
      title = title
        .replace(/analysis/gi, "")
        .replace(/identified/gi, "")
        .replace(/detected/gi, "")
        .replace(/issue/gi, "")
        .trim();
      
      explanation = explanation
        .replace(/analysis /gi, "")
        .replace(/identified /gi, "")
        .replace(/detected /gi, "")
        .trim();
      
      return {
        title: title || "Optimization needed",
        severity: (issue.severity || issue.priority || "medium") as "high" | "medium" | "low",
        explanation: explanation || "This impacts conversion.",
      };
    });
  } else {
    // Generate insights from page_map + decision_model if no issues
    issues = [
      {
        title: "Decision style optimization",
        severity: "medium" as const,
        explanation: decisionStyleLabel === "Fast & intuitive decision" 
          ? "Users make quick decisions here. Show your value proposition and CTA immediately."
          : decisionStyleLabel === "Slow & deliberate decision"
          ? "Users need more information before deciding. Add clear details, trust signals, and reduce friction."
          : "Users have mixed decision patterns. Balance immediate clarity with detailed information.",
      },
      {
        title: "Conversion optimization opportunity",
        severity: "medium" as const,
        explanation: "Reduce hesitation and improve conversion rates by addressing the primary problem above.",
      },
    ];
  }

  // Extract evidence screenshots
  // Priority: data_uri first, then url (from capture.artifacts.above_the_fold)
  const desktopArtifact = apiJson.capture?.artifacts?.above_the_fold?.desktop;
  const mobileArtifact = apiJson.capture?.artifacts?.above_the_fold?.mobile;
  
  const desktopAtf = 
    desktopArtifact?.data_uri ||
    desktopArtifact?.url ||
    apiJson.screenshots?.desktop?.above_the_fold ||
    apiJson.screenshots?.desktop?.aboveFold ||
    apiJson.screenshots?.desktop ||
    null;

  const mobileAtf = 
    mobileArtifact?.data_uri ||
    mobileArtifact?.url ||
    apiJson.screenshots?.mobile?.above_the_fold ||
    apiJson.screenshots?.mobile?.aboveFold ||
    apiJson.screenshots?.mobile ||
    null;

  // Build narrative
  const firstSentence = primaryProblemExplanation.split(".")[0] || primaryProblemExplanation;
  const executiveSummary = `Why this page is losing leads: ${primaryProblemTitle}. ${firstSentence}.`;
  
  const whyUsersHesitate = decisionStyleLabel === "Fast & intuitive decision"
    ? `Users make quick decisions on this page, but ${primaryProblemTitle.toLowerCase()}. When visitors can't instantly see what to do next, they leave before engaging. This reduces conversion rates and increases bounce rates.`
    : decisionStyleLabel === "Slow & deliberate decision"
    ? `Users need time to evaluate here, but ${primaryProblemTitle.toLowerCase()}. This creates hesitation and reduces the likelihood of conversion. Visitors require more information and trust signals before taking action.`
    : `Users have mixed decision patterns on this page. ${primaryProblemTitle} is causing hesitation and preventing conversions. Some visitors need immediate clarity while others require detailed information.`;

  const consequences = [
    "First-time visitors hesitate",
    "More scroll, fewer clicks",
    "Lower lead rate even with good traffic",
  ];

  // Ensure all required fields are present with safe fallbacks
  const finalPrimaryProblemTitle = primaryProblemTitle || "No clear next step above the fold";
  const finalPrimaryProblemExplanation = primaryProblemExplanation || "Visitors can't instantly see what to do next, so they hesitate and leave.";
  const finalExecutiveSummary = executiveSummary || `Why this page is losing leads: ${finalPrimaryProblemTitle}. ${finalPrimaryProblemExplanation.split(".")[0] || finalPrimaryProblemExplanation}.`;
  const finalWhyUsersHesitate = whyUsersHesitate || `Users hesitate due to ${finalPrimaryProblemTitle.toLowerCase()}. This reduces conversion rates.`;

  const result: UiReport = {
    mode,
    goal: apiJson.goal || "leads",
    summary: {
      decisionStyleLabel: decisionStyleLabel || "Mixed decision style",
      confidencePct: confidencePct ?? null,
      primaryProblemTitle: finalPrimaryProblemTitle,
      primaryProblemExplanation: finalPrimaryProblemExplanation,
    },
    evidence: {
      desktopAtf: desktopAtf || null,
      mobileAtf: mobileAtf || null,
    },
    actions: actions || [],
    issues: issues || [],
    narrative: {
      executiveSummary: finalExecutiveSummary,
      whyUsersHesitate: finalWhyUsersHesitate,
      consequences: consequences || [
        "First-time visitors hesitate",
        "More scroll, fewer clicks",
        "Lower lead rate even with good traffic",
      ],
    },
    raw: apiJson,
  };

  return result;
}

/**
 * Format percentage safely (never shows NaN)
 */
export function formatPct(n: number | null | undefined): string {
  if (n === null || n === undefined || isNaN(n)) {
    return "—";
  }
  return `${n}%`;
}


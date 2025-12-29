export const DECISION_MODE_LABEL: Record<string, string> = {
  fast_intuitive: "Fast & intuitive decision",
  deliberate: "Deliberate decision",
  comparison: "Comparison mode",
  unknown: "Unknown",
};

export const BLOCKER_LABEL: Record<string, string> = {
  trust: "Trust gap",
  cta: "Unclear next step (CTA)",
  pricing: "Price confusion",
  friction: "Too much friction",
  visual: "Visual hierarchy problem",
  message: "Message overload",
};

export const BLOCKER_EXPLAIN: Record<string, string> = {
  trust: "People hesitate when they're not sure it's safe, credible, or real.",
  cta: "People hesitate when they don't see a single obvious next step to take.",
  pricing: "People hesitate when price feels hidden, unclear, or mismatched to value.",
  friction: "People hesitate when the path feels effortful (forms, steps, complexity).",
  visual: "People hesitate when the page doesn't guide the eye to the decision point.",
  message: "People hesitate when too many messages compete and nothing feels 'primary'.",
};

export const BLOCKER_MAP: Record<string, { title: string; explain: string }> = {
  hero: {
    title: "Unclear first impression",
    explain: "Users don't immediately understand what this page is for and what they should do next.",
  },
  cta: {
    title: "No clear next step",
    explain: "Users hesitate because there is no single obvious action to take.",
  },
  unclear_value: {
    title: "Unclear value proposition",
    explain: "Users can't quickly see what they gain and why it matters.",
  },
  trust: {
    title: "Trust gap",
    explain: "Users hesitate when they're not sure it's safe, credible, or real.",
  },
  pricing: {
    title: "Price confusion",
    explain: "Users hesitate when price feels hidden, unclear, or mismatched to value.",
  },
  friction: {
    title: "Too much friction",
    explain: "Users hesitate when the path feels effortful (forms, steps, complexity).",
  },
  visual: {
    title: "Visual hierarchy problem",
    explain: "Users hesitate when the page doesn't guide the eye to the decision point.",
  },
  message: {
    title: "Message overload",
    explain: "Users hesitate when too many messages compete and nothing feels 'primary'.",
  },
};


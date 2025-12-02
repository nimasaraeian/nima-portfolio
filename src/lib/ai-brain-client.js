/// <reference path="../shared/ai-brain-types/types-generated.js" />

const API_BASE = process.env.NEXT_PUBLIC_BRAIN_API_URL;

/**
 * Call the Brain API
 * @param {BrainRequest} payload
 * @returns {Promise<BrainResponse>}
 */
export async function callBrainAPI(payload) {
  const res = await fetch(`${API_BASE}/api/brain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Brain API error", res.status);
    throw new Error("Brain API error");
  }

  return await res.json();
}

/**
 * Example: Rendering result using generated types
 * @param {PsychologyAnalysisResult} result
 */
export function renderBrainResult(result) {
  console.log("Cognitive Friction Score:", result.analysis?.cognitive_friction?.score);
  console.log("Decision Likelihood:", result.overall?.decision_likelihood_percentage);
}



import { UiReport } from "./reportTypes";
import { normalizeReport } from "./normalizeReport";
import { analyzeUrl, analyzeImage, analyzeText } from "./decisionClient";
import { normalizeDecisionReport, NormalizedDecisionReport } from "./normalizeDecisionReport";

/**
 * Analyze human decision (URL, Image, or Text mode)
 * Uses centralized decisionClient to call FastAPI backend
 * Returns new NormalizedDecisionReport format
 */
export async function analyzeHumanNew(data: {
  goal: string;
  url?: string;
  image?: File;
  text?: string;
}): Promise<NormalizedDecisionReport> {
  const mode: "url" | "image" | "text" = data.url ? "url" : data.image ? "image" : "text";
  
  let apiResponse: any;
  
  if (mode === "url") {
    if (!data.url) throw new Error("URL is required for URL mode");
    apiResponse = await analyzeUrl({ url: data.url, goal: data.goal });
  } else if (mode === "image") {
    if (!data.image) throw new Error("Image is required for image mode");
    apiResponse = await analyzeImage({ image: data.image, goal: data.goal });
  } else {
    if (!data.text) throw new Error("Text is required for text mode");
    apiResponse = await analyzeText({ text: data.text, goal: data.goal });
  }

  // Log raw backend response for debugging
  console.log("RAW_BACKEND_RESPONSE", apiResponse);

  // Normalize response to NormalizedDecisionReport
  return normalizeDecisionReport(apiResponse, mode);
}

/**
 * Analyze human decision and return both normalized report and raw response
 * For debugging purposes
 */
export async function analyzeHumanNewWithRaw(data: {
  goal: string;
  url?: string;
  image?: File;
  text?: string;
}): Promise<{ normalized: NormalizedDecisionReport; raw: any }> {
  const mode: "url" | "image" | "text" = data.url ? "url" : data.image ? "image" : "text";
  
  let apiResponse: any;
  
  if (mode === "url") {
    if (!data.url) throw new Error("URL is required for URL mode");
    apiResponse = await analyzeUrl({ url: data.url, goal: data.goal });
  } else if (mode === "image") {
    if (!data.image) throw new Error("Image is required for image mode");
    apiResponse = await analyzeImage({ image: data.image, goal: data.goal });
  } else {
    if (!data.text) throw new Error("Text is required for text mode");
    apiResponse = await analyzeText({ text: data.text, goal: data.goal });
  }

  // Log raw backend response for debugging
  console.log("RAW_BACKEND_RESPONSE", apiResponse);

  // Normalize response to NormalizedDecisionReport
  const normalized = normalizeDecisionReport(apiResponse, mode);
  
  return { normalized, raw: apiResponse };
}

/**
 * Legacy function for backward compatibility
 * Returns old UiReport format
 */
export async function analyzeHuman(data: {
  goal: string;
  url?: string;
  image?: File;
  text?: string;
}): Promise<UiReport> {
  const mode: "url" | "image" | "text" = data.url ? "url" : data.image ? "image" : "text";
  
  let apiResponse: any;
  
  if (mode === "url") {
    // URL mode: use decision-scan proxy
    const res = await fetch("/api/proxy/decision-scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: data.url,
        goal: data.goal,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `API error: ${res.status}`);
    }

    apiResponse = JSON.parse(text);
  } else {
    // Image or Text mode: use analyze-human proxy
    const form = new FormData();
    form.append("goal", data.goal);

    if (data.image) {
      form.append("image", data.image);
    }
    if (data.text) {
      form.append("text", data.text);
    }

    const res = await fetch("/api/proxy/analyze-human", {
      method: "POST",
      body: form,
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `API error: ${res.status}`);
    }

    apiResponse = JSON.parse(text);
  }

  // Normalize response to UiReport (legacy format)
  return normalizeReport(apiResponse, mode);
}

export async function analyzeHumanImage(file: File, goal = "leads") {
  return analyzeHuman({ goal, image: file });
}

// Legacy functions - still using direct FastAPI connection
// TODO: Migrate to proxy routes if needed
const getLegacyApiBase = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
};

export async function predictDecision(payload: any) {
  const API_BASE = getLegacyApiBase();
  const res = await fetch(`${API_BASE}/api/decision/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}

export async function simulateDecision(payload: any) {
  const API_BASE = getLegacyApiBase();
  const res = await fetch(`${API_BASE}/api/decision/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}

export async function recommendDecision(payload: any) {
  const API_BASE = getLegacyApiBase();
  const res = await fetch(`${API_BASE}/api/decision/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}


// Hard-coded API base for direct FastAPI connection (no Next.js proxy)
// DO NOT use relative paths - must be absolute URL to FastAPI
const API_BASE = "http://127.0.0.1:8000";

export async function analyzeHuman(data: {
  goal: string;
  url?: string;
  image?: File;
  text?: string;
}) {
  const form = new FormData();
  form.append("goal", data.goal);

  if (data.url) {
    form.append("url", data.url);
  }
  if (data.image) {
    form.append("image", data.image);
  }
  if (data.text) {
    form.append("text", data.text);
  }

  const res = await fetch(`${API_BASE}/api/analyze/human`, {
    method: "POST",
    body: form,
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}

export async function analyzeHumanImage(file: File, goal = "leads") {
  return analyzeHuman({ goal, image: file });
}

export async function predictDecision(payload: any) {
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
  const res = await fetch(`${API_BASE}/api/decision/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}


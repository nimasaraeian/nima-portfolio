export const runtime = "nodejs";

export async function POST(req: Request) {
  // Forward any POST /api/decision-scan to the proxy route
  const ct = req.headers.get("content-type") || "";
  let body: any = null;

  if (ct.includes("multipart/form-data")) {
    body = await req.formData();
    const r = await fetch(new URL("/api/proxy/decision-scan", req.url), { method: "POST", body });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") || "application/json" }});
  } else {
    const txt = await req.text();
    const r = await fetch(new URL("/api/proxy/decision-scan", req.url), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: txt,
    });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") || "application/json" }});
  }
}

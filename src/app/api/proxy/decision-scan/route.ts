export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBackendBaseUrl() {
  const base =
    process.env.BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
    "";

  return base.trim().replace(/\/+$/, "");
}

export async function GET() {
  console.log("[proxy/decision-scan] GET handler called (src/app)");
  return new Response(JSON.stringify({ status: "ok", message: "Route is working", endpoint: "/api/proxy/decision-scan" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  console.log("[proxy/decision-scan] POST handler called");
  const base = getBackendBaseUrl();
  console.log("[proxy/decision-scan] Backend base URL:", base || "NOT SET");
  if (!base) {
    console.log("[proxy/decision-scan] ERROR: BACKEND_BASE_URL is not set");
    return new Response(JSON.stringify({ status:"error", error:"BACKEND_BASE_URL is not set" }), {
      status: 500,
      headers: { "content-type":"application/json" },
    });
  }

  const upstreamUrl = `${base}/api/decision-scan`;
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  try {
    let upstreamResp: Response;

    if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      upstreamResp = await fetch(upstreamUrl, { method: "POST", body: fd });
    } else {
      const bodyText = await req.text();
      upstreamResp = await fetch(upstreamUrl, {
        method: "POST",
        headers: { "content-type":"application/json" },
        body: bodyText,
      });
    }

    const text = await upstreamResp.text();
    return new Response(text, {
      status: upstreamResp.status,
      headers: { "content-type": upstreamResp.headers.get("content-type") || "application/json" },
    });
  } catch (e: any) {
    console.error("[proxy/decision-scan] Upstream fetch failed:", e);
    return new Response(JSON.stringify({ status:"error", error:"Upstream fetch failed", message:e?.message }), {
      status: 502,
      headers: { "content-type":"application/json" },
    });
  }
}



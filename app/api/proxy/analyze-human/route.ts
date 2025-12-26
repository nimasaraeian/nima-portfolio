import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  console.log("[proxy/analyze-human] POST handler called");

  const backend = process.env.BACKEND_BASE_URL;
  if (!backend) {
    console.error("[proxy/analyze-human] ERROR: BACKEND_BASE_URL is not set");
    return NextResponse.json(
      { status: "error", message: "BACKEND_BASE_URL is not set" },
      { status: 500 }
    );
  }

  try {
    // Get FormData from request
    const fd = await req.formData();

    const backendUrl = `${backend.replace(/\/+$/, "")}/api/analyze/human`;
    console.log("[proxy/analyze-human] Forwarding to:", backendUrl);

    // Forward FormData to backend
    // Do NOT set Content-Type header - fetch will set it with the boundary
    const res = await fetch(backendUrl, {
      method: "POST",
      body: fd,
    });

    const text = await res.text();
    
    // Try to parse as JSON
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: res.status });
    } catch {
      // If not JSON, return as text
      return new NextResponse(text, { 
        status: res.status,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } catch (error) {
    console.error("[proxy/analyze-human] Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}


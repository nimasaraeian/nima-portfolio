import { NextRequest, NextResponse } from "next/server";
import { getApiBase } from "@/src/lib/apiBase";

async function parseBackendResponse(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const backendBase = getApiBase();
  if (!backendBase) {
    return NextResponse.json(
      {
        detail:
          "Backend URL is not configured. Set NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_BRAIN_API_URL.",
      },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      {
        detail: "Invalid request payload. Expected JSON body.",
      },
      { status: 400 }
    );
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const endpoint = `${backendBase}/api/analyze/url-human-advanced${
    searchParams ? `?${searchParams}` : ""
  }`;

  try {
    const backendResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body || {}),
    });

    const parsedBody = await parseBackendResponse(backendResponse);

    if (!backendResponse.ok) {
      const detailValue =
        (parsedBody && typeof parsedBody === "object" && (parsedBody.detail || parsedBody.error)) ||
        parsedBody ||
        `Backend error (${backendResponse.status})`;

      const detail =
        typeof detailValue === "string" ? detailValue : JSON.stringify(detailValue);

      return NextResponse.json({ detail }, { status: backendResponse.status });
    }

    return NextResponse.json(parsedBody ?? {}, { status: backendResponse.status });
  } catch (error: any) {
    const message = error?.message || "Failed to reach backend service.";
    return NextResponse.json({ detail: message }, { status: 502 });
  }
}




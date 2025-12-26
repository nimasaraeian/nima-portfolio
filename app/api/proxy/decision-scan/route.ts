export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  console.log("[proxy/decision-scan] GET handler called");
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Route is working",
      endpoint: "/api/proxy/decision-scan",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(req: Request) {
  console.log("[proxy/decision-scan] POST handler called");

  try {
    const BACKEND =
      process.env.BACKEND_BASE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "http://127.0.0.1:8000";

    if (!BACKEND) {
      console.error("[proxy/decision-scan] ERROR: BACKEND_BASE_URL is not set");
      return new Response(
        JSON.stringify({ status: "error", error: "BACKEND_BASE_URL is not set" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse incoming (json or multipart)
    const ct = req.headers.get("content-type") || "";
    let payload: any = {};

    if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      const mode = String(fd.get("mode") || "");
      const goal = String(fd.get("goal") || "leads");
      const locale = String(fd.get("locale") || "en");
      const imageFile = fd.get("image");

      payload = {
        url: String(fd.get("url") || ""),
        goal,
        locale,
      };

      // Handle image mode: convert File to base64
      if (mode === "image" && imageFile instanceof File) {
        try {
          const arrayBuffer = await imageFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64Image = buffer.toString("base64");
          const mimeType = imageFile.type || "image/png";

          payload.image = base64Image;
          payload.image_type = mimeType;
          // Use a placeholder URL for image mode since backend requires it
          if (!payload.url) {
            payload.url = "https://placeholder.local";
          }
        } catch (imageError) {
          console.error("[proxy/decision-scan] Error converting image to base64:", imageError);
          return new Response(
            JSON.stringify({
              status: "error",
              error: "Failed to process image file",
              detail: imageError instanceof Error ? imageError.message : String(imageError),
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    } else {
      try {
        const jsonPayload = await req.json();
        const mode = jsonPayload.mode || "";

        payload = {
          url: jsonPayload.url || "",
          goal: jsonPayload.goal || "leads",
          locale: jsonPayload.locale || "en",
        };

        // Handle text mode: convert 'text' to 'raw_text'
        if (mode === "text" && jsonPayload.text) {
          payload.raw_text = jsonPayload.text;
          // Backend requires URL, use placeholder if not provided
          if (!payload.url) {
            payload.url = "https://placeholder.local";
          }
        }

        // Handle image mode from JSON (if image is base64)
        if (mode === "image" && jsonPayload.image) {
          payload.image = jsonPayload.image;
          payload.image_type = jsonPayload.image_type || "image/png";
          if (!payload.url) {
            payload.url = "https://placeholder.local";
          }
        }
      } catch (jsonError) {
        console.error("[proxy/decision-scan] Error parsing JSON:", jsonError);
        return new Response(
          JSON.stringify({
            status: "error",
            error: "Invalid JSON payload",
            detail: jsonError instanceof Error ? jsonError.message : String(jsonError),
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    console.log("[proxy/decision-scan] Forwarding payload:", {
      url: payload.url,
      goal: payload.goal,
      locale: payload.locale,
      has_raw_text: !!payload.raw_text,
      has_image: !!payload.image,
    });

    // 🔥 Forward to the backend endpoint that returns human_report
    const upstreamUrl = `${BACKEND}/api/analyze/url-human`;
    console.log("[proxy/decision-scan] Forwarding to:", upstreamUrl);

    let r: Response;
    try {
      r = await fetch(upstreamUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (fetchError) {
      console.error("[proxy/decision-scan] Upstream fetch failed:", fetchError);
      return new Response(
        JSON.stringify({
          status: "error",
          error: "Failed to connect to backend",
          detail: fetchError instanceof Error ? fetchError.message : String(fetchError),
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let text: string;
    try {
      text = await r.text();
    } catch (textError) {
      console.error("[proxy/decision-scan] Error reading response text:", textError);
      text = JSON.stringify({
        status: "error",
        error: "Failed to read backend response",
        detail: textError instanceof Error ? textError.message : String(textError),
      });
    }

    // If backend returned an error status, ensure it's valid JSON
    if (!r.ok) {
      try {
        // Try to parse as JSON to ensure it's valid
        const errorData = JSON.parse(text);
        // Re-stringify to ensure consistent format
        text = JSON.stringify({
          status: "error",
          error: errorData.error || "Backend error",
          detail: errorData.detail || errorData.message || text,
        });
      } catch {
        // If not JSON, wrap it in a JSON error response
        text = JSON.stringify({
          status: "error",
          error: `Backend returned ${r.status}`,
          detail: text.length > 1000 ? text.slice(0, 1000) + "..." : text,
        });
      }
    }

    // Pass-through
    return new Response(text, {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[proxy/decision-scan] Unexpected error:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        error: "Internal server error",
        detail: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { VisualTrustResult } from "@/app/ai-marketing/brain-types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Helper to convert File/Blob to base64
async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
}

// Fallback response when vision analysis fails
function getFallbackResponse(): VisualTrustResult {
  return {
    status: "fallback",
    label: "Medium",
    overall_score: 60,
    elements: [],
    narrative: [
      "Vision analysis failed. This result is a heuristic fallback.",
    ],
  };
}

// System prompt for OpenAI Vision
const SYSTEM_PROMPT = `You are a landing page visual analyst.
Analyze the screenshot of a SaaS landing page.

Identify visible elements such as:
- logo
- hero headline
- subheadline
- primary CTA
- secondary CTA
- benefit cards
- testimonials
- trust badges
- pricing

For each element:
- infer its role
- approximate position (top-center, middle-left, etc.)
- extract visible text if possible
- describe visual cues
- explain its psychological impact on trust or clarity

Return ONLY valid JSON with this structure:

{
  status: "ok",
  label: "Low | Medium | High",
  overall_score: number,
  distribution: {
    low: number,
    medium: number,
    high: number
  },
  elements: [
    {
      id: string,
      role: string,
      approx_position: string,
      text: string | null,
      visual_cues: string[],
      analysis: {
        notes: string,
        trust_impact?: "Low" | "Medium" | "High"
      }
    }
  ],
  narrative: string[]
}

The label should be "Low", "Medium", or "High" based on overall visual trust.
The overall_score should be 0-100.
Distribution values should sum to 1.0 (low + medium + high = 1.0).
Each element must have a unique id (e.g., "element_1", "element_2").
Role must be one of: logo, headline, subheadline, primary_cta, secondary_cta, benefit_card, testimonial, trust_badge, pricing_block, hero_image, or other.
Position must be one of: top-left, top-center, top-right, middle-left, middle-center, middle-right, bottom-left, bottom-center, bottom-right.
Narrative should be 2-5 bullet points summarizing the analysis.`;

export async function POST(req: NextRequest) {
  try {
    // Step 1: Get file from request
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "file_required",
          detail: "Missing image file in form-data payload.",
        },
        { status: 400 }
      );
    }

    // Validate file type
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "invalid_file_type",
          detail: `Invalid file type: ${file.type}. Supported types: ${validImageTypes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "file_too_large",
          detail: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of 10MB.`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "empty_file",
          detail: "The uploaded file is empty.",
        },
        { status: 400 }
      );
    }

    // Step 2: Check OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ OPENAI_API_KEY not set, returning fallback response");
      return NextResponse.json({
        success: true,
        analysis: getFallbackResponse(),
      });
    }

    // Step 3: Convert file to base64
    console.log(
      `📸 Processing image: ${file.name || "upload"}, Size: ${file.size} bytes, Type: ${file.type}`
    );
    const base64Image = await fileToBase64(file);

    // Step 4: Initialize OpenAI client
    const openai = new OpenAI({ apiKey });

    // Step 5: Call OpenAI Vision API
    console.log("🔍 Calling OpenAI Vision API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Vision-capable model
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this landing page screenshot and return the JSON analysis.",
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" }, // Enforce JSON output
      temperature: 0.3,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      console.error("❌ No response from OpenAI Vision API");
      return NextResponse.json({
        success: true,
        analysis: getFallbackResponse(),
      });
    }

    // Step 6: Parse JSON response
    let visionAnalysis: any;
    try {
      visionAnalysis = JSON.parse(responseText);
      console.log("✅ OpenAI Vision analysis received:", {
        hasStatus: !!visionAnalysis.status,
        hasElements: Array.isArray(visionAnalysis.elements),
        hasNarrative: Array.isArray(visionAnalysis.narrative),
        elementCount: visionAnalysis.elements?.length || 0,
      });
    } catch (parseError: any) {
      console.error("❌ Failed to parse OpenAI Vision response as JSON:", parseError);
      console.error("Raw response:", responseText.substring(0, 500));
      return NextResponse.json({
        success: true,
        analysis: getFallbackResponse(),
      });
    }

    // Step 7: Map to VisualTrustResult structure
    const analysis: VisualTrustResult = {
      status: visionAnalysis.status === "ok" ? "ok" : "fallback",
      label:
        visionAnalysis.label === "Low" ||
        visionAnalysis.label === "Medium" ||
        visionAnalysis.label === "High"
          ? visionAnalysis.label
          : null,
      overall_score:
        typeof visionAnalysis.overall_score === "number"
          ? Math.max(0, Math.min(100, visionAnalysis.overall_score))
          : null,
      distribution:
        visionAnalysis.distribution &&
        typeof visionAnalysis.distribution.low === "number" &&
        typeof visionAnalysis.distribution.medium === "number" &&
        typeof visionAnalysis.distribution.high === "number"
          ? {
              low: Math.max(0, Math.min(1, visionAnalysis.distribution.low)),
              medium: Math.max(
                0,
                Math.min(1, visionAnalysis.distribution.medium)
              ),
              high: Math.max(0, Math.min(1, visionAnalysis.distribution.high)),
            }
          : null,
      notes: visionAnalysis.notes || null,
      elements: Array.isArray(visionAnalysis.elements)
        ? visionAnalysis.elements
            .filter((el: any) => el && el.id && el.role)
            .map((el: any) => {
              // Validate and map role
              const validRoles: VisualTrustResult["elements"][0]["role"][] = [
                "logo",
                "headline",
                "subheadline",
                "primary_cta",
                "secondary_cta",
                "benefit_card",
                "testimonial",
                "trust_badge",
                "pricing_block",
                "hero_image",
                "other",
              ];
              const role = validRoles.includes(el.role)
                ? el.role
                : "other";

              // Validate and map position
              const validPositions: VisualTrustResult["elements"][0]["approx_position"][] = [
                "top-left",
                "top-center",
                "top-right",
                "middle-left",
                "middle-center",
                "middle-right",
                "bottom-left",
                "bottom-center",
                "bottom-right",
              ];
              const position = validPositions.includes(el.approx_position)
                ? el.approx_position
                : "middle-center";

              return {
                id: String(el.id),
                role,
                approx_position: position,
                text: el.text || null,
                visual_cues: Array.isArray(el.visual_cues)
                  ? el.visual_cues.map((cue: any) => String(cue))
                  : [],
                analysis: {
                  clarity: el.analysis?.clarity || undefined,
                  trust_impact:
                    el.analysis?.trust_impact === "Low" ||
                    el.analysis?.trust_impact === "Medium" ||
                    el.analysis?.trust_impact === "High"
                      ? el.analysis.trust_impact
                      : undefined,
                  notes: el.analysis?.notes || undefined,
                },
              };
            })
        : [],
      narrative: Array.isArray(visionAnalysis.narrative)
        ? visionAnalysis.narrative.map((line: any) => String(line))
        : [],
    };

    // Validate minimum requirements
    if (analysis.elements.length < 1 || analysis.narrative.length < 1) {
      console.warn(
        "⚠️ Vision analysis missing required fields, using fallback"
      );
      return NextResponse.json({
        success: true,
        analysis: getFallbackResponse(),
      });
    }

    // Step 8: Return response in exact shape
    console.log("✅ Returning VisualTrustResult:", {
      status: analysis.status,
      label: analysis.label,
      overall_score: analysis.overall_score,
      elementCount: analysis.elements.length,
      narrativeCount: analysis.narrative.length,
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error("❌ Error in /api/analyze/image-trust:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });

    // Return fallback on any error
    return NextResponse.json({
      success: true,
      analysis: getFallbackResponse(),
    });
  }
}

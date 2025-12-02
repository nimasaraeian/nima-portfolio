import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "alloy", format = "mp3" } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required for audio generation." },
        { status: 400 }
      );
    }

    const cleanText = text.trim().slice(0, 4000);

    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      format,
      input: cleanText,
    });

    const audioBuffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: any) {
    console.error("TTS error:", err);

    return NextResponse.json(
      {
        error: "Failed to generate audio.",
        details: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}



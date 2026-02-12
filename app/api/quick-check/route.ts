import { NextRequest, NextResponse } from "next/server";
import { jsonResponse } from "@/lib/jsonResponse";
import { safeToFixed } from "@/lib/format";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const message = formData.get("message");
    const file = formData.get("file");

    // Check if file is provided
    const hasFile = file && file instanceof File && file.size > 0;

    // Validate message (required only if no file is provided)
    if (!hasFile) {
      if (!message || typeof message !== "string" || message.trim().length < 10) {
        return jsonResponse(
          { ok: false, error: "Either a message (at least 10 characters) or a file is required." },
          { status: 400 }
        );
      }
    }

    // Validate that at least one of message or file is provided
    const hasMessage = message && typeof message === "string" && message.trim().length > 0;
    if (!hasFile && !hasMessage) {
      return jsonResponse(
        { ok: false, error: "Please provide either a message or upload a file." },
        { status: 400 }
      );
    }

    // Validate file if provided
    if (hasFile) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return jsonResponse(
          { ok: false, error: "File size exceeds 5MB limit." },
          { status: 400 }
        );
      }

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        return jsonResponse(
          { ok: false, error: "Invalid file type. Allowed: PNG, JPG, WEBP, PDF." },
          { status: 400 }
        );
      }
    }

    // TODO: Send email with attachment
    // For now, we'll log it and return success
    // You can integrate with Resend, SendGrid, or nodemailer here
    
    console.log("📧 Quick Decision Check Submission:");
    console.log("Message:", message);
    if (file && file instanceof File) {
      console.log(
        "File:",
        file.name,
        file.type,
        `${safeToFixed(file.size / 1024, 2, "0.00")}KB`
      );
    }

    // Example email sending (you'll need to implement this):
    // const emailContent = {
    //   to: "nima@nimasaraeian.com",
    //   subject: "Quick Decision Check Request",
    //   text: message,
    //   attachments: file ? [{ filename: file.name, content: await file.arrayBuffer() }] : []
    // };
    // await sendEmail(emailContent);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Error processing quick check:", error);
    return jsonResponse(
      { ok: false, error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}


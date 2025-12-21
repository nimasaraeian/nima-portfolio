import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { jsonResponse } from '@/lib/jsonResponse';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Helper to convert File/Blob to base64
async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  return `data:${file.type};base64,${base64}`;
}

// System prompt for extracting decision-related text from images
const EXTRACTION_PROMPT = `You are analyzing a screenshot or image of a webpage, landing page, or product page.

Extract ALL visible decision-critical text elements that affect user purchase or signup decisions:

1. **Pricing information:**
   - Prices, costs, subscription fees
   - Discounts, offers, promotional pricing
   - Payment plans, billing cycles

2. **Call-to-Action (CTA) buttons and text:**
   - "Buy Now", "Sign Up", "Get Started", "Subscribe"
   - Button labels and surrounding text
   - Urgency indicators ("Limited Time", "Only X left")

3. **Guarantees and risk reduction:**
   - Money-back guarantees
   - Free trial offers
   - "No credit card required"
   - Return/refund policies
   - Satisfaction guarantees

4. **Trust signals:**
   - Security badges
   - Customer count ("Join 10,000+ users")
   - Ratings, reviews, testimonials
   - Certifications, awards

5. **Form fields and requirements:**
   - Input field labels
   - Required vs optional indicators
   - Form completion requirements

6. **Product/service details affecting decisions:**
   - Sizing information
   - Delivery/shipping terms
   - Feature lists
   - Comparison tables

Return ONLY a plain text string containing all extracted decision-critical text. 
Format it as a clean, readable paragraph or list. Do NOT include JSON formatting, markdown, or code blocks.
If the image contains NO pricing, CTA, guarantee, or decision-related information, return exactly: "NO_DECISION_INFO".

Focus on text that directly impacts whether a user will make a purchase, signup, or conversion decision.`;

import { getApiBase } from '@/src/lib/apiBase';

/**
 * Get backend URL from environment variables
 */
function getBackendUrl(): string {
  return getApiBase();
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/brain/decision-engine-image POST request received');

  try {
    // Step 1: Get file from request
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return jsonResponse(
        {
          error: 'file_required',
          detail: 'Missing image file in form-data payload.',
        },
        { status: 400 }
      );
    }

    // Validate file type
    const validImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!validImageTypes.includes(file.type)) {
      return jsonResponse(
        {
          error: 'invalid_file_type',
          detail: `Invalid file type: ${file.type}. Supported types: ${validImageTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return jsonResponse(
        {
          error: 'file_too_large',
          detail: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of 10MB.`,
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return jsonResponse(
        {
          error: 'empty_file',
          detail: 'The uploaded file is empty.',
        },
        { status: 400 }
      );
    }

    // Step 2: Check OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse(
        {
          error: 'openai_key_missing',
          detail: 'OPENAI_API_KEY not configured. Please set it in environment variables.',
        },
        { status: 500 }
      );
    }

    // Step 3: Convert file to base64
    console.log(
      `📸 Processing image: ${file.name || 'upload'}, Size: ${file.size} bytes, Type: ${file.type}`
    );
    const base64Image = await fileToBase64(file);

    // Step 4: Initialize OpenAI client
    const openai = new OpenAI({ apiKey });

    // Step 5: Call OpenAI Vision API to extract decision-related text
    console.log('🔍 Calling OpenAI Vision API to extract decision-critical text...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Vision-capable model
      messages: [
        {
          role: 'system',
          content: EXTRACTION_PROMPT,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract all decision-critical text from this image. Return only the extracted text, no formatting.',
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    });

    const extractedText = completion.choices[0]?.message?.content?.trim() || '';

    if (!extractedText || extractedText === 'NO_DECISION_INFO') {
      return jsonResponse(
        {
          error: 'insufficient_decision_info',
          detail: 'The image does not contain enough decision-critical information (pricing, CTAs, guarantees, etc.). Please upload an image with pricing, call-to-action buttons, guarantees, or other decision-affecting elements.',
        },
        { status: 400 }
      );
    }

    console.log('✅ Text extracted from image:', {
      length: extractedText.length,
      preview: extractedText.substring(0, 100),
    });

    // Step 6: Send extracted text to the existing decision-engine endpoint
    const backendUrl = getBackendUrl();
    const backendEndpoint = `${backendUrl}/api/brain/decision-engine`;

    console.log('[Decision Engine Image] Forwarding extracted text to backend:', backendEndpoint);

    let backendResponse: Response;
    try {
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: extractedText }),
      });
    } catch (fetchError: any) {
      console.error('❌ Failed to connect to backend:', backendEndpoint, fetchError.message);
      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: `Failed to connect to backend API at ${backendEndpoint}. Please ensure the backend is running on ${backendUrl}`,
        },
        { status: 500 }
      );
    }

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('❌ Backend API error:', backendResponse.status, errorText);

      let errorDetail = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail = errorJson.detail || errorJson.error || errorText;
      } catch {
        // Not JSON, use text as-is
      }

      return jsonResponse(
        {
          error: `Backend API error: ${backendResponse.status}`,
          detail: errorDetail,
        },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('✅ Decision engine analysis received from backend');

    return jsonResponse(backendData);
  } catch (error: any) {
    console.error('❌ Error in /api/brain/decision-engine-image:', error);

    // Check if it's a connection error
    if (error.message?.includes('fetch') || error.message?.includes('connect')) {
      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: 'Failed to connect to backend API. Please ensure the backend is running.',
        },
        { status: 500 }
      );
    }

    return jsonResponse(
      {
        error: error.message || 'An error occurred while processing your request',
        detail: 'Failed to process image analysis.',
      },
      { status: 500 }
    );
  }
}



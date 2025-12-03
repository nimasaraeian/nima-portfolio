import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Proxy endpoint for /api/brain/cognitive-friction
 * Forwards requests to the backend API
 */
/**
 * Default backend URL for local development
 */
const DEFAULT_DEV_BRAIN_URL = 'http://127.0.0.1:8000';

/**
 * Get backend URL from environment variables or use default
 */
function getBackendUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BRAIN_API_BASE_URL ||
    DEFAULT_DEV_BRAIN_URL
  );
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/brain/cognitive-friction POST request received');
  
  try {
    // Get backend URL from environment
    const backendUrl = getBackendUrl();
    const backendEndpoint = `${backendUrl}/api/brain/cognitive-friction`;
    
    console.log('[Brain API] Forwarding to backend:', backendEndpoint);
    
    // Get request body
    const body = await req.json();
    console.log('[Brain API] Incoming payload (raw):', body);

    // سازگار کردن payload برای نسخهٔ فعلی بک‌اند FastAPI:
    // فقط فیلدهایی را فوروارد می‌کنیم که اسکیمای بک‌اند انتظار دارد،
    // بقیه (content_type/goals/audience_stage و ...) برای آینده هستند.
    const sanitizedPayload = {
      raw_text: body.raw_text,
      platform: body.platform,
      goal: body.goal,
      audience: body.audience,
      language: body.language ?? 'en',
      meta: body.meta ?? null,
      image: body.image,
      image_type: body.image_type,
      image_name: body.image_name,
    };

    console.log('[Brain API] Forwarded payload to backend:', {
      hasText: !!sanitizedPayload.raw_text,
      textLength: sanitizedPayload.raw_text?.length || 0,
      platform: sanitizedPayload.platform,
      hasImage: !!sanitizedPayload.image,
    });
    
    // Forward to backend
    let backendResponse: Response;
    try {
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      });
    } catch (fetchError: any) {
      // Handle connection errors
      console.error('❌ Failed to connect to backend:', backendEndpoint, fetchError.message);
      return NextResponse.json(
        {
          error: 'fetch failed',
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
      
      return NextResponse.json(
        {
          error: `Backend API error: ${backendResponse.status}`,
          detail: errorDetail,
        },
        { status: backendResponse.status }
      );
    }
    
    const backendData = await backendResponse.json();
    console.log('✅ Backend API response received:', {
      hasFrictionScore: typeof backendData.frictionScore === 'number',
      hasTrustScore: typeof backendData.trustScore === 'number',
      hasBlockers: Array.isArray(backendData.keyDecisionBlockers),
    });
    
    return NextResponse.json(backendData);
    
  } catch (error: any) {
    console.error('❌ Error in /api/brain/cognitive-friction:', error);
    
    // Check if it's a connection error
    if (error.message?.includes('fetch') || error.message?.includes('connect')) {
      return NextResponse.json(
        {
          error: 'fetch failed',
          detail: 'Failed to connect to backend API. Please ensure the backend is running.',
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        error: error.message || 'An error occurred while processing your request',
        detail: 'Failed to connect to backend API. Please ensure the backend is running.',
      },
      { status: 500 }
    );
  }
}



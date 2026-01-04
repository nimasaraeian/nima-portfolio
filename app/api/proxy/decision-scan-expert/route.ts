import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';
import { getApiBase } from '@/src/lib/apiBase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Proxy endpoint for /api/proxy/decision-scan-expert
 * Forwards URL analysis requests to FastAPI backend with expert mode
 */
export async function POST(req: NextRequest) {
  try {
    const backendUrl = getApiBase();
    
    if (!backendUrl) {
      return jsonResponse(
        {
          error: 'backend_not_configured',
          detail: 'Backend URL not configured. Please set NEXT_PUBLIC_BACKEND_URL in environment variables.',
        },
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const expert = searchParams.get('expert') || 'true';
    const verbosity = searchParams.get('verbosity') || 'full';
    const recapture = searchParams.get('recapture') || 'false';
    
    // Forward to FastAPI /api/analyze/url-human-advanced endpoint
    const backendEndpoint = `${backendUrl}/api/analyze/url-human-advanced?expert=${expert}&verbosity=${verbosity}&recapture=${recapture}`;
    
    const body = await req.json();
    
    let backendResponse: Response;
    try {
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (fetchError: any) {
      console.error('❌ Failed to connect to backend:', backendEndpoint, fetchError.message);
      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: `Failed to connect to backend API at ${backendEndpoint}. Please ensure the backend is running.`,
        },
        { status: 500 }
      );
    }
    
    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
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
    return jsonResponse(backendData);
    
  } catch (error: any) {
    console.error('❌ Error in /api/proxy/decision-scan-expert:', error);
    return jsonResponse(
      {
        error: error.message || 'An error occurred while processing your request',
        detail: 'Failed to process expert decision scan.',
      },
      { status: 500 }
    );
  }
}


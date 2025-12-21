import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';
import { getApiBase } from '@/src/lib/apiBase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Get backend URL from environment variables
 */
function getBackendUrl(): string {
  return getApiBase();
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/brain/decision-engine POST request received');
  
  try {
    // Get backend URL from environment
    const backendUrl = getBackendUrl();
    const backendEndpoint = `${backendUrl}/api/brain/decision-engine`;
    
    console.log('[Brain API] Forwarding to backend:', backendEndpoint);
    
    // Get request body
    const body = await req.json();
    console.log('[Brain API] Incoming payload:', {
      hasContent: !!body.content,
      contentLength: body.content?.length || 0,
    });

    // Forward to backend
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
      // Handle connection errors
      console.error('❌ Failed to connect to backend:', backendEndpoint, fetchError.message);
      return jsonResponse(
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
      
      return jsonResponse(
        {
          error: `Backend API error: ${backendResponse.status}`,
          detail: errorDetail,
        },
        { status: backendResponse.status }
      );
    }
    
    const backendData = await backendResponse.json();
    console.log('✅ Backend API response received');
    
    return jsonResponse(backendData);
    
  } catch (error: any) {
    console.error('❌ Error in /api/brain/decision-engine:', error);
    
    // Check if it's a connection error
    if (error.message?.includes('fetch') || error.message?.includes('connect')) {
      return jsonResponse(
        {
          error: 'fetch failed',
          detail: 'Failed to connect to backend API. Please ensure the backend is running.',
        },
        { status: 500 }
      );
    }
    
    return jsonResponse(
      {
        error: error.message || 'An error occurred while processing your request',
        detail: 'Failed to process request.',
      },
      { status: 500 }
    );
  }
}



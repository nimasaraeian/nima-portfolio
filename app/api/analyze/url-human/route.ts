import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';
import { getApiBase } from '@/src/lib/apiBase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Proxy endpoint for /api/analyze/url-human
 * Forwards requests to the backend API
 */
export async function POST(req: NextRequest) {
  console.log('📥 /api/analyze/url-human POST request received');
  
  try {
    // Get backend URL from environment
    const backendUrl = getApiBase();
    
    console.log('[URL Human API] Backend URL from getApiBase():', backendUrl || '(empty - using relative URLs)');
    console.log('[URL Human API] Environment variables:', {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL ? '(set)' : '(not set)',
      NEXT_PUBLIC_BRAIN_API_URL: process.env.NEXT_PUBLIC_BRAIN_API_URL ? '(set)' : '(not set)',
    });
    
    if (!backendUrl) {
      return jsonResponse(
        {
          error: 'backend_not_configured',
          detail: 'Backend URL not configured. Please set NEXT_PUBLIC_BACKEND_URL in Vercel environment variables to your Railway backend URL (e.g., https://your-backend.railway.app).',
        },
        { status: 500 }
      );
    }
    
    // Warn if using localhost URL in production
    if (backendUrl.includes('127.0.0.1') || backendUrl.includes('localhost')) {
      console.warn('⚠️ WARNING: Using localhost/127.0.0.1 backend URL in production:', backendUrl);
      console.warn('⚠️ This will not work in production. Set NEXT_PUBLIC_BACKEND_URL to your Railway backend URL.');
    }
    
    const backendEndpoint = `${backendUrl}/api/analyze/url-human`;
    
    console.log('[URL Human API] Forwarding to backend:', backendEndpoint);
    
    // Get request body
    const body = await req.json();
    console.log('[URL Human API] Incoming payload:', {
      url: body.url,
      goal: body.goal,
      locale: body.locale,
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
          error: 'fetch_failed',
          detail: `Failed to connect to backend API at ${backendEndpoint}. Please ensure the backend is running.`,
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
    console.error('❌ Error in /api/analyze/url-human:', error);
    
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
        detail: 'Failed to process URL analysis.',
      },
      { status: 500 }
    );
  }
}


import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Default backend URL for local development
 */
const DEFAULT_DEV_BRAIN_URL = 'http://127.0.0.1:8000';

/**
 * Get backend URL from environment variables or use default
 */
function getBackendUrl(): string {
  // In development, always use localhost unless explicitly overridden
  if (process.env.NODE_ENV !== 'production') {
    const devUrl =
      process.env.BACKEND_BASE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_NIMA_BRAIN_API_URL ||
      process.env.NEXT_PUBLIC_BRAIN_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.BRAIN_API_BASE_URL ||
      DEFAULT_DEV_BRAIN_URL;
    
    // Ensure we're not using production URL in development
    if (devUrl.includes('railway.app') || devUrl.includes('render.com') || devUrl.includes('production')) {
      console.warn('⚠️  Production URL detected in development mode. Using localhost instead.');
      return DEFAULT_DEV_BRAIN_URL;
    }
    
    return devUrl.replace(/\/$/, '');
  }
  
  // Production: use environment variable or fallback
  const url =
    process.env.BACKEND_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_NIMA_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BRAIN_API_BASE_URL ||
    '<YOUR_RAILWAY_BACKEND_URL>';

  return url.replace(/\/$/, '');
}

// Helper to convert File/Blob to base64
async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  return `data:${file.type};base64,${base64}`;
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/brain/decision-diagnosis POST request received');

  try {
    // Get backend URL from environment
    const backendUrl = getBackendUrl();
    const backendEndpoint = `${backendUrl}/api/brain/decision-engine`;

    console.log('[Decision Diagnosis API] Forwarding to backend:', backendEndpoint);

    // Handle FormData (for file uploads) or JSON
    const contentType = req.headers.get('content-type') || '';
    let body: any;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const screenshot = formData.get('screenshot');
      
      body = {
        url: formData.get('url') || '',
        page_type: formData.get('page_type') || '',
        decision_question: formData.get('decision_question') || '',
        business_type: formData.get('business_type') || '',
        price_level: formData.get('price_level') || '',
        decision_depth: formData.get('decision_depth') || '',
        user_intent: formData.get('user_intent') || '',
        page_copy: formData.get('page_copy') || '',
      };

      // Convert screenshot to base64 if present
      if (screenshot && screenshot instanceof File) {
        const base64Image = await fileToBase64(screenshot);
        body.screenshot = base64Image;
        body.screenshot_type = screenshot.type;
      }

      console.log('[Decision Diagnosis API] Incoming FormData payload:', {
        hasUrl: !!body.url,
        hasScreenshot: !!body.screenshot,
        hasPageCopy: !!body.page_copy,
      });
    } else {
      body = await req.json();
      console.log('[Decision Diagnosis API] Incoming JSON payload:', {
        hasUrl: !!body.url,
        hasContext: !!body.context,
        hasContent: !!body.content,
      });
    }

    // Build content string from all fields for the backend
    // The backend expects { content: string }
    const contentParts: string[] = [];
    
    if (body.decision_question) {
      contentParts.push(`Decision Question: ${body.decision_question}`);
    }
    if (body.page_type) {
      contentParts.push(`Page Type: ${body.page_type}`);
    }
    if (body.url) {
      contentParts.push(`URL: ${body.url}`);
    }
    if (body.business_type) {
      contentParts.push(`Business Type: ${body.business_type}`);
    }
    if (body.price_level) {
      contentParts.push(`Price Level: ${body.price_level}`);
    }
    if (body.decision_depth) {
      contentParts.push(`Decision Depth: ${body.decision_depth}`);
    }
    if (body.user_intent) {
      contentParts.push(`User Intent: ${body.user_intent}`);
    }
    if (body.page_copy) {
      contentParts.push(`\nPage Content:\n${body.page_copy}`);
    }
    
    // If we have page_copy or other content, use it; otherwise combine all fields
    const content = body.page_copy 
      ? `${contentParts.filter(p => !p.startsWith('Page Content')).join('\n')}\n\n${body.page_copy}`
      : contentParts.join('\n');

    // Prepare the request body in the format the backend expects
    const backendBody = {
      content: content || 'No content provided',
    };

    console.log('[Decision Diagnosis API] Sending to backend:', {
      contentLength: backendBody.content.length,
      hasContent: !!backendBody.content,
    });

    // Forward to backend - no fallback, only backend
    let backendResponse: Response;
    try {
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendBody),
      });
    } catch (fetchError: any) {
      // Handle connection errors
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
      console.error('[Decision Diagnosis API] Backend error:', backendResponse.status, errorText);
      
      let errorDetail = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        // Handle different error formats
        if (errorJson.detail) {
          if (Array.isArray(errorJson.detail)) {
            errorDetail = errorJson.detail
              .map((err: any) => {
                if (typeof err === 'string') return err;
                if (err.msg) return err.msg;
                return JSON.stringify(err);
              })
              .join(', ');
          } else if (typeof errorJson.detail === 'string') {
            errorDetail = errorJson.detail;
          } else {
            errorDetail = JSON.stringify(errorJson.detail);
          }
        } else if (errorJson.error) {
          errorDetail = typeof errorJson.error === 'string' 
            ? errorJson.error 
            : JSON.stringify(errorJson.error);
        }
      } catch {
        // Not JSON, use text as-is
      }

      return jsonResponse(
        {
          error: true,
          message: 'Decision engine backend is not responding.',
          status: backendResponse.status,
          detail: errorDetail,
        },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('✅ Decision diagnosis response received from backend');
    console.log('[Decision Diagnosis API] Backend response data:', JSON.stringify(backendData, null, 2));

    // Normalize backend response to UI format
    const normalized = {
      primary_outcome: backendData.decision_blocker || backendData.primary_outcome || 'Outcome Unclear',
      primary_confidence: (backendData.confidence ?? backendData.primary_confidence ?? 0) / 100, // Convert from 0-100 to 0-1
      secondary_outcome: backendData.secondary_outcome,
      secondary_confidence: backendData.secondary_confidence ? backendData.secondary_confidence / 100 : undefined,
      decision_stage: backendData.decision_stage_assessment?.stage || backendData.decision_stage || 'unknown',
      summary: backendData.decision_stage_assessment?.explanation || 
               backendData.why || 
               backendData.summary || 
               'No detailed explanation provided by decision engine.',
      context: {
        business_type: body.business_type || backendData.context?.business_type || 'Unknown',
        price_level: body.price_level || backendData.context?.price_level || 'Unknown',
        decision_depth: body.decision_depth || backendData.context?.decision_depth || 'Unknown',
        user_intent: body.user_intent || backendData.context?.user_intent || 'Unknown',
        memory_summary: backendData.context?.memory_summary,
      },
      journey_insight: backendData.decision_stage_assessment?.friction_reasoning || backendData.journey_insight,
      what_to_fix_first: backendData.what_to_change_first 
        ? (Array.isArray(backendData.what_to_change_first) 
            ? backendData.what_to_change_first 
            : [backendData.what_to_change_first])
        : (backendData.what_to_fix_first || []),
      recommendations: {
        message: backendData.recommendations?.message || 
                 (backendData.decision_stage_assessment?.friction_recommendation 
                   ? [backendData.decision_stage_assessment.friction_recommendation] 
                   : []),
        structure: backendData.recommendations?.structure || [],
        timing: backendData.recommendations?.timing || [],
      },
      next_step: backendData.next_step || 
                 (backendData.expected_decision_lift 
                   ? `Expected decision lift: ${backendData.expected_decision_lift}` 
                   : undefined),
      // Keep raw backend data for debugging
      _rawBackend: backendData,
    };

    return jsonResponse(normalized);
  } catch (error: any) {
    console.error('❌ Error in /api/brain/decision-diagnosis:', error);

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
        detail: 'Failed to process decision diagnosis request.',
      },
      { status: 500 }
    );
  }
}

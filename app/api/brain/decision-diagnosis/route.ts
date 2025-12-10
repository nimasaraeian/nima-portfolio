import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';
import { normalizePriceLevel, normalizeDecisionDepth, normalizeBusinessType } from '@/lib/decisionNormalizers';

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
    const backendEndpoint = `${backendUrl}/api/brain/cognitive-friction`;

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

    // Prepare payload for cognitive-friction endpoint
    // Map frontend field names to backend field names
    // IMPORTANT: If URL is provided but page_copy is empty, backend will scrape the URL
    const urlValue = body.url?.trim() || '';
    const pageCopyValue = body.page_copy?.trim() || '';
    
    // Validate that we have either raw_text or image
    if (!pageCopyValue && !body.screenshot && !urlValue) {
      return jsonResponse(
        {
          error: 'validation_error',
          detail: 'Please provide either page copy text, a screenshot, or a URL for analysis.',
        },
        { status: 400 }
      );
    }
    
    // Normalize price_level, decision_depth, and business_type to match backend expectations
    const normalizedPriceLevel = normalizePriceLevel(body.price_level);
    const normalizedDecisionDepth = normalizeDecisionDepth(body.decision_depth);
    const normalizedBusinessType = normalizeBusinessType(body.business_type);
    
    const backendBody: any = {
      raw_text: pageCopyValue, // Empty if only URL is provided - backend will scrape
      url: urlValue || null, // NEW: Add URL at top level for direct access
      platform: 'landing_page', // Default, can be enhanced later
      goal: ['leads'],
      audience: 'cold',
      language: 'en',
      meta: {
        url: urlValue || null, // Also keep in meta for backward compatibility
        page_type: body.page_type || null,
      },
      business_type: normalizedBusinessType,
      price_level: normalizedPriceLevel,
      decision_depth: normalizedDecisionDepth,
      user_intent_stage: body.user_intent || null,
    };
    
    // Log URL scraping scenario
    if (urlValue && !pageCopyValue) {
      console.log('[Decision Diagnosis API] 🔍 URL provided without page_copy - backend will scrape:', urlValue);
    }

    // Add screenshot if provided
    if (body.screenshot) {
      backendBody.image = body.screenshot;
      backendBody.image_type = body.screenshot_type || 'image/png';
    }

    // Log payload before sending
    console.log('[CF FRONTEND] Payload sent to backend:', {
      url: backendBody.meta?.url,
      pageType: backendBody.meta?.page_type,
      businessType: backendBody.business_type,
      priceLevel: backendBody.price_level,
      decisionDepth: backendBody.decision_depth,
      userIntent: backendBody.user_intent_stage,
      pageCopy: backendBody.raw_text?.substring(0, 50) + '...',
      screenshotUrl: backendBody.image ? '[image provided]' : null,
    });

    console.log('[Decision Diagnosis API] Sending to backend:', {
      raw_text_length: backendBody.raw_text?.length || 0,
      hasImage: !!backendBody.image,
      hasContext: !!(backendBody.business_type || backendBody.price_level || backendBody.decision_depth || backendBody.user_intent_stage),
    });

    // Forward to backend - no fallback, only backend
    let backendResponse: Response;
    try {
      // Send as JSON to cognitive-friction endpoint
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

      // Check if it's a scraping error and format it nicely
      let formattedError = errorDetail;
      if (errorDetail.includes('Failed to scrape') || errorDetail.includes('does not expose enough')) {
        // Keep the full error message as it contains helpful instructions
        formattedError = errorDetail;
      }

      return jsonResponse(
        {
          error: true,
          message: backendResponse.status === 400 
            ? 'Invalid request or content issue' 
            : 'Decision engine backend is not responding.',
          status: backendResponse.status,
          detail: formattedError,
        },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('✅ Decision diagnosis response received from backend');
    console.log('[Decision Diagnosis API] Backend response data:', JSON.stringify(backendData, null, 2));

    // Normalize cognitive-friction response to UI format
    // Read from executive_decision_summary and decision_failure_breakdown
    const execSummary = backendData.executive_decision_summary || {};
    const failureBreakdown = backendData.decision_failure_breakdown || {};
    const metadata = backendData.metadata || {};
    
    // Extract what_to_fix_first from recommendations or next_better_actions
    let whatToFixFirst: string[] = [];
    if (backendData.next_better_actions && Array.isArray(backendData.next_better_actions) && backendData.next_better_actions.length > 0) {
      whatToFixFirst = backendData.next_better_actions
        .slice(0, 3)
        .map((action: any) => action.suggested_change || action.title || '')
        .filter((item: string) => item);
    } else if (failureBreakdown.reasons && Array.isArray(failureBreakdown.reasons)) {
      whatToFixFirst = failureBreakdown.reasons;
    } else if (metadata.priority_fix) {
      whatToFixFirst = [metadata.priority_fix];
    }
    
    // Extract recommendations from ai_recommendations
    const recommendations: any = {
      message: [],
      structure: [],
      timing: [],
    };
    
    if (backendData.ai_recommendations) {
      if (backendData.ai_recommendations.message && Array.isArray(backendData.ai_recommendations.message)) {
        recommendations.message = backendData.ai_recommendations.message.map((rec: any) => 
          rec.description || rec.change || rec
        );
      }
      if (backendData.ai_recommendations.structure && Array.isArray(backendData.ai_recommendations.structure)) {
        recommendations.structure = backendData.ai_recommendations.structure.map((rec: any) => 
          rec.description || rec.change || rec
        );
      }
      if (backendData.ai_recommendations.timing && Array.isArray(backendData.ai_recommendations.timing)) {
        recommendations.timing = backendData.ai_recommendations.timing.map((rec: any) => 
          rec.description || rec.change || rec
        );
      }
    }
    
    // Normalize backend response to UI format
    // Do NOT use hardcoded fallback values - let UI handle null/undefined gracefully
    const normalized = {
      primary_outcome: execSummary.primary_outcome || 
                       metadata.primary_outcome || 
                       failureBreakdown.primary_outcome || 
                       null,
      primary_confidence: execSummary.confidence !== undefined ? execSummary.confidence / 100 :
                         (metadata.primary_confidence !== undefined ? metadata.primary_confidence :
                         (failureBreakdown.confidence !== undefined ? failureBreakdown.confidence / 100 : null)),
      secondary_outcome: metadata.secondary_outcome || null,
      secondary_confidence: metadata.secondary_confidence || null,
      decision_stage: execSummary.decision_stage || 
                     metadata.decision_stage || 
                     null,
      summary: execSummary.summary || 
               metadata.psychological_explanation || 
               null,
      context: {
        business_type: body.business_type || backendData.metadata?.context_snapshot?.business_type || null,
        price_level: body.price_level || backendData.metadata?.context_snapshot?.price_level || null,
        decision_depth: body.decision_depth || backendData.metadata?.context_snapshot?.decision_depth || null,
        user_intent: body.user_intent || backendData.metadata?.context_snapshot?.user_intent_stage || null,
        memory_summary: backendData.metadata?.context_snapshot?.memory_summary || null,
      },
      journey_insight: metadata.outcome_interaction || 
                      metadata.psychological_explanation || 
                      null,
      what_to_fix_first: whatToFixFirst.length > 0 ? whatToFixFirst : null,
      recommendations: recommendations,
      next_step: backendData.conversionLiftEstimate 
        ? `Expected decision lift: ${backendData.conversionLiftEstimate}`
        : null,
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

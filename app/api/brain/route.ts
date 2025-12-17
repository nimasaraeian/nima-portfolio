import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEFAULT_BACKEND_URL = 'http://127.0.0.1:8000';
const BACKEND_PATH = '/api/brain/cognitive-friction';

function resolveBackendUrl(): string {
  const baseUrl =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BRAIN_API_BASE_URL ||
    DEFAULT_BACKEND_URL;

  return baseUrl.replace(/\/$/, '');
}

function extractTextFromBody(body: Record<string, any> | null): string {
  if (!body || typeof body !== 'object') {
    return '';
  }

  const candidateFields = [
    'content',
    'raw_text',
    'query',
    'text',
    'message',
    'prompt',
    'description',
  ];

  for (const key of candidateFields) {
    const value = body[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  const summaryParts: string[] = [];
  if (body.url) summaryParts.push(`URL: ${body.url}`);
  if (Array.isArray(body.goals) && body.goals.length) {
    summaryParts.push(`Goals: ${body.goals.join(', ')}`);
  }
  if (body.platform) summaryParts.push(`Platform: ${body.platform}`);
  if (body.industry) summaryParts.push(`Industry: ${body.industry}`);
  if (body.city) summaryParts.push(`City: ${body.city}`);
  if (body.channel) summaryParts.push(`Channel: ${body.channel}`);
  if (body.role) summaryParts.push(`Role: ${body.role}`);
  if (body.locale) summaryParts.push(`Locale: ${body.locale}`);

  if (summaryParts.length > 0) {
    return summaryParts.join('\n');
  }

  return JSON.stringify(body);
}

function isFile(value: FormDataEntryValue | null): value is File {
  return typeof File !== 'undefined' && value instanceof File;
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/brain POST request received');

  try {
    const contentType = (req.headers.get('content-type') || '').toLowerCase();
    const isFormRequest =
      contentType.includes('multipart/form-data') ||
      contentType.includes('application/x-www-form-urlencoded');

    let content = '';
    let imageFile: File | null = null;

    if (isFormRequest) {
      const incomingFormData = await req.formData();

      const imageEntry = incomingFormData.get('image');
      if (isFile(imageEntry)) {
        imageFile = imageEntry;
      }

      const contentEntry = incomingFormData.get('content');
      if (typeof contentEntry === 'string') {
        content = contentEntry;
      }
    } else {
      let jsonBody: Record<string, any> | null = null;
      try {
        jsonBody = await req.json();
        console.log('📋 JSON request body received for /api/brain');
      } catch (jsonError) {
        console.warn('⚠️ /api/brain received a non-JSON body without multipart form data', jsonError);
      }

      content = extractTextFromBody(jsonBody);
    }

    const hasImage = Boolean(imageFile);
    const hasContent = typeof content === 'string' && content.trim().length > 0;

    if (!hasImage && !hasContent) {
      return jsonResponse(
        {
          error: 'Missing content or image',
          detail: 'Provide either text content or an image for analysis.',
        },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    if (hasContent) {
      // Backend expects 'raw_text' not 'content'
      backendFormData.append('raw_text', content);
    }

    if (hasImage && imageFile) {
      const imageBuffer = await imageFile.arrayBuffer();
      const blob = new Blob([imageBuffer], {
        type: imageFile.type || 'application/octet-stream',
      });
      const filename = imageFile.name || `upload-${Date.now()}`;
      backendFormData.append('image', blob, filename);
    }

    const backendUrl = resolveBackendUrl();
    const backendEndpoint = `${backendUrl}${BACKEND_PATH}`;

    console.log('[Brain API] Forwarding request to backend:', backendEndpoint, {
      hasImage,
      hasContent,
      contentLength: content?.length || 0,
    });

    let backendResponse: Response;
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout
      
      try {
        backendResponse = await fetch(backendEndpoint, {
          method: 'POST',
          body: backendFormData,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (abortError) {
        clearTimeout(timeoutId);
        if (abortError instanceof Error && abortError.name === 'AbortError') {
          throw new Error('Request timeout: Backend did not respond within 2 minutes');
        }
        throw abortError;
      }
    } catch (fetchError: any) {
      console.error('❌ Failed to reach backend:', fetchError);
      const errorMessage = fetchError.message || String(fetchError);
      const isTimeout = errorMessage.includes('timeout') || errorMessage.includes('AbortError');
      const isConnectionError = errorMessage.includes('fetch') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ENOTFOUND');
      
      return jsonResponse(
        {
          error: isTimeout ? 'Request timeout' : isConnectionError ? 'Connection failed' : 'fetch failed',
          detail: isTimeout 
            ? `Backend did not respond within 2 minutes. The request may be taking too long or the backend may be unavailable.`
            : isConnectionError
            ? `Failed to connect to backend API at ${backendEndpoint}. Please ensure the FastAPI server is running and accessible. Error: ${errorMessage}`
            : `Failed to reach backend API at ${backendEndpoint}. Error: ${errorMessage}`,
          request_id: req.headers.get('x-request-id') || undefined,
        },
        { status: 502 }
      );
    }

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      let errorDetail = errorText;
      try {
        const parsed = JSON.parse(errorText);
        errorDetail = parsed.detail || parsed.error || errorText;
      } catch {
        // Ignore JSON parse failures
      }

      console.error('❌ Backend API error:', backendResponse.status, errorDetail);
      return jsonResponse(
        {
          error: `Backend API error: ${backendResponse.status}`,
          detail: errorDetail,
        },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('✅ Backend API response received and returned to UI');
    return jsonResponse(backendData);
  } catch (error) {
    console.error('❌ Error in /api/brain:', error);

    return jsonResponse(
      {
        error: 'Internal Server Error',
        detail: error instanceof Error ? error.message : 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}
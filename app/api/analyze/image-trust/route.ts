import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEFAULT_DEV_BRAIN_URL = 'http://127.0.0.1:8000';
const DEFAULT_PRODUCTION_URL = 'https://nima-ai-marketing.onrender.com';

function getBackendUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BRAIN_API_BASE_URL ||
    (process.env.NODE_ENV === 'production' ? DEFAULT_PRODUCTION_URL : DEFAULT_DEV_BRAIN_URL)
  );
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/analyze/image-trust POST request received');

  try {
    const backendUrl = getBackendUrl();
    const backendEndpoint = `${backendUrl}/api/analyze/image-trust`;

    const incomingFormData = await req.formData();
    const file = incomingFormData.get('file');

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
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
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

    // Convert File to Buffer and forward to backend
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create FormData for forwarding - use File constructor with buffer
    const forwardFormData = new FormData();
    // In Node.js 18+, we can use File constructor directly with buffer
    const fileForUpload = new File([buffer], file.name || 'upload.jpg', { type: file.type });
    forwardFormData.append('file', fileForUpload);

    console.log(`📤 Forwarding to backend: ${backendEndpoint}`);
    console.log(`   File: ${file.name || 'upload.jpg'}, Size: ${file.size} bytes, Type: ${file.type}`);

    let backendResponse: Response;
    try {
      // Add timeout for backend request (30 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        body: forwardFormData,
        signal: controller.signal,
        // Don't set Content-Type header - fetch will set it automatically with boundary for FormData
      });
      
      clearTimeout(timeoutId);
    } catch (fetchError: any) {
      if (fetchError?.name === 'AbortError') {
        console.error('❌ Backend request timed out after 30 seconds:', backendEndpoint);
        return jsonResponse(
          {
            error: 'backend_timeout',
            detail: 'Backend request timed out. The server may be overloaded or unreachable.',
            backend_url: backendEndpoint,
          },
          { status: 504 }
        );
      }
      console.error(
        '❌ Failed to connect to backend for image trust:',
        backendEndpoint,
        fetchError?.message || fetchError,
        fetchError?.stack
      );

      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: `Failed to connect to backend API at ${backendEndpoint}. The backend server may be down or unreachable.`,
          backend_url: backendEndpoint,
        },
        { status: 502 }
      );
    }

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error(
        '❌ Backend image trust error:',
        backendResponse.status,
        errorText,
        `(Backend URL: ${backendEndpoint})`
      );

      let errorDetail = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail = errorJson.detail || errorJson.message || errorJson.error || errorText;
      } catch {
        // ignore JSON parse failure
      }

      // Provide helpful error messages based on status code
      if (backendResponse.status === 422) {
        errorDetail = errorDetail || 'Backend validation failed. The image may be invalid or unsupported format.';
      } else if (backendResponse.status === 500) {
        errorDetail = errorDetail || 'Backend server error. The image trust analysis service encountered an internal error.';
      } else if (backendResponse.status === 503) {
        errorDetail = errorDetail || 'Backend service unavailable. The image trust analysis service is temporarily down.';
      }

      return jsonResponse(
        {
          error: `backend_error_${backendResponse.status}`,
          detail: errorDetail,
          backend_url: backendEndpoint,
          status: backendResponse.status,
        },
        { status: backendResponse.status }
      );
    }

    let backendData: any;
    try {
      const responseText = await backendResponse.text();
      if (!responseText) {
        throw new Error('Empty response from backend');
      }
      backendData = JSON.parse(responseText);
    } catch (parseError: any) {
      console.error('❌ Failed to parse backend response:', parseError);
      return jsonResponse(
        {
          error: 'invalid_backend_response',
          detail: 'Backend returned invalid response. Please check backend logs.',
        },
        { status: 502 }
      );
    }
    
    console.log('✅ Backend image trust response received:', {
      success: backendData?.success,
      hasAnalysis: !!backendData?.analysis,
    });

    return jsonResponse(backendData);
  } catch (error: any) {
    console.error('❌ Error in /api/analyze/image-trust:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    
    return jsonResponse(
      {
        error: 'image_trust_proxy_error',
        detail:
          error?.message ||
          'Unexpected error while proxying image trust analysis. Please check server logs.',
      },
      { status: 500 }
    );
  }
}





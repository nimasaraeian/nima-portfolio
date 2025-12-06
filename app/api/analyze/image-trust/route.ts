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

    const forwardFormData = new FormData();
    forwardFormData.append('file', file, file.name || 'upload.jpg');

    let backendResponse: Response;
    try {
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        body: forwardFormData,
      });
    } catch (fetchError: any) {
      console.error(
        '❌ Failed to connect to backend for image trust:',
        backendEndpoint,
        fetchError?.message || fetchError
      );

      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: `Failed to connect to backend API at ${backendEndpoint}. Please ensure the backend is running on ${backendUrl}`,
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

      // For 422 errors, provide more helpful error message
      if (backendResponse.status === 422) {
        errorDetail = errorDetail || 'Backend validation failed. The image may be invalid or unsupported format.';
      }

      return jsonResponse(
        {
          error: `backend_error_${backendResponse.status}`,
          detail: errorDetail,
          backend_url: backendEndpoint,
        },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('✅ Backend image trust response received');

    return jsonResponse(backendData);
  } catch (error: any) {
    console.error('❌ Error in /api/analyze/image-trust:', error);
    return jsonResponse(
      {
        error: 'image_trust_proxy_error',
        detail:
          error?.message ||
          'Unexpected error while proxying image trust analysis.',
      },
      { status: 500 }
    );
  }
}





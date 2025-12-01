/**
 * API Client Helper for Brain API
 * 
 * This module provides a centralized way to communicate with the backend Brain API.
 * It uses the NEXT_PUBLIC_API_BASE_URL environment variable for configuration.
 * 
 * Usage:
 *   import { postToBrain } from '@/lib/apiClient';
 *   const result = await postToBrain('/api/brain/cognitive-friction', payload);
 */

/**
 * Gets the base URL for the Brain API.
 * In browser: uses relative URLs (Next.js API routes)
 * In server: uses NEXT_PUBLIC_API_BASE_URL or falls back to relative URLs
 */
function getApiBaseUrl(): string {
  // In browser, always use relative URLs (Next.js API routes)
  if (typeof window !== 'undefined') {
    return '';
  }
  
  // In server-side code, try to use environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '⚠️  NEXT_PUBLIC_API_BASE_URL is not defined. ' +
        'Using relative URLs (Next.js API routes). ' +
        'For direct backend access, set NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000'
      );
    }
    // Return empty string to use relative URLs
    return '';
  }

  return baseUrl;
}

/**
 * Sends a POST request to the Brain API.
 * 
 * @param path - API endpoint path (e.g., '/api/brain/cognitive-friction')
 * @param payload - Request body object (will be JSON stringified)
 * @returns Promise resolving to the JSON response
 * @throws Error if the request fails or environment variable is missing
 */
export async function postToBrain<T = any>(
  path: string,
  payload: any
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  // Log payload info (without full base64 to avoid console spam)
  const payloadInfo = { ...payload };
  if (payloadInfo.image) {
    payloadInfo.image = `[base64 image, ${payloadInfo.image.length} characters]`;
  }
  console.log('📤 Sending to Brain API:', url, payloadInfo);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ Brain API request failed: ${res.status} ${res.statusText}`, text);
    throw new Error(`Brain API request failed with status ${res.status}`);
  }

  const result = await res.json();
  console.log('✅ Brain API response received');
  return result;
}









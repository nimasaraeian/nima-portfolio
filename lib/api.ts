/**
 * Unified API Client
 * 
 * Single source of truth for all backend API calls.
 * Prevents accidental fetches to user-entered URLs.
 * 
 * IMPORTANT: This client ONLY calls the backend API, never user URLs.
 * 
 * Client-side: Uses relative URLs (Next.js API routes)
 * Server-side: Uses absolute backend URL
 */

function getApiBase(): string {
  // Client-side: use relative URLs (Next.js API routes proxy to backend)
  if (typeof window !== 'undefined') {
    return '';
  }

  // Server-side: use backend URL from environment
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://nima-ai-marketing-production-82df.up.railway.app'; // Fallback

  if (!baseUrl) {
    console.warn('⚠️ No backend URL configured. Set NEXT_PUBLIC_BACKEND_URL in environment variables.');
  }

  return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
}

/**
 * POST JSON to backend API endpoint
 * 
 * @param path - API endpoint path (e.g., "/api/brain/decision-engine/report-from-url")
 * @param body - Request body object
 * @param timeoutMs - Request timeout in milliseconds (default: 180000 = 3 minutes)
 * @returns Promise resolving to parsed JSON response
 * @throws Error if request fails
 */
export async function postJSON<T>(
  path: string,
  body: any,
  timeoutMs = 180000
): Promise<T> {
  const apiBase = getApiBase();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = apiBase ? `${apiBase}${normalizedPath}` : normalizedPath;

  // Debug log
  if (typeof window !== 'undefined') {
    console.log('🔵 Calling API route:', normalizedPath);
    console.log('🔵 Full URL:', url);
    console.log('🔵 Payload:', { ...body, url: body.url ? '[URL provided - will be sent to backend]' : undefined });
    console.log('🔵 Backend URL (server-side):', process.env.NEXT_PUBLIC_BACKEND_URL || 'Not set');
  } else {
    console.log('🔵 Server-side: Calling backend directly:', url);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: 'no-store',
    });

    const text = await res.text();

    if (!res.ok) {
      let errorDetail = text;
      try {
        const errorJson = JSON.parse(text);
        errorDetail = errorJson.detail || errorJson.error || text;
      } catch {
        // Not JSON, use text as-is
      }

      throw new Error(`API ${res.status}: ${errorDetail.slice(0, 500)}`);
    }

    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs / 1000} seconds`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Get API base URL (for debugging/logging)
 */
export function getApiBaseUrl(): string {
  return getApiBase();
}


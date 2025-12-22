/**
 * API Base URL Configuration
 * 
 * Provides a centralized way to get the backend API base URL.
 * Uses NEXT_PUBLIC_BACKEND_URL with fallback to NEXT_PUBLIC_BRAIN_API_URL.
 * Normalizes trailing slashes to ensure consistent URL construction.
 */

/**
 * Gets the API base URL from environment variables.
 * Priority: NEXT_PUBLIC_BACKEND_URL > NEXT_PUBLIC_BRAIN_API_URL
 * 
 * For client-side: returns empty string to use relative URLs (Next.js API routes)
 * For server-side: returns the actual backend URL for direct backend calls
 * 
 * @returns The API base URL without trailing slash, or empty string for client-side relative URLs
 */
export function getApiBase(): string {
  // In browser/client-side, return empty string to use relative URLs (Next.js API routes)
  if (typeof window !== 'undefined') {
    return '';
  }

  // Server-side: get from environment variables
  const baseUrl = 
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    'https://nima-ai-marketing-production-82df.up.railway.app'; // Default Railway backend URL

  if (!baseUrl) {
    // Server-side fallback: if no env var is set, log a warning
    // In production, this should be set via environment variables
    console.warn(
      '⚠️ No NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_BRAIN_API_URL set. ' +
      'Server-side API calls may fail. Set NEXT_PUBLIC_BACKEND_URL in your deployment environment.'
    );
    return '';
  }

  // Normalize: remove trailing slash and return
  return baseUrl.replace(/\/+$/, '');
}


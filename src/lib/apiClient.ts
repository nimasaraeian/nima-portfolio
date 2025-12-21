/**
 * API Client for making backend API requests
 * 
 * This module provides apiFetch() which automatically prefixes API paths
 * with the base URL from getApiBase().
 * 
 * Usage:
 *   import { apiFetch } from '@/src/lib/apiClient';
 *   const response = await apiFetch('/api/brain/decision-engine', {
 *     method: 'POST',
 *     body: JSON.stringify(data),
 *     headers: { 'Content-Type': 'application/json' }
 *   });
 */

import { getApiBase } from './apiBase';

/**
 * Makes a fetch request to the API with automatic base URL prefixing.
 * 
 * @param path - API endpoint path (e.g., '/api/brain/cognitive-friction')
 * @param init - Fetch options (same as standard fetch() init parameter)
 * @returns Promise resolving to the Response object
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const baseUrl = getApiBase();
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Construct full URL
  const url = baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;

  // Make the fetch request
  return fetch(url, init);
}

/**
 * Convenience method for JSON POST requests
 * 
 * @param path - API endpoint path
 * @param data - Data to send (will be JSON stringified)
 * @param init - Additional fetch options
 * @returns Promise resolving to the JSON response
 */
export async function apiFetchJson<T = any>(
  path: string,
  data?: any,
  init?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    let errorDetail = text;
    
    try {
      const errorJson = JSON.parse(text);
      errorDetail = errorJson.detail || errorJson.error || text;
    } catch {
      // Not JSON, use text as-is
    }
    
    throw new Error(
      `API request failed with status ${response.status}: ${errorDetail}`
    );
  }

  return response.json();
}

/**
 * Convenience method for GET requests
 * 
 * @param path - API endpoint path
 * @param init - Additional fetch options
 * @returns Promise resolving to the JSON response
 */
export async function apiFetchGet<T = any>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, {
    method: 'GET',
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    let errorDetail = text;
    
    try {
      const errorJson = JSON.parse(text);
      errorDetail = errorJson.detail || errorJson.error || text;
    } catch {
      // Not JSON, use text as-is
    }
    
    throw new Error(
      `API request failed with status ${response.status}: ${errorDetail}`
    );
  }

  return response.json();
}


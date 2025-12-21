/**
 * API Client Helper for Brain API
 * 
 * This module provides a centralized way to communicate with the backend Brain API.
 * It uses the centralized getApiBase() function for configuration.
 * 
 * Usage:
 *   import { postToBrain } from '@/lib/apiClient';
 *   const result = await postToBrain('/api/brain/cognitive-friction', payload);
 */

import type { ImageTrustAPIResponse } from '@/app/ai-marketing/brain-types';
import { getApiBase } from '@/src/lib/apiBase';

// Shared marketing/behavior types
export type ContentType =
  | 'landing'
  | 'social'
  | 'ad'
  | 'sales_page'
  | 'email'
  | 'engagement';

export type AudienceStage = 'cold' | 'warm' | 'hot';

export type PrimaryGoal =
  | 'clicks'
  | 'leads'
  | 'sales'
  | 'engagement'
  | 'awareness'
  | 'retention'
  | 'open_rate'
  | 'reply';

export const GOALS_BY_TYPE: Record<ContentType, PrimaryGoal[]> = {
  landing: ['clicks', 'leads', 'sales', 'engagement'],
  social: ['engagement', 'awareness'],
  ad: ['clicks', 'sales', 'awareness'],
  sales_page: ['sales', 'engagement'],
  email: ['open_rate', 'clicks', 'reply'],
  engagement: ['retention', 'engagement', 'awareness'],
};

/**
 * Sends a POST request to the Brain API.
 * 
 * @param path - API endpoint path (e.g., '/api/brain/cognitive-friction')
 * @param payload - Request body object (will be JSON stringified)
 * @returns Promise resolving to the JSON response
 * @throws Error if the request fails or environment variable is missing
 */
export async function postToBrain<T = any>(path: string, payload: any): Promise<T> {
  const baseUrl = getApiBase();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;

  // Log payload info (without full base64 to avoid console spam)
  const payloadInfo = { ...payload };
  if (payloadInfo.image) {
    payloadInfo.image = `[base64 image, ${payloadInfo.image.length} characters]`;
  }
  
  console.log('[Brain API] Fetching:', url);
  console.log('[Brain API] Payload:', payloadInfo);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      let errorDetail = text;
      
      // Try to parse as JSON for better error messages
      try {
        const errorJson = JSON.parse(text);
        errorDetail = errorJson.detail || errorJson.error || text;
      } catch {
        // Not JSON, use text as-is
      }
      
      console.error(
        `❌ Brain API request failed: ${res.status} ${res.statusText} for ${url}`,
        errorDetail
      );
      
      throw new Error(
        `Brain API request failed with status ${res.status}: ${errorDetail}`
      );
    }

    const result = await res.json();
    console.log('✅ Brain API response received');
    return result;
  } catch (error: any) {
    // Handle network/connection errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error(`❌ Brain API connection failed for ${url}:`, error.message);
      throw new Error(
        `Failed to connect to backend API${baseUrl ? ` at ${baseUrl}` : ''}. ` +
        'Please ensure the backend is running and NEXT_PUBLIC_BACKEND_URL is configured.'
      );
    }
    
    // Re-throw other errors
    throw error;
  }
}

// Strictly typed helper for Cognitive Friction analysis
export interface CognitiveFrictionInput {
  raw_text: string;
  content_type: ContentType;
  goals: PrimaryGoal[];
  audience_stage: AudienceStage | null;
  language: string;
  // اختیاری: اگر کاربر اسکرین‌شات یا تصویر آپلود کند
  image?: string;
  image_type?: string;
  image_name?: string;
}

export async function analyzeCrictionWithImage(input: CognitiveFrictionInput) {
  return postToBrain('/api/brain/cognitive-friction', input);
}

// backward‑compatible alias name
export const analyzeCognitiveFriction = analyzeCrictionWithImage;

/**
 * Runs visual trust analysis on an uploaded image file
 * Uses the Next.js API route proxy to avoid CORS issues and improve error handling
 * 
 * @param file - The image file to analyze
 * @returns Promise resolving to the ImageTrustAPIResponse with new structure
 * @throws Error if the request fails
 */
export async function runVisualTrustAnalysis(file: File): Promise<ImageTrustAPIResponse> {
  const formData = new FormData();
  formData.append("file", file); // IMPORTANT: must match backend UploadFile name

  // Use Next.js API route proxy instead of calling backend directly
  const apiUrl = "/api/analyze/image-trust";
  console.log("[VisualTrust] Sending request to", apiUrl);

  const res = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let errorBody: any = null;
    let errorDetail = `Request failed with status ${res.status}`;
    
    try {
      errorBody = await res.json();
      errorDetail = errorBody.detail || errorBody.error || errorDetail;
      console.error("[VisualTrust] API error", res.status, errorBody);
    } catch (parseError) {
      // If response is not JSON, try to get text
      try {
        const errorText = await res.text();
        errorDetail = errorText || errorDetail;
        console.error("[VisualTrust] API error (text)", res.status, errorText);
      } catch (textError) {
        console.error("[VisualTrust] API error", res.status, "Unable to parse error response");
      }
    }
    
    throw new Error(`Image trust analysis failed: ${errorDetail}`);
  }

  const data = await res.json();
  console.log("[VisualTrust] Response received", data);
  return data;
}

/**
 * Checks the health status of the backend API
 * 
 * @returns Promise resolving to the health check response
 * @throws Error if the health check fails
 */
export async function checkBackendHealth() {
  const baseUrl = getApiBase();
  const healthUrl = baseUrl ? `${baseUrl}/health` : '/api/health';
  const res = await fetch(healthUrl, { method: 'GET' });
  if (!res.ok) {
    throw new Error("Backend health check failed");
  }
  return res.json();
}


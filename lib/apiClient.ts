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
 * Default backend URL for local development
 */
const DEFAULT_DEV_BRAIN_URL = 'http://127.0.0.1:8000';

/**
 * Gets the base URL for the Brain API.
 * In browser: uses relative URLs (Next.js API routes)
 * In server: uses NEXT_PUBLIC_API_BASE_URL or falls back to default dev URL
 */
function getApiBaseUrl(): string {
  // In browser, always use relative URLs (Next.js API routes)
  if (typeof window !== 'undefined') {
    return '';
  }
  
  // In server-side code, try environment variables first
  const baseUrl = 
    process.env.NEXT_PUBLIC_BRAIN_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.BRAIN_API_BASE_URL;
  
  if (baseUrl) {
    return baseUrl;
  }
  
  // Fallback to default dev URL
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️  No Brain API URL configured. ' +
      `Using default dev URL: ${DEFAULT_DEV_BRAIN_URL}. ` +
      'Set NEXT_PUBLIC_BRAIN_API_URL to override.'
    );
    return DEFAULT_DEV_BRAIN_URL;
  }
  
  // Production fallback (can be updated later)
  return DEFAULT_DEV_BRAIN_URL;
}

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
  const baseUrl = getApiBaseUrl();
  // Ensure path starts with / if baseUrl is provided
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

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
        `Failed to connect to backend API at ${url}. ` +
        'Please ensure the backend is running on http://127.0.0.1:8000'
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
 * Backend base URL for visual trust analysis
 * Uses NEXT_PUBLIC_BACKEND_URL or falls back to production URL
 */
export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://nima-ai-marketing.onrender.com";

export const IMAGE_TRUST_API_URL = `${BACKEND_BASE_URL}/api/analyze/image-trust`;
export const HEALTH_URL = `${BACKEND_BASE_URL}/health`;

/**
 * Runs visual trust analysis on an uploaded image file
 * 
 * @param file - The image file to analyze
 * @returns Promise resolving to the analysis result
 * @throws Error if the request fails
 */
export async function runVisualTrustAnalysis(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  console.log("[VisualTrust] Sending request to", IMAGE_TRUST_API_URL);

  const res = await fetch(IMAGE_TRUST_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.error("[VisualTrust] Backend error", res.status, res.statusText);
    throw new Error(`Image trust analysis failed with status ${res.status}`);
  }

  const data = await res.json();
  console.log("[VisualTrust] Response", data);
  return data;
}

/**
 * Checks the health status of the backend API
 * 
 * @returns Promise resolving to the health check response
 * @throws Error if the health check fails
 */
export async function checkBackendHealth() {
  const res = await fetch(HEALTH_URL);
  if (!res.ok) {
    throw new Error("Backend health check failed");
  }
  return res.json();
}


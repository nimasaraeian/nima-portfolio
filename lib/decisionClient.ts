/**
 * Centralized Decision Intelligence API Client
 * All requests must go through this file
 */

const getFastApiBaseUrl = (): string => {
  // In production, use Railway URL or environment variable
  if (typeof window !== 'undefined') {
    // Client-side: use public env var or proxy
    return process.env.NEXT_PUBLIC_FASTAPI_BASE_URL || '/api/proxy';
  }
  // Server-side: use direct URL
  return process.env.FASTAPI_BASE_URL || process.env.NEXT_PUBLIC_FASTAPI_BASE_URL || 'http://127.0.0.1:8000';
};

const API_BASE = getFastApiBaseUrl();

export interface AnalyzeUrlRequest {
  url: string;
  goal?: string;
}

export interface AnalyzeImageRequest {
  image: File | Blob;
  goal?: string;
}

export interface AnalyzeTextRequest {
  text: string;
  goal?: string;
}

export interface DecisionReportResponse {
  status?: "ok" | "limited" | "error";
  decision?: {
    decision_mode?: string;
    confidence?: number;
    primary_blocker?: string;
    scores?: Record<string, number>; // Multiple scores for different factors
    secondary?: string | string[]; // Secondary causes
  };
  decision_machine?: {
    decision_mode?: string;
    confidence?: number;
    primary_blocker?: string;
    scores?: Record<string, number>;
    secondary?: string | string[];
  };
  decision_model?: {
    decision_mode?: string;
    confidence?: number;
    drivers?: Array<{
      factor?: string;
      name?: string;
      score?: number;
      weight?: number;
    }>;
  };
  analysis_confidence?: number;
  confidence?: number; // Direct confidence value
  expected_impact?: {
    range?: [number, number];
    min?: number;
    max?: number;
  };
  summary?: {
    primary_blocker?: string;
    message?: string;
    verdict?: string;
  };
  verdict?: {
    primary_blocker?: string;
    reason?: string;
    summary?: string; // New: verdict summary
  };
  actions?: Array<{
    title: string;
    why: string;
    what?: string;
    where?: {
      section?: string;
    } | string;
    priority?: string;
  }>;
  quick_wins?: Array<{
    title: string;
    why: string;
    where?: {
      section?: string;
    };
    priority?: string;
  }>;
  checks?: Array<{
    title?: string;
    name?: string;
    description?: string;
    status?: string;
    severity?: string;
  }>;
  issues?: Array<{
    title: string;
    severity?: string;
    explanation?: string;
    why?: string;
  }>;
  screenshots?: {
    desktop?: {
      above_the_fold_data_url?: string; // Priority A: new format from backend
      above_the_fold?: string;
      aboveFold?: string;
      url?: string;
      data_url?: string;
    } | string; // Can also be a direct string
    mobile?: {
      above_the_fold_data_url?: string; // Priority B: new format from backend
      above_the_fold?: string;
      aboveFold?: string;
      url?: string;
      data_url?: string;
    } | string; // Can also be a direct string
    above_the_fold?: {
      desktop?: string;
      mobile?: string;
      desktop_url?: string;
      mobile_url?: string;
    };
  };
  image?: string; // For image mode - uploaded image as base64
  uploaded_image?: string;
  screenshot?: string;
  image_url?: string;
  page_map?: {
    headline?: string;
    ctas?: string[];
    trust_signals?: string[];
  };
  goal?: string;
  // New backend fields
  human_report?: {
    headline?: string;
    fix_first?: {
      title: string;
      what: string;
      why: string;
      where: string;
      impact?: "High" | "Medium" | "Low";
      effort?: "Low" | "Medium" | "High";
      examples?: string[];
    };
  };
  fix_first?: {
    title: string;
    what: string;
    why: string;
    where: string;
    impact?: "High" | "Medium" | "Low";
    effort?: "Low" | "Medium" | "High";
    examples?: string[];
  };
  supporting_evidence?: Array<{
    title: string;
    summary?: string;
    why?: string;
    where?: string;
    priority?: "high" | "medium" | "low";
  }>;
  visual?: {
    mode?: "screenshot" | "inferred";
    capture_status?: "ok" | "failed";
  };
  decision_style?: {
    id: string;
    label: string;
  };
  [key: string]: any; // Allow additional fields
}

/**
 * Analyze URL
 */
export async function analyzeUrl(request: AnalyzeUrlRequest): Promise<DecisionReportResponse> {
  const isClient = typeof window !== 'undefined';
  const endpoint = isClient 
    ? '/api/proxy/decision-scan'  // Use Next.js proxy for CORS
    : `${API_BASE}/api/analyze/url-human`;  // Direct call from server

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: request.url,
      goal: request.goal || 'leads',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to analyze URL: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * Analyze Image
 */
export async function analyzeImage(request: AnalyzeImageRequest): Promise<DecisionReportResponse> {
  const isClient = typeof window !== 'undefined';
  const endpoint = isClient
    ? '/api/proxy/analyze-human'  // Use Next.js proxy for CORS
    : `${API_BASE}/api/analyze/human`;  // Direct call from server

  const formData = new FormData();
  formData.append('image', request.image);
  if (request.goal) {
    formData.append('goal', request.goal);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to analyze image: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * Analyze Text
 */
export async function analyzeText(request: AnalyzeTextRequest): Promise<DecisionReportResponse> {
  const isClient = typeof window !== 'undefined';
  const endpoint = isClient
    ? '/api/proxy/analyze-human'  // Use Next.js proxy, send text field
    : `${API_BASE}/api/analyze/text-human`;  // Direct call from server

  if (isClient) {
    // Use proxy with text field
    const formData = new FormData();
    formData.append('text', request.text);
    if (request.goal) {
      formData.append('goal', request.goal);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to analyze text: ${response.status} ${errorText}`);
    }

    return response.json();
  } else {
    // Server-side direct call
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: request.text,
        goal: request.goal || 'leads',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to analyze text: ${response.status} ${errorText}`);
    }

    return response.json();
  }
}


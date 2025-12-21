import { NextRequest } from 'next/server';
import { jsonResponse } from '@/lib/jsonResponse';
import { getApiBase } from '@/src/lib/apiBase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Get backend URL from environment variables
 */
function getBackendUrl(): string {
  return getApiBase();
}

/**
 * Extract decision-critical text from HTML
 * Looks for pricing, CTAs, guarantees, forms, etc.
 */
function extractDecisionText(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Extract text from common decision-critical elements
  const decisionKeywords = [
    /price|pricing|cost|fee|subscription|plan|monthly|yearly/gi,
    /buy|purchase|order|checkout|add to cart|sign up|subscribe|get started/gi,
    /guarantee|money.back|refund|return|trial|free|no credit card/gi,
    /form|input|field|required|optional/gi,
    /delivery|shipping|sizing|size|option/gi,
    /trust|secure|safe|certified|award/gi,
  ];

  // Find all text content
  text = text.replace(/<[^>]+>/g, ' '); // Remove HTML tags
  text = text.replace(/\s+/g, ' '); // Normalize whitespace
  text = text.trim();

  // Extract sentences/paragraphs containing decision keywords
  const sentences = text.split(/[.!?]\s+/);
  const relevantSentences: string[] = [];
  
  for (const sentence of sentences) {
    for (const keyword of decisionKeywords) {
      if (keyword.test(sentence)) {
        relevantSentences.push(sentence.trim());
        break;
      }
    }
  }

  // Also look for button text and form labels
  const buttonMatches = html.match(/<button[^>]*>([^<]+)<\/button>/gi) || [];
  const inputLabels = html.match(/<label[^>]*>([^<]+)<\/label>/gi) || [];
  const anchorCTAs = html.match(/<a[^>]*class="[^"]*(?:cta|button|btn)[^"]*"[^>]*>([^<]+)<\/a>/gi) || [];

  const extractedText = [
    ...relevantSentences.slice(0, 20), // Limit to 20 most relevant sentences
    ...buttonMatches.map(m => m.replace(/<[^>]+>/g, '').trim()),
    ...inputLabels.map(m => m.replace(/<[^>]+>/g, '').trim()),
    ...anchorCTAs.map(m => m.replace(/<[^>]+>/g, '').trim()),
  ]
    .filter(t => t.length > 5) // Filter out very short text
    .join(' ')
    .substring(0, 2000); // Limit total length

  return extractedText || text.substring(0, 2000);
}

export async function POST(req: NextRequest) {
  console.log('📥 /api/brain/decision-engine-url POST request received');

  try {
    const body = await req.json();
    const url = body.url?.trim();

    if (!url) {
      return jsonResponse(
        {
          error: 'url_required',
          detail: 'URL is required. Please provide a valid URL.',
        },
        { status: 400 }
      );
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return jsonResponse(
          {
            error: 'invalid_protocol',
            detail: 'URL must use HTTP or HTTPS protocol.',
          },
          { status: 400 }
        );
      }
    } catch {
      return jsonResponse(
        {
          error: 'invalid_url',
          detail: 'Invalid URL format. Please provide a valid URL (e.g., https://example.com).',
        },
        { status: 400 }
      );
    }

    console.log(`🌐 Fetching content from URL: ${url}`);

    // Fetch the webpage with increased timeout
    let html: string;
    const timeoutMs = 30000; // 30 seconds timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return jsonResponse(
          {
            error: 'fetch_failed',
            detail: `Failed to fetch URL: ${response.status} ${response.statusText}. The server may be blocking requests or the page may require authentication.`,
          },
          { status: response.status }
        );
      }

      // Check content type
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/html') && !contentType.includes('text/plain')) {
        console.warn(`⚠️ Unexpected content type: ${contentType}`);
      }

      html = await response.text();
      
      if (!html || html.length === 0) {
        return jsonResponse(
          {
            error: 'empty_content',
            detail: 'The URL returned no content. The page may be empty or require JavaScript to load content.',
          },
          { status: 400 }
        );
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.error('❌ Failed to fetch URL:', fetchError);
      
      // More specific error handling
      const errorMessage = fetchError.message || '';
      const errorName = fetchError.name || '';
      
      if (errorName === 'AbortError' || errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
        return jsonResponse(
          {
            error: 'timeout',
            detail: `Request timed out after ${timeoutMs / 1000} seconds. The URL may be too slow, unreachable, or the server is not responding. Please try a different URL or use text/image input instead.`,
          },
          { status: 408 }
        );
      }
      
      if (errorMessage.includes('CORS') || errorMessage.includes('cross-origin')) {
        return jsonResponse(
          {
            error: 'cors_error',
            detail: 'The URL is blocked by CORS policy. Many websites block direct access from servers. Please copy the page content manually and paste it as text, or upload a screenshot instead.',
          },
          { status: 403 }
        );
      }
      
      if (errorMessage.includes('certificate') || errorMessage.includes('SSL') || errorMessage.includes('TLS')) {
        return jsonResponse(
          {
            error: 'ssl_error',
            detail: 'SSL/TLS certificate error. The website may have an invalid certificate. Please verify the URL is correct or use text/image input instead.',
          },
          { status: 500 }
        );
      }
      
      if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('getaddrinfo')) {
        return jsonResponse(
          {
            error: 'dns_error',
            detail: 'DNS lookup failed. The domain name cannot be resolved. Please verify the URL is correct and the website is accessible.',
          },
          { status: 500 }
        );
      }
      
      if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('connection refused')) {
        return jsonResponse(
          {
            error: 'connection_refused',
            detail: 'Connection refused. The server is not accepting connections. The website may be down or blocking requests. Please try again later or use text/image input instead.',
          },
          { status: 500 }
        );
      }
      
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        return jsonResponse(
          {
            error: 'network_error',
            detail: 'Network error occurred. This could be due to: 1) The website blocking automated requests, 2) Network connectivity issues, 3) Firewall restrictions. Please try copying the page content and pasting it as text, or upload a screenshot instead.',
          },
          { status: 500 }
        );
      }
      
      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: `Failed to fetch URL: ${errorMessage || 'Unknown error'}. Common causes: 1) Website blocks automated requests, 2) Requires authentication, 3) JavaScript-rendered content. Solution: Copy the page content manually and paste it as text, or upload a screenshot of the page.`,
        },
        { status: 500 }
      );
    }


    // Extract decision-critical text
    const extractedText = extractDecisionText(html);

    if (!extractedText || extractedText.trim().length < 20) {
      return jsonResponse(
        {
          error: 'insufficient_decision_info',
          detail: 'The page does not contain enough decision-critical information (pricing, CTAs, guarantees, etc.). Please try a different URL or use text/image input instead.',
        },
        { status: 400 }
      );
    }

    console.log('✅ Text extracted from URL:', {
      length: extractedText.length,
      preview: extractedText.substring(0, 100),
    });

    // Send extracted text to the existing decision-engine endpoint
    const backendUrl = getBackendUrl();
    const backendEndpoint = `${backendUrl}/api/brain/decision-engine`;

    console.log('[Decision Engine URL] Forwarding extracted text to backend:', backendEndpoint);

    let backendResponse: Response;
    try {
      backendResponse = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: extractedText }),
      });
    } catch (fetchError: any) {
      console.error('❌ Failed to connect to backend:', backendEndpoint, fetchError.message);
      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: `Failed to connect to backend API at ${backendEndpoint}. Please ensure the backend is running on ${backendUrl}`,
        },
        { status: 500 }
      );
    }

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('❌ Backend API error:', backendResponse.status, errorText);

      let errorDetail = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail = errorJson.detail || errorJson.error || errorText;
      } catch {
        // Not JSON, use text as-is
      }

      return jsonResponse(
        {
          error: `Backend API error: ${backendResponse.status}`,
          detail: errorDetail,
        },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('✅ Decision engine analysis received from backend');

    return jsonResponse(backendData);
  } catch (error: any) {
    console.error('❌ Error in /api/brain/decision-engine-url:', error);

    // Check if it's a connection error
    if (error.message?.includes('fetch') || error.message?.includes('connect')) {
      return jsonResponse(
        {
          error: 'fetch_failed',
          detail: 'Failed to connect to backend API. Please ensure the backend is running.',
        },
        { status: 500 }
      );
    }

    return jsonResponse(
      {
        error: error.message || 'An error occurred while processing your request',
        detail: 'Failed to process URL analysis.',
      },
      { status: 500 }
    );
  }
}


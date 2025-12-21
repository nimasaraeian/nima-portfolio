import { getApiBase } from '@/src/lib/apiBase';

export async function POST(req: Request) {
  const backendBaseUrl = getApiBase() || (process.env.BACKEND_BASE_URL ?? '');
  
  if (!backendBaseUrl) {
    return new Response(
      JSON.stringify({
        error: 'backend_not_configured',
        detail: 'Backend URL not configured. Please set NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_BRAIN_API_URL in environment variables.',
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
      const formData = await req.formData();

    console.log('[Decision Diagnosis Proxy] Received FormData:', {
      hasImage: formData.has('image'),
      hasRawText: formData.has('raw_text'),
    });

    // ۱) ارسال فرم به FastAPI
    let response: Response;
    try {
      response = await fetch(
        `${backendBaseUrl}/api/brain/cognitive-friction`,
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (fetchError: any) {
      console.error('[Decision Diagnosis Proxy] Fetch failed:', fetchError);
      const errorMessage = fetchError.message || 'Failed to connect to backend';
      const isConnectionError = errorMessage.includes('fetch') || 
                                errorMessage.includes('ECONNREFUSED') || 
                                errorMessage.includes('network') ||
                                errorMessage.includes('Failed to fetch');
      
      return new Response(
        JSON.stringify({
          error: 'fetch_failed',
          detail: isConnectionError 
            ? `Cannot connect to FastAPI backend at ${backendBaseUrl}. Please ensure the backend is running. Error: ${errorMessage}`
            : `Network error: ${errorMessage}`,
          backendUrl: backendBaseUrl,
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log('[Decision Diagnosis Proxy] Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Decision Diagnosis Proxy] Backend error:', response.status, errorText);
      
      let errorDetail = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail = errorJson.detail || errorJson.error || errorText;
      } catch {
        // Not JSON
      }

      return new Response(
        JSON.stringify({
          error: 'backend_error',
          status: response.status,
          detail: errorDetail,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = await response.json();

    // انتظار داریم بک‌اند چیزی مثل این بده:
    // { fullResponse: "{ ...json... }", ... }
    const rawFull = (data as any).fullResponse ?? data;

    let parsed: any;
    if (typeof rawFull === "string") {
      try {
        parsed = JSON.parse(rawFull);
      } catch (e) {
        console.error("Failed to parse fullResponse JSON:", e);
        parsed = {};
      }
    } else {
      parsed = rawFull;
    }

    console.log('[Decision Diagnosis Proxy] Parsed response:', {
      frictionScore: parsed.frictionScore,
      trustScore: parsed.trustScore,
      decisionProbability: parsed.decisionProbability,
      keys: Object.keys(parsed),
    });
    
    // ۲) قوانین ساده برای ساخت primaryOutcome و confidence
    const frictionScore = parsed.frictionScore ?? 0;
    const trustScore = parsed.trustScore ?? 50;
    const decisionProbability = parsed.decisionProbability ?? 0;

    let primaryOutcome: string;
    if (trustScore < 45) {
      primaryOutcome = "TRUST_DEBT";
    } else if (frictionScore > 60) {
      primaryOutcome = "RISK_DOMINANT";
    } else if ((parsed.emotionalClarityScore ?? 100) < 50) {
      primaryOutcome = "OUTCOME_UNCLEAR";
    } else {
      primaryOutcome = "FRICTION_FREE"; // Changed from HEALTHY_DECISION to match UI expectations
    }

    const confidence = Math.round(decisionProbability * 100) / 100;

    // ۳) مپ به ساختاری که UI انتظار دارد
    // UI expects: primary_outcome, executive_summary (string), friction_scores, etc.
    const mappedResult = {
      primary_outcome: primaryOutcome,
      primary_confidence: confidence,
      decision_stage: parsed.decisionStage ?? "awareness",
      executive_summary: parsed.explanationSummary ?? parsed.explanation ?? "No explanation provided by the model.",
      friction_scores: parsed.friction_scores ?? {
        trust: trustScore,
        clarity: parsed.emotionalClarityScore ?? 50,
        value: parsed.valueScore ?? 50,
        relevance: parsed.relevanceScore ?? 50,
        cognitive_load: frictionScore,
        motivation: parsed.motivationScore ?? 50,
        risk_perception: parsed.riskScore ?? 50,
      },
      recommendations: parsed.recommendations ?? parsed.what_to_fix_first ?? [],
      page_type: parsed.page_type ?? "landing_page",
      // برای نمایش یا دیباگ:
      raw_model: parsed,
    };

    console.log('[Decision Diagnosis Proxy] Mapped result:', {
      primary_outcome: mappedResult.primary_outcome,
      confidence: mappedResult.primary_confidence,
      hasExecutiveSummary: !!mappedResult.executive_summary,
      hasFrictionScores: !!mappedResult.friction_scores,
    });

    return new Response(JSON.stringify(mappedResult), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error('[Decision Diagnosis Proxy] Error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'proxy_error',
        detail: error.message || 'Failed to forward request to backend',
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
      },
      }
    );
  }
}

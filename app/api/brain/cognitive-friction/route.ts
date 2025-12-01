import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Proxy endpoint for /api/brain/cognitive-friction
 * Forwards requests to the backend API
 */
export async function POST(req: NextRequest) {
  console.log('📥 /api/brain/cognitive-friction POST request received');
  
  try {
    // Get backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
    const backendEndpoint = `${backendUrl}/api/brain/cognitive-friction`;
    
    console.log('📤 Forwarding to backend:', backendEndpoint);
    
    // Get request body
    const body = await req.json();
    console.log('📋 Request payload:', { 
      hasText: !!body.raw_text, 
      textLength: body.raw_text?.length || 0,
      platform: body.platform,
      hasImage: !!body.image 
    });
    
    // Forward to backend
    const backendResponse = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('❌ Backend API error:', backendResponse.status, errorText);
      return NextResponse.json(
        {
          error: `Backend API error: ${backendResponse.status}`,
          detail: errorText,
        },
        { status: backendResponse.status }
      );
    }
    
    const backendData = await backendResponse.json();
    console.log('✅ Backend API response received:', {
      hasFrictionScore: typeof backendData.frictionScore === 'number',
      hasTrustScore: typeof backendData.trustScore === 'number',
      hasBlockers: Array.isArray(backendData.keyDecisionBlockers),
    });
    
    return NextResponse.json(backendData);
    
  } catch (error: any) {
    console.error('❌ Error in /api/brain/cognitive-friction:', error);
    
    return NextResponse.json(
      {
        error: error.message || 'An error occurred while processing your request',
        detail: 'Failed to connect to backend API. Please ensure the backend is running.',
      },
      { status: 500 }
    );
  }
}


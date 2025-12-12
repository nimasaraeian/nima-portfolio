"""
FastAPI Backend for AI Marketing Brain - DeepScan Endpoint
"""
from fastapi import FastAPI, HTTPException, Request, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from typing import Optional
import os
from dotenv import load_dotenv
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import json
import re
import base64

# Load environment variables
project_root = Path(__file__).parent.parent
env_file = project_root / ".env.local"
if env_file.exists():
    load_dotenv(env_file)
else:
    load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Nima AI Marketing Brain API",
    version="1.0.0",
    description="AI Marketing Brain API for DeepScan and other modules"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def enforce_utf8_charset(request: Request, call_next):
    response = await call_next(request)
    content_type = response.headers.get("content-type")
    if content_type and content_type.startswith("application/json"):
        response.headers["content-type"] = "application/json; charset=utf-8"
    return response

# Initialize OpenAI client
def get_openai_client():
    """Get OpenAI client with API key from environment"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set")
    return OpenAI(api_key=api_key)


# Request/Response Models
class DeepScanRequest(BaseModel):
    industry: str
    city: str
    audience: str
    analysis: str


class DeepScanResponse(BaseModel):
    summary: str
    segments: list[str]
    barriers: list[str]
    triggers: list[str]
    recommendations: list[str]


# Request/Response Models for Cognitive Friction
class CognitiveFrictionRequest(BaseModel):
    raw_text: str = ""
    url: Optional[str] = None
    platform: str = "landing_page"
    goal: list[str] = []
    audience: str = "cold"
    language: str = "en"
    meta: Optional[dict] = None
    business_type: Optional[str] = None
    price_level: Optional[str] = None
    decision_depth: Optional[str] = None
    user_intent_stage: Optional[str] = None
    image: Optional[str] = None
    image_type: Optional[str] = None


def scrape_url(url: str) -> str:
    """
    Scrape text content from a URL.
    
    Args:
        url: The URL to scrape
        
    Returns:
        Extracted text content from the webpage
        
    Raises:
        HTTPException: If scraping fails
    """
    try:
        # Validate URL
        if not url or not url.startswith(('http://', 'https://')):
            raise ValueError("Invalid URL format. URL must start with http:// or https://")
        
        # Fetch the webpage
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        
        response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style", "meta", "link"]):
            script.decompose()
        
        # Extract text
        text = soup.get_text()
        
        # Clean up text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        if not text or len(text) < 50:
            raise ValueError("The URL does not expose enough readable content. The page may require JavaScript to load content or may be behind authentication.")
        
        # Limit text length to avoid token limits
        return text[:5000] if len(text) > 5000 else text
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to render URL: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to render URL: {str(e)}"
        )


# System Prompt for DeepScan
DEEPSCAN_SYSTEM_PROMPT = """You are an AI Behavioral Marketing Strategist specializing in psychometric analysis and audience segmentation.

Your task is to analyze marketing scenarios and provide deep behavioral insights using:
- Psychometric mapping (cognition, emotion, decision patterns)
- Audience motivations, barriers, and triggers
- Cultural & aesthetic preferences
- Behavioral segmentation

Always provide:
1. A concise summary (2-3 sentences)
2. Clear audience segments (3-5 segments)
3. Key barriers (3-5 barriers)
4. Emotional triggers (3-5 triggers)
5. Actionable recommendations (3-5 recommendations)

Be specific, concrete, and actionable. Use behavioral psychology principles."""


# System Prompt for Cognitive Friction Analysis
COGNITIVE_FRICTION_SYSTEM_PROMPT = """You are an expert in decision psychology and cognitive friction analysis for marketing pages.

Your task is to analyze landing pages and identify decision blockers, cognitive friction points, and provide actionable recommendations.

Analyze the content for:
1. **Primary Outcome Clarity**: Is the outcome/benefit clear? (OUTCOME_CLEAR, OUTCOME_UNCLEAR, OUTCOME_AMBIGUOUS)
2. **Decision Stage**: Where is the user in their journey? (awareness, consideration, decision, action)
3. **Cognitive Friction**: What creates hesitation or confusion?
4. **Trust Signals**: What builds or breaks trust?
5. **Emotional Alignment**: Does the message match user intent?

Provide specific, actionable recommendations based on the actual content analyzed."""


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "status": "ok",
        "message": "Nima AI Marketing Brain API",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/brain/deepscan", response_model=DeepScanResponse)
async def deepscan(request: DeepScanRequest):
    """
    Behavioral DeepScan endpoint.
    
    Analyzes the provided scenario and returns:
    - Summary: Brief overview
    - Segments: Audience segments
    - Barriers: Key barriers
    - Triggers: Emotional triggers
    - Recommendations: Actionable recommendations
    """
    try:
        client = get_openai_client()
        
        # Build the user prompt
        user_prompt = f"""Analyze this marketing scenario:

Industry: {request.industry}
City: {request.city}
Target Audience: {request.audience}
Analysis Request: {request.analysis}

Provide a behavioral DeepScan analysis. Format your response as JSON with these exact keys:
- "summary": A 2-3 sentence summary
- "segments": Array of 3-5 audience segments (each as a string)
- "barriers": Array of 3-5 key barriers (each as a string)
- "triggers": Array of 3-5 emotional triggers (each as a string)
- "recommendations": Array of 3-5 actionable recommendations (each as a string)

Return ONLY valid JSON, no markdown, no code blocks."""

        # Call OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": DEEPSCAN_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        # Parse response
        content = response.choices[0].message.content
        
        # Parse JSON response
        import json
        try:
            result = json.loads(content)
        except json.JSONDecodeError:
            # Fallback: try to extract JSON from markdown code blocks
            import re
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group())
            else:
                raise ValueError("Could not parse JSON from response")
        
        # Validate and return
        return DeepScanResponse(
            summary=result.get("summary", "Analysis completed"),
            segments=result.get("segments", []),
            barriers=result.get("barriers", []),
            triggers=result.get("triggers", []),
            recommendations=result.get("recommendations", [])
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/brain/cognitive-friction")
async def cognitive_friction(
    request: Request,
    raw_text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    """
    Cognitive Friction analysis endpoint.
    
    This endpoint accepts both FormData (for file uploads) and JSON.
    
    FormData fields:
    - url: Optional URL to scrape
    - page_copy: Optional text content
    - screenshot: Optional image file
    
    This endpoint:
    1. Scrapes URL if page_copy is empty but URL is provided
    2. Converts image file to base64 if provided
    3. Forwards the request to the main Brain backend for actual analysis
    4. Returns the analysis results from the main backend
    """
    try:
        content_type = request.headers.get("content-type", "")
        print(f"📥 Received request - Content-Type: {content_type}")
        print(f"📥 Form fields - raw_text: {'provided' if raw_text else 'None'}, image: {'provided' if image else 'None'}")
        
        # Process raw_text
        processed_raw_text = ""
        if raw_text and isinstance(raw_text, str):
            processed_raw_text = raw_text.strip()
        
        # Process image file
        image_base64 = None
        image_type = None
        
        if image and hasattr(image, 'filename') and image.filename:
            try:
                image_bytes = await image.read()
                if len(image_bytes) > 0:
                    image_base64 = base64.b64encode(image_bytes).decode('utf-8')
                    image_type = image.content_type or 'image/png'
                    filename = image.filename or 'unknown'
                    print(f"✅ Received image: {filename}, size: {len(image_bytes)} bytes, type: {image_type}")
                else:
                    print("⚠️ Image file is empty")
            except Exception as e:
                print(f"⚠️ Error processing image: {str(e)}")
        
        print(f"📝 Processed - raw_text length: {len(processed_raw_text)}, has_image: {bool(image_base64)}")
        
        # Validate that we have content
        if not processed_raw_text and not image_base64:
            error_msg = f"Either text (raw_text) or image must be provided for analysis. Current status: raw_text={'empty' if not processed_raw_text else 'provided'}, image={'not provided' if not image_base64 else 'provided'}"
            print(f"❌ Validation failed: {error_msg}")
            raise HTTPException(
                status_code=400,
                detail=error_msg
            )
        
        # Prepare request for main brain backend
        brain_request = CognitiveFrictionRequest(
            raw_text=processed_raw_text,
            url=None,  # URL scraping removed - only raw_text and image are accepted
            image=image_base64,
            image_type=image_type,
            platform="landing_page",
            goal=[],
            audience="cold",
            language="en",
            meta=None
        )
        
        # Get the main Brain backend URL from environment
        # This is the actual AI brain that does the analysis
        # IMPORTANT: This MUST point to the main Brain backend - NO OpenAI fallback
        main_brain_url = os.getenv("MAIN_BRAIN_BACKEND_URL") or os.getenv("BRAIN_BACKEND_URL")
        
        if not main_brain_url or main_brain_url == "https://your-main-brain-backend.com":
            # Main brain backend is REQUIRED - no fallback to OpenAI
            raise HTTPException(
                status_code=500,
                detail="Main brain backend URL not configured. Please set MAIN_BRAIN_BACKEND_URL or BRAIN_BACKEND_URL environment variable to your main Brain backend URL."
            )
        
        # Prepare payload for main brain backend
        brain_payload = {
            "raw_text": brain_request.raw_text,
            "platform": brain_request.platform,
            "goal": brain_request.goal,
            "audience": brain_request.audience,
            "language": brain_request.language,
            "meta": brain_request.meta or {},
            "business_type": brain_request.business_type,
            "price_level": brain_request.price_level,
            "decision_depth": brain_request.decision_depth,
            "user_intent_stage": brain_request.user_intent_stage,
        }
        
        if brain_request.image:
            brain_payload["image"] = brain_request.image
            brain_payload["image_type"] = brain_request.image_type
        
        # Forward to main brain backend for actual analysis
        # Main Brain Backend endpoint: /api/brain
        brain_endpoint = f"{main_brain_url.rstrip('/')}/api/brain"
        print(f"🔄 Forwarding to main brain backend: {brain_endpoint}")
        print(f"📦 Payload: raw_text length={len(brain_request.raw_text) if brain_request.raw_text else 0}, has_image={bool(brain_request.image)}")
        
        try:
            response = requests.post(
                brain_endpoint,
                json=brain_payload,
                headers={"Content-Type": "application/json"},
                timeout=120  # 2 minutes timeout for AI analysis
            )
            response.raise_for_status()
            
            result = response.json()
            print(f"✅ Received analysis from main brain backend")
            print(f"📊 Response structure: {list(result.keys()) if isinstance(result, dict) else 'Not a dict'}")
            print(f"📊 primary_outcome: {result.get('primary_outcome', 'NOT FOUND')}")
            print(f"📊 executive_summary: {result.get('executive_summary', 'NOT FOUND')}")
            print(f"📊 executive_decision_summary: {result.get('executive_decision_summary', 'NOT FOUND')}")
            print(f"📊 Full response preview: {str(result)[:500]}")
            return result
            
        except requests.exceptions.RequestException as e:
            error_msg = str(e)
            if hasattr(e, 'response') and e.response is not None:
                try:
                    error_json = e.response.json()
                    error_detail = error_json.get('detail', error_json.get('error', error_json.get('message', error_msg)))
                    # Check if the error is a Python error (like "name 'logger' is not defined")
                    if isinstance(error_detail, str) and ("name '" in error_detail and "' is not defined" in error_detail):
                        error_detail = f"Backend code error: {error_detail}. This is a bug in the Main Brain Backend service."
                except:
                    error_detail = e.response.text or error_msg
                    # Check if it's a Python error in the response text
                    if isinstance(error_detail, str) and ("name '" in error_detail and "' is not defined" in error_detail):
                        error_detail = f"Backend code error: {error_detail}. This is a bug in the Main Brain Backend service."
                raise HTTPException(
                    status_code=e.response.status_code,
                    detail=f"Main brain backend error: {error_detail}"
                )
            else:
                raise HTTPException(
                    status_code=502,
                    detail=f"Failed to connect to main brain backend at {brain_endpoint}: {error_msg}"
                )
        
    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/brain")
async def brain_endpoint(request: CognitiveFrictionRequest):
    """
    Main Brain Backend endpoint for cognitive friction analysis.
    
    This is the actual AI brain that performs the analysis.
    This endpoint receives requests from the /api/brain/cognitive-friction proxy.
    
    IMPORTANT: This endpoint should forward to the actual main Brain backend service.
    If MAIN_BRAIN_BACKEND_URL points to this same server (localhost), it will create a loop.
    Make sure MAIN_BRAIN_BACKEND_URL points to a DIFFERENT service that does the actual AI analysis.
    """
    # Check if we're trying to call ourselves (which would create a loop)
    current_url = os.getenv("BACKEND_BASE_URL") or "http://127.0.0.1:8000"
    main_brain_url = os.getenv("MAIN_BRAIN_BACKEND_URL") or os.getenv("BRAIN_BACKEND_URL")
    
    if main_brain_url and main_brain_url.startswith(("http://127.0.0.1:8000", "http://localhost:8000")):
        # We're trying to call ourselves - this is a loop!
        raise HTTPException(
            status_code=500,
            detail="Configuration error: MAIN_BRAIN_BACKEND_URL points to this same server, which would create an infinite loop. Please set MAIN_BRAIN_BACKEND_URL to a DIFFERENT service that performs the actual AI analysis, or implement the analysis logic directly in this endpoint."
        )
    
    # If MAIN_BRAIN_BACKEND_URL is set to a different service, forward to it
    if main_brain_url and main_brain_url != "https://your-main-brain-backend.com":
        brain_payload = {
            "raw_text": request.raw_text,
            "platform": request.platform,
            "goal": request.goal,
            "audience": request.audience,
            "language": request.language,
            "meta": request.meta or {},
            "business_type": request.business_type,
            "price_level": request.price_level,
            "decision_depth": request.decision_depth,
            "user_intent_stage": request.user_intent_stage,
        }
        
        if request.image:
            brain_payload["image"] = request.image
            brain_payload["image_type"] = request.image_type
        
        brain_endpoint = f"{main_brain_url.rstrip('/')}/api/brain"
        print(f"🔄 Forwarding to external main brain backend: {brain_endpoint}")
        
        try:
            response = requests.post(
                brain_endpoint,
                json=brain_payload,
                headers={"Content-Type": "application/json"},
                timeout=120
            )
            response.raise_for_status()
            result = response.json()
            print(f"✅ Received analysis from external main brain backend")
            return result
        except requests.exceptions.RequestException as e:
            error_msg = str(e)
            if hasattr(e, 'response') and e.response is not None:
                try:
                    error_detail = e.response.json().get('detail', error_msg)
                except:
                    error_detail = e.response.text or error_msg
                raise HTTPException(
                    status_code=e.response.status_code,
                    detail=f"External main brain backend error: {error_detail}"
                )
            else:
                raise HTTPException(
                    status_code=502,
                    detail=f"Failed to connect to external main brain backend at {brain_endpoint}: {error_msg}"
                )
    
    # If no external main brain backend is configured, return error
    raise HTTPException(
        status_code=500,
        detail="Main Brain Backend endpoint /api/brain requires MAIN_BRAIN_BACKEND_URL to point to the actual main Brain service that performs AI analysis. This endpoint does not perform analysis directly."
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



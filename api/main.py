"""
FastAPI Backend for AI Marketing Brain - DeepScan Endpoint
"""
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv
from pathlib import Path

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
    platform: str = "landing_page"
    goal: list[str] = []
    audience: str = "cold"
    language: str = "en"
    meta: dict = None
    business_type: str = None
    price_level: str = None
    decision_depth: str = None
    user_intent_stage: str = None
    image: str = None
    image_type: str = None


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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



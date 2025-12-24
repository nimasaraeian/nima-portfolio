"""
FastAPI Backend for AI Marketing Brain - DeepScan Endpoint
"""
from fastapi import FastAPI, HTTPException, Form, File, UploadFile, Request
from fastapi.responses import JSONResponse
from starlette.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from openai import OpenAI
from typing import Optional, List
from enum import Enum
import os
from dotenv import load_dotenv
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import json
import re
import base64
import asyncio
from pathlib import Path
import uuid
import sys
import io
import sqlite3
from datetime import datetime

# Fix encoding for Windows console to support emojis
if sys.platform == 'win32':
    try:
        # Try to set UTF-8 encoding for stdout/stderr
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        if hasattr(sys.stderr, 'reconfigure'):
            sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except (AttributeError, ValueError):
        # Fallback: wrap stdout/stderr with UTF-8 encoding
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

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

# ---------------------------------------------------------------------------
# SQLite storage for analysis + feedback
# ---------------------------------------------------------------------------

DB_PATH = os.getenv("BRAIN_FEEDBACK_DB_PATH") or str(project_root / "brain_feedback.db")


def get_db_connection() -> sqlite3.Connection:
    """Open a SQLite connection (caller must close)."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create tables for analysis + feedback if they don't exist."""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS analysis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            endpoint TEXT NOT NULL,
            created_at TEXT NOT NULL,
            request_payload TEXT,
            response_payload TEXT
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            analysis_id INTEGER NOT NULL,
            label TEXT NOT NULL,
            wrong_issues TEXT,
            notes TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY (analysis_id) REFERENCES analysis(id)
        )
        """
    )
    conn.commit()
    conn.close()


@app.on_event("startup")
async def on_startup() -> None:
    """Initialize database on startup."""
    init_db()

# Exception handler for Pydantic validation errors
@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    """Handle Pydantic validation errors"""
    print(f"❌ Validation error: {exc}")
    return JSONResponse(
        status_code=422,
        content={"detail": f"Validation error: {str(exc)}"}
    )

# Global exception handler for unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions"""
    # Don't handle HTTPException here - let FastAPI handle it
    if isinstance(exc, HTTPException):
        raise exc
    
    import traceback
    error_type = type(exc).__name__
    error_msg = str(exc) if str(exc) else "Unknown error"
    print(f"❌ Global exception handler caught: {error_type}: {error_msg}")
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {error_type}: {error_msg}"}
    )

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=False,  # Must be False when using allow_origins=["*"]
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


async def take_screenshot(url: str, viewport: dict, is_mobile: bool = False) -> Optional[str]:
    """
    Take an above-the-fold screenshot of a webpage using Playwright.
    
    IMPORTANT: Only captures the first viewport (above-the-fold), NOT full page.

    Args:
        url: The URL to screenshot
        viewport: Viewport size dict with width and height
        is_mobile: Whether this is a mobile screenshot (affects device settings)
        
    Returns:
        Base64-encoded screenshot image, or None if failed
    """
    try:
        try:
            from playwright.async_api import async_playwright
        except ImportError as import_err:
            print(f"❌ Playwright not installed. Run: pip install playwright && playwright install chromium")
            print(f"❌ Import error: {str(import_err)}")
            return None
        
        viewport_str = f"{viewport['width']}x{viewport['height']}"
        device_type = "mobile" if is_mobile else "desktop"
        print(f"📥 Taking {device_type} screenshot with viewport: {viewport_str} (above-the-fold only)")
        
        async with async_playwright() as p:
            # Launch browser
            try:
                browser = await p.chromium.launch(headless=True)
            except Exception as browser_err:
                error_msg = str(browser_err)
                if "Executable doesn't exist" in error_msg or "browser" in error_msg.lower():
                    print(f"❌ Chromium browser not installed. Run: playwright install chromium")
                    print(f"❌ Browser launch error: {error_msg}")
                else:
                    print(f"❌ Browser launch error: {error_msg}")
                raise
            
            # Configure context based on device type
            if is_mobile:
                context = await browser.new_context(
                    viewport=viewport,
                    device_scale_factor=2,
                    is_mobile=True,
                    has_touch=True,
                    user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
                )
            else:
                context = await browser.new_context(
                    viewport=viewport,
                    device_scale_factor=1,
                    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                )
            
            page = await context.new_page()
            
            # Disable animations (prefers-reduced-motion)
            await page.add_init_script("""
                const style = document.createElement('style');
                style.textContent = `
                    *, *::before, *::after {
                        animation-duration: 0s !important;
                        animation-delay: 0s !important;
                        transition-duration: 0s !important;
                        transition-delay: 0s !important;
                    }
                `;
                document.head.appendChild(style);
            """)
            
            # Navigate to URL
            print(f"📥 Navigating to {url}...")
            try:
                await page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as nav_err:
                error_msg = str(nav_err)
                print(f"❌ Navigation failed: {error_msg}")
                # Try with a shorter timeout as fallback
                try:
                    print(f"📥 Retrying with shorter timeout...")
                    await page.goto(url, wait_until="domcontentloaded", timeout=20000)
                except Exception as retry_err:
                    print(f"❌ Retry also failed: {str(retry_err)}")
                    raise nav_err
            
            # Additional wait for dynamic content (1200ms as per spec)
            await page.wait_for_timeout(1200)
            
            # Take screenshot - IMPORTANT: full_page=False (only first viewport)
            print(f"📥 Capturing above-the-fold screenshot (full_page=False)...")
            screenshot_bytes = await page.screenshot(full_page=False, type="png")
            print(f"📥 Screenshot captured: {len(screenshot_bytes)} bytes")
            
            # Convert to base64
            screenshot_base64 = base64.b64encode(screenshot_bytes).decode('utf-8')
            
            await browser.close()
            
            result = f"data:image/png;base64,{screenshot_base64}"
            print(f"✅ {device_type.capitalize()} screenshot created successfully (above-the-fold only, {len(result)} chars)")
            return result
    except Exception as e:
        device_type = "mobile" if is_mobile else "desktop"
        error_msg = str(e)
        print(f"⚠️ Failed to take {device_type} screenshot with viewport {viewport}: {error_msg}")
        import traceback
        traceback.print_exc()
        
        # Log specific error types for better debugging
        if "timeout" in error_msg.lower():
            print(f"⚠️ Timeout error - URL might be slow or unreachable")
        elif "net::" in error_msg or "navigation" in error_msg.lower():
            print(f"⚠️ Navigation error - URL might be invalid or blocked")
        elif "executable" in error_msg.lower() or "browser" in error_msg.lower():
            print(f"⚠️ Browser executable error - Run: playwright install chromium")
        
        return None


async def take_screenshots(url: str) -> dict:
    """
    Take both desktop and mobile above-the-fold screenshots of a webpage.
    
    SPEC:
    - Desktop: 1440x900 viewport, fullPage=False, wait 1200ms, disable animations
    - Mobile: 390x844 viewport, deviceScaleFactor=2, isMobile=True, fullPage=False, wait 1200ms
    
    Args:
        url: The URL to screenshot
        
    Returns:
        Dict with 'desktop' and 'mobile' screenshot URLs (above-the-fold only), or empty dict if failed
    """
    screenshots = {}
    errors = {}
    
    # Desktop screenshot (1440x900 - above-the-fold only)
    # Try with full size first, then fallback to smaller if it fails
    desktop_viewports = [
        {"width": 1440, "height": 900, "name": "1440x900"},
        {"width": 1280, "height": 720, "name": "1280x720"},  # Fallback
    ]
    
    desktop_success = False
    for viewport_config in desktop_viewports:
        if desktop_success:
            break
            
        viewport = {"width": viewport_config["width"], "height": viewport_config["height"]}
        try:
            print(f"📥 Taking desktop screenshot ({viewport_config['name']}, above-the-fold only)...")
            desktop_screenshot = await take_screenshot(url, viewport, is_mobile=False)
            if desktop_screenshot:
                screenshots["desktop"] = desktop_screenshot
                print(f"✅ Desktop screenshot taken at {viewport_config['name']} (length: {len(desktop_screenshot)} chars)")
                desktop_success = True
            else:
                error_msg = f"Desktop screenshot at {viewport_config['name']} returned None"
                print(f"⚠️ {error_msg}")
                if "desktop" not in errors:
                    errors["desktop"] = error_msg
        except Exception as e:
            error_msg = f"Desktop screenshot at {viewport_config['name']} failed: {str(e)}"
            print(f"⚠️ {error_msg}")
            if "desktop" not in errors:
                errors["desktop"] = error_msg
            import traceback
            traceback.print_exc()
    
    if not desktop_success:
        print(f"⚠️ All desktop screenshot attempts failed")
    
    # Mobile screenshot (390x844 - iPhone 13/14 style, above-the-fold only)
    try:
        print(f"📥 Taking mobile screenshot (390x844, above-the-fold only)...")
        mobile_screenshot = await take_screenshot(url, {"width": 390, "height": 844}, is_mobile=True)
        if mobile_screenshot:
            screenshots["mobile"] = mobile_screenshot
            print(f"✅ Mobile screenshot taken (length: {len(mobile_screenshot)} chars)")
        else:
            error_msg = "Mobile screenshot returned None - check logs above for details"
            print(f"⚠️ {error_msg}")
            errors["mobile"] = error_msg
    except Exception as e:
        error_msg = f"Mobile screenshot exception: {str(e)}"
        print(f"⚠️ {error_msg}")
        errors["mobile"] = error_msg
        import traceback
        traceback.print_exc()
    
    print(f"📥 Final screenshots dict keys: {list(screenshots.keys())}")
    if errors:
        print(f"⚠️ Screenshot errors: {errors}")
    
    # Store errors in screenshots dict for debugging (optional)
    if errors:
        screenshots["_errors"] = errors
    
    return screenshots


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

@app.get("/health/screenshot")
async def health_screenshot():
    """Test screenshot service health"""
    try:
        # Test if Playwright is available
        try:
            from playwright.async_api import async_playwright
        except ImportError:
            return JSONResponse(
                status_code=503,
                content={
                    "status": "unhealthy",
                    "error": "Playwright not installed",
                    "solution": "Run: pip install playwright && playwright install chromium"
                }
            )
        
        # Test if we can launch browser
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                browser.close()
        except Exception as e:
            error_msg = str(e)
            if "Executable doesn't exist" in error_msg or "browser" in error_msg.lower():
                return JSONResponse(
                    status_code=503,
                    content={
                        "status": "unhealthy",
                        "error": "Chromium browser not installed",
                        "solution": "Run: playwright install chromium"
                    }
                )
            else:
                return JSONResponse(
                    status_code=503,
                    content={
                        "status": "unhealthy",
                        "error": f"Browser launch failed: {error_msg}"
                    }
                )
        
        return {
            "status": "healthy",
            "screenshot_service": "ready",
            "playwright": "installed",
            "chromium": "installed"
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error": str(e)
            }
        )


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


@app.api_route("/analyze-url", methods=["OPTIONS", "POST"])
async def analyze_url(request: Request):
    """
    Analyze URL endpoint for Decision Brain Dashboard.
    
    Handles both OPTIONS (for CORS preflight) and POST requests.
    
    Accepts JSON payload with:
    - url: Optional URL to scrape
    - raw_text: Optional text content
    - image: Optional base64-encoded image
    - image_type: Optional image MIME type
    
    If URL is provided, scrapes it and uses the content for analysis.
    Forwards the request to the main brain backend for analysis.
    """
    # Handle OPTIONS preflight request
    if request.method == "OPTIONS":
        from fastapi.responses import Response
        return Response(
            status_code=200,
            headers={
                "Access-Control-Allow-Origin": "http://localhost:3001",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "3600",
            }
        )
    
    try:
        # Parse JSON request body (only for POST requests)
        body = await request.json()
        url = body.get("url")
        raw_text = body.get("raw_text", "")
        image_base64 = body.get("image")
        image_type = body.get("image_type")
        
        # If URL is provided, scrape it
        if url:
            try:
                scraped_text = scrape_url(url)
                # Combine with raw_text if provided
                if raw_text:
                    raw_text = f"{raw_text}\n\n{scraped_text}"
                else:
                    raw_text = scraped_text
            except Exception as e:
                raise HTTPException(
                    status_code=400,
                    detail=f"Failed to scrape URL: {str(e)}"
                )
        
        # Validate that we have content
        if not raw_text and not image_base64:
            raise HTTPException(
                status_code=400,
                detail="Either URL, raw_text, or image must be provided for analysis."
            )
        
        # Get the main Brain backend URL from environment
        main_brain_url = os.getenv("MAIN_BRAIN_BACKEND_URL") or os.getenv("BRAIN_BACKEND_URL")
        
        if not main_brain_url or main_brain_url == "https://your-main-brain-backend.com":
            raise HTTPException(
                status_code=500,
                detail="Main brain backend URL not configured. Please set MAIN_BRAIN_BACKEND_URL or BRAIN_BACKEND_URL environment variable."
            )
        
        # Prepare payload for main brain backend
        brain_payload = {
            "raw_text": raw_text,
            "platform": "landing_page",
            "goal": [],
            "audience": "cold",
            "language": "en",
            "meta": {},
        }
        
        if image_base64:
            brain_payload["image"] = image_base64
            if image_type:
                brain_payload["image_type"] = image_type
        
        # Forward to main brain backend
        brain_endpoint = f"{main_brain_url.rstrip('/')}/api/brain"
        print(f"🔄 Forwarding to main brain backend: {brain_endpoint}")
        print(f"📦 Payload: raw_text length={len(raw_text) if raw_text else 0}, has_image={bool(image_base64)}")
        
        try:
            response = requests.post(
                brain_endpoint,
                json=brain_payload,
                headers={"Content-Type": "application/json"},
                timeout=120
            )
            response.raise_for_status()
            result = response.json()
            print(f"✅ Received analysis from main brain backend")
            return result
        except requests.exceptions.RequestException as e:
            error_msg = str(e)
            if hasattr(e, 'response') and e.response is not None:
                try:
                    error_json = e.response.json()
                    error_detail = error_json.get('detail', error_json.get('error', error_json.get('message', error_msg)))
                except:
                    error_detail = e.response.text or error_msg
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
        raise
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

            # Store analysis payload + response and attach analysis_id
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute(
                    """
                    INSERT INTO analysis (endpoint, created_at, request_payload, response_payload)
                    VALUES (?, ?, ?, ?)
                    """,
                    (
                        "/api/brain",
                        datetime.utcnow().isoformat(),
                        json.dumps(request.model_dump(), ensure_ascii=False),
                        json.dumps(result, ensure_ascii=False),
                    ),
                )
                analysis_id = cur.lastrowid
                conn.commit()
                conn.close()
                # Attach analysis_id to response so frontend can send feedback later
                if isinstance(result, dict):
                    result["analysis_id"] = analysis_id
            except Exception as db_err:
                # Don't fail main request if logging fails
                print(f"⚠️ Failed to persist analysis row: {db_err}")

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


# Request model for url-human endpoint
class UrlHumanRequest(BaseModel):
    url: str
    goal: str = "leads"
    locale: str = "fa"
    raw_text: Optional[str] = None
    image: Optional[str] = None
    image_type: Optional[str] = None


# System prompt for human-readable report
HUMAN_REPORT_SYSTEM_PROMPT = """You are a conversion optimization consultant. Your task is to analyze landing pages and provide human-readable, actionable feedback.

مثل یک مشاور واقعی بنویس. کوتاه، عملی، و با اشاره به محل. از جملات کلی پرهیز کن.

Write in a conversational, practical tone. Be specific about what you see on the page. Avoid generic statements. Point to exact locations or elements when possible.

Your report should:
- Be written in Persian (Farsi) if locale is "fa", otherwise English
- Focus on conversion optimization for the goal specified (e.g., "leads")
- Be structured with clear sections
- Provide specific, actionable recommendations
- Avoid technical jargon, scores, or percentages
- Read like advice from a real consultant

Format your response as plain text, not JSON. Use natural paragraph breaks and section headers if needed."""


class FeedbackLabel(str, Enum):
    accurate = "accurate"
    partial = "partial"
    wrong = "wrong"


class FeedbackRequest(BaseModel):
    analysis_id: int
    label: FeedbackLabel
    wrong_issues: List[str] = []
    notes: str = ""


@app.post("/api/brain/feedback")
async def submit_feedback(payload: FeedbackRequest):
    """
    Store user feedback for an analysis.
    """
    # Validate wrong_issues usage
    if payload.label != FeedbackLabel.wrong and payload.wrong_issues:
        raise HTTPException(
            status_code=400,
            detail="wrong_issues must be empty unless label is 'wrong'",
        )

    conn = get_db_connection()
    cur = conn.cursor()

    # Ensure analysis_id exists
    cur.execute("SELECT id FROM analysis WHERE id = ?", (payload.analysis_id,))
    row = cur.fetchone()
    if not row:
        conn.close()
        raise HTTPException(
            status_code=404,
            detail=f"analysis_id {payload.analysis_id} not found",
        )

    cur.execute(
        """
        INSERT INTO feedback (analysis_id, label, wrong_issues, notes, created_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            payload.analysis_id,
            payload.label.value,
            json.dumps(payload.wrong_issues or [], ensure_ascii=False),
            payload.notes or "",
            datetime.utcnow().isoformat(),
        ),
    )
    conn.commit()
    conn.close()

    return {"status": "ok"}


@app.post("/api/analyze/url-human")
async def analyze_url_human(request: UrlHumanRequest):
    """
    Human-readable URL analysis endpoint.
    """
    import traceback
    
    try:
        print(f"📥 Received POST request to /api/analyze/url-human")
        print(f"📥 Request: {request}")
        
        url = request.url
        goal = request.goal or "leads"
        locale = request.locale or "fa"
        raw_text = request.raw_text or ""
        
        print(f"📥 Extracted: url={url}, goal={goal}, locale={locale}")
        
        if not url:
            raise HTTPException(status_code=400, detail="URL is required")
        
        # Scrape URL
        print(f"📥 Scraping URL: {url}")
        try:
            scraped_text = scrape_url(url)
            raw_text = scraped_text if not raw_text else f"{raw_text}\n\n{scraped_text}"
            print(f"📥 Scraped {len(raw_text)} characters")
        except Exception as e:
            error_msg = str(e) or "Unknown scraping error"
            print(f"❌ Failed to scrape URL: {error_msg}")
            traceback.print_exc()
            raise HTTPException(status_code=400, detail=f"Failed to scrape URL: {error_msg}")
        
        if not raw_text:
            raise HTTPException(status_code=400, detail="No content extracted from URL")
        
        # Take screenshots (optional, don't fail if it doesn't work)
        screenshots = {}
        try:
            print(f"📥 Taking screenshots of URL: {url}")
            screenshots = await take_screenshots(url)
            if screenshots:
                print(f"✅ Screenshots taken: {list(screenshots.keys())}")
                # Log screenshot data types and sizes
                for key, value in screenshots.items():
                    if key != "_errors":
                        print(f"📸 {key} screenshot: {len(value) if isinstance(value, str) else 'not a string'} chars, starts with: {value[:50] if isinstance(value, str) else type(value)}")
            else:
                print(f"⚠️ Screenshots failed, continuing without screenshots")
                print(f"⚠️ take_screenshots() returned empty dict or None")
        except Exception as e:
            print(f"⚠️ Screenshot error (non-fatal): {str(e)}")
            traceback.print_exc()
            # Continue without screenshots
        
        # Get OpenAI client
        print(f"📥 Getting OpenAI client...")
        try:
            client = get_openai_client()
            print(f"✅ OpenAI client created")
        except Exception as e:
            error_msg = str(e) or "Unknown OpenAI error"
            print(f"❌ Failed to get OpenAI client: {error_msg}")
            traceback.print_exc()
            raise HTTPException(status_code=500, detail=f"OpenAI client error: {error_msg}")
        
        # Truncate content to avoid token limit (gpt-4o-mini has 200k TPM limit)
        # Estimate: ~4 chars per token, so 4000 chars ≈ 1000 tokens
        # Keep it safe: use 3000 chars for content to leave room for system prompt and response
        max_content_chars = 3000
        truncated_text = raw_text[:max_content_chars]
        if len(raw_text) > max_content_chars:
            print(f"⚠️ Content truncated from {len(raw_text)} to {max_content_chars} characters to avoid token limit")
            truncated_text += "\n\n[... content truncated for token limit ...]"
        
        # Build prompt
        user_prompt = f"""Analyze this landing page for conversion optimization.

Goal: {goal}
Locale: {locale}

Page Content (first {max_content_chars} chars):
{truncated_text}

Provide a human-readable conversion optimization report. Write in {"Persian (Farsi)" if locale == "fa" else "English"}.

Focus on:
- What's working well
- What's blocking conversions
- Specific, actionable recommendations
- Where to make changes

Be practical and conversational. Avoid scores, percentages, or technical metrics."""
        
        # Estimate token count (rough: ~4 chars per token)
        estimated_tokens = len(user_prompt) // 4 + len(HUMAN_REPORT_SYSTEM_PROMPT) // 4
        print(f"📥 Estimated tokens: ~{estimated_tokens} (limit: 200,000 TPM for gpt-4o-mini)")
        
        # Call OpenAI
        print(f"📥 Calling OpenAI...")
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": HUMAN_REPORT_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
            )
            
            human_report = response.choices[0].message.content
            
            if not human_report:
                raise HTTPException(status_code=500, detail="Empty response from OpenAI")
            
            print(f"✅ Generated report ({len(human_report)} characters)")
            
            response_data = {
                "human_report": human_report,
                "analysis_json": {
                    "url": url,
                    "goal": goal,
                    "locale": locale
                }
            }
            
            # Add screenshots if available - STRICT STRUCTURE (MANDATORY)
            print(f"📥 Checking screenshots dict: {list(screenshots.keys()) if screenshots else 'empty'}")
            if screenshots:
                screenshots_response = {}
                
                # Desktop screenshot
                if "desktop" in screenshots:
                    screenshots_response["desktop"] = {
                        "aboveFold": screenshots["desktop"]
                    }
                    print(f"✅ Added desktop screenshot to response (length: {len(screenshots['desktop'])} chars)")
                else:
                    print(f"⚠️ Desktop screenshot missing!")
                
                # Mobile screenshot (MANDATORY)
                if "mobile" in screenshots:
                    screenshots_response["mobile"] = {
                        "aboveFold": screenshots["mobile"]
                    }
                    print(f"✅ Added mobile screenshot to response (length: {len(screenshots['mobile'])} chars)")
                else:
                    print(f"❌ Mobile screenshot MISSING - report will be incomplete!")
                
                if screenshots_response:
                    response_data["screenshots"] = screenshots_response
                    print(f"📥 Final screenshots structure: {list(screenshots_response.keys())}")
                    
                    # Backward compatibility: also add old format
                    if "desktop" in screenshots_response:
                        response_data["screenshot"] = {
                            "desktop": screenshots_response["desktop"]["aboveFold"],
                            "url": screenshots_response["desktop"]["aboveFold"]
                        }
                        if "mobile" in screenshots_response:
                            response_data["screenshot"]["mobile"] = screenshots_response["mobile"]["aboveFold"]
                else:
                    print(f"⚠️ No screenshot data to add (screenshots_response is empty)")
            else:
                print(f"⚠️ Screenshots dict is empty or None")

            # Persist analysis and attach analysis_id for feedback loop
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute(
                    """
                    INSERT INTO analysis (endpoint, created_at, request_payload, response_payload)
                    VALUES (?, ?, ?, ?)
                    """,
                    (
                        "/api/analyze/url-human",
                        datetime.utcnow().isoformat(),
                        json.dumps(request.model_dump(), ensure_ascii=False),
                        json.dumps(response_data, ensure_ascii=False),
                    ),
                )
                analysis_id = cur.lastrowid
                conn.commit()
                conn.close()
                response_data["analysis_id"] = analysis_id
                print(f"✅ Stored analysis with id={analysis_id}")
            except Exception as db_err:
                print(f"⚠️ Failed to persist url-human analysis: {db_err}")
            
            return response_data
        except Exception as e:
            error_msg = str(e) or "Unknown OpenAI API error"
            print(f"❌ OpenAI API error: {error_msg}")
            traceback.print_exc()
            
            # Handle rate limit errors specifically
            if "429" in str(e) or "rate limit" in str(e).lower() or "TPM" in str(e):
                raise HTTPException(
                    status_code=429,
                    detail="OpenAI rate limit exceeded. The page content is too large. Please try a smaller page or wait a moment and try again."
                )
            
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {error_msg}")
            
    except HTTPException:
        raise
    except Exception as e:
        error_type = type(e).__name__
        error_msg = str(e) or "Unknown error"
        print(f"❌ Unexpected error: {error_type}: {error_msg}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {error_type}: {error_msg}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



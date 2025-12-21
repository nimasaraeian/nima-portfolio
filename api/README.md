# AI Marketing Brain API

FastAPI backend for AI Marketing Brain modules.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Playwright browsers (for screenshot functionality):**
   ```bash
   # Install Playwright package (if not already installed)
   pip install playwright
   
   # Install Chromium browser (REQUIRED for screenshots)
   playwright install chromium
   
   # Verify installation
   python -c "from playwright.sync_api import sync_playwright; p = sync_playwright().start(); p.stop(); print('✅ Playwright is working!')"
   ```
   
   **Important:** If you see "Desktop preview not available – screenshot service failed", it usually means:
   - Playwright is not installed: `pip install playwright`
   - Chromium browser is not installed: `playwright install chromium`
   - Check backend logs for specific error messages

2. **Set environment variables:**
   
   Create `.env.local` in the project root:
   ```env
   OPENAI_API_KEY=sk-proj-...
   ```

3. **Run the server:**
   ```bash
   uvicorn api.main:app --reload
   ```

   Server will run on: `http://127.0.0.1:8000`

## Endpoints

### POST /brain/deepscan

Behavioral DeepScan analysis.

**Request:**
```json
{
  "industry": "Beauty Clinic",
  "city": "Istanbul",
  "audience": "Tourists and locals aged 25-45",
  "analysis": "Analyze the behavioral patterns and motivations"
}
```

**Response:**
```json
{
  "summary": "Brief summary...",
  "segments": ["Segment 1", "Segment 2", ...],
  "barriers": ["Barrier 1", "Barrier 2", ...],
  "triggers": ["Trigger 1", "Trigger 2", ...],
  "recommendations": ["Recommendation 1", "Recommendation 2", ...]
}
```

### GET /health

Health check endpoint.

### GET /

Root endpoint with API info.

## Development

```bash
# Run with auto-reload
uvicorn api.main:app --reload

# Run on specific host/port
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

## Production

```bash
# Run with production settings
uvicorn api.main:app --host 0.0.0.0 --port 8000 --workers 4
```



# AI Marketing Brain API

FastAPI backend for AI Marketing Brain modules.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

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



# Backend: Serve debug_shots as Static Files

## Task: Mount static route for api/debug_shots

**Where:** `main.py` or wherever FastAPI app is created

## Implementation

Add the following code to your FastAPI application:

```python
from fastapi.staticfiles import StaticFiles
import os

# Get debug directory from environment or use default
DEBUG_DIR = os.getenv("SCREENSHOT_DEBUG_DIR", "api/debug_shots")

# Create directory if it doesn't exist
os.makedirs(DEBUG_DIR, exist_ok=True)

# Mount static files route
app.mount("/api/debug_shots", StaticFiles(directory=DEBUG_DIR), name="debug_shots")
```

## Path Consistency

Ensure returned paths are consistent with the mount:

- If mount is `/api/debug_shots` then return paths like:
  - `"api/debug_shots/desktop_x.png"` OR 
  - `"/api/debug_shots/desktop_x.png"`

**Preferred:** Return `"/api/debug_shots/desktop_x.png"` (with leading slash)

## Deliverable

Opening `http://127.0.0.1:8000/api/debug_shots/<file>.png` loads the image in browser.

## Example Response Format

When returning screenshot data from your API, use this format:

```python
{
    "screenshots": {
        "desktop": {
            "status": "ok",
            "path": "/api/debug_shots/desktop_20251220_214245.png",
            "viewport": [1365, 768],
            "mode": "above_fold"
        },
        "mobile": {
            "status": "ok",
            "path": "/api/debug_shots/mobile_20251220_214245.png",
            "viewport": [375, 667],
            "mode": "above_fold"
        }
    }
}
```

## Notes

- The frontend `screenshotSrc` helper will automatically convert relative paths to absolute URLs
- Paths starting with `/` will be appended to the base URL correctly
- Paths without `/` will have it added automatically























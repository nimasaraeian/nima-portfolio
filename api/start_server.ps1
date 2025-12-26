Write-Host "Starting FastAPI Backend Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will run on: http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000














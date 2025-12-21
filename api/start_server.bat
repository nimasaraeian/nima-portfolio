@echo off
echo Starting FastAPI Backend Server...
echo.
echo Server will run on: http://127.0.0.1:8000
echo Press Ctrl+C to stop the server
echo.
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000




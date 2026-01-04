# راهنمای بررسی و راه‌اندازی سرور FastAPI

## بررسی اینکه سرور در حال اجرا است یا نه:

### روش 1: بررسی در مرورگر
1. مرورگر را باز کنید
2. به این آدرس بروید: `http://127.0.0.1:8000/health`
3. اگر پیام `{"status":"healthy"}` را دیدید، سرور در حال اجرا است
4. اگر خطا گرفتید، سرور در حال اجرا نیست

### روش 2: بررسی در Terminal
در PowerShell یا Command Prompt:
```powershell
curl http://127.0.0.1:8000/health
```

## راه‌اندازی سرور FastAPI:

### اگر سرور در حال اجرا نیست:

1. **Terminal جدید باز کنید**

2. **به پوشه پروژه بروید:**
```bash
cd C:\Users\USER\Documents\GitHub\www.nimasaraeian.com
```

3. **سرور را راه‌اندازی کنید:**
```bash
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

یا اگر از Python مستقیم استفاده می‌کنید:
```bash
python -m uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

4. **باید این پیام‌ها را ببینید:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### اگر سرور در حال اجرا است اما خطا می‌گیرید:

1. **سرور را متوقف کنید** (Ctrl+C در ترمینال)
2. **دوباره راه‌اندازی کنید** تا تغییرات جدید اعمال شود

## بررسی CORS:

اگر سرور در حال اجرا است اما هنوز خطای CORS می‌گیرید:

1. مطمئن شوید که در `api/main.py` این تنظیمات وجود دارد:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. سرور را ری‌استارت کنید

## عیب‌یابی:

- اگر خطای "Failed to fetch" می‌گیرید → سرور در حال اجرا نیست یا قابل دسترسی نیست
- اگر خطای CORS می‌گیرید → سرور را ری‌استارت کنید
- اگر خطای 404 می‌گیرید → endpoint `/analyze-url` موجود نیست (باید در `api/main.py` باشد)































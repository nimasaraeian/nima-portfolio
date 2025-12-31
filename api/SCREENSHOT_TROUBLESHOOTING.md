# Screenshot Service Troubleshooting Guide

اگر پیام "Desktop preview not available – screenshot service failed" را می‌بینید، این راهنما به شما کمک می‌کند مشکل را حل کنید.

## مراحل عیب‌یابی

### 1. بررسی نصب Playwright

```bash
# بررسی نصب Playwright
python api/check_playwright.py
```

اگر خطا دیدید:
```bash
# نصب Playwright
pip install playwright

# نصب مرورگر Chromium
playwright install chromium

# دوباره تست کنید
python api/check_playwright.py
```

### 2. بررسی وضعیت Backend Server

مطمئن شوید که backend server در حال اجرا است:

```bash
# در پوشه پروژه
cd api
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

یا از root directory:
```bash
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

### 3. تست Health Check

در مرورگر یا با curl:
```bash
# Health check عمومی
curl http://127.0.0.1:8000/health

# Health check برای screenshot service
curl http://127.0.0.1:8000/health/screenshot
```

اگر `/health/screenshot` خطا داد، مشکل در نصب Playwright یا Chromium است.

### 4. تست مستقیم Screenshot Service

```bash
# تست screenshot service
python api/test_screenshot.py
```

این اسکریپت مستقیماً screenshot service را تست می‌کند و خطاهای دقیق را نشان می‌دهد.

### 5. بررسی لاگ‌های Backend

هنگام اجرای درخواست، لاگ‌های backend را بررسی کنید. خطاهای احتمالی:

#### خطای "Playwright not installed"
```bash
pip install playwright
playwright install chromium
```

#### خطای "Chromium browser not installed"
```bash
playwright install chromium
```

#### خطای "Navigation timeout"
- URL ممکن است کند باشد یا در دسترس نباشد
- Timeout در کد 45 ثانیه است
- می‌توانید timeout را در `api/main.py` افزایش دهید

#### خطای "Network error" یا "Connection refused"
- Backend server در حال اجرا نیست
- Port 8000 در حال استفاده است
- Firewall یا antivirus مانع اتصال می‌شود

### 6. بررسی Environment Variables

مطمئن شوید که `.env.local` یا environment variables درست تنظیم شده‌اند:

```env
OPENAI_API_KEY=sk-proj-...
```

### 7. بررسی CORS

اگر از frontend به backend متصل می‌شوید، مطمئن شوید که CORS درست تنظیم شده است. در `api/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # در production محدود کنید
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 8. تست Endpoint مستقیماً

```bash
# تست endpoint url-human
curl -X POST http://127.0.0.1:8000/api/analyze/url-human \
  -H "Content-Type: application/json" \
  -d '{"url": "https://stripe.com/pricing", "goal": "leads", "locale": "en"}'
```

## مشکلات رایج و راه حل‌ها

### مشکل: "Executable doesn't exist"
**راه حل:**
```bash
playwright install chromium
```

### مشکل: "Timeout waiting for page"
**راه حل:**
- URL را بررسی کنید که در دسترس است
- Timeout را در کد افزایش دهید
- از URL دیگری تست کنید

### مشکل: "Cannot connect to API server"
**راه حل:**
- مطمئن شوید backend server در حال اجرا است
- Port 8000 را بررسی کنید
- `NEXT_PUBLIC_API_BASE_URL` را در frontend بررسی کنید

### مشکل: Screenshot None برمی‌گرداند
**راه حل:**
- لاگ‌های backend را بررسی کنید
- `python api/test_screenshot.py` را اجرا کنید
- بررسی کنید که Playwright و Chromium نصب هستند

## تست نهایی

بعد از انجام مراحل بالا:

1. Backend server را راه‌اندازی کنید
2. Health check را تست کنید: `curl http://127.0.0.1:8000/health/screenshot`
3. Screenshot را تست کنید: `python api/test_screenshot.py`
4. از frontend یک URL را تست کنید

اگر هنوز مشکل دارید، لاگ‌های backend را بررسی کنید و خطای دقیق را پیدا کنید.
























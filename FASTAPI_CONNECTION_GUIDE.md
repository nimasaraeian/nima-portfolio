# راهنمای اتصال به FastAPI

## وضعیت فعلی

### 1. Next.js Frontend → FastAPI Backend
- **مسیر:** `app/api/brain/decision-diagnosis/route.ts`
- **Endpoint:** `/api/brain/cognitive-friction`
- **URL پیش‌فرض:** `http://127.0.0.1:8000` (development)
- **متغیرهای محیطی:**
  - `BACKEND_BASE_URL` (اولویت اول)
  - `NEXT_PUBLIC_BACKEND_URL`
  - `NEXT_PUBLIC_BRAIN_API_URL`
  - `NEXT_PUBLIC_API_BASE_URL`
  - `BRAIN_API_BASE_URL`

### 2. FastAPI Backend → Main Brain Backend
- **مسیر:** `api/main.py` → `@app.post("/api/brain/cognitive-friction")`
- **Endpoint:** `/cognitive-friction/analyze`
- **متغیرهای محیطی:**
  - `MAIN_BRAIN_BACKEND_URL` (اولویت اول)
  - `BRAIN_BACKEND_URL`

## تنظیمات فعلی (.env.local)

```
BACKEND_BASE_URL=https://nima-ai-marketing-production.up.railway.app
MAIN_BRAIN_BACKEND_URL=https://your-main-brain-backend.com
```

## نحوه اتصال

### Development (محلی)
1. **راه‌اندازی FastAPI:**
   ```bash
   cd api
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **تنظیم `.env.local`:**
   ```env
   BACKEND_BASE_URL=http://127.0.0.1:8000
   MAIN_BRAIN_BACKEND_URL=https://your-actual-main-brain-backend.com
   ```

### Production (Vercel)
1. **تنظیم Environment Variables در Vercel:**
   - `BACKEND_BASE_URL` = `https://nima-ai-marketing-production.up.railway.app`
   - `MAIN_BRAIN_BACKEND_URL` = URL اصلی Main Brain Backend

2. **تأیید اتصال:**
   - Next.js → FastAPI: ✅
   - FastAPI → Main Brain: ⚠️ نیاز به تنظیم `MAIN_BRAIN_BACKEND_URL`

## بررسی اتصال

### تست FastAPI (محلی)
```bash
curl http://127.0.0.1:8000/health
```

### تست از Next.js
```bash
curl -X POST http://localhost:3000/api/brain/decision-diagnosis \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## نکات مهم

1. **FastAPI باید در حال اجرا باشد** قبل از استفاده از Next.js API routes
2. **`MAIN_BRAIN_BACKEND_URL` باید تنظیم شود** در FastAPI برای ارسال درخواست به Main Brain
3. **CORS** در FastAPI برای همه origins فعال است (در production محدود کنید)



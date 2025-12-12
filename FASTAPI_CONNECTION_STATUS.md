# وضعیت اتصال FastAPI

## ✅ تنظیمات فعلی

### 1. Next.js Frontend → FastAPI Backend
- **مسیر:** `app/api/brain/decision-diagnosis/route.ts`
- **Endpoint:** `/api/brain/cognitive-friction`
- **Development URL:** `http://127.0.0.1:8000`
- **Production URL:** `https://nima-ai-marketing-production.up.railway.app`
- **متغیر محیطی:** `BACKEND_BASE_URL`

### 2. FastAPI Backend → Main Brain Backend
- **مسیر:** `api/main.py`
- **Endpoint:** `/api/brain/cognitive-friction`
- **Forwarding:** `/cognitive-friction/analyze`
- **متغیر محیطی:** `MAIN_BRAIN_BACKEND_URL` یا `BRAIN_BACKEND_URL`

## 📋 فایل `.env.local` فعلی

```
BACKEND_BASE_URL=https://nima-ai-marketing-production.up.railway.app
MAIN_BRAIN_BACKEND_URL=https://your-main-brain-backend.com  ⚠️ نیاز به تنظیم
```

## 🔧 مراحل راه‌اندازی

### Development (محلی)

1. **راه‌اندازی FastAPI:**
   ```bash
   cd api
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **تنظیم `.env.local` برای Development:**
   ```env
   BACKEND_BASE_URL=http://127.0.0.1:8000
   MAIN_BRAIN_BACKEND_URL=<URL_اصلی_مغز_اصلی>
   ```

### Production (Vercel)

1. **تنظیم Environment Variables در Vercel Dashboard:**
   - `BACKEND_BASE_URL` = `https://nima-ai-marketing-production.up.railway.app`
   - `MAIN_BRAIN_BACKEND_URL` = URL اصلی Main Brain Backend

2. **تنظیم Environment Variables در Railway (FastAPI):**
   - `MAIN_BRAIN_BACKEND_URL` = URL اصلی Main Brain Backend
   - `OPENAI_API_KEY` = کلید OpenAI

## ✅ تست اتصال

### تست FastAPI Health Check
```bash
curl http://127.0.0.1:8000/health
```

### تست از Next.js
```bash
curl -X POST http://localhost:3000/api/brain/decision-diagnosis \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## ⚠️ نکات مهم

1. **FastAPI باید در حال اجرا باشد** قبل از استفاده از Next.js API routes
2. **`MAIN_BRAIN_BACKEND_URL` باید تنظیم شود** در FastAPI برای ارسال درخواست به Main Brain
3. **CORS** در FastAPI برای همه origins فعال است (در production محدود کنید)
4. **Development Mode:** اگر `BACKEND_BASE_URL` شامل `railway.app` باشد، Next.js به صورت خودکار از `localhost:8000` استفاده می‌کند



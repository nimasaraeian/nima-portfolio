# راهنمای رفع مشکل "Failed to fetch"

## مشکل:
خطای "Failed to fetch" به دلایل زیر رخ می‌دهد:

1. ✅ سرور FastAPI در حال اجرا است (پروسه 21764)
2. ❌ اما نسخه قدیمی کد در حال اجراست (بدون تغییرات جدید CORS و endpoint)
3. ⚠️ سرور نیاز به ری‌استارت دارد

## راه حل:

### مرحله 1: متوقف کردن سرور قدیمی

در PowerShell این دستور را اجرا کنید:

```powershell
Stop-Process -Id 21764 -Force
```

یا اگر می‌دانید ترمینال سرور کجاست، در آن ترمینال `Ctrl+C` بزنید.

### مرحله 2: راه‌اندازی مجدد سرور با کد جدید

```powershell
cd C:\Users\USER\Documents\GitHub\www.nimasaraeian.com
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

### مرحله 3: بررسی موفقیت

بعد از راه‌اندازی، این پیام‌ها را باید ببینید:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Started reloader process
INFO:     Application startup complete.
```

### مرحله 4: تست در مرورگر

1. به `http://localhost:3001/ai-marketing/decision-brain` بروید
2. یک URL وارد کنید (مثلاً `https://example.com`)
3. روی "Run" کلیک کنید

## اگر هنوز خطا می‌گیرید:

### بررسی اینکه MAIN_BRAIN_BACKEND_URL تنظیم شده:

Endpoint `/analyze-url` نیاز به `MAIN_BRAIN_BACKEND_URL` دارد. اگر این متغیر تنظیم نشده باشد، endpoint خطا می‌دهد.

برای تنظیم:
1. فایل `.env.local` در root پروژه ایجاد کنید (اگر وجود ندارد)
2. این خط را اضافه کنید:
```
MAIN_BRAIN_BACKEND_URL=http://your-main-brain-backend-url.com
```

یا اگر backend اصلی ندارید، باید endpoint را تغییر دهیم تا بدون آن کار کند.

## تغییرات اعمال شده:

✅ CORS برای `http://localhost:3001` فعال شده
✅ Endpoint `/analyze-url` اضافه شده
✅ Error handling بهبود یافته
✅ OPTIONS handler حذف شد (CORS middleware خودش handle می‌کند)




























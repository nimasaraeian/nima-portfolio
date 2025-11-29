# راهنمای تنظیمات AI Marketing Module

این راهنما نحوه استفاده از ماژول‌های تعاملی AI Marketing را توضیح می‌دهد.

## ✅ فایل‌های ایجاد شده

- `app/components/AIMarketingModule.tsx` - کامپوننت اصلی فرم و نتایج
- `app/components/ModuleInteractivity.tsx` - کامپوننت کارت ماژول با قابلیت کلیک
- `app/ai-marketing/page.tsx` - به‌روزرسانی شده با ModuleInteractivity

## 🔧 تنظیمات Environment Variables

### برای Development (Local):

در فایل `.env.local` (یا `.env`):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/brain
```

### برای Production:

```env
NEXT_PUBLIC_API_URL=https://api.nimasaraeian.com/api/brain
```

یا اگر backend در همان domain است:

```env
NEXT_PUBLIC_API_URL=https://nimasaraeian.com/api/brain
```

## 🚀 نحوه استفاده

1. **مطمئن شوید Backend API در حال اجرا است:**
   ```bash
   cd C:\Users\USER\Desktop\tensorflow-nima
   python -m uvicorn api.main:app --reload
   ```

2. **Environment Variable را تنظیم کنید:**
   - فایل `.env.local` را در root پروژه ایجاد کنید
   - `NEXT_PUBLIC_API_URL` را اضافه کنید

3. **Next.js را اجرا کنید:**
   ```bash
   npm run dev
   ```

4. **صفحه را باز کنید:**
   - به `http://localhost:3000/ai-marketing` بروید
   - روی هر ماژول کلیک کنید
   - فرم را پر کنید
   - نتایج را مشاهده کنید

## ✨ ویژگی‌ها

- ✅ **5 ماژول تعاملی:**
  - Behavioral DeepScan
  - Market & Trend Intelligence
  - AI Content Engine
  - Conversion & Funnel Architecture
  - AI Automation System

- ✅ **UI/UX:**
  - Modal forms با طراحی مطابق سایت
  - Loading states
  - Error handling
  - Results display با Quality Score
  - Download results به Markdown

- ✅ **API Integration:**
  - ارتباط با `/api/brain` endpoint
  - نمایش Quality Score
  - نمایش Quality Checks

## 🔍 Troubleshooting

### مشکل: API connection failed

**راه‌حل:**
1. مطمئن شوید backend در حال اجرا است
2. `NEXT_PUBLIC_API_URL` را بررسی کنید
3. CORS را در backend بررسی کنید

### مشکل: Module باز نمی‌شود

**راه‌حل:**
1. Console مرورگر را بررسی کنید (F12)
2. مطمئن شوید `ModuleInteractivity` import شده
3. مطمئن شوید `'use client'` directive وجود دارد

### مشکل: نتایج نمایش داده نمی‌شود

**راه‌حل:**
1. Network tab را بررسی کنید
2. Response API را چک کنید
3. Console errors را بررسی کنید

## 📝 نکات

- همه کامپوننت‌ها `'use client'` دارند (Client Components)
- از Tailwind CSS استفاده می‌شود (مطابق با پروژه)
- طراحی مطابق با style موجود سایت است
- Responsive و mobile-friendly است

## 🎯 مراحل بعدی (اختیاری)

- [ ] اضافه کردن Analytics tracking
- [ ] اضافه کردن Error logging
- [ ] اضافه کردن Success notifications
- [ ] اضافه کردن History/Saved results
- [ ] اضافه کردن Export به PDF

---

**موفق باشید! 🚀**




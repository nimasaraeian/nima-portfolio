# Daily Content Generation Setup Guide

## مشکل: تولید خودکار مقالات روزانه کار نمی‌کند

### مشکلات شناسایی شده:

1. ✅ **API Endpoint مفقود** - حل شد
2. ❌ **فایل .env.local وجود ندارد** - نیاز به ایجاد دستی
3. ✅ **تنظیمات Vercel Cron** - به‌روزرسانی شد

## راه‌حل:

### 1. ایجاد فایل .env.local

در ریشه پروژه فایل `.env.local` ایجاد کنید و محتوای زیر را اضافه کنید:

```env
# OpenAI API Key - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=your_actual_openai_api_key_here

# Content Generation Settings
CONTENT_GENERATION_ENABLED=true
DAILY_ARTICLE_COUNT=1
GENERATION_TIME=08:00
TIMEZONE=Europe/Istanbul
```

### 2. دریافت OpenAI API Key

1. به [OpenAI Platform](https://platform.openai.com/api-keys) بروید
2. وارد حساب کاربری خود شوید
3. API Key جدید ایجاد کنید
4. آن را در فایل `.env.local` قرار دهید

### 3. تست سیستم

```bash
# تست تولید محتوا
npm run test-daily

# یا تست دستی
npm run content-manual
```

### 4. تنظیمات Vercel

در Vercel Dashboard:

1. به Project Settings > Environment Variables بروید
2. متغیرهای زیر را اضافه کنید:
   - `OPENAI_API_KEY` = your_actual_api_key
   - `CONTENT_GENERATION_ENABLED` = true
   - `DAILY_ARTICLE_COUNT` = 1

### 5. بررسی Cron Job

Cron job در Vercel باید هر روز ساعت 8 صبح (UTC) اجرا شود:
- Schedule: `0 8 * * *`
- Endpoint: `/api/generate-daily-content`

### 6. مانیتورینگ

برای بررسی وضعیت:
1. Vercel Dashboard > Functions
2. بررسی logs مربوط به `/api/generate-daily-content`
3. بررسی فایل‌های تولید شده در `app/articles/`

## فایل‌های ایجاد/به‌روزرسانی شده:

- ✅ `app/api/generate-daily-content/route.ts` - API endpoint جدید
- ✅ `vercel.json` - تنظیمات cron job
- ✅ `scripts/test-daily-content.js` - اسکریپت تست
- ✅ `package.json` - اسکریپت تست اضافه شد

## نکات مهم:

1. **API Key امنیت**: هرگز API key را در کد قرار ندهید
2. **محدودیت OpenAI**: مطمئن شوید که credit کافی دارید
3. **Timezone**: Cron job بر اساس UTC کار می‌کند
4. **Error Handling**: خطاها در console logs ثبت می‌شوند

## تست نهایی:

```bash
# 1. تست محلی
npm run test-daily

# 2. تست API endpoint
curl https://your-domain.vercel.app/api/generate-daily-content

# 3. بررسی فایل‌های تولید شده
ls app/articles/*/
```












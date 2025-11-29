# راهنمای ادغام UI با nimasaraeian.com

این راهنما نحوه اضافه کردن UI AI Marketing به سایت موجود nimasaraeian.com را توضیح می‌دهد.

## 📋 گزینه‌های ادغام

### گزینه 1: کپی فایل‌ها به پروژه nimasaraeian.com (پیشنهادی)

#### مراحل:

1. **کپی فایل‌های UI:**
   ```bash
   # از این پروژه
   cd C:\Users\USER\Desktop\tensorflow-nima\web
   
   # کپی به پروژه nimasaraeian.com
   # فرض می‌کنیم پروژه nimasaraeian.com در مسیر دیگری است
   ```

2. **ساختار پیشنهادی در nimasaraeian.com:**
   ```
   nimasaraeian.com/
   ├── pages/
   │   └── ai-marketing.html  (یا ai-marketing/index.html)
   ├── assets/
   │   ├── css/
   │   │   └── ai-marketing.css  (کپی از styles.css)
   │   └── js/
   │       └── ai-marketing.js   (کپی از app.js)
   └── ...
   ```

3. **کپی فایل‌ها:**
   - `web/index.html` → `nimasaraeian.com/pages/ai-marketing.html`
   - `web/styles.css` → `nimasaraeian.com/assets/css/ai-marketing.css`
   - `web/app.js` → `nimasaraeian.com/assets/js/ai-marketing.js`

4. **تغییر مسیرها در HTML:**
   ```html
   <!-- در ai-marketing.html -->
   <link rel="stylesheet" href="../assets/css/ai-marketing.css">
   <script src="../assets/js/ai-marketing.js"></script>
   ```

---

### گزینه 2: استفاده به عنوان Component/Partial

اگر nimasaraeian.com از یک framework استفاده می‌کند (React, Vue, Next.js):

#### برای React:

```jsx
// components/AIMarketing.jsx
import React, { useState } from 'react';
import './AIMarketing.css';

export default function AIMarketing() {
  // منطق از app.js را اینجا پیاده‌سازی کنید
  // ...
}
```

#### برای Next.js:

```jsx
// pages/ai-marketing.js
import AIMarketing from '../components/AIMarketing';

export default function AIMarketingPage() {
  return <AIMarketing />;
}
```

#### برای Vue:

```vue
<!-- components/AIMarketing.vue -->
<template>
  <!-- محتوای index.html -->
</template>

<script>
// منطق از app.js
</script>

<style>
/* استایل‌ها از styles.css */
</style>
```

---

### گزینه 3: استفاده به عنوان Subdirectory

اگر nimasaraeian.com یک سایت استاتیک است:

1. **ایجاد پوشه:**
   ```
   nimasaraeian.com/
   └── ai-marketing/
       ├── index.html
       ├── styles.css
       └── app.js
   ```

2. **دسترسی:**
   - URL: `https://nimasaraeian.com/ai-marketing/`
   - یا: `https://nimasaraeian.com/ai-marketing/index.html`

3. **اضافه کردن به Navigation:**
   ```html
   <!-- در navigation اصلی سایت -->
   <a href="/ai-marketing">AI Marketing</a>
   ```

---

### گزینه 4: استفاده از iframe (سریع اما محدود)

اگر نمی‌خواهید فایل‌ها را کپی کنید:

```html
<!-- در صفحه nimasaraeian.com -->
<iframe 
  src="https://your-deployment-url.com/ai-marketing" 
  width="100%" 
  height="800px"
  frameborder="0">
</iframe>
```

**مزایا:**
- ✅ سریع
- ✅ جداسازی کامل

**معایب:**
- ❌ SEO مشکل دارد
- ❌ Navigation مشکل دارد
- ❌ Mobile experience ضعیف

---

## 🔧 تنظیمات لازم

### 1. تغییر API URL

در فایل `app.js` (یا `ai-marketing.js`):

```javascript
// برای Production
const API_BASE_URL = 'https://api.nimasaraeian.com';
// یا
const API_BASE_URL = 'https://nimasaraeian.com/api';
```

### 2. اضافه کردن به Navigation

در فایل navigation اصلی سایت:

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/ai-marketing">AI Marketing</a>  <!-- اضافه کنید -->
  <a href="/contact">Contact</a>
</nav>
```

### 3. یکپارچه‌سازی با Design System موجود

اگر nimasaraeian.com یک design system دارد:

```css
/* در ai-marketing.css */
:root {
  /* استفاده از رنگ‌های موجود سایت */
  --primary-color: var(--site-primary-color);
  --secondary-color: var(--site-secondary-color);
  /* ... */
}
```

### 4. اضافه کردن به Sitemap

```xml
<!-- sitemap.xml -->
<url>
  <loc>https://nimasaraeian.com/ai-marketing</loc>
  <lastmod>2025-01-XX</lastmod>
  <priority>0.8</priority>
</url>
```

---

## 📝 مراحل دقیق (Step-by-Step)

### اگر nimasaraeian.com یک سایت استاتیک است:

1. **پیدا کردن مسیر پروژه nimasaraeian.com:**
   ```bash
   # مثال:
   cd C:\Users\USER\Desktop\nimasaraeian.com
   # یا
   cd C:\xampp\htdocs\nimasaraeian.com
   ```

2. **ایجاد پوشه ai-marketing:**
   ```bash
   mkdir ai-marketing
   cd ai-marketing
   ```

3. **کپی فایل‌ها:**
   ```bash
   # از PowerShell
   Copy-Item "C:\Users\USER\Desktop\tensorflow-nima\web\*" -Destination "." -Recurse
   ```

4. **تغییر نام فایل‌ها (اختیاری):**
   ```bash
   # اگر می‌خواهید نام‌ها را تغییر دهید
   Rename-Item "index.html" "ai-marketing.html"
   ```

5. **اضافه کردن به Navigation:**
   - فایل navigation را باز کنید
   - لینک به `/ai-marketing` اضافه کنید

6. **تست:**
   - باز کردن `http://localhost/ai-marketing` (یا URL local شما)
   - بررسی کنید همه چیز کار می‌کند

---

### اگر nimasaraeian.com از CMS استفاده می‌کند (WordPress, etc.):

#### برای WordPress:

1. **ایجاد Custom Page Template:**
   ```php
   <?php
   /*
   Template Name: AI Marketing
   */
   get_header();
   ?>
   
   <div id="ai-marketing-app">
       <!-- محتوای index.html را اینجا قرار دهید -->
   </div>
   
   <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/ai-marketing.css">
   <script src="<?php echo get_template_directory_uri(); ?>/assets/js/ai-marketing.js"></script>
   
   <?php get_footer(); ?>
   ```

2. **آپلود فایل‌ها:**
   - `ai-marketing.css` → `wp-content/themes/your-theme/assets/css/`
   - `ai-marketing.js` → `wp-content/themes/your-theme/assets/js/`

3. **ایجاد صفحه جدید:**
   - WordPress Admin → Pages → Add New
   - Template را "AI Marketing" انتخاب کنید

---

## 🔗 Integration با Backend

### گزینه A: استفاده از API موجود

اگر backend در همان domain است:

```javascript
// در app.js
const API_BASE_URL = window.location.origin + '/api';
// یا
const API_BASE_URL = 'https://api.nimasaraeian.com';
```

### گزینه B: Proxy از Frontend

اگر backend در domain دیگری است و CORS مشکل دارد:

```javascript
// در nimasaraeian.com backend
// ایجاد endpoint proxy
app.post('/api/ai-marketing', async (req, res) => {
  const response = await fetch('https://api.nimasaraeian.com/api/brain', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  res.json(data);
});
```

---

## ✅ Checklist

قبل از deploy:

- [ ] فایل‌ها کپی شده‌اند
- [ ] مسیرهای CSS/JS درست هستند
- [ ] API URL به production تغییر کرده
- [ ] Navigation اضافه شده
- [ ] تست local انجام شده
- [ ] CORS تنظیم شده
- [ ] Mobile responsive تست شده
- [ ] SEO meta tags اضافه شده (اختیاری)

---

## 🎨 سفارشی‌سازی

### تطبیق با Design موجود:

1. **رنگ‌ها:**
   ```css
   /* در ai-marketing.css */
   :root {
     --primary-color: #your-brand-color;
   }
   ```

2. **فونت:**
   ```css
   body {
     font-family: 'Your-Brand-Font', sans-serif;
   }
   ```

3. **Logo:**
   ```html
   <!-- در index.html -->
   <div class="nav-brand">
     <img src="/logo.png" alt="Nima Saraeian" />
   </div>
   ```

---

## 📞 پشتیبانی

اگر مشکلی پیش آمد:

1. Console مرورگر را بررسی کنید (F12)
2. Network tab را برای API calls چک کنید
3. مسیر فایل‌ها را بررسی کنید
4. CORS errors را بررسی کنید

---

**موفق باشید! 🚀**

